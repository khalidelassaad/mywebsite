import * as React from 'react';

// TODO for this class:
// Make background detect mouse movement on top of everything

// Beautiful region at -0.8, 0.2

const canvasClassName = 'Fractal-canvas';
const debug = false;

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
  value,
  chunkToDataArray,
  chunksPerAxis,
  chunkCoords,
) {
  chunkToDataArray[chunkCoords[0] * chunksPerAxis + chunkCoords[1]] = value;
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

function _handleStateUpdates(
  newCursorCoords: number[],
  chunkCoords: number[],
  setChunkCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  canvasRef: React.MutableRefObject<any>,
  chunksPerAxis: number,
  transformSpeedModifier: number,
  canvasPixelDimensions: number[],
  setCanvasPixelDimensions,
  setChunkToDataArray,
) {
  const canvasX: number = canvasRef.current.offsetWidth;
  const canvasY: number = canvasRef.current.offsetHeight;

  const newCursorX = newCursorCoords[0] - canvasRef.current.offsetLeft;
  const newCursorY = newCursorCoords[1] - canvasRef.current.offsetTop;

  const [oldChunkX, oldChunkY] = chunkCoords;

  const newChunkX = Math.min(
    chunksPerAxis - 1,
    Math.max(0, Math.floor((newCursorX / canvasX) * chunksPerAxis)),
  );
  const newChunkY = Math.min(
    chunksPerAxis - 1,
    Math.max(0, Math.floor((newCursorY / canvasY) * chunksPerAxis)),
  );

  const isCanvasSameDimensions =
    canvasX == canvasPixelDimensions[0] && canvasY == canvasPixelDimensions[1];

  if (newChunkX != oldChunkX || newChunkY != oldChunkY) {
    // - State necessary: canvas dimensions and ChunksToDataArray
    //    - Save fractal canvas dimensions
    //      - if same,
    //        - lookup chunk coords in ChunksToDataArray
    //          - If exists, draw it
    //          - If not exists, calc it, save it, draw it
    //      - if different,
    //        - Re-init ChunksToDataArray

    if (isCanvasSameDimensions) {
      _debug('same dimensions!');
    } else {
      setCanvasPixelDimensions([canvasX, canvasY]);
      setChunkToDataArray(new Array(chunksPerAxis ** 2));
      _debug('set new dimensions and wiped chunk array!');
    }

    setChunkCoords([newChunkX, newChunkY]);

    //   _debug(
    //     'canvasXOffset: %d\nnewCursorX: %d\ncanvasX: %d\nquotient: %f\nnewChunkX: %d',
    //     canvasRef.current.offsetLeft,
    //     newCursorX,
    //     canvasX,
    //     newCursorX / canvasX,
    //     newChunkX,
    //   );
    //   _debug('chunk %d, %d', newChunkX, newChunkY);
    //   _debug(
    //     'render %f, %f',
    //     (newChunkX / chunksPerAxis) * 2 - 1,
    //     (newChunkY / chunksPerAxis) * 2 - 1,
    //   );
    //   _debug(0 ? 1 : 0);
  }
}

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

  const colorMax = props.colorMax ? props.colorMax : 255;
  const canvasRef = React.useRef(null);
  const [chunkCoords, setChunkCoords] = React.useState([-1, -1]);
  const [canvasPixelDimensions, setCanvasPixelDimensions] = React.useState([
    0, 0,
  ]);
  const [chunkToDataArray, setChunkToDataArray] = React.useState(
    new Array(props.chunksPerAxis ** 2),
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });

    drawJuliaFromMemory(
      canvas,
      context,
      props.colorStep,
      chunkCoords,
      props.chunksPerAxis,
      props.maxIterations,
      props.viewportCoords,
      colorMax,
      chunkToDataArray,
      setChunkToDataArray,
      props.transformSpeedModifier,
    );
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
          _handleStateUpdates(
            [e.clientX, e.clientY],
            chunkCoords,
            setChunkCoords,
            canvasRef,
            props.chunksPerAxis,
            props.transformSpeedModifier,
            canvasPixelDimensions,
            setCanvasPixelDimensions,
            setChunkToDataArray,
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

function _iterateJulia(
  canvas,
  xAxisLength,
  yAxisLength,
  xOffset,
  yOffset,
  maxIterations,
  x0,
  y0,
  colorStep,
  resultDataArray,
) {
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
      resultDataArray[i * canvas.width * 4 + j * 4 + 1] = iteration * colorStep;
      resultDataArray[i * canvas.width * 4 + j * 4 + 3] = 255;
    }
  }
}

function drawJuliaFromMemory(
  canvas,
  context,
  colorStep: number,
  chunkCoords: number[],
  chunksPerAxis: number,
  maxIterations: number,
  viewportCoords: ViewportCoords,
  colorMax: number,
  chunkToDataArray,
  setChunkToDataArray,
  transformSpeedModifier,
) {
  // Author: delimitry
  // Repo: https://github.com/delimitry/fractals-js/
  //-----------------------------------------------------------------------

  // prepare image and pixels
  const xAxisLength = viewportCoords.endX - viewportCoords.startX;
  const yAxisLength = viewportCoords.endY - viewportCoords.startY;
  const xOffset = (viewportCoords.endX + viewportCoords.startX) / 2;
  const yOffset = (viewportCoords.endY + viewportCoords.startY) / 2;

  var image_data = context.createImageData(canvas.width, canvas.height);
  var resultDataArray = image_data.data;

  const dataInChunkArray = _getValueInChunkArrayAtCoords(
    chunkToDataArray,
    chunksPerAxis,
    chunkCoords,
  );
  if (dataInChunkArray) {
    _debug('data found in chunk array');
    _debug(dataInChunkArray);
    _debug('data length', dataInChunkArray.length);
    _debug('data2 length', image_data.data.length);
    for (var i = 0; i < dataInChunkArray.length; i++) {
      resultDataArray[i] = dataInChunkArray[i];
    }
    _debug('to render');
    _debug(resultDataArray);
  } else {
    let renderCoords = _calculateRenderCoordsFromChunkCoords(
      chunkCoords,
      chunksPerAxis,
      transformSpeedModifier,
    );
    let x0 = renderCoords[0] * (xAxisLength / 2) + xOffset;
    let y0 = renderCoords[1] * (yAxisLength / 2) + yOffset;

    // _debug('sized  %f, %f', x0, y0);
    // _debug('');

    maxIterations = Math.min(maxIterations, Math.floor(colorMax / colorStep));

    _iterateJulia(
      canvas,
      xAxisLength,
      yAxisLength,
      xOffset,
      yOffset,
      maxIterations,
      x0,
      y0,
      colorStep,
      resultDataArray,
    );

    _debug('storing value in chunk array');
    _debug(resultDataArray);
    _storeValueInChunkArrayAtCoords(
      resultDataArray,
      chunkToDataArray,
      chunksPerAxis,
      chunkCoords,
    );
    setChunkToDataArray(chunkToDataArray);
  }

  // draw image
  context.putImageData(image_data, 0, 0);

  context.draw;
}

export { Fractal, FractalProps };
