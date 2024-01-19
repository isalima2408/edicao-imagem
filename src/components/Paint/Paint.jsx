import styles from './Paint.module.css'
import { useContext } from "react"
import { FabricContext } from "../../App"
import { useBtnStatus } from "../../contexts/BtnStatusContext"

const Paint = ({}) => {
    const canvas = useContext(FabricContext)
    const { bgImageInserted, setPaintBtnSelected, setTextBtnSelected } = useBtnStatus()

    function activePaintMode () {
        if (bgImageInserted) {
            setPaintBtnSelected(true)
            setTextBtnSelected(false)
            
            canvas.current?.discardActiveObject().renderAll()
            canvas.current?.set('isDrawingMode', true)
            canvas.current.freeDrawingBrush.width = 5;
            canvas.current.freeDrawingBrush.color = 'purple'
        }
    }

    return(
        <button className={ styles.paint_icon } onClick={activePaintMode}>
            <ion-icon name="pencil-outline"></ion-icon>
        </button>
    )
}

export default Paint
