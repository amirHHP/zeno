const STORAGE_KEY = 'zeno_gemini_api_key';

document.getElementById('save').addEventListener('click', async () => {
  const input = document.getElementById('gemini-key');
  const status = document.getElementById('status');
  const key = (input.value || '').trim();
  if (!key) {
    status.textContent = 'Please enter an API key.';
    status.className = 'status err';
    return;
  }
  try {
    await chrome.storage.sync.set({ [STORAGE_KEY]: key });
    status.textContent = 'Saved. You can close this tab.';
    status.className = 'status ok';
  } catch (e) {
    status.textContent = 'Failed to save: ' + e.message;
    status.className = 'status err';
  }
});

(async () => {
  try {
    const obj = await chrome.storage.sync.get(STORAGE_KEY);
    const key = obj[STORAGE_KEY] || '';
    document.getElementById('gemini-key').value = key;
  } catch (e) {
    document.getElementById('status').textContent = 'Could not load saved key.';
    document.getElementById('status').className = 'status err';
  }
})();
