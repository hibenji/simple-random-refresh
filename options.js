setInterval(() => { 

    chrome.storage.local.get(function(items){
        stuff = JSON.stringify(items);
        let newstuff = stuff.replace(/,/g,'<br>');
        document.getElementById("stuff").innerHTML = newstuff;
    })

}, 1000);