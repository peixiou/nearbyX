import './index.css'
import imgScreenBuilding from '../../assets/screen_building.png'

function OpenScreen(props){
    const {onClick}=props;

    const handleClick = () => {
        onClick&&onClick();
    }
    return (
        <div className='open-screen fixed w-full z-20 flex flex-col items-center  h-full bg-origin-padding overflow-hidden'>
            <img className='mt-36 ' src={imgScreenBuilding} alt="" />
            <div className='app-name text-white'>nearbyX</div>
            <div className='begin text-center border text-white mt-7' onClick={handleClick} >开始使用</div>
        </div>
    )
}

export default OpenScreen