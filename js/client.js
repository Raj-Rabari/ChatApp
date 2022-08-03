const socket = io('http://localhost:8000',{ transports : ['websocket'] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginp');
const messageContainer = document.querySelector('.container');
const loginForm = document.getElementById('loginform');
const name = document.getElementById('name');
const loginBtn = document.getElementById('loginbtn');

/* loginForm.addEventListener('login',(e)=>{
    const usrname = name.value;
    socket.emit('new-user-joined',usrname);
    document.querySelector('.login-container').style.display='none';
    form.style.display='block';
}); */

function login(){
    const usrname = name.value;
    socket.emit('new-user-joined',usrname);
    document.querySelector('.login-container').style.display='none';
    form.style.display='block';
}

const appendit = (msg,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
/* const name = prompt('enter your name to join');
socket.emit('new-user-joined',name); */

socket.on('user-joined',name=>{
    appendit(`${name} joined the chat`,'right');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    var encrypted = CryptoJS.AES.encrypt(message, "raj").toString();
    console.log(`encrypted message is ${encrypted}`);
    appendit(`You: ${message}`,'right');
    socket.emit('send',encrypted);
    messageInput.value='';
})

socket.on('receive',(data)=>{
    //   console.log(base64Decode);
    const str = data.message;
    var decrypted = CryptoJS.AES.decrypt(str, "raj");
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(`decrypted message is ${plaintext}`);
    appendit(`${data.name}: ${plaintext}`,'left');
});



socket.on('left',name=>{
    appendit(`${name} left the chat`,'left');
})