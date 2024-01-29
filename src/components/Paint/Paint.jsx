import styles from './Paint.module.css'
import { useContext } from "react"
import { FabricContext } from "../../App"
import { useBtnStatus } from "../../contexts/BtnStatusContext"

const Paint = () => {
    const canvas = useContext(FabricContext)
    const { bgImageInserted, setPaintBtnSelected, setTextBtnSelected } = useBtnStatus()

    // ativando o paintMode, e desativando o 'scroll', pois em desenho a tela nao pode se movimentar
    function activePaintMode () {
        if (bgImageInserted) {  
            canvas.current?.discardActiveObject().renderAll()  
            setPaintBtnSelected(true)
            setTextBtnSelected(false)

            canvas.current?.set('allowTouchScrolling', false) 
        }
    }

    return(
        <button className={ styles.paint_icon } onClick={activePaintMode}>
            <ion-icon name="pencil-outline"></ion-icon>
        </button>
    )
}

export default Paint
