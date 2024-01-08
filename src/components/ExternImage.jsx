import { useContext, useState, useEffect, useRef } from "react"
import { FabricContext } from "../App"
import { fabric } from "fabric"

const ExternImage = () => {
    const canvas = useContext(FabricContext)

    /* ref para forçar o input a ser componente não-controlado, 
    para pdoer limpar o value após adicionar imagem (não estava conseguindo 
    adicionar imagens semelhantes consecutivamente) */
    const fileInput = useRef(null)

    // variável para 
    const [imgURL, setImgURL] = useState('')

    const handleImgChange = (e) => {
        setImgURL(URL.createObjectURL(e.target.files[0]))
        if (fileInput.current) {
            fileInput.current.value = ''
        }
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
            <input type="file" onChange={handleImgChange} ref={fileInput} />
        </label>
    )
}

export default ExternImage
