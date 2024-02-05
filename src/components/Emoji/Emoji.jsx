import styles from './Emoji.module.css'
import { useContext, useState } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import Picker from "emoji-picker-react";

const Emoji = () => {
    const canvas = useContext(FabricContext)

    const { 
            bgImageInserted, 
            setArrowActive, 
            setShapeSelected, 
            setFillColor, 
            setStrokeColor, 
            emojiBtnSelected, 
            setEmojiBtnSelected, 
            setTextBtnSelected,
            disablePaintMode
    } = useBtnStatus()

    const geometricForms = [
        {
            names: ['Quadrado', 'Quadrado'],
            imgUrl: '../../assets/images/icon_square',
            id: 'square',
        },
        {
            names: ['Retângulo', 'Retângulo'],
            imgUrl: 'https://blog.professorferretto.com.br/wp-content/uploads/2019/07/figura-geometrica-retangulo.png',
            id: 'rectangle',
        },
        {
            names: ['Circulo', 'Circulo'],
            imgUrl: 'https://i.pinimg.com/originals/70/7d/55/707d554c6c113f05fa0d783104e3d684.png',
            id: 'ellipse',
        },
        {
            names: ['Seta', 'Seta'],
            imgUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAWlBMVEX///8AAABJSUl2dnZubm5zc3NtbW2AgICqqqre3t64uLizs7P6+vrGxsYvLy8PDw8cHByhoaHl5eU7Ozvt7e3Ozs4sLCzY2Njz8/NXV1cjIyMYGBhERESHh4cDouVWAAAEKUlEQVR4nO2d21bbMBBFFULIzQQCoVwC//+b9WSJ1sHIlu2RNGc8+7VdavbynJwJDq5zRbhfHx4WSXm8OT6VcSNentPafbOsCglu8vjVHE5FBHfZBGvFElfxlFGwHtQChuushosCbzd5BRfH7IIvmQ1vshvuMxs+ZjfMVxWe7IY5u6KM4Va9oTurNzyqN6z+aDfMncQChu418UfD8obuLeduWsSwdtwv3294EGrIR+84lH6BU1lKnVIuVmJzyMRtvyC2YcQVxDbszyC4YdQVRDaMySC0YdyIAhtGC6Iaxo4orGHkmwyuYfyIghqGr+D6l08apV/tCMIZXDoVhuERXTkVhmHBW6fCMDyiK/pjfMOuDBLwhp0ZJNANuzNIgBv2jahDNwwX/f+vI0Ab9o+owzYMX8FV428BG95FjKhDNuytCQ+sYVQGCVTDiJrwgBrG1IQH0zB6RB2o4RBBSMP4DBKAhgMySOAZDhpRB2gYt6o1QDMclkECzDB2VWuAZTg0gwSU4fARdViGA2vCA2Q4ZkQdkuHgmvDAGI7KIIFiOC6DBIjhyAwSGIZjM0hAGI7OIIFgOGJVawBgOCGDhHzDyB/8BhFvOL4mPNINJ46oE284pSY8sg0n1YRHtOG0mvBINpyeQUKwYc/3ZGKRa8iRQUKsIUsGCamGPBkkhBpyjaiTajh5VWsg0jA8onfDD5NoyLCqNRBoyJhBQp4hW014xBny1YRHmiHziDpxhpw14ZFlyD6iTphh+AqOFxRlyJ9BQpBhggwScgxTZJAQY8i7qjWQYpgmg4QQQ+5VrYEMw1QZJEQYTr350okEw0Q14RFgmHJEnQTDZDXhKW6YriY8pQ0T1oTnvXXyA9PJUSTO4O//xIHr6AiYbr500n7+65rt7F6SZ5B4ax1+z3d4D+kzeOHn49ueOQ/vJEMGL7z9eCbjC+vpHWQZ0QuvV6dvmE8PknZVu2bbeD7qjv30AKw3X3qpjv5Bvuts/29A6lWtzXa32WdLYOKPSxLIVBPlyFUTxchXE4XIWRNFUD+iSW6+SMIyiM6MM6ik6NVncMarWoqPSwVQP6JWE+hYTaAz45pQksEcN1+KYhlEZ8YZVDKitqqho35Vs5sv6KjPoNUEOupH1G6+oGMZREf9qqY+gzNe1ezmCwZWE+hYTaCj/gpaBtFRn8EZr2pKMqj+B7+2qqFjNYGO1QQ66kdUvaBlEB31I2qrGjq2qqFjNYGO+hG1mkDHvieDjmUQHVvV0LFVDR27+YKO+hG1mkDHagId+yVldCyD6KgfUfWr2ldQUMm37tsP+Vb2JlM9Kh9Rt1N+BcMfeZXURM2H7hGtUS/ozrpHtOZTu6A76h7Rmiftgu3PFbpGlKgOV4Jqir7Bqan4VfrVJKH6N6jnfenXkoqn4+d58XG3q0q/kAT8BWF6LmOAr4VmAAAAAElFTkSuQmCC',
            id: 'arrow',
        },
        {
            names: ['Triângulo', 'Triângulo'],
            imgUrl: 'https://cdn.icon-icons.com/icons2/2098/PNG/512/triangle_icon_128721.png',
            id: 'triangle',
        }

        
    ]

    const categories = [
            {category: 'suggested', name: 'RECENTES'},
            {category: 'custom', name: 'FORMAS'},
            {category: 'smileys_people', name: 'PESSOAS'},
            {category: 'animals_nature', name: 'ANIMAIS'},
            {category: 'food_drink', name: 'COMIDAS E BEBIDAS'},
            {category: 'travel_places', name: 'VIAGENS E LUGARES'},
            {category: 'activities', name: 'ATIVIDADES'},
            {category: 'objects', name: 'OBJETOS'},
            {category: 'symbols', name: 'SÍMBOLOS'},
            {category: 'flags', name: 'BANDEIRAS'}
        ]

    // Adicionar objeto ao canvas e renderizar
    function addObject (obj) {
        canvas.current?.add(obj)
        canvas.current?.centerObject(obj)
        obj.setCoords()
        canvas.current?.setActiveObject(obj)
        canvas.current?.renderAll()
    }

    // Desabilitar botões ativos e consequentemente suas funções
    function disableElements() {
        if(bgImageInserted) {
            setEmojiBtnSelected(val => !val)
            setTextBtnSelected(false)
            disablePaintMode()
            canvas.current?.discardActiveObject().renderAll()
        }
    }

    // Retângulo
    function createRect() {
        var rect = new fabric.Rect({
            fill                : 'transparent',
            width               : 200,
            height              : 100,
            rx                  : 5,
            strokeWidth         : 5,
            stroke              : '#A020F0',
            originX             : 'center',
            originY             : 'center',
            strokeUniform       : true,
            selectable          : true,
            erasable            : false,
            noScaleCache        : false,
            objectCaching       : false,
        })

        rect.on('selected', function () {
            setShapeSelected(true)
            let obj = canvas.current?.getActiveObject()

            setFillColor(()=>obj.get('fill'))
            setStrokeColor(()=>obj.get('stroke'))
            canvas.current?.requestRenderAll()
        })

        rect.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
        })

        addObject(rect) 
    }

    // quadrado
    function createSquare() {
        var square = new fabric.Rect({
            fill                : 'transparent',
            width               : 100,
            height              : 100,
            strokeWidth         : 5, 
            stroke              : '#A020F0',
            originX             : 'left',
            originY             : 'top',
            strokeUniform       : true,
            selectable          : true,
            erasable            : false,
            noScaleCache        : false,
            objectCaching       : false
        })

        square.on('selected', function () {
            setShapeSelected(true)
            let obj = canvas.current?.getActiveObject()

            setFillColor(()=>obj.get('fill'))
            setStrokeColor(()=>obj.get('stroke'))
            canvas.current?.requestRenderAll()
        })

        square.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
        })

        addObject(square)
    }


    // Elipse
    function createEllipse() {
        var ellipse = new fabric.Ellipse({
            fill                : 'transparent',
            rx                  : 80,
            ry                  : 40,           
            strokeWidth         : 5, 
            stroke              : '#A020F0',
            strokeUniform       : true,
            selectable          : true,
            erasable            : false,
            noScaleCache        : false,
            objectCaching       : false
        })

        ellipse.on('selected', function () {
            setShapeSelected(true)
            let obj = canvas.current?.getActiveObject()

            setFillColor(()=>obj.get('fill'))
            setStrokeColor(()=>obj.get('stroke'))
            canvas.current?.requestRenderAll()
        })

        ellipse.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
        })

        addObject(ellipse)
    }

    // Triângulo
    function createTriangle () {
        setShapeSelected(true)
        var triangle = new fabric.Triangle({
            selectable          : true,
            width               : 150,
            height              : 150,
            fill                : 'transparent',
            stroke              : '#A020F0',
            strokeWidth         : 5,
            strokeUniform       : true,  
            noScaleCache        : false,
            objectCaching       : false
        });

        triangle.on('selected', function () {
            setShapeSelected(true)
            let obj = canvas.current?.getActiveObject()

            setFillColor(()=>obj.get('fill'))
            setStrokeColor(()=>obj.get('stroke'))
            canvas.current?.requestRenderAll()
        })

        triangle.on('deselected', function () {
            setShapeSelected(false)
            canvas.current?.requestRenderAll()
        })

        addObject(triangle)
    }

    // Seta (linha + triangulo)
    function createArrow () {
        setArrowActive(true)
        setShapeSelected(true)
        var line = new fabric.Line([10, 10, 10, (10 + 150)], {
            strokeUniform       : true,
            lockScalingX        : true,
            borderColor         : 'transparent',
            left                : 10,
            top                 : 10,
            strokeWidth         : 3,
            stroke              : '#A020F0',
            noScaleCache        : false,
            objectCaching       : false
        });

        var triangleTop = new fabric.Triangle({
            width               : 16,
            height              : 16, 
            fill                : '#A020F0',
            scaleX              : 1, 
            scaleY              : 1, 
            strokeUniform       : true, 
            lockScalingX        : true, 
            lockScalingY        : true, 
            lockUniScaling      : true, 
            lockSkewingX        : true, 
            lockSkewingY        : true, 
            left                : (10 - 7), 
            top                 : (10 - 3),
            noScaleCache        : false,
            objectCaching       : false
        });

        let groupItems = [line, triangleTop]
        var group = new fabric.Group(groupItems, {
            selectable          : true,
            hasControls         : true,
            width               : 40,
            left                : 10,
            top                 : 10,
            angle               : 45,
            strokeUniform       : true,
            lockScalingX        : true,
            noScaleCache        : false,
            objectCaching       : false

        }).setControlsVisibility({
            tl: false,
            tr: false,
            mt: true,
            mb: true,
            mt: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
        });

        addObject(group)
        
        canvas.current?.on('object:scaling', function (e) {
            let type = e.target.get('type')
            if (type == 'group') {
                adjustArrowsSize(e.target._objects, e.target.get('scaleY'))
            }
        })
        
        canvas.current?.on('object:scaled', function (e) {
            let type = e.target.get('type')
            if (type == 'group') {
                adjustArrowsSize(e.target._objects, e.target.get('scaleY'))
            }
        });
        
        function adjustArrowsSize(arrowObjects, objectScaleY) {
            var triangleCount = 0, triangles = [];
        
            arrowObjects.forEach(function (object) {
                if (object.get('type') == 'triangle') {
                    triangles[triangleCount] = object
                    triangleCount++;
                    let ratio = 1 / objectScaleY
                    object.set('scaleY', ratio)
                }
            })            
            
            canvas.current?.renderAll();
        }

        group.on('selected', function () {
            setArrowActive(true)
            setShapeSelected(true)
            
            let thing
            let objCurrent = canvas.current?.getActiveObject()
            let objs = objCurrent._objects

            for (thing in objs) {
                if(objs[thing].get('type') === 'triangle') {
                    setFillColor(objs[thing].get('fill'))
                }
            }

            canvas.current?.requestRenderAll()
        })

        group.on('selection:created', function () {
            setShapeSelected(true)
            setArrowActive(true)
        })

        group.on('deselected', function () {
            setShapeSelected(false)
            setArrowActive(false)
            canvas.current?.requestRenderAll()
        })
    }

    function onEmojiClick (emojiObject, e) {
        setEmojiBtnSelected(false)

        switch(emojiObject.emoji) {
            case 'rectangle':
                createRect()
                break;
            case 'square':
                createSquare()
                break;
            case 'ellipse':
                createEllipse()
                break;
            case 'arrow':
                setArrowActive(true)
                createArrow()
                break;
            case 'triangle':
                createTriangle()
                break;
            default:
                var emojiURL = emojiObject.imageUrl
                new fabric.Image.fromURL(emojiURL, function(img) {
                    img.set({
                        selectable          : true,
                        erasable            : false,
                        centeredScaling     : true,
                        centeredRotation    : true,
                        objectCaching       : false,
                        noScaleCache        : false
                    }).scale(1)
                    img.objectCaching=false
                    img.noScaleCache=false

                    img.setControlsVisibility({
                        tl:  false, 
                        tr:  false,
                        ml:  false, 
                        mr:  false, 
                        bl:  false, 
                        mb:  false, 
                        mt:  false,
                        mtr: true,
                        br:  true,
                    })
                    addObject(img)

                }, {crossOrigin: 'Anonymous'})
                break;
        }         
    }

    return (
        <span className={ styles.btn_emoji }>
            <button className={ styles.emoji_icon } onClick={ disableElements }>
                <ion-icon name="happy-outline"></ion-icon>
            </button>
            <div className={ styles.emoji_box }>

                    <Picker 
                        onEmojiClick={ onEmojiClick } 
                        categories={ categories }       
                        customEmojis={ geometricForms }
                        lazyLoadEmojis={false}
                        skinTonesDisabled
                        searchDisabled
                        emojiStyle="native"
                    />
            </div>
        </span>   
    )
}

export default Emoji
