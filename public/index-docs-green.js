import MessageService from '../src/index'

const Service1 = new MessageService("SG1")
Service1.init((message) => {
  const li = document.createElement("li");
  const liContent = document.createTextNode(`${message.type} - ${message.payload}`);
  li.appendChild(liContent);
  document.getElementById('listG1').appendChild(li)
})
window.sendG1 = () => Service1.sendMessage({
  type: document.getElementById('typeG1').value,
  payload: document.getElementById('payloadG1').value
})