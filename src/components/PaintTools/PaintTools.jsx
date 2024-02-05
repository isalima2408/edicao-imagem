import { useContext, useState } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import 'fabric-history';
import { HuePicker } from 'react-color';

const PaintTools = () => {
    const { disablePaintMode } = useBtnStatus()   
    const [bWidth, setBWidth] = useState(5)
    const [pencilActive, setPencilActive] = useState(false)
    const [color, setColor] = useState({ background: '#A020F0' })
    const canvas = useContext(FabricContext)

    // modo desenho só habilita quando clicar em 'pincel'
    if(!pencilActive) {
        canvas.current?.set('isDrawingMode', false)
    }

    // desabilitar desenho ao clicar em 'sair'
    const exitPaintMode = () => {
        disablePaintMode()
    }

    // pincél
    const changeBrushType = (e) => {
        setPencilActive(!pencilActive)
        canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas?.current)
        canvas.current.freeDrawingBrush.color = 'purple'
        canvas.current.freeDrawingBrush.width = 5
        canvas.current?.set('isDrawingMode', true)
        }  

    // cor do traço
    const handleColorChangeComplete = (color) => {
        setColor({ background: color.hex })
        var brush = canvas.current?.freeDrawingBrush;
        brush.color = color.hex;

        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    }
    
    // espessura
    const changeBrushWidth = (e) => {
        const brushWidth = e.target.value
        setBWidth(brushWidth)
        canvas.current.freeDrawingBrush.width = parseInt(brushWidth, 10);
    }

    // função desfazer
    // desfaz em qualquer momento (saindo e voltando à tela de pintura)
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
        <div style={{ display: 'flex' }}>
            <button onClick={changeBrushType} >Pincél</button>
            
            {pencilActive && 
                <>
                    <HuePicker 
                        color={ color.background }
                        onChangeComplete={ handleColorChangeComplete }
                    />

                    <select name="brush_width" id="brush_width" value={bWidth} onChange={changeBrushWidth} >
                        <option value="5">1</option>
                        <option value="15">2</option>
                        <option value="30">3</option>
                    </select>
                </>
            }

            <button onClick={undo}>Desfazer</button>
            <button onClick={exitPaintMode}>Sair</button>
        </div>
    )
}

export default PaintTools
