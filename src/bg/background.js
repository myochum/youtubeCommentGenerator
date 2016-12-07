var info;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.method == 'sendInfo')
    info = message.response;
  else if(message.method == 'getInfo')
    sendResponse(info);
});