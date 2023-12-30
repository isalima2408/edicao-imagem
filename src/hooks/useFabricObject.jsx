import { useState, useEffect, useCallback } from 'react'
import { fabric } from 'fabric';

export function useFabricObject (objectFactory, canvas, id, options, onChange) {
    const [element, setElement] = useState();
  
    useEffect(() => {
      if (element) {
        return;
      }
      const setupObject = async () => {
        const awaitedElement = await objectFactory(options);
        canvas.add(awaitedElement);
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
  

  export const Text = ({ canvas, id, options, onChange }) => {
    const factory = useCallback(() => textboxFactory(options), []);
    const textbox = useFabricObject(factory, canvas, id, options, onChange);
  
    useEffect(() => {
      const update = () => {
        onChange(id, textbox?.toObject());
      };
      textbox?.on('changed', update);
    }, [textbox, id, onChange]);
  
    return <></>;
  };