import * as React from 'react';

// TODO for this class:
// Make background detect mouse movement on top of everything

// Beautiful region at -0.8, 0.2

const canvasClassName = 'Fractal-canvas';
const debug = true;

interface ViewportCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FractalProps {
  resolution?: number;
  resolutionFraction?: number;
  colorStep: number;
  chunksPerAxis: number;
  maxIterations: number;
  viewportCoords: ViewportCoords;
  transformSpeedModifier: number;
  classSuffix?: string;
  disabled?: boolean;
  colorMax?: number;
}

function _debug(...args) {
  if (debug) {
    console.log(...args);
  }
}

function _findCanvasAndContext(canvasRef) {
  return [
    canvasRef.current,
    canvasRef.current.getContext('2d', {
      alpha: false,
      desynchronized: true,
    }),
  ];
}

function _calculateRenderCoordsFromChunkCoords(
  chunkCoords,
  chunksPerAxis,
  transformSpeedModifier,
) {
  return [
    ((chunkCoords[0] / chunksPerAxis) * 2 - 1) * transformSpeedModifier,
    ((chunkCoords[1] / chunksPerAxis) * 2 - 1) * transformSpeedModifier,
  ];
}

function _storeValueInChunkArrayAtCoords(
  props: FractalProps,
  value,
  chunkToDataArray,
  chunkCoords,
) {
  chunkToDataArray[chunkCoords[0] * props.chunksPerAxis + chunkCoords[1]] =
    value;
}

function _getValueInChunkArrayAtCoords(
  chunkToDataArray,
  chunksPerAxis,
  chunkCoords,
) {
  _debug('reading array');
  _debug(chunkToDataArray);
  return chunkToDataArray[chunkCoords[0] * chunksPerAxis + chunkCoords[1]];
}

function _calculateNewChunkCoordsFromCursorCoords(
  props: FractalProps,
  newCursorCoords: number[],
  chunkCoords: number[],
  setChunkCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  canvasRef: React.MutableRefObject<any>,
) {
  const canvasX: number = canvasRef.current.offsetWidth;
  const canvasY: number = canvasRef.current.offsetHeight;

  const newCursorX = newCursorCoords[0] - canvasRef.current.offsetLeft;
  const newCursorY = newCursorCoords[1] - canvasRef.current.offsetTop;

  const [oldChunkX, oldChunkY] = chunkCoords;

  const newChunkX = Math.min(
    props.chunksPerAxis - 1,
    Math.max(0, Math.floor((newCursorX / canvasX) * props.chunksPerAxis)),
  );
  const newChunkY = Math.min(
    props.chunksPerAxis - 1,
    Math.max(0, Math.floor((newCursorY / canvasY) * props.chunksPerAxis)),
  );

  if (newChunkX != oldChunkX || newChunkY != oldChunkY) {
    setChunkCoords([newChunkX, newChunkY]);
  }
}

function _areCanvasDimensionsDifferentFromState(canvas, canvasPixelDimensions) {
  return !(
    canvas.width == canvasPixelDimensions[0] &&
    canvas.height == canvasPixelDimensions[1]
  );
}

function _iterateJuliaIntoResultDataArray(
  props: FractalProps,
  canvas,
  xAxisLength,
  yAxisLength,
  xOffset,
  yOffset,
  x0,
  y0,
  resultDataArray,
) {
  const maxIterations = Math.min(
    props.maxIterations,
    Math.floor(props.colorMax / props.colorStep),
  );

  for (var i = 0; i < canvas.height; i++) {
    for (var j = 0; j < canvas.width; j++) {
      // limit the axis
      let x = xAxisLength * -0.5 + (j * xAxisLength) / canvas.width + xOffset;
      let y = yAxisLength * -0.5 + (i * yAxisLength) / canvas.height + yOffset;

      let iteration = 0;

      while (x * x + y * y < 4 && iteration < maxIterations) {
        let x_n = x * x - y * y + x0;
        let y_n = 2 * x * y + y0;
        x = x_n;
        y = y_n;
        iteration++;
      }

      // set pixel color [r,g,b,a]
      resultDataArray[i * canvas.width * 4 + j * 4 + 1] =
        iteration * props.colorStep;
      resultDataArray[i * canvas.width * 4 + j * 4 + 3] = 255;
    }
  }

  return resultDataArray;
}

function _createChunkToDataArray(props: FractalProps, canvas, context) {
  let returnChunkToDataArray = new Array(props.chunksPerAxis ** 2);

  const xAxisLength = props.viewportCoords.endX - props.viewportCoords.startX;
  const yAxisLength = props.viewportCoords.endY - props.viewportCoords.startY;
  const xOffset = (props.viewportCoords.endX + props.viewportCoords.startX) / 2;
  const yOffset = (props.viewportCoords.endY + props.viewportCoords.startY) / 2;

  for (let chunkX = 0; chunkX < props.chunksPerAxis; chunkX++) {
    for (let chunkY = 0; chunkY < props.chunksPerAxis; chunkY++) {
      const chunkCoords = [chunkX, chunkY];

      let image_data = context.createImageData(canvas.width, canvas.height);
      let resultDataArray = image_data.data;

      let renderCoords = _calculateRenderCoordsFromChunkCoords(
        chunkCoords,
        props.chunksPerAxis,
        props.transformSpeedModifier,
      );
      let x0 = renderCoords[0] * (xAxisLength / 2) + xOffset;
      let y0 = renderCoords[1] * (yAxisLength / 2) + yOffset;

      _iterateJuliaIntoResultDataArray(
        props,
        canvas,
        xAxisLength,
        yAxisLength,
        xOffset,
        yOffset,
        x0,
        y0,
        resultDataArray,
      );

      _storeValueInChunkArrayAtCoords(
        props,
        resultDataArray,
        returnChunkToDataArray,
        chunkCoords,
      );
    }
  }

  return returnChunkToDataArray;
}

function _drawJuliaFromChunkToDataArray(
  props: FractalProps,
  canvas,
  context,
  chunkCoords: number[],
  chunkToDataArray,
  setCanvasPixelDimensions,
) {
  const dataInChunkArray = _getValueInChunkArrayAtCoords(
    chunkToDataArray,
    props.chunksPerAxis,
    chunkCoords,
  );

  if (dataInChunkArray.length != canvas.width * canvas.height * 4) {
    _debug(
      'Data size mismatch: saved data does not match expected canvas size',
    );
    setCanvasPixelDimensions(canvas.width, canvas.height);
  }

  const imageData = context.createImageData(canvas.width, canvas.height);
  for (var i = 0; i < dataInChunkArray.length; i++) {
    imageData[i] = dataInChunkArray[i];
  }

  context.putImageData(imageData, 0, 0);
  context.draw;
}

export { Fractal, FractalProps };

function Fractal(props: FractalProps) {
  if (props.disabled) {
    return (
      <div
        className={
          props.classSuffix
            ? canvasClassName + '-' + props.classSuffix
            : canvasClassName
        }
      />
    );
  }

  const [chunkCoords, setChunkCoords] = React.useState([
    0,
    Math.floor(props.chunksPerAxis / 2),
  ]);
  const [canvasPixelDimensions, setCanvasPixelDimensions] = React.useState([
    1, 1,
  ]);
  const [chunkToDataArray, setChunkToDataArray] = React.useState(
    new Array(props.chunksPerAxis ** 2),
  );
  const [hasComputedChunkToDataArray, setHasComputedChunkToDataArray] =
    React.useState(false);

  const canvasRef = React.useRef(null);

  let canvas;
  let context;

  React.useEffect(() => {
    // INITIAL RENDER
    if (canvasRef.current !== null) {
      _debug('first check');
      [canvas, context] = _findCanvasAndContext(canvasRef);
      if (
        _areCanvasDimensionsDifferentFromState(canvas, canvasPixelDimensions)
      ) {
        _debug(
          'new canvas pixel dimensions to %d, %d',
          canvas.width,
          canvas.height,
        );
        setCanvasPixelDimensions([canvas.width, canvas.height]);
      }
      // if (hasComputedChunkToDataArray) {
      //   setChunkToDataArray(_createChunkToDataArray(props, canvas, context));
      //   setHasComputedChunkToDataArray(true);
      // }
    }
  }, [canvasRef.current]);

  React.useEffect(() => {
    if (canvasRef.current !== null) {
      [canvas, context] = _findCanvasAndContext(canvasRef);
      if (hasComputedChunkToDataArray) {
        _drawJuliaFromChunkToDataArray(
          props,
          canvas,
          context,
          chunkCoords,
          chunkToDataArray,
          setCanvasPixelDimensions,
        );
      }
    }
  }, [chunkCoords]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={
          props.classSuffix
            ? canvasClassName + '-' + props.classSuffix
            : canvasClassName
        }
        onMouseMove={(e) => {
          _calculateNewChunkCoordsFromCursorCoords(
            props,
            [e.clientX, e.clientY],
            chunkCoords,
            setChunkCoords,
            canvasRef,
          );
        }}
        width={
          props.resolution != null
            ? props.resolution
            : canvasRef.current != null
            ? props.resolutionFraction
              ? canvasRef.current.offsetWidth * props.resolutionFraction
              : canvasRef.current.offsetWidth
            : 1
        }
        height={
          props.resolution != null
            ? props.resolution
            : canvasRef.current != null
            ? props.resolutionFraction
              ? canvasRef.current.offsetHeight * props.resolutionFraction
              : canvasRef.current.offsetHeight
            : 1
        }
      ></canvas>
    </>
  );
}
