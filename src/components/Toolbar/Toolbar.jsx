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


const Toolbar = () => {
    const { textBtnSelected, paintBtnSelected, shapeSelected } = useBtnStatus()

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
