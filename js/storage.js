/* =============================================================
   Cyber Escape Storage
   localStorage persistence and progress validation.
   ============================================================= */

// ===== 2. SAVE MANAGER =====
    const SaveManager = {
      KEY: 'cyberEscape_v1',
      data: {
        lang: 'id',
        score: 0,
        achievements: [],
        achievementMeta: {},
        completedCases: {},
        lastProgress: null,
        settings: { soundEnabled: true, reducedMotion: false },
      },
      load() {
        try {
          const raw = localStorage.getItem(this.KEY);
          if (raw) { const d = JSON.parse(raw); Object.assign(this.data, d); }
          if (!this.data.completedCases) this.data.completedCases = {};
          if (!Array.isArray(this.data.achievements)) this.data.achievements = [];
          if (!this.data.achievementMeta) this.data.achievementMeta = {};
          if (!this.data.settings) this.data.settings = {};
          this.data.settings = Object.assign({ soundEnabled: true, reducedMotion: false }, this.data.settings);
          this.data.achievements.forEach(id => {
            if (!this.data.achievementMeta[id]) this.data.achievementMeta[id] = { unlockedAt: null };
          });
          this.recalculateScore();
          currentLang = this.data.lang || 'id';
        } catch (e) { /* ignore */ }
      },
      save() {
        try {
          this.recalculateScore();
          this.data.lang = currentLang;
          localStorage.setItem(this.KEY, JSON.stringify(this.data));
        } catch (e) { /* ignore */ }
      },
      reset() {
        const settings = Object.assign({ soundEnabled: true, reducedMotion: false }, this.data.settings || {});
        this.data = { lang: currentLang, score: 0, achievements: [], achievementMeta: {}, completedCases: {}, lastProgress: null, settings };
        this.save();
      },
      recalculateScore() {
        this.data.score = Object.values(this.data.completedCases || {}).reduce((sum, item) => sum + (Number(item.score) || 0), 0);
        if (this.data.score < 0) this.data.score = 0;
      },
      hasAchievement(id) { return this.data.achievements.includes(id); },
      addAchievement(id) {
        if (!this.hasAchievement(id)) {
          this.data.achievements.push(id);
          this.data.achievementMeta[id] = { unlockedAt: new Date().toISOString() };
          this.save();
          return true;
        }
        return false;
      },
      completeCase(caseId, choice) {
        this.data.completedCases[caseId] = {
          choiceId: choice.id,
          risk: choice.risk,
          score: choice.score,
          completedAt: new Date().toISOString(),
          title: T(choice.label),
        };
        this.data.lastProgress = { caseId, choiceId: choice.id, risk: choice.risk };
        this.save();
      },
      isCaseCompleted(caseId) { return !!this.data.completedCases[caseId]; },
      getCaseScore(caseId) { return this.data.completedCases[caseId]?.score || 0; },
    };

window.CyberEscapeStorage = SaveManager;
// Expose the persistence manager globally
window.SaveManager = SaveManager;