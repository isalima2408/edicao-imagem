import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import styles from './Text.module.css'


const Text = () => {
  const canvas = useContext(FabricContext);
  const {bgImageInserted, setPaintBtnSelected, setTextBtnSelected} = useBtnStatus()

  // O setActiveObject já desativa objetos selecionados
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
        centeredScaling: true,
        centeredRotation: true,
      })

      canvas.current?.add(textbox)
      canvas.current?.centerObject(textbox)
      textbox.setCoords()
      canvas.current?.setActiveObject(textbox).renderAll()
      }
  }

  return (
    <button className={ styles.text_button } onClick={addText} >
      <ion-icon name="text-outline"></ion-icon>
    </button>
  )
}

export default Text
