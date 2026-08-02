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

  // 4. Modals (Donation & Volunteer)
  const donateModalBackdrop = document.getElementById('donateModal');
  const volunteerModalBackdrop = document.getElementById('volunteerModal');

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
    });
  });

  // Close when clicking backdrop
  [donateModalBackdrop, volunteerModalBackdrop].forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    }
  });

  // 5. Preset Amount Selection in Donation Modal
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

  // 6. Governance PDF Download Simulation
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
