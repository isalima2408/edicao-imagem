import { useContext, useState, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { FabricContext } from "../../App"
import { useBtnStatus } from '../../contexts/BtnStatusContext'
import styles from './ExternImage.module.css'

const ExternImage = () => {
    const canvas = useContext(FabricContext)
    const { bgImageInserted, setTextBtnSelected, setPaintBtnSelected } = useBtnStatus()
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
                selectable: true,
            }).scale(0.2)
            
            canvas.current?.setActiveObject(img)
            canvas.current?.add(img)
            canvas.current?.renderAll()
        })
        
    }, [canvas?.current, imgURL])


    return(
        <label className={ styles.image_icon }>
            <ion-icon name="images-outline"></ion-icon>
            <input type="file" onChange={handleImgChange} onClick={setElementsFalse} ref={fileInput} disabled={bgImageInserted ? false : true} />
        </label>
    )
}

export default ExternImage
