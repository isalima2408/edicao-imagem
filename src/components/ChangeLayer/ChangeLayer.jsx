import { useContext } from "react"
import { FabricContext } from "../../App"

const ChangeLayer = () => {
    const canvas = useContext(FabricContext)

    function sendToBack () {
        var objToBack = canvas.current?.getActiveObject()

        if(objToBack.length !==0) {
            objToBack.sendBackwards()
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
        } else {
            return
        }
    }

    function bringToFront () {
        var objToFront = canvas.current?.getActiveObject()

        if(objToFront.length !==0) {
            objToFront.bringForward()
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
        } else {
            return
        }
    }

    return (
        <>
            <button onClick={sendToBack}>Back</button>
            <button onClick={bringToFront}>Front</button>
        </>
    )
}

export default ChangeLayer
