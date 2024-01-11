import BgImage from "../BgImage/BgImage"
import Text from "../Text/Text"
import Emoji from "../Emoji/Emoji"
import Sticker from "../Sticker/Sticker"
import Paint from "../Paint/Paint"
import ExternImage from '../Image/ExternImage'
import Download from '../Download/Download'

const Toolbar = () => {
    
    
    return(
        <div id="Toolbar">
            <BgImage />
            <Text />
            <ExternImage />
            <Emoji />
            <Sticker />
            <Paint />
        </div>
    )
}

export default Toolbar
