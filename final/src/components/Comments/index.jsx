

export default function Comments(props){
    const {data}=props;
    const {displayName,photoURI,text}=data;
    return (
        <div className="flex items-start mt-5">
            <div className="flex-shrink-0"><img className="w-[40px] h-[40px]" src={photoURI} alt="" /></div>
            <div className="ml-3">
                <div className="text-[15px] font-medium">{displayName}</div>
                <div className="text-xs text-gray-500">{text||'啥也没说~'}</div>
            </div>
        </div>
    )
}