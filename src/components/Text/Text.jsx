import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";


const Text = ({ textBtnSelected, setTextBtnSelected }) => {
  const canvas = useContext(FabricContext);
  //console.log(textBtnSelected)

  const addText = () => {
    setTextBtnSelected(true)

    const textbox = new fabric.Textbox("Texto", {
      left: 30,
      fill: 'blue',
      textAlign: 'left'
    })

    /*textbox.set({
      fill: 'red'
    })*/
    
    canvas.current?.add(textbox)
    console.log(textBtnSelected)
  }

  const changeAlign = () => {
    canvas.current?.getActiveObject().set('textAlign', 'center')
  }

  return (
    <div>
      <button onClick={addText} >Texto</button>
      <button onClick={changeAlign} >Texto</button>
    </div>

  )
}

export default Text
