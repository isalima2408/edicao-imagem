import { useContext, useState, useEffect } from "react";
import { FabricContext } from "../../App";
import { useBtnStatus } from "../../contexts/BtnStatusContext";
import { HuePicker } from 'react-color';

const ShapeTools = () => {
    const canvas = useContext(FabricContext);
    const { arrowActive } = useBtnStatus()
    const [fillActive, setFillActive] = useState(false)
    const [strokeActive, setStrokeActive] = useState(false)
    const [fillColor, setFillColor] = useState({ background: '#A020F0' })
    const [strokeColor, setStrokeColor] = useState({ background: '#A020F0' })

    // cor de fundo
    function handleFillColorChangeComplete (e) {
        setFillColor({ background: e.hex })
        let thing
        let objCurrent = canvas.current?.getActiveObject()
        let objs = objCurrent._objects

        if (objCurrent.get('type') === 'group') {
            for (thing in objs) {
                if(objs[thing].get('type') === 'triangle') {
                    objs[thing].set('fill', e.hex)
                } else {
                    objs[thing].set('stroke', e.hex)
                }
            }
        } else {
            objCurrent.set('fill', e.hex)
        }
        canvas.current?.renderAll() 
    }

    // cor de borda
    function handleStrokeColorChangeComplete (e) {
        setStrokeColor({ background: e.hex })
        canvas.current?.getActiveObject().set('stroke', e.hex)
        canvas.current?.renderAll()
    }

    return(
        <div style={{display: 'flex'}}>
            { !arrowActive ? (
                <>
                    <button onClick={ () => setFillActive(val => !val) } >Fundo</button>
                    {fillActive && 
                        <HuePicker 
                            color={ strokeColor.background }
                            onChangeComplete={ handleFillColorChangeComplete }
                        />   
                    }
                    <button onClick={ () => setStrokeActive(val => !val) } >Borda</button>
                    {strokeActive && 
                        <HuePicker 
                            color={ fillColor.background }
                            onChangeComplete={ handleStrokeColorChangeComplete }
                        />   
                    }
                </>
            ) : (
                <>
                <button onClick={ () => setFillActive(val => !val) } >Fundo</button>
                    {fillActive && 
                        <HuePicker 
                            color={ fillColor.background }
                            onChangeComplete={ handleFillColorChangeComplete }
                        />   
                    }
                </>
            )}
        </div>
    )
}

export default ShapeTools
