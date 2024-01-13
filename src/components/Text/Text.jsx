import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";


const Text = ({ setPaintBtnSelected, setTextBtnSelected }) => {
  const canvas = useContext(FabricContext);
  //console.log(textBtnSelected)

  const addText = () => {
    setTextBtnSelected(true)
    setPaintBtnSelected(false)

    canvas.current?.set('isDrawingMode', false)

    const textbox = new fabric.Textbox("Texto", {
      left: 30,
      fill: 'back',
      textAlign: 'left',
      fontFamily: 'Arial',
      selectable: true
    })
    canvas.current?.setActiveObject(textbox)
    canvas.current?.add(textbox).renderAll()
  }


  return (
    <div>
      <button onClick={addText} >Texto</button>
    </div>
  )
}

export default Text
