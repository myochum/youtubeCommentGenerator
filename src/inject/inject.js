//MAIN JS FOR CALCULATING UTILIZATION IN HARVEST//

//......................Calculations......................//

var sendMessage = function (){

    //......................Popup Message Send......................//
    chrome.runtime.sendMessage({ method: 'sendInfo', response: null});
}


//......................Main Functionality......................//

//Send initial message on page load.
sendMessage();
