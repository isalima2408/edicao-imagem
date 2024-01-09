import { useContext, useState, useEffect, useRef } from "react"
import { FabricContext } from "../App"
import { fabric } from "fabric"

const BackgroundImage = () => {
    const canvas = useContext(FabricContext)
    const [bgImgURL, setBgImgURL] = useState('')
    const { innerWidth: width, innerHeight: height } = window

    /* ref para forçar o input a ser componente não-controlado, 
    para pdoer limpar o value após adicionar imagem (não estava conseguindo 
    adicionar imagens semelhantes consecutivamente) */
    //const fileInput = useRef(null)

    const handleImgChange = (e) => {
        setBgImgURL(URL.createObjectURL(e.target.files[0]))
    }

    /*useEffect(() => {

        new fabric.Image.fromURL(bgImgURL, function(img) {
            img.set({
                scaleX: canvas.current?.width / img.width,
                scaleY: canvas.current?.height / img.height
            })
            canvas.current?.setBackgroundImage(img, canvas.current?.renderAll.bind(canvas.current))             
        })
        console.log(canvas?.current)
    }, [canvas?.current, bgImgURL])*/

    

    useEffect(() => {

        new fabric.Image.fromURL(bgImgURL, function(img) {
            let scale

            if (img.width > img.height) {
                scale = width / img.width 
            } else {
                scale = height / img.height
            }
            
            img.set({
                scaleX: scale,
                scaleY: scale,

                /*imageSmoothingEnabled: false,
                webkitImageSmoothingEnabled: false,
                mozImageSmoothingEnabled: false,
                msImageSmoothingEnabled: false,
                oImageSmoothingEnabled: false*/
            })
            
            canvas.current?.setBackgroundImage(img, canvas.current?.renderAll.bind(canvas.current))
            
            canvas.current?.setWidth(img.getScaledWidth())
            canvas.current?.setHeight(img.getScaledHeight())
            img.set({
                left: 0,
                top: 0
            })
            img.setCoords()
            canvas.current?.requestRenderAll()            
        })
        console.log(canvas?.current)
    }, [canvas?.current, bgImgURL])


    return(
        <label>
            Imagem de Fundo
            <input type="file" accept="image/*" onChange={handleImgChange} />
        </label>
    )
}

export default BackgroundImage