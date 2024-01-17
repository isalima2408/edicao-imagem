import styles from './Sticker.module.css'

const Sticker = ({setStickerBtnSelected}) => {

    return (
        <button className={ styles.sticker_icon } onClick={() => setStickerBtnSelected(val => !val)}>
            <ion-icon name="planet-outline"></ion-icon>
        </button>
    )
    
}

export default Sticker
