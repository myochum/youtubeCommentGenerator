//......................Make The Comment......................//
chrome.runtime.sendMessage({ method: 'getInfo' }, function(response) {
    //If we don't have a response. try this ish again.
    if (!response) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "doOver"},
                function(response) {});
        });
        return;
    }

    var markovComment = new markov(response, "string", /[.^\S]+ /g);

    //For random sentence ender character.
    var sentenceEnders = ['. ', '? ', '! ', ' '];

    //generate a random max i value and a random gen value to get different sentences.
    var commentNode = document.getElementById('popupComment');
    var generate = function() {
        var outString = "";
        var phraseLength = Math.floor(Math.random() * 11) + 1;
        var callTime = Math.floor(Math.random() * 6) + 1;
        for (var i = 0; i < callTime; i++) {
            var sentenceEnder = sentenceEnders[Math.floor(Math.random() * 4)];
            //Generate a sentence and remove any extra white space.
            var sentence = markovComment.gen(phraseLength).replace(/^\s+|\s+$/g, '');
            outString += sentence + sentenceEnder;
        }
        console.log(outString);

        //Stick it in the popup.
        commentNode.innerHTML = outString;

        //Pick a comment message
        var messages = document.querySelectorAll('#titleRandom h4:not(.active)');
        var activeMessage = document.querySelector('#titleRandom h4.active');
        activeMessage.className = '';
        var randomMessageIndex = Math.floor(Math.random() * 6) + 1;
        messages[randomMessageIndex].className = 'active';
    };
    generate();

    //Bind to comment button click.
    document.getElementById('commentButton').addEventListener('click', function() {
        //Send 'er in.
        // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, { method: "sendComment", comment: commentNode.innerHTML},
        //             function(response) {});
        // });

    });

    //Bind to generate button click.
    document.getElementById('generateButton').addEventListener('click', function() {
        generate();
    });
});