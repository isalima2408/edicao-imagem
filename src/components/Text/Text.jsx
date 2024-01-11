import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";


const Text = () => {
  const canvas = useContext(FabricContext);

  const addText = () => {
    canvas.current?.add(new fabric.Textbox("Texto", {
      left: 30,
      fill: 'blue'
    }))
  }

  return <button onClick={addText} >Texto</button>
}

export default Text
