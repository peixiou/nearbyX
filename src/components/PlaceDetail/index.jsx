import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import Place from "../Place";
import imgClose from '../../assets/close.png'
import Comments from "../Comments";

export default function PlaceDetail(props) {

    const { data, onClose } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    return (

        <div className="fixed flex flex-col  top-[5%] z-20 overflow-hidden  h-[95%] w-full bg-white rounded-tl-2xl rounded-tr-2xl shadow-top">

            <div className="h-[270px] bg-gray-500 relative shrink-0 overflow-hidden z-10">
                <img onClick={() => { onClose && onClose() }} className="absolute z-20 top-4 left-2" src={imgClose} alt="" srcset="" />
                <div className="flex text-[10px] items-end absolute right-3 bottom-10 z-20 text-white bg-gray-900 rounded-xl w-fit pl-2 pr-2">
                    <div className="text-[12px]"> {currentIndex + 1}</div>
                    <div className="ml-[2px] mr-[2px]">/</div>
                    <div >{data.photos.length}</div>
                </div>
                <Swiper
                    onActiveIndexChange={(e) => {
                        setCurrentIndex(e.activeIndex)
                    }}
                    spaceBetween={30} // Slide 之间的间距
                    slidesPerView={1} // 每次显示 1 个 Slide
                    loop={false} // 循环模式
                >
                    {
                        data.photos.map(item => {
                            return (
                                <SwiperSlide key={item.getURI()}>
                                    <img className="w-full" src={item.getURI()} alt="" />
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
            <div className="pl-4 pr-4 border-b-8 mt-[-30px] bg-white border-b-gray-100 rounded-tl-3xl rounded-tr-3xl z-10">
                <Place type={2} data={data} onRenderRoute={()=>{onClose&&onClose()}} />
            </div>
            <div className="pl-4 pr-4 pt-4 grow overflow-hidden  flex flex-col">
                <div className="text-gray-800 font-semibold">评论({data?.reviews?.length})</div>
                <div className="overflow-scroll grow">
                    {
                        data?.reviews?.map(item => {
                            return (
                                <Comments key={item.text} data={{
                                    displayName: item.authorAttribution.displayName,
                                    photoURI: item.authorAttribution.photoURI,
                                    text: item.text
                                }} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}