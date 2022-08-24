import browser from 'webextension-polyfill'
console.log("background/index.ts");

browser.tabs.onActivated.addListener((l) => {
  console.log(l);
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((activeTab) => {
      console.log(activeTab[0].url);
    });
});