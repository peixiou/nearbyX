import './index.css'
import imgDown from '../../assets/down.png'
import { useRef, useState } from 'react'


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
    const {onSearch}=props;
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(PLACETYPES[0])
    const [radius,setRadius]=useState('')
    const radiusRef = useRef()

    // 第一部分
    // 功能1，默认关掉下拉框，且默认选中第一个选项
    // 功能2，点击餐厅这个位置，打开下拉框，下拉框选中的选项要高亮
    // 功能3，选择选项，关掉下拉框，搜索类型变成选项里的值


    // 第二部分
    // 功能1、控制input框只能输数字，不是数字输入框无新的变化

    // 第三部分
    // 功能1、暴露一个onSearch事件，供调用方监听，在搜寻按钮被点击的时候触发
    // 功能2、处理好数据传递给监听者

    const handleOpenPanel = () => {
        setVisible(true)

    }

    const handleSelect = (item) => {
        setCurrent(item)
        setVisible(false)
    }

    const handleCheckNum = (e) => {
        const {value}=e.target;
        if(+value||value===''){
            setRadius(value)
        }
    }

    const handleSearch=()=>{
        onSearch&&onSearch({type:current.value,radius:parseInt(radius)})
    }
    return (
        <div className='search z-10 bg-white rounded-xl flex justify-center items-center shadow-outer'>
            <div onClick={handleOpenPanel}>{current.name}</div>
            <div className='ml-1'><img src={imgDown} alt="" srcset="" /></div>
            <div className='ml-2' style={{ color: '#c4c7ce' }}>|</div>
            <input
                ref={radiusRef}
                onChange={handleCheckNum}
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
                        PLACETYPES.map((item, index) => {
                            return (
                                <div
                                    onClick={() => { handleSelect(item) }}
                                    style={{ color: item.value === current.value ? '#9a53f4' : '#707479' }}
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
export default Search