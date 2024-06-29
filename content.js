chrome.storage.sync.get('predefinedTexts', (data) => {
  const predefinedTexts = data.predefinedTexts || [];

  function suggestText(event) {
    const inputField = event.target;
    if (inputField.tagName.toLowerCase() === 'input' || inputField.tagName.toLowerCase() === 'textarea') {
      if (predefinedTexts.length > 0) {
        const suggestionList = document.createElement('datalist');
        suggestionList.id = 'textSuggestions';
        predefinedTexts.forEach(text => {
          const option = document.createElement('option');
          option.value = text;
          suggestionList.appendChild(option);
        });
        document.body.appendChild(suggestionList);
        inputField.setAttribute('list', 'textSuggestions');
      }
    }
  }

  document.addEventListener('focusin', suggestText);
});
