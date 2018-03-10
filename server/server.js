var gcm = require('../node_modules/node-gcm/lib/node-gcm');

var message = new gcm.Message();

message.addData('additionalData', 'http://google.com');
message.addData('title', 'Push Notification');
///message.addNotification('icon-36', 'icon-36');
message.addData('image', 'https://i.ytimg.com/vi/PCwL3-hkKrg/maxresdefault.jpg');
message.addData('image-type', 'picture');
message.addData('message', 'this is sample notification');
message.addData('badge', '7');
 badge: 7


//Add your mobile device registration tokens here
var regTokens = ['fxJ3zp2Ccbc:APA91bHxUKIiqamzTL0SM24Vw6SSI2aUoI0UGOZC2nk02uxQ8wULlz7LRxUkT5-GM8bySb-qgtKn9tUkBlWsqpwep8qFZsNUfQjhHGTftimqiP7UgL5HjbxjCOGTxeUdW9jEJscwTzHP'];
//Replace your developer API key with GCM enabled here
var sender = new gcm.Sender('AIzaSyC6d3uw7cY3D5AnN9mXOhBHtwVm1zHBSWs');

sender.send(message, regTokens, function (err, response) {
    if(err) {
      console.error(err);
    } else {
      console.log(response);
      console.log(message)
    }
});