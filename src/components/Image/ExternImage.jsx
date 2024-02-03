import { useContext, useState, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { FabricContext } from "../../App"
import { useBtnStatus } from '../../contexts/BtnStatusContext'
import styles from './ExternImage.module.css'

const ExternImage = () => {
    const { bgImageInserted, disablePaintMode, setTextBtnSelected, setPaintBtnSelected } = useBtnStatus()
    const [imgURL, setImgURL] = useState('')
    const [extImgInserted, setExtImgInserted] = useState(false)
    const canvas = useContext(FabricContext)
    const inputRef = useRef(null)
    
    
    function disableExternImageBtn () {
        if (bgImageInserted) {
            return false
        } else {
            return true
        }
    }

    function disableElements () {
        setTextBtnSelected(false)
        disablePaintMode()
        canvas.current?.discardActiveObject().renderAll()
    }

    const handleImgChange = (e) => {
        setImgURL(URL.createObjectURL(e.target.files[0]))
        setExtImgInserted(true)

        if (inputRef.current) {
            inputRef.current.value = ''
        }        
        canvas.current?.requestRenderAll()
    }

    async function fabricImageFromURL(image_url) {                                                                          
        return new Promise(function(resolve, reject) {                                                                        
          try {                                                                                                               
            
            new fabric.Image.fromURL(image_url, function (img) {                                                                
              resolve(img);
              img.set({
                selectable: true,
                erasable: false,
                centeredScaling: true,
                centeredRotation: true,
                objectCaching: false,
                noScaleCache: false
            }).scale(0.2)

            img.setControlsVisibility({
                tr: false,
            })

            canvas.current?.add(img)
            canvas.current?.centerObject(img)
            img.setCoords()
            canvas.current?.setActiveObject(img)
            canvas.current?.requestRenderAll()
        })

        } catch (error) {                                                                                                   
            reject(error);
            return                                                                                                                                                                                                                                
        };                                                                                                                   
      })}

    useEffect(() => {
        if(extImgInserted) {
            fabricImageFromURL(imgURL)
            setExtImgInserted(false)
        }
    }, [extImgInserted])


    return(
        <label className={ styles.image_icon }>
            <ion-icon name="images-outline"></ion-icon>
            <input type="file" accept="image/*" onChange={handleImgChange} onClick={disableElements} disabled={disableExternImageBtn()} ref={inputRef}/>
        </label>
    )
}

export default ExternImage
