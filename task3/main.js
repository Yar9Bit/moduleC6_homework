const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.btn-open');
const btnClose = document.querySelector('.btn-close');
const btnSend = document.querySelector('.btn-send');
const inputNode = document.querySelector('input')
const geoPosNode = document.querySelector('.btn-geo')
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    output.append(pre);
}

btnOpen.addEventListener('click', () => {
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(evt) {
        writeToScreen("Подключено");
    };
    websocket.onclose = function(evt) {
        writeToScreen("Отлючено");
    };
    websocket.onmessage = function(evt) {
        writeToScreen(
            '<span style="color: blue;">Сервер: ' + evt.data+'</span>'
        );
    };
    websocket.onerror = function(evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
});

btnClose.addEventListener('click', () => {
    websocket.close();
    websocket = null;
});

btnSend.addEventListener('click', () => {
    const message = inputNode.value;
    writeToScreen("Отправитель: " + message);
    websocket.send(message);
});

const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ссылка на карту';
}

geoPosNode.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Разрешите браузеру получать информацию о вашем местоположении';
    } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});