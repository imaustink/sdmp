# Streaming Application Programming Interface (SAPI)
SAPI is a simple protocol designed for real-time APIs built on WebSockets.

Here is what a SAPI message looks like:
```
SAPI 0.0

resource: users/738061236180
method: updateEmail
type: json

{"email":"foo@example.com"}
```

A SAPI message has three main components, version, headers, and body. Each part is separated by 2 line returns and each header is separated by 1 line return. Here is a basic regex for parsing a SAPI message ```(.+)\s\s([\s\S]+)\s\s([\s\S]+)```.
