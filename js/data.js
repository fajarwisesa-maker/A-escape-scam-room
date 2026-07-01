/* =============================================================
   Cyber Escape Data
   Static game, achievement, and rank definitions.
   ============================================================= */

// ===== 3. ACHIEVEMENTS =====
    const ACHIEVEMENTS = [
      { id: 'apk_blocker', icon: '🛡️', title: { id: 'APK Blocker', en: 'APK Blocker' }, desc: { id: 'Menolak file APK berbahaya dari orang asing', en: 'Rejected a dangerous APK file from a stranger' } },
      { id: 'url_detective', icon: '🔍', title: { id: 'URL Detective', en: 'URL Detective' }, desc: { id: 'Menginvestigasi link phishing sebelum login', en: 'Investigated a phishing link before logging in' } },
      { id: 'social_slayer', icon: '🗡️', title: { id: 'Social Engineering Slayer', en: 'Social Engineering Slayer' }, desc: { id: 'Menggagalkan upaya social engineering', en: 'Defeated a social engineering attempt' } },
      { id: 'bot_hunter', icon: '🤖', title: { id: 'Bot Hunter', en: 'Bot Hunter' }, desc: { id: 'Mengenali akun palsu atau bot', en: 'Identified a fake account or bot' } },
      { id: 'two_fa_guardian', icon: '🔐', title: { id: '2FA Guardian', en: '2FA Guardian' }, desc: { id: 'Memahami pentingnya autentikasi dua langkah', en: 'Understood the importance of two-factor authentication' } },
      { id: 'digital_defender', icon: '🏅', title: { id: 'Digital Defender', en: 'Digital Defender' }, desc: { id: 'Menyelesaikan semua kasus yang tersedia', en: 'Completed all available cases' } },
    ];

// ===== 4. RANKS =====
    const RANKS = [
      { min: 0, title: { id: 'Pemula Digital', en: 'Digital Rookie' }, icon: '🌱' },
      { min: 120, title: { id: 'Waspada Digital', en: 'Digital Alert' }, icon: '👁️' },
      { min: 200, title: { id: 'Cyber Defender', en: 'Cyber Defender' }, icon: '🛡️' },
      { min: 280, title: { id: 'Scam Investigator', en: 'Scam Investigator' }, icon: '🏆' },
    ];

    // ===== 6. GAME DATA (3 playable + 2 coming soon) =====
    const GAME_DATA = {
      cases: [
        // === CASE 1: Undangan APK Palsu (WhatsApp) ===
        {
          id: 'case1', comingSoon: false,
          title: { id: 'Undangan APK Palsu', en: 'Fake Wedding Invitation APK' },
          description: { id: 'Pesan WhatsApp dari nomor asing mengirim file undangan pernikahan yang mencurigakan.', en: 'A WhatsApp message from an unknown number sends a suspicious wedding invitation file.' },
          icon: '📱', appType: 'whatsapp',
          notification: {
            icon: 'wa', app: 'WhatsApp Web',
            title: { id: 'Pesan Baru dari +62-812-XXXX-7788', en: 'New Message from +62-812-XXXX-7788' },
            body: { id: '"Haii kak! Undangan pernikahannya ya, jangan lupa dateng 🙏🏻" — Ada lampiran file.', en: '"Hey! Here\'s the wedding invitation, don\'t forget to come 🙏🏻" — File attached.' },
            time: { id: 'Baru saja', en: 'Just now' },
          },
          appContent: {
            contactName: '+62-812-XXXX-7788',
            messages: [
              {
                type: 'incoming', text: { id: 'Haii kak! Undangan pernikahannya ya, jangan lupa dateng 🙏🏻', en: 'Hey! Here\'s the wedding invitation, don\'t forget to come 🙏🏻' },
                attachment: { name: 'Undangan_Pernikahan.apk', size: '4.2 MB', icon: '📄' }, time: '14:32'
              },
            ],
          },
          slides: {
            id: ['Hm? Pesan dari nomor nggak dikenal... Ada lampiran file — "Undangan Pernikahan". Tapi siapa ya yang nikah? 🤔',
              'Bentar... ini file-nya kok ekstensinya .apk ya? Undangan digital biasanya kan PDF atau link website. File APK itu format aplikasi Android... 🧐',
              'Terus nomornya juga nggak ada di kontak gue. Biasanya kalau temen sendiri yang nikah, pasti nomornya udah kesimpan. Ini sus banget sih... 🚩',],
            en: ['Hm? Message from an unknown number... With an attachment — "Wedding Invitation". But who\'s getting married? 🤔',
              'Wait... the file extension is .apk? Digital invitations are usually PDF or website links. APK is an Android app format... 🧐',
              'And the number isn\'t in my contacts. If a friend were getting married, I\'d have their number saved. This is super sus... 🚩',],
          },
          choices: [
            {
              id: 'c1_safe', risk: 'safe', score: 100, achievement: 'apk_blocker', effect: 'caseClosed',
              label: { id: 'Abaikan pesan ini dan blokir nomornya. File APK dari orang asing = red flag! 🚫', en: 'Ignore this message and block the number. APK file from a stranger = red flag! 🚫' },
              resultSlides: { id: ['Nope. File APK dari nomor nggak dikenal? Hard pass. Langsung blokir! 🚫'], en: ['Nope. APK file from an unknown number? Hard pass. Blocked immediately! 🚫'] },
              caseClosedText: { id: 'Nice! Kamu berhasil mengenali tanda-tanda penipuan APK palsu. Data pribadi kamu tetap aman! 🕵️', en: 'Nice! You successfully identified the fake APK scam. Your personal data is safe! 🕵️' },
              education: {
                title: { id: 'Keputusan Aman', en: 'Safe Decision' },
                explanation: { id: 'Kamu tidak membuka file dari orang asing. Itu cara paling aman saat pesan terasa janggal.', en: 'You did not open a file from a stranger. That is the safest move when a message feels suspicious.' },
                redFlags: [{ id: 'File berakhiran .apk', en: 'File ending in .apk' }, { id: 'Nomor tidak dikenal', en: 'Unknown number' }, { id: 'Tidak ada konteks personal', en: 'No personal context' }],
                tips: [{ id: 'Blokir dan laporkan nomor mencurigakan', en: 'Block and report suspicious numbers' }, { id: 'Konfirmasi lewat kontak yang sudah kamu kenal', en: 'Confirm through a contact you already trust' }],
                whatToDo: { id: 'Kalau belum klik apa pun, cukup hapus pesan dan lanjutkan aktivitasmu.', en: 'If you have not clicked anything, just delete the message and move on.' },
                terms: ['apk', 'malware'],
              }, hackedDetails: null,
            },
            {
              id: 'c1_cautious', risk: 'cautious', score: 60, achievement: null, effect: 'nearMiss',
              label: { id: 'Balas chat-nya dulu, tanya siapa mereka sebelum buka file apa pun.', en: 'Reply first, ask who they are before opening any file.' },
              resultSlides: {
                id: ['Gue coba tanya dulu: "Maaf, ini siapa ya? Saya nggak simpan nomornya."', 'Hmm, nggak dibales. Udah setengah jam. Kalau beneran temen, pasti langsung jawab...', 'Yaudah deh, gue abaikan aja. Feeling gue bilang ini nggak bener.'],
                en: ['I\'ll ask first: "Sorry, who is this? I don\'t have your number saved."', 'Hmm, no reply. It\'s been 30 minutes. If it were a real friend, they\'d reply right away...', 'I\'ll just ignore it. My gut says something\'s off.']
              },
              nearmissText: { id: 'Kamu cukup waspada dengan tidak langsung membuka file, tapi membalas pesan scammer bisa membuat mereka tahu nomormu aktif dan mengirim lebih banyak pesan berbahaya.', en: 'You were cautious enough not to open the file, but replying to scammers lets them know your number is active and they may send more malicious messages.' },
              education: {
                title: { id: '🔍 Apa yang Baru Terjadi?', en: '🔍 What Just Happened?' },
                explanation: { id: 'Kamu memilih untuk bertanya dulu sebelum membuka file — ini lebih baik daripada langsung klik. Namun, <strong>membalas pesan scammer</strong> sebaiknya dihindari karena mengkonfirmasi nomormu aktif.', en: 'You chose to ask before opening the file — better than clicking right away. However, <strong>replying to scammers</strong> should be avoided as it confirms your number is active.' },
                redFlags: [{ id: '📱 File berekstensi .apk (bukan PDF/link)', en: '📱 File has .apk extension (not PDF/link)' }, { id: '👤 Nomor tidak dikenal', en: '👤 Unknown number' }, { id: '🔇 Tidak ada respons saat ditanya identitas', en: '🔇 No response when asked for identity' },],
                tips: [{ id: 'Jangan download file .apk dari orang tidak dikenal', en: 'Never download .apk files from unknown people' }, { id: 'Undangan asli = PDF atau link website resmi', en: 'Real invitations = PDF or official website links' }, { id: 'Jangan balas pesan mencurigakan — langsung blokir', en: 'Don\'t reply to suspicious messages — just block' }, { id: 'Aktifkan Google Play Protect di HP kamu', en: 'Enable Google Play Protect on your phone' },],
                whatToDo: { id: 'Jika sudah membalas: blokir nomor tersebut, jangan klik link/file apa pun yang mereka kirim selanjutnya, dan laporkan ke operator seluler.', en: 'If you already replied: block the number, don\'t click any link/file they send next, and report to your mobile carrier.' },
                quote: { id: '"File APK dari stranger = auto delete, auto block!" 🚫', en: '"APK file from a stranger = auto delete, auto block!" 🚫' },
                terms: ['apk', 'malware'],
              }, hackedDetails: null,
            },
            {
              id: 'c1_risky', risk: 'risky', score: 30, achievement: null, effect: 'nearMiss',
              label: { id: 'Download file-nya dulu, tapi jangan install sebelum cek izin aplikasinya.', en: 'Download the file first, but do not install before checking its app permissions.' },
              resultSlides: {
                id: ['Gue download dulu, tapi belum gue buka...', 'Pas dicek, file ini minta izin baca SMS, kontak, dan notifikasi. Lah, undangan kok butuh baca SMS?', 'Ini bahaya. Gue hapus file-nya sekarang juga.'],
                en: ['I downloaded it, but I have not opened it...', 'When checked, the file asks to read SMS, contacts, and notifications. Why would an invitation need SMS access?', 'This is dangerous. I deleted the file immediately.']
              },
              nearmissText: { id: 'Kamu berhenti sebelum install, itu bagus. Tapi download file mencurigakan tetap berisiko karena bisa terpencet atau dibuka orang lain.', en: 'You stopped before installing, good. But downloading a suspicious file is still risky because it can be tapped accidentally or opened by someone else.' },
              education: {
                title: { id: 'Nyaris Masuk Jebakan APK', en: 'Almost Caught by an APK Trap' },
                explanation: { id: 'APK palsu sering meminta izin yang tidak masuk akal. Izin SMS bisa dipakai mencuri OTP.', en: 'Fake APKs often ask for permissions that make no sense. SMS permission can be abused to steal OTP codes.' },
                redFlags: [{ id: 'Aplikasi undangan minta baca SMS', en: 'Invitation app asks to read SMS' }, { id: 'File dikirim lewat chat, bukan toko resmi', en: 'File sent via chat, not an official store' }, { id: 'Nama file dibuat agar terlihat biasa', en: 'File name is made to look normal' }],
                tips: [{ id: 'Jangan download APK dari chat', en: 'Do not download APKs from chats' }, { id: 'Cek izin aplikasi sebelum install', en: 'Check app permissions before installing' }, { id: 'Pakai Play Protect atau antivirus bawaan', en: 'Use Play Protect or built-in antivirus' }],
                whatToDo: { id: 'Hapus file dari folder download. Jangan beri izin instal aplikasi dari sumber tidak dikenal.', en: 'Delete the file from downloads. Do not allow installs from unknown sources.' },
                quote: { id: '"Kalau izin aplikasinya aneh, berhenti di situ."', en: '"If the app permissions feel weird, stop there."' },
                terms: ['apk', 'otp', 'malware'],
              }, hackedDetails: null,
            },
            {
              id: 'c1_fatal', risk: 'fatal', score: -100, achievement: 'two_fa_guardian', effect: 'glitch',
              label: { id: 'Download dan buka file APK-nya. Siapa tau beneran undangan, ntar nyesel nggak dateng.', en: 'Download and open the APK file. Maybe it\'s a real invitation, don\'t wanna miss it.' },
              resultSlides: {
                id: ['Yaudah deh, gue download aja. Paling cuma undangan biasa...', 'Loh, kok nggak ada undangannya? Cuma layar kosong doang. Ah mungkin bug, tinggalin aja deh.'],
                en: ['Alright, I\'ll just download it. Probably just a regular invitation...', 'Wait, there\'s no invitation? Just a blank screen. Must be a bug, I\'ll just leave it.']
              },
              hackedDetails: {
                title: { id: 'HP-mu Telah Disusupi Malware!', en: 'Your Phone Has Been Infected with Malware!' },
                items: [{ icon: '📨', text: { id: 'SMS Banking kamu telah diakses — kode OTP dicuri!', en: 'Your banking SMS has been accessed — OTP codes stolen!' } },
                { icon: '📸', text: { id: 'Kontak & foto pribadimu sedang di-upload ke server asing!', en: 'Your contacts & photos are being uploaded to a foreign server!' } },
                { icon: '💸', text: { id: 'M-Banking: Transfer Rp 2.500.000 ke rekening tidak dikenal — BERHASIL', en: 'Mobile Banking: Transfer of Rp 2,500,000 to unknown account — SUCCESSFUL' } },],
              },
              education: {
                title: { id: '🔍 Apa yang Baru Terjadi?', en: '🔍 What Just Happened?' },
                explanation: { id: 'Kamu baru saja menginstall <strong>malware</strong> yang menyamar jadi undangan. File APK palsu itu mencuri data SMS (termasuk kode OTP), mengakses kontak dan galeri foto, bahkan mengambil alih M-Banking kamu.', en: 'You just installed <strong>malware</strong> disguised as an invitation. The fake APK stole your SMS data (including OTP codes), accessed your contacts and photos, and even took over your mobile banking.' },
                redFlags: [{ id: '📱 Format file .apk — bukan format undangan', en: '📱 File format .apk — not an invitation format' }, { id: '👤 Pengirim tidak dikenal', en: '👤 Unknown sender' }, { id: '📵 Tidak ada interaksi personal sebelumnya', en: '📵 No prior personal interaction' },],
                tips: [{ id: '<strong>JANGAN pernah</strong> download file .apk dari orang tidak dikenal', en: '<strong>NEVER</strong> download .apk files from unknown people' }, { id: 'Undangan asli = PDF atau link website, <strong>bukan</strong> file APK', en: 'Real invitations = PDF or website link, <strong>not</strong> APK files' }, { id: 'Kalau ragu, <strong>telepon langsung</strong> orangnya', en: 'When in doubt, <strong>call the person directly</strong>' }, { id: 'Aktifkan <strong>Google Play Protect</strong> dan <strong>2FA</strong>', en: 'Enable <strong>Google Play Protect</strong> and <strong>2FA</strong>' },],
                whatToDo: { id: 'Segera matikan data HP, pindai dengan antivirus, ganti semua password, hubungi bank untuk blokir akun, dan laporkan ke polisi siber (patrolisiber.id).', en: 'Immediately turn off mobile data, scan with antivirus, change all passwords, contact your bank to freeze the account, and report to cyber police.' },
                quote: { id: '"File APK dari stranger = auto delete, auto block!" 🚫', en: '"APK file from a stranger = auto delete, auto block!" 🚫' },
                terms: ['apk', 'otp', 'malware', 'twofa'],
              },
            },
          ],
        },
        // === CASE 2: Diamond Game / Top-Up Gratis (Instagram) ===
        {
          id: 'case2', comingSoon: false,
          title: { id: 'Diamond Game Gratis', en: 'Free Game Diamonds' },
          description: { id: 'DM Instagram menawarkan 10.000 diamond game gratis melalui link mencurigakan.', en: 'An Instagram DM offers 10,000 free game diamonds through a suspicious link.' },
          icon: '🎮', appType: 'instagram',
          notification: {
            icon: 'ig', app: 'Instagram',
            title: { id: 'DM Baru dari @ML_GiveawayID', en: 'New DM from @ML_GiveawayID' },
            body: { id: '🎮 "SELAMAT! Kamu terpilih dapet 10.000 Diamond ML GRATIS! Klaim sekarang..."', en: '🎮 "CONGRATS! You\'ve been selected to win 10,000 FREE ML Diamonds! Claim now..."' },
            time: { id: 'Baru saja', en: 'Just now' },
          },
          appContent: {
            username: '@ML_GiveawayID',
            messages: [
              { type: 'time', text: { id: 'Hari ini, 15:47', en: 'Today, 3:47 PM' } },
              { type: 'incoming', text: { id: '🎮 SELAMAT! Kamu terpilih dapet 10.000 Diamond ML GRATIS! Klaim sekarang sebelum hangus 🔥', en: '🎮 CONGRATS! You\'ve been selected for 10,000 FREE ML Diamonds! Claim now before it expires 🔥' } },
              { type: 'incoming', text: { id: 'Klik link ini buat klaim: ', en: 'Click this link to claim: ' }, link: 'ml-diamond-free.blogspot.com/klaim' },
              { type: 'incoming', text: { id: 'Buruan kak, kuota terbatas!! Tinggal 3 slot lagi!! ⏰🔥', en: 'Hurry, limited slots!! Only 3 left!! ⏰🔥' } },
            ],
          },
          slides: {
            id: ['Wait... 10.000 diamond ML gratis?! Itu kalau dibeli bisa jutaan! Tapi... ini legit nggak sih? 🤔',
              'Hmm, akun @ML_GiveawayID ini follower-nya cuma 200-an. Akun resmi Mobile Legends yang asli itu verified dan follower-nya jutaan. Yang ini jelas bukan official. 🧐',
              'Link-nya juga aneh: "ml-diamond-free.blogspot.com"... Domain resmi Moonton itu mobilelegends.com. Ini mah link abal-abal. Plus, minta login pake akun ML... 🚩',],
            en: ['Wait... 10,000 free ML diamonds?! That\'d cost millions if bought! But... is this legit? 🤔',
              'Hmm, @ML_GiveawayID only has about 200 followers. The real Mobile Legends account is verified with millions of followers. This clearly isn\'t official. 🧐',
              'The link is also weird: "ml-diamond-free.blogspot.com"... Moonton\'s real domain is mobilelegends.com. This is totally fake. Plus, it asks for ML login... 🚩',],
          },
          choices: [
            {
              id: 'c2_safe', risk: 'safe', score: 100, achievement: 'url_detective', effect: 'caseClosed',
              label: { id: 'Abaikan DM ini dan laporkan akunnya ke Instagram. Too good to be true! 🚫', en: 'Ignore this DM and report the account to Instagram. Too good to be true! 🚫' },
              resultSlides: { id: ['Gratis 10.000 diamond? Yeah right. Kalau beneran, semua orang udah kaya. 😂 Report & block!'], en: ['Free 10,000 diamonds? Yeah right. If it were real, everyone would be rich. 😂 Report & block!'] },
              caseClosedText: { id: 'GG! Kamu nggak ketipu link phishing. Akun ML dan data pribadi kamu tetap aman. 🏆', en: 'GG! You didn\'t fall for the phishing link. Your ML account and personal data are safe. 🏆' },
              education: {
                title: { id: 'Keputusan Aman', en: 'Safe Decision' },
                explanation: { id: 'Kamu sadar hadiah terlalu besar dan sumbernya tidak resmi. Itu tanda kuat scam.', en: 'You noticed the reward was too huge and the source was unofficial. That is a strong scam sign.' },
                redFlags: [{ id: 'Akun tidak verified', en: 'Unverified account' }, { id: 'Domain bukan website resmi game', en: 'Domain is not the official game website' }, { id: 'Hadiah terlalu besar', en: 'Reward is too big' }],
                tips: [{ id: 'Klaim hadiah hanya dari aplikasi/situs resmi', en: 'Claim rewards only from official apps/sites' }, { id: 'Laporkan akun giveaway palsu', en: 'Report fake giveaway accounts' }],
                whatToDo: { id: 'Karena belum klik, cukup report, block, dan jangan bagikan linknya ke teman.', en: 'Since you did not click, just report, block, and do not share the link with friends.' },
                terms: ['phishing', 'domain'],
              }, hackedDetails: null,
            },
            {
              id: 'c2_cautious', risk: 'cautious', score: 60, achievement: 'bot_hunter', effect: 'nearMiss',
              label: { id: 'Cek dulu profil akun dan komentarnya sebelum memutuskan apa pun.', en: 'Check the account profile and comments first before deciding anything.' },
              resultSlides: {
                id: ['Gue cek dulu deh profil @ML_GiveawayID...', 'Follower cuma 237, posting cuma 5, semua template yang sama. Komen di postingannya juga aneh — "WORK 100%!!" "LEGIT!!" semua dari akun tanpa foto profil yang dibuat di tanggal yang sama. 🤖', 'Ini jelas akun bot dan scam. Gue report dan block aja!'],
                en: ['Let me check the @ML_GiveawayID profile first...', 'Only 237 followers, just 5 posts, all the same template. The comments are weird too — "WORK 100%!!" "LEGIT!!" all from accounts with no profile pics created on the same date. 🤖', 'This is clearly a bot/scam account. Report and block!']
              },
              nearmissText: { id: 'Kamu sempat tertarik, tapi kamu melakukan investigasi dulu — dan berhasil menemukan tanda-tanda akun bot! Ini skill penting di era digital.', en: 'You were tempted, but you investigated first — and found bot account signs! This is a crucial skill in the digital age.' },
              education: {
                title: { id: '🔍 Cara Mengenali Akun Bot', en: '🔍 How to Spot Bot Accounts' },
                explanation: { id: 'Kamu berhasil mengenali <strong>jaringan bot komentar</strong>! Penipu menyewa click farms untuk membanjiri kolom komentar dengan pujian palsu agar korban merasa aman.', en: 'You successfully identified a <strong>comment bot network</strong>! Scammers hire click farms to flood comment sections with fake praise to make victims feel safe.' },
                redFlags: [{ id: '👥 Follower sangat sedikit untuk akun "resmi"', en: '👥 Very few followers for an "official" account' }, { id: '🤖 Komentar dari akun tanpa foto, dibuat di tanggal sama', en: '🤖 Comments from no-photo accounts created on the same date' }, { id: '🔗 Domain bukan milik publisher game resmi', en: '🔗 Domain doesn\'t belong to the official game publisher' }, { id: '⏰ Teknik FOMO: "Tinggal 3 slot!"', en: '⏰ FOMO technique: "Only 3 slots left!"' },],
                tips: [{ id: 'Diamond/item gratis di luar app resmi = 99.9% SCAM', en: 'Free diamonds/items outside the official app = 99.9% SCAM' }, { id: 'Cek domain website — harus domain resmi publisher game', en: 'Check the website domain — must be the official publisher\'s domain' }, { id: 'Periksa komentar — bot punya pola bahasa yang sama', en: 'Check comments — bots have identical language patterns' }, { id: 'Aktifkan <strong>2FA</strong> di semua akun', en: 'Enable <strong>2FA</strong> on all accounts' },],
                whatToDo: { id: 'Jika sudah klik link tapi belum login: tutup browser, hapus history. Jika sudah login: segera ganti password dan aktifkan 2FA.', en: 'If you clicked the link but didn\'t log in: close the browser, clear history. If you logged in: immediately change your password and enable 2FA.' },
                quote: { id: '"Kalau too good to be true, ya emang bukan true! 😂"', en: '"If it\'s too good to be true, it probably isn\'t! 😂"' },
                terms: ['phishing', 'domain', 'twofa'],
              }, hackedDetails: null,
            },
            {
              id: 'c2_risky', risk: 'risky', score: 30, achievement: null, effect: 'nearMiss',
              label: { id: 'Klik linknya untuk lihat-lihat dulu, tapi nggak akan login.', en: 'Click the link just to look around, but won\'t log in.' },
              resultSlides: {
                id: ['Penasaran sih... gue klik aja linknya buat lihat.', 'Hmm, websitenya minta login akun ML. Tapi URL-nya "blogspot.com" bukan "mobilelegends.com". Ini bukan situs resmi!', 'Gue langsung tutup browser. Hampir aja ketipu... 😰'],
                en: ['I\'m curious... I\'ll just click the link to look.', 'Hmm, the website asks for ML login. But the URL is "blogspot.com" not "mobilelegends.com". This isn\'t the official site!', 'I closed the browser immediately. Almost got scammed... 😰']
              },
              nearmissText: { id: 'Kamu cukup beruntung tidak login, tapi mengklik link phishing tetap berisiko! Beberapa link bisa langsung menginstall malware tanpa kamu sadari.', en: 'You were lucky you didn\'t log in, but clicking phishing links is still risky! Some links can install malware without you realizing it.' },
              education: {
                title: { id: '🔍 Bahaya Mengklik Link Asing', en: '🔍 Dangers of Clicking Unknown Links' },
                explanation: { id: 'Walaupun kamu tidak login, <strong>mengklik link phishing</strong> tetap berbahaya. Beberapa situs bisa menanamkan cookie pelacak, mengeksploitasi kerentanan browser, atau mengarahkan ke download malware otomatis.', en: 'Even though you didn\'t log in, <strong>clicking phishing links</strong> is still dangerous. Some sites can plant tracking cookies, exploit browser vulnerabilities, or redirect to automatic malware downloads.' },
                redFlags: [{ id: '🔗 Domain palsu (blogspot, bukan domain resmi)', en: '🔗 Fake domain (blogspot, not the official domain)' }, { id: '💎 Janji hadiah terlalu besar untuk jadi nyata', en: '💎 Prizes too big to be true' }, { id: '⏰ Tekanan waktu: "kuota terbatas"', en: '⏰ Time pressure: "limited slots"' },],
                tips: [{ id: 'Jangan klik link dari sumber tidak terpercaya', en: 'Don\'t click links from untrusted sources' }, { id: 'Cek URL sebelum mengisi data apa pun', en: 'Check the URL before entering any data' }, { id: 'Gunakan browser dengan fitur anti-phishing', en: 'Use a browser with anti-phishing features' },],
                whatToDo: { id: 'Hapus cookies dan history browser. Pindai HP dengan antivirus. Jangan kembali ke situs tersebut.', en: 'Clear browser cookies and history. Scan your phone with antivirus. Don\'t revisit the site.' },
                quote: { id: '"Penasaran boleh, tapi klik sembarangan jangan!" 🧐', en: '"Curiosity is fine, but don\'t click carelessly!" 🧐' },
                terms: ['phishing', 'domain', 'malware'],
              }, hackedDetails: null,
            },
            {
              id: 'c2_fatal', risk: 'fatal', score: -100, achievement: 'two_fa_guardian', effect: 'glitch',
              label: { id: 'Klik link dan login pake akun ML. 10.000 diamond cuy! 🤩', en: 'Click the link and log in with my ML account. 10,000 diamonds! 🤩' },
              resultSlides: {
                id: ['Yaudah gue coba aja deh. Masukin ID sama password ML...', 'Katanya diamond akan masuk dalam 24 jam. Ditunggu aja deh~ 😊'],
                en: ['I\'ll just try it. Entering my ML ID and password...', 'They say the diamonds will arrive in 24 hours. Let\'s wait~ 😊']
              },
              hackedDetails: {
                title: { id: 'Akun Game & Email-mu Diretas!', en: 'Your Game Account & Email Are Hacked!' },
                items: [{ icon: '🔑', text: { id: 'Password akun ML kamu telah diganti oleh orang lain!', en: 'Your ML account password has been changed by someone else!' } },
                { icon: '💎', text: { id: 'Skin Epic & Starlight kamu sedang dijual di black market!', en: 'Your Epic & Starlight skins are being sold on the black market!' } },
                { icon: '📧', text: { id: 'Email terhubung juga diretas — semua akun dalam bahaya!', en: 'Your linked email is also hacked — all accounts are in danger!' } },],
              },
              education: {
                title: { id: '🔍 Apa yang Baru Terjadi?', en: '🔍 What Just Happened?' },
                explanation: { id: 'Kamu memasukkan data login ke <strong>website phishing</strong>. Password langsung dicuri penipu. Akun game + email terhubung = semua diretas. Skin, rank, dan item hilang selamanya.', en: 'You entered your login data into a <strong>phishing website</strong>. Your password was instantly stolen. Game account + linked email = everything hacked. Skins, rank, and items lost forever.' },
                redFlags: [{ id: '🔗 Domain palsu (blogspot.com bukan mobilelegends.com)', en: '🔗 Fake domain (blogspot.com not mobilelegends.com)' }, { id: '🎁 Hadiah yang terlalu bagus untuk jadi kenyataan', en: '🎁 Reward too good to be true' }, { id: '👤 Akun tidak verified dengan follower sedikit', en: '👤 Unverified account with few followers' },],
                tips: [{ id: '<strong>Diamond gratis</strong> di luar app resmi = 99.9% SCAM', en: '<strong>Free diamonds</strong> outside official apps = 99.9% SCAM' }, { id: 'Cek <strong>domain website</strong> — harus domain resmi', en: 'Check the <strong>website domain</strong> — must be official' }, { id: '<strong>Jangan pernah</strong> login di website bukan official', en: '<strong>Never</strong> log in on unofficial websites' }, { id: 'Aktifkan <strong>2FA</strong> di semua akun', en: 'Enable <strong>2FA</strong> on all accounts' },],
                whatToDo: { id: 'Segera ganti password ML dan email dari perangkat lain. Aktifkan 2FA. Hubungi support game untuk recovery akun. Cabut akses aplikasi pihak ketiga.', en: 'Immediately change your ML and email passwords from another device. Enable 2FA. Contact game support for account recovery. Revoke third-party app access.' },
                quote: { id: '"Kalau too good to be true, ya emang bukan true! 😂"', en: '"If it\'s too good to be true, it probably isn\'t! 😂"' },
                terms: ['phishing', 'domain', 'twofa'],
              },
            },
          ],
        },
        // === CASE 3: Akun Teman Dibajak (WhatsApp) ===
        {
          id: 'case3', comingSoon: false,
          title: { id: 'Akun Teman Dibajak', en: 'Friend\'s Hijacked Account' },
          description: { id: 'Teman dekatmu mengirim chat darurat minta pinjam uang. Tapi apa benar itu dia?', en: 'Your close friend sends an urgent chat asking to borrow money. But is it really them?' },
          icon: '💬', appType: 'whatsapp',
          notification: {
            icon: 'wa', app: 'WhatsApp Web',
            title: { id: 'Pesan Baru dari Andi (Teman Sekolah)', en: 'New Message from Andi (School Friend)' },
            body: { id: '"Bro, tolong banget! Gue lagi darurat, bisa pinjemin duit dulu gak?" 😰', en: '"Bro, please help! I\'m in an emergency, can you lend me some money?" 😰' },
            time: { id: 'Baru saja', en: 'Just now' },
          },
          appContent: {
            contactName: 'Andi 🏀',
            messages: [
              { type: 'incoming', text: { id: 'Bro, tolong banget! Gue lagi darurat 😰', en: 'Bro, please help! I\'m in an emergency 😰' }, time: '16:05' },
              { type: 'incoming', text: { id: 'Bisa pinjemin Rp 500.000 dulu gak? Ntar gue balikin besok, sumpah!', en: 'Can you lend me Rp 500,000? I\'ll pay you back tomorrow, I swear!' }, time: '16:05' },
              { type: 'incoming', text: { id: 'Transfer ke rekening ini ya: BCA 7281039456 a.n. Dewi Sartika', en: 'Transfer to this account: BCA 7281039456 a.n. Dewi Sartika' }, time: '16:06' },
              { type: 'incoming', text: { id: 'Cepet ya bro, gue beneran butuh banget sekarang 🙏🙏', en: 'Hurry bro, I really need it right now 🙏🙏' }, time: '16:06' },
            ],
          },
          slides: {
            id: ['Wah, Andi minta pinjam uang? Biasanya dia nggak pernah minjam ke gue... 🤔',
              'Aneh juga, kok ngirimnya ke rekening atas nama "Dewi Sartika"? Andi kan cowok, kenapa rekeningnya nama cewek? 🧐',
              'Terus gaya chatnya agak beda. Biasanya Andi pake bahasa gaul yang lebih santai, ini kok agak kaku... Plus dia maksa banget minta cepet. 🚩',],
            en: ['Wow, Andi asking to borrow money? He\'s never borrowed from me before... 🤔',
              'It\'s weird too, the transfer is to an account under "Dewi Sartika"? Andi\'s a guy, why is the account name a woman\'s? 🧐',
              'And his chat style is a bit different. Andi usually uses more casual slang, this feels stiff... Plus he\'s pushing me to hurry. 🚩',],
          },
          choices: [
            {
              id: 'c3_safe', risk: 'safe', score: 100, achievement: 'social_slayer', effect: 'caseClosed',
              label: { id: 'Telepon Andi langsung untuk konfirmasi. Kalau akunnya beneran dibajak, dia harus tau.', en: 'Call Andi directly to verify. If his account is really hijacked, he needs to know.' },
              resultSlides: {
                id: ['Gue telepon Andi langsung...', '"Hah? Gue nggak minta pinjam uang ke siapa pun! Akun WA gue dibajak?!" — Andi panik di telepon.', 'Untung gue telepon dulu. Andi langsung logout dari semua perangkat dan ganti password. Kasus selesai! 💪'],
                en: ['I\'m calling Andi directly...', '"What? I didn\'t ask anyone for money! My WA account is hijacked?!" — Andi panics on the phone.', 'Good thing I called first. Andi immediately logged out of all devices and changed his password. Case closed! 💪']
              },
              caseClosedText: { id: 'Hebat! Kamu berhasil menyelamatkan temanmu dari social engineering. Verifikasi langsung lewat telepon adalah cara terbaik! 📞', en: 'Amazing! You saved your friend from social engineering. Direct phone verification is the best method! 📞' },
              education: {
                title: { id: 'Keputusan Aman', en: 'Safe Decision' },
                explanation: { id: 'Kamu pindah ke jalur verifikasi yang lebih kuat: telepon langsung. Penipu sulit meniru suara dan reaksi teman asli.', en: 'You moved to stronger verification: a direct phone call. Scammers have a hard time copying a real friend\'s voice and reaction.' },
                redFlags: [{ id: 'Minta uang mendadak', en: 'Sudden money request' }, { id: 'Rekening atas nama orang lain', en: 'Bank account under another name' }, { id: 'Gaya chat terasa beda', en: 'Chat style feels different' }],
                tips: [{ id: 'Telepon sebelum transfer', en: 'Call before transferring money' }, { id: 'Bantu teman mengamankan akun', en: 'Help your friend secure the account' }],
                whatToDo: { id: 'Minta Andi aktifkan verifikasi 2 langkah WhatsApp dan beri tahu teman lain.', en: 'Ask Andi to enable WhatsApp two-step verification and warn other friends.' },
                terms: ['social', 'twofa'],
              }, hackedDetails: null,
            },
            {
              id: 'c3_cautious', risk: 'cautious', score: 60, achievement: null, effect: 'nearMiss',
              label: { id: 'Tanya sesuatu yang hanya Andi asli yang bisa jawab, misalnya tentang kenangan berdua.', en: 'Ask something only the real Andi could answer, like a shared memory.' },
              resultSlides: {
                id: ['Gue coba test: "Eh, kita kemarin main apa bareng di rumah gue?"', '"Haha, main game lah bro!" — jawabnya generik banget.', 'Padahal kemarin gue sama Andi main basket, bukan game. Ini pasti bukan Andi! Langsung blokir. 😤'],
                en: ['I\'ll test: "Hey, what did we do together at my house yesterday?"', '"Haha, played games of course bro!" — super generic answer.', 'Actually, Andi and I played basketball yesterday, not games. This definitely isn\'t Andi! Blocked immediately. 😤']
              },
              nearmissText: { id: 'Kamu menggunakan teknik verifikasi identitas yang cerdas! Tapi sebaiknya langsung telepon untuk konfirmasi yang lebih kuat dan cepat.', en: 'You used a smart identity verification technique! But it\'s better to call directly for stronger and faster confirmation.' },
              education: {
                title: { id: '🔍 Social Engineering: Menyamar Jadi Teman', en: '🔍 Social Engineering: Impersonating Friends' },
                explanation: { id: 'Kamu menggunakan pertanyaan personal untuk memverifikasi identitas — teknik yang bagus! Penipu yang membajak akun <strong>tidak punya akses ke kenangan pribadi</strong> kalian.', en: 'You used personal questions to verify identity — great technique! Scammers who hijack accounts <strong>don\'t have access to personal memories</strong>.' },
                redFlags: [{ id: '💰 Minta uang dengan cara yang tidak biasa', en: '💰 Asking for money in an unusual way' }, { id: '📛 Rekening atas nama orang lain', en: '📛 Bank account under someone else\'s name' }, { id: '✍️ Gaya bahasa berbeda dari biasanya', en: '✍️ Different writing style than usual' }, { id: '⏰ Mendesak untuk cepat-cepat', en: '⏰ Urgently pressuring for speed' },],
                tips: [{ id: 'Selalu <strong>telepon langsung</strong> jika teman minta uang via chat', en: 'Always <strong>call directly</strong> if a friend asks for money via chat' }, { id: 'Tanya hal yang hanya teman asli yang bisa jawab', en: 'Ask things only the real friend could answer' }, { id: 'Cek apakah rekening atas nama yang benar', en: 'Check if the account is under the right name' },],
                whatToDo: { id: 'Jika temanmu benar-benar dibajak: bantu dia logout dari semua perangkat, ganti password, dan aktifkan verifikasi 2 langkah WA.', en: 'If your friend was truly hijacked: help them log out of all devices, change password, and enable WhatsApp 2-step verification.' },
                quote: { id: '"Teman sejati verifikasi dulu, baru transfer!" 📞', en: '"True friends verify first, then transfer!" 📞' },
                terms: ['social', 'twofa'],
              }, hackedDetails: null,
            },
            {
              id: 'c3_risky', risk: 'risky', score: 30, achievement: null, effect: 'nearMiss',
              label: { id: 'Chat teman lain dulu untuk tanya apakah Andi juga menghubungi mereka.', en: 'Message another friend first to ask whether Andi contacted them too.' },
              resultSlides: {
                id: ['Gue tanya Rani: "Ran, Andi ada minta uang juga nggak?"', 'Rani langsung balas: "Iya! Tapi gue curiga, rekeningnya bukan nama Andi."', 'Berarti ini kemungkinan besar akun dibajak. Gue stop dan telepon Andi asli.'],
                en: ['I asked Rani: "Did Andi ask you for money too?"', 'Rani replies immediately: "Yes! But I was suspicious, the account name is not Andi."', 'So this is most likely a hijacked account. I stopped and called the real Andi.']
              },
              nearmissText: { id: 'Kamu mencari bukti tambahan, itu membantu. Tapi chat ke orang lain masih lebih lambat daripada telepon langsung ke Andi.', en: 'You looked for extra evidence, which helps. But messaging someone else is still slower than calling Andi directly.' },
              education: {
                title: { id: 'Cek Pola, Tapi Tetap Verifikasi', en: 'Check the Pattern, Still Verify' },
                explanation: { id: 'Penipu sering mengirim pesan yang sama ke banyak kontak. Info dari teman lain bisa membantu, tapi keputusan akhir tetap harus lewat konfirmasi langsung.', en: 'Scammers often send the same message to many contacts. Other friends can help, but the final decision should still come from direct confirmation.' },
                redFlags: [{ id: 'Pesan darurat dikirim ke banyak orang', en: 'Emergency message sent to many people' }, { id: 'Nomor rekening tidak cocok', en: 'Bank account name does not match' }, { id: 'Ada tekanan untuk cepat transfer', en: 'Pressure to transfer quickly' }],
                tips: [{ id: 'Jangan transfer sebelum bicara langsung', en: 'Do not transfer before talking directly' }, { id: 'Screenshot bukti untuk membantu teman memulihkan akun', en: 'Screenshot evidence to help your friend recover the account' }],
                whatToDo: { id: 'Kabari teman asli lewat telepon atau ketemu langsung. Minta dia logout dari perangkat asing.', en: 'Tell the real friend by phone or in person. Ask them to log out from unknown devices.' },
                quote: { id: '"Cari bukti boleh, tapi transfer tunggu verifikasi."', en: '"Gathering evidence is fine, but transfer only after verification."' },
                terms: ['social', 'twofa'],
              }, hackedDetails: null,
            },
            {
              id: 'c3_fatal', risk: 'fatal', score: -100, achievement: null, effect: 'glitch',
              label: { id: 'Langsung transfer Rp 500.000. Kasihan Andi, dia kan teman baik gue.', en: 'Transfer Rp 500,000 immediately. Poor Andi, he\'s my good friend.' },
              resultSlides: {
                id: ['Kasihan Andi, gue langsung transfer deh...', 'Done! Rp 500.000 sudah terkirim ke BCA 7281039456. Semoga Andi cepet beres masalahnya.'],
                en: ['Poor Andi, I\'ll transfer right away...', 'Done! Rp 500,000 sent to BCA 7281039456. Hope Andi sorts out his problems soon.']
              },
              hackedDetails: {
                title: { id: 'Kamu Baru Saja Ditipu Social Engineering!', en: 'You Just Got Scammed by Social Engineering!' },
                items: [{ icon: '💸', text: { id: 'Rp 500.000 kamu masuk ke rekening penipu, bukan Andi!', en: 'Your Rp 500,000 went to the scammer\'s account, not Andi\'s!' } },
                { icon: '📱', text: { id: 'Akun WhatsApp Andi yang asli telah dibajak oleh hacker!', en: 'The real Andi\'s WhatsApp has been hijacked by a hacker!' } },
                { icon: '🔄', text: { id: 'Penipu akan terus meminta uang ke kontak Andi yang lain!', en: 'The scammer will keep asking money from Andi\'s other contacts!' } },],
              },
              education: {
                title: { id: '🔍 Apa yang Baru Terjadi?', en: '🔍 What Just Happened?' },
                explanation: { id: 'Kamu mentransfer uang ke <strong>penipu yang menyamar</strong> sebagai temanmu. Ini adalah teknik <strong>social engineering</strong> — memanfaatkan kepercayaan dan rasa kasihan untuk menipu korban.', en: 'You transferred money to a <strong>scammer impersonating</strong> your friend. This is <strong>social engineering</strong> — exploiting trust and sympathy to scam victims.' },
                redFlags: [{ id: '💰 Tiba-tiba minta uang via chat (bukan telepon/tatap muka)', en: '💰 Suddenly asking for money via chat (not phone/in person)' }, { id: '📛 Rekening atas nama orang lain', en: '📛 Account under a different name' }, { id: '✍️ Gaya chat berbeda dari biasanya', en: '✍️ Chat style different from usual' }, { id: '⏰ Sangat mendesak', en: '⏰ Very urgent' },],
                tips: [{ id: '<strong>SELALU telepon</strong> sebelum transfer uang ke siapa pun', en: '<strong>ALWAYS call</strong> before transferring money to anyone' }, { id: 'Cek nama rekening — harus sesuai nama teman', en: 'Check account name — must match friend\'s name' }, { id: 'Jangan panik hanya karena pesan terdengar darurat', en: 'Don\'t panic just because a message sounds urgent' },],
                whatToDo: { id: 'Segera hubungi bank untuk mencoba memblokir transfer. Laporkan ke polisi. Beri tahu Andi yang asli bahwa akunnya dibajak agar dia bisa mengamankan akunnya.', en: 'Immediately contact the bank to try blocking the transfer. Report to the police. Tell the real Andi that his account is hijacked so he can secure it.' },
                quote: { id: '"Verifikasi dulu baru percaya. Telepon > Chat!" 📞', en: '"Verify before you trust. Phone call > Chat!" 📞' },
                terms: ['social', 'twofa'],
              },
            },
          ],
        },
        // === CASE 4: Lowongan Berbayar Palsu (Coming Soon) ===
        {
          id: 'case4', comingSoon: true,
          title: { id: 'Lowongan Berbayar Palsu', en: 'Fake Paid Job Offer' },
          description: { id: 'Ditawari uang saku tambahan, tapi diminta deposit dulu. Apakah ini kerja nyata atau jebakan?', en: 'Offered extra pocket money, but asked for a deposit first. Is this a real job or a trap?' },
          previewRedFlags: [
            { id: 'Minta deposit awal', en: 'Asks for upfront deposit' },
            { id: 'Janji uang terlalu mudah', en: 'Promises easy money' },
            { id: 'Minta data pribadi berlebihan', en: 'Requests too much personal data' },
          ],
          icon: '💰', appType: 'whatsapp',
          notification: {}, appContent: {}, slides: {}, choices: [],
        },
        // === CASE 5: Cheat Game / Mod APK (Coming Soon) ===
        {
          id: 'case5', comingSoon: true,
          title: { id: 'Cheat Game & Mod APK', en: 'Game Cheats & Mod APK' },
          description: { id: 'Download cheat game gratis yang ternyata menyimpan malware berbahaya.', en: 'Download free game cheats that secretly contain dangerous malware.' },
          previewRedFlags: [
            { id: 'Mod APK dari grup chat', en: 'Mod APK from group chat' },
            { id: 'Minta izin akses aneh', en: 'Asks for strange permissions' },
            { id: 'Cheat gratis untuk akun utama', en: 'Free cheat for your main account' },
          ],
          icon: '💻', appType: 'whatsapp',
          notification: {}, appContent: {}, slides: {}, choices: [],
        },
      ]
    };

window.CyberEscapeData = {
  ACHIEVEMENTS,
  RANKS,
  GAME_DATA,
};
