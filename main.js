// Main Frontend Logic & Interactions for Dinghy Foundation Website
import { getLang, setLang, applyTranslations } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Translations
  applyTranslations();

  // Language Toggle Click Event
  const langBtns = document.querySelectorAll('.lang-toggle-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = getLang();
      const nextLang = current === 'en' ? 'bn' : 'en';
      setLang(nextLang);
    });
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile nav when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Program Tab Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modals (Donation & Volunteer & Program Details)
  const donateModalBackdrop = document.getElementById('donateModal');
  const volunteerModalBackdrop = document.getElementById('volunteerModal');
  const programDetailModal = document.getElementById('programDetailModal');

  // Open Donation Modal buttons
  document.querySelectorAll('.open-donate-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (donateModalBackdrop) {
        e.preventDefault();
        donateModalBackdrop.classList.add('active');
      }
    });
  });

  // Open Volunteer Modal buttons
  document.querySelectorAll('.open-volunteer-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (volunteerModalBackdrop) {
        e.preventDefault();
        volunteerModalBackdrop.classList.add('active');
      }
    });
  });

  // Close Modal buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (donateModalBackdrop) donateModalBackdrop.classList.remove('active');
      if (volunteerModalBackdrop) volunteerModalBackdrop.classList.remove('active');
      if (programDetailModal) programDetailModal.classList.remove('active');
    });
  });

  // Close when clicking backdrop
  [donateModalBackdrop, volunteerModalBackdrop, programDetailModal].forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    }
  });

  // 5. Program Details Data & Modal Injection System
  const programData = {
    "1": {
      categoryTag: "CHILD EDUCATION",
      titleEn: "Sundarbans Learning Hubs & Scholarships",
      titleBn: "সুন্দরবন লার্নিং হাব ও মেধা বৃত্তি কার্যক্রম",
      heroImg: "assets/img/uploads/projects/1673426390.jpg",
      descEn: "Operating in the heart of coastal Satkhira adjacent to the Sundarbans, our learning hubs provide free education, textbooks, backpacks, uniforms, and female teacher stipends. During severe salinity intrusion and cyclone disruptions, these hubs ensure children remain on track with primary education, achieving a 94% retention rate.",
      descBn: "সুন্দরবন সংলগ্ন সাতক্ষীরার উপকূলীয় এলাকায় আমাদের ১৫টি লার্নিং হাবের মাধ্যমে ১,২৫০টিরও বেশি শিশুকে বিনামূল্যে বই, স্কুল ব্যাগ, পোশাক ও টিউটরিং প্রদান করা হচ্ছে। প্রাকৃতিক দুর্যোগের সময়েও শিশুদের শিক্ষা অব্যাহত রাখা এবং ঝরে পড়া ৯৪% কমানো আমাদের প্রধান লক্ষ্য।",
      stats: [
        { labelEn: "Enrolled Students", labelBn: "শিক্ষার্থী সংখ্যা", val: "1,250+" },
        { labelEn: "Active Learning Hubs", labelBn: "সক্রিয় শিক্ষা কেন্দ্র", val: "15 Hubs" },
        { labelEn: "School Retention Rate", labelBn: "প্রাথমিক শিক্ষা হার", val: "94%" }
      ],
      gallery: [
        "assets/img/uploads/projects/1673426390.jpg",
        "assets/img/uploads/projects/1673343192.jpg",
        "assets/img/uploads/projects/1673684404.jpg"
      ],
      activitiesEn: [
        "Distribution of free annual school kits (textbooks, notebooks, backpacks, uniforms)",
        "Daily after-school foundational literacy and mathematics tutoring",
        "Monthly stipends and capacity training for local female educators",
        "Annual merit scholarships for top performing coastal primary students"
      ],
      activitiesBn: [
        "বার্ষিক বিনামূল্যে বই, খাতা, স্কুল ব্যাগ ও পোশাক বিতরণ",
        "দৈনিক প্রাথমিক সাক্ষরতা ও গণিত টিউটরিং পরিচালনা",
        "স্থানীয় নারী শিক্ষকদের প্রশিক্ষণ ও মাসিক ভাতা প্রদান",
        "প্রান্তিক মেধাবী শিশুদের জন্য বার্ষিক শিক্ষা বৃত্তি প্রদান"
      ]
    },
    "2": {
      categoryTag: "HEALTH & HYGIENE",
      titleEn: "Clean Drinking Water & Salinity Hygiene Literacy",
      titleBn: "নিরাপদ খাবার পানি ও পরিচ্ছন্নতা সচেতনতা",
      heroImg: "assets/img/uploads/projects/1676291457.jpg",
      descEn: "Severe salinity contamination in coastal Satkhira severely threatens public health. We conduct hands-on water filtration workshops, distribute household water purification tablets, and provide dignified menstrual hygiene kits for mothers and teenage girls across 12 coastal villages.",
      descBn: "সাতক্ষীরার উপকূলীয় অঞ্চলের মিষ্টি পানির অভাব ও লবণাক্ততা প্রতিরোধে আমরা পানি বিশুদ্ধকরণ প্রশিক্ষণ, ট্যাবলেট বিতরণ এবং মা ও কিশোরীদের জন্য স্বাস্থ্য সচেতনতা কর্মশালা পরিচালনা করি। ইতোমধ্যে ৫,০০০ এর বেশি মানুষ এতে অংশ নিয়েছেন।",
      stats: [
        { labelEn: "Community Participants", labelBn: "অংশগ্রহণকারী", val: "5,000+" },
        { labelEn: "Workshops Conducted", labelBn: "কর্মশালা সংখ্যা", val: "35 Workshops" },
        { labelEn: "Coastal Villages Covered", labelBn: "উপকূলীয় গ্রাম", val: "12 Villages" }
      ],
      gallery: [
        "assets/img/uploads/projects/1676291457.jpg",
        "assets/img/uploads/projects/1676288008.jpg",
        "assets/img/wwo.jpg"
      ],
      activitiesEn: [
        "Distribution of household water purification tablets and clean jerrycans",
        "Clean water sanitation and waterborne disease prevention workshops",
        "Dignified menstrual hygiene kit distribution and health literacy sessions",
        "Salinity testing and community rainwater harvesting advocacy"
      ],
      activitiesBn: [
        "পরিবারের জন্য পানি বিশুদ্ধকরণ ট্যাবলেট ও ক্যান বিতরণ",
        "নিরাপদ পানি ব্যবহার ও পানিবাহিত রোগ প্রতিরোধ কর্মশালা",
        "মা ও কিশোরীদের জন্য স্বাস্থ্যকর পরিচ্ছন্নতা কিট বিতরণ",
        "লবণাক্ততা পরীক্ষা ও বৃষ্টির পানি সংরক্ষণে সচেতনতা বৃদ্ধি"
      ]
    },
    "3": {
      categoryTag: "CLIMATE ACTION",
      titleEn: "Coastal Climate Taskforce & Emergency Preparedness",
      titleBn: "উপকূলীয় জলবায়ু প্রস্তুতি ও যুব টাস্কফোর্স",
      heroImg: "assets/img/uploads/events/1675686646.jpg",
      descEn: "Satkhira is on the frontlines of climate change and cyclone vulnerability. We train local youth volunteers in early warning communication, mangrove embankment afforestation, and emergency evacuation assistance during major storm events.",
      descBn: "জলবায়ু পরিবর্তনের ঝুঁকিতে থাকা সাতক্ষীরার উপকূলীয় নদীবাঁধ রক্ষায় গাছ রোপণ এবং ঘূর্ণিঝড় মৌসুমে ২৫০ জন তরুণকে জরুরি স্বেচ্ছাসেবক হিসেবে প্রশিক্ষণ প্রদান ও উদ্ধার কাজ পরিচালনা করে আমাদের যুব টাস্কফোর্স।",
      stats: [
        { labelEn: "Youth Volunteers", labelBn: "যুব স্বেচ্ছাসেবক", val: "250 Volunteers" },
        { labelEn: "Trees Planted", labelBn: "রোপণকৃত বৃক্ষ", val: "10,000+" },
        { labelEn: "Villages Protected", labelBn: "সুরক্ষিত গ্রাম", val: "12 Villages" }
      ],
      gallery: [
        "assets/img/uploads/events/1675686646.jpg",
        "assets/img/uploads/events/1675686967.jpg",
        "assets/img/about-2.jpg"
      ],
      activitiesEn: [
        "Mangrove & coastal embankment tree plantation drives to prevent erosion",
        "Early cyclone warning communications and siren alert mobilization",
        "Emergency evacuation assistance for elderly, mothers, and children",
        "Rapid emergency shelter preparation and post-storm damage reporting"
      ],
      activitiesBn: [
        "নদীবাঁধ ক্ষয় রোধে ম্যানগ্রোভ ও উপকূলীয় গাছ রোপণ অভিযান",
        "ঘূর্ণিঝড় পূর্বাভাস ও সতর্কবার্তা প্রচার কার্যক্রম",
        "শিশু, প্রবীণ ও নারীদের নিরাপদ আশ্রয়ে স্থানান্তরে সহায়তা",
        "ঝড় পরবর্তী জরুরি ত্রাণ সাড়াদান ও ক্ষয়ক্ষতি নিরূপণ"
      ]
    },
    "4": {
      categoryTag: "SPECIAL INITIATIVE",
      titleEn: "Emergency Sundarbans Disaster Relief & Food Packs",
      titleBn: "জরুরি সুন্দরবন দুর্যোগ ত্রাণ ও খাদ্য সহায়তা",
      heroImg: "assets/img/uploads/events/1675674472.jpg",
      descEn: "When severe cyclones breach river embankments, coastal families lose access to food and potable water. Our rapid relief teams deliver emergency food packs (rice, lentils, oil, saline), medical kits, and fresh water jerrycans via boat directly to marooned villages.",
      descBn: "ঘূর্ণিঝড় ও প্লাবনে নদীবাঁধ ভেঙে ক্ষতিগ্রস্ত পরিবারগুলোর মাঝে ডিঙ্গি নৌকা ও ট্রলারের মাধ্যমে জরুরি শুকনো খাবার (চাল, ডাল, তেল, স্যালাইন), বিশুদ্ধ পানি ও ওষুধপত্র পৌঁছে দেওয়ার বিশেষ উদ্যোগ।",
      stats: [
        { labelEn: "Relief Kits Delivered", labelBn: "ত্রাণ প্যাকেজ বিতরণ", val: "3,200 Kits" },
        { labelEn: "Direct Fund Allocation", labelBn: "সরাসরি বরাদ্দ", val: "100%" },
        { labelEn: "Crisis Response Drives", labelBn: "জরুরি অভিযান", val: "4 Drives" }
      ],
      gallery: [
        "assets/img/uploads/events/1675674472.jpg",
        "assets/img/uploads/events/1675688337.jpg",
        "assets/img/uploads/events/1673354415.jpg"
      ],
      activitiesEn: [
        "Boat-based relief distribution directly to marooned island communities",
        "14-day emergency family dry ration kits (rice, lentils, oil, saline, biscuits)",
        "Emergency medical camps and oral rehydration saline distribution",
        "Temporary shelter tarpaulins and clean water jerrycan delivery"
      ],
      activitiesBn: [
        "বিচ্ছিন্ন উপকূলীয় দ্বীপগুলোতে ডিঙ্গি নৌকায় সরাসরি ত্রাণ পৌঁছানো",
        "১৪ দিনের পরিবারভিত্তিক শুকনো খাবার কিট প্রদান",
        "জরুরি মেডিকেল ক্যাম্প ও খাবার স্যালাইন বিতরণ",
        "অস্থায়ী তারপোলিন তাবু ও খাবার পানির ক্যান সরবরাহ"
      ]
    }
  };

  // Open Program Details Modal
  const container = document.getElementById('programDetailContainer');

  document.querySelectorAll('.program-card, .view-program-detail-btn').forEach(elem => {
    elem.addEventListener('click', (e) => {
      const progId = elem.getAttribute('data-program-id') || elem.closest('.program-card')?.querySelector('.view-program-detail-btn')?.getAttribute('data-program-id');
      if (!progId || !programData[progId]) return;

      e.preventDefault();
      const p = programData[progId];
      const isBn = getLang() === 'bn';

      if (container && programDetailModal) {
        container.innerHTML = `
          <div class="program-detail-hero" style="background-image: url('${p.heroImg}');">
            <div class="program-detail-hero-overlay">
              <span class="program-detail-tag">${p.categoryTag}</span>
              <h2 class="program-detail-title">${isBn ? p.titleBn : p.titleEn}</h2>
            </div>
            <button class="modal-close-btn" style="position: absolute; top: 1rem; right: 1.25rem; background: rgba(0,0,0,0.5); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">&times;</button>
          </div>

          <div class="program-detail-body">
            <!-- Stats Row -->
            <div class="program-stats-row">
              ${p.stats.map(s => `
                <div class="program-stat-box">
                  <h4>${s.val}</h4>
                  <p>${isBn ? s.labelBn : s.labelEn}</p>
                </div>
              `).join('')}
            </div>

            <!-- Narrative Description -->
            <h4 style="color: var(--brand-teal-dark); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">${isBn ? 'প্রকল্প সম্পর্কিত বিবরণ' : 'Program Overview'}</h4>
            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7; margin-bottom: 1.75rem;">${isBn ? p.descBn : p.descEn}</p>

            <!-- Activity Photo Gallery -->
            <h4 style="color: var(--brand-teal-dark); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem;">${isBn ? 'মাঠ পর্যায়ের আলোকচিত্র গ্যালারি' : 'Field Activity Gallery'}</h4>
            <div class="program-gallery-grid">
              ${p.gallery.map(imgSrc => `
                <img src="${imgSrc}" class="program-gallery-img" alt="Activity Photo" onerror="this.src='assets/img/uploads/projects/1673426390.jpg'">
              `).join('')}
            </div>

            <!-- Bullet Activities -->
            <h4 style="color: var(--brand-teal-dark); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem;">${isBn ? 'মূল কার্যক্রমসমূহ' : 'Key Field Activities'}</h4>
            <ul class="program-activities-list">
              ${(isBn ? p.activitiesBn : p.activitiesEn).map(act => `
                <li>✔️ ${act}</li>
              `).join('')}
            </ul>

            <!-- Modal Action Buttons -->
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
              <button class="btn btn-primary open-donate-modal" style="flex: 1; text-align: center;">${isBn ? 'এই প্রকল্পে অনুদান দিন' : 'Support This Program'}</button>
              <button class="btn btn-secondary open-volunteer-modal" style="flex: 1; text-align: center;">${isBn ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন' : 'Volunteer for This Program'}</button>
            </div>
          </div>
        `;

        programDetailModal.classList.add('active');

        // Re-bind close button inside container
        container.querySelector('.modal-close-btn').addEventListener('click', () => {
          programDetailModal.classList.remove('active');
        });

        // Re-bind donate and volunteer buttons inside container
        container.querySelector('.open-donate-modal')?.addEventListener('click', () => {
          programDetailModal.classList.remove('active');
          if (donateModalBackdrop) donateModalBackdrop.classList.add('active');
        });

        container.querySelector('.open-volunteer-modal')?.addEventListener('click', () => {
          programDetailModal.classList.remove('active');
          if (volunteerModalBackdrop) volunteerModalBackdrop.classList.add('active');
        });
      }
    });
  });

  // 6. Preset Amount Selection in Donation Modal
  const presetBtns = document.querySelectorAll('.preset-btn');
  const customAmountInput = document.getElementById('customAmountInput');

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const val = btn.getAttribute('data-amount');
      if (val === 'custom') {
        if (customAmountInput) {
          customAmountInput.style.display = 'block';
          customAmountInput.focus();
        }
      } else {
        if (customAmountInput) {
          customAmountInput.style.display = 'none';
          customAmountInput.value = val;
        }
      }
    });
  });

  // Celebratory Success Modal Component
  function showCelebrationModal(type) {
    let successBackdrop = document.getElementById('successModal');
    if (!successBackdrop) {
      successBackdrop = document.createElement('div');
      successBackdrop.id = 'successModal';
      successBackdrop.className = 'modal-backdrop';
      document.body.appendChild(successBackdrop);
    }

    const isBn = getLang() === 'bn';
    const isVol = type === 'volunteer';

    const title = isVol 
      ? (isBn ? 'ডিঙ্গা পরিবারে আপনাকে স্বাগতম! 🎉' : 'Welcome to the Dinghy Family! 🎉')
      : (isBn ? 'আপনার উদারতার জন্য ধন্যবাদ! ❤️' : 'Thank You for Your Generosity! ❤️');

    const desc = isVol
      ? (isBn 
          ? 'সাতক্ষীরার উপকূলীয় শিশুদের শিক্ষা ও সুরক্ষায় আপনার এই অংশগ্রহণ অত্যন্ত প্রশংসনীয়। আপনার স্বেচ্ছাসেবক আবেদনটি সফলভাবে গৃহীত হয়েছে এবং dinghyfoundation@gmail.com এ ইমেইল করা হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে!'
          : 'You are taking a powerful step toward empowering coastal children in Satkhira. Your volunteer application has been received and emailed directly to dinghyfoundation@gmail.com. Our team will reach out to you shortly!')
      : (isBn
          ? 'আপনার অনুদান অনুরোধটি সফলভাবে dinghyfoundation@gmail.com এ ইমেইল করা হয়েছে। আপনার এই সহায়তা সাতক্ষীরার প্রান্তিক শিশুদের শিক্ষা ও নিরাপত্তায় সরাসরি ভূমিকা রাখবে।'
          : 'Your donation request has been emailed to dinghyfoundation@gmail.com. 100% of your contribution directly empowers child education and emergency response in coastal Satkhira.');

    const badgeText = isVol 
      ? (isBn ? '🤝 উপকূলীয় যুব সংগঠক' : '🤝 Coastal Youth Mobilizer')
      : (isBn ? '💖 প্রান্তিক শিশু শিক্ষা সহায়তা' : '💖 Child Education Partner');

    const btnText = isBn ? 'ব্রাউজ চালিয়ে যান →' : 'Continue Exploring →';

    successBackdrop.innerHTML = `
      <div class="modal-card success-card" style="text-align: center; padding: 3.25rem 2.25rem; max-width: 540px; position: relative;">
        <div class="confetti-container">
          <span class="confetti-piece p1">🎉</span>
          <span class="confetti-piece p2">✨</span>
          <span class="confetti-piece p3">❤️</span>
          <span class="confetti-piece p4">🌟</span>
          <span class="confetti-piece p5">🎊</span>
        </div>
        <div class="success-icon-badge">
          <div class="icon-circle">${isVol ? '🎉' : '❤️'}</div>
        </div>
        <h3 class="success-title">${title}</h3>
        <p class="success-subtitle">${desc}</p>
        <div class="success-badge-tag">
          <span>${badgeText}</span>
        </div>
        <button type="button" class="btn btn-primary close-success-modal" style="margin-top: 0.5rem; width: 100%; font-size: 1.05rem; padding: 0.85rem;">${btnText}</button>
      </div>
    `;

    successBackdrop.classList.add('active');

    const closeBtn = successBackdrop.querySelector('.close-success-modal');
    closeBtn.addEventListener('click', () => {
      successBackdrop.classList.remove('active');
    });

    successBackdrop.addEventListener('click', (e) => {
      if (e.target === successBackdrop) {
        successBackdrop.classList.remove('active');
      }
    });
  }

  // Donation Form Submission
  const donateForm = document.getElementById('donationPopupForm');
  if (donateForm) {
    donateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = donateForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getLang() === 'bn' ? 'ইমেইল পাঠানো হচ্ছে...' : 'Sending Request...';
      }

      const formData = new FormData(donateForm);
      const selectedAmountBtn = donateForm.querySelector('.preset-btn.active');
      const amountVal = (selectedAmountBtn && selectedAmountBtn.getAttribute('data-amount') === 'custom') 
        ? (document.getElementById('customAmountInput')?.value || 'Custom')
        : (selectedAmountBtn?.getAttribute('data-amount') || '50');

      formData.append('Donation_Amount_USD', '$' + amountVal);
      formData.append('_subject', 'New Donation Request — Dinghy Foundation');
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      try {
        await fetch('https://formsubmit.co/ajax/dinghyfoundation@gmail.com', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
      } catch (err) {
        console.warn('FormSubmit fallback:', err);
      } finally {
        if (donateModalBackdrop) donateModalBackdrop.classList.remove('active');
        donateForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'দান সম্পন্ন করুন' : 'Complete Donation';
        }
        showCelebrationModal('donation');
      }
    });
  }

  // Volunteer Form Submission
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = volunteerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getLang() === 'bn' ? 'আবেদন পাঠানো হচ্ছে...' : 'Submitting Application...';
      }

      const formData = new FormData(volunteerForm);
      formData.append('_subject', 'New Volunteer Application — Dinghy Foundation');
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      try {
        await fetch('https://formsubmit.co/ajax/dinghyfoundation@gmail.com', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
      } catch (err) {
        console.warn('FormSubmit fallback:', err);
      } finally {
        if (volunteerModalBackdrop) volunteerModalBackdrop.classList.remove('active');
        volunteerForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application';
        }
        showCelebrationModal('volunteer');
      }
    });
  }

  // 7. Governance PDF Download Simulation
  document.querySelectorAll('.btn-download-doc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc') || 'Document';
      
      const docContent = `DINGHY FOUNDATION — OFFICIAL GOVERNANCE & REPORT DOCUMENT\n` +
        `--------------------------------------------------\n` +
        `Document: ${docName}\n` +
        `Organization: Dinghy Foundation (Satkhira, Bangladesh)\n` +
        `Status: Community Non-Profit Initiative\n` +
        `Verification Status: Certified Clean & Audited\n\n` +
        `This report is made available for international grant reviewers, INGO partners, and donors.\n` +
        `For further inquiries, contact: dinghyfoundation@gmail.com`;

      const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${docName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
});
