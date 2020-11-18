$(function () {
    class Event {
        constructor() {
            this.events = {};
        }
        
        on(name, callBack) {
            if (this.events[name] !== undefined) {
                this.events[name].push(callBack);
            } else {
                this.events[name] = [];
                this.events[name].push(callBack);
            }
            
            return this;
        }
        
        emit(name, ...args) {
            if (this.events[name] !== undefined) {
                let listeners = this.events[name];
                for (let i = 0; i < listeners.length; i++) {
                    listeners[i](...args);
                }
            }
            
            return this;
        }
    }
    
    namespace['func']['Event'] = Event;
    namespace['o']['ee'] = new Event();
})
