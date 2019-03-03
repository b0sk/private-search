var searchQuery;


function onCreated(windowInfo) {
//  console.log(`Created window: ${windowInfo.id}`);
//  console.log("tab id: " + windowInfo.tabs[0].id);
  browser.search.search({
    query: searchQuery,
    tabId: windowInfo.tabs[0].id
  });
}

function onError(error) {
  console.log(`Error: ${error}`);
}


browser.contextMenus.create({
  id: "private-search",
  title: "&Private serach for '%s'",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "private-search") {
    searchQuery = info.selectionText;
    var privateWindow = browser.windows.create({
      incognito: true
    });
    privateWindow.then(onCreated, onError);
  }
});

