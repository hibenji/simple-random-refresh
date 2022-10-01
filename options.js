chrome.alarms.create({ periodInMinutes: 1 })

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

// new function
function get() {
  chrome.storage.local.get(function(items){
    stuff = JSON.stringify(items);
    let newstuff = stuff.replace(/,/g,'<br>');
    console.log(newstuff);
    document.getElementById("reloads").innerHTML = newstuff;

  })

  chrome.cookies.getAll({
    domain: ".arc.io"
  }, function (cookies) {
    for (var i = 0; i < cookies.length; i++) {
      if(cookies[i].name == "widgetOptState"){
        console.log(cookies[i]);
        cookie = cookies[i].name + "=" + cookies[i].value;
        cookie = cookie.replace(/%22/g,'"');
        cookie = cookie.replace(/%2C/g,',');
        document.getElementById("cookies").innerHTML = cookie

        if(cookie.includes("OPTED_IN")){
            document.getElementById("tag").innerHTML = "<span class='tag is-success is-large'>All good</span>"
        } else {
            document.getElementById("tag").innerHTML = "<span class='tag is-danger is-large'>Issues</span>"
        }

      }
    }
  });

}

get();

chrome.alarms.onAlarm.addListener(() => {
  get();
});

