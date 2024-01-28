import { useContext } from "react"
import { FabricContext } from "../../App"

const Clear = () => {
    const canvas = useContext(FabricContext)
    function clearCanvas () {
        canvas.current?.remove(...canvas.current?.getObjects());
        canvas.current?.renderAll()
    }

    return(
        <button onClick={clearCanvas}>
            Limpar
        </button>
    )
}

export default Clear