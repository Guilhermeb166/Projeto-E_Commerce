import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './Carousel.module.css'

import image1 from '../../../img/fundo1.png'
import image2 from '../../../img/fundo2.png'
import image3 from '../../../img/fundo3.png'
export default function Carousel() {
    const images = [image1, image2, image3]
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}

                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.carousel}>
                        <img src={image} alt={`Slide ${index + 1}`} className={styles.image} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}