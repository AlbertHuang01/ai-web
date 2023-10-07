import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import IconMenu from './assets/icon-menu.png'
import IconSearch from './assets/icon-search.png'
import axios from 'axios'
import {useEffect, useState} from "react";
import {Carousel} from "./types.ts";

function App() {
    const [carouselList, setCarouselList] = useState<Carousel[]>([])

    useEffect(() => {
        axios.get<Carousel[]>('http://localhost:3000/ai/carousels').then((response) => {
            setCarouselList(response.data)
        })
    }, []);

    return (
        <>
            <img src={IconMenu} alt="" className='menu'/>
            <div className="search">
                <img src={IconSearch} alt=""/>
                <input type="text" placeholder='Search for dreams'/>
            </div>
            <div className="home-swiper">
                <Swiper
                    pagination
                    modules={[Pagination]}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {carouselList.map(item =>
                        <SwiperSlide key={item.id}
                                     style={{backgroundImage: `url(${item.img_url})`}}>
                            <div className="text">
                                <div className="text-wrap">
                                    <div className='title'>{item.title}</div>
                                    <div className='content'>{item.content}</div>
                                    <div className='btn'>Get started</div>
                                </div>
                            </div>
                        </SwiperSlide>)}

                </Swiper>
            </div>
        </>

    )
}

export default App
