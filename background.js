
chrome.runtime.onInstalled.addListener(function () {
  console.log("onInstalled");


  chrome.cookies.get({ url: 'https://www.shpr.store', name: 'smSession' },
    function (cookie) {
      if (cookie) {
        chrome.storage.sync.set({
          email: null,
          token: null
        }, function () {
          console.log(cookie.value);
        });

      }
      else {
        chrome.storage.sync.set({
          email: null,
          token: null
        }, function () {
          console.log("initializing user info");
        });
      }
    });

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  //     console.log("removed");
  //     chrome.declarativeContent.onPageChanged.addRules([{
  //         conditions: [new chrome.declarativeContent.PageStateMatcher({
  //             pageUrl: { hostEquals: 'developer.chrome.com' },
  //         })
  //         ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //     }]);
  // });
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log('activated from background');
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab) {
      console.log(tab.url);
    }
    else {
      console.log('No active tab identified.');
    }
  });
});

function fetchCollection(userEmail) {
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  return new Promise((resolve, reject) => {
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let response = JSON.parse(this.response);
          console.log("fetch response:", response);
          chrome.storage.sync.set({
            collectionItems: response.items
          }, function () {
            console.log("Stored to user's collection");
          });
          resolve(response);
        } else {
          reject(this.status);
        }

      } else {
        return;
      }
    });

    xhr.open("GET", "https://www.shpr.store/_functions/myCollection?email=" + userEmail);
    xhr.send();
  });

}

function fetchTrendyBrands() {

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let response = JSON.parse(this.response);
        chrome.storage.sync.set({
          trendyBrands: response.items
        }, function () {
          console.log("Updated trendy brands");
        });
        resolve(response);
      } else {
        reject(this.status);
      }
    }
  });

  xhr.open("GET", "https://www.shpr.store/_functions/trendyBrands");

  xhr.send();
}


function reportBrand(link) {
  var data = JSON.stringify({ "link": link });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  // xhr.addEventListener("readystatechange", function () {
  //   if (this.readyState === 4) {
  //   }
  // });

  xhr.open("POST", "https://www.shpr.store/_functions/reportBrands");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
}

function addItemToCollection(userEmail, newItem) {
  let data = JSON.stringify({
    "email": userEmail,
    "item": newItem
  });
  console.log(data);
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  return new Promise((resolve, reject) => {
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText))
          fetchCollection(userEmail);
        } else {
          reject(this.status);
        }
      } else {
        return;
      }
    });

    xhr.open("POST", "https://www.shpr.store/_functions/addItemToCollection");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateCollection") {
    console.log("Popup asked me to update collection");
    chrome.storage.sync.get(['email'], function (result) {
      fetchCollection(result.email);
    })
  }

  if (request.action === "addItem") {
    console.log("Popup asked me to add an item");
    chrome.storage.sync.get(['email'], function (result) {
      let toInsertItem = request.newItem;
      toInsertItem.ownerEmail = result.email;
      addItemToCollection(result.email, toInsertItem);
    })
  }

  if (request.action === "updateTrendyBrands") {
    console.log("Popup asked me to update trendy brands");
    fetchTrendyBrands();
  }

  if (request.action === "report") {
    console.log("report brand:", request.link);
    reportBrand(request.link);
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (key in changes) {
    if (key === 'email') {
      console.log("email changed, let's fetch info!");
      chrome.storage.sync.get(['email'], function (result) {
        fetchCollection(result.email);
      })
    }
  }
})