import { useContext, useCallback, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../App.js";

export const useFabric = () => {
    const canvas = useContext(FabricContext);
    
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
      canvas.current = new fabric.Canvas(element, {
        backgroundColor: '#eee',
        hoverCursor: 'default',
        imageSmoothingEnabled: false,
        webkitImageSmoothingEnabled: false,
        mozImageSmoothingEnabled: false,
        msImageSmoothingEnabled: false,
        oImageSmoothingEnabled: false
      });

      // desabilitando seleção de tudo (p/ desabilitar a seleção do paint mode. Para tornar outros elementos selecionaveis basta especificar na criação dos mesmos como selectable: true)
      fabric.Object.prototype.selectable = false;

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
