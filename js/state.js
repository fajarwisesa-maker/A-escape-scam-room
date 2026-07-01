/* =============================================================
   Cyber Escape State
   Shared runtime state and DOM lookup helper.
   ============================================================= */

// ===== 7. GAME STATE =====
    const state = {
      currentCase: -1, currentSlideIndex: 0, phase: 'splash',
      isTyping: false, typingTimeout: null, currentChoice: null,
      currentSlides: null, resultRecorded: false, achievementFilter: 'all',
    };
    const $ = id => document.getElementById(id);

window.CyberEscapeState = {
  state,
  $,
};
