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

    // Carregar família da fonte antes de usar
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
        canvas.current?.getActiveObject().set('backgroundColor', e.target.value)
        canvas.current?.renderAll() 

        if (e.target.value === 'transparent') {
            canvas.current?.getActiveObject().set('perPixelTargetFind', false)
            canvas.current?.getActiveObject().set('padding', 0)
            canvas.current?.getActiveObject().set('backgroundColor', e.target.value)
        } else {
            canvas.current?.getActiveObject().set('perPixelTargetFind', true)
            canvas.current?.getActiveObject().set('padding', 20)
            canvas.current?.getActiveObject().set('backgroundColor', e.target.value)
        }
        canvas.current?.renderAll() 
    }

    // Itálico
    const changeStyle = (e) => {
        //setTextItalic(val => !val)
        var text = canvas.current?.getActiveObject()
        var textSelected = text.getSelectedText()

        if (text.get('fontStyle') === 'italic') {
            
        }

        console.log('start: ' + selectionStart + ' end: ' + selectionEnd)
        var selectionStart = text.get("selectionStart")
        var selectionEnd = text.get("selectionEnd")
        console.log('start: ' + selectionStart + ' end: ' + selectionEnd)
        
        if(!textItalic) {
            if (!textSelected) {
                text.set("fontStyle", 'italic')
            } else {
                text.setSelectionStyles({ fontStyle: 'italic', }, selectionStart, selectionEnd)
            }
            canvas.current?.renderAll();
        } else {
            if (!textSelected) {
                text.set('fontStyle', 'normal')
            } else {
                text.setSelectionStyles({ fontStyle: 'normal', }, selectionStart, selectionEnd)
            }
            canvas.current?.renderAll();
        }
        canvas.current?.renderAll();
        //console.log(canvas.current?.getActiveObject().getSelectedText())
    }

    // Negrito
    const changeWeight = () => {
        setTextWeight(val => !val)
        if(!textWeight) {
            canvas.current?.getActiveObject().set("fontWeight", 'bold');
        } else {
            canvas.current?.getActiveObject().set("fontWeight", 'normal'); 
        }
        canvas.current?.renderAll();
    }

    // Sublinhado
    const changeUnderline = (e) => {
        setTextItalic(val => !val)
        var textSel = canvas.current?.getActiveObject()
        var selStart = canvas.current?.getActiveObject().get("selectionStart")
        var selEnd = canvas.current?.getActiveObject().get("selectionEnd")
        
        if(!textItalic) {
            textSel.setSelectionStyles({ underline: true, }, selStart, selEnd)
            //canvas.current?.getActiveObject().set("fontStyle", 'italic')
        } else {
            canvas.current?.getActiveObject().set("fontStyle", 'normal')
        }
        canvas.current?.renderAll();
        console.log(canvas.current?.getActiveObject().getSelectedText())
    }

    // Tachado
    const changeLinethrough = (e) => {
        setTextItalic(val => !val)
        var textSel = canvas.current?.getActiveObject()
        var selStart = canvas.current?.getActiveObject().get("selectionStart")
        var selEnd = canvas.current?.getActiveObject().get("selectionEnd")
        
        if(!textItalic) {
            textSel.setSelectionStyles({ linethrough: true, }, selStart, selEnd)
            //canvas.current?.getActiveObject().set("fontStyle", 'italic')
        } else {
            canvas.current?.getActiveObject().set("fontStyle", 'normal')
        }
        canvas.current?.renderAll();
        console.log(canvas.current?.getActiveObject().getSelectedText())
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
