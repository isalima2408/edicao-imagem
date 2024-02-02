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
    const [bType, setBType] = useState('pencil')
    const [eraserActive, setEraserActive] = useState(false)
    const [pencilActive, setPencilActive] = useState(false)

    // modo desenho só habilita quando clicar em 'pincel' ou 'borracha'
    if(!pencilActive && !eraserActive) {
        canvas.current?.set('isDrawingMode', false)
    }

    // desabilitar desenho ao clicar em 'sair'
    const exitPaintMode = () => {
        disablePaintMode()
    }

    // tipo do pincél
    const changeBrushType = (e) => {
        //setPencilActive(!pencilActive)
        setEraserActive(false)

        switch(e.target.value) {
            case 'pencil':
                canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas?.current)
                canvas.current.freeDrawingBrush.color = 'purple'
                canvas.current.freeDrawingBrush.width = 5
                canvas.current?.set('isDrawingMode', true)
            break;
            case 'ink':
                canvas.current.freeDrawingBrush = new fabric.InkBrush(canvas?.current,{
                    width: 5,
                    color: 'purple',
                    opacity: 1
                })
                canvas.current?.set('isDrawingMode', true)
            break;
            case 'marker':
                canvas.current.freeDrawingBrush = new fabric.MarkerBrush(canvas?.current,{
                    width: 5,
                    color: 'purple',
                    opacity: 1
                })
                canvas.current?.set('isDrawingMode', true)
            break;
            default: 
                canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas?.current)
                canvas.current.freeDrawingBrush.color = 'purple'
                canvas.current.freeDrawingBrush.width = 5
                canvas.current?.set('isDrawingMode', true)
            break;
        }  
    }

    // ## INATIVO ##
    // config borracha
    /*const eraserBrush = (e) => {
        setEraserActive(!eraserActive)
        setPencilActive(false)
        setBColor('purple')
        setBWidth(5)

        canvas.current.freeDrawingBrush = new fabric.EraserBrush(canvas?.current)
        canvas.current.freeDrawingBrush.width = 5
        canvas.current?.set('isDrawingMode', true)
    }

    // espessura do traço da borracha
    const changeEraserWidth = (e) => {
        const eraserWidth = e.target.value
        canvas.current.freeDrawingBrush.width =  eraserWidth
    }*/

    // cor do traço
    const changeBrushColor = (e) => {
        const brushColor = e.target.value
        setBColor(brushColor)
        var brush = canvas.current?.freeDrawingBrush;
        brush.color = brushColor;

        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    }
    
    // espessura do traço pincél
    const changeBrushWidth = (e) => {
        const brushWidth = e.target.value
        setBWidth(brushWidth)
        canvas.current.freeDrawingBrush.width = parseInt(brushWidth, 10);
    }

    // função desfazer
    // desfaz em qualquer momento (saindo e voltando a tela de pintura)
    function undo () {   
        var obj = canvas.current?.getObjects()

        for(let i=(obj.length-1); i>=0; i--) {
            if(obj[i].type === 'path') {
                canvas.current?.remove(obj[i])
                canvas.current?.renderAll()
                return
            }
        }
    }

    return(
        <div>
            <select name="brush_type" id="brush_type" value={bType} onChange={changeBrushType}>
                <option value="pencil">Pincél</option>
                <option value="ink">Tinta</option>
                <option value="marker">Marcador</option>
            </select>
            {/*<button onClick={changeBrushType}>Pincél</button>*/}
            
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

            {/*<button onClick={eraserBrush} disabled={false} >Borracha</button>

            {eraserActive &&
                <>
                    <select name="eraser_width" id="eraser_width" onChange={changeEraserWidth}>
                        <option value="5">1</option>
                        <option value="15">2</option>
                        <option value="30">3</option>
                    </select> 
                </>
            */}
            <button onClick={undo}>Desfazer</button>
            <button onClick={exitPaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools
