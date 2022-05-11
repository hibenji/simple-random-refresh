chrome.alarms.create({ periodInMinutes: 0.05 })
chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.local.get(function(items){
        stuff = JSON.stringify(items);
        let newstuff = stuff.replace(/,/g,'<br>');
        document.getElementById("stuff").innerHTML = newstuff;
    })
});

