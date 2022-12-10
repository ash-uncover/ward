import MessageService from '../src/index'
console.log('toto')

const Service1 = new MessageService("S1")
Service1.init((message) => {
  const li = document.createElement("li");
  const liContent = document.createTextNode(`${message.type} - ${message.payload}`);
  li.appendChild(liContent);
  document.getElementById('list1').appendChild(li)
})
window.send1 = () => Service1.sendMessage({
  type: document.getElementById('type1').value,
  payload: document.getElementById('payload1').value
})

const Service2 = new MessageService("S2")
Service2.init((message) => {
  const li = document.createElement("li");
  const liContent = document.createTextNode(`${message.type} - ${message.payload}`);
  li.appendChild(liContent);
  document.getElementById('list2').appendChild(li)
})
window.send2 = () => Service2.sendMessage({
  type: document.getElementById('type2').value,
  payload: document.getElementById('payload2').value
})