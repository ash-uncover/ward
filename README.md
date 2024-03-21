# ward

[![npm version](https://badge.fury.io/js/@uncover%2Fward.svg)](https://badge.fury.io/js/@uncover%2Fward)
![Last Push](https://github.com/ash-uncover/ward/actions/workflows/publish-npm.yml/badge.svg)

**Ward** is a small JavaScript library providing tools to ease microfrontend development regardless of the chosen frameworks.


## Concept

**Ward** provides seamless communication between existing frames by sending standardized messages coupled with dynamic plugin discovery mecanism.

## API

### Ward

| Function   | Arguments    | Description |
| ---------- | ------------ | ----------- |
| ***Features*** |
| addService | id?: string | Creates a new service that will listen to incoming messages. |
| loadPlugin | url?: string | ... |
| reset      | | Drop all services and plugins (should not be called). |
| ***Inspection*** |
| register   | | ... |
| unregister | | ... |
| notify     | | ... |


### Service

***Service*** objects are the basic communication entities in **Ward**. You can instanciate as many ***Service*** objects as needed in any layer of your application.

***Service*** objects provide the ability to send a message that will be received by **all other** existing services in your execution environment, including the ones created in sub frames or parent frame.

| Function      | Arguments | Description |
| ------------- | --------- | ----------- |
| addHandler    | ***fn***: *(message: { type: string, payload: any }) => void* | Add a handler to be called each time a message is received. |
| removeHandler | ***fn***: *(message: { type: string, payload: any }) => void* | Removes a previously added handler. |
| sendMessage   | ***message***: *{ type: string, payload: any }* | Sends a message to all other services. |
| onMessage     | message: *{ type: string, payload: any }* | Sends a message to this service. |
| terminate     | _ | Prevent the service from receiving any further messages (can not be recycled) |

## Usage
### Installation

```
npm add @uncover/ward
```

### Using Message Services

#### Example

##### Example #1: handlers

The following example creates a service that will log all messages sent to the **Ward** event bus.

```js
import Ward from '@uncover/ward'

function messageLog(message) {
  console.log(`received message ${message.type}:`)
  console.log(JSON.stringify(message.payload))
}

// Create the service (with optionnal id)
const service = Ward.addService('my-service')

// Add a handler (will be called for each received message)
service.addHandler(messageLog)

// Remove a handler (stop calling it on message received)
service.removeHandler(messageLog)

// Terminate the service (stops receiving messages, service should be dropped)
service.terminate()
```

##### Example #2: sending messages

The following example creates a service and sends a message to the **Ward** event bus. The message will be dispatched to all other existing services.

```js
import Ward from '@uncover/ward'

// Create the service (with optionnal id)
const service = Ward.addService('my-service')

// Send a message that will be received by all other services
service.sendMesage({
  type: 'my-message-type',
  payload: {
    data: 'myData',
    otherData: 'otherData'
  }
})

// Terminate the service (stops receiving messages, service should be dropped)
service.terminate()
```

##### Example #3: sending messages to handlers

Allthough considered a bad pattern, in some scenarios you might want to send a message to the handlers of your service.
You can do it by simulating a message reception by the service.

```js
import Ward from '@uncover/ward'

// Create the service (with optionnal id)
const service = Ward.addService('my-service')

// Send a message that will be received by all handlers of this service
service.onMesage({
  type: 'my-message-type',
  payload: {
    data: 'myData',
    otherData: 'otherData'
  }
})

// Terminate the service (stops receiving messages, service should be dropped)
service.terminate()
```