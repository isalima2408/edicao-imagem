import styles from './Emoji.module.css'
import { useContext, useState } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import EmojiPicker from  'emoji-picker-react' ;

const Emoji = () => {
    const canvas = useContext(FabricContext)
    const {isScaling, setIsScaling, setNewWidth, setNewHeight, bgImageInserted, setShapeSelected, setRectSelected, setFillColor, setStrokeColor, setStrokeWidth, ry, setRy, emojiBtnSelected, setEmojiBtnSelected, setPaintBtnSelected, setTextBtnSelected } = useBtnStatus()

    const geometricForms = [
        {
            names: ['Quadrado', 'Quadrado'],
            imgUrl: 'https://w7.pngwing.com/pngs/572/684/png-transparent-square-border-illustration-square-black-and-white-fuchsia-frame-miscellaneous-angle-white-thumbnail.png',
            id: 'quadrado',
        },
        {
            names: ['Retângulo', 'Retângulo'],
            imgUrl: 'https://blog.professorferretto.com.br/wp-content/uploads/2019/07/figura-geometrica-retangulo.png',
            id: 'retangulo',
        },
        {
            names: ['Circulo', 'Circulo'],
            imgUrl: 'https://i.pinimg.com/originals/70/7d/55/707d554c6c113f05fa0d783104e3d684.png',
            id: 'elipse',
        },
        {
            names: ['Seta', 'Seta'],
            imgUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAWlBMVEX///8AAABJSUl2dnZubm5zc3NtbW2AgICqqqre3t64uLizs7P6+vrGxsYvLy8PDw8cHByhoaHl5eU7Ozvt7e3Ozs4sLCzY2Njz8/NXV1cjIyMYGBhERESHh4cDouVWAAAEKUlEQVR4nO2d21bbMBBFFULIzQQCoVwC//+b9WSJ1sHIlu2RNGc8+7VdavbynJwJDq5zRbhfHx4WSXm8OT6VcSNentPafbOsCglu8vjVHE5FBHfZBGvFElfxlFGwHtQChuushosCbzd5BRfH7IIvmQ1vshvuMxs+ZjfMVxWe7IY5u6KM4Va9oTurNzyqN6z+aDfMncQChu418UfD8obuLeduWsSwdtwv3294EGrIR+84lH6BU1lKnVIuVmJzyMRtvyC2YcQVxDbszyC4YdQVRDaMySC0YdyIAhtGC6Iaxo4orGHkmwyuYfyIghqGr+D6l08apV/tCMIZXDoVhuERXTkVhmHBW6fCMDyiK/pjfMOuDBLwhp0ZJNANuzNIgBv2jahDNwwX/f+vI0Ab9o+owzYMX8FV428BG95FjKhDNuytCQ+sYVQGCVTDiJrwgBrG1IQH0zB6RB2o4RBBSMP4DBKAhgMySOAZDhpRB2gYt6o1QDMclkECzDB2VWuAZTg0gwSU4fARdViGA2vCA2Q4ZkQdkuHgmvDAGI7KIIFiOC6DBIjhyAwSGIZjM0hAGI7OIIFgOGJVawBgOCGDhHzDyB/8BhFvOL4mPNINJ46oE284pSY8sg0n1YRHtOG0mvBINpyeQUKwYc/3ZGKRa8iRQUKsIUsGCamGPBkkhBpyjaiTajh5VWsg0jA8onfDD5NoyLCqNRBoyJhBQp4hW014xBny1YRHmiHziDpxhpw14ZFlyD6iTphh+AqOFxRlyJ9BQpBhggwScgxTZJAQY8i7qjWQYpgmg4QQQ+5VrYEMw1QZJEQYTr350okEw0Q14RFgmHJEnQTDZDXhKW6YriY8pQ0T1oTnvXXyA9PJUSTO4O//xIHr6AiYbr500n7+65rt7F6SZ5B4ax1+z3d4D+kzeOHn49ueOQ/vJEMGL7z9eCbjC+vpHWQZ0QuvV6dvmE8PknZVu2bbeD7qjv30AKw3X3qpjv5Bvuts/29A6lWtzXa32WdLYOKPSxLIVBPlyFUTxchXE4XIWRNFUD+iSW6+SMIyiM6MM6ik6NVncMarWoqPSwVQP6JWE+hYTaAz45pQksEcN1+KYhlEZ8YZVDKitqqho35Vs5sv6KjPoNUEOupH1G6+oGMZREf9qqY+gzNe1ezmCwZWE+hYTaCj/gpaBtFRn8EZr2pKMqj+B7+2qqFjNYGO1QQ66kdUvaBlEB31I2qrGjq2qqFjNYGO+hG1mkDHvieDjmUQHVvV0LFVDR27+YKO+hG1mkDHagId+yVldCyD6KgfUfWr2ldQUMm37tsP+Vb2JlM9Kh9Rt1N+BcMfeZXURM2H7hGtUS/ozrpHtOZTu6A76h7Rmiftgu3PFbpGlKgOV4Jqir7Bqan4VfrVJKH6N6jnfenXkoqn4+d58XG3q0q/kAT8BWF6LmOAr4VmAAAAAElFTkSuQmCC',
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
            width: 200,
            height: 100,
            rx: 5,
            strokeWidth: 5,
            stroke: 'rgba(255,0,0,1)',
            originX: 'center',
            originY: 'center',
            strokeUniform: true,
            selectable: true,
            erasable: false,
            noScaleCache: false,
            objectCaching: false,

        })

        rect.on('selected', function () {
            setShapeSelected(true)
            setFillColor(()=>canvas.current?.getActiveObject().get('fill'))
            setStrokeColor(()=>canvas.current?.getActiveObject().get('stroke'))
            canvas.current?.requestRenderAll()
        })

        rect.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
        })

        canvas.current?.add(rect)
        canvas.current?.centerObject(rect)
        rect.setCoords()
        canvas.current?.setActiveObject(rect).renderAll()
    }

    function createSquare() {
        var rect = new fabric.Rect({
            fill: 'transparent',
            width: 100,
            height: 100,
            strokeWidth: 5, 
            stroke: 'rgba(255,0,0,1)',
            originX: 'left',
            originY: 'top',
            strokeUniform: true,
            selectable: true,
            erasable: false,
            noScaleCache: false,
            objectCaching: false
        })

        rect.on('selected', function () {
            setShapeSelected(true)
            setFillColor(()=>canvas.current?.getActiveObject().get('fill'))
            setStrokeColor(()=>canvas.current?.getActiveObject().get('stroke'))
            canvas.current?.requestRenderAll()
        })

        rect.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
        })

        canvas.current?.add(rect)
        canvas.current?.centerObject(rect)
        rect.setCoords()
        canvas.current?.setActiveObject(rect).renderAll()
    }


    // Elipse
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
            noScaleCache: false,
            objectCaching: false
        })

        ellipse.on('selected', function () {
            setShapeSelected(true)
            setFillColor(()=>canvas.current?.getActiveObject().get('fill'))
            setStrokeColor(()=>canvas.current?.getActiveObject().get('stroke'))
            canvas.current?.requestRenderAll()
        })

        ellipse.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
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
        } else if (emojiObject.emoji == 'quadrado') {
            createSquare()
        } else if (emojiObject.emoji == 'elipse') {
            createEllipse()
        } else {

            var emojiURL = emojiObject.imageUrl
            new fabric.Image.fromURL(emojiURL, function(img) {
                img.set({
                    selectable: true,
                    erasable: false,
                    centeredScaling: true,
                    centeredRotation: true,
                    objectCaching: false,
                    noScaleCache: false
                }).scale(1)
                img.objectCaching=false
                img.noScaleCache=false

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
                                'custom',
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
