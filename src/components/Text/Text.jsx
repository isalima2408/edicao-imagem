import { useContext } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from "../../App.js";
import { useBtnStatus } from '../../contexts/BtnStatusContext.jsx';
import styles from './Text.module.css'


const Text = () => {
  const canvas = useContext(FabricContext);
  const { setBgColor, disablePaintMode, bgImageInserted, setEmojiBtnSelected, setTextBtnSelected, setTextAlign, setTextColor, setTextFontFamily } = useBtnStatus()


  // alterando a lógica do 'padding' padrão da biblioteca fabric para proporcionar aplicação de cor de fundo em toda a caixa de texto, e não apenas na linha do texto.
  fabric.Text.prototype.set({
    _getNonTransformedDimensions() { // Object dimensions
      return new fabric.Point(this.width, this.height).scalarAdd(this.padding);
    },
    _calculateCurrentDimensions() { // Controls dimensions
      return fabric.util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true);
    }
  });

  // modificando limitador de linhas de 'espaço' para 'enter'. Agora, cada 'enter' pula a linha.
  fabric.Textbox.prototype._wordJoiners = /[]/

  // Para que a ação anterior ocorra durante a edição
  function fitTextboxToContent(text) {
    const textLinesMaxWidth = text.textLines.reduce((max, _, i) => Math.max(max, text.getLineWidth(i)), 0);
    text.set({width: textLinesMaxWidth});
  }

  // código para adicionar bordas arredondadas a caixa de texto através do atributo 'bgCornerRadius'
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  }
  
  fabric.Textbox.prototype._renderBackground = function(ctx) {
    if (!this.backgroundColor) {
      return;
    }
    var dim = this._getNonTransformedDimensions();
    ctx.fillStyle = this.backgroundColor;

    if(!this.bgCornerRadius) {
      ctx.fillRect(
        -dim.x / 2,
        -dim.y / 2,
        dim.x,
        dim.y
      );
    } else {
      ctx.roundRect(-dim.x / 2, -dim.y / 2, dim.x, dim.y, this.bgCornerRadius).fill();
    }
    // if there is background color no other shadows
    // should be casted
    this._removeShadow(ctx);
  }

  const addText = () => {
    console.log(canvas.current?.getObjects().length)
    
    if (bgImageInserted) {
      canvas.current?.discardActiveObject()
      setEmojiBtnSelected(false)
      setTextBtnSelected(true)
      disablePaintMode()

      const textbox = new fabric.Textbox("Texto", {
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
        backgroundColor: 'transparent',
        padding: 0,
        bgCornerRadius: 15,
        cornerSize: 18,
        perPixelTargetFind: false,
        originX: 'center',
        originY: 'center',
        selectable: true,
        erasable: false,
        centeredScaling: true,
        centeredRotation: true,
      })

      // configurando posição do controle de rotação no textbox (influencia todos os elementos, inclusive imagens e emojis)
      textbox.controls.mtr.offsetY = -35

      // desabilitando cache
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

      // criando controle de exclusão somente para o texto (desvinculado do global)
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
        setTextFontFamily(()=>canvas.current?.getActiveObject().get('fontFamily'))
        setTextColor(()=>canvas.current?.getActiveObject().get('fill'))
        setTextAlign(()=>canvas.current?.getActiveObject().get('textAlign'))
        setBgColor(()=>canvas.current?.getActiveObject().get('backgroundColor'))
        canvas.current?.requestRenderAll()
      })

      // quando perde a seleção, o botao do texto é desativado
      textbox.on('deselected', function () {
        setTextBtnSelected(false)
        canvas.current?.requestRenderAll()
      })

      // apagar caixa de texto quando vazia
      canvas.current?.on('object:modified', removeEmptyTextbox)
      function removeEmptyTextbox(e) {
        if(e.target.text === '') {
          canvas.current?.remove(e.target);
          canvas.current?.requestRenderAll()
          setTextBtnSelected(false)
        }
      }

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
