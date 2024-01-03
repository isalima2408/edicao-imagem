import { useContext, useCallback } from "react";
import { fabric } from "fabric";

import { FabricContext } from "../App.js";


export const useFabric = () => {
    const canvas = useContext(FabricContext);
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
  
      canvas.current = new fabric.Canvas(element, {backgroundColor: '#eee'});
      canvas.current.add(new fabric.Rect(
        {top: 100, left: 100, width: 100, height: 100, fill: 'red'}
      ));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return fabricRef;
  };
  
function MyFabric() {
    const fabricRef = useFabric();
    return <canvas ref={fabricRef} width={640} height={360} />;
  }

  export default MyFabric