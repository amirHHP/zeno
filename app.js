const STORAGE_KEY_API = 'zeno_gemini_api_key';
const STORAGE_KEY_DEALS = 'zeno_deals';
const STORAGE_KEY_LANG = 'zeno_lang';

document.addEventListener('DOMContentLoaded', () => {
  const mainAppView = document.getElementById('main-app-view');
  const dealDetailPage = document.getElementById('deal-detail-page');
  const pages = mainAppView.querySelectorAll('.page');
  const tabButtons = document.querySelectorAll('.tab-button');
  const headerTitle = document.getElementById('header-title');
  const loadingSpinner = document.getElementById('loading-spinner');
  const backToFunnelBtn = document.getElementById('back-to-funnel-btn');
  const linkSettings = document.getElementById('link-settings');
  const langToggle = document.getElementById('lang-toggle');

  // Modal Elements
  const fabAddDeal = document.getElementById('fab-add-deal');
  const newDealModal = document.getElementById('new-deal-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const magicFillBtn = document.getElementById('magic-fill-btn');
  const createDealBtn = document.getElementById('create-deal-btn');
  const step1Input = document.getElementById('step-1-input');
  const step2Form = document.getElementById('step-2-form');
  const companyNameInput = document.getElementById('company-name-input');

  const generateFollowupBtn = document.getElementById('generate-followup-btn');
  const geminiFollowupOutput = document.getElementById('gemini-followup-output');

  let currentDealData = {};
  const currentUser = 'شما';

  const LANG_STRINGS = {
    fa: {
      pageTitles: {
        funnel: 'فانل فروش',
        reports: 'گزارش‌ها و تحلیل',
        automations: 'اتوماسیون‌ها',
      },
      tabs: {
        funnel: 'فانل',
        reports: 'گزارش‌ها',
        automations: 'اتوماسیون',
      },
      settingsLabel: 'تنظیمات (کلید Gemini)',
      newDealTitle: 'معامله جدید',
      newDealCompanyLabel: 'نام شرکت یا مشتری',
      newDealCompanyPlaceholder: 'مثلاً: دیجی‌کالا',
      newDealNameLabel: 'نام شرکت',
      newDealWebsiteLabel: 'وب‌سایت',
      newDealIndustryLabel: 'صنعت',
      newDealValueLabel: 'تخمین ارزش',
      newDealPhoneAddressLabel: 'تلفن / آدرس',
      newDealPhonePlaceholder: 'تلفن',
      newDealAddressPlaceholder: 'آدرس',
      newDealSubmit: 'ثبت معامله',
      magicFillButton: 'تکمیل خودکار با هوش مصنوعی',
      automationTitle: 'دستیار هوشمند نوشتن',
      automationDescription:
        'یک متن حرفه‌ای برای پیگیری مشتری از هوش مصنوعی دریافت کنید.',
      automationButton: 'پیشنهاد متن پیگیری',
      noActivities: 'فعالیتی ثبت نشده است.',
      noTasks: 'وظیفه‌ای ثبت نشده است.',
      detailValue: 'ارزش معامله',
      detailOwner: 'مسئول',
      detailAssistantTitle: 'دستیار هوشمند معامله',
      detailSummaryButton: 'خلاصه وضعیت',
      detailNextActionButton: 'پیشنهاد اقدام بعدی',
      detailActivitiesTab: 'فعالیت‌ها',
      detailTasksTab: 'وظایف',
      activityFormTitle: 'ثبت فعالیت جدید',
      activityFormPlaceholder: 'خلاصه جلسه، نتیجه تماس و...',
      activityFormSubmit: 'ثبت',
      geminiKeyMissing:
        'کلید Gemini تنظیم نشده است. از منوی تنظیمات افزونه، کلید را وارد کنید.',
      detailContact: 'نام مخاطب',
      detailPhone: 'تلفن',
      detailWebsite: 'وب‌سایت',
      detailIndustry: 'صنعت',
      detailAddress: 'آدرس',
      editBtn: 'ویرایش',
      saveBtn: 'ذخیره',
      cancelBtn: 'انصراف',
      dealInfoTitle: 'مشخصات معامله',
      balePanelTitle: 'ارسال پیام در بله (سفیر)',
      balePanelDesc: 'ارسال انواع پیام، رمز عبور یا فایل به این مشتری',
      baleNoConfig: 'تنظیمات بله (Access Key یا Bot ID) ست نشده است. لطفاً به صفحه تنظیمات مراجعه کنید.',
      baleTypeSimple: 'پیام متنی',
      baleTypeOTP: 'رمز یک‌بارمصرف (OTP)',
      baleTypeFile: 'ارسال فایل',
      baleIsSecureLabel: 'پیام رمزدار (Secure)',
      baleBtnSend: 'ارسال پیام',
      baleBtnUploading: 'در حال آپلود فایل...',
      baleBtnSending: 'در حال ارسال پیام...',
      baleSuccess: 'پیام با موفقیت در بله ارسال شد. شناسه: ',
      baleError: 'خطا در ارسال پیام: ',
      balePhonePlaceholder: 'شماره تلفن (مثال: 989123456789)',
      baleTextPlaceholder: 'متن پیام خود را بنویسید...',
      baleInsertAIFollowup: 'درج متن پیگیری هوش مصنوعی',
      baleOtpPlaceholder: 'رمز یکبارمصرف (فقط عدد)',
      baleFileLabel: 'انتخاب فایل (حداکثر 500MB)',
      baleQuickButtonLabel: 'افزودن دکمه شیشه‌ای (اختیاری)',
      baleButtonTextLabel: 'متن دکمه',
      baleButtonActionLabel: 'عملکرد دکمه',
      baleActionUrl: 'باز کردن لینک',
      baleActionCopy: 'کپی متن',
      baleActionWebApp: 'مینی‌اپ بله',
      baleButtonValueLabel: 'مقدار (لینک یا متن کپی)',
      baleAutoTitle: 'ارسال سریع پیام بله',
      baleAutoSelectLabel: 'انتخاب معامله / مشتری',
      baleAutoOptionDefault: '-- انتخاب کنید --',
      baleAutoPhoneLabel: 'شماره تلفن',
      baleAutoTextLabel: 'متن پیام',
      rateLimitError:
        'محدودیت استفاده از Gemini (429 Too Many Requests). چند دقیقه صبر کنید یا از کلید دیگری استفاده کنید.',
      authError:
        'دسترسی به Gemini ممکن نیست (خطای احراز هویت). کلید را در تنظیمات بررسی کنید.',
      followupPrompt:
        'یک ایمیل پیگیری کوتاه، مودبانه و حرفه‌ای به زبان فارسی بنویس. فرض کن ۳ روز از ارسال پیشنهاد قیمت گذشته و هنوز پاسخی دریافت نشده است. هدف، دریافت بازخورد از مشتری است.',
      summaryPrompt: (deal, stageName, activitiesText) => `
به عنوان یک دستیار فروش حرفه‌ای، وضعیت معامله زیر را در یک پاراگراف کوتاه خلاصه کن.
نام معامله: ${deal.name}
ارزش: ${deal.value}
مرحله فعلی: ${stageName}
تگ‌ها: ${deal.tags.join(', ') || 'بدون تگ'}
شرکت: ${deal.company}

لیست کامل فعالیت‌ها تا این لحظه:
${activitiesText}`.trim(),
      nextActionPrompt: (deal, stageName, activitiesText) => `
با توجه به اطلاعات معامله زیر، بهترین "اقدام بعدی" چیست؟ فقط یک اقدام بسیار مشخص، عملی و کوتاه پیشنهاد بده.
نام معامله: ${deal.name}
مرحله فعلی: ${stageName}
شرکت: ${deal.company}

لیست کامل فعالیت‌های انجام‌شده تا الان:
${activitiesText}`.trim(),
    },
    en: {
      pageTitles: {
        funnel: 'Sales funnel',
        reports: 'Reports & analytics',
        automations: 'Automations',
      },
      tabs: {
        funnel: 'Funnel',
        reports: 'Reports',
        automations: 'Automation',
      },
      settingsLabel: 'Settings (Gemini key)',
      newDealTitle: 'New deal',
      newDealCompanyLabel: 'Company or customer name',
      newDealCompanyPlaceholder: 'e.g. ACME Inc.',
      newDealNameLabel: 'Company name',
      newDealWebsiteLabel: 'Website',
      newDealIndustryLabel: 'Industry',
      newDealValueLabel: 'Estimated value',
      newDealPhoneAddressLabel: 'Phone / address',
      newDealPhonePlaceholder: 'Phone',
      newDealAddressPlaceholder: 'Address',
      newDealSubmit: 'Create deal',
      magicFillButton: 'AI auto-fill company details',
      automationTitle: 'Smart writing assistant',
      automationDescription:
        'Get a professional follow-up message generated by AI.',
      automationButton: 'Suggest follow-up message',
      noActivities: 'No activities yet.',
      noTasks: 'No tasks yet.',
      detailValue: 'Deal value',
      detailOwner: 'Owner',
      detailAssistantTitle: 'Deal AI assistant',
      detailSummaryButton: 'Summarize status',
      detailNextActionButton: 'Suggest next action',
      detailActivitiesTab: 'Activities',
      detailTasksTab: 'Tasks',
      activityFormTitle: 'Log new activity',
      activityFormPlaceholder:
        'Meeting notes, call outcome, email summary…',
      activityFormSubmit: 'Save',
      geminiKeyMissing:
        'Gemini API key is not set. Open extension settings and add your key.',
      detailContact: 'Contact Name',
      detailPhone: 'Phone',
      detailWebsite: 'Website',
      detailIndustry: 'Industry',
      detailAddress: 'Address',
      editBtn: 'Edit',
      saveBtn: 'Save',
      cancelBtn: 'Cancel',
      dealInfoTitle: 'Deal Specifications',
      balePanelTitle: 'Bale Messenger (Safir)',
      balePanelDesc: 'Send text, OTP, or files to this client',
      baleNoConfig: 'Bale settings (Access Key or Bot ID) are not set. Please open settings.',
      baleTypeSimple: 'Text Message',
      baleTypeOTP: 'OTP Code',
      baleTypeFile: 'Send File',
      baleIsSecureLabel: 'Secure Message',
      baleBtnSend: 'Send Message',
      baleBtnUploading: 'Uploading file...',
      baleBtnSending: 'Sending message...',
      baleSuccess: 'Message sent successfully. ID: ',
      baleError: 'Error sending message: ',
      balePhonePlaceholder: 'Phone number (e.g. 989123456789)',
      baleTextPlaceholder: 'Enter your message text...',
      baleInsertAIFollowup: 'Insert AI follow-up text',
      baleOtpPlaceholder: 'OTP code (digits only)',
      baleFileLabel: 'Select file (Max 500MB)',
      baleQuickButtonLabel: 'Add Glass Button (Optional)',
      baleButtonTextLabel: 'Button Text',
      baleButtonActionLabel: 'Button Action',
      baleActionUrl: 'Open Link',
      baleActionCopy: 'Copy Text',
      baleActionWebApp: 'Bale Web App',
      baleButtonValueLabel: 'Value (URL / text)',
      baleAutoTitle: 'Bale Messenger Quick Send',
      baleAutoSelectLabel: 'Select Deal / Client',
      baleAutoOptionDefault: '-- Select --',
      baleAutoPhoneLabel: 'Phone Number',
      baleAutoTextLabel: 'Message Text',
      rateLimitError:
        'Gemini rate limit reached (429 Too Many Requests). Wait a bit or use another key.',
      authError:
        'Gemini authentication failed. Please check your API key in settings.',
      followupPrompt:
        'Write a short, polite and professional English follow-up email. Assume 3 days have passed since sending a quote and the customer has not replied yet. The goal is to get feedback.',
      summaryPrompt: (deal, stageName, activitiesText) => `
As a senior sales assistant, summarize the current status of this deal in 1 short paragraph in English.
Deal name: ${deal.name}
Value: ${deal.value}
Stage: ${stageName}
Tags: ${deal.tags.join(', ') || 'none'}
Company: ${deal.company}

Full activity history:
${activitiesText}`.trim(),
      nextActionPrompt: (deal, stageName, activitiesText) => `
Given the following deal information, propose exactly ONE very concrete, actionable next step in English.
Deal name: ${deal.name}
Stage: ${stageName}
Company: ${deal.company}

Full activity history so far:
${activitiesText}`.trim(),
    },
  };

  let currentLang = 'fa';

  // Default demo data (used on first run or if storage is empty)
  const DEFAULT_DEALS = [
    {
      id: 1,
      stage: 1,
      name: 'شرکت فناوری نوین',
      value: '۱۵۰،۰۰۰،۰۰۰ تومان',
      tags: ['استراتژیک'],
      prob: 85,
      owner: 'مریم رضایی',
      contact: 'آقای احمدی',
      company: 'فناوری نوین',
      phone: '989123456789',
      website: 'https://novin.tech',
      industry: 'IT / نرم‌افزار',
      address: 'تهران، پارک فناوری پردیس',
      activities: [
        {
          type: 'call',
          user: 'مریم رضایی',
          time: '۲ روز پیش',
          text: 'تماس اولیه برقرار شد. نیازمندی‌ها بررسی شد.',
        },
        {
          type: 'note',
          user: 'مریم رضایی',
          time: 'دیروز',
          text: 'نیاز به ارسال نمونه کار دارند.',
        },
      ],
      tasks: [{ text: 'ارسال نمونه کارها', due: 'فردا', done: false }],
    },
    {
      id: 2,
      stage: 1,
      name: 'پروژه وب‌سایت آریا',
      value: '۲۰،۰۰۰،۰۰۰ تومان',
      tags: ['نمایشگاه'],
      prob: 55,
      owner: 'علی کریمی',
      contact: 'خانم شمس',
      company: 'گروه آریا',
      phone: '989191112233',
      website: 'https://aria-group.co',
      industry: 'تجارت الکترونیک',
      address: 'تهران، پاسداران، گلستان پنجم',
      activities: [
        {
          type: 'meeting',
          user: 'علی کریمی',
          time: '۳ روز پیش',
          text: 'جلسه معارفه در نمایشگاه برگزار شد. علاقمند به پلن پایه هستند.',
        },
      ],
      tasks: [],
    },
    {
      id: 3,
      stage: 2,
      name: 'گروه صنعتی پارس',
      value: '۳۲۰،۰۰۰،۰۰۰ تومان',
      tags: ['پیگیری فوری'],
      prob: 30,
      owner: 'سارا محمدی',
      contact: 'آقای رسولی',
      company: 'صنعتی پارس',
      phone: '989354445566',
      website: 'https://pars-industry.ir',
      industry: 'صنایع سنگین',
      address: 'اصفهان، شهرک صنعتی جی',
      activities: [
        {
          type: 'email',
          user: 'سارا محمدی',
          time: '۱۰:۳۰ صبح',
          text: 'ایمیل معرفی محصولات ارسال شد.',
        },
      ],
      tasks: [
        { text: 'تماس تلفنی جهت پیگیری ایمیل', due: 'امروز', done: true },
        { text: 'آماده‌سازی پیشنهاد قیمت', due: 'فردا', done: false },
      ],
    },
    {
      id: 4,
      stage: 3,
      name: 'فروشگاه زنجیره‌ای امید',
      value: '۸۰،۰۰۰،۰۰۰ تومان',
      tags: [],
      prob: 78,
      owner: 'مریم رضایی',
      contact: 'آقای تهرانی',
      company: 'فروشگاه امید',
      phone: '989127778899',
      website: 'https://omidstores.com',
      industry: 'خرده فروشی',
      address: 'تهران، خیابان شریعتی، بالاتر از مطهری',
      activities: [
        {
          type: 'meeting',
          user: 'مریم رضایی',
          time: 'هفته پیش',
          text: 'جلسه دمو برگزار شد. بازخورد مثبت بود.',
        },
        {
          type: 'email',
          user: 'مریم رضایی',
          time: '۲ روز پیش',
          text: 'پیشنهاد قیمت رسمی ارسال شد.',
        },
      ],
      tasks: [{ text: 'پیگیری تلفنی پیشنهاد قیمت', due: 'فردا', done: false }],
    },
  ];

  let dealsData = [];
  const stagesData = [
    { id: 1, name: 'Lead (سرنخ)' },
    { id: 2, name: 'Contact Made (تماس اولیه)' },
    { id: 3, name: 'Proposal Sent (پیشنهاد ارسال شده)' },
  ];

  const activityIcons = { call: '📞', email: '✉️', meeting: '👥', note: '📝', bale: '💬' };

  function getPageTitle(pageId) {
    return LANG_STRINGS[currentLang].pageTitles[pageId];
  }

  function setActiveTab(pageId) {
    pages.forEach((page) => {
      page.classList.toggle('active', page.id === `page-${pageId}`);
    });
    tabButtons.forEach((button) => {
      const isActive = button.dataset.page === pageId;
      button.classList.toggle('active-tab', isActive);
      button.classList.toggle('text-gray-500', !isActive);
    });
    headerTitle.textContent = getPageTitle(pageId);
    if (pageId === 'reports') initCharts();
    if (pageId === 'automations') initBaleAutomationTab();
  }

  tabButtons.forEach((button) =>
    button.addEventListener('click', () => setActiveTab(button.dataset.page)),
  );

  backToFunnelBtn.addEventListener('click', () => {
    mainAppView.classList.add('active');
    dealDetailPage.classList.remove('active');
  });

  linkSettings.addEventListener('click', (e) => {
    e.preventDefault();
    if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  });

  async function loadLanguage() {
    try {
      const obj = await chrome.storage.sync.get(STORAGE_KEY_LANG);
      const stored = obj[STORAGE_KEY_LANG];
      if (stored && Object.prototype.hasOwnProperty.call(LANG_STRINGS, stored)) {
        return stored;
      }
    } catch (e) {
      console.error('Load language failed', e);
    }
    return 'fa';
  }

  async function saveLanguage(lang) {
    try {
      await chrome.storage.sync.set({ [STORAGE_KEY_LANG]: lang });
    } catch (e) {
      console.error('Save language failed', e);
    }
  }

  function applyLanguageToStaticUI() {
    const t = LANG_STRINGS[currentLang];

    // Header
    headerTitle.textContent = getPageTitle('funnel');
    linkSettings.textContent = t.settingsLabel;
    langToggle.textContent = currentLang === 'fa' ? 'FA / EN' : 'EN / FA';

    // Tabs
    const funnelTab = document.querySelector('button[data-page="funnel"] span');
    const reportsTab = document.querySelector(
      'button[data-page="reports"] span',
    );
    const automationsTab = document.querySelector(
      'button[data-page="automations"] span',
    );
    if (funnelTab) funnelTab.textContent = t.tabs.funnel;
    if (reportsTab) reportsTab.textContent = t.tabs.reports;
    if (automationsTab) automationsTab.textContent = t.tabs.automations;

    // Automation card
    const automationTitle = document.querySelector(
      '#page-automations h3.font-bold',
    );
    const automationDesc = document.querySelector(
      '#page-automations p.text-sm',
    );
    const automationBtn = document.getElementById('generate-followup-btn');
    if (automationTitle) automationTitle.textContent = t.automationTitle;
    if (automationDesc) automationDesc.textContent = t.automationDescription;
    if (automationBtn) automationBtn.textContent = t.automationButton;

    // New-deal modal
    const modalTitle = document.querySelector('#new-deal-modal h2');
    const companyLabel = document.querySelector(
      '#step-1-input label.text-sm.font-medium',
    );
    const companyInput = document.getElementById('company-name-input');
    const magicFill = document.getElementById('magic-fill-btn');
    const nameLabel = document.querySelector('label[for="new-deal-name"]') ||
      document.querySelector('#step-2-form div:nth-child(1) label');
    const websiteLabel = document.querySelector('#step-2-form div:nth-child(2) label');
    const industryLabel = document.querySelector(
      '#step-2-form .grid div:nth-child(1) label',
    );
    const valueLabel = document.querySelector(
      '#step-2-form .grid div:nth-child(2) label',
    );
    const phoneAddrLabel = document.querySelector(
      '#step-2-form div:nth-child(4) label',
    );
    const phoneInput = document.getElementById('new-deal-phone');
    const addressInput = document.getElementById('new-deal-address');
    const submitDealBtn = document.getElementById('create-deal-btn');

    if (modalTitle) modalTitle.textContent = t.newDealTitle;
    if (companyLabel) companyLabel.textContent = t.newDealCompanyLabel;
    if (companyInput)
      companyInput.placeholder = t.newDealCompanyPlaceholder;
    if (magicFill) magicFill.textContent = t.magicFillButton;

    if (nameLabel) nameLabel.textContent = t.newDealNameLabel;
    if (websiteLabel) websiteLabel.textContent = t.newDealWebsiteLabel;
    if (industryLabel) industryLabel.textContent = t.newDealIndustryLabel;
    if (valueLabel) valueLabel.textContent = t.newDealValueLabel;
    if (phoneAddrLabel) phoneAddrLabel.textContent =
      t.newDealPhoneAddressLabel;
    if (phoneInput) phoneInput.placeholder = t.newDealPhonePlaceholder;
    if (addressInput) addressInput.placeholder =
      t.newDealAddressPlaceholder;
    if (submitDealBtn) submitDealBtn.textContent = t.newDealSubmit;

    // Bale quick send static elements
    const baleAutoTitle = document.getElementById('bale-auto-title');
    const baleAutoSelectLabel = document.getElementById('bale-auto-select-label');
    const baleAutoOptionDefault = document.getElementById('bale-auto-option-default');
    const baleAutoPhoneLabel = document.getElementById('bale-auto-phone-label');
    const baleAutoTextLabel = document.getElementById('bale-auto-text-label');
    const baleAutoSendBtn = document.getElementById('bale-auto-send-btn');

    if (baleAutoTitle) baleAutoTitle.textContent = t.baleAutoTitle;
    if (baleAutoSelectLabel) baleAutoSelectLabel.textContent = t.baleAutoSelectLabel;
    if (baleAutoOptionDefault) baleAutoOptionDefault.textContent = t.baleAutoOptionDefault;
    if (baleAutoPhoneLabel) baleAutoPhoneLabel.textContent = t.baleAutoPhoneLabel;
    if (baleAutoTextLabel) baleAutoTextLabel.textContent = t.baleAutoTextLabel;
    if (baleAutoSendBtn) baleAutoSendBtn.textContent = t.baleBtnSend;
  }

  langToggle.addEventListener('click', async () => {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    await saveLanguage(currentLang);
    applyLanguageToStaticUI();
    renderKanban(); // re-render funnel cards; detail view will re-render next time opened
  });

  // Storage helpers
  async function getGeminiKey() {
    try {
      const obj = await chrome.storage.sync.get(STORAGE_KEY_API);
      return obj[STORAGE_KEY_API] || '';
    } catch (e) {
      console.error('Load API key failed', e);
      return '';
    }
  }

  async function loadDeals() {
    try {
      const obj = await chrome.storage.local.get(STORAGE_KEY_DEALS);
      const stored = obj[STORAGE_KEY_DEALS];
      if (Array.isArray(stored) && stored.length) {
        dealsData = stored;
      } else {
        dealsData = DEFAULT_DEALS.slice();
      }

      // Enrich deals with createdAt and stageHistory if missing
      let dataChanged = false;
      dealsData.forEach((deal) => {
        if (!deal.createdAt) {
          dataChanged = true;
          if (deal.id === 1) {
            deal.createdAt = Date.now() - 5 * 24 * 60 * 60 * 1000; // 5 days ago
          } else if (deal.id === 2) {
            deal.createdAt = Date.now() - 35 * 24 * 60 * 60 * 1000; // 35 days ago
          } else if (deal.id === 3) {
            deal.createdAt = Date.now() - 70 * 24 * 60 * 60 * 1000; // 70 days ago
          } else if (deal.id === 4) {
            deal.createdAt = Date.now() - 100 * 24 * 60 * 60 * 1000; // 100 days ago
          } else {
            deal.createdAt = typeof deal.id === 'number' && deal.id > 1000000000000 ? deal.id : Date.now();
          }
        }
        if (!deal.stageHistory || deal.stageHistory.length === 0) {
          dataChanged = true;
          const history = [];
          if (deal.stage === 1) {
            history.push({ stage: 1, timestamp: deal.createdAt });
          } else if (deal.stage === 2) {
            history.push({ stage: 1, timestamp: deal.createdAt });
            history.push({ stage: 2, timestamp: deal.createdAt + (Date.now() - deal.createdAt) / 2 });
          } else if (deal.stage === 3) {
            history.push({ stage: 1, timestamp: deal.createdAt });
            const mid = deal.createdAt + (Date.now() - deal.createdAt) / 3;
            history.push({ stage: 2, timestamp: mid });
            history.push({ stage: 3, timestamp: deal.createdAt + 2 * (Date.now() - deal.createdAt) / 3 });
          } else {
            history.push({ stage: deal.stage || 1, timestamp: deal.createdAt });
          }
          deal.stageHistory = history;
        }
      });

      if (dataChanged) {
        await saveDeals();
      }
    } catch (e) {
      console.error('Load deals failed', e);
      dealsData = DEFAULT_DEALS.slice();
    }
  }

  async function saveDeals() {
    try {
      await chrome.storage.local.set({ [STORAGE_KEY_DEALS]: dealsData });
    } catch (e) {
      console.error('Save deals failed', e);
    }
  }

  // --- Gemini API with Search Grounding & stored key ---
  async function callGeminiAPI(prompt, outputElement = null) {
    const apiKey = await getGeminiKey();
    if (!apiKey) {
      if (outputElement) {
        outputElement.style.display = 'block';
        outputElement.textContent =
          LANG_STRINGS[currentLang].geminiKeyMissing;
      }
      return null;
    }

    loadingSpinner.style.display = 'flex';
    if (outputElement) {
      outputElement.style.display = 'none';
      outputElement.textContent = '';
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }],
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let friendly = `Error: ${response.status}`;
        if (response.status === 429) {
          friendly = LANG_STRINGS[currentLang].rateLimitError;
        } else if (response.status === 401 || response.status === 403) {
          friendly = LANG_STRINGS[currentLang].authError;
        }
        throw new Error(friendly);
      }
      const result = await response.json();

      const text =
        result?.candidates?.[0]?.content?.parts?.[0]?.text || null;

      if (!text) throw new Error('پاسخ نامعتبر از Gemini API دریافت شد.');

      if (outputElement) {
        outputElement.textContent = text;
        outputElement.style.display = 'block';
      }
      return text;
    } catch (error) {
      console.error(error);
      if (outputElement) {
        outputElement.textContent = `خطا در ارتباط با هوش مصنوعی: ${error.message}`;
        outputElement.style.display = 'block';
      }
      return null;
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }

  // --- Magic Fill Logic (AI fills company fields from name) ---
  fabAddDeal.addEventListener('click', () => {
    newDealModal.classList.add('active');
    step1Input.style.display = 'block';
    step2Form.style.display = 'none';
    companyNameInput.value = '';
  });

  closeModalBtn.addEventListener('click', () => {
    newDealModal.classList.remove('active');
  });

  companyNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      magicFillBtn.click();
    }
  });

  magicFillBtn.addEventListener('click', async () => {
    const companyName = companyNameInput.value.trim();
    if (!companyName) return;

    const prompt = `Find information for the company '${companyName}' (prefer Iran if applicable, otherwise global).
Return a JSON object with these keys:
- name (Official name)
- website
- phone (Support or HQ)
- address (Short HQ address)
- industry
- estimated_value (Estimate a deal value in Tomans based on company size/market, e.g. \"50,000,000 تومان\". If unknown, make a realistic B2B guess).

Output ONLY raw JSON. No markdown block.`;

    const resultText = await callGeminiAPI(prompt);

    // If AI failed (null, rate limit, invalid key...), gracefully fall back to manual entry
    if (!resultText) {
      step1Input.style.display = 'none';
      step2Form.style.display = 'block';
      document.getElementById('new-deal-name').value = companyName;
      return;
    }

    try {
      const cleanJson = resultText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      const info = JSON.parse(cleanJson);

      document.getElementById('new-deal-name').value =
        info.name || companyName;
      document.getElementById('new-deal-website').value = info.website || '';
      document.getElementById('new-deal-industry').value =
        info.industry || '';
      document.getElementById('new-deal-value').value =
        info.estimated_value || 'نامشخص';
      document.getElementById('new-deal-phone').value = info.phone || '';
      document.getElementById('new-deal-address').value =
        info.address || '';

      step1Input.style.display = 'none';
      step2Form.style.display = 'block';
    } catch (e) {
      alert(
        'نتوانستیم اطلاعات را به صورت خودکار استخراج کنیم. لطفاً دستی وارد کنید.',
      );
      step1Input.style.display = 'none';
      step2Form.style.display = 'block';
      document.getElementById('new-deal-name').value = companyName;
    }
  });

  createDealBtn.addEventListener('click', async () => {
    const creationTime = Date.now();
    const newDeal = {
      id: creationTime,
      stage: 1,
      name: document.getElementById('new-deal-name').value,
      value: document.getElementById('new-deal-value').value,
      tags: ['جدید'],
      prob: 20,
      owner: currentUser,
      contact: 'نامشخص',
      company: document.getElementById('new-deal-name').value,
      phone: document.getElementById('new-deal-phone').value.trim(),
      website: document.getElementById('new-deal-website').value.trim(),
      industry: document.getElementById('new-deal-industry').value.trim(),
      address: document.getElementById('new-deal-address').value.trim(),
      activities: [],
      tasks: [],
      createdAt: creationTime,
      stageHistory: [{ stage: 1, timestamp: creationTime }],
    };

    dealsData.unshift(newDeal);
    await saveDeals();
    renderKanban();
    newDealModal.classList.remove('active');
    setActiveTab('funnel');
  });

  // --- Global follow-up suggestion (Automations tab) ---
  generateFollowupBtn.addEventListener('click', () => {
    const t = LANG_STRINGS[currentLang];
    callGeminiAPI(t.followupPrompt, geminiFollowupOutput).then((text) => {
      if (text) {
        const autoText = document.getElementById('bale-auto-text');
        if (autoText) autoText.value = text;
      }
    });
  });

  function renderActivityTimeline(activities) {
    const container = document.getElementById('activity-timeline-container');
    if (!container) return;
    const t = LANG_STRINGS[currentLang];
    container.innerHTML =
      activities
        .map(
          (act) => `
        <div class="flex items-start space-x-3 space-x-reverse">
          <div class="text-xl pt-1">${activityIcons[act.type] || '📌'}</div>
          <div class="flex-1">
            <p class="text-sm">${act.text}</p>
            <p class="text-xs text-gray-500 mt-1">${act.user} • ${
            act.time
          }</p>
          </div>
        </div>
      `,
        )
        .join('') ||
      `<p class="text-sm text-gray-500 text-center py-4">${t.noActivities}</p>`;
  }

  function buildActivitiesText(activities) {
    if (!activities || !activities.length)
      return 'هیچ فعالیتی ثبت نشده است.';
    return activities
      .map(
        (a, idx) =>
          `${idx + 1}. نوع: ${a.type}، توسط ${a.user}، زمان: ${
            a.time
          }، توضیح: ${a.text}`,
      )
      .join('\n');
  }

  function renderDealDetailPage(deal) {
    currentDealData = deal;
    const detailContent = document.getElementById('deal-detail-content');
    document.getElementById('detail-header-title').textContent = deal.name;

    const t = LANG_STRINGS[currentLang];

    detailContent.innerHTML = `
      <div class="grid grid-cols-2 detail-metrics-grid">
        <div class="bg-white md-card detail-metrics-card p-3">
          <h3 class="font-semibold text-gray-500 text-sm mb-1">${t.detailValue}</h3>
          <p class="text-green-600 font-bold text-lg">${deal.value}</p>
        </div>
        <div class="bg-white md-card detail-metrics-card p-3">
          <h3 class="font-semibold text-gray-500 text-sm mb-1">${t.detailOwner}</h3>
          <p class="font-semibold">${deal.owner}</p>
        </div>
      </div>

      <!-- Deal Details Card with Inline Editing -->
      <div class="bg-white md-card p-4 md-section-spacing" id="deal-info-card">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-bold text-md">${t.dealInfoTitle}</h3>
          <button id="edit-info-btn" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">${t.editBtn}</button>
        </div>
        <div id="deal-info-display" class="space-y-2 text-sm">
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">${t.detailContact}</span>
            <span class="font-medium" id="info-contact-val">${deal.contact || '—'}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">${t.detailPhone}</span>
            <span class="font-medium" id="info-phone-val">${deal.phone || '—'}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">${t.detailWebsite}</span>
            <span class="font-medium" id="info-website-val">
              ${deal.website ? `<a href="${deal.website.startsWith('http') ? deal.website : 'https://' + deal.website}" target="_blank" class="text-indigo-600 hover:underline">${deal.website}</a>` : '—'}
            </span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">${t.detailIndustry}</span>
            <span class="font-medium" id="info-industry-val">${deal.industry || '—'}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">${t.detailAddress}</span>
            <span class="font-medium text-left" id="info-address-val">${deal.address || '—'}</span>
          </div>
        </div>
        <form id="deal-info-edit-form" style="display: none;" class="space-y-3 mt-2">
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailContact}</label>
            <input type="text" id="edit-contact-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.contact || ''}">
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailPhone}</label>
            <input type="text" id="edit-phone-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.phone || ''}">
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailWebsite}</label>
            <input type="text" id="edit-website-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.website || ''}">
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailIndustry}</label>
            <input type="text" id="edit-industry-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.industry || ''}">
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailAddress}</label>
            <input type="text" id="edit-address-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.address || ''}">
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailValue}</label>
            <input type="text" id="edit-value-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.value || ''}">
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailOwner}</label>
            <input type="text" id="edit-owner-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.owner || ''}">
          </div>
          <div class="flex justify-end space-x-2 space-x-reverse pt-2 border-t border-gray-100">
            <button type="button" id="cancel-info-btn" class="px-3 py-1.5 rounded bg-gray-100 text-xs text-gray-700 hover:bg-gray-200">${t.cancelBtn}</button>
            <button type="submit" class="px-3 py-1.5 rounded bg-indigo-600 text-xs text-white hover:bg-indigo-700 font-medium">${t.saveBtn}</button>
          </div>
        </form>
      </div>

      <!-- Bale Messenger Panel Card -->
      <div class="bg-white md-card p-4 md-section-spacing" id="deal-bale-card">
        <h3 class="font-bold text-md mb-1">${t.balePanelTitle}</h3>
        <p class="text-xs text-gray-500 mb-4">${t.balePanelDesc}</p>
        
        <div id="bale-no-config-warn" class="p-3 bg-red-50 text-red-700 rounded-lg text-sm" style="display: none;">
          ${t.baleNoConfig}
        </div>
        
        <div id="bale-config-active" class="space-y-4" style="display: none;">
          <!-- Phone Number Input -->
          <div>
            <label class="text-xs text-gray-500 block mb-1">${t.detailPhone}</label>
            <div class="flex gap-2">
              <input type="text" id="bale-phone-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" value="${deal.phone || ''}" placeholder="${t.balePhonePlaceholder}">
              <button type="button" id="bale-phone-check-btn" class="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">${currentLang === 'fa' ? 'بررسی شماره' : 'Check Phone'}</button>
            </div>
            <div id="bale-phone-warn" class="text-xs mt-1 text-red-600 font-medium" style="display: none;"></div>
          </div>
          
          <!-- Message Type Tabs -->
          <div class="border-b border-gray-200">
            <nav class="flex space-x-4 space-x-reverse" aria-label="Bale Tabs">
              <button type="button" data-bale-tab="text" class="bale-tab pb-2 text-xs font-semibold border-b-2 border-indigo-600 text-indigo-600 active">${t.baleTypeSimple}</button>
              <button type="button" data-bale-tab="otp" class="bale-tab pb-2 text-xs font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">${t.baleTypeOTP}</button>
              <button type="button" data-bale-tab="file" class="bale-tab pb-2 text-xs font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">${t.baleTypeFile}</button>
            </nav>
          </div>
          
          <!-- Tab content 1: Text Message -->
          <div id="bale-tab-content-text" class="bale-tab-content active space-y-3">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs text-gray-500">${t.baleTypeSimple}</label>
                <button type="button" id="bale-insert-ai-text-btn" class="text-xs text-indigo-600 hover:underline" style="display: none;">${t.baleInsertAIFollowup}</button>
              </div>
              <textarea id="bale-text-input" rows="3" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" placeholder="${t.baleTextPlaceholder}"></textarea>
            </div>
            
            <!-- Secure Checkbox -->
            <div class="flex items-center">
              <input type="checkbox" id="bale-secure-check" class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
              <label for="bale-secure-check" class="mr-2 text-xs text-gray-700 select-none">${t.baleIsSecureLabel}</label>
            </div>
            
            <!-- Inline Buttons (Reply Markup) Builder -->
            <details class="group border border-gray-100 rounded-lg p-2 bg-gray-50">
              <summary class="flex justify-between items-center text-xs text-gray-600 cursor-pointer font-medium select-none">
                <span>${t.baleQuickButtonLabel}</span>
                <span class="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div class="space-y-3 mt-3 pt-2 border-t border-gray-200">
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="text-[10px] text-gray-500 block mb-0.5">${t.baleButtonTextLabel}</label>
                    <input type="text" id="bale-btn-text" class="w-full text-xs border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" placeholder="مشاهده وب‌سایت">
                  </div>
                  <div>
                    <label class="text-[10px] text-gray-500 block mb-0.5">${t.baleButtonActionLabel}</label>
                    <select id="bale-btn-action" class="w-full text-xs border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white">
                      <option value="url">${t.baleActionUrl}</option>
                      <option value="copy_text">${t.baleActionCopy}</option>
                      <option value="web_app">${t.baleActionWebApp}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="text-[10px] text-gray-500 block mb-0.5">${t.baleButtonValueLabel}</label>
                  <input type="text" id="bale-btn-val" class="w-full text-xs border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" placeholder="https://example.com">
                </div>
              </div>
            </details>
          </div>
          
          <!-- Tab content 2: OTP Message -->
          <div id="bale-tab-content-otp" class="bale-tab-content space-y-3" style="display: none;">
            <div>
              <label class="text-xs text-gray-500 block mb-1">${t.baleTypeOTP}</label>
              <input type="text" id="bale-otp-input" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" placeholder="${t.baleOtpPlaceholder}">
            </div>
          </div>
          
          <!-- Tab content 3: File Upload -->
          <div id="bale-tab-content-file" class="bale-tab-content space-y-3" style="display: none;">
            <div>
              <label class="text-xs text-gray-500 block mb-1">${t.baleFileLabel}</label>
              <input type="file" id="bale-file-input" class="w-full text-xs border border-gray-200 rounded p-2 focus:border-indigo-600 focus:outline-none bg-white">
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">${currentLang === 'fa' ? 'کپشن فایل (اختیاری)' : 'File Caption (Optional)'}</label>
              <input type="text" id="bale-file-caption" class="w-full text-sm border border-gray-200 rounded p-1.5 focus:border-indigo-600 focus:outline-none bg-white" placeholder="توضیح مربوط به فایل...">
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="bale-file-secure" class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
              <label for="bale-file-secure" class="mr-2 text-xs text-gray-700 select-none">${t.baleIsSecureLabel}</label>
            </div>
          </div>
          
          <!-- Send Button and Status Message -->
          <div>
            <button type="button" id="bale-send-btn" class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-semibold transition-colors flex justify-center items-center gap-2">
              <span>${t.baleBtnSend}</span>
            </button>
            <div id="bale-send-status" class="text-xs mt-2 p-2.5 rounded-lg" style="display: none;"></div>
          </div>
        </div>
      </div>

      <div class="bg-white md-card p-4 md-section-spacing">
        <h3 class="font-bold text-md mb-3">${t.detailAssistantTitle}</h3>
        <div class="space-y-3">
          <button id="detail-generate-summary-btn" class="w-full md-tonal-button flex items-center justify-between">
            <span>${t.detailSummaryButton}</span><span>→</span>
          </button>
          <button id="detail-generate-action-btn" class="w-full md-tonal-button flex items-center justify-between">
            <span>${t.detailNextActionButton}</span><span>→</span>
          </button>
        </div>
        <div id="detail-gemini-output" class="mt-4 p-3 bg-gray-100 rounded-lg text-sm" style="display: none;"></div>
      </div>

      <div class="md-section-spacing">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-4 space-x-reverse" aria-label="Tabs">
            <div class="detail-tabs-shell">
              <button data-tab="activities" class="detail-tab whitespace-nowrap text-sm active">${t.detailActivitiesTab}</button>
              <button data-tab="tasks" class="detail-tab whitespace-nowrap text-sm">${t.detailTasksTab}</button>
            </div>
          </nav>
        </div>
        <div class="mt-4">
          <div id="tab-activities" class="detail-tab-content active">
            <div id="activity-timeline-container" class="space-y-4 activity-timeline-card"></div>
            <div class="mt-6 pt-4 border-t border-gray-200">
              <h4 class="font-bold mb-3 text-gray-800">${t.activityFormTitle}</h4>
              <form id="add-activity-form">
                <div class="md-text-field">
                  <textarea id="activity-text" rows="3" placeholder="${t.activityFormPlaceholder}"></textarea>
                </div>
                <div class="my-3 flex justify-between items-center">
                  <div class="flex items-center space-x-2 space-x-reverse" id="activity-type-selector">
                    <button type="button" data-type="note" title="یادداشت" class="activity-type-btn md-icon-button surface transition-all duration-200">📝</button>
                    <button type="button" data-type="call" title="تماس" class="activity-type-btn md-icon-button surface transition-all duration-200">📞</button>
                    <button type="button" data-type="email" title="ایمیل" class="activity-type-btn md-icon-button surface transition-all duration-200">✉️</button>
                    <button type="button" data-type="meeting" title="جلسه" class="activity-type-btn md-icon-button surface transition-all duration-200">👥</button>
                  </div>
                  <button type="submit" class="md-filled-button">${t.activityFormSubmit}</button>
                </div>
              </form>
            </div>
          </div>
          <div id="tab-tasks" class="detail-tab-content space-y-3">
            ${
              deal.tasks.length
                ? deal.tasks
                    .map(
                      (task) => `
              <div class="flex items-center bg-white md-card p-3">
                <input type="checkbox" class="ml-3 h-5 w-5 rounded border-gray-300" ${
                  task.done ? 'checked' : ''
                }>
                <div class="flex-1">
                  <p class="text-sm ${
                    task.done ? 'line-through text-gray-500' : ''
                  }">${task.text}</p>
                  <p class="text-xs text-red-600">${task.due}</p>
                </div>
              </div>
            `,
                    )
                    .join('')
                : `<p class="text-sm text-gray-500 text-center py-4">${t.noTasks}</p>`
            }
          </div>
        </div>
      </div>
    `;

    renderActivityTimeline(deal.activities);

    const detailGeminiOutput = document.getElementById('detail-gemini-output');
    const activitiesText = buildActivitiesText(deal.activities);
    const stageName = stagesData.find((s) => s.id === deal.stage).name;

    // --- AI Option Suggestion Check ---
    const insertAIBtn = document.getElementById('bale-insert-ai-text-btn');
    const checkAIOption = () => {
      if (insertAIBtn && detailGeminiOutput && detailGeminiOutput.style.display !== 'none' && detailGeminiOutput.textContent.trim() && !detailGeminiOutput.textContent.startsWith('Error') && !detailGeminiOutput.textContent.startsWith('خطا')) {
        insertAIBtn.style.display = 'inline-block';
      } else if (insertAIBtn) {
        insertAIBtn.style.display = 'none';
      }
    };

    if (insertAIBtn) {
      insertAIBtn.addEventListener('click', () => {
        const textInput = document.getElementById('bale-text-input');
        if (textInput && detailGeminiOutput) {
          textInput.value = detailGeminiOutput.textContent.trim();
        }
      });
    }

    document
      .getElementById('detail-generate-summary-btn')
      .addEventListener('click', () => {
        const t = LANG_STRINGS[currentLang];
        const prompt = t.summaryPrompt(deal, stageName, activitiesText);
        callGeminiAPI(prompt, detailGeminiOutput).then(() => {
          checkAIOption();
        });
      });

    document
      .getElementById('detail-generate-action-btn')
      .addEventListener('click', () => {
        const t = LANG_STRINGS[currentLang];
        const prompt = t.nextActionPrompt(deal, stageName, activitiesText);
        callGeminiAPI(prompt, detailGeminiOutput).then(() => {
          checkAIOption();
        });
      });

    // --- Inline Specifications Card Editing ---
    const editInfoBtn = document.getElementById('edit-info-btn');
    const cancelInfoBtn = document.getElementById('cancel-info-btn');
    const dealInfoDisplay = document.getElementById('deal-info-display');
    const dealInfoEditForm = document.getElementById('deal-info-edit-form');

    if (editInfoBtn && cancelInfoBtn && dealInfoDisplay && dealInfoEditForm) {
      editInfoBtn.addEventListener('click', () => {
        dealInfoDisplay.style.display = 'none';
        dealInfoEditForm.style.display = 'block';
        editInfoBtn.style.display = 'none';
      });

      cancelInfoBtn.addEventListener('click', () => {
        dealInfoDisplay.style.display = 'block';
        dealInfoEditForm.style.display = 'none';
        editInfoBtn.style.display = 'inline-block';
      });

      dealInfoEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newContact = document.getElementById('edit-contact-input').value.trim();
        const newPhone = document.getElementById('edit-phone-input').value.trim();
        const newWebsite = document.getElementById('edit-website-input').value.trim();
        const newIndustry = document.getElementById('edit-industry-input').value.trim();
        const newAddress = document.getElementById('edit-address-input').value.trim();
        const newValue = document.getElementById('edit-value-input').value.trim();
        const newOwner = document.getElementById('edit-owner-input').value.trim();

        // Update fields
        deal.contact = newContact;
        deal.phone = newPhone;
        deal.website = newWebsite;
        deal.industry = newIndustry;
        deal.address = newAddress;
        deal.value = newValue;
        deal.owner = newOwner;

        // Persist
        const idx = dealsData.findIndex((d) => d.id === deal.id);
        if (idx !== -1) {
          dealsData[idx] = deal;
          await saveDeals();
        }

        renderDealDetailPage(deal);
        renderKanban();
      });
    }

    // --- Bale Messenger Configurations & Bindings ---
    const baleNoConfigWarn = document.getElementById('bale-no-config-warn');
    const baleConfigActive = document.getElementById('bale-config-active');
    
    let baleKey = '';
    let baleBotId = 0;

    chrome.storage.sync.get(['zeno_bale_api_key', 'zeno_bale_bot_id'], (syncData) => {
      baleKey = syncData.zeno_bale_api_key || '';
      baleBotId = parseInt(syncData.zeno_bale_bot_id, 10) || 0;

      if (!baleKey || !baleBotId) {
        if (baleNoConfigWarn) baleNoConfigWarn.style.display = 'block';
        if (baleConfigActive) baleConfigActive.style.display = 'none';
      } else {
        if (baleNoConfigWarn) baleNoConfigWarn.style.display = 'none';
        if (baleConfigActive) baleConfigActive.style.display = 'block';
      }
    });

    const balePhoneInput = document.getElementById('bale-phone-input');
    const balePhoneWarn = document.getElementById('bale-phone-warn');
    const checkBtn = document.getElementById('bale-phone-check-btn');

    function validatePhoneNumber() {
      if (!balePhoneInput || !balePhoneWarn) return false;
      const rawVal = balePhoneInput.value.trim();
      const formatted = formatBalePhoneNumber(rawVal);
      if (!formatted) {
        balePhoneWarn.textContent = currentLang === 'fa' ? 'شماره تلفن خالی است.' : 'Phone number is empty.';
        balePhoneWarn.style.display = 'block';
        balePhoneWarn.className = 'text-xs mt-1 text-red-600';
        return false;
      }
      
      const regex = /^989\d{9}$/;
      if (!regex.test(formatted)) {
        balePhoneWarn.textContent = currentLang === 'fa' 
          ? `فرمت نامعتبر است: ${formatted} (باید با ۹۸ شروع شده و مجموعاً ۱۲ رقم باشد)`
          : `Invalid format: ${formatted} (must start with 98 and be exactly 12 digits)`;
        balePhoneWarn.style.display = 'block';
        balePhoneWarn.className = 'text-xs mt-1 text-red-600';
        return false;
      } else {
        balePhoneWarn.textContent = currentLang === 'fa' ? `فرمت معتبر است: ${formatted}` : `Valid format: ${formatted}`;
        balePhoneWarn.style.display = 'block';
        balePhoneWarn.className = 'text-xs mt-1 text-green-600';
        return formatted;
      }
    }

    if (checkBtn) {
      checkBtn.addEventListener('click', validatePhoneNumber);
    }

    // Tabs toggle logic for Bale Messenger
    const baleTabs = detailContent.querySelectorAll('.bale-tab');
    const baleTabContents = detailContent.querySelectorAll('.bale-tab-content');
    let activeBaleTab = 'text';

    baleTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        baleTabs.forEach((t) => {
          t.classList.remove('border-indigo-600', 'text-indigo-600', 'active');
          t.classList.add('border-transparent', 'text-gray-500');
        });
        tab.classList.add('border-indigo-600', 'text-indigo-600', 'active');
        tab.classList.remove('border-transparent', 'text-gray-500');
        
        activeBaleTab = tab.dataset.baleTab;
        baleTabContents.forEach((content) => {
          const isTarget = content.id === `bale-tab-content-${activeBaleTab}`;
          content.style.display = isTarget ? 'block' : 'none';
        });
      });
    });

    // Send Button Logic
    const sendBtn = document.getElementById('bale-send-btn');
    const baleStatus = document.getElementById('bale-send-status');

    if (sendBtn && baleStatus) {
      sendBtn.addEventListener('click', async () => {
        const validPhone = validatePhoneNumber();
        if (!validPhone) return;

        baleStatus.style.display = 'none';
        baleStatus.textContent = '';
        
        sendBtn.disabled = true;
        const originalBtnText = sendBtn.innerHTML;
        
        try {
          if (activeBaleTab === 'text') {
            const textVal = document.getElementById('bale-text-input').value.trim();
            if (!textVal) {
              throw new Error(currentLang === 'fa' ? 'متن پیام خالی است.' : 'Message text is empty.');
            }
            
            const isSecure = document.getElementById('bale-secure-check').checked;
            
            // Glass buttons builder
            let replyMarkup = null;
            const btnText = document.getElementById('bale-btn-text').value.trim();
            const btnAction = document.getElementById('bale-btn-action').value;
            const btnVal = document.getElementById('bale-btn-val').value.trim();
            
            if (btnText && btnVal) {
              const buttonObj = { text: btnText };
              if (btnAction === 'url') buttonObj.url = btnVal;
              else if (btnAction === 'copy_text') buttonObj.copy_text = btnVal;
              else if (btnAction === 'web_app') buttonObj.web_app = { url: btnVal };
              
              replyMarkup = {
                inline_keyboard: [[buttonObj]]
              };
            }
            
            sendBtn.querySelector('span').textContent = t.baleBtnSending;
            
            const response = await sendBaleTextMessage(baleKey, baleBotId, validPhone, textVal, isSecure, replyMarkup);
            showBaleSuccess(response.message_id, validPhone, `متن: ${textVal.substring(0, 30)}...`);
            document.getElementById('bale-text-input').value = '';
            
          } else if (activeBaleTab === 'otp') {
            const otpVal = document.getElementById('bale-otp-input').value.trim();
            if (!otpVal || !/^\d+$/.test(otpVal)) {
              throw new Error(currentLang === 'fa' ? 'رمز یکبارمصرف نامعتبر است (فقط عدد مجاز است).' : 'Invalid OTP code (digits only).');
            }
            
            sendBtn.querySelector('span').textContent = t.baleBtnSending;
            
            const response = await sendBaleOTPMessage(baleKey, baleBotId, validPhone, otpVal);
            showBaleSuccess(response.message_id, validPhone, `رمز یکبارمصرف: ${otpVal}`);
            document.getElementById('bale-otp-input').value = '';
            
          } else if (activeBaleTab === 'file') {
            const fileInput = document.getElementById('bale-file-input');
            const file = fileInput.files[0];
            if (!file) {
              throw new Error(currentLang === 'fa' ? 'فایلی انتخاب نشده است.' : 'No file selected.');
            }
            
            const captionVal = document.getElementById('bale-file-caption').value.trim();
            const isSecure = document.getElementById('bale-file-secure').checked;
            
            sendBtn.querySelector('span').textContent = t.baleBtnUploading;
            
            const uploadResponse = await uploadBaleFile(baleKey, file);
            const fileId = uploadResponse.file_id;
            
            if (!fileId) {
              throw new Error(currentLang === 'fa' ? 'آپلود فایل ناموفق بود.' : 'File upload failed.');
            }
            
            sendBtn.querySelector('span').textContent = t.baleBtnSending;
            const response = await sendBaleMediaMessage(baleKey, baleBotId, validPhone, fileId, captionVal, isSecure);
            
            showBaleSuccess(response.message_id, validPhone, `فایل (شناسه: ${fileId.substring(0, 10)}...) با کپشن: ${captionVal || 'ندارد'}`);
            fileInput.value = '';
            document.getElementById('bale-file-caption').value = '';
          }
        } catch (err) {
          console.error(err);
          baleStatus.textContent = t.baleError + err.message;
          baleStatus.className = 'text-xs mt-2 p-2.5 rounded-lg bg-red-50 text-red-700';
          baleStatus.style.display = 'block';
        } finally {
          sendBtn.disabled = false;
          sendBtn.innerHTML = originalBtnText;
        }
      });
    }

    function showBaleSuccess(msgId, phoneNumber, desc) {
      if (!baleStatus) return;
      baleStatus.textContent = t.baleSuccess + msgId;
      baleStatus.className = 'text-xs mt-2 p-2.5 rounded-lg bg-green-50 text-green-700';
      baleStatus.style.display = 'block';
      
      const newActivity = {
        type: 'bale',
        user: currentUser,
        time: 'همین الان',
        text: `ارسال موفق پیام بله به شماره ${phoneNumber} (${desc}) [شناسه پیام: ${msgId}]`
      };
      
      deal.activities.unshift(newActivity);
      
      const idx = dealsData.findIndex((d) => d.id === deal.id);
      if (idx !== -1) {
        dealsData[idx] = deal;
        saveDeals();
      }
      
      renderActivityTimeline(deal.activities);
    }

    const detailTabs = detailContent.querySelectorAll('.detail-tab');
    const detailTabContents = detailContent.querySelectorAll(
      '.detail-tab-content',
    );
    detailTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        detailTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        detailTabContents.forEach((c) =>
          c.classList.toggle('active', c.id === `tab-${tab.dataset.tab}`),
        );
      });
    });

    const activityForm = document.getElementById('add-activity-form');
    const activityTypeSelector = document.getElementById(
      'activity-type-selector',
    );
    const activityTypeButtons =
      activityTypeSelector.querySelectorAll('.activity-type-btn');
    let selectedActivityType = 'note';

    const setActiveTypeButton = (type) => {
      activityTypeButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.type === type);
      });
    };

    activityTypeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedActivityType = btn.dataset.type;
        setActiveTypeButton(selectedActivityType);
      });
    });

    setActiveTypeButton(selectedActivityType);

    activityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const activityTextEl = document.getElementById('activity-text');
      const activityText = activityTextEl.value.trim();
      if (activityText === '') return;

      const newActivity = {
        type: selectedActivityType,
        user: currentUser,
        time: 'همین الان',
        text: activityText,
      };

      currentDealData.activities.unshift(newActivity);

      const idx = dealsData.findIndex((d) => d.id === currentDealData.id);
      if (idx !== -1) {
        dealsData[idx] = currentDealData;
        await saveDeals();
      }

      renderActivityTimeline(currentDealData.activities);
      activityTextEl.value = '';
    });

    const taskTab = document.getElementById('tab-tasks');
    if (taskTab) {
      taskTab.querySelectorAll('input[type="checkbox"]').forEach((checkbox, taskIdx) => {
        checkbox.addEventListener('change', async () => {
          if (deal.tasks && deal.tasks[taskIdx]) {
            deal.tasks[taskIdx].done = checkbox.checked;
            
            const textEl = checkbox.nextElementSibling.querySelector('p.text-sm');
            if (textEl) {
              if (checkbox.checked) {
                textEl.classList.add('line-through', 'text-gray-500');
              } else {
                textEl.classList.remove('line-through', 'text-gray-500');
              }
            }
            
            const idx = dealsData.findIndex((d) => d.id === deal.id);
            if (idx !== -1) {
              dealsData[idx] = deal;
              await saveDeals();
            }
          }
        });
      });
    }

    mainAppView.classList.remove('active');
    dealDetailPage.classList.add('active');
  }

  let draggedDealId = null;

  function renderKanban() {
    const kanbanContainer = document.getElementById('kanban-container');
    const dotsContainer = document.getElementById('kanban-dots');
    kanbanContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    stagesData.forEach((stage, index) => {
      const stageDeals = dealsData.filter((d) => d.stage === stage.id);
      const dealsHtml = stageDeals
        .map((deal) => {
          const probColor =
            deal.prob > 70 ? 'green' : deal.prob > 40 ? 'yellow' : 'red';
          return `
          <div class="deal-card bg-white p-3 rounded-lg shadow-sm border cursor-pointer" data-deal-id="${deal.id}" draggable="true">
            <h3 class="font-semibold">${deal.name}</h3>
            <p class="text-sm text-green-600">${deal.value}</p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex space-x-1 space-x-reverse">
                ${deal.tags
                  .map(
                    (t) =>
                      `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">${t}</span>`,
                  )
                  .join('')}
              </div>
              <div class="text-xs font-bold text-${probColor}-700 bg-${probColor}-100 px-2 py-1 rounded-full">
                ${deal.prob}%
              </div>
            </div>
          </div>`;
        })
        .join('');

      const stageEl = document.createElement('div');
      stageEl.className = 'kanban-stage p-4';
      stageEl.dataset.stageId = String(stage.id);
      stageEl.innerHTML = `
        <div class="kanban-stage-header">
          <h2 class="font-bold text-lg">
            ${stage.name}
          </h2>
          <span class="text-sm font-normal text-gray-500">(${stageDeals.length})</span>
        </div>
        <div class="kanban-stage-body space-y-3" data-stage-id="${stage.id}">
          ${dealsHtml}
        </div>
      `;
      kanbanContainer.appendChild(stageEl);

      dotsContainer.innerHTML += `<div class="w-2 h-2 rounded-full transition-all duration-300 ${
        index === 0 ? 'bg-indigo-600' : 'bg-gray-300'
      }"></div>`;
    });

    document.querySelectorAll('.deal-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.dealId, 10);
        const deal = dealsData.find((d) => d.id === id);
        if (deal) renderDealDetailPage(deal);
      });

      card.addEventListener('dragstart', (e) => {
        draggedDealId = parseInt(card.dataset.dealId, 10);
        card.classList.add('dragging');
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', card.dataset.dealId || '');
        }
      });

      card.addEventListener('dragend', () => {
        draggedDealId = null;
        card.classList.remove('dragging');
        document
          .querySelectorAll('.kanban-stage.drop-target')
          .forEach((stage) => stage.classList.remove('drop-target'));
      });
    });

    document.querySelectorAll('.kanban-stage-body').forEach((stageBody) => {
      const stageId = parseInt(stageBody.dataset.stageId, 10);
      const stageRoot = stageBody.closest('.kanban-stage');

      ['dragenter', 'dragover'].forEach((eventName) => {
        stageBody.addEventListener(eventName, (e) => {
          if (!draggedDealId) return;
          e.preventDefault();
          if (stageRoot) stageRoot.classList.add('drop-target');
        });
      });

      stageBody.addEventListener('dragleave', () => {
        if (stageRoot) stageRoot.classList.remove('drop-target');
      });

      stageBody.addEventListener('drop', async (e) => {
        e.preventDefault();
        if (stageRoot) stageRoot.classList.remove('drop-target');
        if (!draggedDealId) return;
        const dealIdx = dealsData.findIndex((d) => d.id === draggedDealId);
        if (dealIdx === -1) return;
        const oldStageId = dealsData[dealIdx].stage;
        dealsData[dealIdx].stage = stageId;
        if (!dealsData[dealIdx].stageHistory) {
          dealsData[dealIdx].stageHistory = [{ stage: oldStageId, timestamp: dealsData[dealIdx].createdAt || Date.now() }];
        }
        dealsData[dealIdx].stageHistory.push({ stage: stageId, timestamp: Date.now() });
        await saveDeals();
        draggedDealId = null;
        renderKanban();
      });
    });
  }

  let charts = {};

  function normalizeDigits(str) {
    if (!str) return '';
    const persian = '۰۱۲۳۴۵۶۷۸۹';
    const arabic = '٠١٢٣٤٥٦٧٨٩';
    return String(str)
      .split('')
      .map((ch) => {
        const pIndex = persian.indexOf(ch);
        if (pIndex !== -1) return String(pIndex);
        const aIndex = arabic.indexOf(ch);
        if (aIndex !== -1) return String(aIndex);
        return ch;
      })
      .join('');
  }

  function parseTomanToMillions(valueStr) {
    if (!valueStr || typeof valueStr !== 'string') return 0;
    const normalized = normalizeDigits(valueStr);
    const digitsOnly = normalized.replace(/[^\d]/g, '');
    if (!digitsOnly) return 0;
    const asNumber = parseInt(digitsOnly, 10);
    if (Number.isNaN(asNumber)) return 0;
    return asNumber / 1000000;
  }

  function buildReportsMetrics() {
    const stageLabels = stagesData.map((s) => s.name);
    const stageValueTotals = stagesData.map(() => 0);
    const stageDealCounts = stagesData.map(() => 0);
    const stageWeightedValues = stagesData.map(() => 0); // value × probability
    const customersMap = Object.create(null);

    // Activity breakdown across all deals
    const activityTotals = { call: 0, email: 0, meeting: 0, note: 0 };
    // Activities per owner
    const ownerMetrics = Object.create(null);
    // Task stats
    let totalTasks = 0;
    let completedTasks = 0;
    // Per-deal raw values (toman, not millions) for precise formatting
    const dealRawValues = [];

    dealsData.forEach((deal) => {
      const stageIndex = stagesData.findIndex((s) => s.id === deal.stage);
      const dealValueM = parseTomanToMillions(deal.value || '');
      const rawValue = parseTomanRaw(deal.value || '');
      dealRawValues.push({ deal, valueM: dealValueM, raw: rawValue });

      if (stageIndex !== -1) {
        stageValueTotals[stageIndex] += dealValueM;
        stageDealCounts[stageIndex] += 1;
        stageWeightedValues[stageIndex] +=
          dealValueM * ((deal.prob || 0) / 100);
      }

      const companyName = (deal.company || deal.name || '').trim();
      if (companyName) {
        if (!customersMap[companyName]) {
          customersMap[companyName] = {
            value: 0,
            deals: 0,
            stages: [],
            avgProb: 0,
            totalProb: 0,
          };
        }
        customersMap[companyName].value += dealValueM;
        customersMap[companyName].deals += 1;
        customersMap[companyName].stages.push(deal.stage);
        customersMap[companyName].totalProb += deal.prob || 0;
      }

      // Count activities
      (deal.activities || []).forEach((a) => {
        if (activityTotals.hasOwnProperty(a.type)) {
          activityTotals[a.type]++;
        }
      });

      // Owner metrics
      const owner = deal.owner || '—';
      if (!ownerMetrics[owner]) {
        ownerMetrics[owner] = {
          deals: 0,
          value: 0,
          totalProb: 0,
          activities: 0,
          tasks: 0,
          completedTasks: 0,
          stages: {},
        };
      }
      ownerMetrics[owner].deals++;
      ownerMetrics[owner].value += dealValueM;
      ownerMetrics[owner].totalProb += deal.prob || 0;
      ownerMetrics[owner].activities += (deal.activities || []).length;
      const stName = stagesData.find((s) => s.id === deal.stage);
      if (stName) {
        ownerMetrics[owner].stages[stName.name] =
          (ownerMetrics[owner].stages[stName.name] || 0) + 1;
      }

      // Task stats
      (deal.tasks || []).forEach((task) => {
        totalTasks++;
        ownerMetrics[owner].tasks++;
        if (task.done) {
          completedTasks++;
          ownerMetrics[owner].completedTasks++;
        }
      });
    });

    // Finalize customer map
    Object.keys(customersMap).forEach((k) => {
      const c = customersMap[k];
      c.avgProb = c.deals > 0 ? Math.round(c.totalProb / c.deals) : 0;
    });

    const topCustomersEntries = Object.entries(customersMap)
      .sort((a, b) => b[1].value - a[1].value)
      .slice(0, 5);

    const topCustomerLabels = topCustomersEntries.map((entry) => entry[0]);
    const topCustomerValues = topCustomersEntries.map((entry) =>
      Number(entry[1].value.toFixed(1)),
    );

    const roundedStageValues = stageValueTotals.map((v) =>
      Number(v.toFixed(1)),
    );
    const roundedWeightedValues = stageWeightedValues.map((v) =>
      Number(v.toFixed(1)),
    );

    // Conversion rates: cumulative from stage 1
    const conversionFromFirst = stageDealCounts.map((count) => {
      const firstStageCount = stageDealCounts[0];
      return firstStageCount > 0
        ? Number(((count / firstStageCount) * 100).toFixed(1))
        : 0;
    });

    // Stage-to-stage conversion (drop-off between adjacent stages)
    const stageToStageConversion = stageDealCounts.map((count, i) => {
      if (i === 0) return 100;
      const prev = stageDealCounts[i - 1];
      return prev > 0 ? Number(((count / prev) * 100).toFixed(1)) : 0;
    });

    return {
      stageLabels,
      stageValues: roundedStageValues,
      stageWeightedValues: roundedWeightedValues,
      stageCounts: stageDealCounts,
      topCustomerLabels,
      topCustomerValues,
      topCustomersMap: customersMap,
      activityTotals,
      ownerMetrics,
      totalTasks,
      completedTasks,
      taskCompletionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      conversionFromFirst,
      stageToStageConversion,
      dealRawValues,
    };
  }

  // Parse toman string → raw number (not millions)
  function parseTomanRaw(valueStr) {
    if (!valueStr || typeof valueStr !== 'string') return 0;
    const normalized = normalizeDigits(valueStr);
    const digitsOnly = normalized.replace(/[^\d]/g, '');
    if (!digitsOnly) return 0;
    const asNumber = parseInt(digitsOnly, 10);
    return Number.isNaN(asNumber) ? 0 : asNumber;
  }

  // Format number with Persian-friendly separator
  function formatToman(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') +
        (currentLang === 'fa' ? ' میلیارد' : 'B');
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) +
        (currentLang === 'fa' ? ' میلیون' : 'M');
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) +
        (currentLang === 'fa' ? ' هزار' : 'K');
    }
    return String(num);
  }

  function formatMillions(num) {
    if (num === 0) return '0';
    return num.toFixed(0) + (currentLang === 'fa' ? ' م.ت' : 'M');
  }

  function getJalaliMonth(gregorianDate) {
    const gMonth = gregorianDate.getMonth();
    const gDay = gregorianDate.getDate();
    if (gMonth === 2) return gDay >= 21 ? 0 : 11; // March -> Farvardin or Esfand
    if (gMonth === 3) return gDay >= 21 ? 1 : 0;  // April -> Ordibehesht or Farvardin
    if (gMonth === 4) return gDay >= 22 ? 2 : 1;  // May -> Khordad or Ordibehesht
    if (gMonth === 5) return gDay >= 22 ? 3 : 2;  // June -> Tir or Khordad
    if (gMonth === 6) return gDay >= 23 ? 4 : 3;  // July -> Mordad or Tir
    if (gMonth === 7) return gDay >= 23 ? 5 : 4;  // August -> Shahrivar or Mordad
    if (gMonth === 8) return gDay >= 23 ? 6 : 5;  // September -> Mehr or Shahrivar
    if (gMonth === 9) return gDay >= 23 ? 7 : 6;  // October -> Aban or Mehr
    if (gMonth === 10) return gDay >= 22 ? 8 : 7; // November -> Azar or Aban
    if (gMonth === 11) return gDay >= 22 ? 9 : 8; // December -> Dey or Azar
    if (gMonth === 0) return gDay >= 21 ? 10 : 9; // January -> Bahman or Dey
    if (gMonth === 1) return gDay >= 20 ? 11 : 10; // February -> Esfand or Bahman
    return 0;
  }

  function initCharts() {
    if (typeof Chart === 'undefined') {
      const msg = document.getElementById('reports-no-chart');
      if (msg) msg.style.display = 'block';
      return;
    }

    const msg = document.getElementById('reports-no-chart');
    if (msg) msg.style.display = 'none';

    const metrics = buildReportsMetrics();
    const ChartCtor = Chart.default || Chart;

    // Set Chart font to match selected language/app theme
    if (ChartCtor.defaults && ChartCtor.defaults.font) {
      ChartCtor.defaults.font.family = currentLang === 'fa' ? 'Vazirmatn, sans-serif' : 'system-ui';
    }

    // Destroy existing charts to avoid canvas reuse errors
    Object.keys(charts).forEach((key) => {
      if (charts[key] && typeof charts[key].destroy === 'function') {
        charts[key].destroy();
      }
    });
    charts = {};

    // ── KPI Cards ──────────────────────────────────────────
    const totalPipelineRaw = metrics.dealRawValues.reduce((sum, d) => sum + d.raw, 0);
    const activeDeals = dealsData.length;
    const avgDealValueRaw = activeDeals > 0 ? totalPipelineRaw / activeDeals : 0;

    // Win rate: deals in last stage / total deals
    const lastStage = stagesData[stagesData.length - 1];
    const wonDeals = dealsData.filter((d) => d.stage === lastStage.id).length;
    const winRate = activeDeals > 0 ? Math.round((wonDeals / activeDeals) * 100) : 0;

    document.getElementById('kpi-pipeline-value').textContent = formatToman(totalPipelineRaw);
    document.getElementById('kpi-pipeline-sub').textContent = currentLang === 'fa' ? 'تومان' : 'Toman';

    document.getElementById('kpi-active-deals').textContent = activeDeals;
    document.getElementById('kpi-deals-sub').textContent =
      currentLang === 'fa'
        ? `در ${stagesData.length} مرحله`
        : `across ${stagesData.length} stages`;

    document.getElementById('kpi-avg-value').textContent = formatToman(avgDealValueRaw);
    document.getElementById('kpi-avg-sub').textContent =
      currentLang === 'fa' ? 'تومان' : 'Toman';

    document.getElementById('kpi-win-rate').textContent = winRate + '%';
    document.getElementById('kpi-winrate-sub').textContent =
      currentLang === 'fa'
        ? `${wonDeals} از ${activeDeals} معامله`
        : `${wonDeals} of ${activeDeals} deals`;

    // KPI Labels
    const kpiLabels =
      currentLang === 'fa'
        ? {
            pipeline: 'ارزش کل پایپلاین',
            deals: 'معاملات فعال',
            avg: 'میانگین ارزش معامله',
            winrate: 'نرخ برد',
          }
        : {
            pipeline: 'Total Pipeline',
            deals: 'Active Deals',
            avg: 'Avg Deal Value',
            winrate: 'Win Rate',
          };
    document.getElementById('kpi-label-pipeline').textContent = kpiLabels.pipeline;
    document.getElementById('kpi-label-deals').textContent = kpiLabels.deals;
    document.getElementById('kpi-label-avg').textContent = kpiLabels.avg;
    document.getElementById('kpi-label-winrate').textContent = kpiLabels.winrate;

    // Report card titles
    const titles =
      currentLang === 'fa'
        ? {
            funnel: 'ارزش معاملات در مراحل فانل',
            dist: 'توزیع معاملات در مراحل',
            customers: 'مشتریان برتر بر اساس ارزش',
            conversion: 'نرخ تبدیل مراحل فانل',
            activity: 'تحلیل فعالیت‌ها',
            trend: 'روند ماهانه ورود سرنخ',
            winloss: 'نسبت برد / باخت',
            aging: 'میانگین مدت ماندگاری در هر مرحله',
            owner: 'عملکرد اعضای تیم',
          }
        : {
            funnel: 'Deal Value by Funnel Stage',
            dist: 'Deal Distribution by Stage',
            customers: 'Top Customers by Value',
            conversion: 'Stage Conversion Rate',
            activity: 'Activity Breakdown',
            trend: 'Monthly Lead Trend',
            winloss: 'Win / Loss Ratio',
            aging: 'Average Time in Each Stage',
            owner: 'Team Performance',
          };
    document.getElementById('report-title-funnel').textContent = titles.funnel;
    document.getElementById('report-title-dist').textContent = titles.dist;
    document.getElementById('report-title-customers').textContent = titles.customers;
    document.getElementById('report-title-conversion').textContent = titles.conversion;
    document.getElementById('report-title-activity').textContent = titles.activity;
    document.getElementById('report-title-trend').textContent = titles.trend;
    document.getElementById('report-title-winloss').textContent = titles.winloss;
    document.getElementById('report-title-aging').textContent = titles.aging;
    document.getElementById('report-title-owner').textContent = titles.owner;

    // Table headers
    if (currentLang === 'fa') {
      document.getElementById('th-owner-name').textContent = 'نام';
      document.getElementById('th-owner-deals').textContent = 'تعداد معاملات';
      document.getElementById('th-owner-value').textContent = 'ارزش کل';
      document.getElementById('th-owner-avg-prob').textContent = 'میانگین احتمال';
    } else {
      document.getElementById('th-owner-name').textContent = 'Name';
      document.getElementById('th-owner-deals').textContent = 'Deals';
      document.getElementById('th-owner-value').textContent = 'Total Value';
      document.getElementById('th-owner-avg-prob').textContent = 'Avg Probability';
    }

    // ── Chart 1: Funnel Value (Bar) ──────────────────────
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    charts.sales = new ChartCtor(salesCtx, {
      type: 'bar',
      data: {
        labels: metrics.stageLabels,
        datasets: [
          {
            label: currentLang === 'fa' ? 'ارزش کل' : 'Total Value',
            data: metrics.stageValues,
            backgroundColor: '#111111',
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: currentLang === 'fa' ? 'ارزش وزن‌دهی شده' : 'Weighted Value',
            data: metrics.stageWeightedValues,
            backgroundColor: '#888888',
            borderRadius: 6,
            borderSkipped: false,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { boxWidth: 12 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const val = context.raw || 0;
                return label + ': ' + formatToman(val * 1000000);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatToman(value * 1000000);
              }
            }
          }
        }
      },
    });

    // ── Chart 2: Deal Distribution (Doughnut) ────────────
    const lossCtx = document.getElementById('lossReasonChart').getContext('2d');
    charts.loss = new ChartCtor(lossCtx, {
      type: 'doughnut',
      data: {
        labels: metrics.stageLabels,
        datasets: [
          {
            data: metrics.stageCounts,
            backgroundColor: ['#111111', '#666666', '#bbbbbb'],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                const label = context.label || '';
                const suffix = currentLang === 'fa' ? `معامله (${pct}%)` : `deals (${pct}%)`;
                return `${label}: ${val} ${suffix}`;
              }
            }
          }
        }
      },
    });

    // ── Chart 3: Top Customers (Horizontal Bar) ──────────
    const customersCtx = document.getElementById('topCustomersChart').getContext('2d');
    charts.customers = new ChartCtor(customersCtx, {
      type: 'bar',
      data: {
        labels: metrics.topCustomerLabels,
        datasets: [
          {
            data: metrics.topCustomerValues,
            backgroundColor: '#555555',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                return (currentLang === 'fa' ? 'ارزش: ' : 'Value: ') + formatToman(val * 1000000);
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatToman(value * 1000000);
              }
            }
          }
        }
      },
    });

    // ── Chart 4: Conversion Rate (Bar) ───────────────────
    const convCtx = document.getElementById('conversionChart').getContext('2d');
    charts.conversion = new ChartCtor(convCtx, {
      type: 'bar',
      data: {
        labels: metrics.stageLabels,
        datasets: [
          {
            label: currentLang === 'fa' ? 'نرخ تبدیل انباشته' : 'Cumulative Conversion',
            data: metrics.conversionFromFirst,
            backgroundColor: '#888888',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                const i = context.dataIndex;
                const cum = metrics.conversionFromFirst[i];
                const step = metrics.stageToStageConversion[i];
                if (currentLang === 'fa') {
                  return [
                    `نرخ کل فانل: ${cum}%`,
                    `تبدیل از مرحله قبل: ${step}%`
                  ];
                } else {
                  return [
                    `Cumulative Conversion: ${cum}%`,
                    `From Previous Stage: ${step}%`
                  ];
                }
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (v) => v + '%',
            },
          },
        },
      },
    });

    // ── Chart 5: Activity Breakdown (Pie) ────────────────
    const actLabels =
      currentLang === 'fa'
        ? ['تماس', 'ایمیل', 'جلسه', 'یادداشت']
        : ['Call', 'Email', 'Meeting', 'Note'];

    const actCtx = document.getElementById('activityChart').getContext('2d');
    charts.activity = new ChartCtor(actCtx, {
      type: 'pie',
      data: {
        labels: actLabels,
        datasets: [
          {
            data: [
              metrics.activityTotals.call || 0,
              metrics.activityTotals.email || 0,
              metrics.activityTotals.meeting || 0,
              metrics.activityTotals.note || 0,
            ],
            backgroundColor: ['#111111', '#555555', '#999999', '#cccccc'],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
          }
        }
      },
    });

    // ── Chart 6: Monthly Trend (Line) ────────────────────
    const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNamesFa = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    const now = new Date();
    const trendBuckets = [];

    // Last 6 months buckets
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const jalaliMonthIdx = getJalaliMonth(d);
      trendBuckets.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        label: currentLang === 'fa' ? monthNamesFa[jalaliMonthIdx] : monthNamesEn[d.getMonth()],
        count: 0
      });
    }

    // Distribute deals into buckets
    dealsData.forEach((deal) => {
      if (!deal.createdAt) return;
      const createdDate = new Date(deal.createdAt);
      const diffMonths = (now.getFullYear() - createdDate.getFullYear()) * 12 + (now.getMonth() - createdDate.getMonth());
      if (diffMonths >= 0 && diffMonths < 6) {
        const bucketIndex = 5 - diffMonths;
        trendBuckets[bucketIndex].count++;
      }
    });

    const trendLabels = trendBuckets.map((b) => b.label);
    const trendData = trendBuckets.map((b) => b.count);

    const trendCtx = document.getElementById('trendChart').getContext('2d');
    charts.trend = new ChartCtor(trendCtx, {
      type: 'line',
      data: {
        labels: trendLabels,
        datasets: [
          {
            label: currentLang === 'fa' ? 'تعداد سرنخ' : 'Lead Count',
            data: trendData,
            borderColor: '#111111',
            backgroundColor: 'rgba(17, 17, 17, 0.05)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#111111',
            pointRadius: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          },
        },
      },
    });

    // ── Chart 7: Win/Loss Ratio (Doughnut) ───────────────
    const lastStageObj = stagesData[stagesData.length - 1];
    const wonCount = dealsData.filter((d) => d.stage === lastStageObj.id).length;
    const atRiskCount = dealsData.filter((d) => d.stage !== lastStageObj.id && d.prob < 40).length;
    const inProgressCount = Math.max(0, activeDeals - wonCount - atRiskCount);

    const wlLabels =
      currentLang === 'fa'
        ? ['موفق', 'در جریان', 'در معرض خطر']
        : ['Won', 'In Progress', 'At Risk'];

    const wlCtx = document.getElementById('winLossChart').getContext('2d');
    charts.winloss = new ChartCtor(wlCtx, {
      type: 'doughnut',
      data: {
        labels: wlLabels,
        datasets: [
          {
            data: [wonCount, inProgressCount, atRiskCount],
            backgroundColor: ['#111111', '#777777', '#dddddd'],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                const label = context.label || '';
                const suffix = currentLang === 'fa' ? `معامله (${pct}%)` : `deals (${pct}%)`;
                return `${label}: ${val} ${suffix}`;
              }
            }
          }
        }
      },
    });

    // ── Chart 8: Stage Aging (Bar) ───────────────────────
    const stageAgingDays = stagesData.map((stage) => {
      let totalDays = 0;
      let count = 0;

      dealsData.forEach((deal) => {
        const history = deal.stageHistory || [];
        for (let i = 0; i < history.length; i++) {
          if (history[i].stage === stage.id) {
            const entryTime = Number(history[i].timestamp);
            const exitTime = (i + 1 < history.length) ? Number(history[i + 1].timestamp) : Date.now();
            if (!isNaN(entryTime) && !isNaN(exitTime)) {
              const days = (exitTime - entryTime) / (1000 * 60 * 60 * 24);
              totalDays += days;
              count++;
            }
            break;
          }
        }
      });

      const avg = count > 0 ? totalDays / count : 0;
      return Number(avg.toFixed(1));
    });

    const agingCtx = document.getElementById('agingChart').getContext('2d');
    charts.aging = new ChartCtor(agingCtx, {
      type: 'bar',
      data: {
        labels: metrics.stageLabels,
        datasets: [
          {
            label: currentLang === 'fa' ? 'روز' : 'Days',
            data: stageAgingDays,
            backgroundColor: '#bbbbbb',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                return val + ' ' + (currentLang === 'fa' ? 'روز' : 'days');
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (v) =>
                currentLang === 'fa' ? v + ' روز' : v + 'd',
            },
          },
        },
      },
    });

    // ── Owner Performance Table ──────────────────────────
    const tbody = document.getElementById('owner-performance-body');
    tbody.innerHTML = '';
    const owners = Object.entries(metrics.ownerMetrics).sort((a, b) => b[1].value - a[1].value);
    owners.forEach(([name, data]) => {
      const avgProb = data.deals > 0 ? Math.round(data.totalProb / data.deals) : 0;
      const tr = document.createElement('tr');
      const formattedValue = formatToman(data.value * 1000000);
      tr.innerHTML = `
        <td>${name}</td>
        <td>${data.deals}</td>
        <td>${formattedValue}</td>
        <td>${avgProb}%</td>
      `;
      tbody.appendChild(tr);
    });
  }

  let baleAutoInitialized = false;

  function initBaleAutomationTab() {
    const autoCard = document.getElementById('bale-auto-card');
    if (!autoCard) return;

    chrome.storage.sync.get(['zeno_bale_api_key', 'zeno_bale_bot_id'], (syncData) => {
      const baleKey = syncData.zeno_bale_api_key || '';
      const baleBotId = parseInt(syncData.zeno_bale_bot_id, 10) || 0;

      if (!baleKey || !baleBotId) {
        autoCard.style.display = 'none';
        return;
      }

      autoCard.style.display = 'block';

      // Populate dropdown
      const selectEl = document.getElementById('bale-auto-deal-select');
      if (selectEl) {
        const currentSelectedId = selectEl.value;
        selectEl.innerHTML = `<option value="" id="bale-auto-option-default">${LANG_STRINGS[currentLang].baleAutoOptionDefault}</option>`;
        
        dealsData.forEach((deal) => {
          if (deal.phone) {
            const opt = document.createElement('option');
            opt.value = deal.id;
            opt.textContent = `${deal.name} (${deal.phone})`;
            if (String(deal.id) === currentSelectedId) {
              opt.selected = true;
            }
            selectEl.appendChild(opt);
          }
        });
      }

      if (baleAutoInitialized) return;
      baleAutoInitialized = true;

      const phoneInput = document.getElementById('bale-auto-phone');
      const textInput = document.getElementById('bale-auto-text');
      const sendBtn = document.getElementById('bale-auto-send-btn');
      const statusEl = document.getElementById('bale-auto-status');

      if (selectEl) {
        selectEl.addEventListener('change', () => {
          const dealId = parseInt(selectEl.value, 10);
          if (isNaN(dealId)) {
            phoneInput.value = '';
            return;
          }
          const deal = dealsData.find((d) => d.id === dealId);
          if (deal) {
            phoneInput.value = deal.phone || '';
          }
        });
      }

      if (sendBtn) {
        sendBtn.addEventListener('click', async () => {
          statusEl.style.display = 'none';
          statusEl.textContent = '';

          const dealId = parseInt(selectEl.value, 10);
          if (isNaN(dealId)) {
            statusEl.textContent = currentLang === 'fa' ? 'لطفاً یک معامله را انتخاب کنید.' : 'Please select a deal.';
            statusEl.className = 'text-xs mt-2 p-2.5 rounded-lg bg-red-50 text-red-700';
            statusEl.style.display = 'block';
            return;
          }

          const deal = dealsData.find((d) => d.id === dealId);
          if (!deal) {
            statusEl.textContent = currentLang === 'fa' ? 'معامله یافت نشد.' : 'Deal not found.';
            statusEl.className = 'text-xs mt-2 p-2.5 rounded-lg bg-red-50 text-red-700';
            statusEl.style.display = 'block';
            return;
          }

          const rawPhone = phoneInput.value.trim();
          const validPhone = formatBalePhoneNumber(rawPhone);
          const regex = /^989\d{9}$/;
          if (!validPhone || !regex.test(validPhone)) {
            statusEl.textContent = currentLang === 'fa' 
              ? `فرمت شماره تلفن نامعتبر است: ${validPhone || rawPhone} (باید با ۹۸ شروع شده و ۱۲ رقم باشد)`
              : `Invalid phone format: ${validPhone || rawPhone} (must start with 98 and be 12 digits)`;
            statusEl.className = 'text-xs mt-2 p-2.5 rounded-lg bg-red-50 text-red-700';
            statusEl.style.display = 'block';
            return;
          }

          const textVal = textInput.value.trim();
          if (!textVal) {
            statusEl.textContent = currentLang === 'fa' ? 'متن پیام خالی است.' : 'Message text is empty.';
            statusEl.className = 'text-xs mt-2 p-2.5 rounded-lg bg-red-50 text-red-700';
            statusEl.style.display = 'block';
            return;
          }

          sendBtn.disabled = true;
          const originalBtnText = sendBtn.innerHTML;
          sendBtn.textContent = LANG_STRINGS[currentLang].baleBtnSending;

          try {
            const response = await sendBaleTextMessage(baleKey, baleBotId, validPhone, textVal);
            
            // Show success
            statusEl.textContent = LANG_STRINGS[currentLang].baleSuccess + response.message_id;
            statusEl.className = 'text-xs mt-2 p-2.5 rounded-lg bg-green-50 text-green-700';
            statusEl.style.display = 'block';

            // Log activity on the deal
            const newActivity = {
              type: 'bale',
              user: currentUser,
              time: 'همین الان',
              text: `ارسال سریع پیام بله از تب اتوماسیون به شماره ${validPhone} (متن: ${textVal.substring(0, 30)}...) [شناسه پیام: ${response.message_id}]`
            };
            deal.activities.unshift(newActivity);
            
            // Save to dealsData
            const idx = dealsData.findIndex((d) => d.id === deal.id);
            if (idx !== -1) {
              dealsData[idx] = deal;
              await saveDeals();
            }

            textInput.value = '';
          } catch (err) {
            console.error(err);
            statusEl.textContent = LANG_STRINGS[currentLang].baleError + err.message;
            statusEl.className = 'text-xs mt-2 p-2.5 rounded-lg bg-red-50 text-red-700';
            statusEl.style.display = 'block';
          } finally {
            sendBtn.disabled = false;
            sendBtn.innerHTML = originalBtnText;
          }
        });
      }
    });
  }

  // --- Bale API Functions ---
  function formatBalePhoneNumber(phone) {
    if (!phone) return '';
    let cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+98')) {
      cleaned = '98' + cleaned.slice(3);
    } else if (cleaned.startsWith('0098')) {
      cleaned = '98' + cleaned.slice(4);
    } else if (cleaned.startsWith('09')) {
      cleaned = '989' + cleaned.slice(2);
    } else if (cleaned.startsWith('9') && cleaned.length === 10) {
      cleaned = '98' + cleaned;
    }
    return cleaned;
  }

  async function sendBaleTextMessage(key, botId, phone, text, isSecure = false, replyMarkup = null) {
    const payload = {
      request_id: Math.random().toString(36).substring(2, 15),
      bot_id: botId,
      phone_number: phone,
      message_data: {
        message: {
          text: text
        }
      }
    };
    
    if (isSecure) {
      payload.message_data.is_secure = true;
    }
    
    if (replyMarkup) {
      payload.message_data.message.reply_markup = replyMarkup;
    }
    
    return callBaleSafirAPI(key, 'send_message', payload);
  }

  async function sendBaleOTPMessage(key, botId, phone, otp) {
    const payload = {
      request_id: Math.random().toString(36).substring(2, 15),
      bot_id: botId,
      phone_number: phone,
      message_data: {
        otp_message: {
          otp: otp
        }
      }
    };
    
    return callBaleSafirAPI(key, 'send_message', payload);
  }

  async function sendBaleMediaMessage(key, botId, phone, fileId, caption = '', isSecure = false) {
    const payload = {
      request_id: Math.random().toString(36).substring(2, 15),
      bot_id: botId,
      phone_number: phone,
      message_data: {
        message: {
          text: caption,
          file_id: fileId
        }
      }
    };
    
    if (isSecure) {
      payload.message_data.is_secure = true;
    }
    
    return callBaleSafirAPI(key, 'send_message', payload);
  }

  async function uploadBaleFile(key, fileBlob) {
    const url = 'https://safir.bale.ai/api/v3/upload_file';
    const formData = new FormData();
    formData.append('file', fileBlob);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-access-key': key
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    
    const result = await response.json();
    if (result.error) {
      const err = result.error;
      throw new Error(`Bale Error ${err.code}: ${err.description}`);
    }
    
    return result;
  }

  const BALE_ERROR_CODES = {
    2: 'InternalServerError (خطای داخلی سرور بله)',
    3: 'RateLimitExceeded (بیش از حد مجاز پیام ارسال شده است)',
    4: 'InvalidInput (ورودی درخواست نامعتبر است)',
    8: 'InvalidPhone (شماره تلفن مقصد اشتباه است)',
    17: 'NotBaleUser (کاربر مقصد اکانت بله ندارد)',
    20: 'PaymentRequired (اعتبار سازمان برای ارسال پیام کافی نیست)',
    21: 'MaximumContactLimitReached (محدودیت مخاطبین بازو به سقف رسیده است)'
  };

  async function callBaleSafirAPI(key, endpoint, payload) {
    const url = `https://safir.bale.ai/api/v3/${endpoint}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-access-key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.error_data && result.error_data.length > 0) {
      const err = result.error_data[0];
      const desc = BALE_ERROR_CODES[err.code] || err.description || 'خطای نامشخص';
      throw new Error(`${desc} (کد خطا: ${err.code})`);
    }
    
    return result;
  }

  (async function init() {
    currentLang = await loadLanguage();
    applyLanguageToStaticUI();
    await loadDeals();
    renderKanban();
    setActiveTab('funnel');
  })();
});

