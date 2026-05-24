/* ═══════════════════════════════════════════════════════
   Zeno CRM Landing Page — Interactive & Bilingual Logic
   ═══════════════════════════════════════════════════════ */

// ── Translation Dictionary ────────────────────────────
const translations = {
  fa: {
    "meta.title": "زِنو CRM | ساده‌ترین CRM هوشمند دنیا",
    "meta.desc": "زِنو (Zeno) با ترکیب سادگی و هوش مصنوعی، کارهای خسته‌کننده فروش مثل ورود دستی داده‌ها را حذف می‌کند. کافیست نام شرکت را بنویسید تا بقیه اطلاعات خودکار پر شود.",
    "nav.features": "قابلیت‌ها",
    "nav.simulator": "شبیه‌ساز زنده",
    "nav.setup": "راهنمای راه‌اندازی",
    "nav.cta": "گیت‌هاب",
    "hero.badge": "✨ ساده‌ترین CRM هوشمند دنیا مبتنی بر هوش مصنوعی",
    "hero.title": "سادگی در ظاهر،<br><span class=\"text-contrast\">هوشمندی در عمل.</span>",
    "hero.subtitle": "زِنو با ترکیب فلسفه سادگی و قدرت هوش مصنوعی، ورود دستی داده‌های مشتریان را حذف می‌کند. نام شرکت را تایپ کنید و بقیه کارها را به زنو بسپارید.",
    "hero.ctaPrimary": "شروع رایگان",
    "hero.ctaSecondary": "تست شبیه‌ساز زنده",
    
    "sim.title": "تجربه زنده زِنو",
    "sim.subtitle": "امکانات فوق‌العاده زنو را همین‌جا، بدون نیاز به نصب، در این شبیه‌ساز تعاملی تجربه کنید.",
    "sim.appTitle": "فانل فروش",
    "sim.appSettings": "تنظیمات (کلید Gemini)",
    "sim.tabMagic": "ثبت جادویی",
    "sim.tabKanban": "فانل فروش",
    "sim.tabAgent": "دستیار هوشمند",
    "sim.magicInstruction": "برای تست ثبت جادویی، یکی از شرکت‌های پیشنهادی زیر را انتخاب کنید یا نام شرکت دلخواه خود را بنویسید:",
    "sim.magicButton": "تکمیل هوشمند",
    "sim.companyName": "نام شرکت یا مشتری",
    "sim.website": "وب‌سایت",
    "sim.industry": "صنعت",
    "sim.value": "ارزش تخمینی",
    "sim.address": "آدرس / تلفن",
    "sim.searchingWeb": "در حال جستجوی وب با هوش مصنوعی Gemini...",
    
    "sim.kanbanInstruction": "روی کارت‌ها کلیک کنید یا آن‌ها را بکشید تا بین ستون‌های فانل جابه‌جا شوند:",
    "sim.colLead": "سرنخ‌ها",
    "sim.colContact": "در حال گفتگو",
    "sim.colWon": "موفق (Won)",
    "sim.tagTech": "فناوری",
    "sim.tagEcommerce": "فروشگاه",
    "sim.tagSoftware": "نرم‌افزار",
    "sim.logDefault": "برای شروع کارت‌ها را جابه‌جا کنید.",
    
    "sim.agentInstruction": "دستیار هوشمند زِنو هر معامله را تحلیل کرده و خلاصه به همراه بهترین اقدام بعدی را پیشنهاد می‌دهد:",
    "sim.stageContacted": "در حال گفتگو",
    "sim.agentName": "دستیار هوشمند زِنو (AI Agent)",
    "sim.dealSummaryTitle": "📌 خلاصه معامله:",
    "sim.dealSummaryVal": "دیجی‌کالا مایل به یکپارچه‌سازی سیستم لجستیک با نرم‌افزار ما است. ارزش تخمینی معامله ۵۰ میلیون تومان بوده و مذاکره با مدیر فنی در جریان است.",
    "sim.nextActionTitle": "🎯 بهترین اقدام بعدی:",
    "sim.nextActionVal": "ارسال پیش‌نویس فنی همگام‌سازی وب‌سرویس تا فردا ساعت ۱۲ ظهر و پیگیری از طریق پیام‌رسان بله یا ایمیل.",
    "sim.btnAutoText": "پیشنهاد پیام پیگیری",
    "sim.btnSendBale": "ارسال خودکار بله",
    
    "features.title": "ویژگی‌های برجسته زِنو",
    "features.subtitle": "امکاناتی قدرتمند در قالبی فوق‌العاده ساده و بدون حاشیه.",
    "features.magicTitle": "ثبت جادویی اطلاعات (Magic Entry)",
    "features.magicDesc": "فقط نام شرکت مشتری را بنویسید. هوش مصنوعی زنو با جستجوی لحظه‌ای در وب، تمام فیلدها از جمله صنعت، آدرس، سایت و تخمین ارزش معامله را پر می‌کند.",
    "features.kanbanTitle": "فانل فروش بصری و ساده",
    "features.kanbanDesc": "یک پایپ‌لاین کانبان تمیز و بدون شلوغی، کاملاً بهینه‌سازی شده برای کار بر روی موبایل و تبلت تا تمرکز شما تنها روی پیشبرد معامله باشد.",
    "features.agentTitle": "تحلیل هوشمند معاملات (AI Agent)",
    "features.agentDesc": "زنو به صورت خودکار وضعیت معاملات را تحلیل کرده، برای شما خلاصه می‌سازد و «بهترین اقدام بعدی» را برای نهایی کردن فروش پیشنهاد می‌دهد.",
    "features.autoTitle": "اتوماسیون پیام‌رسان بله و ایمیل",
    "features.autoDesc": "نوشتن متن‌های پیگیری حرفه‌ای با هوش مصنوعی و ارسال مستقیم و سریع پیام در پیام‌رسان بله یا ایمیل مشتریان بدون فوت وقت.",
    "features.chartTitle": "گزارش‌های آماری و پیش‌بینی",
    "features.chartDesc": "نمودارهای بسیار جذاب برای شناسایی گلوگاه‌های فروش، پیش‌بینی احتمال برنده شدن معاملات و ارزیابی عملکرد اعضای تیم.",
    "features.privacyTitle": "حفظ ۱۰۰٪ حریم خصوصی داده‌ها",
    "features.privacyDesc": "زنو تمام اطلاعات را به صورت محلی در مرورگر شما ذخیره می‌کند و درخواست‌های هوش مصنوعی مستقیماً با کلید API خودتان ارسال می‌شوند.",
    
    "setup.title": "راهنمای راه‌اندازی سریع",
    "setup.subtitle": "شروع کار با زِنو در کمتر از ۳ دقیقه.",
    "setup.step1Title": "بارگذاری اکستنشن در مرورگر",
    "setup.step1Desc": "پروژه را از گیت‌هاب دانلود کرده و در بخش اکستنشن‌های کروم (Developer Mode) آن را به عنوان Unpacked لود کنید.",
    "setup.step2Title": "وارد کردن کلید هوش مصنوعی",
    "setup.step2Desc": "در بخش تنظیمات اکستنشن، کلید API رایگان هوش مصنوعی Gemini را وارد کنید تا قابلیت تکمیل خودکار و تحلیل فعال شود.",
    "setup.step3Title": "مدیریت آسان معاملات",
    "setup.step3Desc": "زنو آماده است! روی دکمه ثبت معامله کلیک کنید و لذت کار با ساده‌ترین سیستم مدیریت مشتریان دنیا را تجربه کنید.",
    "setup.ctaTitle": "آماده‌اید روند فروش خود را متحول کنید؟",
    "setup.ctaDesc": "پروژه زِنو کاملاً متن‌باز و رایگان در دسترس شماست.",
    "setup.ctaButton": "دانلود و نصب از گیت‌هاب",
    
    "footer.copy": "© ۲۰۲۶ زنو CRM. متن‌باز و توسعه‌یافته تحت لایسنس MIT.",
    "footer.license": "لایسنس"
  },
  en: {
    "meta.title": "Zeno CRM | Simplest AI-powered CRM",
    "meta.desc": "Zeno combines Zen simplicity with Gemini AI to automate manual sales workflows. Type a company name and watch AI fill the rest.",
    "nav.features": "Features",
    "nav.simulator": "Live Demo",
    "nav.setup": "Setup Guide",
    "nav.cta": "GitHub",
    "hero.badge": "✨ Simplest AI-Powered Smart CRM",
    "hero.title": "Simplicity in Form,<br><span class=\"text-contrast\">Intelligence in Action.</span>",
    "hero.subtitle": "Zeno strips away the exhausting complexity of CRM. By merging Zen philosophy with Gemini AI, it eliminates manual data entry. Just type the company name.",
    "hero.ctaPrimary": "Start Free",
    "hero.ctaSecondary": "Try Live Demo",
    
    "sim.title": "Live Interactive Simulator",
    "sim.subtitle": "Experience the core features of Zeno CRM right here in your browser, no installation required.",
    "sim.appTitle": "Sales Funnel",
    "sim.appSettings": "Settings (Gemini Key)",
    "sim.tabMagic": "Magic Entry",
    "sim.tabKanban": "Sales Funnel",
    "sim.tabAgent": "AI Agent",
    "sim.magicInstruction": "To test Magic Entry, pick a company suggestion below or type any brand name:",
    "sim.magicButton": "Magic Fill",
    "sim.companyName": "Company Name",
    "sim.website": "Website",
    "sim.industry": "Industry",
    "sim.value": "Est. Value",
    "sim.address": "Address / Phone",
    "sim.searchingWeb": "Searching web with Gemini AI...",
    
    "sim.kanbanInstruction": "Click or drag cards to move them between sales funnel stages:",
    "sim.colLead": "Leads",
    "sim.colContact": "Contacted",
    "sim.colWon": "Won",
    "sim.tagTech": "Tech",
    "sim.tagEcommerce": "E-comm",
    "sim.tagSoftware": "Software",
    "sim.logDefault": "Drag or click cards to begin.",
    
    "sim.agentInstruction": "Zeno's AI Agent automatically analyzes every deal, summarizing status and defining the Next Best Action:",
    "sim.stageContacted": "Contacted",
    "sim.agentName": "Zeno AI Agent",
    "sim.dealSummaryTitle": "📌 Deal Summary:",
    "sim.dealSummaryVal": "Digikala wants to integrate their logistics framework with our software suite. Estimated deal value is $1,500. Currently aligning requirements with the Technical Director.",
    "sim.nextActionTitle": "🎯 Next Best Action:",
    "sim.nextActionVal": "Send the synchronization technical draft by tomorrow 12:00 PM, and follow up via Bale messenger or Email.",
    "sim.btnAutoText": "Suggest Follow-up Text",
    "sim.btnSendBale": "Auto-Send via Bale",
    
    "features.title": "Zeno Key Features",
    "features.subtitle": "Powerful capabilities wrapped in an ultra-clean, distraction-free interface.",
    "features.magicTitle": "Magic Entry",
    "features.magicDesc": "Type the company name. Zeno's web-grounded AI crawls the internet to instantly fill website, industry, address, and estimated deal value.",
    "features.kanbanTitle": "Visual Sales Funnel",
    "features.kanbanDesc": "A clean, responsive Kanban board designed for speed. Perfectly optimized for mobile and touch devices to keep you focused on closing.",
    "features.agentTitle": "AI Agent Insights",
    "features.agentDesc": "Autopilot deal analysis. Generates instant deal summaries, assesses probability, and outlines the exact 'Next Best Action' to win.",
    "features.autoTitle": "Bale & Email Follow-ups",
    "features.autoDesc": "Generate professional context-aware follow-up templates using AI and trigger swift dispatches via Bale messenger or direct Email.",
    "features.chartTitle": "Smart Sales Analytics",
    "features.chartDesc": "High-impact visual reports. Instantly spot pipeline bottlenecks, monitor conversion rates, and track team performance metrics.",
    "features.privacyTitle": "100% Client-Side Privacy",
    "features.privacyDesc": "Privacy by design. All customer data is saved locally on your device. AI requests hit Gemini API directly with your private key.",
    
    "setup.title": "Quick Setup Guide",
    "setup.subtitle": "Get Zeno up and running in less than 3 minutes.",
    "setup.step1Title": "Load Extension in Chrome",
    "setup.step1Desc": "Download the repository, navigate to chrome://extensions, enable Developer Mode, and click 'Load unpacked'.",
    "setup.step2Title": "Configure Gemini API Key",
    "setup.step2Desc": "Go to settings, paste your free Gemini API key to activate autonomous research and synthesis features.",
    "setup.step3Title": "Start Selling Smarter",
    "setup.step3Desc": "You are set! Create a deal, type the customer name, and enjoy the simplest CRM experience on earth.",
    "setup.ctaTitle": "Ready to streamline your sales pipeline?",
    "setup.ctaDesc": "Zeno CRM is completely free, private, and open-source.",
    "setup.ctaButton": "Download from GitHub",
    
    "footer.copy": "© 2026 Zeno CRM. Open-source under MIT License.",
    "footer.license": "License"
  }
};

// ── App State ─────────────────────────────────────────
let currentLang = 'fa';

// ── DOM Elements ──────────────────────────────────────
const langToggleBtn = document.getElementById('lang-toggle');
const rootHtml = document.documentElement;

// ── Language Switcher Function ────────────────────────
function setLanguage(lang) {
  currentLang = lang;
  
  // Set html direction and class
  if (lang === 'fa') {
    rootHtml.setAttribute('dir', 'rtl');
    rootHtml.setAttribute('lang', 'fa');
    langToggleBtn.innerText = 'EN';
  } else {
    rootHtml.setAttribute('dir', 'ltr');
    rootHtml.setAttribute('lang', 'en');
    langToggleBtn.innerText = 'FA';
  }

  // Update Page Title
  document.title = translations[lang]["meta.title"];
  document.getElementById('meta-title').innerText = translations[lang]["meta.title"];
  document.getElementById('meta-desc').setAttribute('content', translations[lang]["meta.desc"]);

  // Translate all marked elements
  const translatableElements = document.querySelectorAll('[data-t]');
  translatableElements.forEach(el => {
    const key = el.getAttribute('data-t');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update input placeholders explicitly
  const magicInput = document.getElementById('sim-magic-input');
  if (magicInput) {
    magicInput.placeholder = lang === 'fa' ? 'مثلاً: دیجی‌کالا' : 'e.g. Digikala';
  }

  // Update Simulator dynamic fields if they are empty or currently default
  updateSimulatorLang(lang);
}

langToggleBtn.addEventListener('click', () => {
  const nextLang = currentLang === 'fa' ? 'en' : 'fa';
  setLanguage(nextLang);
});

// ── Simulator Tab Swapping ────────────────────────────
const appTabs = document.querySelectorAll('.app-tab');
const simViews = document.querySelectorAll('.sim-view');

appTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetView = tab.getAttribute('data-sim-tab');
    
    // Toggle active classes
    appTabs.forEach(t => t.classList.remove('active'));
    simViews.forEach(v => v.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(`sim-view-${targetView}`).classList.add('active');
  });
});

// ── Simulator: Magic Entry Logic ──────────────────────
const companyTags = document.querySelectorAll('.company-tag-btn');
const magicInput = document.getElementById('sim-magic-input');
const magicBtn = document.getElementById('sim-magic-btn');
const progressContainer = document.getElementById('sim-magic-progress');
const statusText = document.getElementById('sim-magic-status-text');

// Form output fields
const fieldWebsite = document.getElementById('field-website');
const fieldIndustry = document.getElementById('field-industry');
const fieldValue = document.getElementById('field-value');
const fieldAddress = document.getElementById('field-address');

const companyData = {
  fa: {
    "دیجی‌کالا": { website: "digikala.com", industry: "خرده‌فروشی آنلاین", value: "۵۰,۰۰۰,۰۰۰ تومان", address: "تهران، ونک، خ عطار" },
    "اسنپ": { website: "snapp.ir", industry: "حمل و نقل هوشمند", value: "۷۰,۰۰۰,۰۰۰ تومان", address: "تهران، خ ولیعصر، تقاطع اسفندیار" },
    "کافه‌بازار": { website: "cafebazaar.ir", industry: "فروشگاه نرم‌افزاری", value: "۳۰,۰۰۰,۰۰۰ تومان", address: "تهران، خ سعادت‌آباد" }
  },
  en: {
    "digikala": { website: "digikala.com", industry: "E-Commerce", value: "$1,500 USD", address: "Tehran, Vanak Sq, Attar St" },
    "snapp": { website: "snapp.ir", industry: "Ride Hailing", value: "$2,100 USD", address: "Tehran, Valiasr St, Esfandiar Junction" },
    "cafebazaar": { website: "cafebazaar.ir", industry: "App Store", value: "$900 USD", address: "Tehran, Saadat Abad St" }
  }
};

// Suggestion click
companyTags.forEach(tag => {
  tag.addEventListener('click', () => {
    magicInput.value = tag.innerText;
  });
});

// Magic Trigger Button
magicBtn.addEventListener('click', () => {
  let query = magicInput.value.trim();
  if (!query) {
    query = currentLang === 'fa' ? 'دیجی‌کالا' : 'Digikala';
    magicInput.value = query;
  }

  // Clear fields
  [fieldWebsite, fieldIndustry, fieldValue, fieldAddress].forEach(f => {
    f.value = '';
    f.classList.remove('autofill-active');
  });

  // Display loader
  progressContainer.style.display = 'flex';
  
  const loadingSteps = currentLang === 'fa' 
    ? ["در حال جستجوی وب...", "یافتن آدرس سایت شرکت...", "تحلیل ارزش با هوش مصنوعی Gemini...", "دریافت اطلاعات نهایی..."]
    : ["Crawling the web...", "Resolving domain url...", "Estimating transaction value via Gemini...", "Mapping final coordinates..."];

  let step = 0;
  statusText.innerText = loadingSteps[step];
  
  const stepInterval = setInterval(() => {
    step++;
    if (step < loadingSteps.length) {
      statusText.innerText = loadingSteps[step];
    }
  }, 500);

  // Complete Simulation
  setTimeout(() => {
    clearInterval(stepInterval);
    progressContainer.style.display = 'none';

    // Normalize query for lookup
    let lookupKey = query.toLowerCase();
    if (currentLang === 'en') {
      if (lookupKey.includes('digi')) lookupKey = 'digikala';
      else if (lookupKey.includes('snap')) lookupKey = 'snapp';
      else if (lookupKey.includes('baz') || lookupKey.includes('cafe')) lookupKey = 'cafebazaar';
      else lookupKey = 'custom';
    } else {
      if (lookupKey.includes('دیجی')) lookupKey = 'دیجی‌کالا';
      else if (lookupKey.includes('اسنپ') || lookupKey.includes('سنپ')) lookupKey = 'اسنپ';
      else if (lookupKey.includes('بازار') || lookupKey.includes('کافه')) lookupKey = 'کافه‌بازار';
      else lookupKey = 'custom';
    }

    // Retrieve data
    let data;
    if (lookupKey === 'custom') {
      data = currentLang === 'fa'
        ? { website: `${query.replace(/\s+/g, '')}.ir`, industry: "صنعت عمومی", value: "۱۰,۰۰۰,۰۰۰ تومان", address: "تهران، ایران" }
        : { website: `${query.toLowerCase().replace(/\s+/g, '')}.com`, industry: "General Industry", value: "$300 USD", address: "Tehran, Iran" };
    } else {
      data = companyData[currentLang][lookupKey];
      // Fallback in case of mismatch
      if (!data) {
        const keys = Object.keys(companyData[currentLang]);
        data = companyData[currentLang][keys[0]];
      }
    }

    // Populate with typewriter effect
    typewriterField(fieldWebsite, data.website);
    typewriterField(fieldIndustry, data.industry);
    typewriterField(fieldValue, data.value);
    typewriterField(fieldAddress, data.address);

  }, 2200);
});

function typewriterField(field, text) {
  field.value = '';
  field.classList.add('autofill-active');
  let i = 0;
  function type() {
    if (i < text.length) {
      field.value += text.charAt(i);
      i++;
      setTimeout(type, 30);
    }
  }
  type();
}

// ── Simulator: Kanban Drag & Drop ─────────────────────
const cards = document.querySelectorAll('.draggable-card');
const columns = document.querySelectorAll('.kanban-col-cards');
const kanbanLog = document.getElementById('kanban-log');

let draggedCard = null;

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    draggedCard = null;
  });

  // Mobile Click Fallback: Cycle column on click
  card.addEventListener('click', () => {
    const parentCol = card.parentElement;
    const currentStage = parentCol.parentElement.getAttribute('data-stage');
    
    let nextStage = 'lead';
    if (currentStage === 'lead') nextStage = 'contacted';
    else if (currentStage === 'contacted') nextStage = 'won';
    else if (currentStage === 'won') nextStage = 'lead';

    const targetCol = document.getElementById(`col-${nextStage}`);
    targetCol.appendChild(card);
    
    updateKanbanCounters();
    logKanbanMove(card.querySelector('.card-title').innerText, nextStage);
  });
});

columns.forEach(col => {
  col.addEventListener('dragover', (e) => {
    e.preventDefault();
    col.parentElement.classList.add('drag-over');
  });

  col.addEventListener('dragleave', () => {
    col.parentElement.classList.remove('drag-over');
  });

  col.addEventListener('drop', (e) => {
    e.preventDefault();
    col.parentElement.classList.remove('drag-over');
    if (draggedCard) {
      col.appendChild(draggedCard);
      updateKanbanCounters();
      const stage = col.parentElement.getAttribute('data-stage');
      logKanbanMove(draggedCard.querySelector('.card-title').innerText, stage);
    }
  });
});

function updateKanbanCounters() {
  document.getElementById('count-lead').innerText = document.getElementById('col-lead').children.length;
  document.getElementById('count-contacted').innerText = document.getElementById('col-contacted').children.length;
  document.getElementById('count-won').innerText = document.getElementById('col-won').children.length;
}

function logKanbanMove(cardName, stage) {
  const stageNames = {
    fa: { lead: "سرنخ‌ها", contacted: "در حال گفتگو", won: "موفق" },
    en: { lead: "Leads", contacted: "Contacted", won: "Won" }
  };

  const cleanName = cardName.split(' (')[0];
  const stageName = stageNames[currentLang][stage];

  kanbanLog.innerText = currentLang === 'fa'
    ? `معامله «${cleanName}» با موفقیت به ستون [${stageName}] منتقل شد.`
    : `Deal "${cleanName}" successfully moved to [${stageName}] column.`;
}

// ── Simulator: AI Agent Integration ───────────────────
const btnAgentText = document.getElementById('btn-agent-sim-text');
const btnAgentBale = document.getElementById('btn-agent-sim-bale');
const agentOutput = document.getElementById('agent-out');

btnAgentText.addEventListener('click', () => {
  agentOutput.style.display = 'block';
  agentOutput.style.color = 'var(--c-text)';
  
  const textVal = currentLang === 'fa'
    ? `سلام جناب مهندس، وقت شما بخیر.
پیرو صحبت‌هایمان درباره یکپارچه‌سازی سیستم لجستیک دیجی‌کالا، پیش‌نویس فنی همگام‌سازی وب‌سرویس آماده شده است. 
در صورت صلاحدید زمان مناسبی در بعد از ظهر فردا جهت مرور کوتاه به بنده اعلام بفرمایید.`
    : `Hello team, hope you are doing well.
Following up on our discussion regarding Digikala's logistics system sync, the draft API specifications are ready.
Please let me know if we can host a quick 10-minute review call tomorrow afternoon.`;

  agentOutput.innerText = '';
  let i = 0;
  function typeOut() {
    if (i < textVal.length) {
      agentOutput.innerText += textVal.charAt(i);
      i++;
      setTimeout(typeOut, 15);
    }
  }
  typeOut();
});

btnAgentBale.addEventListener('click', () => {
  agentOutput.style.display = 'block';
  agentOutput.innerText = currentLang === 'fa' 
    ? '⏳ در حال اتصال به پیام‌رسان بله...' 
    : '⏳ Connecting to Bale messenger api...';
  
  setTimeout(() => {
    agentOutput.innerHTML = currentLang === 'fa'
      ? '<span style="color:var(--c-green)">✓ پیام پیگیری با موفقیت به شماره دیجی‌کالا ارسال شد!</span>'
      : '<span style="color:var(--c-green)">✓ Follow-up message successfully delivered to Digikala!</span>';
  }, 1500);
});

// ── Language Sync helper for Simulator ────────────────
function updateSimulatorLang(lang) {
  // Update tags
  const tags = document.querySelectorAll('.company-tag-btn');
  if (lang === 'en') {
    tags[0].innerText = 'Digikala';
    tags[1].innerText = 'Snapp';
    tags[2].innerText = 'Cafebazaar';
    if (magicInput.value === 'دیجی‌کالا') magicInput.value = 'Digikala';
    if (magicInput.value === 'اسنپ') magicInput.value = 'Snapp';
    if (magicInput.value === 'کافه‌بازار') magicInput.value = 'Cafebazaar';
  } else {
    tags[0].innerText = 'دیجی‌کالا';
    tags[1].innerText = 'اسنپ';
    tags[2].innerText = 'کافه‌بازار';
    if (magicInput.value === 'Digikala') magicInput.value = 'دیجی‌کالا';
    if (magicInput.value === 'Snapp') magicInput.value = 'اسنپ';
    if (magicInput.value === 'Cafebazaar') magicInput.value = 'کافه‌بازار';
  }

  // Update Kanban card texts
  const cardSnapp = document.getElementById('card-snapp');
  const cardDigi = document.getElementById('card-digikala');
  const cardBazaar = document.getElementById('card-cafebazaar');
  
  if (lang === 'en') {
    cardSnapp.querySelector('.card-title').innerText = 'Snapp';
    cardSnapp.querySelector('.card-val').innerText = '$2,100';
    cardDigi.querySelector('.card-title').innerText = 'Digikala';
    cardDigi.querySelector('.card-val').innerText = '$1,500';
    cardBazaar.querySelector('.card-title').innerText = 'Cafebazaar';
    cardBazaar.querySelector('.card-val').innerText = '$900';
  } else {
    cardSnapp.querySelector('.card-title').innerText = 'اسنپ (Snapp)';
    cardSnapp.querySelector('.card-val').innerText = '۷۰M تومان';
    cardDigi.querySelector('.card-title').innerText = 'دیجی‌کالا (Digikala)';
    cardDigi.querySelector('.card-val').innerText = '۵۰M تومان';
    cardBazaar.querySelector('.card-title').innerText = 'کافه‌بازار (Bazaar)';
    cardBazaar.querySelector('.card-val').innerText = '۳۰M تومان';
  }

  // Clear or reset fields to match direction and values
  [fieldWebsite, fieldIndustry, fieldValue, fieldAddress].forEach(f => {
    f.value = '';
    f.classList.remove('autofill-active');
  });
  
  agentOutput.style.display = 'none';
  agentOutput.innerText = '';
  kanbanLog.innerText = translations[lang]["sim.logDefault"];
}

// ── Initial Setup ─────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setLanguage('fa');
  
  // Clean scroll animation reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  // Add animation class to feature and setup cards
  const animElements = document.querySelectorAll('.feature-card, .setup-step, .mockup-wrapper');
  
  // Inject scroll classes
  const style = document.createElement('style');
  style.innerHTML = `
    .feature-card, .setup-step, .mockup-wrapper {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .feature-card.visible, .setup-step.visible, .mockup-wrapper.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  animElements.forEach(el => observer.observe(el));
});
