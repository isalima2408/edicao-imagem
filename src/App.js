import { useState, useRef, useInsertionEffect, useCallback, createRef, createContext, useContext } from "react";
import { fabric } from 'fabric'


import { Text } from "./components/Text";
import { Image } from "./components/Image";
import { Canvas } from "./components/Canvas"
import MyFabric from "./components/MyFabric";
import MyToolkit from "./components/MyToolkit";

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


const [texts, onTextChange] = useFabricData({
    '0': { text: 'A', left: 0 },
    '1': { text: 'B', left: 30 },
    '2': { text: 'C', left: 60 },
  });

  const [images, onImageChange] = useFabricData({
    '0': { left: 100, width: 50, height: 50, data: { src: base64svg } },
    '1': { left: 150, width: 50, height: 50, data: { src: base64svg } },
  });

  //const canvas = useContext(FabricContext);

  return(
    <FabricContext.Provider value={createRef()}>
      <MyFabric />
      <MyToolkit />
      {Object.entries(texts).map(
        ([key, options]) =>
          <Text options={options} id={key} key={key} onChange={onTextChange} />,
      )}
      {Object.entries(images).map(
        ([key, options]) =>
          <Image options={options} id={key} key={key} onChange={onImageChange} />,
      )}
    </FabricContext.Provider>
      
  )
}

export default App
