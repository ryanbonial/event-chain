# 🕰️⛓️ Event Chain ⛓️🕰️

Event Chain is a JS library for storing sequential events and validating them using a hash.

## Usage

### Create an Event Chain
```js
var EventChain = require('./EventChain');
const eventChain = new EventChain();
```

### Add events
```js
eventChain.AddEvent("MOVIE_CREATE", { id: 1, title: 'Hackers', released: '1995' });

eventChain.AddEvent("MOVIE_UPDATE_RATING", { id: 1, mpaaRating: 'PG-13' });
```

### Example Event Chain
```json
[
  {
     "eventType": "MOVIE_CREATE",
     "data": {
        "id": 1,
        "title": "Hackers",
        "released": "1995"
     },
     "metaData": {
        "createdBy": "Ryan",
        "createdDate": "2020-03-25T20:44:19.556Z",
        "previousHash": "0"
     },
     "id": "208a6a89-0ea5-435c-8a75-cffcb06f0101",
     "hash": "043sZA57xXKoJPC6vyMSk1DA9Uyv07kvqxeqATWIR1Q="
  },
  {
     "eventType": "MOVIE_UPDATE_RATING",
     "data": {
        "id": 1,
        "mpaaRating": "PG-13"
     },
     "metaData": {
        "createdBy": "Ryan",
        "createdDate": "2020-03-25T20:44:19.568Z",
        "previousHash": "043sZA57xXKoJPC6vyMSk1DA9Uyv07kvqxeqATWIR1Q="
     },
     "id": "edbf81c3-d135-4098-8e78-57a2267148e0",
     "hash": "B3GCqf1W7PTOv00IaJL6mDHtkI0BJdm6uKtse+E8al8="
  }
]
```

### Get an object projection
```js
eventChain.GetProjection('MOVIE', 1) // { id: 1, title: 'Hackers', released: '1995', mpaaRating: 'PG-13' }
```

## More on Event Sourcing
Martin Fowler - https://martinfowler.com/eaaDev/EventSourcing.html

GOTO 2014 • Event Sourcing • Greg Young - https://www.youtube.com/watch?v=8JKjvY4etTY
