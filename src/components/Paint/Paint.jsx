import { useContext } from "react"
import { FabricContext } from "../../App"

const Paint = ({bgImageInserted, setPaintBtnSelected, setTextBtnSelected}) => {
    const canvas = useContext(FabricContext)

    function activePaintMode () {
        if (bgImageInserted) {
            setPaintBtnSelected(true)
            setTextBtnSelected(false)
            
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
            canvas.current?.set('isDrawingMode', true)
            canvas.current.freeDrawingBrush.width = 5;
            canvas.current.freeDrawingBrush.color = 'purple'
        }
    }

    return(
        <button onClick={activePaintMode}>Desenhar</button>
    )
}

export default Paint
