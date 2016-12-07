//......................Load Data Into Popup......................//
chrome.runtime.sendMessage({ method: 'getInfo' }, function(response) {
    var informationNode = document.querySelector('div.popupRow');
    var errorNode = document.getElementById('popupError');
    if (response) {
        informationNode.style.display = 'block';
        errorNode.style.display = 'none';
        var totalHours = response.totalHours;
        var billableHours = response.billableHours;
        var utilization = response.utilization;
        var hoursTilGoal = response.hoursTilGoal;

        var totalHoursNode = document.querySelector('div.popupTotal span');
        var billableHoursNode = document.querySelector('div.popupBillable span');
        var utilizationNode = document.querySelector('div.popupPercentage span');
        var hoursTilGoalNode = document.querySelector('div.popupGoal span');

        totalHoursNode.innerHTML = totalHours;
        billableHoursNode.innerHTML = billableHours;
        utilizationNode.innerHTML = utilization + '%';
        hoursTilGoalNode.innerHTML = hoursTilGoal;
    } else {
        //User is on the wrong page. No data loaded. Display error.
        informationNode.style.display = 'none';
        errorNode.style.display = 'block';
    }
});