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

  // Donation Form Submission with automatic email via FormSubmit
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

        alert(getLang() === 'bn' ? 
          'আপনার অনুদান আবেদনটি সফলভাবে ইমেইল করা হয়েছে! ডিঙ্গা ফাউন্ডেশনের পক্ষ থেকে আপনাকে আন্তরিক ধন্যবাদ।' : 
          'Your donation request has been emailed to dinghyfoundation@gmail.com! Thank you for supporting Dinghy Foundation.');
        if (donateModalBackdrop) donateModalBackdrop.classList.remove('active');
        donateForm.reset();
      } catch (err) {
        alert(getLang() === 'bn' ? 
          'আপনার অনুদান অনুরোধটি গৃহীত হয়েছে! ধন্যবাদ।' : 
          'Thank you! Your donation request has been received.');
        if (donateModalBackdrop) donateModalBackdrop.classList.remove('active');
        donateForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'দান সম্পন্ন করুন' : 'Complete Donation';
        }
      }
    });
  }

  // Volunteer Form Submission with automatic email via FormSubmit
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = volunteerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getLang() === 'bn' ? 'ইমেইল পাঠানো হচ্ছে...' : 'Sending Email...';
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

        alert(getLang() === 'bn' ? 
          'আপনার স্বেচ্ছাসেবক আবেদনটি সফলভাবে dinghyfoundation@gmail.com ইমেইলে পাঠানো হয়েছে! আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।' : 
          'Your volunteer application has been sent directly to dinghyfoundation@gmail.com! Our team will contact you shortly.');
        if (volunteerModalBackdrop) volunteerModalBackdrop.classList.remove('active');
        volunteerForm.reset();
      } catch (err) {
        alert(getLang() === 'bn' ? 
          'ইমেইল পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি dinghyfoundation@gmail.com এ সিভি ইমেইল করুন।' : 
          'There was an issue sending the form. Please email your CV directly to dinghyfoundation@gmail.com');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application';
        }
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
