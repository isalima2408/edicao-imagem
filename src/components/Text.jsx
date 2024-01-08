import React, { useState, useEffect, useContext, useRef, createRef } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../App.js";


export function Text({ onChange, id, options }) {

  const canvas = useContext(FabricContext);

  // canvas.current acessa o canvas que criei via ref
  const addText = () => {
    canvas.current?.add(new fabric.Textbox("Texto", {
      left: 30,
      fill: 'blue'
    }))}

/*
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
  }, [id, onChange, textbox]);*/

  return <button onClick={addText}>Texto</button>
}