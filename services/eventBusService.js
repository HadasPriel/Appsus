function on(eventName, listener) {

    const callListener = ({ detail }) => {
        listener(detail);
    };
    window.addEventListener(eventName, callListener);

    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

function showBusMsg(currMsg) {
    eventBusService.emit('showMsg', currMsg)
    eventBusService.emit('display', '')
    setTimeout(() => {
        eventBusService.emit('showMsg', '')
        eventBusService.emit('display', 'none')
    }, 2000)
}


export const eventBusService = { on, emit, showBusMsg };

window.myBus = eventBusService;