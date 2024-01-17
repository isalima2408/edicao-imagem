import { createContext, useContext, useState } from "react";
import { FabricContext } from "../App";

const BtnStatusContext = createContext()

export function BtnStatusProvider({ children }) {
    const canvas = useContext(FabricContext)

    const [bgImageInserted, setBgImageInserted] = useState(false)
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)
    const [emojiBtnSelected, setEmojiBtnSelected] = useState(false)
    const [stickerBtnSelected, setStickerBtnSelected] = useState(false)

    function disablePaintMode () {
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
    }

    return(
    <BtnStatusProvider.Provider value={{
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
    </BtnStatusProvider.Provider>
    )  
}

export function useBtnStatus() {
    return useContext(BtnStatusContext)
}