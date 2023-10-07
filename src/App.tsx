import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import IconMenu from './assets/icon-menu.png'
import IconSearch from './assets/icon-search.png'
import IconRightArrow from './assets/icon-right-arrow.png'
import IconEye from './assets/icon-eye.png'
import IconStar from './assets/icon-star.png'
import IconBottom1 from './assets/icon-bottom-1.png'
import IconBottom2 from './assets/icon-bottom-2.png'
import IconBottom3 from './assets/icon-bottom-3.png'

import axios from 'axios'
import {useEffect, useState} from "react";
import {Carousel, Fiction} from "./types.ts";

function App() {
    const [carouselList, setCarouselList] = useState<Carousel[]>([])
    const [fictionList, setFictionList] = useState<Fiction[]>([])

    const [categoryId, setCategoryId] = useState(-1)

    useEffect(() => {
        axios.get<Carousel[]>('http://localhost:3000/ai/carousels').then((response) => {
            setCarouselList(response.data)
        })
    }, []);

    useEffect(() => {
        axios.get<Fiction[]>('http://localhost:3000/ai/fictions').then((response) => {
            setFictionList(response.data)
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
            <ul className='category category-main'>
                <li className='active'>Recommended</li>
                <li>Fan Fiction</li>
                <li>Sci-fi</li>
                <li>RPG</li>
                <li className='arrow'><img src={IconRightArrow} alt=""/></li>
            </ul>
            <ul className='category category-sub'>
                <li className='active'>Default</li>
                <li>Recent</li>
                <li>Hot</li>
                <li>Nodes</li>
                <li>Filter</li>
            </ul>
            <div className="fiction-list">
                {fictionList.map(item => <div className="fiction-item" key={item.id}>

                    <div className="main">
                        <img src={item.swipers[0]} alt=""/>
                        <div className="nums">
                            <div className="num1">
                                <img src={IconEye} alt=""/>
                                {item.view_num}
                            </div>
                            <div className="num2">
                                <img src={IconStar} alt=""/>
                                {item.start_num}
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="title">{item.title}</div>
                        <div className="wrap">
                            <div className="content">{item.content}</div>
                            <img src={item.author.avatar} alt=""/>
                        </div>
                    </div>
                </div>)}
            </div>
            <div className="home-bottom">
                <div className="wrap">
                    <div className="home">
                        <img src={IconBottom1} alt=""/>
                        <span>Home</span>
                    </div>
                    <img src={IconBottom3} alt=""/>
                    <div className="mine">
                        <img src={IconBottom2} alt=""/>
                        <span>Mine</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default App
