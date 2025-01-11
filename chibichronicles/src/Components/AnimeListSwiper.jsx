import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from '../Styles/Components/AnimeListSwiper.module.css';
import { formatAnimeDescription } from "../Utils/formatters";

export const AnimeListSwiper = ({ slides }) => {


  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.Title} className={styles.ParentSliderContainer}>
          <div className={styles.topAnimeTitleContainer}>
            <span>Top Anime</span>
          </div>  
          <div className={styles.sliderImageContainer}>
            <img src={slide.CoverImage.jpg.large_image_url ? slide.CoverImage.jpg.large_image_url : 'https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="Anime-Slide-Image"/>
          </div>
          <div className={styles.sliderDescriptionContainer}>
            <div className={styles.sliderTitleContainer}>
                <span>{slide.Title}</span>
                <span>{slide.AgeRating}</span>
            </div>
            <div className={styles.sliderBottomContainer}>
                <div className={styles.sliderDescriptionInnerParentContainer}>
                    <span>{formatAnimeDescription(slide.Description , 300)}</span>
                </div>
                <div className={styles.watchTrailerButtonContainer}>
                    <a href={slide.Trailer.embed_url} target="_blank"><button>Watch Trailer</button></a>
                </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )

};

export default AnimeListSwiper;