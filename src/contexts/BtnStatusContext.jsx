import { createContext, useContext, useState } from "react";
import { FabricContext } from "../App";

export const BtnStatusContext = createContext()

export function BtnStatusProvider({ children }) {
    const canvas = useContext(FabricContext)

    // botões da toolbar
    const [bgImageInserted, setBgImageInserted] = useState(false)
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)
    const [emojiBtnSelected, setEmojiBtnSelected] = useState(false)

    // propriedades de texto (texttools)
    const [textAlign, setTextAlign] = useState('')
    const [textColor, setTextColor] = useState('')
    const [textFontFamily, setTextFontFamily] = useState('')
    const [textStyle, setTextStyle] = useState('')

    const disablePaintMode = () => {
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
        disablePaintMode,
        textAlign,
        setTextAlign,
        textColor,
        setTextColor,
        textFontFamily,
        setTextFontFamily,
        textStyle,
        setTextStyle
    }}>
        {children}
    </BtnStatusContext.Provider>
    )  
}

export function useBtnStatus() {
    return useContext(BtnStatusContext)
}