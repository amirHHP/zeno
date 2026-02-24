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
      newDealTitle: 'معامله جدید 🪄',
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
      magicFillButton: '✨ تکمیل خودکار با هوش مصنوعی',
      automationTitle: '✨ دستیار هوشمند نوشتن',
      automationDescription:
        'یک متن حرفه‌ای برای پیگیری مشتری از هوش مصنوعی دریافت کنید.',
      automationButton: 'پیشنهاد متن پیگیری',
      noActivities: 'فعالیتی ثبت نشده است.',
      noTasks: 'وظیفه‌ای ثبت نشده است.',
      detailValue: 'ارزش معامله',
      detailOwner: 'مسئول',
      detailAssistantTitle: '✨ دستیار هوشمند معامله',
      detailSummaryButton: 'خلاصه وضعیت',
      detailNextActionButton: 'پیشنهاد اقدام بعدی',
      detailActivitiesTab: 'فعالیت‌ها',
      detailTasksTab: 'وظایف',
      activityFormTitle: 'ثبت فعالیت جدید',
      activityFormPlaceholder: 'خلاصه جلسه، نتیجه تماس و...',
      activityFormSubmit: 'ثبت',
      geminiKeyMissing:
        'کلید Gemini تنظیم نشده است. از منوی تنظیمات افزونه، کلید را وارد کنید.',
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
      newDealTitle: 'New deal 🪄',
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
      magicFillButton: '✨ AI auto-fill company details',
      automationTitle: '✨ Smart writing assistant',
      automationDescription:
        'Get a professional follow-up message generated by AI.',
      automationButton: 'Suggest follow-up message',
      noActivities: 'No activities yet.',
      noTasks: 'No tasks yet.',
      detailValue: 'Deal value',
      detailOwner: 'Owner',
      detailAssistantTitle: '✨ Deal AI assistant',
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

  const activityIcons = { call: '📞', email: '✉️', meeting: '👥', note: '📝' };

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
    const newDeal = {
      id: Date.now(),
      stage: 1,
      name: document.getElementById('new-deal-name').value,
      value: document.getElementById('new-deal-value').value,
      tags: ['جدید'],
      prob: 20,
      owner: currentUser,
      contact: 'نامشخص',
      company: document.getElementById('new-deal-name').value,
      activities: [],
      tasks: [],
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
    callGeminiAPI(t.followupPrompt, geminiFollowupOutput);
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
      <div class="grid grid-cols-2 gap-4 text-center">
        <div class="bg-white p-3 rounded-lg shadow-sm border">
          <h3 class="font-semibold text-gray-500 text-sm mb-1">${t.detailValue}</h3>
          <p class="text-green-600 font-bold text-lg">${deal.value}</p>
        </div>
        <div class="bg-white p-3 rounded-lg shadow-sm border">
          <h3 class="font-semibold text-gray-500 text-sm mb-1">${t.detailOwner}</h3>
          <p class="font-semibold">${deal.owner}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm border">
        <h3 class="font-bold text-md mb-3">${t.detailAssistantTitle}</h3>
        <div class="space-y-3">
          <button id="detail-generate-summary-btn" class="w-full text-left flex items-center justify-between bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-semibold py-2 px-4 rounded-lg transition-colors">
            <span>${t.detailSummaryButton}</span><span>✨</span>
          </button>
          <button id="detail-generate-action-btn" class="w-full text-left flex items-center justify-between bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-semibold py-2 px-4 rounded-lg transition-colors">
            <span>${t.detailNextActionButton}</span><span>✨</span>
          </button>
        </div>
        <div id="detail-gemini-output" class="mt-4 p-3 bg-gray-100 rounded-lg text-sm" style="display: none;"></div>
      </div>

      <div>
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-4 space-x-reverse" aria-label="Tabs">
            <button data-tab="activities" class="detail-tab whitespace-nowrap py-3 px-1 text-sm active">${t.detailActivitiesTab}</button>
            <button data-tab="tasks" class="detail-tab whitespace-nowrap py-3 px-1 text-sm">${t.detailTasksTab}</button>
          </nav>
        </div>
        <div class="mt-4">
          <div id="tab-activities" class="detail-tab-content active">
            <div id="activity-timeline-container" class="space-y-4"></div>
            <div class="mt-6 pt-4 border-t border-gray-200">
              <h4 class="font-bold mb-3 text-gray-800">${t.activityFormTitle}</h4>
              <form id="add-activity-form">
                <div>
                  <textarea id="activity-text" rows="3" class="w-full p-2 border border-gray-300 rounded-md" placeholder="${t.activityFormPlaceholder}"></textarea>
                </div>
                <div class="my-3 flex justify-between items-center">
                  <div class="flex items-center space-x-2 space-x-reverse" id="activity-type-selector">
                    <button type="button" data-type="note" title="یادداشت" class="activity-type-btn p-2 rounded-full transition-all duration-200">📝</button>
                    <button type="button" data-type="call" title="تماس" class="activity-type-btn p-2 rounded-full transition-all duration-200">📞</button>
                    <button type="button" data-type="email" title="ایمیل" class="activity-type-btn p-2 rounded-full transition-all duration-200">✉️</button>
                    <button type="button" data-type="meeting" title="جلسه" class="activity-type-btn p-2 rounded-full transition-all duration-200">👥</button>
                  </div>
                  <button type="submit" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">${t.activityFormSubmit}</button>
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
              <div class="flex items-center bg-white p-3 rounded-lg">
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

    document
      .getElementById('detail-generate-summary-btn')
      .addEventListener('click', () => {
        const t = LANG_STRINGS[currentLang];
        const prompt = t.summaryPrompt(deal, stageName, activitiesText);
        callGeminiAPI(prompt, detailGeminiOutput);
      });

    document
      .getElementById('detail-generate-action-btn')
      .addEventListener('click', () => {
        const t = LANG_STRINGS[currentLang];
        const prompt = t.nextActionPrompt(deal, stageName, activitiesText);
        callGeminiAPI(prompt, detailGeminiOutput);
      });

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

      // Persist activity into main dealsData as well
      const idx = dealsData.findIndex((d) => d.id === currentDealData.id);
      if (idx !== -1) {
        dealsData[idx] = currentDealData;
        await saveDeals();
      }

      renderActivityTimeline(currentDealData.activities);
      activityTextEl.value = '';
    });

    mainAppView.classList.remove('active');
    dealDetailPage.classList.add('active');
  }

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
          <div class="deal-card bg-white p-3 rounded-lg shadow-sm border cursor-pointer" data-deal-id="${deal.id}">
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

      kanbanContainer.innerHTML += `
        <div class="kanban-stage p-4">
          <h2 class="font-bold text-lg mb-4">
            ${stage.name}
            <span class="text-sm font-normal text-gray-500">(${stageDeals.length})</span>
          </h2>
          <div class="space-y-3">
            ${dealsHtml}
          </div>
        </div>`;

      dotsContainer.innerHTML += `<div class="w-2 h-2 rounded-full transition-all duration-300 ${
        index === 0 ? 'bg-indigo-600' : 'bg-gray-300'
      }"></div>`;
    });

    document
      .querySelectorAll('.deal-card')
      .forEach((card) =>
        card.addEventListener('click', () => {
          const id = parseInt(card.dataset.dealId, 10);
          const deal = dealsData.find((d) => d.id === id);
          if (deal) renderDealDetailPage(deal);
        }),
      );

    let currentStageIndex = 0;
    const updateDots = () => {
      const dots = dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('bg-indigo-600', i === currentStageIndex);
        dots[i].classList.toggle('bg-gray-300', i !== currentStageIndex);
      }
    };

    kanbanContainer.addEventListener('scroll', () => {
      const newIndex = Math.round(
        kanbanContainer.scrollLeft / kanbanContainer.offsetWidth,
      );
      if (newIndex !== currentStageIndex) {
        currentStageIndex = newIndex;
        updateDots();
      }
    });
  }

  let charts = {};
  function initCharts() {
    if (typeof Chart === 'undefined') {
      const msg = document.getElementById('reports-no-chart');
      if (msg) msg.style.display = 'block';
      return;
    }
    if (Object.keys(charts).length > 0) return;

    const ChartCtor = Chart.default || Chart;

    const salesCtx = document.getElementById('salesChart').getContext('2d');
    charts.sales = new ChartCtor(salesCtx, {
      type: 'line',
      data: {
        labels: ['هفته ۱', 'هفته ۲', 'هفته ۳', 'هفته ۴'],
        datasets: [
          {
            label: 'فروش (میلیون تومان)',
            data: [65, 59, 80, 81],
            fill: true,
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            borderColor: 'rgba(79, 70, 229, 1)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } },
      },
    });

    const lossCtx = document.getElementById('lossReasonChart').getContext('2d');
    charts.loss = new ChartCtor(lossCtx, {
      type: 'doughnut',
      data: {
        labels: ['قیمت بالا', 'عدم نیاز', 'انتخاب رقیب', 'عدم پاسخ'],
        datasets: [
          {
            label: 'دلایل شکست',
            data: [45, 25, 15, 15],
            backgroundColor: ['#ef4444', '#f97316', '#eab308', '#8b5cf6'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
      },
    });

    const customersCtx =
      document.getElementById('topCustomersChart').getContext('2d');
    charts.customers = new ChartCtor(customersCtx, {
      type: 'bar',
      data: {
        labels: ['شرکت الف', 'شرکت ب', 'شرکت ج', 'شرکت د'],
        datasets: [
          {
            label: 'ارزش کل (میلیون تومان)',
            data: [450, 320, 280, 150],
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  }

  (async function init() {
    currentLang = await loadLanguage();
    applyLanguageToStaticUI();
    await loadDeals();
    renderKanban();
    setActiveTab('funnel');
  })();
});

