/* =============================================================
   Cyber Escape Ranking
   Rank calculation helpers.
   ============================================================= */

function getRank(score) {
  let rank = RANKS[0];
  for (const r of RANKS) { if (score >= r.min) rank = r; }
  return rank;
}

window.CyberEscapeRanking = {
  getRank,
};
<<<<<<< HEAD
window.getRank = getRank;
=======
>>>>>>> 40c97689312723f05c31dee8a941c0a06cce5eae
