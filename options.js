chrome.alarms.create({ periodInMinutes: 0.5 })
chrome.alarms.onAlarm.addListener(() => {
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

});

