import { useEffect, useState } from "react"
import EventBus from "../../utils/EventBus"
import Place from "../Place"
import PlaceDetail from "../PlaceDetail"
import imgNoPlace from '../../assets/noplace.png'


export default function PlaceList() {
    const [places, setPlaces] = useState([])
    const [visible,setVisible]=useState(false)
    const [placeDetail,setPlaceDetail]=useState(null)
    useEffect(() => {
        EventBus.on('placesChange', ({ places }) => {
            setPlaces(places)
        })
    }, [])

    const handleOpenDetail=(place)=>{
        setVisible(true)
        setPlaceDetail(place)
    }
    const handleClose=()=>{
        setVisible(false)
    }

    return (
        <div className="place-list">
            <div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center shadow-top overflow-scroll pt-4 pl-5 pr-5">
                {
                    places.length > 0 ? places.map(item => {
                        return (
                            <Place  key={item.id} data={item} onClick={handleOpenDetail}></Place>
                        )
                    }) : <>
                        <img src={imgNoPlace} alt="" srcset="" />
                        <div className="text-[16px] text-gray-400 mt-4">無搜索結果</div>
                    </>
                }
            </div>
           {visible&& <PlaceDetail onClose={handleClose} data={placeDetail} />}
        </div>
    )
}