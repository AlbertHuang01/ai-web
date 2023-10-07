import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Carousel, Fiction} from "./types.ts";
import 'swiper/css';
import 'swiper/css/navigation';
import './Detail.scss'
import NavLeft from './assets/nav-left.png'
import NavRight from './assets/nav-right.png'
import GrayCircle from './assets/gray-circle.png'
import IconStartBlack from './assets/icon-star-black.png'
import IconBlackArrow from './assets/icon-black-arrow.png'

interface DetailProps {
    setShowHome: (bool: boolean) => void
    currentFictionId: number
}

const Detail = (props: DetailProps) => {
    const {setShowHome, currentFictionId} = props
    const [fiction, setFiction] = useState<Fiction>()

    useEffect(() => {
        axios.get<Fiction>(`http://localhost:3000/ai/fictions/${currentFictionId}`).then((response) => {
            setFiction(response.data)
        })
    }, [currentFictionId]);

    return <div className='page-wrap'>
        <div className="nav">
            <div className="wrap">
                <img src={NavLeft} alt="" onClick={() => setShowHome(true)}/>
                <img src={NavRight} alt=""/>
            </div>
        </div>
        <div className="swiper">
            <Swiper
                navigation
                slidesPerView={1}
                modules={[Navigation]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper: any) => console.log(swiper)}
            >
                {fiction?.swipers.map((item, index) =>
                    <SwiperSlide key={index}>
                        <img src={item} alt=""/>
                    </SwiperSlide>)}

            </Swiper>
        </div>

        <div className="title">{fiction?.title}</div>

        <div className="author">
            <img src={fiction?.author.avatar} alt=""/>
            {fiction?.author.name}
        </div>

        <p className='content'>{fiction?.content}</p>

        <div className="topics">
            {fiction?.topics.map((item, index) => <span key={index}>#{item}</span>)}
        </div>
        <div className="topics">
            {fiction?.topics.map((item, index) => <span key={index}>#{item}</span>)}
        </div>

        <div className="tags">
            {fiction?.tags.map((item, index) => <span key={index}>{item}</span>)}
        </div>

        <div className="fiction-data">
            <div className="group">
                <div className="circle-group">
                    <img src={GrayCircle} alt=""/>
                    <img src={GrayCircle} alt=""/>
                    <img src={GrayCircle} alt=""/>
                </div>
                <div className="contributors">+{fiction?.contributor_num} contributors</div>
            </div>
            <div className="star">
                <img src={IconStartBlack} alt=""/>
                {fiction?.start_num}
            </div>


        </div>
        <div className="enter">
            <div className="wrap">
                Enter Dream
            </div>
        </div>
        <div className='view-detail'>
            View Dream Details
            <img src={IconBlackArrow} alt=""/>
        </div>
    </div>
}

export default Detail
