chrome.alarms.create({ periodInMinutes: 2 });
chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({}, function(tabs) { 

    var tab = tabs[Math.floor(Math.random() * tabs.length)];

    console.log(tab.url)
    chrome.tabs.reload(tab.id);

    const d = new Date();
    let minutes = d.getMinutes();
    let hours = d.getHours();

    let time = hours + ":" + minutes;

    var value = tab.url;
    var obj= {};
    obj[value] = time;

    chrome.storage.local.set(obj);
    
  });
});
