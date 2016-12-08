//......................Make The Comment......................//
chrome.runtime.sendMessage({ method: 'getInfo' }, function(response) {
    var markovComment = new markov(response, "string", /[.^\S]+ /g);

    //For random sentence ender character.
    var sentenceEnders = ['. ', '? ', '! ', ' '];

    //generate a random max i value and a random gen value to get different sentences.
    var outString = "";
    var phraseLength = Math.floor(Math.random() * 11) + 1;
    var callTime = Math.floor(Math.random() * 6) + 1;
    for (var i = 0; i < callTime; i++) {
        var sentenceEnder = sentenceEnders[Math.floor(Math.random() * 4)];
        //Generate a sentence and remove any extra white space.
        var sentence = markovComment.gen(phraseLength).replace(/^\s+|\s+$/g,'');
        outString += sentence + sentenceEnder;
    }
    console.log(outString);

    //Stick it in the popup.
    var commentNode = document.getElementById('popupComment');
    commentNode.innerHTML = outString;
});