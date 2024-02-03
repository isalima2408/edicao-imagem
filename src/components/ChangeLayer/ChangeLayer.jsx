import { useContext } from "react"
import { FabricContext } from "../../App"

const ChangeLayer = () => {
    const canvas = useContext(FabricContext)

    // levar para trás
    function sendBackwards () {
        var objBackward = canvas.current?.getActiveObject()

        if (!objBackward) {
            return
        } else {
            objBackward.sendBackwards()
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
        }
    }

    // trazer para frente
    function bringForward () {
        var objForward = canvas.current?.getActiveObject()

        if (!objForward) {
            return
        } else {
            objForward.bringForward()
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
        }
    }

    // enviar para trás
    function sendToBack () {
        var objToBack = canvas.current?.getActiveObject()

        if (!objToBack) {
            return
        } else {
            objToBack.sendToBack()
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
        }
    }

    // enviar para frente
    function bringToFront () {
        var objToFront = canvas.current?.getActiveObject()

        if (!objToFront) {
            return
        } else {
            objToFront.bringToFront()
            canvas.current?.discardActiveObject()
            canvas.current?.renderAll()
        }
    }

    return (
        <>
            <button onClick={sendBackwards} >Back</button>
            <button onClick={bringForward} >Front</button>
            <button onClick={sendToBack} >STBack</button>
            <button onClick={bringToFront} >BTFront</button>
        </>
    )
}

export default ChangeLayer
