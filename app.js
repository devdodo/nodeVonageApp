const express = require('express');
const ejs = require('ejs');
const socketio = require('socket.io');
const Nexmo = require('nexmo');

const app = express();

const nexmo = new Nexmo({
    apiKey: 'ab02f5e0',
    apiSecret: 'XTCCb1Pu2TSZWFv1',
  });

// Set Ejs engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Body parser middleware
app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    res.send(req.body);

    const number = req.body.number;
    const message = req.body.text;

    const from = 'Dodo\'s App';
    const to = number;
    const text = message;

    nexmo.message.sendSms(from, to, text,{ type: 'unicode'},(err, responseData) => {
        if(err){
            console.log(err);
        }else{
            // Get data from response
            const data = {
                number: responseData.messages[0]['to']
            }
            console.log('message sent...');

            // Emit data to the client
            io.emit('smsStatus', data)
        }
    });

});

PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('Connected');
    io.on('disconnect', () => {
        console.log('Disconnected');
    })
})