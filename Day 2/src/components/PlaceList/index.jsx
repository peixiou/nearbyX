
import { useEffect, useState } from 'react'
import imgNoPlace from '../../assets/noplace.png'
import EventEmitter from '../../utils/EventEmitter'
import Place from '../Place'
import Detail from '../Detail'
export default function PlaceList() {


    const [visible, setVisible] = useState(false)
    const [detailVisible ,setDetailVisible]=useState(false)
    const [places, setPlaces] = useState([])
    const [place,setPlace]=useState()

    useEffect(() => {
        EventEmitter.on('nearbyPlaces', (data) => {
            if (data.length > 0) {
                setVisible(true)
                setPlaces(data)
            }
        })
        EventEmitter.on('renderRoute',()=>{
            setDetailVisible(false)
        })
    }, [])


    const handleClick=(place)=>{
        setDetailVisible(true)
        setPlace(place)
    }
    return (
        <>
            {visible && <div className="place-list">
                <div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center shadow-top overflow-scroll pt-4 pl-5 pr-5">
                    {
                        places.length > 0 ? places.map(item=><Place onClick={()=>{handleClick(item)}} data={item}></Place>):
                            <>
                                <img src={imgNoPlace} alt="" srcset="" />
                                <div className="text-[16px] text-gray-400 mt-4">無搜索結果</div>
                            </>
                    }
                </div>
               {detailVisible&& <Detail onClose={()=>{setDetailVisible(false)}} data={place}></Detail>}
            </div>}
        </>
    )
}