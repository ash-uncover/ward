# js-utils-microfrontend

[![npm version](https://badge.fury.io/js/@uncover%2Fjs-utils-microfrontend.svg)](https://badge.fury.io/js/@uncover%2Fjs-utils-microfrontend)
![Last Push](https://github.com/ash-uncover/js-utils-microfrontend/actions/workflows/publish-npm.yml/badge.svg)

js-utils-microfrontend is a small JavaScript library providing tools to ease microfrontend development regardless of the chosen frameworks.

It provides seamless communication between existing frames by sending standardized messages.

### Concept

*TBD*

### Usage
#### Installation

```
npm add @uncover/js-utils-microfrontend
```

#### Starting the dispatcher

Once in each frame, start the message dispatcher.

```
import MessageDispatcher from '@uncover/js-utils-microfrontend'

MessageDispatcher.start()
```

#### Using message services

Create new **MessageService** instances and initialize them with a callback. This callback will be called everytime another service emits a message.

```
import {
  Message,
  MessageService,
} from '@uncover/js-utils-microfrontend'

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