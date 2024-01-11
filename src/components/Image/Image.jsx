import { useCallback, useContext, useRef, createRef } from "react";
import { fabric } from "fabric";
import { useFabricObject } from "../../hooks/useFabricObject.jsx";
import { FabricContext } from "../../App.js";

const imageFactory = (options) => {
    return new Promise((resolve, reject) =>
      fabric.Image.fromURL(
        options.data?.src,
        (image) => {
          if (image) {
            return resolve(image);
          }
  
          return reject(image);
        },
        options,
      ),
    );
  };
  
  export const Image = (props) => {

    const canvas = useContext(FabricContext);

    const factory = useCallback(() => imageFactory(props.options), []);
    useFabricObject(factory, props.id, props.options, props.onChange);
  
    return <></>;
  };