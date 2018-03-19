function Event(type,func,priority) {
    this.priority=priority || Event.Priority.NEUTRAL;
    this.callback=func;
    this.type=type;
}

Event.prototype.dispatch=function(context) {
    this.callback.call(context);
}

Event.Priority = Object.freeze({
    HIGH:1,
    NEUTRAL:2,
    LOW:3
})
Event.Type=Object.freeze({
    EnterEvent:0,
    LeaveEvent:1
});