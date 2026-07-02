/* =============================================================
   Cyber Escape Achievements
   Achievement toast and achievement-related helpers.
   ============================================================= */

// ===== 14. ACHIEVEMENT TOAST =====
    let toastTimer = null;
    function showAchievementToast(achieveId) {
      const a = ACHIEVEMENTS.find(x => x.id === achieveId);
      if (!a) return;
      $('toast-icon').textContent = a.icon;
      $('toast-label').textContent = T(UI.toastLabel);
      $('toast-name').textContent = T(a.title);
      $('achievement-toast').classList.add('show');
      playAchievementSound();
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => $('achievement-toast').classList.remove('show'), 3500);
    }

window.CyberEscapeAchievements = {
  showAchievementToast,
};
<<<<<<< HEAD
window.showAchievementToast = showAchievementToast;
=======
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
