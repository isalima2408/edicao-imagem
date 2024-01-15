import { useContext, useState } from "react"
import { fabric } from "fabric"

import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import TextTools from '../TextTools/TextTools'
import Emoji from "../Emoji/Emoji"
import EmojiPicker, { EmojiStyle, EmojiClickData }  from  'emoji-picker-react' ; 

import Sticker from "../Sticker/Sticker"
import Paint from "../Paint/Paint"
import PaintTools from "../PaintTools/PaintTools"
import ExternImage from '../Image/ExternImage'
import { FabricContext } from "../../App"

const Toolbar = () => {
    const canvas = useContext(FabricContext)

    const [bgImageInserted, setBgImageInserted] = useState(false)
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)
    const [emojiBtnSelected, setEmojiBtnSelected] = useState(false)
    //const [selectedEmoji, setSelectedEmoji] = useState()

    // COLOCAR DESABILITAR DE TODOS OS ELEMENTOS AQUI (TODOS OS FALSES)
    const disablePaintMode = () => {
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
    }

    function onEmojiClick (emojiObject, e) {
     
        
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
        <div id="Toolbar">
            <BgImage setBgImageInserted={setBgImageInserted} setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode} />
            <Text bgImageInserted={bgImageInserted} setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode} />
            <ExternImage bgImageInserted={bgImageInserted} setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode}  />
            <Emoji bgImageInserted={bgImageInserted} setEmojiBtnSelected={setEmojiBtnSelected} disablePaintMode={disablePaintMode} />
            <Sticker bgImageInserted={bgImageInserted} disablePaintMode={disablePaintMode} />
            <Paint bgImageInserted={bgImageInserted} setPaintBtnSelected={setPaintBtnSelected} setTextBtnSelected={setTextBtnSelected} disablePaintMode={disablePaintMode} />
            {textBtnSelected && <TextTools />}
            {paintBtnSelected && <PaintTools setPaintBtnSelected={setPaintBtnSelected} />}
            {emojiBtnSelected && <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="native"/>}
        </div>
    )
}

export default Toolbar
