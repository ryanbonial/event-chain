var EventChain = require('./EventChain');

const eventChain = new EventChain();

eventChain.AddEvent({
  eventType: "MOVIE_CREATED",
  data: {
    id: 1,
    title: 'Hackers',
    released: '1995',    
  },
  metaData: {
    createdBy: "Ryan",
    createdDate: "2020-03-24T10:16:29.356Z",
    previousHash: "0"
  },
});

eventChain.PrintChain();

console.log('EventChain is valid?', eventChain.EventChainValid());