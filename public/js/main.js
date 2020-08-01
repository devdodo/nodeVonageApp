const number = document.querySelector('#number');
const message = document.querySelector('#message');
const btnSubmit = document.querySelector('#btnSubmit');
const response = document.querySelector('#response');

// '+ data.number +'
const socket = io();
socket.on('smsStatus', (data) => {
    response.innerHTML = `<h5>Text message sent to: ${data.number} </h5>`;
})

btnSubmit.addEventListener('click', () => {
    const phoneNo = number.value;
    const txtMessage = message.value;

    const messageDetails = {
        number: phoneNo,
        text: txtMessage
    }

    fetch('/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(messageDetails)
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    });
});