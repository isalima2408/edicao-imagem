import { useContext, useCallback, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../App.js";

export const useFabric = () => {
    const canvas = useContext(FabricContext);
    
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
      canvas.current = new fabric.Canvas(element, {
        backgroundColor: '#eee',
        imageSmoothingEnabled: false,
        webkitImageSmoothingEnabled: false,
        mozImageSmoothingEnabled: false,
        msImageSmoothingEnabled: false,
        oImageSmoothingEnabled: false
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return fabricRef;
  };
  
function MyFabric() {
    const fabricRef = useFabric();

    return(
      <div className="MyFabric">
        <canvas ref={fabricRef} />
      </div>
    )
}

export default MyFabric
