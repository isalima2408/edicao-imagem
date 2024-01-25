import { useContext, useState } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import 'fabric-history';

const PaintTools = () => {
    const canvas = useContext(FabricContext)
    const { disablePaintMode } = useBtnStatus()
    const [bWidth, setBWidth] = useState(5)
    const [bColor, setBColor] = useState('purple')
    const [eraserActive, setEraserActive] = useState(false)
    const [pencilActive, setPencilActive] = useState(false)
    const [eraserBtnDisabled, setEraserBtnDisabled] = useState(true)

    // habilita o botão borracha ao haver algum desenho
    canvas.current?.on('path:created', function (e) {
        var oi = canvas.current?.getObjects()

        oi.forEach(element => {
            element.set('dirty', true)
        });

        canvas.current?.requestRenderAll()
        /*var lastItemIndex = (canvas.current?.getObjects().length - 1)
        var brush = canvas.current?.item(lastItemIndex)
        brush.set('dirty', true)
        //console.log(brush)
        // botão da borracha
        /*setEraserBtnDisabled(false)
        save()*/
    })

    canvas.current.on('erasing:end', function () {
        var objs = canvas.current?.getObjects()
        console.log(canvas.current?.getObjects())
        //var arrObj = objs._objects

        objs.forEach((obj) => {
            if(obj.eraser) {
                obj.eraser.set('dirty', true)  
            }
        })
        canvas.current?.requestRenderAll()
        //save()
    })

    if(!pencilActive && !eraserActive) {
        canvas.current?.set('isDrawingMode', false)
    }

    const exitPaintMode = () => {
        disablePaintMode()
    }

    const changeBrushType = (e) => {
        setPencilActive(!pencilActive)
        // função da borracha
        setEraserActive(false)
        
        canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas?.current)
        canvas.current.freeDrawingBrush.color = 'purple'
        canvas.current.freeDrawingBrush.width = 5
        canvas.current?.set('isDrawingMode', true)
    }

    const eraserBrush = (e) => {
        setEraserActive(!eraserActive)
        setPencilActive(false)
        // setando novo estado inicial para o pincél (pra quando alternar pra ele denovo)
        setBColor('purple')
        setBWidth(5)

        canvas.current.freeDrawingBrush = new fabric.EraserBrush(canvas?.current)
        canvas.current.freeDrawingBrush.width = 5
        canvas.current?.set('isDrawingMode', true)
    }

    const changeEraserWidth = (e) => {
        const eraserWidth = e.target.value
        canvas.current.freeDrawingBrush.width =  eraserWidth
    }

    const changeBrushColor = (e) => {
        const brushColor = e.target.value
        setBColor(brushColor)
        var brush = canvas.current?.freeDrawingBrush;
        brush.color = brushColor;

        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    }
    
    const changeBrushWidth = (e) => {
        const brushWidth = e.target.value
        setBWidth(brushWidth)
        canvas.current.freeDrawingBrush.width = parseInt(brushWidth, 10);
    }

    function undo () {
        
        /*var BGclipPath = canvas.current?.backgroundImage.clipPath.set("dirty", true);
        //BGclipPath.set("dirty", true);
        var objects = canvas.current?.backgroundImage.clipPath.getObjects('path');

        if (objects.length !== 0) {
            BGclipPath._objects = BGclipPath._objects.slice(0, -1);
            canvas.current?.backgroundImage.set({ clipPath: BGclipPath, dirty: true});
            canvas.requestRenderAll();
        }*/
        //replay(undo, redo)

        //console.log(canvas?.current.getObjects())
        var lastItemIndex = (canvas.current?.getObjects().length - 1)
        var item = canvas.current?.item(lastItemIndex)

        if(item.eraser) {
            item.eraser._objects = item.eraser._objects.slice(0, -1)
            canvas.current?.requestRenderAll()
        }
        
        //console.log(item)


        /*console.log(canvas.current?.getObjects())
        console.log(eraser)
        console.log(eraser._objects)*/
        
        /*var lastItemIndex = (canvas.current?.getObjects().length - 1);
        var item = canvas.current?.item(lastItemIndex);

        if (lastItemIndex === 1) {
            setEraserBtnDisabled(true)
        } 
        if (lastItemIndex < 0) {
            return
            // se tipo = path, remova o item desse tipo e atualize o canvas
        } else if (item.get('type') === 'path'){
            canvas.current?.remove(item);
            canvas.current?.renderAll();
        }    */        
    }

    /*
    const [redoBtnDisabled, setRedoBtnDisabled] = useState(false)
    const [undoBtnDisabled, setUndoBtnDisabled] = useState(false)

    var state
    var undo = []
    var redo = []

    function save() {
        redo = []
        setRedoBtnDisabled(true)

        if(state) {
            undo.push(state)
            setUndoBtnDisabled(false)
        }
        state = JSON.stringify(canvas?.current)
    }

    function replay(playStack, saveStack, buttonsOn, buttonsOff) {
        saveStack.push(state);
        state = playStack.pop();
        /*var on = $(buttonsOn);
        var off = $(buttonsOff);*/

        // turn both buttons off for the moment to prevent rapid clicking
        /*on.prop('disabled', true);
        off.prop('disabled', true);*/

        // por enquanto deixar os botoes habilitados, quando o programa funcionar vir aqui e ver como faço pra habilitar
        /*setRedoBtnDisabled(true)
        setUndoBtnDisabled(true)*/

        // verificar aqui (entendi que ele limpa pra remontar)
        //canvas.current?.clear();

        //canvas.current?.loadFromJSON(state, function() {
         // canvas.current?.renderAll();
          // now turn the buttons back on if applicable
          /*on.prop('disabled', false);
          if (playStack.length) {
            off.prop('disabled', false);
          }*/
        //});
      //}

      /*$(function() {*/
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Set up the canvas

        /*canvas = new fabric.Canvas('canvas');
        canvas.setWidth(500);
        canvas.setHeight(500);*/

        // save initial state
        //save();
        // register event listener for user's actions
        /*canvas.current?.on('object:modified', function() {
          save();
        });*/

        // draw button
        /*$('#draw').click(function() {
          var imgObj = new fabric.Circle({
            fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
            radius: Math.random() * 250,
            left: Math.random() * 250,
            top: Math.random() * 250
          });
          canvas.add(imgObj);
          canvas.renderAll();
          save();
        });*/

        // undo and redo buttons
        /*$('#undo').click(function() {
          replay(undo, redo, '#redo', this);
        });
        $('#redo').click(function() {
          replay(redo, undo, '#undo', this);
        })
      });*/

      /*
      function undoFunction () {
        replay(undo, redo)
        /*var lastItemIndex = (canvas.current?.getObjects().length - 1);
        var item = canvas.current?.item(lastItemIndex);
        

        if (lastItemIndex === 1) {
            setEraserBtnDisabled(true)
        } 
        if (lastItemIndex < 0) {
            return
            // se tipo = path, remova o item desse tipo e atualize o canvas
        } else if (item.get('type') === 'path'){
            canvas.current?.remove(item);
            canvas.current?.renderAll();
        }            
    }*/

    /*function redoFunction () {
        replay(redo, undo)
    }*/


    return(
        <div>
            <button onClick={changeBrushType}>Pincél</button>
            
            {pencilActive && 
                <>
                    <select name="brush_color" id="brush_color" value={bColor} onChange={changeBrushColor}>
                        <option value="purple">Roxo</option>
                        <option value="red">Vermelho</option>
                        <option value="black">Preto</option>
                        <option value="blue">Azul</option>
                    </select>

                    <select name="brush_width" id="brush_width" value={bWidth} onChange={changeBrushWidth} >
                        <option value="5">1</option>
                        <option value="15">2</option>
                        <option value="30">3</option>
                    </select>
                </>
            }

            <button onClick={eraserBrush} disabled={false} >Borracha</button>

            {eraserActive &&
                <>
                    <select name="eraser_width" id="eraser_width" onChange={changeEraserWidth}>
                        <option value="5">1</option>
                        <option value="15">2</option>
                        <option value="30">3</option>
                    </select> 
                </>
            }
            <button onClick={undo} /*disabled={/*undoBtnDisabled}*/ >Desfazer</button>
            <button /* onClick={redoFunction} disabled={redoBtnDisabled}*/ >Refazer</button>
            <button onClick={exitPaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools
