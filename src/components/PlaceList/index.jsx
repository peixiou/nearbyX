import { useEffect, useState } from "react"
import Place from "../Place"
import imgNoPlace from '../../assets/noplace.png'
import EventEmitter from "../../utils/EventEmitter"
import PlaceDetail from "../PlaceDetail"

export default function PlaceList() {

    const [placeList, setPlaceList] = useState([])
    const [visible, setVisible] = useState(false)
    const [detailVisible, setDetailVisible] = useState(false)
    const [detailData, setDetailData] = useState({})

    useEffect(() => {
        EventEmitter.on('placesChange', (list) => {
            setPlaceList(list)
            setVisible(true)
        })
    }, [])


    const openDetail = (data) => {
        setDetailVisible(true)
        setDetailData(data)
    }
    return (

        <>

            {
                visible && <div className="place-list">
                    <div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center shadow-top overflow-scroll pt-4 pl-5 pr-5">
                        {
                            placeList.length > 0 ? placeList.map(item => {
                                return (<Place onClick={() => {
                                    openDetail(item)
                                }} data={item} />)
                            }) :
                                <>
                                    <img src={imgNoPlace} alt="" srcset="" />
                                    <div className="text-[16px] text-gray-400 mt-4">無搜索結果</div>
                                </>
                        }

                    </div>
                    {detailVisible && <PlaceDetail data={detailData} onClose={() => {
                        setDetailVisible(false)
                    }}></PlaceDetail>}
                </div>

            }
        </>


    )
}