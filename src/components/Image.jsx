import { useCallback } from "react";
import { fabric } from "fabric";
import { useFabricObject } from "../hooks/useFabricObject";

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
    const factory = useCallback(() => imageFactory(props.options), []);
    useFabricObject(factory, props.canvas, props.id, props.options, props.onChange);
  
    return <></>;
  };
