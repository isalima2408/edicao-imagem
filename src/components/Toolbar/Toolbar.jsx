import { useContext, useState } from "react"
import { fabric } from "fabric"

import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import TextTools from '../TextTools/TextTools'
import Emoji from "../Emoji/Emoji"
import Sticker from "../Sticker/Sticker"
import Paint from "../Paint/Paint"
import PaintTools from "../PaintTools/PaintTools"
import ExternImage from '../Image/ExternImage'
import Download from "../Download/Download"
import { FabricContext } from "../../App"
import { BtnStatusProvider } from "../../contexts/BtnStatusContext"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import styles from "./Toolbar.module.css"

const Toolbar = () => {
    const canvas = useContext(FabricContext)
    const { textBtnSelected, paintBtnSelected } = useBtnStatus()

    return(
        <>
            <div id="toolbar" className={styles.toolbar}>
                <div className={ styles.main_tools }>
                    <BgImage />
                    <Text />
                    <ExternImage />
                    <Emoji />
                    <Sticker />
                    <Paint />
                    <Download />   
                </div>
            </div>
            <div className={ styles.custom_tools } >
                {textBtnSelected && <TextTools />}
                {paintBtnSelected && <PaintTools />}
            </div>
        </>
        
    )
}

export default Toolbar
