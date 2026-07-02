/* =============================================================
   Cyber Escape UI
   Rendering, layers, menu/settings/about screens, and reusable helpers.
   ============================================================= */

// ===== 9. CLOCK =====
    function updateClock() {
      const now = new Date();
      const t = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const d1 = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const d2 = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const dt = $('desktop-time'); if (dt) dt.textContent = t;
      const dd = $('desktop-date'); if (dd) dd.textContent = d1;
      const tt = $('taskbar-time'); if (tt) tt.textContent = t;
      const td = $('taskbar-date'); if (td) td.textContent = d2;
      const mt = $('mac-menubar-time'); if (mt) mt.textContent = t;
      const md = $('mac-menubar-date'); if (md) md.textContent = d2;
    }
    setInterval(updateClock, 1000); updateClock();

    // ===== 10. TYPEWRITER =====
    function typeText(el, text, speed = 22) {
      return new Promise(resolve => {
        state.isTyping = true; el.textContent = ''; $('vn-continue').classList.add('hidden');
        let i = 0;
        function type() {
          if (i < text.length) { el.textContent += text[i]; i++; state.typingTimeout = setTimeout(type, speed); }
          else { state.isTyping = false; $('vn-continue').classList.remove('hidden'); resolve(); }
        }
        type();
      });
    }
    function skipTyping(el, text) {
      if (state.typingTimeout) clearTimeout(state.typingTimeout);
      el.textContent = text; state.isTyping = false; $('vn-continue').classList.remove('hidden');
    }

    // ===== 11. LAYER UTILS =====
    const PRIMARY_SCREEN_IDS = ['splash-screen', 'main-menu', 'case-select', 'achievement-screen', 'settings-screen', 'about-screen', 'desktop', 'ending-screen'];

    function showLayer(id) { $(id).classList.add('active'); }
    function hideLayer(id) { $(id).classList.remove('active'); }
    function activateScreen(id) {
      PRIMARY_SCREEN_IDS.forEach(screenId => {
        const el = $(screenId);
        if (el) el.classList.toggle('active', screenId === id);
      });
      if (id) {
        const target = $(id);
        target.style.display = '';
        target.classList.add('active');
      }
    }
    function hideAllOverlays() {
      ['app-layer', 'vn-overlay', 'choice-overlay', 'glitch-layer', 'hacked-details', 'nearmiss-overlay', 'edu-screen', 'case-closed', 'confirm-modal'].forEach(id => $(id).classList.remove('active'));
      activateScreen(null);
      $('notification').classList.remove('show');
    }

    function getProgressStats() {
      const playable = getPlayableCases();
      const completed = playable.filter(c => SaveManager.isCaseCompleted(c.id)).length;
      const unlocked = SaveManager.data.achievements.length;
      return {
        score: SaveManager.data.score,
        rank: getRank(SaveManager.data.score),
        completed,
        playable: playable.length,
        unlocked,
        totalAchievements: ACHIEVEMENTS.length,
      };
    }

    const CASE_META = {
      case1: { threat: { id: 'Malware / APK Scam', en: 'Malware / APK Scam' }, danger: { level: 'high', label: { id: 'Bahaya: Tinggi', en: 'Danger: High' } } },
      case2: { threat: { id: 'Phishing / Giveaway Palsu', en: 'Phishing / Fake Giveaway' }, danger: { level: 'high', label: { id: 'Bahaya: Tinggi', en: 'Danger: High' } } },
      case3: { threat: { id: 'Social Engineering', en: 'Social Engineering' }, danger: { level: 'critical', label: { id: 'Bahaya: Kritis', en: 'Danger: Critical' } } },
      case4: { threat: { id: 'Penipuan Lowongan', en: 'Job Scam' }, danger: { level: 'medium', label: { id: 'Bahaya: Sedang', en: 'Danger: Medium' } } },
      case5: { threat: { id: 'Mod APK / Malware', en: 'Mod APK / Malware' }, danger: { level: 'high', label: { id: 'Bahaya: Tinggi', en: 'Danger: High' } } },
    };

    function renderRankProgress() {
      const el = $('menu-rank-progress');
      if (!el) return;
      const score = SaveManager.data.score;
      const rank = getRank(score);
      const idx = RANKS.indexOf(rank);
      const next = RANKS[idx + 1];
      let pct, nextTitle, remain;
      if (!next) {
        pct = 100;
        nextTitle = 'Max Rank';
        remain = 0;
      } else {
        const span = (next.min - rank.min) || 1;
        pct = Math.max(5, Math.min(100, Math.round(((score - rank.min) / span) * 100)));
        nextTitle = next.title.en || T(next.title);
        remain = Math.max(0, next.min - score);
      }
      el.innerHTML = `
        <div class="rank-prog-head">
          <strong>${rank.title.en || T(rank.title)}</strong>
          <span class="rank-prog-arrow">→</span>
          <span>${nextTitle}</span>
          <em>${next ? `${remain} pts to go` : 'Max rank reached'}</em>
        </div>
        <div class="rank-prog-track"><div class="rank-prog-fill" style="width:${pct}%"></div></div>
        <div class="rank-prog-label">${next ? `${remain} pts to go` : 'Max rank reached'}</div>`;
    }

    function renderMenuStats() {
      const stats = getProgressStats();
      const icons = {
        rank: '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3v18"/><path d="M6 8c0-3 3-5 6-5s6 2 6 5c0 4-3 7-6 7s-6-3-6-7Z"/><path d="M8 21h8"/></svg>',
        score: '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3 4 8l8 5 8-5-8-5Z"/><path d="m4 13 8 5 8-5"/><path d="m4 18 8 3 8-3"/></svg>',
        cases: '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 5h16v14H4z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',
        badges: '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 4h8v7a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5v3a4 4 0 0 0 4 4"/><path d="M16 6h3v3a4 4 0 0 1-4 4"/><path d="M12 15v4"/><path d="M8 21h8"/></svg>',
      };
      $('menu-stats').innerHTML = [
        { key: 'score', label: 'Total Score', value: `${stats.score} pts` },
        { key: 'rank', label: 'Current Rank', value: stats.rank.title.en || T(stats.rank.title) },
        { key: 'cases', label: 'Cases Done', value: `${stats.completed}/${stats.playable}` },
        { key: 'badges', label: 'Badges Unlocked', value: `${stats.unlocked}/${stats.totalAchievements}` },
      ].map(item => `
        <div class="stat-chip stat-${item.key}">
          <span class="svg-icon stat-icon" aria-hidden="true">${icons[item.key]}</span>
          <div>
            <div class="stat-value">${item.value}</div>
            <div class="stat-label">${item.label}</div>
          </div>
        </div>`).join('');
    }

    function updateDashStats() {
      try {
        var stats = getProgressStats();
        var el = function(id) { return document.getElementById(id); };
        var ds = el('dash-score'); if (ds) ds.textContent = stats.score > 0 ? stats.score.toLocaleString() : '0';
        var dc = el('dash-cases'); if (dc) dc.textContent = stats.completed + '/' + stats.playable;
        var da = el('dash-accuracy'); if (da) {
          var total = stats.completed;
          var safe = Object.values(SaveManager.data.completedCases || {}).filter(function(c) { return c.risk === 'safe' || c.risk === 'cautious'; }).length;
          da.textContent = total > 0 ? Math.round(safe / total * 100) + '%' : '—';
        }
        var dp = el('dash-progress-fill'); if (dp) {
          var pct = stats.playable > 0 ? Math.round(stats.completed / stats.playable * 100) : 0;
          dp.style.width = pct + '%';
          var pl = el('dash-progress-pct'); if (pl) pl.textContent = pct + '%';
        }
      } catch (ex) { /* ignore */ }
    }

    function getCasePlatform(c) {
      if (c.platform) return T(c.platform);
      if (c.appType === 'instagram') return 'Instagram';
      if (c.appType === 'whatsapp') return 'WhatsApp';
      return currentLang === 'id' ? 'Simulasi Digital' : 'Digital Simulation';
    }

    function getCaseRedFlags(c) {
      if (c.previewRedFlags?.length) return c.previewRedFlags.slice(0, 3);
      const choice = c.choices?.find(ch => ch.education?.redFlags?.length);
      return (choice?.education?.redFlags || []).slice(0, 3);
    }

    function getAchievementMeta(id) {
      return SaveManager.data.achievementMeta?.[id] || null;
    }

    function formatUnlockDate(iso) {
      if (!iso) return currentLang === 'id' ? 'Sebelumnya' : 'Earlier';
      try {
        return new Date(iso).toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e) {
        return currentLang === 'id' ? 'Sebelumnya' : 'Earlier';
      }
    }

    function applyUserPreferences() {
      const settings = SaveManager.data.settings || {};
      document.body.classList.toggle('reduce-motion', settings.reducedMotion === true);
    }

    // ===== 12. UPDATE UI TEXT =====
    function updateAllUIText() {
      $('splash-subtitle').textContent = T(UI.tagline);
      $('splash-desc').innerHTML = T(UI.splashDesc).replace(/\n/g, '<br>');
      $('splash-btn-text').textContent = T(UI.startBtn);
      $('splash-footer').textContent = T(UI.splashFooter);
      var _spTag = $('splash-tagline'); if (_spTag) _spTag.textContent = T(UI.splashTagline);
      $('menu-tagline').textContent = 'THE DIGITAL TRAP';
      $('menu-btn-start').textContent = 'START GAME';
      $('menu-btn-cases').textContent = 'SELECT CASE';
      $('menu-btn-achieve').textContent = 'ACHIEVEMENTS';
      $('menu-btn-settings').textContent = 'SETTINGS';
      $('menu-btn-reset').textContent = 'RESET PROGRESS';
      $('menu-btn-about').textContent = 'ABOUT GAME';
      const menuLangText = $('menu-lang-btn')?.querySelector('.lang-label');
      if (menuLangText) menuLangText.textContent = currentLang === 'id' ? 'Bahasa Indonesia' : 'English';
      $('menu-score-display').textContent = T(UI.menuScore) + SaveManager.data.score + ' pts';
      renderMenuStats();
      renderRankProgress();
      updateDashStats();
      $('cs-title').textContent = T(UI.csTitle);
      $('cs-desc').textContent = T(UI.csDesc);
      $('cs-back').textContent = T(UI.csBack);
      $('ach-title').textContent = T(UI.achTitle);
      $('ach-desc').textContent = T(UI.achDesc);
      $('ach-back').textContent = T(UI.csBack);
      $('ach-filter-all').textContent = T(UI.filterAll);
      $('ach-filter-unlocked').textContent = T(UI.filterUnlocked);
      $('ach-filter-locked').textContent = T(UI.filterLocked);
      $('set-title').textContent = T(UI.setTitle);
      $('set-lang-label').textContent = T(UI.setLang);
      $('set-sound-label').textContent = T(UI.setSound);
      $('set-motion-label').textContent = T(UI.setMotion);
      $('set-reset-label').textContent = T(UI.setReset);
      $('set-reset-btn').textContent = T(UI.setResetBtn);
      $('set-about-btn').textContent = T(UI.menuAbout);
      $('set-back').textContent = T(UI.csBack);
      $('about-title').textContent = T(UI.aboutTitle);
      $('about-lead').textContent = T(UI.aboutLead);
      $('about-back').textContent = T(UI.csBack);
      $('vn-nameplate').textContent = T(UI.vnName);
      $('vn-continue').textContent = T(UI.vnContinue);
      $('notif-hint').textContent = T(UI.notifHint);
      $('lang-id-btn').classList.toggle('active', currentLang === 'id');
      $('lang-en-btn').classList.toggle('active', currentLang === 'en');
      updateSettingsToggles();
      applyUserPreferences();
      document.documentElement.lang = currentLang;
    }

    // ===== 13. MENU FUNCTIONS =====
    function goToMainMenu() {
      $('splash-screen').classList.add('hidden');
      setTimeout(() => { $('splash-screen').style.display = 'none'; showMainMenu(); }, 800);
    }
    function showMainMenu() {
      hideAllOverlays();
      $('desktop').classList.remove('active');
      $('case-badge').classList.remove('active');
      updateAllUIText();
      activateScreen('main-menu');
      state.phase = 'mainMenu';
    }
    function backToMenu() { showMainMenu(); }

    function getPlayableCases() {
      return GAME_DATA.cases.filter(c => !c.comingSoon);
    }

    function startFirstAvailableCase() {
      const nextIndex = GAME_DATA.cases.findIndex(c => !c.comingSoon && !SaveManager.isCaseCompleted(c.id));
      startCase(nextIndex >= 0 ? nextIndex : 0);
    }

    function showCaseSelect() {
      hideAllOverlays();
      updateAllUIText();
      renderCaseGrid();
      activateScreen('case-select');
      state.phase = 'caseSelect';
    }
    function renderCaseGrid() {
      const grid = $('case-grid');
      grid.innerHTML = '';
      GAME_DATA.cases.forEach((c, i) => {
        const card = document.createElement(c.comingSoon ? 'div' : 'button');
        card.className = 'case-card' + (c.comingSoon ? ' locked' : '') + (SaveManager.isCaseCompleted(c.id) ? ' completed' : '');
        if (!c.comingSoon) {
          card.type = 'button';
          card.setAttribute('aria-label', `${T(c.title)} - ${T(UI.statusAvailable)}`);
        }
        const isCompleted = SaveManager.isCaseCompleted(c.id);
        const caseScore = SaveManager.getCaseScore(c.id);
        const redFlags = getCaseRedFlags(c);
        const cm = CASE_META[c.id] || {};
        const threatChip = cm.threat ? `<span class="mission-chip threat">🎯 ${T(cm.threat)}</span>` : '';
        const dangerChip = cm.danger ? `<span class="mission-chip danger-${cm.danger.level}">⚠️ ${T(cm.danger.label)}</span>` : '';
        const ctaHTML = c.comingSoon ? `<span class="case-cta locked">🔒 ${T(UI.caseLockedCta)}</span>` : `<span class="case-cta">${T(UI.caseCta)} →</span>`;
        const statusText = c.comingSoon ? T(UI.comingSoon) : (isCompleted ? T(UI.completed) : T(UI.statusAvailable));
        let badgeHTML = '';
        if (c.comingSoon) badgeHTML = `<span class="case-card-badge soon">${T(UI.comingSoon)}</span>`;
        else if (isCompleted) badgeHTML = `<span class="case-card-badge score">${caseScore >= 0 ? '+' : ''}${caseScore} pts</span>`;
        else badgeHTML = `<span class="case-card-badge done">${T(UI.statusAvailable)}</span>`;
        const previewHTML = redFlags.length ? `<div class="case-card-preview">${redFlags.map(flag => `<span class="case-preview-chip">🚩 ${T(flag)}</span>`).join('')}</div>` : '';
        const scoreChip = isCompleted ? `<span class="mission-chip done">${T(UI.bestScore)}: ${caseScore >= 0 ? '+' : ''}${caseScore}</span>` : '';
        card.innerHTML = `
          <div class="case-card-icon">${c.icon}</div>
          <div class="case-card-info">
            <div class="case-card-title">${T(UI.menuCases).charAt(0) === 'P' ? 'Kasus' : 'Case'} ${i + 1}: ${T(c.title)}</div>
            <div class="case-card-meta">
              <span class="mission-chip">${T(UI.platformLabel)}: ${getCasePlatform(c)}</span>
              ${threatChip}
              ${dangerChip}
              <span class="mission-chip ${isCompleted ? 'done' : c.comingSoon ? 'soon' : ''}">${statusText}</span>
              ${scoreChip}
            </div>
            <div class="case-card-desc">${T(c.description)}</div>
            ${previewHTML}
            ${ctaHTML}
          </div>
          ${badgeHTML}`;
        if (!c.comingSoon) card.onclick = () => startCase(i);
        grid.appendChild(card);
      });
    }

    function showAchievements() {
      hideAllOverlays();
      updateAllUIText();
      renderAchievements();
      activateScreen('achievement-screen');
      state.phase = 'achievements';
    }
    function renderAchievements() {
      const grid = $('achieve-grid');
      grid.innerHTML = '';
      const unlockedCount = SaveManager.data.achievements.length;
      $('achieve-progress').textContent = `${T(UI.achProgress)}: ${unlockedCount}/${ACHIEVEMENTS.length}`;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === state.achievementFilter));
      ACHIEVEMENTS.filter(a => {
        const unlocked = SaveManager.hasAchievement(a.id);
        if (state.achievementFilter === 'unlocked') return unlocked;
        if (state.achievementFilter === 'locked') return !unlocked;
        return true;
      }).forEach(a => {
        const unlocked = SaveManager.hasAchievement(a.id);
        const meta = getAchievementMeta(a.id);
        const dateHTML = unlocked ? `<div class="achieve-date">${T(UI.unlockedOn)} ${formatUnlockDate(meta?.unlockedAt)}</div>` : '';
        const item = document.createElement('div');
        item.className = 'achieve-item ' + (unlocked ? 'unlocked' : 'locked');
        item.innerHTML = `
          <div class="achieve-icon">${unlocked ? a.icon : '🔒'}</div>
          <div class="achieve-info">
            <div class="achieve-name">${unlocked ? T(a.title) : '???'}</div>
            <div class="achieve-desc">${unlocked ? T(a.desc) : T(UI.lockedHint)}</div>
            ${dateHTML}
          </div>
          <div class="achieve-lock">${unlocked ? '✅' : ''}</div>`;
        grid.appendChild(item);
      });
    }

    function setAchievementFilter(filter) {
      state.achievementFilter = filter;
      renderAchievements();
    }

    function showSettings() {
      hideAllOverlays();
      updateAllUIText();
      activateScreen('settings-screen');
      state.phase = 'settings';
    }
    function setLang(lang) {
      currentLang = lang;
      SaveManager.save();
      updateAllUIText();
      if (state.phase === 'caseSelect') renderCaseGrid();
      if (state.phase === 'achievements') renderAchievements();
      if (state.phase === 'about') renderAbout();
    }
    function toggleLang() {
      setLang(currentLang === 'id' ? 'en' : 'id');
    }
    function updateSettingsToggles() {
      const settings = SaveManager.data.settings || {};
      const soundOn = settings.soundEnabled !== false;
      const motionReduced = settings.reducedMotion === true;
      $('sound-toggle-btn').textContent = soundOn ? T(UI.setOn) : T(UI.setOff);
      $('sound-toggle-btn').classList.toggle('active', soundOn);
      $('sound-toggle-btn').setAttribute('aria-pressed', String(soundOn));
      $('motion-toggle-btn').textContent = motionReduced ? T(UI.setMotionReduce) : T(UI.setOn);
      $('motion-toggle-btn').classList.toggle('active', !motionReduced);
      $('motion-toggle-btn').setAttribute('aria-pressed', String(motionReduced));
    }
    function toggleSound() {
      SaveManager.data.settings.soundEnabled = SaveManager.data.settings.soundEnabled === false;
      SaveManager.save();
      updateAllUIText();
    }
    function toggleReducedMotion() {
      SaveManager.data.settings.reducedMotion = !SaveManager.data.settings.reducedMotion;
      SaveManager.save();
      updateAllUIText();
    }
    function resetProgress() {
      showConfirmModal(T(UI.setReset), T(UI.setResetConfirm), () => {
        SaveManager.reset();
        updateAllUIText();
        showSettings();
      });
    }

    function resetProgressFromMenu() {
      showConfirmModal(T(UI.setReset), T(UI.setResetConfirm), () => {
        SaveManager.reset();
        showMainMenu();
      });
    }

    let confirmAction = null;
    function showConfirmModal(title, message, onConfirm) {
      confirmAction = onConfirm;
      $('confirm-title').textContent = title;
      $('confirm-message').textContent = message;
      $('confirm-cancel-btn').textContent = T(UI.confirmCancel);
      $('confirm-ok-btn').textContent = T(UI.confirmReset);
      $('confirm-ok-btn').onclick = () => {
        const action = confirmAction;
        closeConfirmModal();
        if (action) action();
      };
      showLayer('confirm-modal');
    }
    function closeConfirmModal() {
      hideLayer('confirm-modal');
      confirmAction = null;
    }

    function showAbout() {
      hideAllOverlays();
      updateAllUIText();
      renderAbout();
      activateScreen('about-screen');
      state.phase = 'about';
    }

    function renderAbout() {
      const grid = $('about-grid');
      grid.innerHTML = '';
      UI.aboutItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'about-item';
        div.innerHTML = `<strong>${T(item.title)}</strong><span>${T(item.body)}</span>`;
        grid.appendChild(div);
      });
    }

    // ===== macOS VISUAL RENDER OVERRIDES =====
    function renderRankProgress() {
      const el = $('menu-rank-progress');
      if (!el) return;
      const score = SaveManager.data.score;
      const rank = getRank(score);
      const idx = RANKS.indexOf(rank);
      const next = RANKS[idx + 1];
      let pct = 100;
      let remainText = T(UI.rankMax);
      let nextTitle = T(rank.title);
      if (next) {
        const span = (next.min - rank.min) || 1;
        pct = Math.max(5, Math.min(100, Math.round(((score - rank.min) / span) * 100)));
        remainText = `${Math.max(0, next.min - score)} ${T(UI.rankPtsTo)}`;
        nextTitle = T(next.title);
      }
      el.innerHTML = `
        <div class="rank-prog-head">
          <strong>${T(rank.title)}</strong>
          <span class="rank-prog-arrow">to</span>
          <span>${nextTitle}</span>
          <em>${remainText}</em>
        </div>
        <div class="rank-prog-track" aria-hidden="true"><div class="rank-prog-fill" style="width:${pct}%"></div></div>
        <div class="rank-prog-label">${pct}%</div>`;
    }

    function renderMenuStats() {
      const stats = getProgressStats();
      const icons = {
        score: '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3 4 8l8 5 8-5-8-5Z"/><path d="m4 13 8 5 8-5"/><path d="m4 18 8 3 8-3"/></svg>',
        rank: '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3v18"/><path d="M6 8c0-3 3-5 6-5s6 2 6 5c0 4-3 7-6 7s-6-3-6-7Z"/><path d="M8 21h8"/></svg>',
        cases: '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 5h16v14H4z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',
        badges: '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 4h8v7a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5v3a4 4 0 0 0 4 4"/><path d="M16 6h3v3a4 4 0 0 1-4 4"/><path d="M12 15v4"/><path d="M8 21h8"/></svg>',
      };
      $('menu-stats').innerHTML = [
        { key: 'score', label: T(UI.statScore), value: `${stats.score} pts` },
        { key: 'rank', label: T(UI.statRank), value: T(stats.rank.title) },
        { key: 'cases', label: T(UI.statCases), value: `${stats.completed}/${stats.playable}` },
        { key: 'badges', label: T(UI.statAchievements), value: `${stats.unlocked}/${stats.totalAchievements}` },
      ].map(item => `
        <div class="stat-chip stat-${item.key}">
          <span class="stat-icon" aria-hidden="true">${icons[item.key]}</span>
          <div>
            <div class="stat-value">${item.value}</div>
            <div class="stat-label">${item.label}</div>
          </div>
        </div>`).join('');
    }

    function updateAllUIText() {
      $('splash-subtitle').textContent = T(UI.tagline);
      $('splash-desc').innerHTML = T(UI.splashDesc).replace(/\n/g, '<br>');
      $('splash-btn-text').textContent = T(UI.menuStart);
      $('splash-footer').textContent = T(UI.splashFooter);
      var _spTag = $('splash-tagline'); if (_spTag) _spTag.textContent = T(UI.splashTagline);
      $('menu-tagline').textContent = T(UI.tagline);
      $('menu-btn-start').textContent = T(UI.menuStart);
      $('menu-btn-cases').textContent = T(UI.menuCases);
      $('menu-btn-achieve').textContent = T(UI.menuAchieve);
      $('menu-btn-settings').textContent = T(UI.menuSettings);
      $('menu-btn-reset').textContent = T(UI.menuReset);
      $('menu-btn-about').textContent = T(UI.menuAbout);
      const menuLangText = $('menu-lang-btn')?.querySelector('.lang-label');
      if (menuLangText) menuLangText.textContent = currentLang === 'id' ? 'Bahasa Indonesia' : 'English';
      $('menu-score-display').textContent = T(UI.menuScore) + SaveManager.data.score + ' pts';
      renderMenuStats();
      renderRankProgress();
      updateDashStats();
      $('cs-title').textContent = T(UI.csTitle);
      $('cs-desc').textContent = T(UI.csDesc);
      $('cs-back').textContent = T(UI.csBack).replace(/^.*?\s/, '');
      $('ach-title').textContent = T(UI.achTitle);
      $('ach-desc').textContent = T(UI.achDesc);
      $('ach-back').textContent = T(UI.csBack).replace(/^.*?\s/, '');
      $('ach-filter-all').textContent = T(UI.filterAll);
      $('ach-filter-unlocked').textContent = T(UI.filterUnlocked);
      $('ach-filter-locked').textContent = T(UI.filterLocked);
      $('set-title').textContent = T(UI.setTitle);
      $('set-lang-label').textContent = T(UI.setLang);
      $('set-sound-label').textContent = T(UI.setSound);
      $('set-motion-label').textContent = T(UI.setMotion);
      $('set-reset-label').textContent = T(UI.setReset);
      $('set-reset-btn').textContent = T(UI.setResetBtn);
      $('set-about-btn').textContent = T(UI.menuAbout);
      $('set-back').textContent = T(UI.csBack).replace(/^.*?\s/, '');
      $('about-title').textContent = T(UI.aboutTitle);
      $('about-lead').textContent = T(UI.aboutLead);
      $('about-back').textContent = T(UI.csBack).replace(/^.*?\s/, '');
      $('vn-nameplate').textContent = T(UI.vnName).replace(/[^\w\s]/g, '').trim() || (currentLang === 'id' ? 'Kamu' : 'You');
      $('vn-continue').textContent = T(UI.vnContinue).replace(/^.*?\s/, '');
      $('notif-hint').textContent = T(UI.notifHint).replace(/^.*?\s/, '');
      $('lang-id-btn').classList.toggle('active', currentLang === 'id');
      $('lang-en-btn').classList.toggle('active', currentLang === 'en');
      updateSettingsToggles();
      applyUserPreferences();
      document.documentElement.lang = currentLang;
    }

    function renderCaseGrid() {
      const grid = $('case-grid');
      grid.innerHTML = '';
      GAME_DATA.cases.forEach((c, i) => {
        const card = document.createElement(c.comingSoon ? 'div' : 'button');
        card.className = 'case-card' + (c.comingSoon ? ' locked' : '') + (SaveManager.isCaseCompleted(c.id) ? ' completed' : '');
        if (!c.comingSoon) {
          card.type = 'button';
          card.setAttribute('aria-label', `${T(c.title)} - ${T(UI.statusAvailable)}`);
        }
        const isCompleted = SaveManager.isCaseCompleted(c.id);
        const caseScore = SaveManager.getCaseScore(c.id);
        const redFlags = getCaseRedFlags(c);
        const cm = CASE_META[c.id] || {};
        const threatChip = cm.threat ? `<span class="mission-chip threat">${T(cm.threat)}</span>` : '';
        const dangerChip = cm.danger ? `<span class="mission-chip danger-${cm.danger.level}">${T(cm.danger.label)}</span>` : '';
        const ctaHTML = c.comingSoon ? `<span class="case-cta locked">${T(UI.caseLockedCta)}</span>` : `<span class="case-cta">${T(UI.caseCta)}</span>`;
        const statusText = c.comingSoon ? T(UI.comingSoon) : (isCompleted ? T(UI.completed) : T(UI.statusAvailable));
        let badgeHTML = '';
        if (c.comingSoon) badgeHTML = `<span class="case-card-badge soon">${T(UI.comingSoon)}</span>`;
        else if (isCompleted) badgeHTML = `<span class="case-card-badge score">${caseScore >= 0 ? '+' : ''}${caseScore} pts</span>`;
        else badgeHTML = `<span class="case-card-badge done">${T(UI.statusAvailable)}</span>`;
        const previewHTML = redFlags.length ? `<div class="case-card-preview">${redFlags.map(flag => `<span class="case-preview-chip">${T(flag)}</span>`).join('')}</div>` : '';
        const scoreChip = isCompleted ? `<span class="mission-chip done">${T(UI.bestScore)}: ${caseScore >= 0 ? '+' : ''}${caseScore}</span>` : '';
        card.innerHTML = `
          <div class="case-card-icon" aria-hidden="true"></div>
          <div class="case-card-info">
            <div class="case-card-title">${currentLang === 'id' ? 'Kasus' : 'Case'} ${i + 1}: ${T(c.title)}</div>
            <div class="case-card-meta">
              <span class="mission-chip">${T(UI.platformLabel)}: ${getCasePlatform(c)}</span>
              ${threatChip}
              ${dangerChip}
              <span class="mission-chip ${isCompleted ? 'done' : c.comingSoon ? 'soon' : ''}">${statusText}</span>
              ${scoreChip}
            </div>
            <div class="case-card-desc">${T(c.description)}</div>
            ${previewHTML}
            ${ctaHTML}
          </div>
          ${badgeHTML}`;
        if (!c.comingSoon) card.onclick = () => startCase(i);
        grid.appendChild(card);
      });
    }

    function renderAchievements() {
      const grid = $('achieve-grid');
      grid.innerHTML = '';
      const unlockedCount = SaveManager.data.achievements.length;
      $('achieve-progress').textContent = `${T(UI.achProgress)}: ${unlockedCount}/${ACHIEVEMENTS.length}`;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === state.achievementFilter));
      ACHIEVEMENTS.filter(a => {
        const unlocked = SaveManager.hasAchievement(a.id);
        if (state.achievementFilter === 'unlocked') return unlocked;
        if (state.achievementFilter === 'locked') return !unlocked;
        return true;
      }).forEach(a => {
        const unlocked = SaveManager.hasAchievement(a.id);
        const meta = getAchievementMeta(a.id);
        const dateHTML = unlocked ? `<div class="achieve-date">${T(UI.unlockedOn)} ${formatUnlockDate(meta?.unlockedAt)}</div>` : '';
        const item = document.createElement('div');
        item.className = 'achieve-item ' + (unlocked ? 'unlocked' : 'locked');
        item.innerHTML = `
          <div class="achieve-icon" aria-hidden="true"></div>
          <div class="achieve-info">
            <div class="achieve-name">${unlocked ? T(a.title) : '???'}</div>
            <div class="achieve-desc">${unlocked ? T(a.desc) : T(UI.lockedHint)}</div>
            ${dateHTML}
          </div>`;
        grid.appendChild(item);
      });
    }

    
/* =============================================================
   Expose UI Functions to Global Scope (Fixed Layout Stacking)
   ============================================================= */
window.CyberEscapeUI = {
  updateClock,
  typeText,
  skipTyping,
  showLayer,
  hideLayer,
  hideAllOverlays,
  activateScreen,
  getProgressStats,
  renderRankProgress,
  renderMenuStats,
  updateDashStats,
  updateAllUIText,
  goToMainMenu,
  showMainMenu,
  backToMenu,
  getPlayableCases,
  startFirstAvailableCase,
  showCaseSelect,
  renderCaseGrid,
  showAchievements,
  renderAchievements,
  setAchievementFilter,
  closeConfirmModal,
  showSettings,
  showAbout,
  toggleLang,
  setLang,
  toggleSound,
  toggleReducedMotion,
  resetProgress,
  resetProgressFromMenu
};

// 🌟 CRITICAL: Core layout visibility overrides to prevent screen stacking
window.showLayer = showLayer;
window.hideLayer = hideLayer;
window.hideAllOverlays = hideAllOverlays;
window.activateScreen = activateScreen;
window.updateAllUIText = updateAllUIText;
window.renderMenuStats = renderMenuStats;
window.updateDashStats = updateDashStats;

// Interactive button onclick overrides
window.goToMainMenu = goToMainMenu;
window.showMainMenu = showMainMenu;
window.backToMenu = backToMenu;
window.showCaseSelect = showCaseSelect;
window.startFirstAvailableCase = startFirstAvailableCase;
window.showAchievements = showAchievements;
window.setAchievementFilter = setAchievementFilter;
window.showSettings = showSettings;
window.showAbout = showAbout;
window.closeConfirmModal = closeConfirmModal;
window.toggleLang = toggleLang;
window.setLang = setLang;
window.toggleSound = toggleSound;
window.toggleReducedMotion = toggleReducedMotion;
window.resetProgress = resetProgress;
window.resetProgressFromMenu = resetProgressFromMenu;