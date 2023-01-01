const socket = io('http://localhost:8000')

//Get DOM elements in respective Js variables
const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
let messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3'); // audio will play at the time of receive message

// function which will append event info to the container
const append = (message,position)=>{
    let messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
         audio.play();
    }
} 

// Ask name of new user and inform to server
const name = prompt("Enter Name")
socket.emit('new-user-joined', name);

// if new user join, inform to server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right')
})

//if server send message, receive it
socket.on('receive', data=>{
    append(`${data.name}:${data.message}`,'left')
})

// if user leaves the chat, append the info
socket.on('left', name=>{
    append(`${name} left the chat`,'right')
})

// if the form get submited, send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ''
})
