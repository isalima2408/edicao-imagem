import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";
import { fabric } from "fabric";

var FontFaceObserver = require('fontfaceobserver')

const TextTools = () => {
    const canvas = useContext(FabricContext);
    const { textItalic, setTextItalic, textWeight, setTextWeight, bgColor, setBgColor, textAlign, setTextAlign, textColor, setTextColor, textFontFamily, setTextFontFamily } = useBtnStatus()

    // Mudar alinhamento
    const changeTextAlign = (e) => {
        setTextAlign(e.target.value) 
        canvas.current?.getActiveObject().set('textAlign', e.target.value)
        canvas.current?.renderAll()
    }

    // Mudar cor
    const changeTextColor = (e) => {
        setTextColor(e.target.value)
        canvas.current?.getActiveObject().set('fill', e.target.value)
        canvas.current?.renderAll() 
    }

    // Carregar família da fonte
    function loadAndUse(font) {
        var myfont = new FontFaceObserver(font)
        myfont.load()
          .then(function() {
            canvas.current?.getActiveObject().set("fontFamily", font);
            canvas.current?.requestRenderAll();
          }).catch(function(e) {
            console.log(e)
            console.log('font loading failed ' + font);
          });
      }
    
    // Mudar fonte
    const changeFontFamily = async (e) => {  
        setTextFontFamily(e.target.value)
        await loadAndUse(e.target.value)

        canvas.current?.getActiveObject().set('fontFamily', e.target.value)
        canvas.current?.renderAll();

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
    const changeBgColor = (e) => {
        setBgColor(e.target.value)
        var text = canvas.current?.getActiveObject()
        var color = e.target.value

        text.set('backgroundColor', e.target.value)
        canvas.current?.renderAll() 

        if (e.target.value === 'transparent') {
            text.set({
                perPixelTargetFind: false,
                padding: 0,
                backgroundColor: color,
            })
        } else {
            text.set({
                perPixelTargetFind: true,
                padding: 20,
                backgroundColor: color,
            })
            canvas.current?.getActiveObject().set('perPixelTargetFind', true)
        }

        canvas.current?.renderAll() 
    }

    // Itálico
    const changeStyle = (e) => {
        var text = canvas.current?.getActiveObject()

        if (text.get('fontStyle') === 'italic') {
            text.set('fontStyle', 'normal')
        } else {
            text.set('fontStyle', 'italic')
        }
    
        canvas.current?.renderAll();
    }

    // Negrito
    const changeWeight = () => {
        var text = canvas.current?.getActiveObject()

        if (text.get('fontWeight') === 'bold') {
            text.set('fontWeight', 'normal')
        } else {
            text.set('fontWeight', 'bold')
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
    
    
    return(
        <div>
            <select name="font_family" id="font_family" value={textFontFamily} onChange={changeFontFamily}>  
                <option value="Times New Roman">Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value="Space Mono">Space Mono</option>
                <option value="Poppins">Poppins</option>
                <option value="Lemon">Lemon</option>
            </select>

            <select name="text_color" id="text_color" value={textColor} onChange={changeTextColor}>
                <option value="black">Preto</option>
                <option value="white">Branco</option>
                <option value="red">Vermelho</option>
                <option value="blue">Azul</option>
            </select>

            <select name="text_align" id="text_align" value={textAlign} onChange={changeTextAlign} >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
            </select>

            <button onClick={changeStyle} style={ {color: textItalic? 'red' : 'black'} }>Itálico</button>
            <button onClick={changeWeight} >Negrito</button>
            <button onClick={changeUnderline} >Sublinhado</button>
            <button onClick={changeLinethrough} >Tachado</button>

            <select name="bg_color" id="bg_color" value={bgColor} onChange={changeBgColor}>
                <option value="transparent">Sem fundo</option>
                <option value="rgba(255,255,255,0.1)">Transparente 1</option>
                <option value="black">Preto</option>
                <option value="white">Branco</option>
                <option value="#EE82EE">Violeta</option>
                <option value="#ADD8E6">Azul</option>
            </select>
        </div>
    )
}

export default TextTools
