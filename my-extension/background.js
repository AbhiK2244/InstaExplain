chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explainText",
    title: "Explain selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "explainText") {
    chrome.tabs.sendMessage(tab.id, {
      action: "SHOW_POPUP",
      text: info.selectionText
    });
  }
});
