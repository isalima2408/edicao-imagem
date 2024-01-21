import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import styles from './Text.module.css'


const Text = () => {
  const canvas = useContext(FabricContext);
  const {disablePaintMode, bgImageInserted, setEmojiBtnSelected, setTextBtnSelected, setTextAlign, setTextColor, setTextFontFamily, setTextStyle } = useBtnStatus()

  // O setActiveObject já desativa objetos selecionados
  const addText = () => {
    if (bgImageInserted) {
      canvas.current?.discardActiveObject()
      setEmojiBtnSelected(false)
      setTextBtnSelected(true)

      disablePaintMode()

      const textbox = new fabric.Textbox("Texto", {
        fill: 'back',
        textAlign: 'left',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        selectable: true,
        hoverCursor: 'pointer',
        centeredScaling: true,
        centeredRotation: true,
        objectCaching: false
        
      })

      textbox.setControlsVisibility({
        tl:false, 
        tr:false,
        ml:false, 
        mr:false, 
        bl:false, 
        mb:false, 
        mt: false,
        mtr: true,
        br: true,
      })

      textbox.on('selected', function () {
        // passar true para habilitar textTools quando o texto estiver selecionado
        setTextBtnSelected(true)
        setTextFontFamily(()=>canvas.current?.getActiveObject().get('fontFamily'))
        setTextColor(()=>canvas.current?.getActiveObject().get('fill'))
        setTextAlign(()=>canvas.current?.getActiveObject().get('textAlign'))
        setTextStyle(()=>canvas.current?.getActiveObject().get('fontStyle', 'fontWeight'))
        canvas.current?.renderAll()
        
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
