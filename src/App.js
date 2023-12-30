import { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from "fabric";
import './App.css';

//import CanvasTeste from './components/CanvasTeste';
import { Canvas } from './components/Canvas';
import { Text } from './components/Text';
import { Image } from './components/Image';

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

function App() {

  const [canvas, setCanvas] = useState();

  // aqui são propriedades iniciais do elemento Text, tem o conteudo inicial e posição do nosso objeto
  const [texts, onTextChange] = useFabricData({
    '0': { text: 'Abaré', left: 0, top: 60, fill: 'red' },
    '1': { text: 'B', left: 30 },
    '2': { text: 'C', left: 60 },
  });

  //**options entao se torna a nova variável? Como se texts estivesse dentro dela?
  /*const onTextChange = useCallback((id, options) => { 
    setTexts((texts) => ({ ...texts, [id]: options }));
  }, []);*/

  const [images, onImageChange] = useFabricData({
    '0': { left: 100, width: 50, height: 50, data: { src: base64svg } },
    '1': { left: 150, width: 50, height: 50, data: { src: base64svg } },
  });

  // o componente de texto so vai ser executado uma vez e depois reutilizado

  return (
    <Canvas setCanvas={setCanvas}>
      {Object.entries(texts).map(
        ([key, options]) =>
          canvas && <Text options={options} canvas={canvas} id={key} key={key} onChange={onTextChange} />,
      )}
      {Object.entries(images).map(
        ([key, options]) =>
          canvas && <Image options={options} canvas={canvas} id={key} key={key} onChange={onImageChange} />,
      )}
    </Canvas>
  );
}

  
export default App;
