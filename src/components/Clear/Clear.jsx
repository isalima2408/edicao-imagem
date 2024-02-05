import { useContext } from "react"
import { FabricContext } from "../../App"

const Clear = () => {
    const canvas = useContext(FabricContext)

    // limpar todos os elementos do canvas, preservando o fundo
    function clearCanvas () {
        canvas.current?.remove(...canvas.current?.getObjects());
        canvas.current?.renderAll()
    }

    return <button onClick={clearCanvas} >Limpar</button>

}

export default Clear