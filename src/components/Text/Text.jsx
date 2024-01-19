import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import styles from './Text.module.css'


const Text = () => {
  const canvas = useContext(FabricContext);
  const {disablePaintMode, bgImageInserted, setPaintBtnSelected, setTextBtnSelected, setTextAlign, setTextColor, setTextFontFamily} = useBtnStatus()

  // O setActiveObject já desativa objetos selecionados
  const addText = () => {
    if (bgImageInserted) {

      setTextBtnSelected(true)

      disablePaintMode()

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

      textbox.on('selected', function () {
        // passar true para habilitar textTools quando o texto estiver selecionado
        setTextBtnSelected(true)
        setTextFontFamily(()=>canvas.current?.getActiveObject().get('fontFamily'))
        setTextColor(()=>canvas.current?.getActiveObject().get('fill'))
        setTextAlign(()=>canvas.current?.getActiveObject().get('textAlign'))
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
