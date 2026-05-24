const STORAGE_KEY_API = 'zeno_gemini_api_key';
const STORAGE_KEY_DEALS = 'zeno_deals';
const STORAGE_KEY_LANG = 'zeno_lang';
const STORAGE_KEY_BALE_API = 'zeno_bale_api_key';
const STORAGE_KEY_BALE_BOT = 'zeno_bale_bot_id';

let currentLang = 'fa';

const LANG_STRINGS = {
  fa: {
    pageTitle: 'تنظیمات Zeno CRM',
    pageDesc: 'پیکربندی کلیدهای اتصال هوش مصنوعی و مدیریت داده‌های سیستم.',
    apiSectionTitle: 'کلید API هوش مصنوعی (Gemini)',
    apiSectionDesc: 'این کلید فقط روی مرورگر شما ذخیره می‌شود و برای استفاده از قابلیت‌های هوشمند فانل به کار می‌رود.',
    apiKeyLabel: 'کلید API',
    saveBtn: 'ذخیره',
    getApiLink: 'دریافت کلید API ←',
    baleSectionTitle: 'تنظیمات پیام‌رسان بله (سفیر)',
    baleSectionDesc: 'کلید دسترسی و شناسه بازوی خود را برای ارسال پیام‌ها و فایل‌ها به مشتریان از طریق بله تنظیم کنید.',
    baleKeyLabel: 'کلید دسترسی سفیر (API Access Key)',
    baleBotIdLabel: 'شناسه بازو (Bot ID)',
    baleSaveBtn: 'ذخیره تنظیمات بله',
    baleStatusSaved: 'تنظیمات بله با موفقیت ذخیره شد.',
    baleStatusEnterFields: 'لطفاً کلید دسترسی بله و شناسه بازو را وارد کنید.',
    backupSectionTitle: 'پشتیبان‌گیری و بازیابی',
    backupSectionDesc: 'از تمام معاملات، یادداشت‌ها، کلیدها و تنظیمات خود نسخه پشتیبان تهیه کنید یا آن را بازیابی کنید.',
    exportBtn: 'خروجی پشتیبان (Export)',
    importBtn: 'ورود پشتیبان (Import)',
    statusSaved: 'تنظیمات با موفقیت ذخیره شد.',
    statusEnterKey: 'لطفاً کلید API را وارد کنید.',
    statusSaveFailed: 'خطا در ذخیره‌سازی: ',
    backupExportSuccess: 'فایل پشتیبان آماده دانلود است.',
    backupImportSuccess: 'فایل پشتیبان با موفقیت بازیابی شد! صفحات برنامه مجدداً بارگذاری شدند.',
    backupImportEmpty: 'لطفاً یک فایل پشتیبان معتبر انتخاب کنید.',
    backupImportInvalid: 'فایل انتخابی معتبر نیست یا شامل اطلاعات معاملات نمی‌باشد.',
    backupImportFailed: 'خطا در بارگذاری فایل پشتیبان: '
  },
  en: {
    pageTitle: 'Zeno CRM Settings',
    pageDesc: 'Configure Gemini API keys and manage your CRM data backups.',
    apiSectionTitle: 'AI API Key (Gemini)',
    apiSectionDesc: 'This key is stored locally on your device and is used for AI-powered CRM features.',
    apiKeyLabel: 'API Key',
    saveBtn: 'Save',
    getApiLink: 'Get a Gemini API key →',
    baleSectionTitle: 'Bale Messenger Settings (Safir)',
    baleSectionDesc: 'Configure the API Access Key and Bot ID to send messages and files to clients via Bale.',
    baleKeyLabel: 'API Access Key',
    baleBotIdLabel: 'Bot ID',
    baleSaveBtn: 'Save Bale Settings',
    baleStatusSaved: 'Bale settings saved successfully.',
    baleStatusEnterFields: 'Please enter both the API Access Key and Bot ID.',
    backupSectionTitle: 'Backup & Restore',
    backupSectionDesc: 'Export your deals, notes, API keys, and settings to a JSON file, or restore them.',
    exportBtn: 'Export Backup',
    importBtn: 'Import Backup',
    statusSaved: 'Settings saved successfully.',
    statusEnterKey: 'Please enter an API key.',
    statusSaveFailed: 'Failed to save: ',
    backupExportSuccess: 'Backup file is ready for download.',
    backupImportSuccess: 'Backup restored successfully! CRM tabs have been reloaded.',
    backupImportEmpty: 'Please select a valid backup file.',
    backupImportInvalid: 'The selected file is not a valid Zeno CRM backup.',
    backupImportFailed: 'Failed to import backup: '
  }
};

function applyLanguage() {
  const t = LANG_STRINGS[currentLang];
  document.documentElement.lang = currentLang;
  document.getElementById('settings-body').dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  
  document.getElementById('page-title').textContent = t.pageTitle;
  document.getElementById('page-desc').textContent = t.pageDesc;
  
  document.getElementById('api-section-title').textContent = t.apiSectionTitle;
  document.getElementById('api-section-desc').textContent = t.apiSectionDesc;
  document.getElementById('api-key-label').textContent = t.apiKeyLabel;
  document.getElementById('save').textContent = t.saveBtn;
  
  const getApiLink = document.getElementById('get-api-link');
  getApiLink.textContent = t.getApiLink;

  // Bale translations
  document.getElementById('bale-section-title').textContent = t.baleSectionTitle;
  document.getElementById('bale-section-desc').textContent = t.baleSectionDesc;
  document.getElementById('bale-key-label').textContent = t.baleKeyLabel;
  document.getElementById('bale-bot-id-label').textContent = t.baleBotIdLabel;
  document.getElementById('bale-save').textContent = t.baleSaveBtn;
  
  document.getElementById('backup-section-title').textContent = t.backupSectionTitle;
  document.getElementById('backup-section-desc').textContent = t.backupSectionDesc;
  document.getElementById('export-btn').textContent = t.exportBtn;
  document.getElementById('import-trigger-btn').textContent = t.importBtn;
}

// Load settings
async function loadSettings() {
  try {
    const syncData = await chrome.storage.sync.get([
      STORAGE_KEY_API,
      STORAGE_KEY_LANG,
      STORAGE_KEY_BALE_API,
      STORAGE_KEY_BALE_BOT
    ]);
    currentLang = syncData[STORAGE_KEY_LANG] || 'fa';
    applyLanguage();
    
    if (syncData[STORAGE_KEY_API]) {
      document.getElementById('gemini-key').value = syncData[STORAGE_KEY_API];
    }
    if (syncData[STORAGE_KEY_BALE_API]) {
      document.getElementById('bale-key').value = syncData[STORAGE_KEY_BALE_API];
    }
    if (syncData[STORAGE_KEY_BALE_BOT]) {
      document.getElementById('bale-bot-id').value = syncData[STORAGE_KEY_BALE_BOT];
    }
  } catch (e) {
    console.error('Load settings failed', e);
    applyLanguage();
  }
}

// Save settings
document.getElementById('save').addEventListener('click', async () => {
  const input = document.getElementById('gemini-key');
  const status = document.getElementById('status');
  const key = (input.value || '').trim();
  const t = LANG_STRINGS[currentLang];
  
  if (!key) {
    status.textContent = t.statusEnterKey;
    status.className = 'status err';
    return;
  }
  
  try {
    await chrome.storage.sync.set({ [STORAGE_KEY_API]: key });
    status.textContent = t.statusSaved;
    status.className = 'status ok';
    
    // Reload main CRM tabs to pick up new key
    reloadAppTabs();
  } catch (e) {
    status.textContent = t.statusSaveFailed + e.message;
    status.className = 'status err';
  }
});

// Save Bale settings
document.getElementById('bale-save').addEventListener('click', async () => {
  const keyInput = document.getElementById('bale-key');
  const botInput = document.getElementById('bale-bot-id');
  const status = document.getElementById('bale-status');
  const key = (keyInput.value || '').trim();
  const botId = (botInput.value || '').trim();
  const t = LANG_STRINGS[currentLang];
  
  if (!key || !botId) {
    status.textContent = t.baleStatusEnterFields;
    status.className = 'status err';
    return;
  }
  
  try {
    await chrome.storage.sync.set({
      [STORAGE_KEY_BALE_API]: key,
      [STORAGE_KEY_BALE_BOT]: botId
    });
    status.textContent = t.baleStatusSaved;
    status.className = 'status ok';
    
    // Reload main CRM tabs to pick up new configurations
    reloadAppTabs();
  } catch (e) {
    status.textContent = t.statusSaveFailed + e.message;
    status.className = 'status err';
  }
});

// Helper to reload Zeno CRM app tabs
function reloadAppTabs() {
  if (chrome && chrome.tabs && chrome.tabs.query) {
    const appUrl = chrome.runtime.getURL('app.html');
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url && tab.url.startsWith(appUrl)) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  }
}

// Export Backup
document.getElementById('export-btn').addEventListener('click', async () => {
  const backupStatus = document.getElementById('backup-status');
  const t = LANG_STRINGS[currentLang];
  
  try {
    const localData = await chrome.storage.local.get(STORAGE_KEY_DEALS);
    const syncData = await chrome.storage.sync.get([
      STORAGE_KEY_API,
      STORAGE_KEY_LANG,
      STORAGE_KEY_BALE_API,
      STORAGE_KEY_BALE_BOT
    ]);
    
    const backupContent = {
      app: 'zeno_crm',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      data: {
        [STORAGE_KEY_DEALS]: localData[STORAGE_KEY_DEALS] || [],
        [STORAGE_KEY_API]: syncData[STORAGE_KEY_API] || '',
        [STORAGE_KEY_LANG]: syncData[STORAGE_KEY_LANG] || 'fa',
        [STORAGE_KEY_BALE_API]: syncData[STORAGE_KEY_BALE_API] || '',
        [STORAGE_KEY_BALE_BOT]: syncData[STORAGE_KEY_BALE_BOT] || ''
      }
    };
    
    const jsonStr = JSON.stringify(backupContent, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `zeno-crm-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    backupStatus.textContent = t.backupExportSuccess;
    backupStatus.className = 'status ok';
  } catch (e) {
    backupStatus.textContent = t.statusSaveFailed + e.message;
    backupStatus.className = 'status err';
  }
});

// Import Backup Trigger
document.getElementById('import-trigger-btn').addEventListener('click', () => {
  document.getElementById('import-file').click();
});

// File Import change handler
document.getElementById('import-file').addEventListener('change', (event) => {
  const backupStatus = document.getElementById('backup-status');
  const t = LANG_STRINGS[currentLang];
  const file = event.target.files[0];
  
  if (!file) {
    backupStatus.textContent = t.backupImportEmpty;
    backupStatus.className = 'status err';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      
      // Validation: support direct zeno_deals or nested in data
      let deals = null;
      let apiKey = null;
      let lang = null;
      
      let baleApiKey = null;
      let baleBotId = null;
      
      if (backup && backup.data) {
        deals = backup.data[STORAGE_KEY_DEALS];
        apiKey = backup.data[STORAGE_KEY_API];
        lang = backup.data[STORAGE_KEY_LANG];
        baleApiKey = backup.data[STORAGE_KEY_BALE_API];
        baleBotId = backup.data[STORAGE_KEY_BALE_BOT];
      } else if (backup) {
        deals = backup[STORAGE_KEY_DEALS];
        apiKey = backup[STORAGE_KEY_API];
        lang = backup[STORAGE_KEY_LANG];
        baleApiKey = backup[STORAGE_KEY_BALE_API];
        baleBotId = backup[STORAGE_KEY_BALE_BOT];
      }
      
      if (!Array.isArray(deals)) {
        backupStatus.textContent = t.backupImportInvalid;
        backupStatus.className = 'status err';
        return;
      }
      
      // Save data
      await chrome.storage.local.set({ [STORAGE_KEY_DEALS]: deals });
      
      const syncObj = {};
      if (apiKey !== undefined && apiKey !== null) {
        syncObj[STORAGE_KEY_API] = apiKey;
        document.getElementById('gemini-key').value = apiKey;
      }
      if (lang) {
        syncObj[STORAGE_KEY_LANG] = lang;
        currentLang = lang;
      }
      if (baleApiKey !== undefined && baleApiKey !== null) {
        syncObj[STORAGE_KEY_BALE_API] = baleApiKey;
        document.getElementById('bale-key').value = baleApiKey;
      }
      if (baleBotId !== undefined && baleBotId !== null) {
        syncObj[STORAGE_KEY_BALE_BOT] = baleBotId;
        document.getElementById('bale-bot-id').value = baleBotId;
      }
      
      if (Object.keys(syncObj).length > 0) {
        await chrome.storage.sync.set(syncObj);
      }
      
      // Apply UI language if it changed
      applyLanguage();
      
      backupStatus.textContent = LANG_STRINGS[currentLang].backupImportSuccess;
      backupStatus.className = 'status ok';
      
      // Reload main CRM tabs
      reloadAppTabs();
    } catch (err) {
      backupStatus.textContent = t.backupImportFailed + err.message;
      backupStatus.className = 'status err';
    }
  };
  
  reader.onerror = () => {
    backupStatus.textContent = t.backupImportFailed;
    backupStatus.className = 'status err';
  };
  
  reader.readAsText(file);
  // Reset value to allow selecting same file again
  event.target.value = '';
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', loadSettings);
