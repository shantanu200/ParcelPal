export const puneGraph = {
  Hinjawadi: { Wakad: 3, Baner: 5, Aundh: 7 },
  Wakad: { Hinjawadi: 3, Baner: 4, PimpleSaudagar: 6 },
  Baner: { Hinjawadi: 5, Wakad: 4, Aundh: 2, Shivajinagar: 8 },
  Aundh: { Hinjawadi: 7, Baner: 2, Shivajinagar: 6, Deccan: 9, Bavdhan: 12 },
  Deccan: { Aundh: 9, Shivajinagar: 3, Swargate: 6, Kothrud: 11 },
  Shivajinagar: { Baner: 8, Aundh: 6, Deccan: 3, Swargate: 5, Hadapsar: 14, Kharadi: 10 },
  Swargate: { Shivajinagar: 5, Camp: 4, Deccan: 6, Katraj: 15 },
  Camp: { Swargate: 4, KoregaonPark: 6 },
  KoregaonPark: { Camp: 6, VimanNagar: 8 },
  VimanNagar: { KoregaonPark: 8, KalyaniNagar: 7 },
  KalyaniNagar: { VimanNagar: 7, Yerwada: 6 },
  Yerwada: { KalyaniNagar: 6, Kharadi: 9 },
  Kothrud: { Deccan: 11, Katraj: 9, Bavdhan: 7 },
  Katraj: { Swargate: 15, Kothrud: 9 },
  Hadapsar: { Shivajinagar: 14, Kharadi: 4 },
  Kharadi: { Shivajinagar: 10, Yerwada: 9, Hadapsar: 4 },
  Bavdhan: { Aundh: 12, Kothrud: 7 }
};