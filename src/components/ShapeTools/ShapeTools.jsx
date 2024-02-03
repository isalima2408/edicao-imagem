import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";
import { fabric } from "fabric";

const ShapeTools = () => {
    const canvas = useContext(FabricContext);
    const { arrowActive, fillColor, setFillColor, strokeColor, setStrokeColor } = useBtnStatus()

    // cor de fundo
    function changeFillColor (e) {
        setFillColor(e.target.value)
        let thing
        let objCurrent = canvas.current?.getActiveObject()
        let objs = objCurrent._objects

        if (objCurrent.get('type') === 'group') {
            for (thing in objs) {
                if(objs[thing].get('type') === 'triangle') {
                    objs[thing].set('fill', e.target.value)
                } else {
                    objs[thing].set('stroke', e.target.value)
                }
            }
        } else {
            objCurrent.set('fill', e.target.value)
        }
        canvas.current?.renderAll() 
    }

    // cor de borda
    function changeStrokeColor (e) {
        setStrokeColor(e.target.value)
        canvas.current?.getActiveObject().set('stroke', e.target.value)
        canvas.current?.renderAll()
    }

    return(
        <div>
            { !arrowActive ? (
                <>
                    <select name="fill_color" id="fill_color" value={fillColor} onChange={changeFillColor}>  
                        <option value="transparent">Sem fundo</option>
                        <option value="black">Preto</option>
                        <option value="red">Vermelho</option>
                        <option value="blue">Azul</option>
                        <option value="white">Branco</option>
                    </select>

                    <select name="stroke_color" id="stroke_color" value={strokeColor} onChange={changeStrokeColor}>
                        <option value="transparent">Sem borda</option>
                        <option value="black">Preto</option>
                        <option value="red">Vermelho</option>
                        <option value="blue">Azul</option>
                    </select>
                </>
            ) : (
                <select name="arrow_color" id="arrow_color" value={fillColor} onChange={changeFillColor}>  
                    <option value="black">Preto</option>
                    <option value="red">Vermelho</option>
                    <option value="blue">Azul</option>
                    <option value="white">Branco</option>
                </select>
            )}
        </div>
    )
}

export default ShapeTools
