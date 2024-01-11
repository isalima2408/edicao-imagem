import { useState } from "react"

import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import TextTools from '../TextTools/TextTools'
import Emoji from "../Emoji/Emoji"
import Sticker from "../Sticker/Sticker"
import Paint from "../Paint/Paint"
import ExternImage from '../Image/ExternImage'

const Toolbar = () => {
    const [textBtnSelected, setTextBtnSelected] = useState(false)
    const [paintBtnSelected, setPaintBtnSelected] = useState(false)

    return(
        <div id="Toolbar">
            <BgImage />
            <Text textBtnSelected={textBtnSelected} setTextBtnSelected={setTextBtnSelected} />
            <ExternImage />
            <Emoji />
            <Sticker />
            <Paint paintBtnSelected={paintBtnSelected} setPaintBtnSelecte={setPaintBtnSelected} />
            {textBtnSelected && <TextTools />}
        </div>
    )
}

export default Toolbar
