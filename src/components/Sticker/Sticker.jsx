import styles from './Sticker.module.css'
import { useContext } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import EmojiPicker from  'emoji-picker-react' ;


const Sticker = () => {
    const canvas = useContext(FabricContext)
    const { bgImageInserted, stickerBtnSelected, setStickerBtnSelected, setEmojiBtnSelected, setPaintBtnSelected, setTextBtnSelected} = useBtnStatus()

    const defaultStickers = [
        {
            names: ['SUBZERO', 'Subzero perfil'],
            imgUrl: 'https://avatarfiles.alphacoders.com/342/342681.png',
            id: 'subzero',
        },
        {
            names: ['Mileena', 'Mileena perfil'],
            imgUrl: 'https://i.pinimg.com/736x/39/d3/58/39d358101746ec8699ec7670c0aa3e31.jpg',
            id: 'mileena',
        },
        {
            names: ['Scorpion', 'Scorpion perfil'],
            imgUrl: 'https://i.redd.it/cv9przqquufb1.jpg',
            id: 'scorpion',
        }
    ]

    function disableElements() {
        if(bgImageInserted) {
            setStickerBtnSelected(val => !val)
            canvas.current?.set('isDrawingMode', false)
            canvas.current?.discardActiveObject().renderAll()
            setTextBtnSelected(false)
            setPaintBtnSelected(false)
            setEmojiBtnSelected(false)
        }
    }

    function onStickerClick (emojiObject, e) {
        setStickerBtnSelected(false)
        
        var stickerURL = emojiObject.imageUrl
        console.log(emojiObject)
        console.log(emojiObject.imageUrl)

        new fabric.Image.fromURL(stickerURL, function(img) {
            img.set({
                selectable: true,
                hoverCursor: 'pointer',
                centeredScaling: true,
                centeredRotation: true,
            }).scale(.15)
            canvas.current?.add(img)
            canvas.current?.centerObject(img)
            img.setCoords()
            canvas.current?.setActiveObject(img).renderAll()
        })
    }

    return (
        <span className={ styles.btn_sticker }>
            <button className={ styles.sticker_icon } onClick={ disableElements }>
                <ion-icon name="planet-outline"></ion-icon>
            </button>
            <div className={ styles.sticker_box }>
                {stickerBtnSelected && <EmojiPicker 
                onEmojiClick={onStickerClick} 
                categories={[{category: 'custom', name: 'Figurinhas'}]} 
                customEmojis={ defaultStickers }
                previewConfig={{defaultEmoji: 'scorpion', defaultCaption: 'Selecione sua figurinha...', showPreview: true }}
                emojiStyle="native"
                />}
            </div>
        </span>
    )
    
}

export default Sticker