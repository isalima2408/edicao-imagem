import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";

var FontFaceObserver = require('fontfaceobserver')


const TextTools = () => {
    const canvas = useContext(FabricContext);

    // Mudar alinhamento
    const changeTextAlign = (e) => {
        const align = e.target.value
        if (canvas.current?.getActiveObject()) {
            canvas.current?.getActiveObject().set('textAlign', align)
            canvas.current?.renderAll()
        }  
    }

    // Mudar cor
    const changeTextColor = (e) => {
        const color = e.target.value
        if (canvas.current?.getActiveObject()) {
            canvas.current?.getActiveObject().set('fill', color)
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
        const fontFamily = e.target.value   

        if (canvas.current?.getActiveObject()) {
            if (fontFamily !== 'Arial') {
                loadAndUse(fontFamily)
            } else {
                canvas.current?.getActiveObject().set('fontFamily', fontFamily)
                canvas.current?.renderAll();
            }
        }
    }
    
    
    return(
        <div>
            <select name="font_family" id="font_family" onChange={changeFontFamily}>  
                <option value="Roboto">Roboto</option>
                <option value="Arial">Arial</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Lemon">Lemon</option>
            </select>
            <select name="text_color" id="text_color" onChange={changeTextColor}>
                <option value="black">Preto</option>
                <option value="red">Vermelho</option>
                <option value="blue">Azul</option>
            </select>
            <select name="text_align" id="text_align" onChange={changeTextAlign} >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
            </select>
        </div>
    )
}

export default TextTools
