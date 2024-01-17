import styles from './Emoji.module.css'

const Emoji = ({setEmojiBtnSelected}) => {

    return <button className={ styles.emoji_icon } onClick={() => setEmojiBtnSelected(val => !val)}><ion-icon name="happy-outline"></ion-icon></button>
}

export default Emoji
