
import './index.css'

import imgRatingStar from '../../assets/rating_star.png'
import imgDistance from '../../assets/distance.png'
import EventEmitter from '../../utils/EventEmitter';

export default function Place(props) {
    const { data, type = 1, onClick = () => { } } = props;

    const countDistance = () => {
        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(data.location, window.userLocation)
        if (distance > 999) {
            distance = (distance / 1000).toFixed(2) + 'km'
        } else {
            distance = Math.round(distance) + 'm'
        }
        return distance;
    }

    const handleRenderRoute = () => {
        EventEmitter.emit('renderRoute', data.location)
    }

    return (
        <>
            {
                data && <div
                    className={"place flex justify-between items-center mt-3 pb-3 border-b-2 border-gray-50 w-full"}>
                    {type === 1 && <div className="preview">
                        <img className="place-photo" src={data.photos[0]?.getURI()} alt="" srcset="" />
                    </div>}

                    <div
                        onClick={onClick}
                        className="info w-[168px]">
                            
                        <div className="text-[16px] text-gray-700 font-semibold">{data.displayName}</div>
                        <div className="truncate text-xs text-gray-600 mt-1">{data.formattedAddress}</div>
                        <div className="flex mt-1 justify-start">
                            <div className="w-10 h-5 leading-5 text-center rounded text-[10px] font-normal bg-green-100 text-green-500">{data.businessStatus === 'OPERATIONAL' ? '营业中' : '暂停营业'}</div>
                            <div className="h-5 leading-5 flex items-center ml-2 text-[10px] text-gray-400">
                                <img className="w-[14px] h-[14px]" src={imgRatingStar} alt="" srcset="" />
                                <div className="ml-1">{data.rating}</div></div>

                        </div>
                    </div>
                    <div className="position w-[37px] text-center">
                        <img onClick={handleRenderRoute} src={imgDistance} alt="" srcset="" />
                        <div className="text-xs text-gray-600 mt-1">{countDistance()}</div>
                    </div>
                </div>
            }
        </>
    )
}