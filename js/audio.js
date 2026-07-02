/* =============================================================
   Cyber Escape Audio
   Web Audio feedback with user-controlled sound toggle.
   ============================================================= */

// ===== 8. SOUND EFFECTS =====
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    function isSoundEnabled() { return SaveManager.data.settings?.soundEnabled !== false; }
    function canStartAudio() {
      return !!AudioCtx && (navigator.userActivation?.hasBeenActive !== false);
    }
    function getAudioCtx() {
      if (!canStartAudio()) return null;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      return audioCtx;
    }
    function playNotifSound() {
      if (!isSoundEnabled()) return;
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); o.type = 'sine';
        o.frequency.setValueAtTime(880, ctx.currentTime); o.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
        g.gain.setValueAtTime(0.15, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.3);
      } catch (e) { }
    }
    function playGlitchSound() {
      if (!isSoundEnabled()) return;
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const bs = ctx.sampleRate * 0.5; const buf = ctx.createBuffer(1, bs, ctx.sampleRate);
        const d = buf.getChannelData(0); for (let i = 0; i < bs; i++) d[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - i / bs);
        const s = ctx.createBufferSource(); const g = ctx.createGain(); s.buffer = buf;
        s.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5); s.start(ctx.currentTime);
      } catch (e) { }
    }
    function playSuccessSound() {
      if (!isSoundEnabled()) return;
      try {
        const ctx = getAudioCtx();[523, 659, 784].forEach((f, i) => {
          if (!ctx) return;
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination); o.type = 'sine';
          o.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
          g.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3);
          o.start(ctx.currentTime + i * 0.12); o.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
      } catch (e) { }
    }
    function playAchievementSound() {
      if (!isSoundEnabled()) return;
      try {
        const ctx = getAudioCtx();[659, 784, 988, 1047].forEach((f, i) => {
          if (!ctx) return;
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination); o.type = 'triangle';
          o.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
          g.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.35);
          o.start(ctx.currentTime + i * 0.1); o.stop(ctx.currentTime + i * 0.1 + 0.35);
        });
      } catch (e) { }
    }

window.CyberEscapeAudio = {
  isSoundEnabled,
  canStartAudio,
  playNotifSound,
  playGlitchSound,
  playSuccessSound,
  playAchievementSound,
};
