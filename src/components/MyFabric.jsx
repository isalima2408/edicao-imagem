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
/*
    useEffect(() => {

      canvas.current?.on({
        'touch:gesture': function(e) {
            if (e.e.touches && e.e.touches.length == 2) {
                pausePanning = true;
                var point = new fabric.Point(e.self.x, e.self.y);
                if (e.self.state == "start") {
                    zoomStartScale = self.canvas.getZoom();
                }
                var delta = zoomStartScale * e.self.scale;
                self.canvas.zoomToPoint(point, delta);
                pausePanning = false;
            }
        },
        'object:selected': function() {
            pausePanning = true;
        },
        'selection:cleared': function() {
            pausePanning = false;
        },
        'touch:drag': function(e) {
            if (pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
                currentX = e.e.layerX;
                currentY = e.e.layerY;
                xChange = currentX - lastX;
                yChange = currentY - lastY;

                if( (Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
                    var delta = new fabric.Point(xChange, yChange);
                    canvas.relativePan(delta);
                }

                lastX = e.e.layerX;
                lastY = e.e.layerY;
            }
        }
    });

    }, [])*/

    return <canvas ref={fabricRef} />
}

export default MyFabric
