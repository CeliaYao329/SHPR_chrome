
// chrome.runtime.onInstalled.addListener(function () {
//     console.log("onInstalled");
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         console.log("removed");
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: { hostEquals: 'developer.chrome.com' },
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });




chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.cookies.getAll({}, function(cookies){
    console.log(cookies);
  })
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