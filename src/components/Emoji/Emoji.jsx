import styles from './Emoji.module.css'
import { useContext } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import EmojiPicker from  'emoji-picker-react' ;

const Emoji = () => {
    const canvas = useContext(FabricContext)
    const { bgImageInserted, emojiBtnSelected, setEmojiBtnSelected, setPaintBtnSelected, setTextBtnSelected } = useBtnStatus()

    const geometricForms = [
        {
            names: ['Retângulo', 'Retângulo'],
            imgUrl: 'https://cdn.iconfinder.com/stored_data/1481188/128/png?token=1705780702-%2F96gvc%2FetPL6C1REkDC4BxcZkitikDad%2BerM%2Fp09q3I%3D',
            id: 'retangulo',
        },
        {
            names: ['Circulo', 'Circulo'],
            imgUrl: 'https://cdn.iconfinder.com/stored_data/1481190/128/png?token=1705780849-rK1gaCqnrYu1IxUEPXugvX1c7bbjgejDeAyJ8ur6DOE%3D',
            id: 'elipse',
        },
        {
            names: ['Seta', 'Seta'],
            imgUrl: 'https://cdn.iconfinder.com/stored_data/1481194/128/png?token=1705780945-rLNoKkd4UcHFuq7FH1z3%2FU2Z4W39rzUR9%2BB%2BwhN%2B4WA%3D',
            id: 'seta',
        }
    ]

    function disableElements() {
        if(bgImageInserted) {
            setEmojiBtnSelected(val => !val)
            canvas.current?.set('isDrawingMode', false)
            canvas.current?.discardActiveObject().renderAll()
            setTextBtnSelected(false)
            setPaintBtnSelected(false)
        }
    }

    // Retângulo
    function createRect() {
        var rect = new fabric.Rect({
            fill: 'transparent',
            width: 100,
            height: 100,
            strokeWidth: 5, 
            stroke: 'rgba(255,0,0,1)',
            strokeUniform: true,
            selectable: true,
            erasable: false,
        })
        canvas.current?.add(rect)
        canvas.current?.centerObject(rect)
        rect.setCoords()
        canvas.current?.setActiveObject(rect).renderAll()
    }

    // Circulo / Elipse
    function createEllipse() {
        var ellipse = new fabric.Ellipse({
            fill: 'transparent',
            rx: 80,
            ry: 40,
            strokeWidth: 5, 
            stroke: 'rgba(255,0,0,1)',
            strokeUniform: true,
            selectable: true,
            erasable: false,
        })
        canvas.current?.add(ellipse)
        canvas.current?.centerObject(ellipse)
        ellipse.setCoords()
        canvas.current?.setActiveObject(ellipse).renderAll()
    }

    function onEmojiClick (emojiObject, e) {
        setEmojiBtnSelected(false)
  
        if (emojiObject.emoji == 'retangulo') {
            createRect()
        } else if (emojiObject.emoji == 'elipse') {
            createEllipse()
        } else {

            var emojiURL = emojiObject.imageUrl
            console.log(emojiURL)

            new fabric.Image.fromURL(emojiURL, function(img) {
                img.set({
                    selectable: true,
                    erasable: false,
                    //hoverCursor: 'pointer',
                    centeredScaling: true,
                    centeredRotation: true,
                })

                img.setControlsVisibility({
                    tl:false, 
                    tr:false,
                    ml:false, 
                    mr:false, 
                    bl:false, 
                    mb:false, 
                    mt: false,
                    mtr: true,
                    br: true,
                })

                canvas.current?.add(img)
                canvas.current?.centerObject(img)
                img.setCoords()
                canvas.current?.setActiveObject(img).renderAll()
            }, {crossOrigin: 'Anonymous'})
        }
    }


    return (
        <span className={ styles.btn_emoji }>
            <button className={ styles.emoji_icon } onClick={ disableElements }>
                <ion-icon name="happy-outline"></ion-icon>
            </button>
            <div className={ styles.emoji_box }>
                {emojiBtnSelected && <EmojiPicker 
                    onEmojiClick={ onEmojiClick } 
                    categories={[
                                'suggested',
                                {category: 'custom', name: 'Formas'},
                                'smileys_people',
                                'animals_nature',
                                'food_drink',
                                'travel_places',
                                'activities',
                                'objects',
                                'symbols',
                                'flags'
                                ]}       
                    customEmojis={ geometricForms }
                    emojiStyle="native"
                />}
            </div>
        </span>   
    )
}

export default Emoji
