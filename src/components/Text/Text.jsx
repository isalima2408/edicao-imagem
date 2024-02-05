import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import { useBtnStatus } from '../../contexts/BtnStatusContext.jsx';
import styles from './Text.module.css'
import { textboxConfig } from '../../functions';


const Text = () => {
  const canvas = useContext(FabricContext);
  const { setBgColor,
          disablePaintMode, 
          bgImageInserted, 
          setEmojiBtnSelected, 
          setTextBtnSelected, 
          setTextAlign, 
          setTextColor, 
          setTextFontFamily 
  } = useBtnStatus()

  // modifica funções padrão de texto da biblioteca fabric js
  textboxConfig()

  // adiciona elemento de texto ao canvas
  const addText = () => {
    
    if (bgImageInserted) {
      canvas.current?.discardActiveObject()
      setEmojiBtnSelected(false)
      setTextBtnSelected(true)
      disablePaintMode()

      const textbox = new fabric.Textbox("Texto", {
        fontFamily          : 'Roboto',
        fontStyle           : 'normal',
        fontWeight          : 'normal',
        textAlign           : 'center',
        fill                : '#000000',
        backgroundColor     : 'transparent',
        padding             : 0,
        bgCornerRadius      : 15,
        cornerSize          : 18,
        perPixelTargetFind  : false,
        originX             : 'center',
        originY             : 'center',
        selectable          : true,
        centeredScaling     : true,
        centeredRotation    : true,
        objectCaching       : false,
      })
      
      // configurando posição do controle de rotação no textbox (influencia todos os elementos, inclusive imagens e emojis)
      textbox.controls.mtr.offsetY = -35

      // desabilitando cache para evitar erros de redimensionamento
      textbox.objectCaching=false
      textbox.noScaleCache=false

      // visibilidade dos controles de dimensionamento (quando não especificado = true)
      // identificação de cada um em http://fabricjs.com/controls-customization
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

      // criando controle de exclusão somente para o texto
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

      // pegando as caracteristicas do texto selecionado para atualizar value do options do select
      textbox.on('selected', function () {
        setTextBtnSelected(true)
        let text = canvas.current?.getActiveObject()
        setTextFontFamily(() => text.get('fontFamily'))
        setTextColor(() => text.get('fill'))
        setTextAlign(() => text.get('textAlign'))
        setBgColor(( )=> text.get('backgroundColor'))
        canvas.current?.requestRenderAll()
      })

      // quando perde a seleção, o botao do texto é desativado, e logo suas ferramentas
      textbox.on('deselected', function () {
        setTextBtnSelected(false)
        canvas.current?.requestRenderAll()
      })

      // ajustar tamanho da caixa de texto após edição
      textbox.on('editing:exited', function ()  {
        canvas.current?.setActiveObject(textbox);
        var largest = Math.max.apply(Math, canvas.current?.getActiveObject().__lineWidths); 
        canvas.current?.getActiveObject().set("width", (largest + 1));
      })

      // apagar caixa de texto quando vazia
      canvas.current?.on('object:modified', function (e) {
        if(e.target.text === '') {
          canvas.current?.remove(e.target);
          canvas.current?.requestRenderAll()
          setTextBtnSelected(false)
        }
      })

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
