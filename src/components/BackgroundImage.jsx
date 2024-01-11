import { useContext, useState, useEffect, useRef } from "react"
import { FabricContext } from "../App"
import { fabric } from "fabric"


const BackgroundImage = () => {
    const canvas = useContext(FabricContext)
    const [bgImgURL, setBgImgURL] = useState('')
    const { innerWidth: width, innerHeight: height } = window

    /* ref para forçar o input a ser componente não-controlado, 
    para pdoer limpar o value após adicionar imagem (não estava conseguindo 
    adicionar imagens semelhantes consecutivamente) */
    //const fileInput = useRef(null)

    const handleImgChange = (e) => {
        setBgImgURL(URL.createObjectURL(e.target.files[0]))   
    }
    
    /*useEffect(() => {

        new fabric.Image.fromURL(bgImgURL, function(img) {
            img.set({
                scaleX: canvas.current?.width / img.width,
                scaleY: canvas.current?.height / img.height
            })
            canvas.current?.setBackgroundImage(img, canvas.current?.renderAll.bind(canvas.current))             
        })
        console.log(canvas?.current)
    }, [canvas?.current, bgImgURL])*/

    

    useEffect(() => {
        new fabric.Image.fromURL(bgImgURL, function(img) {
            var scale
            var scaleW = width / img.width
            var scaleH = height / img.height

            /*if(img.width > img.height && img.height > height) {
                scale = scaleH
            } else {
                scale = scaleW */

            if(width > 540) {
                if (img.width > img.height && img.height < height) {
                    scale = scaleW
                } else if (img.width > img.height && img.height > height){
                    scale = scaleH
                } else if (img.height > img.width && img.width < width) {
                    scale = scaleH  
                } else if (img.height > img.width && img.width > width) {
                    scale = scaleW
                } else if (img.height == img.width) {
                    scale = scaleH
                }

            } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                if (img.width > img.height && img.height < height) {
                    scale = scaleW
                } else if (img.width > img.height && img.height > height){
                    scale = scaleW
                } else if (img.height > img.width && img.width < width) {
                    scale = scaleH  
                } else if (img.height > img.width && img.width > width) {
                    //talvez dê bug aqui, testar depois
                    scale = scaleW
                } else if (img.height == img.width) {
                    scale = scaleW
                }
            }
  
            img.set({
                scaleX: scale,
                scaleY: scale,

                /*imageSmoothingEnabled: false,
                webkitImageSmoothingEnabled: false,
                mozImageSmoothingEnabled: false,
                msImageSmoothingEnabled: false,
                oImageSmoothingEnabled: false*/
            })
            /*img.objectCaching = false
            img.noScaleCache = true*/
            
            canvas.current?.setBackgroundImage(img, canvas.current?.renderAll.bind(canvas.current))
            canvas.current?.setWidth(img.getScaledWidth())
            canvas.current?.setHeight(img.getScaledHeight())

            img.set({
                left: 0,
                top: 0
            })
            img.setCoords()

            canvas.current?.requestRenderAll()          
            })

            alert("gesture on3")
            var pausePanning,
                zoomStartScale,
                currentX,
                currentY,
                xChange,
                yChange,
                lastX,
                lastY

                canvas.current.on({
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
                console.log("zoom")
        
            console.log(canvas?.current)
    }, [canvas?.current, bgImgURL])


    // Função Download
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = event => {
        console.log('Button clicked');
        };

        var imageSaver = ref.current;

        imageSaver = document.getElementById('download');
        imageSaver.addEventListener('click', saveImage, false);

        function saveImage(e) {
        this.href = canvas.current.toDataURL({
            format: 'jpeg',
        });
        this.download = 'abare-img.jpeg'

        return () => {
            saveImage.removeEventListener('click', handleClick);
        }}
  }, [])

    return(
        <>
            <label>
                Imagem de Fundo
                <input type="file" accept="image/*" onChange={handleImgChange} />
            </label>
            <a ref={ref} id='download' href='#' >Baixar</a>
        </>
    )
}

export default BackgroundImage

