# Streaming Data Messaging Protocol (SDMP)
SDMP is a simple protocol designed for implementing APIs on top of streaming communication protocols such as WebSockets or MQTT.

Here is what a raw SDMP message looks like:

```
SDMP 0.0

resource: users/738061236180
method: getAll
type: json

{"email":"foo@example.com"}
```

A SDMP message has three main components, version, headers, and body. Each part is separated by an additional line returns and each header is separated by 1 line return. For a complete example on parsing and strinfying SDMP messages see [SDMPMessage](./src/sdmp-message.js).

```
Version | SDMP 0.0\n
--------| \n
Headers | resource: users/738061236180\n
        | method: getAll\n
        | type: json\n
--------| \n
Body    | {"email":"foo@example.com"}
```

The first two sections are required to be considered a valid SDMP message. However, only the ```type``` header is needed.