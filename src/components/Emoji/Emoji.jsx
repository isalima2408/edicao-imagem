import styles from './Emoji.module.css'
import { useContext } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';

import EmojiPicker from  'emoji-picker-react' ;

const Emoji = () => {
    const canvas = useContext(FabricContext)
    const { emojiBtnSelected, setEmojiBtnSelected } = useBtnStatus()

    function onEmojiClick (emojiObject, e) {
        setEmojiBtnSelected(false)
        
        var emojiURL = emojiObject.imageUrl

        new fabric.Image.fromURL(emojiURL, function(img) {
            img.set({
                selectable: true,
                hoverCursor: 'default'
            })
            canvas.current?.setActiveObject(img)
            canvas.current?.add(img)
            canvas.current?.renderAll()
        })
    }

    return (
        <span className={ styles.btn_emoji }>
            <button className={ styles.emoji_icon } onClick={() => setEmojiBtnSelected(val => !val)}>
                <ion-icon name="happy-outline"></ion-icon>
            </button>
            <div className={ styles.emoji_box }>
                {emojiBtnSelected && <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="apple"/>}
            </div>
        </span>   
    )
}

export default Emoji
