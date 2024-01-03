import { useState, useEffect, useCallback, useContext } from 'react'
import { fabric } from 'fabric';
import { FabricContext } from '../App';



export function useFabricObject (objectFactory, id, options, onChange) {
    const [element, setElement] = useState();
    const canvas = useContext(FabricContext)
  
    useEffect(() => {
      if (element) {
        return;
      }
      const setupObject = async () => {
        const awaitedElement = await objectFactory(options);
        canvas.current?.add(awaitedElement);
        setElement(awaitedElement);
      };
      setupObject();
    }, [canvas, element, objectFactory, options]);
  
    useEffect(() => {
      const update = () => {
        onChange(id, element?.toObject());
      };
      element?.on('moved', update);
      element?.on('scaled', update);
      element?.on('rotated', update);
    }, [element, id, onChange]);
  
    useEffect(() => {
      element?.setOptions(options);
    }, [element, options]);
  
    return element;
  }
  
  const textboxFactory = async (options) => {
    return new fabric.Textbox(options.text ?? '', options);
  };
  

  export const Text = ({ id, options, onChange }) => {
    const factory = useCallback(() => textboxFactory(options), []);
    const textbox = useFabricObject(factory, id, options, onChange);
  
    useEffect(() => {
      const update = () => {
        onChange(id, textbox?.toObject());
      };
      textbox?.on('changed', update);
    }, [textbox, id, onChange]);
  
    return <></>;
  };