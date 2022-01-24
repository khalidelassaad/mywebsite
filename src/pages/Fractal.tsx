import * as React from 'react';

const canvasClassName = 'Fractal-canvas';

interface Props {
  canvasProps: { width: number; height: number };
  colorStep: number;
}

function Fractal(props: Props) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawJulia(canvas, context, props.colorStep);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        {...props.canvasProps}
      ></canvas>
    </>
  );
}

export default Fractal;

function drawJulia(canvas, context, colorStep: number) {
  // Author: delimitry
  // Repo: https://github.com/delimitry/fractals-js/
  //-----------------------------------------------------------------------

  // prepare image and pixels
  var image_data = context.createImageData(canvas.width, canvas.height);
  var d = image_data.data;

  let x0 = -0.4;
  let y0 = -0.6;
  const max_iterations = 100;
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
