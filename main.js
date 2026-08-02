// Main Frontend Logic & Interactions for Dinga Foundation Website
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
      e.preventDefault();
      if (donateModalBackdrop) donateModalBackdrop.classList.add('active');
    });
  });

  // Open Volunteer Modal buttons
  document.querySelectorAll('.open-volunteer-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (volunteerModalBackdrop) volunteerModalBackdrop.classList.add('active');
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

  // Donation Form Submission
  const donateForm = document.getElementById('donationPopupForm');
  if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = donateForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getLang() === 'bn' ? 'প্রসেসিং হচ্ছে...' : 'Processing Donation...';
      }

      setTimeout(() => {
        alert(getLang() === 'bn' ? 
          'আপনার অনুদান অনুরোধটি সফলভাবে গৃহীত হয়েছে! ডিঙ্গা ফাউন্ডেশনের পক্ষ থেকে আপনাকে আন্তরিক ধন্যবাদ।' : 
          'Thank you! Your donation request has been received. Dinghy Foundation deeply appreciates your support.');
        if (donateModalBackdrop) donateModalBackdrop.classList.remove('active');
        donateForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'দান সম্পন্ন করুন' : 'Complete Donation';
        }
      }, 1200);
    });
  }

  // Volunteer Form Submission
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = volunteerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getLang() === 'bn' ? 'জমাদান হচ্ছে...' : 'Submitting...';
      }

      setTimeout(() => {
        alert(getLang() === 'bn' ? 
          'আপনার স্বেচ্ছাসেবক আবেদনটি সফলভাবে গৃহীত হয়েছে! আমাদের সহকর্মী শীঘ্রই আপনার সাথে যোগাযোগ করবেন।' : 
          'Your volunteer application has been submitted successfully! Our coordinator will contact you shortly.');
        if (volunteerModalBackdrop) volunteerModalBackdrop.classList.remove('active');
        volunteerForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application';
        }
      }, 1200);
    });
  }

  // 6. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('contactFormAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = getLang() === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...';
      }

      setTimeout(() => {
        if (formAlert) {
          formAlert.classList.add('success');
          formAlert.style.display = 'block';
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = getLang() === 'bn' ? 'বার্তা পাঠান' : 'Send Message';
        }
        setTimeout(() => {
          if (formAlert) formAlert.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }

  // 7. Governance PDF Download Simulation
  document.querySelectorAll('.btn-download-doc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc') || 'Document';
      
      // Generate a clean summary blob for governance verification
      const docContent = `DINGA FOUNDATION — OFFICIAL GOVERNANCE & REPORT DOCUMENT\n` +
        `--------------------------------------------------\n` +
        `Document: ${docName}\n` +
        `Organization: Dinga Foundation (Satkhira, Bangladesh)\n` +
        `NGO Bureau Registration Number: #3412\n` +
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
