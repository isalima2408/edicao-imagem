import { useContext } from "react";
import { FabricContext } from "../../App";

var FontFaceObserver = require('fontfaceobserver')


const TextTools = () => {
    const canvas = useContext(FabricContext);

    // Mudar alinhamento
    const changeTextAlign = (e) => {
        const align = e.target.value
        canvas.current?.getActiveObject().set('textAlign', align)
        canvas.current?.renderAll()
    }

    // Mudar cor
    const changeTextColor = (e) => {
        const color = e.target.value
        canvas.current?.getActiveObject().set('fill', color)
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
        const fontFamily = e.target.value

        if (fontFamily !== 'Times New Roman') {
            loadAndUse(fontFamily)
        } else {
            canvas.current?.getActiveObject().set('fontFamily', fontFamily)
            canvas.current?.requestRenderAll();
        }
    }

    
    return(
        <div>
            <select name="font_family" id="font_family" onChange={changeFontFamily}>
                <option value="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Lemon">Lemon</option>
            </select>
            <select name="text_color" id="text_color" onChange={changeTextColor}>
                <option value="red">Vermelho</option>
                <option value="black">Preto</option>
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
