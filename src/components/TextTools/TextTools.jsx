import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";
import { fabric } from "fabric";
import { HuePicker } from 'react-color';

const TextTools = () => {
    const canvas = useContext(FabricContext);
    const { textItalic, bgColor, setBgColor, textAlign, setTextAlign, textColor, setTextColor, textFontFamily, setTextFontFamily } = useBtnStatus()
    const [color, setColor] = useState({ background: '#A020F0' })
    const [btnColorActive, setBtnColorActive] = useState(false)
    const [btnBgColorActive, setBtnBgColorActive] = useState(false)

    // Alinhamento
    const changeTextAlign = (e) => {
        setTextAlign(e.target.value) 
        canvas.current?.getActiveObject().set('textAlign', e.target.value)
        canvas.current?.renderAll()
    }

    // Cor
    const handleTextColor = (e) => {
        setColor({ background: e.hex })
        canvas.current?.getActiveObject().set('fill', e.hex)
        canvas.current?.renderAll() 
    }
    
    // Mudar fonte
    const changeFontFamily = (e) => {  
        setTextFontFamily(e.target.value)

        canvas.current?.getActiveObject().set("fontFamily", e.target.value);
        //canvas.current?.requestRenderAll();

        fabric.util.clearFabricFontCache();
        canvas.current?.getObjects()?.forEach((object) => {
            if (object?.Type === 'text') {
                handleTextOverflow(object);
            }
        });
        canvas.current?.renderAll();

        function handleTextOverflow(textbox) {
            const textWidth = textbox.calcTextWidth();
            const textHeight = textbox.calcTextHeight();
            textbox.set({
                width: textWidth,
                height: textHeight,
            });
        }
        canvas.current?.renderAll();
    }

    // Cor de fundo
    const handleBgTextColor = (e) => {
        setColor({ background: e.hex })
        var text = canvas.current?.getActiveObject()
        var color = e.hex

        text.set('backgroundColor', e.hex)
        canvas.current?.renderAll() 

        text.set({
            perPixelTargetFind: true,
            padding: 20,
            backgroundColor: color,
        })
        canvas.current?.getActiveObject().set('perPixelTargetFind', true)

        canvas.current?.renderAll() 
    }

    // Itálico 
    // só funciona com fontes de nome único. Ex: Arial - ok; Open Sans - not. Mas pode se adaptar pegando os index finais ao inves de fixo)
    const changeStyle = (e) => {
        var text = canvas.current?.getActiveObject()
        var fontArr = text.get('fontFamily').split(' ')
        var indexItalic = fontArr.indexOf('Italic')
        var isItalic = indexItalic > -1 

        if (isItalic) {
            fontArr.pop()
            var newFont = fontArr.join(" ")
            text.set('fontFamily', newFont)
        } else {
            fontArr.push('Italic')
            var newFont = fontArr.join(' ')
            text.set('fontFamily', newFont)
        }

        canvas.current?.renderAll();
    }

    // Negrito
    const changeWeight = (e) => {
        var text = canvas.current?.getActiveObject()
        var fontArr = text.get('fontFamily').split(' ') //pega o texto e transforma em array
        var indexBold = fontArr.indexOf('Bold') // ve se há a palavra bold e onde esta localizada
        var isBold = indexBold > -1 // confere se tem a palavra mesmo

        if (isBold) {
            fontArr.splice(indexBold, 1) // apaga o bold
            var newFont = fontArr.join(" ")
            text.set('fontFamily', newFont)
        } else {
            fontArr.splice(1, 0, 'Bold')
            var newFont = fontArr.join(' ')
            text.set('fontFamily', newFont)
        }

        canvas.current?.renderAll();
    }

    // Sublinhado
    const changeUnderline = (e) => {
        var text = canvas.current?.getActiveObject()

        if (text.get('underline') === true) {
            text.set('underline', false)
        } else {
            text.set('underline', true)
        }

        canvas.current?.renderAll();
    }

    // Tachado
    const changeLinethrough = (e) => {
        var text = canvas.current?.getActiveObject()

        if (text.get('linethrough') === true) {
            text.set('linethrough', false)
        } else {
            text.set('linethrough', true)
        }

        canvas.current?.renderAll();
    }

    const handleCornerRadius = () => {
        var text = canvas.current?.getActiveObject()

        if (text.get('bgCornerRadius') !== 0) {
            text.set('bgCornerRadius', 0)
        } else {
            text.set('bgCornerRadius', 15)
        }

        canvas.current?.renderAll();
    }
    
    
    return(
        <div>
            <select name="font_family" id="font_family" value={textFontFamily} onChange={changeFontFamily}>  
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                
            </select>

            <button onClick={() => setBtnColorActive(val => !val)} style={{position: 'relative'}}>Cor</button>
                {btnColorActive &&
                    <div style={{position: 'absolute', zIndex: 1}}>
                        <HuePicker 
                            color={ color.background }
                            onChangeComplete={ handleTextColor }
                        />    
                    </div>
                }

            <select name="text_align" id="text_align" value={textAlign} onChange={changeTextAlign} >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
            </select>

            <button onClick={changeStyle} style={ {color: textItalic? 'red' : 'black'} }>Itálico</button>
            <button onClick={changeWeight} >Negrito</button>
            <button onClick={changeUnderline} >Sublinhado</button>
            <button onClick={changeLinethrough} >Tachado</button>

            <button onClick={() => setBtnBgColorActive(val => !val)} style={{position: 'relative'}}>Fundo</button>
                {btnBgColorActive &&
                    <div style={{position: 'absolute', zIndex: 1}}>
                        <HuePicker 
                            color={ color.background }
                            onChangeComplete={ handleBgTextColor }
                        />    
                    </div>
                }
            <button onClick={handleCornerRadius} >Cantos</button>
        </div>
    )
}

export default TextTools
