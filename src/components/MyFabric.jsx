import { useContext, useCallback, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../App.js";

export const useFabric = () => {
    const canvas = useContext(FabricContext);
    const { innerWidth: width } = window
    
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
      canvas.current.selection = false

      var pausePanning,
          zoomStartScale,
          currentX,
          currentY,
          xChange,
          yChange,
          lastX,
          lastY

      if (width <= 540) {
        canvas.current?.on({
          'touch:gesture': function(e) {
             
              if (e.e.touches && e.e.touches.length == 2) {
                  pausePanning = true;
                  var point = new fabric.Point(e.self.x, e.self.y);
                  if (e.self.state == "start") {
                    /* eslint-disable-next-line no-restricted-globals */
                      zoomStartScale = self.canvas.current?.getZoom();
                  }
                  var delta = zoomStartScale * e.self.scale;
                  /* eslint-disable-next-line no-restricted-globals */
                  self.canvas.current?.zoomToPoint(point, delta);
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

      }
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return fabricRef;
  };
  
function MyFabric() {
    const fabricRef = useFabric();

    return <canvas ref={fabricRef} />
}

export default MyFabric
