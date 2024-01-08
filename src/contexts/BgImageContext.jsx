/*import { createContext, useState } from "react";

export const BgImageContext = createContext()

export const ProviderBgImageContext = ({ children }) => {
    const [imgURL, setImgURL] = useState('')
    const [imgWidth, setImgWidth] = useState()
    const [imgHeight, setImgHeight] = useState()
    const fileInput = useRef(null)

    const handleImgChange = (e) => {
        setImgURL(URL.createObjectURL(e.target.files[0]))
        setImgHeight((e) => fileInput.current.prop('height'))
        setImgWidth((e) => fileInput.current.prop('width'))
    }

    return(
        <>
            <label>
                Inserir imagem
                <input type="file" onChange={handleImgChange} ref={fileInput} />
            </label>
            <BgImageContext.Provider value={{imgURL}}>
                {children}
            </BgImageContext.Provider>
        </>
        
    )
}*/

