chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('predefinedTexts', (data) => {
    if (!data.predefinedTexts) {
      chrome.storage.sync.set({ predefinedTexts: ["Suggested Text"] });
    }
  });
});
