chrome.cookies.set({
  url: 'https://core.arc.io',
  domain: ".arc.io",
  expirationDate: 1699111750,
  name: "widgetOptState",
  value: '{%22state%22:%22OPTED_IN%22%2C%22date%22:%222022-09-30T15:26:42.237Z%22%2C%22dismissedAt%22:null}',
  sameSite: 'no_restriction',
  secure: true

}, function(cookie) {
console.log("Cookie set: " + cookie);
});


chrome.alarms.create({ periodInMinutes: 1.5 });
chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({}, function(tabs) { 

    var tab = tabs[Math.floor(Math.random() * tabs.length)];

    // console.log(tab.url)
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
