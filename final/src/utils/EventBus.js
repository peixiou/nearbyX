export default {
    emit:function(eventName,data){
        const newEvent=new CustomEvent(eventName,{detail:data});
        window.dispatchEvent(newEvent)
    },
    on:function(eventName,callback){
        window.addEventListener(eventName,(e)=>{callback(e.detail)})
    }
}