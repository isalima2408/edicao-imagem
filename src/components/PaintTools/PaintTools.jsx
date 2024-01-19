import { useContext } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"
import { useBtnStatus } from "../../contexts/BtnStatusContext"

const PaintTools = () => {
    const canvas = useContext(FabricContext)
    const { disablePaintMode } = useBtnStatus()

    const exitPaintMode = () => {
        disablePaintMode()
    }

    const changeBrushType = (e) => {
        const brushType = e.target.value
        canvas.current.freeDrawingBrush = new fabric[brushType + 'Brush'](canvas?.current);
    }

    const changeBrushColor = (e) => {
        const brushColor = e.target.value
        var brush = canvas.current?.freeDrawingBrush;
          brush.color = brushColor;
          if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
          }
    };
    
    const changeBrushWidth = (e) => {
        const brushWidth = e.target.value
        canvas.current.freeDrawingBrush.width = parseInt(brushWidth, 10);
    }
    
    const clearCanvas = () => {
        canvas.current?.clear()
    }

    return(
        <div>
            <select name="brush_type" id="brush_type" onChange={changeBrushType}>
                <option value="pencil">Pincél</option>
            </select>
            <select name="brush_color" id="brush_color" onChange={changeBrushColor}>
                <option value="purple">Roxo</option>
                <option value="red">Vermelho</option>
                <option value="black">Preto</option>
                <option value="blue">Azul</option>
            </select>
            <select name="brush_width" id="brush_width" onChange={changeBrushWidth} >
                <option value="5">1</option>
                <option value="15">2</option>
                <option value="30">3</option>
            </select>
            <button onClick={clearCanvas}>Limpar</button>
            <button onClick={exitPaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools