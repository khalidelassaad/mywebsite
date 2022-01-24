import * as React from 'react';

const canvasClassName = 'Fractal-canvas';
const cursorStepDistance = 200; // Set state only after cursor moves this many pixels
const maxIterations = 90; // Default author provides: 100

interface Props {
  resolution: number;
  colorStep: number;
}

function _handleStateUpdates(
  newCursorCoords: number[],
  cursorCoords: number[],
  setCursorCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  setRenderCoords: {
    (value: React.SetStateAction<number[]>): void;
    (arg0: number[]): void;
  },
  canvasRef: React.MutableRefObject<any>,
) {
  const canvasX: number = canvasRef.current.offsetWidth; //TODO: FLIP HERE IF BUGGY
  const canvasY: number = canvasRef.current.offsetHeight;

  const [newCursorX, newCursorY] = newCursorCoords;
  const [cursorX, cursorY] = cursorCoords;

  if (
    Math.abs(newCursorX - cursorX) > cursorStepDistance ||
    Math.abs(newCursorY - cursorY) > cursorStepDistance
  ) {
    setCursorCoords(newCursorCoords);
    setRenderCoords([
      (newCursorX / canvasX) * 2 - 1,
      (newCursorY / canvasY) * 2 - 1,
    ]);
    console.log('X, Y detected: %d, %d', canvasX, canvasY);
    console.log(
      'coordinates updated: %f, %f',
      (newCursorX / canvasX) * 2 - 1,
      (newCursorY / canvasY) * 2 - 1,
    );
  }
}

function Fractal(props: Props) {
  const canvasRef = React.useRef(null);
  const [cursorCoords, setCursorCoords] = React.useState([0, 0]);
  const [renderCoords, setRenderCoords] = React.useState([0, 0]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawJulia(canvas, context, props.colorStep, renderCoords);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        onMouseMove={(e) => {
          _handleStateUpdates(
            [e.screenX, e.screenY],
            cursorCoords,
            setCursorCoords,
            setRenderCoords,
            canvasRef,
          );
        }}
        width={props.resolution}
        height={props.resolution}
      ></canvas>
    </>
  );
}

export default Fractal;

function drawJulia(canvas, context, colorStep: number, renderCoords: number[]) {
  // Author: delimitry
  // Repo: https://github.com/delimitry/fractals-js/
  //-----------------------------------------------------------------------

  // prepare image and pixels
  var image_data = context.createImageData(canvas.width, canvas.height);
  var d = image_data.data;

  let [x0, y0] = renderCoords;
  const max_iterations = maxIterations;
  for (var i = 0; i < canvas.height; i++) {
    for (var j = 0; j < canvas.width; j++) {
      // limit the axis
      let x = -1.5 + (j * 3.0) / canvas.width;
      let y = -1.0 + (i * 2.0) / canvas.height;

      let iteration = 0;

      while (x * x + y * y < 4 && iteration < max_iterations) {
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
}

//   context.clearRect(0, 0, canvas.width, canvas.height);
