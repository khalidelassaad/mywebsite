import * as React from 'react';

// TODO for this class:
// - Optimize with dynamic programming (save rendered image data)

// Beautiful region at -0.8, 0.2

const canvasClassName = 'Fractal-canvas';

interface ViewportCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FractalProps {
  resolution?: number;
  colorStep: number;
  chunksPerAxis: number;
  maxIterations: number;
  viewportCoords: ViewportCoords;
  transformSpeedModifier: number;
}

function _handleStateUpdates(
  newCursorCoords: number[],
  chunkCoords: number[],
  setChunkCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  setRenderCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  canvasRef: React.MutableRefObject<any>,
  chunksPerAxis: number,
  transformSpeedModifier: number,
) {
  const canvasX: number = canvasRef.current.offsetWidth;
  const canvasY: number = canvasRef.current.offsetHeight;

  const newCursorX = newCursorCoords[0] - canvasRef.current.offsetLeft;
  const newCursorY = newCursorCoords[1] - canvasRef.current.offsetTop;

  const [oldChunkX, oldChunkY] = chunkCoords;

  const newChunkX = Math.floor((newCursorX / canvasX) * chunksPerAxis);
  const newChunkY = Math.floor((newCursorY / canvasY) * chunksPerAxis);

  if (newChunkX != oldChunkX || newChunkY != oldChunkY) {
    setChunkCoords([newChunkX, newChunkY]);
    setRenderCoords([
      ((newChunkX / chunksPerAxis) * 2 - 1) * transformSpeedModifier,
      ((newChunkY / chunksPerAxis) * 2 - 1) * transformSpeedModifier,
    ]);
    // console.log('chunk %d, %d', newChunkX, newChunkY);
    // console.log(
    //   'render %f, %f',
    //   (newChunkX / chunksPerAxis) * 2 - 1,
    //   (newChunkY / chunksPerAxis) * 2 - 1,
    // );
    // console.log('');
  }
}

function Fractal(props: FractalProps) {
  const canvasRef = React.useRef(null);
  const [chunkCoords, setChunkCoords] = React.useState([0, 0]);
  const [renderCoords, setRenderCoords] = React.useState([0, 0]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });

    drawJulia(
      canvas,
      context,
      props.colorStep,
      renderCoords,
      props.maxIterations,
      props.viewportCoords,
    );
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        onMouseMove={(e) => {
          _handleStateUpdates(
            [e.clientX, e.clientY],
            chunkCoords,
            setChunkCoords,
            setRenderCoords,
            canvasRef,
            props.chunksPerAxis,
            props.transformSpeedModifier,
          );
        }}
        width={
          props.resolution != null
            ? props.resolution
            : canvasRef.current != null
            ? canvasRef.current.offsetWidth
            : 1
        }
        height={
          props.resolution != null
            ? props.resolution
            : canvasRef.current != null
            ? canvasRef.current.offsetHeight
            : 1
        }
      ></canvas>
    </>
  );
}

function drawJulia(
  canvas,
  context,
  colorStep: number,
  renderCoords: number[],
  maxIterations: number,
  viewportCoords: ViewportCoords,
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
  var d = image_data.data;

  let x0 = renderCoords[0] * (xAxisLength / 2) + xOffset;
  let y0 = renderCoords[1] * (yAxisLength / 2) + yOffset;

  // console.log('sized  %f, %f', x0, y0);
  // console.log('')

  maxIterations = Math.min(maxIterations, Math.floor(255 / colorStep));

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
      d[i * canvas.width * 4 + j * 4 + 1] = iteration * colorStep;
      d[i * canvas.width * 4 + j * 4 + 3] = 255;
    }
  }

  // draw image
  context.putImageData(image_data, 0, 0);

  context.draw;
}

export { Fractal, FractalProps };
