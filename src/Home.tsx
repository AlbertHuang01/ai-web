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
import {useEffect, useState} from "react";
import {Carousel, Fiction} from "./types.ts";
import axios from "axios";

import './Home.scss'

interface HomeProps {
    setCurrentFictionId: (num: number) => void
}

const Home = (props: HomeProps) => {
    const {setCurrentFictionId} = props

    const [carouselList, setCarouselList] = useState<Carousel[]>([])
    const [fictionList, setFictionList] = useState<Fiction[]>([])

    const [mainCategoryId, setMainCategoryId] = useState('Recommended')
    const [mainCategory] = useState(['Recommended', 'Fan Fiction', 'Sci-fi', 'RPG'])

    const [subCategoryId, setSubCategoryId] = useState('Default')
    const [subCategory] = useState(['Default', 'Recent', 'Hot', 'Nodes'])

    useEffect(() => {
        axios.get<Carousel[]>('http://localhost:3000/ai/carousels').then((response) => {
            setCarouselList(response.data)
        })
    }, []);

    useEffect(() => {
        axios.get<Fiction[]>('http://localhost:3000/ai/fictions').then((response) => {
            setFictionList(response.data)
        })
    }, [mainCategoryId, subCategoryId]);

    return <>
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
            {mainCategory.map(item =>
                <li key={item}
                    onClick={() => setMainCategoryId(item)}
                    className={`${mainCategoryId === item ? 'active' : ''}`}>{item}</li>)}
            <li className='arrow'><img src={IconRightArrow} alt=""/></li>
        </ul>
        <ul className='category category-sub'>
            {subCategory.map(item =>
                <li key={item}
                    onClick={() => setSubCategoryId(item)}
                    className={`${subCategoryId === item ? 'active' : ''}`}>{item}</li>)}
            <li>Filter</li>
        </ul>
        <div className="fiction-list">
            {fictionList.map(item => <div className="fiction-item" key={item.id}
                                          onClick={() => setCurrentFictionId(item.id)}>

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
}

export default Home
