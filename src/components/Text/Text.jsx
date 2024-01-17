import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import styles from './Text.module.css'


const Text = ({ bgImageInserted, setPaintBtnSelected, setTextBtnSelected }) => {
  const canvas = useContext(FabricContext);
  //console.log(textBtnSelected)

  const addText = () => {
    if (bgImageInserted) {
      setTextBtnSelected(true)
      setPaintBtnSelected(false)

      canvas.current?.set('isDrawingMode', false)

      const textbox = new fabric.Textbox("Texto", {
        left: 30,
        fill: 'back',
        textAlign: 'left',
        fontFamily: 'Arial',
        selectable: true,
        hoverCursor: 'pointer',
      })
      canvas.current?.setActiveObject(textbox)
      canvas.current?.add(textbox).renderAll()
      }
  }

  return <button className={ styles.text_button } onClick={addText} ><ion-icon name="text-outline"></ion-icon></button>
}

export default Text
