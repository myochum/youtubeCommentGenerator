//......................Load Data Into Popup......................//
chrome.runtime.sendMessage({ method: 'getInfo' }, function(response) {
    //Use this in the real jawn but keep testin with sherlock.
    //var corpus = response.corpus;
    var markovComment = new markov(corpus, "string", /[.^\w]+ /g); //sherlock holmes corpus

    //generate a random max i value and a random gen value to get different sentences.
    var mSh = "";
    var outString = "";
    for (var i = 0; i < 2; i++) {
        mSh += markovComment.gen(20) + " ";
    }
    outString += mSh;

    console.log(outString);
});