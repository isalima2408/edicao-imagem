import { useContext, useState, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { FabricContext } from "../../App"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import styles from './BgImage.module.css'


const BgImage = () => {
    const canvas = useContext(FabricContext)
    const { setBgImageInserted, setTextBtnSelected, disablePaintMode } = useBtnStatus()
    const [bgImgURL, setBgImgURL] = useState('')
    const inputRef = useRef(null)
    const { innerWidth: width, innerHeight: height } = window
    const windowHeight = height - 80

    // Limpar elementos inseridos no canvas antigo ao inserir nova imagem de fundo
    const resetCanvas = () => {
        setTextBtnSelected(false)
        disablePaintMode()
        canvas.current?.clear()
    }

    // criar url quando a imagem for inserida
    const handleBgImgChange = (e) => {
        setBgImgURL(URL.createObjectURL(e.target.files[0])) 
        setBgImageInserted(true)  

        if (inputRef.current) {
            inputRef.current.value = ''
        }        
        canvas.current?.requestRenderAll()
    }

    // adicionando imagem ao canvas
    useEffect(() => {
        new fabric.Image.fromURL(bgImgURL, function(img) {
            var scale
            var scaleW = width / img.width
            var scaleH = windowHeight / img.height
            var ratioWindow = width / windowHeight
            var ratioImg = img.width / img.height

            var imgOverflow = ratioImg > ratioWindow

            if(!imgOverflow) {
                scale = scaleH
            } else {
                scale = scaleW
            }
  
            img.set({
                scaleX: scale,
                scaleY: scale,
                selectable: false,
                erasable: false,
                evented: true,
                objectCaching: false,
                noScaleCache: false,
                imageSmoothingEnabled: false,
                webkitImageSmoothingEnabled: false,
                mozImageSmoothingEnabled: false,
                msImageSmoothingEnabled: false,
                oImageSmoothingEnabled: false,
                excludeFromExport: true,             
            })

            img.setControlsVisibility({
                tl:false, 
                tr:false,
                ml:false, 
                mr:false, 
                bl:false, 
                mb:false, 
                mt: false,
                mtr: true,
                br: false,
            })
            
            canvas.current?.setBackgroundImage(img, canvas.current?.renderAll.bind(canvas.current))
            canvas.current?.setWidth(img.getScaledWidth())
            canvas.current?.setHeight(img.getScaledHeight())
            img.setCoords()
            canvas.current?.requestRenderAll()         
        })
    }, [canvas?.current, bgImgURL])


    return(
            <label className={ styles.camera_icon }>
                <ion-icon name="camera-outline"></ion-icon>
                <input type="file" accept="image/*" onClick={resetCanvas} onChange={handleBgImgChange} ref={inputRef}/>
            </label>     
    )
}

export default BgImage
