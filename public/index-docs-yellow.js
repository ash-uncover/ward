import MessageService from '../src/index'

const Service1 = new MessageService("SY1")
Service1.init((message) => {
  const li = document.createElement("li");
  const liContent = document.createTextNode(`${message.type} - ${message.payload}`);
  li.appendChild(liContent);
  document.getElementById('listY1').appendChild(li)
})
window.sendY1 = () => Service1.sendMessage({
  type: document.getElementById('typeY1').value,
  payload: document.getElementById('payloadY1').value
})