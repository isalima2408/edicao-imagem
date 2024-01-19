import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";

var FontFaceObserver = require('fontfaceobserver')


const TextTools = () => {
    const canvas = useContext(FabricContext);
    const { textAlign, setTextAlign, textColor, setTextColor, textFontFamily, setTextFontFamily } = useBtnStatus()

    // Mudar alinhamento
    const changeTextAlign = (e) => {
        setTextAlign(e.target.value) 
        if (canvas.current?.getActiveObject()) {
            canvas.current?.getActiveObject().set('textAlign', textAlign)
            canvas.current?.renderAll()
        }  
    }

    // Mudar cor
    const changeTextColor = (e) => {
        setTextColor(e.target.value)
        if (canvas.current?.getActiveObject()) {
            canvas.current?.getActiveObject().set('fill', textColor)
            canvas.current?.renderAll()
        }  
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
    

    /*const initialState = canvas.current?.getActiveObject().get('fontFamily')
    const [selectedFont, setSelectedFont] = useState(initialState)
    //setSelectedFont(() => canvas.current?.getActiveObject().get('fontFamily'))
    console.log(selectedFont)

    useEffect(() => {
        setSelectedFont(()=>canvas.current?.getActiveObject().get('fontFamily'))
    }, [canvas.current?.getActiveObject()])*/

    // Mudar fonte
    const changeFontFamily = (e) => {
        setTextFontFamily(e.target.value)

        if (canvas.current?.getActiveObject()) {
            if (textFontFamily !== 'Arial') {
                loadAndUse(textFontFamily)
            } else {
                canvas.current?.getActiveObject().set('fontFamily', textFontFamily)
                canvas.current?.renderAll();
            }
        }
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
                <option value="red">Vermelho</option>
                <option value="blue">Azul</option>
            </select>
            <select name="text_align" id="text_align" value={textAlign} onChange={changeTextAlign} >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
            </select>
        </div>
    )
}

export default TextTools
