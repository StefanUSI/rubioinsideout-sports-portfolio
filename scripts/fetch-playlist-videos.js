import ytpl from 'ytpl';

const playlists = [
  { sport: 'Highlining', id: 'PLjZeh-au1Gz5xYqfb1YUrAmMlfPApKyHI' },
  { sport: 'Freediving', id: 'PLjZeh-au1Gz5r_eFy6coB4Y4zlEHqx6GF' },
  { sport: 'Snowboarding', id: 'PLjZeh-au1Gz47jO0C91T34VlilqSOk73t' },
  { sport: 'Ice Skating', id: 'PLjZeh-au1Gz5-6HIyDDEzus3hZcHUYXau' },
  { sport: 'Skiing', id: 'PLjZeh-au1Gz4Folr0JCU-ziWoO-uquKP8' },
  { sport: 'Mountaineering', id: 'PLjZeh-au1Gz4OladSB752DzCJu38CXRMs' },
  { sport: 'Pumpfoiling', id: 'PLjZeh-au1Gz4rENRli-B8RY5Gk_-9ywBn' },
  { sport: 'Weightlifting', id: 'PLjZeh-au1Gz7cp5ninOHHfsqTSjgORnDU' },
  { sport: 'Calisthenics', id: 'PLjZeh-au1Gz5o1WSt7HpQGN0lpXraT8C8' },
  { sport: 'Surfskating', id: 'PLjZeh-au1Gz5ccca6_ZB8LwnDtJkhqM-U' },
  { sport: 'Flowarts', id: 'PLjZeh-au1Gz7f1nOdS2vvrnxiJeMBEh6p' },
  { sport: 'Inline Skating', id: 'PLjZeh-au1Gz5LqZfLcDC_i_vsGFTq2mnX' },
];

(async () => {
  for (const p of playlists) {
    const pl = await ytpl(p.id, { flat: true });
    console.log(`\n== ${p.sport} (${pl.items.length} videos) ==`);
    pl.items.forEach((item, i) => {
      console.log(`${i + 1}. ${item.id} | ${item.title}`);
    });
  }
})();
