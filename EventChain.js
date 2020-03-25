var crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

class EventChain {
  eventChain = [];

  MakeHash(eventObject) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(eventObject))
      .digest('base64');  
  }

  VerifyHash(eventObject, expectedHashValue) {    
    return this.MakeHash(eventObject) === expectedHashValue;  
  }

  isValid() {
    let eventChainIsValid = true;
    
    // Verify hash validity for each event
    for (const event of this.eventChain) {
      const reconstructedEvent = { eventType: event.eventType, data: event.data, metaData: event.metaData };       
      if (eventChainIsValid && !this.VerifyHash(reconstructedEvent, event.hash)) {
        eventChainIsValid = false;
        console.warn('Invalid event found', event);
        console.warn(`Expected to have hash ${this.MakeHash(reconstructedEvent)}, but it was ${event.hash}`);
      }
    };
  
    // Verify hash chain is in the correct order and none are missing
    let expectedPreviousHash = '0';
    this.eventChain.forEach(event => {
      if (eventChainIsValid && event.metaData.previousHash !== expectedPreviousHash) {
        eventChainIsValid = false;
        console.warn('Invalid event chain found', event);
        console.warn(`Expected previous hash to be ${expectedPreviousHash}`);
      }
      expectedPreviousHash = event.hash;
    });
  
    return eventChainIsValid;
  }

  AddEvent(eventType, data) {
    const rightNow = new Date();
    const timeStamp = rightNow.toISOString();
    const metaData = {
      createdBy: "Ryan",
      createdDate: timeStamp,
      previousHash: this.eventChain.length === 0 ? "0" : [...this.eventChain].pop().hash
    };

    const newEvent = { eventType, data, metaData };
    const newHash = this.MakeHash(newEvent);
    const newEventId = uuidv4();
    this.eventChain.push({...newEvent, id: newEventId, hash: newHash });
  }

  // Default projection. Allow custom projection functions in the future?
  // Relies on the event type to be in the expected format of ENTITYTYPE_ACTION
  GetProjection(entityType, id) {    
    const eventsForId = this.eventChain.filter(event => event.data.id === id && event.eventType.split('_')[0] === entityType);    
    return eventsForId.reduce((summation, event) => ({ ...summation, ...event.data }), {});         
  }

  PrintChain() {
    console.log(JSON.stringify(this.eventChain, null, 3))
  }
}

module.exports = EventChain;