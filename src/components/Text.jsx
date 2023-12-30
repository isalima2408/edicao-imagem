import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

export function Text({ onChange, id, canvas, options }) {

  //Será que é só o textbox que é adicionado como canva?
  const [textbox] = useState(() => new fabric.Textbox(options.text ?? '', options));

  // o set canvas altera o canvas, e até agora só foi "alterado na criação"
  useEffect(() => {
    canvas.add(textbox);
  }, [canvas, textbox]);


  useEffect(() => {
    textbox.setOptions(options);
  }, [options, textbox]);

  useEffect(() => {
    const update = () => {
      onChange(id, textbox.toObject());
    };
    textbox.on('moved', update);
    textbox.on('scaled', update);
    textbox.on('rotated', update);
    textbox.on('changed', update);
  }, [id, onChange, textbox]);

  return <></>;
}
