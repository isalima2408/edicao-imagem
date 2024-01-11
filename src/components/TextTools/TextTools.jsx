const TextTools = ({oi}) => {
    console.log(oi)

    return(
        <div>
            <select name="font_family" id="font_family">
                <option value="arial">Arial</option>
                <option value="times-new-roman">Times New Roman</option>
                <option value="comic-sans">Comic Sans</option>
            </select>
            <select name="color" id="color">
                <option value="red">Vermelho</option>
                <option value="preto">Preto</option>
                <option value="azul">Azul</option>
            </select>
            <select name="align" id="align">
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
            </select>
        </div>
    )
}

export default TextTools
