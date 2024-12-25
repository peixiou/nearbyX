
import './index.css'
import imgDown from '../../assets/down.png'
import { useState } from 'react'
import EventBus from '../../utils/EventBus';
import EventEmitter from '../../utils/EventEmitter';

const PLACETYPES = [
    {
        name: '餐厅',
        value: 'restaurant'
    },
    {
        name: '商超',
        value: 'market'
    },
    {
        name: '加油站',
        value: 'gas_station'
    },
    {
        name: '咖啡',
        value: 'cafe'
    }
]

export default function Search(props) {
    const { onSearch = () => { } } = props;
    const [radius, setRadius] = useState('')
    const [current, setCurrent] = useState(PLACETYPES[0])

    const [visible, setVisible] = useState(false)

    const handleOptionClick = (placeType) => {
        setCurrent(placeType)
        setVisible(false)
    }

    const handleChange = (e) => {
        const { value } = e.target;

        if (+value || value === '') {
            setRadius(value)
        }


    }


    const hanldeClick = () => {
        EventEmitter.emit('search',{type:current.value,radius:parseInt(radius)})
        // onSearch({type:current.value,radius:parseInt(radius)})
    }

    return (
        <div className='search z-10 bg-white rounded-xl flex justify-center items-center shadow-outer'>
            <div onClick={() => { setVisible(true) }}>{current.name}</div>
            <div className='ml-1'><img src={imgDown} alt="" srcset="" /></div>
            <div className='ml-2' style={{ color: '#c4c7ce' }}>|</div>
            <input
                className='search-type w-40 ml-2'
                type="text"
                onChange={handleChange}
                value={radius}
                placeholder='請輸入搜尋距離（米）' />
            <div
                className='search-btn ml-5 w-16 h-8 text-center leading-8 rounded-3xl text-white' onClick={hanldeClick}>搜寻</div>
            {visible && <div className='search-select-more w-full h-44 absolute translate-y-32 rounded-xl bg-white'>
                {
                    PLACETYPES.map((item, index) => {
                        return (
                            <div
                                onClick={() => { handleOptionClick(item) }}
                                style={{ color: item.value === current.value ? '#9a53f4' : '#707479' }}
                                className='search-select-option ml-4 h-10 leading-10'>
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>}
        </div>
    )
}