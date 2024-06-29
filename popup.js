document.addEventListener('DOMContentLoaded', () => {
  const newSuggestionInput = document.getElementById('newSuggestion');
  const addButton = document.getElementById('add');
  const suggestionsList = document.getElementById('suggestionsList');

  function renderSuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    suggestions.forEach((text, index) => {
      const suggestionDiv = document.createElement('div');
      suggestionDiv.className = 'suggestion';
      const suggestionText = document.createElement('span');
      suggestionText.textContent = text;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        suggestions.splice(index, 1);
        chrome.storage.sync.set({ predefinedTexts: suggestions }, () => {
          renderSuggestions(suggestions);
        });
      });
      suggestionDiv.appendChild(suggestionText);
      suggestionDiv.appendChild(deleteButton);
      suggestionsList.appendChild(suggestionDiv);
    });
  }

  chrome.storage.sync.get('predefinedTexts', (data) => {
    const predefinedTexts = data.predefinedTexts || [];
    renderSuggestions(predefinedTexts);
  });

  addButton.addEventListener('click', () => {
    const newText = newSuggestionInput.value;
    if (newText) {
      chrome.storage.sync.get('predefinedTexts', (data) => {
        const predefinedTexts = data.predefinedTexts || [];
        predefinedTexts.push(newText);
        chrome.storage.sync.set({ predefinedTexts }, () => {
          newSuggestionInput.value = '';
          renderSuggestions(predefinedTexts);
        });
      });
    }
  });
});
