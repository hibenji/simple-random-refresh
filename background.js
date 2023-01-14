var reload_time = 20;

// function
function get() {
  chrome.tabs.query({}, function(tabs) { 

    // get i
    chrome.storage.local.get(['i'], function(result) {
      i = result.i;
      console.log('Value currently is ' + i);

      if (i < tabs.length - 1) {
        chrome.storage.local.set({'i': i+1}, function() {
          console.log("i increased to " + (i+1));
        });
      } else {
        chrome.storage.local.set({'i': 0}, function() {
          console.log("i reset to " + 0);
        });
      }
    

      console.log("i = " + i);
      // console.log(tabs);
      var tab = tabs[i];


      // console.log(tab.url)
      chrome.tabs.reload(tab.id);

      const d = new Date();
      let minutes = d.getMinutes();
      let hours = d.getHours();

      let time = hours + ":" + minutes;

      // clear all alarms
      chrome.alarms.clearAll();

      // time to reload each website
      var actual_time = reload_time / (tabs.length - 1);
      console.log("time = " + actual_time);
      // actual time in ms
      actual_time = actual_time * 60 * 1000;

      console.log(Date.now() + actual_time)

      // send get request to api.benji.link/arc using fetch() with the tab.url and time as parameters

      url = 'https://api.benji.link/arc?url='+tab.url + '&time=' + time + '&i=' + i;

      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });

      chrome.alarms.create("reload", {when: Date.now() + actual_time});


  });
    
  });
}



chrome.runtime.onStartup.addListener(function () {
  
  // time to reload each website
  chrome.alarms.clearAll();


  chrome.cookies.get({url: "https://core.arc.io", name: "widgetOptState"}, function(cookie) {
    if (cookie) {
      // replace cookie value "UNDECIDED" with "OPTED_IN"
      cookie.value = cookie.value.replace("UNDECIDED", "OPTED_IN");
      // set cookie
      chrome.cookies.set({url: "https://core.arc.io", name: "widgetOptState", value: cookie.value, expirationDate: cookie.expirationDate, domain: cookie.domain, path: cookie.path, secure: cookie.secure, httpOnly: cookie.httpOnly, sameSite: cookie.sameSite, storeId: cookie.storeId});
    
      url = 'https://api.benji.link/arc?url=Cookie&time=now';

      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });


    }
  });

  chrome.storage.local.set({'i': 1}, function() {
    console.log('Value is set to ' + 1);
  });


  get();
});


// listen for alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log("alarm");
  get();
});