var EventChain = require('./EventChain');

const eventChain = new EventChain();

eventChain.AddEvent("MOVIE_CREATE", { id: 1, title: 'Hackers', released: '1995' });

eventChain.PrintChain();

eventChain.AddEvent("MOVIE_UPDATE_RATING", { id: 1, mpaaRating: 'PG' });

eventChain.AddEvent("MOVIE_UPDATE_RATING", { id: 1, mpaaRating: 'PG-13' });

eventChain.PrintChain();

console.log('EventChain is valid?', eventChain.isValid());

console.log(eventChain.GetProjection('MOVIE', 1));