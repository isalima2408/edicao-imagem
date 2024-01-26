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
    //const [eraserBtnDisabled, setEraserBtnDisabled] = useState(true)


    if(!pencilActive && !eraserActive) {
        canvas.current?.set('isDrawingMode', false)
    }


    const exitPaintMode = () => {
        disablePaintMode()
    }

    const changeBrushType = (e) => {
        setPencilActive(!pencilActive)
        setEraserActive(false)
        
        canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas?.current)
        canvas.current.freeDrawingBrush.color = 'purple'
        canvas.current.freeDrawingBrush.width = 5
        canvas.current?.set('isDrawingMode', true)
    }

    const eraserBrush = (e) => {
        setEraserActive(!eraserActive)
        setPencilActive(false)
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
        var lastItemIndex = (canvas.current?.getObjects().length - 1);
        var item = canvas.current?.item(lastItemIndex);

        if (lastItemIndex < 0) {
            return
        } else if (item.get('type') === 'path'){
            canvas.current?.remove(item);
            canvas.current?.renderAll();
        }       
    }

    

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
            <button onClick={undo} >Desfazer</button>
            <button onClick={exitPaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools
