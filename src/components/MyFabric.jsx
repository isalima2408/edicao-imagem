import { useContext, useCallback } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../App.js";
import styles from "./MyFabric.module.css";
import { useBtnStatus } from '../contexts/BtnStatusContext.jsx'

export const useFabric = () => {
    const canvas = useContext(FabricContext);
    const {setTextBtnSelected} = useBtnStatus()
    const { innerWidth: width, innerHeight: height } = window

    //alert("att")
    // 60 é o tamanho da barra de ferramentas total (main_tools + custom_tools)
    const canvasHeight = height - 60

    console.log("att3")

    // criando canvas
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
      canvas.current = new fabric.Canvas(element, {
        selection: false,
        backgroundColor: 'gray',
        hoverCursor: 'default',
        height: 0,
        allowTouchScrolling: true,
        //maxFingers:1,
        isTouchSupported: false,
        controlsAboveOverlay: true,


        transparentCorners: false,
        imageSmoothingEnabled: false,
        webkitImageSmoothingEnabled: false,
        mozImageSmoothingEnabled: false,
        msImageSmoothingEnabled: false,
        oImageSmoothingEnabled: false,
        objectCaching: false
      });

      canvas.current?.on('touch:gesture', function (e) {
        console.log("touch:gesture event capturado")
      })

      fabric.util.addListener(canvas.current?.lowerCanvasEl, 'touch:start', function (e) {
        console.log("touch:start")
      })

      canvas.current?.on('touch:longpress', preventLongpress)

      function preventLongpress (opt) {
        opt.e.preventDefault()
      }

      fabric.Object.prototype.isTouchSupported = false

      // desabilitando seleção de todos os elementos (para atingir a função desenho)
      fabric.Object.prototype.selectable = false

      // configurando controles globais
      fabric.Object.prototype.transparentCorners = false
      fabric.Object.prototype.cornerStyle = 'circle'
      fabric.Object.prototype.cornerColor = 'purple'
      fabric.Object.prototype.cornerSize = 18
      


      // ALTERNATIVA 1 (NOT WORKING)
      /*var tmf = function(e) {
        e.preventDefault();
      };
      canvas.current?.on('mouse:down', function(e) {
        if (canvas.getActiveObject()) {
            $('*').bind('touchmove', tmf);
        }
      });
      canvas.current?.on('mouse:up', function(e) {
        $('*').unbind('touchmove', tmf);
      });*/

      /* ALTERNATIVA 2 */
      var disableScroll = function(){
        canvas.current?.set('allowTouchScrolling', false)
        
        console.log(canvas.current?.get('allowTouchScrolling'))
      };
    
      var enableScroll = function(){
        canvas.current?.set('allowTouchScrolling', true)
        console.log(canvas.current?.get('allowTouchScrolling'))
      };

      canvas.current?.on('object:selected', disableScroll);
      canvas.current?.on('selection:created', disableScroll);
      canvas.current?.on('selection:cleared', enableScroll);

      //canvas.current?.on('path:created', disableScroll);
      //canvas.current?.on('object:added', enableScroll);

      /*canvas.current?.on('object:moving', disableScroll);
      canvas.current?.on('object:scaling', disableScroll);
      canvas.current?.on('object:rotating', disableScroll);
      canvas.current?.on('object:resizing', disableScroll);
      canvas.current?.on('mouse:up', enableScroll);
      //canvas.current?.on('mouse:down', disableScroll);*/
      

      // criando controle de exclusão no elemento (somente imagens e formas)
      var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
      var img = document.createElement('img');
      img.src = deleteIcon;

      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 20
      });

      // controle de exclusão para texto
      /*fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 20
      });*/
     
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

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return fabricRef;
  };
  
function MyFabric() {
    const fabricRef = useFabric();

    return(
      <div className={ styles.my_fabric }>
        <canvas ref={fabricRef} />
      </div>
    )
}

export default MyFabric
