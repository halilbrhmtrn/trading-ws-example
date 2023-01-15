const io = require('socket.io')(http);
const ccxt = require ('ccxt');


const binance = new ccxt.binance();
const ws = new binance.websocket;

ws.on('message', (data) => {
    io.emit('priceUpdate', data);
});

ws.on('open', () => {
    ws.subscribe('ticker');
});

ws.on('close', () => {
});
