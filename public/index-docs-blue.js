import MessageService from '../src/index'

const Service1 = new MessageService("SB1")
Service1.init((message) => {
  const li = document.createElement("li");
  const liContent = document.createTextNode(`${message.type} - ${message.payload}`);
  li.appendChild(liContent);
  document.getElementById('listB1').appendChild(li)
})
window.sendB1 = () => Service1.sendMessage({
  type: document.getElementById('typeB1').value,
  payload: document.getElementById('payloadB1').value
})

const Service2 = new MessageService("SB2")
Service2.init((message) => {
  const li = document.createElement("li");
  const liContent = document.createTextNode(`${message.type} - ${message.payload}`);
  li.appendChild(liContent);
  document.getElementById('listB2').appendChild(li)
})
window.sendB2 = () => Service2.sendMessage({
  type: document.getElementById('typeB2').value,
  payload: document.getElementById('payloadB2').value
})