import styles from './Download.module.css'
import { useRef, useContext, useEffect } from 'react'
import { FabricContext } from '../../App';
import { useBtnStatus } from '../../contexts/BtnStatusContext';

const Download = () => {
    const { bgImageInserted } = useBtnStatus()
    const canvas = useContext(FabricContext)
    const ref = useRef(null);

    useEffect(() => {

        if ( bgImageInserted ) {
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
                this.download = 'image.jpeg'

                return () => {
                    saveImage.removeEventListener('click', handleClick);
            }}
        }
        
  }, [bgImageInserted])

    return (
        <a ref={ref} id='download' href='#' className={styles.lnk_download} >
            <ion-icon name="download-outline"></ion-icon>
        </a>
    )
}

export default Download