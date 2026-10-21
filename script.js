/**
 * Mezmure Dawit Spiritual Chant Training Institute - Link Hub
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initParticles();
  initLanguage();
  initModals();
  initQrCode();
  initShare();
});

// 1. Dynamic Year
function initYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// 2. Ambient Floating Spiritual Particles
function initParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;

  const particleCount = 18;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'ambient-particle';
    
    const size = Math.random() * 5 + 3; // 3px to 8px
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 15 + 12; // 12s to 27s
    const delay = Math.random() * 10; // 0s to 10s
    const opacity = Math.random() * 0.5 + 0.3;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = opacity;

    container.appendChild(particle);
  }
}

// 3. Bilingual Support (Amharic <-> English)
let currentLang = 'am';

function initLanguage() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langText = document.getElementById('langText');

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'am' ? 'en' : 'am';
      langText.textContent = currentLang === 'am' ? 'EN' : 'አማ';
      document.documentElement.lang = currentLang;
      applyLanguage(currentLang);
      showToast(currentLang === 'am' ? 'ቋንቋ ወደ አማርኛ ተቀይሯል' : 'Language switched to English');
    });
  }
}

function applyLanguage(lang) {
  const translatableElements = document.querySelectorAll('[data-am][data-en]');
  translatableElements.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });
}

// 4. Toast Notification
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 2600);
}

// 5. Copy Helpers
window.copyText = function(text, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(currentLang === 'am' ? `ስልክ ቁጥር ተቀድቷል: ${text}` : `Copied: ${text}`);
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
};

window.copyAddress = function() {
  const mapsLink = "https://maps.app.goo.gl/cDcXcNBFJGvhCtky9";

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(mapsLink).then(() => {
      showToast(currentLang === 'am' ? 'የካርታው ሊንክ ተቀድቷል!' : 'Google Maps link copied!');
    }).catch(() => fallbackCopy(mapsLink));
  } else {
    fallbackCopy(mapsLink);
  }
};

window.copyPageUrl = function() {
  const url = window.location.href;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(currentLang === 'am' ? 'የገጹ ሊንክ ተቀድቷል!' : 'Hub link copied!');
    }).catch(() => fallbackCopy(url));
  } else {
    fallbackCopy(url);
  }
};

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(currentLang === 'am' ? 'ተቀድቷል!' : 'Copied to clipboard!');
  } catch (err) {
    showToast(currentLang === 'am' ? 'መቅዳት አልተሳካም' : 'Could not copy');
  }
  document.body.removeChild(textArea);
}

// 6. Native Share API & Fallback
function initShare() {
  const shareBtn = document.getElementById('shareBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const title = currentLang === 'am' 
      ? 'መዝሙረ ዳዊት መንፈሳዊ የዜማ ማሰልጠኛ ተቋም' 
      : 'Mezmure Dawit Spiritual Chant Institute';
    const text = currentLang === 'am'
      ? 'ይፋዊ የማኅበራዊ ሚዲያ ገጾችና መረጃዎች ሊንክ ሀብ'
      : 'Official Social Media Link Hub';
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyPageUrl();
        }
      }
    } else {
      copyPageUrl();
    }
  });
}

// 7. QR Code Generation
let qrInstance = null;
function initQrCode() {
  const qrBox = document.getElementById('qrcode');
  if (!qrBox || typeof QRCode === 'undefined') return;

  const currentUrl = window.location.href.startsWith('http') 
    ? window.location.href 
    : 'https://maps.app.goo.gl/cDcXcNBFJGvhCtky9';

  qrBox.innerHTML = '';
  qrInstance = new QRCode(qrBox, {
    text: currentUrl,
    width: 180,
    height: 180,
    colorDark: '#082315',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

// 8. Modals (QR Code)
function initModals() {
  const qrModal = document.getElementById('qrModal');
  const qrModalBtn = document.getElementById('qrModalBtn');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (qrModalBtn && qrModal) {
    qrModalBtn.addEventListener('click', () => openModal(qrModal));
  }
  if (closeQrModalBtn && qrModal) {
    closeQrModalBtn.addEventListener('click', () => closeModal(qrModal));
  }

  // Click outside backdrop to close
  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        closeModal(qrModal);
      }
    });
  }

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(qrModal);
    }
  });
}
