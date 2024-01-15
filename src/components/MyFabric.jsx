import { useContext, useCallback, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../App.js";
import styles from "./MyFabric.module.css"

export const useFabric = () => {
    const canvas = useContext(FabricContext);
    const { innerWidth: width, innerHeight: height } = window

    // 40 é o tamanho da barra de ferramentas
    const canvasHeight = height - 40
    console.log(width)
    
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
      canvas.current = new fabric.Canvas(element, {
        backgroundColor: '#eee',
        hoverCursor: 'default',
        height: canvasHeight,
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
      <div className={ styles.my_fabric }>
        <canvas ref={fabricRef} />
      </div>
    )
}

export default MyFabric
