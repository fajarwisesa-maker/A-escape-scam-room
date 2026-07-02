/* =============================================================
<<<<<<< HEAD
   Cyber Escape Main (Fixed Namespacing)
=======
   Cyber Escape Main
   Application entry point and global keyboard listeners.
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  window.CyberEscapeGame.init();

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.id === 'vn-dialog') {
      e.preventDefault();
<<<<<<< HEAD
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
=======
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
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
