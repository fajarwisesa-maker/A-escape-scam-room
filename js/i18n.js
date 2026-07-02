/* =============================================================
   Cyber Escape I18N
   Language state, translations, and text metadata.
   ============================================================= */

// ===== 1. BILINGUAL SYSTEM =====
    let currentLang = 'id';
    function T(obj) {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[currentLang] || obj.id || '';
    }

// ===== 5. UI STRINGS =====
    const UI = {
      tagline: { id: 'Perangkap Digital', en: 'The Digital Trap' },
      splashDesc: { id: 'Bisakah kamu mengenali penipuan digital sebelum terlambat?\nBelajar mengenali scam sebelum kamu jadi korban.', en: 'Can you spot digital scams before it\'s too late?\nLearn to recognize scams before you become a victim.' },
      startBtn: { id: '🎮 Mulai Game', en: '🎮 Start Game' },
      splashFooter: { id: 'Dibuat untuk edukasi keamanan digital pelajar Indonesia 🇮🇩', en: 'Built for Indonesian student cybersecurity education 🇮🇩' },
      splashTagline: { id: 'Kenali Modusnya. Ambil Keputusan. Selamatkan Datamu.', en: 'Spot the Scam. Make the Call. Save Your Data.' },
      caseCta: { id: 'Mulai Investigasi', en: 'Start Investigation' },
      caseLockedCta: { id: 'Segera Hadir', en: 'Coming Soon' },
      rankMax: { id: 'Rank tertinggi tercapai!', en: 'Max rank reached!' },
      rankPtsTo: { id: 'poin lagi', en: 'pts to go' },
      menuStart: { id: 'Mulai Game', en: 'Start Game' },
      menuCases: { id: 'Pilih Kasus', en: 'Select Case' },
      menuAchieve: { id: 'Pencapaian', en: 'Achievements' },
      menuSettings: { id: 'Pengaturan', en: 'Settings' },
      menuReset: { id: 'Reset Progress', en: 'Reset Progress' },
      menuAbout: { id: 'Tentang Game', en: 'About Game' },
      menuLangBtn: { id: '🌐 English', en: '🌐 Bahasa Indonesia' },
      menuScore: { id: 'Skor Keamanan: ', en: 'Security Score: ' },
      statScore: { id: 'Skor Total', en: 'Total Score' },
      statRank: { id: 'Rank Saat Ini', en: 'Current Rank' },
      statCases: { id: 'Kasus Selesai', en: 'Cases Done' },
      statAchievements: { id: 'Badge Terbuka', en: 'Badges Unlocked' },
      statusAvailable: { id: 'Available', en: 'Available' },
      bestScore: { id: 'Best Score', en: 'Best Score' },
      platformLabel: { id: 'Platform', en: 'Platform' },
      csTitle: { id: '📋 Pilih Kasus Simulasi', en: '📋 Select Simulation Case' },
      csDesc: { id: 'Pilih skenario kejahatan siber yang ingin kamu selidiki.', en: 'Choose a cyber threat scenario to investigate.' },
      csBack: { id: '← Kembali ke Menu', en: '← Back to Menu' },
      achTitle: { id: '🏆 Pencapaian', en: '🏆 Achievements' },
      achDesc: { id: 'Kumpulkan lencana dengan membuat keputusan aman!', en: 'Collect badges by making safe decisions!' },
      achProgress: { id: 'Progress Badge', en: 'Badge Progress' },
      filterAll: { id: 'Semua', en: 'All' },
      filterUnlocked: { id: 'Terbuka', en: 'Unlocked' },
      filterLocked: { id: 'Terkunci', en: 'Locked' },
      unlockedOn: { id: 'Terbuka:', en: 'Unlocked:' },
      lockedHint: { id: 'Selesaikan kasus untuk membuka', en: 'Complete cases to unlock' },
      setTitle: { id: '⚙️ Pengaturan', en: '⚙️ Settings' },
      setLang: { id: '🌐 Bahasa / Language', en: '🌐 Language' },
      setSound: { id: '🔊 Suara', en: '🔊 Sound' },
      setMotion: { id: '✨ Animasi', en: '✨ Motion' },
      setOn: { id: 'Aktif', en: 'On' },
      setOff: { id: 'Mati', en: 'Off' },
      setMotionReduce: { id: 'Kurangi Animasi', en: 'Reduce Motion' },
      setReset: { id: '🗑️ Reset Progress', en: '🗑️ Reset Progress' },
      setResetBtn: { id: 'Reset Semua Data', en: 'Reset All Data' },
      setResetConfirm: { id: 'Yakin ingin menghapus semua data? Skor dan achievement akan hilang.', en: 'Are you sure you want to reset all data? Score and achievements will be lost.' },
      confirmCancel: { id: 'Batal', en: 'Cancel' },
      confirmReset: { id: 'Ya, Reset', en: 'Yes, Reset' },
      aboutTitle: { id: 'Tentang Game', en: 'About the Game' },
      aboutLead: { id: 'Cyber Escape membantu pelajar mengenali scam lewat simulasi chat yang dekat dengan kehidupan sehari-hari.', en: 'Cyber Escape helps students recognize scams through chat simulations inspired by everyday digital life.' },
      aboutItems: [
        { title: { id: 'Target Pemain', en: 'Players' }, body: { id: 'Remaja SMP/SMA yang sering memakai chat, game, media sosial, dan browser.', en: 'Middle and high school students who use chat, games, social media, and browsers.' } },
        { title: { id: 'Cara Main', en: 'How to Play' }, body: { id: 'Baca situasi, pilih tindakan, lalu pelajari red flag dan langkah aman.', en: 'Read the situation, choose an action, then learn the red flags and safe steps.' } },
        { title: { id: 'Istilah Teknis', en: 'Technical Terms' }, body: { id: 'Setiap istilah penting dijelaskan singkat agar tidak terasa seperti hafalan.', en: 'Important terms are explained briefly so it feels practical, not like memorization.' } },
        { title: { id: 'Privasi', en: 'Privacy' }, body: { id: 'Progress hanya tersimpan di browser kamu lewat localStorage.', en: 'Progress is saved only in your browser through localStorage.' } },
      ],
      comingSoon: { id: 'Segera Hadir', en: 'Coming Soon' },
      completed: { id: 'Selesai', en: 'Done' },
      locked: { id: '🔒', en: '🔒' },
      unlocked: { id: '✅', en: '✅' },
      choicePrompt: { id: '⚡ Kamu harus memutuskan sekarang:', en: '⚡ You must decide now:' },
      choiceTitle: { id: 'Pilih tindakanmu', en: 'Choose your action' },
      choiceMicrocopy: { id: 'Pikirkan dulu sebelum klik. Keputusanmu memengaruhi skor keamanan digital.', en: 'Think before you click. Your decision affects your digital security score.' },
      vnName: { id: '💭 Kamu', en: '💭 You' },
      vnContinue: { id: '▼ Klik untuk lanjut', en: '▼ Click to continue' },
      notifHint: { id: '👆 Klik untuk membuka', en: '👆 Click to open' },
      riskSafe: { id: '✅ AMAN', en: '✅ SAFE' },
      riskCautious: { id: '⚠️ CUKUP AMAN', en: '⚠️ FAIRLY SAFE' },
      riskRisky: { id: '🟠 BERISIKO', en: '🟠 RISKY' },
      riskFatal: { id: '🔴 FATAL', en: '🔴 FATAL' },
      eduLearnBtn: { id: 'Pelajari kenapa ini terjadi →', en: 'Learn why this happened →' },
      eduBackMenu: { id: '← Kembali ke Menu Kasus', en: '← Back to Case Menu' },
      eduRetry: { id: '🔄 Ulangi Kasus', en: '🔄 Retry Case' },
      eduNext: { id: '➡️ Kembali ke Menu Kasus', en: '➡️ Back to Case Menu' },
      eduStatus: { id: 'Status pilihan:', en: 'Choice status:' },
      eduTermTitle: { id: '🧠 Istilah Singkat:', en: '🧠 Quick Terms:' },
      nearmissTitle: { id: 'Hampir Saja!', en: 'That Was Close!' },
      nearmissBtn: { id: 'Pelajari lebih lanjut →', en: 'Learn more →' },
      ccTitle: { id: 'CASE CLOSED', en: 'CASE CLOSED' },
      ccBtn: { id: '➡️ Kembali ke Menu', en: '➡️ Back to Menu' },
      endTitle: { id: 'SELAMAT!', en: 'CONGRATULATIONS!' },
      endSubtitle: { id: 'Kamu telah menyelesaikan semua kasus!', en: 'You have completed all available cases!' },
      endScoreLabel: { id: 'SKOR KEAMANAN DIGITAL', en: 'DIGITAL SECURITY SCORE' },
      endCompletedLabel: { id: 'Kasus selesai', en: 'Cases completed' },
      endCertificateLabel: { id: 'SERTIFIKAT', en: 'CERTIFICATE' },
      endCertificateName: { id: 'Digital Defender', en: 'Digital Defender' },
      endCertificateNote: { id: 'Diberikan karena kamu menyelesaikan semua simulasi scam yang tersedia.', en: 'Awarded for completing all available scam simulations.' },
      endRankLabel: { id: '✦ RANK ✦', en: '✦ RANK ✦' },
      endAchieveTitle: { id: 'Lencana Pencapaian:', en: 'Achievement Badges:' },
      endPrinciplesTitle: { id: '3 Prinsip Utama Keamanan Digital:', en: '3 Key Digital Security Principles:' },
      endP1: { id: '<strong>Selalu cek</strong> — siapa pengirimnya, apa domain-nya, apakah akun terverifikasi', en: '<strong>Always verify</strong> — who sent it, what\'s the domain, is the account verified' },
      endP2: { id: '<strong>Jangan asal klik</strong> — file/link dari orang tidak dikenal = potensi bahaya', en: '<strong>Don\'t click blindly</strong> — files/links from strangers = potential danger' },
      endP3: { id: '<strong>Aktifkan proteksi</strong> — 2FA, antivirus, update rutin', en: '<strong>Enable protection</strong> — 2FA, antivirus, regular updates' },
      endQuote: { id: '"Internet itu seru, tapi tetap harus waspada. Stay safe, stay smart!" 💪', en: '"The internet is fun, but stay alert. Stay safe, stay smart!" 💪' },
      endRestart: { id: '🔄 Main Lagi', en: '🔄 Play Again' },
      endMenu: { id: '🏠 Menu Utama', en: '🏠 Main Menu' },
      endCopy: { id: '📋 Copy Hasil', en: '📋 Copy Result' },
      endCopied: { id: 'Hasil disalin!', en: 'Result copied!' },
      endReset: { id: '🗑️ Reset Progress', en: '🗑️ Reset Progress' },
      toastLabel: { id: 'PENCAPAIAN TERBUKA', en: 'ACHIEVEMENT UNLOCKED' },
      redFlagsTitle: { id: '🚩 Red Flags yang Terdeteksi:', en: '🚩 Detected Red Flags:' },
      tipsTitle: { id: '🛡️ Cara Aman:', en: '🛡️ Safe Actions:' },
      whatToDoTitle: { id: '🚨 Jika Sudah Terlanjur:', en: '🚨 If You Already Fell For It:' },
      quoteTitle: { id: '💡 Jurus Aman:', en: '💡 Safety Mantra:' },
    };

    const TERM_DEFS = {
      apk: { term: { id: 'APK', en: 'APK' }, desc: { id: 'File aplikasi Android. Aman hanya jika dari sumber resmi seperti Play Store.', en: 'An Android app file. Safer when installed from official sources like Play Store.' } },
      otp: { term: { id: 'OTP', en: 'OTP' }, desc: { id: 'Kode sekali pakai untuk login/transaksi. Jangan pernah dibagikan.', en: 'A one-time code for login or payment. Never share it.' } },
      phishing: { term: { id: 'Phishing', en: 'Phishing' }, desc: { id: 'Trik membuat halaman/login palsu agar korban menyerahkan data.', en: 'A trick that uses fake pages/logins to steal your data.' } },
      malware: { term: { id: 'Malware', en: 'Malware' }, desc: { id: 'Program jahat yang bisa mencuri data atau merusak perangkat.', en: 'Malicious software that can steal data or harm a device.' } },
      twofa: { term: { id: '2FA', en: '2FA' }, desc: { id: 'Kunci tambahan setelah password, misalnya kode aplikasi autentikator.', en: 'An extra lock after your password, such as an authenticator app code.' } },
      domain: { term: { id: 'Domain', en: 'Domain' }, desc: { id: 'Alamat utama website. Domain palsu sering dibuat mirip situs resmi.', en: 'A website address. Fake domains are often made to look official.' } },
      social: { term: { id: 'Social engineering', en: 'Social engineering' }, desc: { id: 'Trik memanipulasi rasa percaya, panik, atau kasihan agar korban mengikuti perintah penipu.', en: 'A trick that manipulates trust, panic, or sympathy so victims follow a scammer.' } },
    };

    const RISK_META = {
      safe: { label: UI.riskSafe, score: 100 },
      cautious: { label: UI.riskCautious, score: 60 },
      risky: { label: UI.riskRisky, score: 30 },
      fatal: { label: UI.riskFatal, score: -100 },
    };

window.CyberEscapeI18N = {
  T,
  get currentLang() { return currentLang; },
  set currentLang(lang) { currentLang = lang; },
  UI,
  TERM_DEFS,
  RISK_META,
};
<<<<<<< HEAD
/* =============================================================
   Expose Translation Elements to Global Scope
   ============================================================= */
window.T = T;
window.UI = UI;
window.RISK_META = RISK_META;
window.currentLang = typeof currentLang !== 'undefined' ? currentLang : 'id';
=======
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
