import * as React from 'react';

const canvasClassName = 'Fractal-canvas';
const captionTextClassName = 'Fractal-caption';
const fractalContainerClassName = 'Fractal-container';

const debug = false;

interface ViewportCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FractalProps {
  cursorCoords: number[];
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
  captionText?: string;
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
  // _debug('reading array %d, %d', chunkCoords[0], chunkCoords[1]);
  // _debug(chunkToDataArray);
  return chunkToDataArray[chunkCoords[0] * chunksPerAxis + chunkCoords[1]];
}

function _calculateNewChunkCoordsFromCursorCoords(
  props: FractalProps,
  chunkCoords: number[],
  setChunkCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  canvasRef: React.MutableRefObject<any>,
) {
  const canvasX: number = canvasRef.current.offsetWidth;
  const canvasY: number = canvasRef.current.offsetHeight;

  const newCursorX =
    props.cursorCoords[0] - canvasRef.current.offsetParent.offsetLeft;
  const newCursorY = props.cursorCoords[1] - canvasRef.current.offsetTop;

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
  const colorMax = props.colorMax ? props.colorMax : 255;

  const maxIterations = Math.min(
    props.maxIterations,
    Math.floor(colorMax / props.colorStep),
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
  _debug(resultDataArray);
  return resultDataArray;
}

function _computeDataArrayAtChunkCoords(
  props: FractalProps,
  canvas,
  context,
  chunkCoords,
) {
  const xAxisLength = props.viewportCoords.endX - props.viewportCoords.startX;
  const yAxisLength = props.viewportCoords.endY - props.viewportCoords.startY;
  const xOffset = (props.viewportCoords.endX + props.viewportCoords.startX) / 2;
  const yOffset = (props.viewportCoords.endY + props.viewportCoords.startY) / 2;

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

  return resultDataArray;
}

function _breakToHandleResizeIfNeeded(
  dataInChunkArray,
  canvas,
  setCanvasPixelDimensions,
) {
  if (dataInChunkArray.length != canvas.width * canvas.height * 4) {
    _debug(
      'Data size mismatch: saved data does not match expected canvas size\n\tresizing to %d, %d',
      canvas.width,
      canvas.height,
    );

    setCanvasPixelDimensions(canvas.width, canvas.height);
  }
}

function _loadDrawOrComputeSaveDrawJuliaFromChunkToDataArray(
  props: FractalProps,
  canvas,
  context,
  chunkCoords: number[],
  chunkToDataArray,
  setChunkToDataArray,
  setCanvasPixelDimensions,
) {
  // Load Julia
  let dataInChunkArray = _getValueInChunkArrayAtCoords(
    chunkToDataArray,
    props.chunksPerAxis,
    chunkCoords,
  );

  let imageData = context.createImageData(canvas.width, canvas.height);

  if (dataInChunkArray == undefined) {
    _debug(
      'computing new values for chunk %d, %d',
      chunkCoords[0],
      chunkCoords[1],
    );
    // if Julia not yet computed, compute save Julia
    dataInChunkArray = _computeDataArrayAtChunkCoords(
      props,
      canvas,
      context,
      chunkCoords,
    );
    _storeValueInChunkArrayAtCoords(
      props,
      dataInChunkArray,
      chunkToDataArray,
      chunkCoords,
    );
    setChunkToDataArray(chunkToDataArray);
  } else {
    _debug(
      'loading old values for chunk %d, %d',
      chunkCoords[0],
      chunkCoords[1],
    );
    // Julia is already loaded, check for resize
    _breakToHandleResizeIfNeeded(
      dataInChunkArray,
      canvas,
      setCanvasPixelDimensions,
    );
  }
  // Draw Julia
  for (var i = 0; i < dataInChunkArray.length; i++) {
    imageData.data[i] = dataInChunkArray[i];
  }
  // _debug('drawdata for chunk %d, %d', chunkCoords[0], chunkCoords[1]);
  context.putImageData(imageData, 0, 0);
  context.draw;
}

function Fractal(props: FractalProps) {
  if (props.disabled) {
    return <></>;
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
  const [recomputeCounter, setRecomputeCounter] = React.useState(0);

  const canvasRef = React.useRef(null);

  let canvas;
  let context;

  React.useEffect(() => {
    _calculateNewChunkCoordsFromCursorCoords(
      props,
      chunkCoords,
      setChunkCoords,
      canvasRef,
    );
  }, [props.cursorCoords]);

  React.useEffect(() => {
    if (canvasRef.current !== null) {
      // If size changes, wipe chunkArray
      [canvas, context] = _findCanvasAndContext(canvasRef);
      _debug('Wiping old array');
      setChunkToDataArray(new Array(props.chunksPerAxis ** 2));
      setRecomputeCounter(recomputeCounter + 1);
    }
  }, [canvasPixelDimensions]);

  React.useEffect(() => {
    // Draw frame if chunkcoords change
    if (canvasRef.current !== null) {
      [canvas, context] = _findCanvasAndContext(canvasRef);
      // If canvas dimensions are different from state, set new dimensions and return
      // Else, if chunk coords array computed, draw julia
      //        else, compute juilia and draw and save it
      if (
        _areCanvasDimensionsDifferentFromState(canvas, canvasPixelDimensions)
      ) {
        _debug('set new canvas dimensions %d, %d', canvas.width, canvas.height);
        setCanvasPixelDimensions([canvas.width, canvas.height]);
      } else {
        if (recomputeCounter > 1) {
          _loadDrawOrComputeSaveDrawJuliaFromChunkToDataArray(
            props,
            canvas,
            context,
            chunkCoords,
            chunkToDataArray,
            setChunkToDataArray,
            setCanvasPixelDimensions,
          );
        }
      }
    }
  }, [chunkCoords, recomputeCounter]);

  return (
    <>
      {' '}
      <div
        className={
          props.classSuffix
            ? fractalContainerClassName + '-' + props.classSuffix
            : fractalContainerClassName
        }
      >
        <canvas
          ref={canvasRef}
          className={
            props.classSuffix
              ? canvasClassName + '-' + props.classSuffix
              : canvasClassName
          }
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
        {props.captionText ? (
          props.classSuffix ? (
            <div className={captionTextClassName + '-' + props.classSuffix}>
              {props.captionText}
            </div>
          ) : (
            <div className={captionTextClassName}>{props.captionText}</div>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export { Fractal, FractalProps };
