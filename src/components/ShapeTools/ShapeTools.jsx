import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";

const ShapeTools = () => {
    const canvas = useContext(FabricContext);
    const { fillColor, setFillColor, strokeColor, setStrokeColor, strokeWidth, setStrokeWidth } = useBtnStatus()

    function changeFillColor (e) {
        setFillColor(e.target.value)
        canvas.current?.getActiveObject().set('fill', e.target.value)
        canvas.current?.renderAll()
    }

    function changeStrokeColor (e) {
        setStrokeColor(e.target.value)
        canvas.current?.getActiveObject().set('stroke', e.target.value)
        canvas.current?.renderAll()
    }

    function changeStrokeWidth (e) {
        setStrokeWidth(e.target.value)
        canvas.current?.getActiveObject().set('strokeWidth', e.target.value)
        canvas.current?.renderAll()
    }

    return(
        <div>
            <select name="fill_color" id="fill_color" value={fillColor} onChange={changeFillColor}>  
                <option value="transparent">Sem fundo</option>
                <option value="black">Preto</option>
                <option value="red">Vermelho</option>
                <option value="blue">Azul</option>
            </select>

            <select name="stroke_color" id="stroke_color" value={strokeColor} onChange={changeStrokeColor}>
                <option value="transparent">Sem borda</option>
                <option value="black">Preto</option>
                <option value="red">Vermelho</option>
                <option value="blue">Azul</option>
            </select>

            <select name="stroke_width" id="stroke_width" value={strokeWidth} onChange={changeStrokeWidth}>
                <option value="1">1</option>
                <option value="5">2</option>
                <option value="10">3</option>
            </select>
        </div>
    )
}

export default ShapeTools