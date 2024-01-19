import styles from './Emoji.module.css'
import { useContext } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import EmojiPicker from  'emoji-picker-react' ;

const Emoji = () => {
    const canvas = useContext(FabricContext)
    const { bgImageInserted, emojiBtnSelected, setEmojiBtnSelected, setPaintBtnSelected, setStickerBtnSelected, setTextBtnSelected } = useBtnStatus()

    function disableElements() {
        if(bgImageInserted) {
            setEmojiBtnSelected(val => !val)
            canvas.current?.set('isDrawingMode', false)
            canvas.current?.discardActiveObject().renderAll()
            setTextBtnSelected(false)
            setPaintBtnSelected(false)
            setStickerBtnSelected(false)
        }
    }

    function onEmojiClick (emojiObject, e) {
        // Botão alternante (ativa/desativa)
        setEmojiBtnSelected(false)
  
        var emojiURL = emojiObject.imageUrl

        new fabric.Image.fromURL(emojiURL, function(img) {
            img.set({
                selectable: true,
                hoverCursor: 'pointer',
                centeredScaling: true,
                centeredRotation: true,
            })
            canvas.current?.add(img)
            canvas.current?.centerObject(img)
            img.setCoords()
            canvas.current?.setActiveObject(img).renderAll()
        })
    }

    return (
        <span className={ styles.btn_emoji }>
            <button className={ styles.emoji_icon } onClick={ disableElements }>
                <ion-icon name="happy-outline"></ion-icon>
            </button>
            <div className={ styles.emoji_box }>
                {emojiBtnSelected && <EmojiPicker onEmojiClick={ onEmojiClick } emojiStyle="apple"/>}
            </div>
        </span>   
    )
}

export default Emoji
