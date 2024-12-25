class EventEmitter{


    events={ }

    on(eventName,callback){
        if(this.events[eventName]){
            this.events[eventName].push(callback)
        }else{
            this.events[eventName]=[]
            this.events[eventName].push(callback)
        }
    }

    emit(eventName,data){
        if(this.events[eventName]){
            this.events[eventName].forEach(callback => {
                callback(data)
            });
        }
    }
}


export default new EventEmitter()