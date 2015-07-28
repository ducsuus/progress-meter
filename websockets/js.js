// WebSocket Testing Javascript

var viewcode = 'j2YZ';

/* Websockets */
var address = 'ws://yrs.ducsuus.com:8897/test/' + viewcode;

// Create a new websocket connection
var connection = new WebSocket(address);

function getPropertyFromMessage(message, property){
  var index = message.indexOf(property);
  if (index >= 0){
    index += property.length + 1;
    var property_result = ''
    while (message[index] != ';'){
      if(index >= message.length){
        return false;
      }
      property_result += message[index]
      index += 1;
    }
    return property_result;
  }
}

// When the connection is open, send some data to the server
connection.onopen = function () {
  console.log('Websocket opened!');
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
  var stage = getPropertyFromMessage(e.data, 'stage');

  if (stage){
    console.log(stage);
  }
};