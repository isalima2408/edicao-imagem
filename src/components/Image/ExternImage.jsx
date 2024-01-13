import { useContext, useState, useEffect, useRef } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"

const ExternImage = ({setTextBtnSelected, setPaintBtnSelected}) => {
    const canvas = useContext(FabricContext)
    const fileInput = useRef(null)
    const [imgURL, setImgURL] = useState('')


    function setElementsFalse () {
        setTextBtnSelected(false)
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
    }

    const handleImgChange = (e) => {
        setImgURL(URL.createObjectURL(e.target.files[0]))
        if (fileInput.current) {
            fileInput.current.value = ''
        }
        canvas.current?.requestRenderAll()
    }

    useEffect(() => {
        new fabric.Image.fromURL(imgURL, function(img) {
            img.set({
                selectable: true
            }).scale(0.2)
            
            canvas.current?.add(img)
            canvas.current?.renderAll()
        })
        
    }, [canvas?.current, imgURL])


    return(
        <label>
            Imagem
            <input type="file" onChange={handleImgChange} onClick={setElementsFalse} ref={fileInput} />
        </label>
    )
}

export default ExternImage
