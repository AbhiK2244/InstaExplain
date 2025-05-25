let popup;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "SHOW_POPUP") {
    showExplainPopup(msg.text);
  }
});

function showExplainPopup(selectedText) {
  if (popup) popup.remove();

  fetch(chrome.runtime.getURL('popup.html'))
    .then(res => res.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      popup = tempDiv.firstElementChild;

      document.body.appendChild(popup);

      popup.querySelector('#close-popup').addEventListener('click', () => {
        popup.remove();
        popup = null;
      });

      popup.querySelector('#selected-text').innerText = selectedText;

      fetch('https://insta-explain.vercel.app/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText })
      })
        .then(res => res.json())
        .then(data => {
          popup.querySelector('#loader').innerHTML = '';
          popup.querySelector('#loader').style.height = '0';
          popup.querySelector('#explanation').innerHTML = data.explanation;
        })
        .catch(err => {
          popup.querySelector('#explanation').style.color = 'red';
          popup.querySelector('#explanation').style.textAlign = 'center';
          popup.querySelector('#explanation').innerText = 'Error fetching explanation.';
        });
    });
}