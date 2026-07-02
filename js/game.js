/* =============================================================
   Cyber Escape Game
   Main gameplay flow, simulations, choices, results, and ending.
   ============================================================= */

// ===== 15. GAME FLOW =====

    function startCase(caseIndex) {
      state.currentCase = caseIndex;
      state.currentSlideIndex = 0;
      state.currentChoice = null;
      state.resultRecorded = false;
      state.phase = 'desktop';

      const c = GAME_DATA.cases[caseIndex];
      hideAllOverlays();
      showLayer('desktop');
      $('case-badge-text').textContent = `${currentLang === 'id' ? 'Kasus' : 'Case'} ${caseIndex + 1}`;
      $('case-badge').classList.add('active');
      $('tb-wa').classList.toggle('has-badge', c.appType === 'whatsapp');
      $('tb-ig').classList.toggle('has-badge', c.appType === 'instagram');

      // Monitor on flash
      const flash = document.createElement('div');
      flash.id = 'monitor-on'; document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 700);

      setTimeout(() => showNotification(c.notification), 2000);
    }

    function showNotification(data) {
      state.phase = 'notification';
      const iconEl = $('notif-icon');
      iconEl.className = 'notif-icon ' + data.icon;
      iconEl.textContent = data.icon === 'wa' ? '💬' : '📷';
      $('notif-app').textContent = data.app;
      $('notif-title').textContent = T(data.title);
      $('notif-body').textContent = T(data.body);
      $('notif-time').textContent = T(data.time);
      $('notification').classList.add('show');
      playNotifSound();
    }

    function onNotificationClick() {
      if (state.phase !== 'notification') return;
      $('notification').classList.remove('show');
      state.phase = 'app';
      setTimeout(() => showAppWindow(GAME_DATA.cases[state.currentCase]), 400);
    }

    function showAppWindow(c) {
      showLayer('app-layer');
      if (c.appType === 'whatsapp') {
        $('wa-window').style.display = 'flex'; $('ig-window').style.display = 'none';
        renderWhatsAppChat(c.appContent);
      } else {
        $('ig-window').style.display = 'flex'; $('wa-window').style.display = 'none';
        renderInstagramChat(c.appContent);
      }
      setTimeout(() => startNarration(), 1500);
    }

    function renderWhatsAppChat(content) {
      $('wa-contact-name').textContent = content.contactName;
      const el = $('wa-chat'); el.innerHTML = '';
      content.messages.forEach(m => {
        const div = document.createElement('div');
        div.className = 'wa-message ' + m.type;
        let html = `<div class="wa-bubble">${T(m.text)}`;
        if (m.attachment) html += `<div class="wa-attachment"><div class="wa-attachment-icon">${m.attachment.icon}</div><div class="wa-attachment-info"><div class="wa-attachment-name">${m.attachment.name}</div><div class="wa-attachment-size">${m.attachment.size}</div></div><span style="font-size:20px;color:#8696a0;">⬇️</span></div>`;
        html += `<div class="wa-msg-time">${m.time}</div></div>`;
        div.innerHTML = html; el.appendChild(div);
      });
    }

    function renderInstagramChat(content) {
      $('ig-username').textContent = content.username;
      const el = $('ig-chat'); el.innerHTML = '';
      content.messages.forEach(m => {
        if (m.type === 'time') {
          const d = document.createElement('div'); d.className = 'ig-msg-time';
          d.textContent = T(m.text); el.appendChild(d); return;
        }
        const div = document.createElement('div'); div.className = 'ig-message ' + m.type;
        let text = T(m.text);
        if (m.link) text += `<span class="ig-link">${m.link}</span>`;
        div.innerHTML = `<div class="ig-bubble">${text}</div>`; el.appendChild(div);
      });
    }

    function startNarration() {
      const c = GAME_DATA.cases[state.currentCase];
      state.phase = 'narration';
      state.currentSlideIndex = 0;
      state.currentSlides = T(c.slides);
      showLayer('vn-overlay');
      showCurrentSlide();
    }

    function showCurrentSlide() {
      if (!state.currentSlides || state.currentSlideIndex >= state.currentSlides.length) return;
      typeText($('vn-text'), state.currentSlides[state.currentSlideIndex]);
    }

    function advanceDialog() {
      if (state.isTyping) {
        skipTyping($('vn-text'), state.currentSlides[state.currentSlideIndex]);
        return;
      }
      state.currentSlideIndex++;
      if (state.currentSlideIndex < state.currentSlides.length) {
        showCurrentSlide();
      } else {
        hideLayer('vn-overlay');
        if (state.phase === 'narration') {
          showChoices();
        } else if (state.phase === 'resultSlide') {
          processChoiceEffect();
        }
      }
    }

    // ===== 16. MULTI-CHOICE SYSTEM =====
    function showChoices() {
      state.phase = 'choice';
      const c = GAME_DATA.cases[state.currentCase];
      $('choice-prompt').innerHTML = `<span>${T(UI.choiceTitle)}</span><div class="choice-subtext">${T(UI.choiceMicrocopy)}</div>`;
      const container = $('choice-container');
      // Remove old choice buttons
      container.querySelectorAll('.choice-btn').forEach(b => b.remove());
      const labels = 'ABCDEFGH';
      c.choices.forEach((ch, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.dataset.index = i;
        const riskLabelMap = { safe: UI.riskSafe, cautious: UI.riskCautious, risky: UI.riskRisky, fatal: UI.riskFatal };
        const riskBadgeClass = `risk-badge-${ch.risk}`;
        btn.innerHTML = `
          <div class="choice-label">${labels[i]}</div>
          <div class="choice-text">${T(ch.label)}</div>
          <div class="choice-risk-badge ${riskBadgeClass}">${T(riskLabelMap[ch.risk])}<span class="choice-score-reveal" data-score="${ch.score >= 0 ? '+' : ''}${ch.score}" aria-hidden="true"></span></div>`;
        btn.onclick = () => makeChoice(i);
        container.appendChild(btn);
      });
      showLayer('choice-overlay');
    }

    function makeChoice(index) {
      const c = GAME_DATA.cases[state.currentCase];
      const choice = c.choices[index];
      state.currentChoice = choice;

      // Visual: highlight chosen, fade others, show risk
      const btns = $('choice-container').querySelectorAll('.choice-btn');
      btns.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('chosen', `risk-${choice.risk}`);
        } else {
          btn.classList.add('faded');
        }
      });

      // Delay then proceed
      setTimeout(() => {
        hideLayer('choice-overlay');
        // Play result slides
        state.phase = 'resultSlide';
        state.currentSlideIndex = 0;
        state.currentSlides = T(choice.resultSlides);
        if (state.currentSlides && state.currentSlides.length > 0) {
          showLayer('vn-overlay');
          showCurrentSlide();
        } else {
          processChoiceEffect();
        }
      }, 1200);
    }

    function checkDigitalDefender() {
      const playable = getPlayableCases();
      const allDone = playable.every(c => SaveManager.isCaseCompleted(c.id));
      if (allDone) {
        const isNew = SaveManager.addAchievement('digital_defender');
        if (isNew) setTimeout(() => showAchievementToast('digital_defender'), 2500);
      }
    }

    function finalizeChoiceResult() {
      if (state.resultRecorded || !state.currentChoice || state.currentCase < 0) return;
      const c = GAME_DATA.cases[state.currentCase];
      SaveManager.completeCase(c.id, state.currentChoice);
      state.resultRecorded = true;
      if (state.currentChoice.achievement) {
        const isNew = SaveManager.addAchievement(state.currentChoice.achievement);
        if (isNew) setTimeout(() => showAchievementToast(state.currentChoice.achievement), 500);
      }
      checkDigitalDefender();
    }

    function processChoiceEffect() {
      const choice = state.currentChoice;
      if (choice.effect === 'caseClosed') {
        showCaseClosed(choice.caseClosedText);
      } else if (choice.effect === 'glitch') {
        hideLayer('app-layer');
        startGlitchSequence();
      } else if (choice.effect === 'nearMiss') {
        hideLayer('app-layer');
        showNearMiss(choice.nearmissText);
      }
    }

    // ===== 17. GLITCH SEQUENCE =====
    function startGlitchSequence() {
      const c = GAME_DATA.cases[state.currentCase];
      const choice = state.currentChoice;
      state.phase = 'glitch';

      const flash = document.createElement('div');
      flash.className = 'screen-flash'; document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 200);

      const gl = $('glitch-layer');
      gl.innerHTML = '<div class="scanlines"></div>';
      showLayer('glitch-layer');
      document.body.classList.add('glitch-shake');
      playGlitchSound();

      const msgs = ['⚠️ WARNING: Unauthorized access!', '🔴 ALERT: Malware activity!', '⚠️ System compromised!', '🔴 Data breach in progress...', '⚠️ Personal files accessed!', '🔴 Firewall bypassed!', '⚠️ Unknown server connection...', '🔴 Credentials intercepted!'];
      let pi = 0;
      const popInt = setInterval(() => {
        if (pi >= msgs.length) { clearInterval(popInt); return; }
        const p = document.createElement('div'); p.className = 'hacked-popup';
        p.innerHTML = `<div class="popup-title">⚠️ System Alert</div>${msgs[pi]}`;
        p.style.left = (10 + Math.random() * 55) + '%';
        p.style.top = (8 + Math.random() * 60) + '%';
        p.style.transform = `rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`;
        gl.appendChild(p); pi++;
        if (pi % 2 === 0) playGlitchSound();
      }, 350);

      setTimeout(() => {
        clearInterval(popInt);
        const hd = choice.hackedDetails;
        const banner = document.createElement('div'); banner.className = 'hacked-banner';
        banner.innerHTML = `
          <h1 class="glitch-rgb">⚠️ ${currentLang === 'id' ? 'SYSTEM HACKED' : 'SYSTEM HACKED'} ⚠️</h1>
          <p>${currentLang === 'id' ? 'Data pribadimu telah dicuri!' : 'Your personal data has been stolen!'}</p>
          <button class="btn-continue" onclick="afterGlitch()">${currentLang === 'id' ? 'Lihat apa yang terjadi →' : 'See what happened →'}</button>`;
        gl.appendChild(banner);
      }, 3200);
    }

    function afterGlitch() {
      document.body.classList.remove('glitch-shake');
      hideLayer('glitch-layer');
      const choice = state.currentChoice;
      state.phase = 'hackedDetails';

      $('hacked-details-title').textContent = T(choice.hackedDetails.title);
      $('hacked-details-btn').textContent = T(UI.eduLearnBtn);
      const list = $('hacked-details-list'); list.innerHTML = '';
      choice.hackedDetails.items.forEach(item => {
        const div = document.createElement('div'); div.className = 'hacked-detail-item';
        div.innerHTML = `<span class="detail-icon">${item.icon}</span><span>${T(item.text)}</span>`;
        list.appendChild(div);
      });
      showLayer('hacked-details');
    }

    // ===== 18. NEAR MISS =====
    function showNearMiss(text) {
      state.phase = 'nearMiss';
      $('nearmiss-title').textContent = T(UI.nearmissTitle);
      $('nearmiss-text').textContent = T(text);
      $('nearmiss-btn').textContent = T(UI.nearmissBtn);
      showLayer('nearmiss-overlay');
    }

    // ===== 19. EDUCATION SCREEN =====
    function showEducation() {
      hideLayer('hacked-details');
      hideLayer('nearmiss-overlay');
      const choice = state.currentChoice;
      const edu = choice.education;
      state.phase = 'education';
      finalizeChoiceResult();

      const scoreChange = choice.score;
      const scoreClass = scoreChange >= 0 ? 'positive' : 'negative';
      const scoreSign = scoreChange >= 0 ? '+' : '';

      const card = $('edu-card');
      let html = `<h2>${T(edu.title)}</h2>`;
      html += `<div style="text-align:center;"><div class="edu-status-badge risk-${choice.risk}">${T(UI.eduStatus)} ${T(RISK_META[choice.risk].label)}</div></div>`;
      html += `<div class="edu-score-display">${currentLang === 'id' ? 'Skor untuk pilihan ini:' : 'Score for this choice:'} <span class="score-change ${scoreClass}">${scoreSign}${scoreChange}</span></div>`;
      html += `<div class="edu-section"><p>${T(edu.explanation)}</p></div>`;

      if (edu.redFlags && edu.redFlags.length) {
        html += `<div class="edu-section"><h3>${T(UI.redFlagsTitle)}</h3><div class="edu-red-flags">`;
        edu.redFlags.forEach(rf => { html += `<div class="edu-red-flag-item">🚩 ${T(rf)}</div>`; });
        html += `</div></div>`;
      }
      if (edu.tips && edu.tips.length) {
        html += `<div class="edu-section"><h3>${T(UI.tipsTitle)}</h3><ul class="edu-list">`;
        edu.tips.forEach((tip, i) => { html += `<li data-num="${i + 1}.">${T(tip)}</li>`; });
        html += `</ul></div>`;
      }
      if (edu.whatToDo) {
        html += `<div class="edu-section"><h3>${T(UI.whatToDoTitle)}</h3><p>${T(edu.whatToDo)}</p></div>`;
      }
      if (edu.terms && edu.terms.length) {
        html += `<div class="edu-section"><h3>${T(UI.eduTermTitle)}</h3><div class="term-grid">`;
        edu.terms.forEach(key => {
          const term = TERM_DEFS[key];
          if (term) html += `<div class="term-chip"><strong>${T(term.term)}:</strong> ${T(term.desc)}</div>`;
        });
        html += `</div></div>`;
      }
      if (edu.quote) {
        html += `<div class="edu-section"><h3>${T(UI.quoteTitle)}</h3><div class="edu-quote">${T(edu.quote)}</div></div>`;
      }

      html += `<div class="edu-actions">
        <button class="edu-btn secondary" onclick="retryCase()">${T(UI.eduRetry)}</button>
        <button class="edu-btn primary" onclick="afterCaseComplete()">${T(UI.eduNext)}</button>
      </div>`;

      card.innerHTML = html;
      showLayer('edu-screen');
    }

    // ===== 20. CASE CLOSED =====
<<<<<<< HEAD
 function showCaseClosed(text) {
=======
    function showCaseClosed(text) {
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
      state.phase = 'caseClosed';
      finalizeChoiceResult();
      playSuccessSound();
      hideLayer('app-layer');
<<<<<<< HEAD
      
      const choice = state.currentChoice;
      const edu = choice?.education;
      
      // Update elemen teks
=======
      const choice = state.currentChoice;
      const edu = choice?.education;
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
      $('cc-title').textContent = T(UI.ccTitle);
      $('case-closed-text').textContent = T(text);
      $('btn-next-case').textContent = T(UI.ccBtn);
      $('btn-retry-case').textContent = T(UI.eduRetry);
<<<<<<< HEAD

      // Membangun ringkasan edukasi (macOS style)
      if (edu) {
        const scoreChange = choice.score;
        const scoreSign = scoreChange >= 0 ? '+' : '';
        
        const flags = (edu.redFlags || []).slice(0, 3).map(flag => 
          `<li class="cc-summary-item">🚩 ${T(flag)}</li>`).join('');
        
        const tips = (edu.tips || []).slice(0, 2).map(tip => 
          `<li class="cc-summary-item">🛡️ ${T(tip)}</li>`).join('');

        $('case-closed-summary').innerHTML = `
          <div class="cc-meta">
            <div class="edu-status-badge risk-${choice.risk}">
              ${T(UI.eduStatus)} ${T(RISK_META[choice.risk].label)} 
              <strong class="score-change ${scoreChange >= 0 ? 'positive' : 'negative'}">${scoreSign}${choice.score}</strong>
            </div>
          </div>
          <h3 class="cc-edu-title">${T(edu.title)}</h3>
          <ul class="cc-summary-list">${flags}${tips}</ul>`;
      } else {
        $('case-closed-summary').innerHTML = '';
      }
      
=======
      if (edu) {
        const flags = (edu.redFlags || []).slice(0, 3).map(flag => `<li>🚩 ${T(flag)}</li>`).join('');
        const tips = (edu.tips || []).slice(0, 2).map(tip => `<li>🛡️ ${T(tip)}</li>`).join('');
        const terms = (edu.terms || []).slice(0, 2).map(key => {
          const term = TERM_DEFS[key];
          return term ? `<li>🧠 <strong>${T(term.term)}:</strong> ${T(term.desc)}</li>` : '';
        }).join('');
        $('case-closed-summary').innerHTML = `
          <div style="text-align:center;"><div class="edu-status-badge risk-${choice.risk}">${T(UI.eduStatus)} ${T(RISK_META[choice.risk].label)} · +${choice.score}</div></div>
          <h3>${T(edu.title)}</h3>
          <ul>${flags}${tips}${terms}</ul>`;
      } else {
        $('case-closed-summary').innerHTML = '';
      }
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
      showLayer('case-closed');
    }

    // ===== 21. AFTER CASE =====
    function retryCase() {
      hideAllOverlays();
      $('case-badge').classList.remove('active');
      startCase(state.currentCase);
    }

    function afterCaseComplete() {
      hideAllOverlays();
      $('case-badge').classList.remove('active');
      $('desktop').classList.remove('active');

      // Check if all playable cases completed
      const playable = getPlayableCases();
      const allDone = playable.every(c => SaveManager.isCaseCompleted(c.id));
      if (allDone) {
        showEnding();
      } else {
        showCaseSelect();
      }
    }

    // ===== 22. ENDING =====
    function showEnding() {
      state.phase = 'ending';
      playSuccessSound();
      $('desktop').classList.remove('active');
      $('case-badge').classList.remove('active');

      const score = SaveManager.data.score;
      const rank = getRank(score);
      const unlocked = SaveManager.data.achievements;
      const playable = getPlayableCases();
      const completedCount = playable.filter(c => SaveManager.isCaseCompleted(c.id)).length;

      let html = `<div class="trophy">🏆</div>
        <h1>${T(UI.endTitle)}</h1>
        <h2>${T(UI.endSubtitle)}</h2>
        <div class="ending-score-card">
          <div class="score-value">${score}</div>
          <div class="score-label">${T(UI.endScoreLabel)}</div>
        </div>
        <div class="ending-meta">
          <span>${T(UI.endCompletedLabel)}: ${completedCount}/${playable.length}</span>
          <span>${T(UI.endRankLabel)} ${T(rank.title)}</span>
        </div>
        <div class="ending-rank-badge">
          <div class="badge-title">${T(UI.endRankLabel)}</div>
          <div class="badge-name">${rank.icon} ${T(rank.title)}</div>
        </div>
        <div class="certificate-card">
          <div class="cert-label">${T(UI.endCertificateLabel)}</div>
          <div class="cert-name">${T(UI.endCertificateName)}</div>
          <div class="cert-note">${T(UI.endCertificateNote)}</div>
        </div>
        <div class="ending-achievements">
          <h3>${T(UI.endAchieveTitle)}</h3>
          <div class="ending-achieve-grid">`;

      ACHIEVEMENTS.forEach(a => {
        const isUnlocked = unlocked.includes(a.id);
        html += `<div class="ending-achieve-item ${isUnlocked ? '' : 'locked'}">${isUnlocked ? a.icon : '🔒'} ${isUnlocked ? T(a.title) : '???'}</div>`;
      });

      html += `</div></div>
        <div class="ending-principles">
          <h3>${T(UI.endPrinciplesTitle)}</h3>
          <div class="principle-item"><span class="principle-icon">🔍</span><span>${T(UI.endP1)}</span></div>
          <div class="principle-item"><span class="principle-icon">🚫</span><span>${T(UI.endP2)}</span></div>
          <div class="principle-item"><span class="principle-icon">🛡️</span><span>${T(UI.endP3)}</span></div>
        </div>
        <p class="ending-quote">${T(UI.endQuote)}</p>
        <button class="btn-restart" onclick="copyResult()">${T(UI.endCopy)}</button>
        <button class="btn-restart" onclick="showMainMenu()">${T(UI.endMenu)}</button>
        <button class="btn-restart" onclick="resetProgressFromMenu()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);">${T(UI.endReset)}</button>
        <button class="btn-restart" onclick="restartGame()" style="background:linear-gradient(135deg,#ff6b9d,#ff1744);">${T(UI.endRestart)}</button>`;

      $('ending-content').innerHTML = html;
      showLayer('ending-screen');
    }

    function copyResult() {
      const score = SaveManager.data.score;
      const rank = getRank(score);
      const playable = getPlayableCases();
      const completedCount = playable.filter(c => SaveManager.isCaseCompleted(c.id)).length;
      const text = currentLang === 'id'
        ? `Saya menyelesaikan Cyber Escape: Perangkap Digital dengan skor ${score} dan rank ${T(rank.title)}. Kasus selesai: ${completedCount}/${playable.length}.`
        : `I completed Cyber Escape: The Digital Trap with ${score} points and ${T(rank.title)} rank. Cases completed: ${completedCount}/${playable.length}.`;
      copyText(text).then(showCopyNotice).catch(() => alert(text));
    }

    function copyText(text) {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text).catch(() => fallbackCopyText(text));
      }
      return Promise.resolve(fallbackCopyText(text));
    }

    function fallbackCopyText(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      if (!ok) throw new Error('copy failed');
      return true;
    }

    function showCopyNotice() {
      $('toast-icon').textContent = '📋';
      $('toast-label').textContent = T(UI.endCopied);
      $('toast-name').textContent = currentLang === 'id' ? 'Siap dibagikan' : 'Ready to share';
      $('achievement-toast').classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => $('achievement-toast').classList.remove('show'), 2500);
    }

    function restartGame() {
      SaveManager.reset();
      hideAllOverlays();
      $('desktop').classList.remove('active');
      $('case-badge').classList.remove('active');
      $('splash-screen').style.display = '';
      $('splash-screen').classList.remove('hidden');
      activateScreen('splash-screen');
      updateAllUIText();
      state.phase = 'splash';
    }

    function init() {
      SaveManager.load();
      activateScreen('splash-screen');
      applyUserPreferences();
      updateAllUIText();
    }

    // ===== macOS VISUAL RENDER OVERRIDES =====
    function showNotification(data) {
      state.phase = 'notification';
      const iconEl = $('notif-icon');
      iconEl.className = 'notif-icon ' + data.icon;
      iconEl.textContent = '';
      $('notif-app').textContent = data.app;
      $('notif-title').textContent = T(data.title);
      $('notif-body').textContent = T(data.body);
      $('notif-time').textContent = T(data.time);
      $('notification').classList.add('show');
      playNotifSound();
    }

    function renderWhatsAppChat(content) {
      $('wa-contact-name').textContent = content.contactName;
      const el = $('wa-chat');
      el.innerHTML = '';
      content.messages.forEach(m => {
        const div = document.createElement('div');
        div.className = 'wa-message ' + m.type;
        let html = `<div class="wa-bubble">${T(m.text)}`;
        if (m.attachment) {
          html += `<div class="wa-attachment">
            <div class="wa-attachment-icon" aria-hidden="true"></div>
            <div class="wa-attachment-info">
              <div class="wa-attachment-name">${m.attachment.name}</div>
              <div class="wa-attachment-size">${m.attachment.size}</div>
            </div>
          </div>`;
        }
        html += `<div class="wa-msg-time">${m.time}</div></div>`;
        div.innerHTML = html;
        el.appendChild(div);
      });
    }

    function renderInstagramChat(content) {
      $('ig-username').textContent = content.username;
      const el = $('ig-chat');
      el.innerHTML = '';
      content.messages.forEach(m => {
        if (m.type === 'time') {
          const d = document.createElement('div');
          d.className = 'ig-msg-time';
          d.textContent = T(m.text);
          el.appendChild(d);
          return;
        }
        const div = document.createElement('div');
        div.className = 'ig-message ' + m.type;
        let text = T(m.text);
        if (m.link) text += `<span class="ig-link">${m.link}</span>`;
        div.innerHTML = `<div class="ig-bubble">${text}</div>`;
        el.appendChild(div);
      });
    }

    /* ===== SYSTEM HACKED sequence (macOS cinematic) ===== */
    function startGlitchSequence() {
      const choice = state.currentChoice;
      state.phase = 'glitch';
      const reduced = document.body.classList.contains('reduce-motion');

      // brief impact flash
      const flash = document.createElement('div');
      flash.className = 'screen-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 240);

      const gl = $('glitch-layer');
      gl.innerHTML =
        '<div class="hacked-vignette" aria-hidden="true"></div>' +
        '<div class="glitch-fx" aria-hidden="true"><div class="scanlines"></div></div>' +
        '<div class="hacked-alert-stack" id="hacked-alert-stack" aria-label="System alerts"></div>';
      showLayer('glitch-layer');
      if (!reduced) {
        document.body.classList.add('glitch-shake');
        gl.classList.add('glitch-active');
        setTimeout(() => document.body.classList.remove('glitch-shake'), 640);
        setTimeout(() => gl.classList.remove('glitch-active'), 950);
      }
      playGlitchSound();

      // 3. macOS-style alert cascade (top-right, staggered)
      const alerts = currentLang === 'id'
        ? ['Akses tidak sah terdeteksi', 'Koneksi server asing aktif', 'Aktivitas malware terindikasi', 'Kredensial berisiko bocor']
        : ['Unauthorized access detected', 'Unknown server connection active', 'Malware activity indicated', 'Credentials may be exposed'];
      const nowLabel = currentLang === 'id' ? 'Baru saja' : 'Just now';
      const stack = $('hacked-alert-stack');
      alerts.forEach((msg, i) => {
        setTimeout(() => {
          if (!stack || !stack.isConnected) return;
          const card = document.createElement('div');
          card.className = 'hacked-alert';
          card.innerHTML =
            '<span class="hacked-alert-icon" aria-hidden="true">!</span>' +
            '<div class="hacked-alert-body"><strong>System Alert</strong><span>' + msg + '</span></div>' +
            '<span class="hacked-alert-time">' + nowLabel + '</span>';
          stack.appendChild(card);
          if (i % 2 === 0) playGlitchSound();
        }, reduced ? i * 70 : 240 + i * 130);
      });

      // 4. Lockdown sheet
      setTimeout(() => revealLockdown(choice, reduced), reduced ? 300 : 1500);
    }

    function revealLockdown(choice, reduced) {
      const gl = $('glitch-layer');
      if (!gl.classList.contains('active')) return;
      const hd = (choice && choice.hackedDetails) || {};
      const items = hd.items || [];
      const eduLine = currentLang === 'id'
        ? 'Pilihan ini membuka celah keamanan. Mari lihat risiko nyatanya.'
        : 'This choice opened a security gap. Let us look at the real risks.';
      const learnLabel = currentLang === 'id' ? 'Pelajari Risiko' : 'Review the Risk';
      const retryLabel = currentLang === 'id' ? 'Coba Lagi' : 'Try Again';
      const termTitle = currentLang === 'id' ? 'terminal-penyerang — zsh' : 'attacker-terminal — zsh';

      const risksHtml = items.map((it) =>
        '<div class="lockdown-risk"><span class="lockdown-risk-icon" aria-hidden="true">' + it.icon +
        '</span><span>' + T(it.text) + '</span></div>'
      ).join('');

      const sheet = document.createElement('div');
      sheet.className = 'lockdown-sheet';
      sheet.setAttribute('role', 'alertdialog');
      sheet.setAttribute('aria-label', 'System Hacked');
      sheet.innerHTML =
        '<div class="lockdown-titlebar"><span class="tl-dot red"></span><span class="tl-dot amber"></span>' +
        '<span class="tl-dot green"></span><span class="lockdown-titlebar-text">' + termTitle + '</span></div>' +
        '<div class="lockdown-body">' +
          '<div class="lockdown-shield" aria-hidden="true">🔓</div>' +
          '<h1 class="lockdown-title' + (reduced ? '' : ' flicker') + '">SYSTEM HACKED</h1>' +
          '<div class="lockdown-terminal" id="lockdown-terminal" aria-hidden="true"></div>' +
          '<p class="lockdown-edu">' + eduLine + '</p>' +
          (risksHtml ? '<div class="lockdown-risks">' + risksHtml + '</div>' : '') +
          '<div class="lockdown-actions">' +
            '<button class="lockdown-btn secondary" onclick="hackedRetry()">' + retryLabel + '</button>' +
            '<button class="lockdown-btn primary" onclick="hackedLearnMore()">' + learnLabel + '</button>' +
          '</div>' +
        '</div>';
      gl.appendChild(sheet);

      const primaryBtn = sheet.querySelector('.lockdown-btn.primary');
      if (primaryBtn) setTimeout(() => { try { primaryBtn.focus(); } catch (e) {} }, reduced ? 0 : 480);

      const termLines = [
        '> Unauthorized access detected...',
        '> Exfiltrating data... 34%... 78%... 100%',
        '> Credentials compromised.'
      ];
      const term = $('lockdown-terminal');
      if (!term) return;
      if (reduced) {
        term.innerHTML = termLines.map((l) => '<div class="term-line done">' + l + '</div>').join('');
      } else {
        typeTerminal(term, termLines);
      }
    }

    function typeTerminal(el, lines) {
      let li = 0;
      function typeLine() {
        if (!el || !el.isConnected || li >= lines.length) return;
        const text = lines[li];
        const line = document.createElement('div');
        line.className = 'term-line';
        el.appendChild(line);
        let ci = 0;
        const timer = setInterval(() => {
          if (!el.isConnected) { clearInterval(timer); return; }
          line.textContent = text.slice(0, ci + 1);
          ci++;
          if (ci >= text.length) {
            clearInterval(timer);
            line.classList.add('done');
            li++;
            setTimeout(typeLine, 240);
          }
        }, 26);
      }
      typeLine();
    }

    function cleanupHackedFx() {
      document.body.classList.remove('glitch-shake');
      const gl = $('glitch-layer');
      if (gl) gl.classList.remove('glitch-active');
    }

    function hackedLearnMore() {
      cleanupHackedFx();
      hideLayer('glitch-layer');
      showEducation();
    }

    function hackedRetry() {
      // Record the fatal result exactly like the normal path, then replay.
      finalizeChoiceResult();
      cleanupHackedFx();
      retryCase();
    }

    function showEducation() {
      hideLayer('hacked-details');
      hideLayer('nearmiss-overlay');
      const choice = state.currentChoice;
      const edu = choice.education;
      state.phase = 'education';
      finalizeChoiceResult();

      const scoreChange = choice.score;
      const scoreClass = scoreChange >= 0 ? 'positive' : 'negative';
      const scoreSign = scoreChange >= 0 ? '+' : '';
      const card = $('edu-card');
      let html = `<h2>${T(edu.title)}</h2>`;
      html += `<div class="edu-status-badge risk-${choice.risk}">${T(UI.eduStatus)} ${T(RISK_META[choice.risk].label)} <strong class="score-change ${scoreClass}">${scoreSign}${scoreChange}</strong></div>`;
      html += `<div class="edu-section"><p>${T(edu.explanation)}</p></div>`;

      if (edu.redFlags && edu.redFlags.length) {
        html += `<div class="edu-section"><h3>${T(UI.redFlagsTitle)}</h3><div class="edu-red-flags">`;
        edu.redFlags.forEach(rf => { html += `<div class="edu-red-flag-item">${T(rf)}</div>`; });
        html += `</div></div>`;
      }
      if (edu.tips && edu.tips.length) {
        html += `<div class="edu-section"><h3>${T(UI.tipsTitle)}</h3><ul class="edu-list">`;
        edu.tips.forEach(tip => { html += `<li>${T(tip)}</li>`; });
        html += `</ul></div>`;
      }
      if (edu.whatToDo) html += `<div class="edu-section"><h3>${T(UI.whatToDoTitle)}</h3><p>${T(edu.whatToDo)}</p></div>`;
      if (edu.terms && edu.terms.length) {
        html += `<div class="edu-section"><h3>${T(UI.eduTermTitle)}</h3><div class="term-grid">`;
        edu.terms.forEach(key => {
          const term = TERM_DEFS[key];
          if (term) html += `<div class="term-chip"><strong>${T(term.term)}:</strong> ${T(term.desc)}</div>`;
        });
        html += `</div></div>`;
      }
      if (edu.quote) html += `<div class="edu-section"><h3>${T(UI.quoteTitle)}</h3><div class="edu-quote">${T(edu.quote)}</div></div>`;
      html += `<div class="edu-actions">
        <button class="edu-btn secondary" onclick="retryCase()">${T(UI.eduRetry).replace(/^.*?\\s/, '')}</button>
        <button class="edu-btn primary" onclick="afterCaseComplete()">${T(UI.eduNext).replace(/^.*?\\s/, '')}</button>
      </div>`;
      card.innerHTML = html;
      showLayer('edu-screen');
    }

    function showCaseClosed(text) {
      state.phase = 'caseClosed';
      finalizeChoiceResult();
      playSuccessSound();
      hideLayer('app-layer');
      const choice = state.currentChoice;
      const edu = choice?.education;
      $('cc-title').textContent = T(UI.ccTitle);
      $('case-closed-text').textContent = T(text);
      $('btn-next-case').textContent = T(UI.ccBtn).replace(/^.*?\s/, '');
      $('btn-retry-case').textContent = T(UI.eduRetry).replace(/^.*?\s/, '');
      if (edu) {
        const flags = (edu.redFlags || []).slice(0, 3).map(flag => `<li>${T(flag)}</li>`).join('');
        const tips = (edu.tips || []).slice(0, 2).map(tip => `<li>${T(tip)}</li>`).join('');
        const terms = (edu.terms || []).slice(0, 2).map(key => {
          const term = TERM_DEFS[key];
          return term ? `<li><strong>${T(term.term)}:</strong> ${T(term.desc)}</li>` : '';
        }).join('');
        $('case-closed-summary').innerHTML = `
          <div class="edu-status-badge risk-${choice.risk}">${T(UI.eduStatus)} ${T(RISK_META[choice.risk].label)} · +${choice.score}</div>
          <h3>${T(edu.title)}</h3>
          <ul>${flags}${tips}${terms}</ul>`;
      } else {
        $('case-closed-summary').innerHTML = '';
      }
      showLayer('case-closed');
    }

    function showEnding() {
      state.phase = 'ending';
      playSuccessSound();
      $('desktop').classList.remove('active');
      $('case-badge').classList.remove('active');

      const score = SaveManager.data.score;
      const rank = getRank(score);
      const unlocked = SaveManager.data.achievements;
      const playable = getPlayableCases();
      const completedCount = playable.filter(c => SaveManager.isCaseCompleted(c.id)).length;

      let html = `<div class="trophy" aria-hidden="true"></div>
        <h1>${T(UI.endTitle)}</h1>
        <h2>${T(UI.endSubtitle)}</h2>
        <div class="ending-score-card">
          <div class="score-value">${score}</div>
          <div class="score-label">${T(UI.endScoreLabel)}</div>
        </div>
        <div class="ending-meta">
          <span>${T(UI.endCompletedLabel)}: ${completedCount}/${playable.length}</span>
          <span>${T(UI.endRankLabel)} ${T(rank.title)}</span>
        </div>
        <div class="certificate-card">
          <div class="cert-label">${T(UI.endCertificateLabel)}</div>
          <div class="cert-name">${T(UI.endCertificateName)}</div>
          <div class="cert-note">${T(UI.endCertificateNote)}</div>
        </div>
        <div class="ending-achievements">
          <h3>${T(UI.endAchieveTitle)}</h3>
          <div class="ending-achieve-grid">`;

      ACHIEVEMENTS.forEach(a => {
        const isUnlocked = unlocked.includes(a.id);
        html += `<div class="ending-achieve-item ${isUnlocked ? '' : 'locked'}">${isUnlocked ? T(a.title) : '???'}</div>`;
      });

      html += `</div></div>
        <div class="ending-principles">
          <h3>${T(UI.endPrinciplesTitle)}</h3>
          <div class="principle-item">${T(UI.endP1)}</div>
          <div class="principle-item">${T(UI.endP2)}</div>
          <div class="principle-item">${T(UI.endP3)}</div>
        </div>
        <p class="ending-quote">${T(UI.endQuote)}</p>
        <div class="edu-actions">
          <button class="btn-restart" onclick="copyResult()">${T(UI.endCopy).replace(/^.*?\\s/, '')}</button>
          <button class="btn-restart" onclick="showMainMenu()">${T(UI.endMenu).replace(/^.*?\\s/, '')}</button>
          <button class="btn-restart" onclick="resetProgressFromMenu()">${T(UI.endReset).replace(/^.*?\\s/, '')}</button>
          <button class="btn-restart" onclick="restartGame()">${T(UI.endRestart).replace(/^.*?\\s/, '')}</button>
        </div>`;

      $('ending-content').innerHTML = html;
      showLayer('ending-screen');
    }

    function showCopyNotice() {
      $('toast-icon').textContent = '';
      $('toast-label').textContent = T(UI.endCopied);
      $('toast-name').textContent = currentLang === 'id' ? 'Siap dibagikan' : 'Ready to share';
      $('achievement-toast').classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => $('achievement-toast').classList.remove('show'), 2500);
    }

<<<<<<< HEAD
/* =============================================================
   Expose CyberEscapeGame System to Main Bootloader
   ============================================================= */
window.CyberEscapeGame = {
    init: init,
    startCase: startCase,
    retryCase: retryCase,
    afterCaseComplete: afterCaseComplete
};
=======
window.CyberEscapeGame = {
  init,
  startCase,
  showNotification,
  onNotificationClick,
  showAppWindow,
  renderWhatsAppChat,
  renderInstagramChat,
  startNarration,
  showCurrentSlide,
  advanceDialog,
  showChoices,
  makeChoice,
  checkDigitalDefender,
  finalizeChoiceResult,
  processChoiceEffect,
  startGlitchSequence,
  revealLockdown,
  typeTerminal,
  cleanupHackedFx,
  hackedLearnMore,
  hackedRetry,
  afterGlitch,
  showNearMiss,
  showEducation,
  showCaseClosed,
  retryCase,
  afterCaseComplete,
  showEnding,
  copyResult,
  copyText,
  fallbackCopyText,
  showCopyNotice,
  restartGame,
};
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
