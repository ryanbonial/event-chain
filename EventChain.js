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

  EventChainValid() {
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

  AddEvent(event) {
    const newEvent = { eventType: event.eventType, data: event.data, metaData: event.metaData }
    const newHash = this.MakeHash(newEvent);
    const newEventId = uuidv4();
    this.eventChain.push({...newEvent, id: newEventId, hash: newHash });
  }

  PrintChain() {
    console.log(JSON.stringify(this.eventChain, null, 3))
  }
}

module.exports = EventChain;