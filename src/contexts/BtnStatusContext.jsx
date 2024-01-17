import { createContext, useContext, useState } from "react";
import { FabricContext } from "../App";

export const BtnStatusContext = createContext()

export function BtnStatusProvider({ children }) {
    const canvas = useContext(FabricContext)

    const [bgImageInserted, setBgImageInserted] = useState(false)
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)
    const [emojiBtnSelected, setEmojiBtnSelected] = useState(false)
    const [stickerBtnSelected, setStickerBtnSelected] = useState(false)

    const disablePaintMode = () => {
        console.log("funcao disable PM")
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
    }

    return(
    <BtnStatusContext.Provider value={{
        bgImageInserted,
        setBgImageInserted,
        textBtnSelected,
        setTextBtnSelected,
        paintBtnSelected,
        setPaintBtnSelected,
        emojiBtnSelected,
        setEmojiBtnSelected,
        stickerBtnSelected,
        setStickerBtnSelected,
        disablePaintMode
    }}>
        {children}
    </BtnStatusContext.Provider>
    )  
}

export function useBtnStatus() {
    return useContext(BtnStatusContext)
}