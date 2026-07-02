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
<<<<<<< HEAD
// Expose core element selector and state tracker globally
window.$ = $;
window.state = state;
=======
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
