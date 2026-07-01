/* =============================================================
   Cyber Escape Main
   Application entry point and global keyboard listeners.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  window.CyberEscapeGame.init();

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.id === 'vn-dialog') {
      e.preventDefault();
      advanceDialog();
    }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.id === 'notification') {
      e.preventDefault();
      onNotificationClick();
    }
    if (e.key === 'Escape' && $('confirm-modal').classList.contains('active')) {
      closeConfirmModal();
    }
  });

  console.log('🛡️ Cyber Escape: Perangkap Digital');
  console.log('   Game Edukasi Keamanan Digital');
});

window.CyberEscapeMain = {
  init: () => window.CyberEscapeGame.init(),
};
