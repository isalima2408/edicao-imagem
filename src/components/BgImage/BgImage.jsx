import { useContext, useState, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { FabricContext } from "../../App"
import { useBtnStatus } from "../../contexts/BtnStatusContext"
import styles from './BgImage.module.css'


const BgImage = ({}) => {
    const canvas = useContext(FabricContext)
    const { setBgImageInserted, setTextBtnSelected, disablePaintMode } = useBtnStatus()

    const [bgImgURL, setBgImgURL] = useState('')
    const { innerWidth: width, innerHeight: height } = window
    const windowHeight = height - 60
    //const fileInput = useRef(null)

    // Limpar elementos inseridos no canvas antigo ao inserir nova imagem de fundo
    // Ver se consigo tornar isso válido somente na 2° inserção de imagem, porque na primeira ja vai estar limpo
    const resetCanvas = () => {
        setTextBtnSelected(false)
        disablePaintMode()
        canvas.current?.clear()
    }

    const handleBgImgChange = (e) => {
        setBgImgURL(URL.createObjectURL(e.target.files[0])) 
        setBgImageInserted(true)  
    }

    useEffect(() => {
        new fabric.Image.fromURL(bgImgURL, function(img) {
            var scale
            var scaleW = width / img.width
            var scaleH = windowHeight / img.height

            if(width > 540) {
                if (img.width > img.height && img.height < height) {
                    scale = scaleW
                } else if (img.width > img.height && img.height > height){
                    scale = scaleH
                } else if (img.height > img.width && img.width < width) {
                    scale = scaleH  
                } else if (img.height > img.width && img.width > width) {
                    scale = scaleW
                } else if (img.height == img.width) {
                    scale = scaleH
                }
            } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                if (img.width > img.height && img.height < height) {
                    scale = scaleW
                } else if (img.width > img.height && img.height > height){
                    scale = scaleW
                } else if (img.height > img.width && img.width < width) {
                    scale = scaleH  
                } else if (img.height > img.width && img.width > width) {
                    //talvez dê bug aqui, testar depois
                    scale = scaleW
                } else if (img.height == img.width) {
                    scale = scaleW
                }
            }
  
            img.set({
                scaleX: scale,
                scaleY: scale,
                selectable: false,

                imageSmoothingEnabled: false,
                webkitImageSmoothingEnabled: false,
                mozImageSmoothingEnabled: false,
                msImageSmoothingEnabled: false,
                oImageSmoothingEnabled: false
            })
            img.objectCaching = false
            img.noScaleCache = true

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

            /*img.set({
                left: 0,
                top: 0
            })
            img.setCoords()*/

            canvas.current?.requestRenderAll() 
            console.log(canvas.current?.getActiveObjects())         
            })
    }, [canvas?.current, bgImgURL])


    return(
            <label className={ styles.camera_icon }>
                <ion-icon name="camera-outline"></ion-icon>
                <input type="file" accept="image/*" onClick={resetCanvas} onChange={handleBgImgChange} />
            </label>     
    )
}

export default BgImage
