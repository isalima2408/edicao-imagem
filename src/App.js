/*
Optional chaining (?.)
cadastro = [
{nome: joao, endereco: { rua: 9, bairro: 2}},
{nome: tomas}
]

QUando tento acessar endereco de joao, da ok
Quando tento acessar endereco de tomas (primeira escala), dá undefined (pq nao tem)
Quando tento acessar rua de tomas (segunda escala), da ERRO NA APLICAÇÃO, porque esta "dentro de undefined" (dentro do que ja nao existe)
Entao uso cadastro[1].endereco?.rua para tentar acessar tomas, de uma forma que nao retorne erro, mas apenas o undefined da primeira escala. Assim a aplicação funciona
*/

import { useState, useRef, useInsertionEffect, useCallback, createRef, createContext, useContext } from "react";
import { fabric } from 'fabric'


import { Text } from "./components/Text";
import { Image } from "./components/Image";
import BackgroundImage from "./components/BackgroundImage"
import MyFabric from "./components/MyFabric";
import MyToolkit from "./components/MyToolkit";
import ExternImage from "./components/ExternImage";

const useFabricData = (initial) => {
  const [objects, setObjects] = useState(initial);

  const onObjectChange = useCallback((id, options) => {
    setObjects((objects) => ({ ...objects, [id]: options }));
  }, []);

  return [objects, onObjectChange];
};

const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <g>
    <circle r="25" cy="25" cx="25" />
  </g>
</svg>`;
const base64svg = `data:image/svg+xml;base64,${btoa(svg)}`;

export const FabricContext = createContext();

function App () {
  const [canvas, setCanvas] = useState()

// useFabricData retornará exatamente as variaveis para armazenar em texts e ontextchange
/*const [texts, onTextChange] = useFabricData({
    '0': { text: 'A', left: 0 },
    '1': { text: 'B', left: 30 },
    '2': { text: 'C', left: 60 },
  });*/

  const [images, onImageChange] = useFabricData({
    '0': { left: 100, width: 50, height: 50, data: { src: base64svg } },
    '1': { left: 150, width: 50, height: 50, data: { src: base64svg } },
  });

  //const canvas = useContext(FabricContext);

  return(
    <FabricContext.Provider value={createRef()}>
      <BackgroundImage />
      <div>
      <MyFabric />
      { }

      </div>
      
      <MyToolkit />
      <Text />
      <ExternImage />
      {/*Object.entries(texts).map(
        ([key, options]) =>
          <Text options={options} id={key} key={key} onChange={onTextChange} />,
      )*/}
      {/*Object.entries(images).map(
        ([key, options]) =>
          <Image options={options} id={key} key={key} onChange={onImageChange} />,
      )*/}
    </FabricContext.Provider>
      
  )
}

export default App
