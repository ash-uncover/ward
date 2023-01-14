# ward

[![npm version](https://badge.fury.io/js/@uncover%2Fward.svg)](https://badge.fury.io/js/@uncover%2Fward)
![Last Push](https://github.com/ash-uncover/ward/actions/workflows/publish-npm.yml/badge.svg)

Ward is a small JavaScript library providing tools to ease microfrontend development regardless of the chosen frameworks.

It provides seamless communication between existing frames by sending standardized messages.

### Concept

*TBD*

### Usage
#### Installation

```
npm add @uncover/ward
```

#### Starting the dispatcher

Once in each frame, start the message dispatcher.

```
import MessageDispatcher from '@uncover/ward'

MessageDispatcher.start()
```

#### Using message services

Create new **MessageService** instances and initialize them with a callback. This callback will be called everytime another service emits a message.

```
import {
  Message,
  MessageService,
} from '@uncover/ward'

const myService = new MessageService()
myService.init((message: Message) => console.log(message))
```

Send messages respecting the **Message** interface:
- type: string
- payload: any

```
const message: Message = {
  type: 'ActionType',
  payload: { data: 'ActionPayload' }
}
myService.sendMessage(message)
```