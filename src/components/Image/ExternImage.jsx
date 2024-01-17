import { useContext, useState, useEffect, useRef } from "react"
import { FabricContext } from "../../App"
import { fabric } from "fabric"
import styles from './ExternImage.module.css'

const ExternImage = ({bgImageInserted, setTextBtnSelected, setPaintBtnSelected}) => {
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
                selectable: true,
                hoverCursor: 'pointer',
                cornerStyle: 'circle',
                cornerColor: 'purple',
            }).scale(0.2)

            img.setControlsVisibility({
                tl:false, 
                tr:false,
                ml:false, 
                mr:false, 
                bl:false, 
                mb:false, 
                mt: true,
                mtr: true,
                br: true,
              })
            
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
