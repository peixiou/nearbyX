import { useState } from "react";
import imgDown from '../../assets/down.png'
import './index.css'


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

function Search(props) {
    const {onSearch=()=>{}}=props;
    const [current,setCurrent]=useState(PLACETYPES[0])
    const [visible, setVisible] = useState(false)
    const [radius, setRadius] = useState('')


    const handleOpenOptions = () => {
        setVisible(!visible)
    }


    const handleSelectOption = (place) => {
        setCurrent(place)
        setVisible(false)
    }

    const handleInputChange = (e) => {
        const {value}=e.target;
        if(+value){
            setRadius(value)
        }
    }

    const handleSearch = () => {
      onSearch({type:current.value,radius:radius})
    }

    return (

        <div className='search z-10 bg-white rounded-xl flex justify-center items-center shadow-outer'>
            <div onClick={handleOpenOptions}>{current.name}</div>
            <div className='ml-1'><img src={imgDown} alt="" srcset="" /></div>
            <div className='ml-2' style={{ color: '#c4c7ce' }}>|</div>
            <input
                onChange={handleInputChange}
                className='search-type w-40 ml-2'
                type="text"
                value={radius}
                placeholder='請輸入搜尋距離（米）' />
            <div
                onClick={handleSearch}
                className='search-btn ml-5 w-16 h-8 text-center leading-8 rounded-3xl text-white'>搜寻</div>

            {
                visible && <div className='search-select-more w-full h-44 absolute translate-y-32 rounded-xl bg-white'>

                   {
                    PLACETYPES.map((item,index)=>{
                        return (
                            <div
                            onClick={()=>{handleSelectOption(item)}}
                            style={{color:current.value===item.value?'#9a53f4':'#707479' }}
                            className='search-select-option ml-4 h-10 leading-10'
                        >
                            {item.name}
                        </div>
                        )
                    })
                   }


                </div>
            }
        </div>
    )
}



export default Search;