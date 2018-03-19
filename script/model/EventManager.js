function EventManager(parent) {
    this.parent=parent;
    this.events=[]
    
    this.addEvent=function(event) {
        this.events.push(event);
        this.events.sort(function(e1,e2){
            return e1.priority-e2.priority;
        });
    }
    
    this.dispatchEvent=function(eventType) {
        for(var i in this.events) {
            if(this.events[i].type===eventType) {
                this.events[i].dispatch(parent);
            }
        }
    }
}