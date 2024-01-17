import { useContext, useCallback, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../App.js";
import styles from "./MyFabric.module.css"

export const useFabric = () => {
    const canvas = useContext(FabricContext);
    const { innerWidth: width, innerHeight: height } = window

    // 60 é o tamanho da barra de ferramentas total (main_tools + custom_tools)
    const canvasHeight = height - 60
    console.log(width)
    
    // criando canvas
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
      canvas.current = new fabric.Canvas(element, {
        selection: false,
        backgroundColor: 'gray',
        hoverCursor: 'default',
        height: canvasHeight,
        transparentCorners: false,
        cornerStyle: 'circle',
        cornerColor: 'purple',
        imageSmoothingEnabled: false,
        webkitImageSmoothingEnabled: false,
        mozImageSmoothingEnabled: false,
        msImageSmoothingEnabled: false,
        oImageSmoothingEnabled: false
      });

      // desabilitando seleção de todos os elementos (para atingir a função desenho)
      fabric.Object.prototype.selectable = false

      // configurando e personalizando controles de redimensionamento
      fabric.Object.prototype.setControlsVisibility({
        tl:false, 
        tr:false,
        ml:false, 
        mr:false, 
        bl:false, 
        mb:false, 
        mt: false,
        mtr: true,
        br: true,
      })

      fabric.Object.prototype.transparentCorners = false
      fabric.Object.prototype.cornerStyle = 'circle'
      fabric.Object.prototype.cornerColor = 'purple'

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
