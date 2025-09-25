export const importAll = (r) => {
    const images = {};
    r.keys().forEach((fileName) => {
        const name = fileName.replace('./', '').replace('.png', ''); 
        images[name] = r(fileName);
    });

    const suits = ['H', 'D', 'S', 'C'];
    let deck = suits.map(suit => {
        return Array.from({ length: 13 }, (_, i) => images[`${i + 1}${suit}`]);
    }).flat();

    deck = [...deck, images['JkrBlk']]
    deck = [...deck, images['JkrRed']]
    return deck;
}

export const determineCard = (n, { returnStructured = false, useSymbols = true } = {}) => {

  const i = ((Number(n) - 1) % 54 + 54) % 54;  // handles negatives and 0/1 indexing

  if (i >= 52) {
    const name = i === 52 ? 'Black Joker' : 'Red Joker';
    if (!returnStructured) return name;
    return {
      name,
      rank: 'Joker',
      suit: 'N/A',
      suitSymbol: '🃏',
      rankIndex: -1,
      suitIndex: -1,
      code: name.replace(' ', ''),
      index0: i,
      index1: i + 1,
    };
  }

  const rankIndex = i % 13;                     // 0..12
  const suitIndex = Math.floor(i / 13);         // 0..3

  // Choose your preferred rank order. This is the common Ace-low layout:
  const ranks = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];

  // Suits order is subjective; this is hearts, diamonds, clubs, spades
  const suitNames   = ['hearts','diamonds','spades', 'clubs'];
  const suitSymbols = ['♥','♦','♣','♠'];

  const rank = ranks[rankIndex];
  const suitName = suitNames[suitIndex];
  const suit = useSymbols ? suitSymbols[suitIndex] : suitName;

  const name = useSymbols ? `${rank}${suit}` : `${rank} of ${suit}`;

  if (!returnStructured) return name;

  return {
    name,                 // "Ace of hearts" or "A♥" style if you adapt
    rank,                 // "Ace" | "2" | ... | "King"
    suit: suitName,       // "hearts" | "diamonds" | "clubs" | "spades"
    suitSymbol: suitSymbols[suitIndex],
    rankIndex,            // 0..12
    suitIndex,            // 0..3
    code: `${rank}-${suitName}`, // handy stable id
    index0: i,            // 0..51
    index1: i + 1,        // 1..52
  };
};

export const drawCard = () => {
    return Math.floor(Math.random() * 54) + 1;
}