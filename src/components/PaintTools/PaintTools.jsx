import { useContext } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"

const PaintTools = ({setPaintBtnSelected}) => {
    const canvas = useContext(FabricContext)

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

    const disablePaintMode = () => {
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
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
                <option value="red">Vermelho</option>
                <option value="black">Preto</option>
                <option value="blue">Azul</option>
            </select>
            <select name="brush_width" id="brush_width" onChange={changeBrushWidth} >
                <option value="3">1</option>
                <option value="7">2</option>
                <option value="15">3</option>
            </select>
            <button onClick={clearCanvas}>Limpar</button>
            <button onClick={disablePaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools