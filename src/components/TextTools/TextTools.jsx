import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";

var FontFaceObserver = require('fontfaceobserver')

const TextTools = () => {
    const canvas = useContext(FabricContext);
    const { textItalic, setTextItalic, textWeight, setTextWeight, bgColor, setBgColor, textAlign, setTextAlign, textColor, setTextColor, textFontFamily, setTextFontFamily } = useBtnStatus()

    // Mudar alinhamento
    const changeTextAlign = (e) => {
        // o setTextAlig serve para ajustar apenas o value do select, mas não fazer a alteração na propriedade do texto.
        // Alteração do texto feita na linha 16
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

    // Carregar família da fonte antes de usar (evitar erros)
    function loadAndUse(font) {
        var myfont = new FontFaceObserver(font)
        myfont.load()
          .then(function() {
            // when font is loaded, use it.
            canvas.current?.getActiveObject().set("fontFamily", font);
            canvas.current?.requestRenderAll();
          }).catch(function(e) {
            console.log(e)
            alert('font loading failed ' + font);
          });
      }
    
    // Mudar fonte
    const changeFontFamily = (e) => {
        setTextFontFamily(e.target.value)

        if (textFontFamily !== 'Arial') {
            loadAndUse(e.target.value)
        } else {
            canvas.current?.getActiveObject().set('fontFamily', e.target.value)
            canvas.current?.renderAll();
        }
    }

    // Itálico
    const changeStyle = (e) => {
        setTextItalic(val => !val)
        if(!textItalic) {
            canvas.current?.getActiveObject().set("fontStyle", 'italic')
        } else {
            canvas.current?.getActiveObject().set("fontStyle", 'normal')
        }
        canvas.current?.renderAll();
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

    // Cor de fundo
    const changeBgColor = (e) => {
        setBgColor(e.target.value)
        canvas.current?.getActiveObject().set('backgroundColor', e.target.value)
        canvas.current?.renderAll() 
    }
    
    return(
        <div>
            <select name="font_family" id="font_family" value={textFontFamily} onChange={changeFontFamily}>  
                <option value="Roboto">Roboto</option>
                <option value="Arial">Arial</option>
                <option value="Montserrat">Montserrat</option>
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

            <button onClick={changeStyle} >Itálico</button>
            <button onClick={changeWeight} >Negrito</button>

            <select name="bg_color" id="bg_color" value={bgColor} onChange={changeBgColor}>
                <option value="transparent">Sem fundo</option>
                <option value="black">Preto</option>
                <option value="white">Branco</option>
                <option value="#EE82EE">Violeta</option>
                <option value="#ADD8E6">Azul</option>
            </select>
        </div>
    )
}

export default TextTools
