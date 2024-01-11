import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";


const Text = ({ textBtnSelected, setTextBtnSelected }) => {
  const canvas = useContext(FabricContext);
  console.log(textBtnSelected)
  const addText = () => {
    setTextBtnSelected(true)
    canvas.current?.add(new fabric.Textbox("Texto", {
      left: 30,
      fill: 'blue'
    }))
    console.log(textBtnSelected)
  }

  return <button onClick={addText} >Texto</button>
}

export default Text
