import styles from './Emoji.module.css'
import { useContext, useState } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';
import Picker from "emoji-picker-react";
import square from '../../assets/images/square.png'
import ellipse from '../../assets/images/ellipse.png'
import arrow from '../../assets/images/arrow.png'
import triangle from '../../assets/images/triangle.png'

const Emoji = () => {
    const canvas = useContext(FabricContext)

    const { 
            bgImageInserted, 
            setArrowActive, 
            setShapeSelected, 
            setFillColor, 
            setStrokeColor, 
            setEmojiBtnSelected, 
            setTextBtnSelected,
            disablePaintMode
    } = useBtnStatus()

    const geometricForms = [
        {
            names: ['Quadrado', 'Quadrado'],
            imgUrl: square,
            id: 'square',
        },
        {
            names: ['Elipse', 'Elipse'],
            imgUrl: ellipse,
            id: 'ellipse',
        },
        {
            names: ['Seta', 'Seta'],
            imgUrl: arrow,
            id: 'arrow',
        },
        {
            names: ['Triângulo', 'Triângulo'],
            imgUrl: triangle,
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

    // quadrado
    function createSquare() {
        var square = new fabric.Rect({
            fill                : 'transparent',
            width               : 150,
            height              : 150,
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


    // Elipse / Círculo
    function createEllipse() {
        var ellipse = new fabric.Ellipse({
            fill                : 'transparent',
            rx                  : 80,
            ry                  : 80,
            originX             : 'left',
            originY             : 'top',        
            strokeWidth         : 5, 
            stroke              : '#A020F0',
            strokeUniform       : true,
            selectable          : true,
            erasable            : false,
            noScaleCache        : false,
            objectCaching       : false,
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


        canvas.current?.add(ellipse).renderAll()
        canvas.current?.centerObject(ellipse)
        ellipse.setCoords()
        canvas.current?.setActiveObject(ellipse)
        canvas.current?.renderAll()
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
            strokeWidth         : 5,
            stroke              : '#A020F0',
            noScaleCache        : false,
            objectCaching       : false
        });

        var triangleTop = new fabric.Triangle({
            width               : 20,
            height              : 20, 
            fill                : '#A020F0',
            scaleX              : 1, 
            scaleY              : 1, 
            strokeUniform       : true, 
            lockScalingX        : true, 
            lockScalingY        : true, 
            lockUniScaling      : true, 
            lockSkewingX        : true, 
            lockSkewingY        : true, 
            left                : (10 - 8), 
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

            case 'square':
                createSquare()
                break;

            case 'ellipse':
                createEllipse()
                canvas.current?.renderAll()
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
