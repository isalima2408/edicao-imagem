import { useContext } from "react";
import { FabricContext } from "../App.js";
import { fabric } from "fabric";

export function MyToolKit() {
    const canvas = useContext(FabricContext);
    const drawRect = () => {
      canvas.current?.add(new fabric.Rect(
        {top: 100, left: 100, width: 100, height: 100, fill: 'red'}
      ));
    };
    return(
      <div>
        <button onClick={drawRect}>Rect</button>
      </div>
    )
  }

  export default MyToolKit