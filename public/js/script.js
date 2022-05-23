const socket = io('http://localhost:3000');
const messageContainer = document.querySelector('.message-area');
const messageForm = document.querySelector('#send-container');
const messageInput = document.querySelector('#messageInput');
const chatRoomBtn = document.querySelector('.chat-room')
const blur = document.querySelector('.msger')
let accessBtn
try{
   accessBtn = document.querySelector('#accessReq')
   accessBtn.addEventListener('click',()=>{
   socket.emit('accessReq',{productSeller})})
}catch(e){}
const webLoad = performance.getEntriesByType("navigation")[0].type
socket.on('chat-message', (data) => {

  grpMessage(`${data.name}`, `${data.message}`);
});
socket.on('User-Connected', (name) => {
  if(name.webLoad!='reload'){

    grpMessage(`${name.currentUser}`, `has joined the chat`);
  }
});

let sendData = { currentUser, roomName,webLoad };
chatRoomBtn.addEventListener('click',()=>{
  msger.style.filter = 'none'
  msger.style.height = '500px'
  chatRoomBtn.style.display = 'none'
  chatRoomBtn.style.transform = 'translateX(100000px)'
  socket.emit('new-user', sendData);
  appendMessage(`Joined the Chat`);
  if(sendEmail === 'true'){
    botMessage('I have sent an email to the Seller informing that you r waiting in the chatRoom.He might get here soon👌🙌')
  }else{
  botMessage('Seller has turned off email Notifications.You might wanna try a bit later if he is not online.')
  }
})
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message != '') {
    const data = { message, roomName };
    appendMessage(`${message}`);
    socket.emit('send-chat-message', data);
  }
  messageInput.value = '';
});
function appendMessage(message) {
  const myMsg = document.createElement('div');
  myMsg.classList.add('right-msg');
  myMsg.classList.add('msg');
  const msgImg = document.createElement('div');
  msgImg.classList.add('msg-img');
  const messageElement = document.createElement('div');
  messageElement.classList.add('msg-bubble');

  const messageInfo = document.createElement('div');
  messageInfo.classList.add('msg-info');
  const messageName = document.createElement('div');
  messageName.classList.add('msg-info-name');
  const messageText = document.createElement('div');
  messageText.classList.add('msg-text');
  messageName.innerText = currentUser;
  messageText.innerText = message;
  messageInfo.append(messageName);
  messageElement.append(messageInfo);
  messageElement.append(messageText);
  myMsg.append(msgImg);
  myMsg.append(messageElement);
  messageContainer.append(myMsg);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
function grpMessage(user, message) {
  const myMsg = document.createElement('div');
  myMsg.classList.add('left-msg');
  myMsg.classList.add('msg');
  const msgImg = document.createElement('div');
  msgImg.classList.add('msg-img');
  const messageElement = document.createElement('div');
  messageElement.classList.add('msg-bubble');

  const messageInfo = document.createElement('div');
  messageInfo.classList.add('msg-info');
  const messageName = document.createElement('div');
  messageName.classList.add('msg-info-name');
  const messageText = document.createElement('div');
  messageText.classList.add('msg-text');
  messageName.innerText = user;
  messageText.innerText = message;
  messageInfo.append(messageName);
  messageElement.append(messageInfo);
  messageElement.append(messageText);
  myMsg.append(msgImg);
  myMsg.append(messageElement);
  messageContainer.append(myMsg);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
function botMessage(message) {
  const myMsg = document.createElement('div');
  myMsg.classList.add('left-msg');
  myMsg.classList.add('msg');
  const msgImg = document.createElement('div');
  msgImg.classList.add('msg-img');
  msgImg.classList.add('roboImg');
  const messageElement = document.createElement('div');
  messageElement.classList.add('msg-bubble');

  const messageInfo = document.createElement('div');
  messageInfo.classList.add('msg-info');
  const messageName = document.createElement('div');
  messageName.classList.add('msg-info-name');
  const messageText = document.createElement('div');
  messageText.classList.add('msg-text');
  messageName.innerText = 'BOT';
  messageText.innerText = message;
  messageInfo.append(messageName);
  messageElement.append(messageInfo);
  messageElement.append(messageText);
  myMsg.append(msgImg);
  myMsg.append(messageElement);
  messageContainer.append(myMsg);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
