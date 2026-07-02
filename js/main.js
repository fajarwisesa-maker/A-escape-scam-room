/* =============================================================
   Cyber Escape Main (Fixed Namespacing)
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  window.CyberEscapeGame.init();

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.id === 'vn-dialog') {
      e.preventDefault();
      window.CyberEscapeGame.advanceDialog(); // ✅ Fixed
    }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.id === 'notification') {
      e.preventDefault();
      window.CyberEscapeGame.onNotificationClick(); // ✅ Fixed
    }
    if (e.key === 'Escape' && $('confirm-modal').classList.contains('active')) {
      // Assuming closeConfirmModal lives in UI namespace
      window.CyberEscapeUI.closeConfirmModal(); // ✅ Fixed
    }
  });

  console.log('🛡️ Cyber Escape: Perangkap Digital Loaded.');
});