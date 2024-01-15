const Emoji = ({setEmojiBtnSelected}) => {

    return <button onClick={() => setEmojiBtnSelected(val => !val)}>Emoji</button>
}

export default Emoji
