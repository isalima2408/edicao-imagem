import { useContext, useState } from "react"
import { fabric } from "fabric"

import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import TextTools from '../TextTools/TextTools'
import Emoji from "../Emoji/Emoji"
import EmojiPicker from  'emoji-picker-react' ; 

import Sticker from "../Sticker/Sticker"
import Paint from "../Paint/Paint"
import PaintTools from "../PaintTools/PaintTools"
import ExternImage from '../Image/ExternImage'
import Download from "../Download/Download"
import { FabricContext } from "../../App"
import styles from "./Toolbar.module.css"

const Toolbar = () => {
    const canvas = useContext(FabricContext)

    const [bgImageInserted, setBgImageInserted] = useState(false)
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)
    const [emojiBtnSelected, setEmojiBtnSelected] = useState(false)

    // COLOCAR DESABILITAR DE TODOS OS ELEMENTOS AQUI (TODOS OS FALSES)
    const disablePaintMode = () => {
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
    }

    function onEmojiClick (emojiObject, e) {
        setEmojiBtnSelected(false)
        
        var emojiURL = emojiObject.imageUrl
        console.log(emojiObject)
        console.log(emojiObject.imageUrl)
        console.log("teste: https://www.youtube.com/watch?v=WXUK_xK1RTk")

        new fabric.Image.fromURL(emojiURL, function(img) {
            img.set({
                selectable: true,
                hoverCursor: 'default'
            })
            canvas.current?.add(img)
            canvas.current?.renderAll()
        })
    }

    return(
        <div id="toolbar" className={styles.toolbar}>
            <div className={ styles.main_tools }>
                <BgImage setBgImageInserted={setBgImageInserted} setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode} />
                <Text bgImageInserted={bgImageInserted} setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode} />
                <ExternImage bgImageInserted={bgImageInserted} setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode}  />
                
                <span className={ styles.btn_emoji }>
                    <Emoji bgImageInserted={bgImageInserted} setEmojiBtnSelected={setEmojiBtnSelected} disablePaintMode={disablePaintMode} />
                    <div className={ styles.emoji_box }>
                    {emojiBtnSelected && <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="native"/>}
                    </div>
                </span>

                <Sticker bgImageInserted={bgImageInserted} disablePaintMode={disablePaintMode} />
                <Paint bgImageInserted={bgImageInserted} setPaintBtnSelected={setPaintBtnSelected} setTextBtnSelected={setTextBtnSelected} disablePaintMode={disablePaintMode} />
                <Download />
            </div>
            <div className={ styles.custom_tools } >
                {textBtnSelected && <TextTools />}
                {paintBtnSelected && <PaintTools setPaintBtnSelected={setPaintBtnSelected} />}
            </div>
        </div>
    )
}

export default Toolbar
