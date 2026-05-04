export interface ChurchFather {
  id: string;
  name: string;
  latinName: string;
  years: string;
  origin: string;
  field: string;
  portrait: string;
  description: string;
  legacy: string;
  famousQuote: string;
  works: string[];
  color: string;
}

export const CHURCH_FATHERS: ChurchFather[] = [
  {
    id: 'augustin',
    name: 'Saint Augustin',
    latinName: 'Aurelius Augustinus Hipponensis',
    years: '354 — 430',
    origin: 'Thagaste (Algérie actuelle)',
    field: 'Théologie · Philosophie · Mystique',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjOEI0NTEzIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Évêque d\'Hippone et Docteur de l\'Église, Augustin est l\'un des plus grands théologiens de l\'histoire chrétienne. Après une jeunesse tumultueuse, sa conversion en 386 et le baptême reçu de saint Ambroise marquèrent un tournant. Ses Confessions, premier grand autobiographie de l\'histoire, révèlent une âme en quête de Dieu au travers de toutes les errances humaines.',
    legacy: 'Fondateur de la théologie occidentale. Sa pensée sur la grâce, le péché originel, la Trinité et la Cité de Dieu a façonné tout le christianisme latin pendant quinze siècles.',
    famousQuote: 'Notre cœur est sans repos jusqu\'à ce qu\'il repose en Toi.',
    works: ['Les Confessions', 'La Cité de Dieu', 'La Trinité', 'Sermon 169'],
    color: '#8B4513',
  },
  {
    id: 'thomas',
    name: 'Thomas d\'Aquin',
    latinName: 'Thomas Aquinas',
    years: '1225 — 1274',
    origin: 'Aquino (Italie)',
    field: 'Philosophie scolastique · Théologie systématique',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjNEE2RkE1IiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Dominicain et Docteur de l\'Église, Thomas d\'Aquin synthétise la philosophie d\'Aristote avec la foi chrétienne. Son œuvre monumentale, la Somme Théologique, reste la référence de la théologie catholique. Appelé "le Bœuf muet de Cologne" par ses condisciples, il est l\'intelligence la plus systématique du Moyen Âge.',
    legacy: 'A réconcilié foi et raison pour toujours. Sa méthode de la "quaestio disputata" — poser une question, examiner les objections, répondre — reste un modèle de pensée rigoureuse.',
    famousQuote: 'L\'amour est la vie de l\'âme, comme l\'âme est la vie du corps.',
    works: ['Somme Théologique', 'Contre les Gentils', 'Commentaire de Jean', 'Adoro te devote (hymne)'],
    color: '#4A6FA5',
  },
  {
    id: 'jean-de-la-croix',
    name: 'Jean de la Croix',
    latinName: 'Joannes a Cruce',
    years: '1542 — 1591',
    origin: 'Fontiveros (Espagne)',
    field: 'Mystique · Poésie · Contemplation',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjMkM1RjhBIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Carme et Docteur de l\'Église, Jean de la Croix est le plus grand mystique de la littérature espagnole. Cofondateur avec Thérèse d\'Avila de la réforme carmélite, il fut emprisonné neuf mois par ses propres frères carmes opposés à la réforme. Dans la nuit de sa prison à Tolède, il composa ses plus beaux poèmes. Sa "Nuit obscure de l\'âme" décrit le chemin purificateur vers l\'union divine.',
    legacy: 'Cartographe de l\'âme mystique. Sa description de la "nuit obscure" — la désolation spirituelle comme chemin vers Dieu — reste un guide inégalé pour qui traverse les ténèbres intérieures.',
    famousQuote: 'Au soir de la vie, c\'est sur l\'amour que tu seras jugé.',
    works: ['La Montée du Carmel', 'La Nuit obscure', 'Le Cantique spirituel', 'La Vive Flamme d\'amour'],
    color: '#2C5F8A',
  },
  {
    id: 'therese-avila',
    name: 'Thérèse d\'Avila',
    latinName: 'Teresia Avilensis',
    years: '1515 — 1582',
    origin: 'Ávila (Espagne)',
    field: 'Mystique · Réforme monastique · Théologie spirituelle',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjOEI0QTZGIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Première femme Docteur de l\'Église, Thérèse d\'Avila réforme l\'ordre des Carmes avec une énergie et une lucidité remarquables. Ses visions mystiques et ses extases coexistent avec une personnalité pragmatique, spirituelle et profondément humaine. Elle décrit l\'itinéraire de l\'âme vers Dieu comme un château aux sept demeures concentriques.',
    legacy: 'A transformé la mystique chrétienne en science de l\'âme accessible. Sa formule "Dieu seul suffit" (Nada te turbe) résume une sagesse spirituelle intemporelle.',
    famousQuote: 'Que rien ne te trouble, que rien ne t\'effraie. Dieu seul suffit.',
    works: ['Le Château intérieur', 'Le Chemin de la perfection', 'Le Livre de la vie', 'Les Fondations'],
    color: '#8B4A6F',
  },
  {
    id: 'therese-lisieux',
    name: 'Thérèse de Lisieux',
    latinName: 'Teresia Lexoviensis',
    years: '1873 — 1897',
    origin: 'Alençon (France)',
    field: 'Mystique · Spiritualité de l\'enfance · Carmel',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjQTU2NjRBIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Carmélite morte à 24 ans de tuberculose, Thérèse Martin est l\'une des figures spirituelles les plus influentes du XXe siècle. Sa "Petite Voie" — devenir saint non par des actes héroïques mais par l\'amour dans le quotidien — a touché des millions de personnes. "Histoire d\'une âme", son autobiographie publiée après sa mort, est l\'un des livres chrétiens les plus lus au monde.',
    legacy: 'A démocratisé la sainteté. Sa voie simple, accessible à tous, dépasse le mysticisme élitiste pour proposer la sainteté ordinaire : faire chaque chose avec amour.',
    famousQuote: 'Ma vocation, c\'est l\'Amour !',
    works: ['Histoire d\'une âme', 'Poésies', 'Lettres', 'Derniers entretiens'],
    color: '#A5664A',
  },
  {
    id: 'francois',
    name: 'François d\'Assise',
    latinName: 'Franciscus Assisiensis',
    years: '1181 — 1226',
    origin: 'Assise (Italie)',
    field: 'Fraternité · Pauvreté évangélique · Création',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjNEE4QTVBIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Fils d\'un riche marchand, Francesco Bernardone renonce à tout pour vivre l\'Évangile dans une pauvreté radicale. Sa joie contagieuse, son amour de la nature et sa fraternité universelle — avec les hommes, les animaux, la lune et le feu — ont renouvelé la spiritualité chrétienne. Recevant les stigmates du Christ, il est le premier saint à porter les plaies de la Passion.',
    legacy: 'A rappelé à l\'Église que l\'Évangile se vit dans la pauvreté joyeuse, le service des pauvres et le respect de la création. Sa fraternité universelle reste un modèle écologique et spirituel.',
    famousQuote: 'Pax et bonum — Paix et Bien.',
    works: ['Cantique des créatures', 'Règle de vie', 'Testament', 'Prière pour la paix'],
    color: '#4A8A5A',
  },
  {
    id: 'pascal',
    name: 'Blaise Pascal',
    latinName: 'Blasius Pascal',
    years: '1623 — 1662',
    origin: 'Clermont-Ferrand (France)',
    field: 'Philosophie · Mathématiques · Apologétique',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjNkE1QTlBIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Génie précoce — à 12 ans il redécouvre seul les propositions d\'Euclide — Pascal est à la fois mathématicien, physicien et philosophe. Sa nuit de feu (23 novembre 1654), expérience mystique intense, le convertit définitivement. Ses Pensées, aphorismes inachevés en vue d\'une apologétique, restent l\'une des œuvres les plus profondes de la philosophie française.',
    legacy: 'A posé la question de Dieu en termes existentiels : "Le pari de Pascal" confronte l\'incroyant à l\'enjeu infini de sa décision. Sa phrase "le cœur a ses raisons que la raison ne connaît point" reste une des plus citées au monde.',
    famousQuote: 'Le cœur a ses raisons que la raison ne connaît point.',
    works: ['Les Pensées', 'Les Provinciales', 'Mémorial (nuit de feu)', 'Prière pour le bon usage des maladies'],
    color: '#6A5A9A',
  },
  {
    id: 'eckhart',
    name: 'Meister Eckhart',
    latinName: 'Eckhart von Hochheim',
    years: '1260 — 1328',
    origin: 'Thuringe (Allemagne)',
    field: 'Mystique rhénane · Théologie spéculative',
    portrait: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBkMmMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZDFhNGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmaWxsPSIjNUE3QThBIiBvcGFjaXR5PSIwLjc1Ij4mI3gyNzFEOzwvdGV4dD48L3N2Zz4=',
    description: 'Dominicain et maître en théologie, Eckhart est le père de la mystique rhénane. Ses sermons en allemand — il fut l\'un des premiers à prêcher dans la langue du peuple — explorent l\'union de l\'âme avec Dieu dans le "fond de l\'âme" (Seelgrund). Sa pensée audacieuse, frôlant parfois le paradoxe, lui vaut une condamnation posthume partielle par le pape.',
    legacy: 'A fondé une tradition mystique qui influencera Tauler, Suso, Nicolas de Cuse et toute la mystique rhénane. Son langage audacieux sur l\'union à Dieu reste une source vive pour la spiritualité contemporaine.',
    famousQuote: 'L\'œil par lequel je vois Dieu est le même œil par lequel Dieu me voit.',
    works: ['Sermons allemands', 'Traités', 'Opus tripartitum', 'Livre de la consolation divine'],
    color: '#5A7A8A',
  },
];
