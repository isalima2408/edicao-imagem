import { useContext, useState } from "react"

import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import TextTools from '../TextTools/TextTools'
import Emoji from "../Emoji/Emoji"
import Sticker from "../Sticker/Sticker"
import Paint from "../Paint/Paint"
import PaintTools from "../PaintTools/PaintTools"
import ExternImage from '../Image/ExternImage'
import { FabricContext } from "../../App"

const Toolbar = () => {
    const canvas = useContext(FabricContext)
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)

    const disablePaintMode = () => {
        setPaintBtnSelected(false)
        canvas.current?.set('isDrawingMode', false)
    }

    return(
        <div id="Toolbar">
            <BgImage setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode} />
            <Text setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode} />
            <ExternImage setTextBtnSelected={setTextBtnSelected} setPaintBtnSelected={setPaintBtnSelected} disablePaintMode={disablePaintMode}  />
            <Emoji disablePaintMode={disablePaintMode} />
            <Sticker disablePaintMode={disablePaintMode} />
            <Paint setPaintBtnSelected={setPaintBtnSelected} setTextBtnSelected={setTextBtnSelected} disablePaintMode={disablePaintMode} />
            {textBtnSelected && <TextTools />}
            {paintBtnSelected && <PaintTools setPaintBtnSelected={setPaintBtnSelected} />}
        </div>
    )
}

export default Toolbar
