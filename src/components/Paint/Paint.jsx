import { useContext } from "react"
import { FabricContext } from "../../App"

const Paint = ({setPaintBtnSelected, setTextBtnSelected}) => {
    const canvas = useContext(FabricContext)

    function activePaintMode () {
        setPaintBtnSelected(true)
        setTextBtnSelected(false)
        
        canvas.current?.set('isDrawingMode', true)
    }

    return(
        <button onClick={activePaintMode}>Desenhar</button>
    )
}

export default Paint
