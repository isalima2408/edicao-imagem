import { useContext } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import 'fabric-history';

const PaintTools = () => {
    const canvas = useContext(FabricContext)
    const { disablePaintMode } = useBtnStatus()

    

    const exitPaintMode = () => {
        disablePaintMode()
    }

    const changeBrushType = (e) => {
        const brushType = e.target.value

        switch(brushType) {
            case 'pencil':
                canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas.current);
                canvas.current.freeDrawingBrush.width = 35;
                canvas.current.isDrawingMode = true;
                break;
            case 'eraser':
                canvas.current.freeDrawingBrush = new fabric.EraserBrush(canvas.current);
                canvas.current.freeDrawingBrush.width = 10;
                canvas.current.isDrawingMode = true;
                break;
        }
                
    }
        /*canvas.current.freeDrawingBrush = new fabric[brushType + 'Brush'](canvas?.current);
        canvas.current.isDrawingMode = true*/

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

    function undo () {
        var lastItemIndex = (canvas.current?.getObjects().length - 1);
        var item = canvas.current?.item(lastItemIndex);

        if(item.get('type') === 'path') {
            canvas.current?.remove(item);
            canvas.current?.renderAll();
}
    }

    return(
        <div>
            <select name="brush_type" id="brush_type" onChange={changeBrushType}>
                <option value="pencil">Pincél</option>
                <option value="eraser">Borracha</option>
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
            <button onClick={undo}>Desfazer</button>
            
            <button onClick={clearCanvas}>Limpar</button>
            <button onClick={exitPaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools