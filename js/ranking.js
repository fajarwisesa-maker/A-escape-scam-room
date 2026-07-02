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
window.getRank = getRank;