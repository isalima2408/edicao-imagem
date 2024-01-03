import { useContext, useState, useEffect } from "react"
import { FabricContext } from "../App"
import { fabric } from "fabric"

const BackgroundImage = () => {
    const canvas = useContext(FabricContext)
    const [imgURL, setImgURL] = useState('')

    const handleImgChange = (e) => {
        setImgURL(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        new fabric.Image.fromURL(imgURL, function(img) {
            img.set().scale(0.2)
            canvas.current?.add(img)
            canvas.current?.renderAll()
        }) 
    }, [canvas?.current, imgURL])


    return(
        <label>
            Inserir imagem
            <input type="file" onChange={handleImgChange} />
        </label>
    )
}

export default BackgroundImage
