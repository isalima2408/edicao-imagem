import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import TextTools from '../TextTools/TextTools'
import Emoji from "../Emoji/Emoji"
import ShapeTools from "../ShapeTools/ShapeTools"
import Paint from "../Paint/Paint"
import PaintTools from "../PaintTools/PaintTools"
import ExternImage from '../Image/ExternImage'
import Clear from "../Clear/Clear"
import ChangeLayer from "../ChangeLayer/ChangeLayer"
import Download from "../Download/Download"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import styles from "./Toolbar.module.css"

import { useContext } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"


const Toolbar = () => {
    const { textBtnSelected, paintBtnSelected, shapeSelected } = useBtnStatus()
    const canvas = useContext(FabricContext)


    // teste
    /*function createRect() {
        var rect = new fabric.Rect({
            fill: 'transparent',
            width: 200,
            height: 100,
            strokeWidth: 5, 
            stroke: 'rgba(255,0,0,1)',
            strokeUniform: true,
            selectable: true,
            erasable: false,
        })

        rect.on('modified', roundCorner)

        /*function roundCorner() {
            var h = rect.get('height')
            var w = rect.get('width')
            console.log(h, w)
            rect.set({
                ry: equals,
                rx: equals,
            })
        }

        canvas.current?.add(rect)
        canvas.current?.centerObject(rect)
        rect.setCoords()
        canvas.current?.setActiveObject(rect).renderAll()
    }*/

    return(
        <>
            <div id="toolbar" className={styles.toolbar}>
                <div className={ styles.main_tools }>
                    <BgImage />
                    <Text />
                    <ExternImage />
                    <Emoji />
                    <Paint />
                    <Clear />
                    <ChangeLayer />
                    <Download />
                    {/*<button onClick={createRect}>Rect</button>*/}
                </div>
            </div>
            <div className={ styles.custom_tools } >
                {textBtnSelected && <TextTools />}
                {paintBtnSelected && <PaintTools />}
                {shapeSelected && <ShapeTools />}
            </div>
        </>  
    )
}

export default Toolbar
