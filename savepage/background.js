// 用户首次安装插件时执行一次，后面不会再重新执行。（除非用户重新安装插件）
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    isOpen: true,
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./content-script.js"],
      })
      .then(() => {
        console.log("INJECTED SCRIPT SUCC.");
      })
      .catch((err) => console.log(err));
  }
});
