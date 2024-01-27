import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import { useBtnStatus } from '../../contexts/BtnStatusContext.jsx';
import styles from './Text.module.css'


const Text = () => {
  const canvas = useContext(FabricContext);
  const {disablePaintMode, bgImageInserted, setEmojiBtnSelected, setTextBtnSelected, setTextAlign, setTextColor, setTextFontFamily, setTextStyle } = useBtnStatus()

  const addText = () => {
    
    if (bgImageInserted) {
      canvas.current?.discardActiveObject()
      setEmojiBtnSelected(false)
      setTextBtnSelected(true)
      disablePaintMode()

      const textbox = new fabric.Textbox("Texto", {
        fill: 'black',
        textAlign: 'left',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        selectable: true,
        erasable: false,
        centeredScaling: true,
        centeredRotation: true,
        objectCaching: true,

      })

      textbox.setControlsVisibility({
        tl: false, 
        tr: false,
        ml: true, 
        mr: false, 
        bl: false, 
        mb: false, 
        mt: false,
        mtr: true,
        br: true,
      })


      var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
      var img = document.createElement('img');
      img.src = deleteIcon;

      textbox.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 20
      });
     
      function deleteObject(eventData, transform) {
        var target = transform.target;
        canvas.current?.remove(target);
        canvas.current?.requestRenderAll();
        setTextBtnSelected(false)
      }
    
      function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size/2, -size/2, size, size);
        ctx.restore();
      } 


      textbox.on('selected', function () {
        // passar true para habilitar textTools quando o texto estiver selecionado
        setTextBtnSelected(true)
        setTextFontFamily(()=>canvas.current?.getActiveObject().get('fontFamily'))
        setTextColor(()=>canvas.current?.getActiveObject().get('fill'))
        setTextAlign(()=>canvas.current?.getActiveObject().get('textAlign'))
        setTextStyle(()=>canvas.current?.getActiveObject().get('fontStyle', 'fontWeight'))
        canvas.current?.requestRenderAll()
      })

      textbox.on('deselected', function () {
        setTextBtnSelected(false)
        canvas.current?.requestRenderAll()
      })

      // apagar caixa de texto quando vazio
      canvas.current?.on('object:modified', removeEmptyTextbox)
      function removeEmptyTextbox(e) {
        if(e.target.text === '') {
          canvas.current?.remove(e.target);
          canvas.current?.requestRenderAll()
          setTextBtnSelected(false)
        }
      }

      // adicionando / atualizando renderização do elemento no canvas
      canvas.current?.add(textbox)
      canvas.current?.centerObject(textbox)
      textbox.setCoords()
      canvas.current?.setActiveObject(textbox).requestRenderAll()
    }
  }

  return (
    <button className={ styles.text_button } onClick={addText} >
      <ion-icon name="text-outline"></ion-icon>
    </button>
  )
}

export default Text
