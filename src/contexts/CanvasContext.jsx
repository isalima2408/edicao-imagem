/*import { useState, createContext } from 'react'
import { fabric } from 'fabric'
import { useRef } from 'react'

export const CanvasContext = createContext()



export const ProviderCanvasContext = ({ children }) => {
    const canvasRef = useRef(null)
    
    const [canvas, setCanvas] = useState(new fabric.Canvas(canvasRef.current,{backgroundColor: 'pink'}))
    console.log(canvas)
    //const [c, setC] = useState(12)

    return(
        <>
        
            <CanvasContext.Provider value={{canvas}}> 
            <canvas ref={canvasRef} ></canvas>  
                { children }
            </CanvasContext.Provider>
        </>
    )
}*/