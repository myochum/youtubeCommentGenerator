//MAIN JS FOR CALCULATING UTILIZATION IN HARVEST//


//......................Constant utilization hours......................//

var weeklyTotalHours = 40;
var billableTotalHours = 28;


//......................Helper Functions......................//

//Function to add up hours given time nodes. Returns a total time object with hours and minutes.
var addTimes = function(allTimes) {
    var total = { hours: 0, minutes: 0 };
    for (var i = 0; i < allTimes.length; i++) {
        var time = allTimes[i].innerHTML;
        //Don't account for null times.
        if (time !== '0') {
            var sepTime = time.split(':');
            total.hours += parseInt(sepTime[0]);
            total.minutes += parseInt(sepTime[1]);
            //Add in extra hours and minutes if minutes total is over an hour
            if (total.minutes >= 60) {
                total.hours += Math.floor(total.minutes / 60);
                total.minutes = total.minutes % 60;
            }
        }
    }
    return total;
};

//Function to round the hours to nearest whole hour.
var roundedHours = function(total) {
    if (total.minutes >= 30) {
        return total.hours + 1;
    } else {
        return total.hours;
    }
};


//......................Calculations......................//

var sendMessage = function (){
    //Harvest loads in every week as a new div and doesn't remove the old data.
    //Get the current displayed week.
    var currentView = $('div.js-harvest-current-view');
    if (!currentView) {
        return;
    }

    //Current total harvest hours of user.
    var currentTotalTimeNode = $('tfoot td.total', currentView)[0]
    if (!currentTotalTimeNode) {
        return;
    }
    var currentTotalTime = currentTotalTimeNode.innerHTML && currentTotalTimeNode.innerHTML.split(':');

    var currentTotalTimeObj = {hours: parseInt(currentTotalTime[0]), minutes: parseInt(currentTotalTime[1])};
    var currentWeeklyHours = roundedHours(currentTotalTimeObj);

    //Calculate current billable hours - ROUND DOWN
    var billableTimeNodes = $('tr.week-view-entry:not(:contains("(Monetate)")) td.total', currentView);
    if (!billableTimeNodes) {
        return;
    }
    var billableTimeTotal = addTimes(billableTimeNodes);
    var currentBillableHours = billableTimeTotal.hours;

    //Calculate current utilization percentage (Based off of 70% goal). Set to zero if no hours.
    var currentUtilization = currentBillableHours && currentWeeklyHours ? 
    		Math.round((currentBillableHours / currentWeeklyHours) * 100) : 0;

    //Calculate how many more billable hours until goal of 28 hours per week.
    //If already reached, just report 0 hours.        
    var hoursTilGoal = billableTotalHours - currentBillableHours;
    if (hoursTilGoal < 0) {
        hoursTilGoal = 0;
    }

    var responseObj = {
    	'totalHours': currentWeeklyHours,
    	'billableHours' : currentBillableHours,
    	'utilization' : currentUtilization,
    	'hoursTilGoal' : hoursTilGoal
    };

    //......................Popup Message Send......................//
    chrome.runtime.sendMessage({ method: 'sendInfo', response: responseObj});
}


//......................Main Functionality......................//

//Send initial message on page load.
sendMessage();

//Use Mutation Observer to watch for a new week of data loaded in.
var mutation = window.MutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
    //Wait for the load in, grab the new data, and send to the popup.
    setTimeout(sendMessage, 2000);
});

//The wrapper for all of the weekly harvest views.
var wrapper = document.querySelector('main > div.wrapper');

//Bind to child additions.
observer.observe(wrapper, {
  subtree: true,
  attributes: true
});
