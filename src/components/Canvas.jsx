import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export function Canvas({ setCanvas, children }) {

  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(
        //canvasRef.current faz referencia ao canva criado aqui
        //estou criando o canvas
      new fabric.Canvas(canvasRef.current, {
        renderOnAddRemove: true,
        backgroundColor: 'pink',
      }),
    );

  }, [setCanvas]);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "absolute" }} ></canvas>
      {children}
    </>
  );
}
