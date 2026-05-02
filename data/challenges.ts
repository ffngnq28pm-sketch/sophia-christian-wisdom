export type ChallengeCategory = 'prière' | 'service' | 'parole' | 'silence' | 'lectio';

export interface Challenge {
  id: number;
  text: string;
  category: ChallengeCategory;
  emoji: string;
}

export const CHALLENGES: Challenge[] = [
  // Prière (25)
  { id: 1,  category: 'prière',  emoji: '🙏', text: 'Récitez le Notre Père lentement, mot à mot, en savourant chaque phrase.' },
  { id: 2,  category: 'prière',  emoji: '📿', text: 'Égrenez une dizaine du chapelet en méditant sur un mystère joyeux.' },
  { id: 3,  category: 'prière',  emoji: '✝️', text: 'Faites le signe de croix en conscience, en vous souvenant de votre baptême.' },
  { id: 4,  category: 'prière',  emoji: '🕯️', text: 'Allumez une bougie et priez cinq minutes en silence devant elle.' },
  { id: 5,  category: 'prière',  emoji: '🌅', text: 'Offrez votre journée à Dieu dès le réveil, avant de consulter votre téléphone.' },
  { id: 6,  category: 'prière',  emoji: '🙏', text: 'Dites merci à Dieu pour trois dons reçus aujourd\'hui, aussi petits soient-ils.' },
  { id: 7,  category: 'prière',  emoji: '🌙', text: 'Avant de dormir, examinez votre conscience en dix minutes de silence.' },
  { id: 8,  category: 'prière',  emoji: '✝️', text: 'Priez pour une personne qui vous a blessé, avec sincérité.' },
  { id: 9,  category: 'prière',  emoji: '📿', text: 'Récitez le Psaume 23 ("Le Seigneur est mon berger") à voix haute.' },
  { id: 10, category: 'prière',  emoji: '🕯️', text: 'Restez immobile cinq minutes, les mains ouvertes, en demandant la paix.' },
  { id: 11, category: 'prière',  emoji: '🙏', text: 'Dites une prière spontanée avec vos propres mots, sans formule apprise.' },
  { id: 12, category: 'prière',  emoji: '🌅', text: 'Chantez un cantique ou un psaume, même seul chez vous.' },
  { id: 13, category: 'prière',  emoji: '✝️', text: 'Méditez cinq minutes sur la phrase : "Que ta volonté soit faite."' },
  { id: 14, category: 'prière',  emoji: '📿', text: 'Priez pour votre famille, chaque membre, nommément.' },
  { id: 15, category: 'prière',  emoji: '🙏', text: 'Récitez un acte de contrition avec sincérité, même hors confession.' },
  { id: 16, category: 'prière',  emoji: '🕯️', text: 'Accédez à une église ou chapelle pour cinq minutes d\'adoration en silence.' },
  { id: 17, category: 'prière',  emoji: '🌙', text: 'Avant chaque repas aujourd\'hui, bénissez la table avec gratitude.' },
  { id: 18, category: 'prière',  emoji: '✝️', text: 'Confiez à Dieu votre plus grande inquiétude du moment, et laissez-la partir.' },
  { id: 19, category: 'prière',  emoji: '🙏', text: 'Priez pour vos défunts bien-aimés en communion avec les saints.' },
  { id: 20, category: 'prière',  emoji: '📿', text: 'Égrenez la prière de Jésus : "Seigneur Jésus-Christ, aie pitié de moi" — 10 fois.' },
  { id: 21, category: 'prière',  emoji: '🌅', text: 'Consacrez les premières dix minutes de votre journée à la prière, avant toute activité.' },
  { id: 22, category: 'prière',  emoji: '🕯️', text: 'Demandez à l\'Esprit Saint de guider vos pensées et vos paroles aujourd\'hui.' },
  { id: 23, category: 'prière',  emoji: '🙏', text: 'Dites une prière de demande, confiant que Dieu écoute et répond.' },
  { id: 24, category: 'prière',  emoji: '✝️', text: 'Méditez les Béatitudes et choisissez-en une à vivre concrètement.' },
  { id: 25, category: 'prière',  emoji: '📿', text: 'Terminez votre journée par le Magnificat ou un psaume de louange.' },

  // Service (20)
  { id: 26, category: 'service', emoji: '🤝', text: 'Rendez service à quelqu\'un sans qu\'on vous le demande, et sans le dire à personne.' },
  { id: 27, category: 'service', emoji: '💌', text: 'Écrivez un message de gratitude sincère à quelqu\'un qui compte pour vous.' },
  { id: 28, category: 'service', emoji: '🍞', text: 'Partagez un repas, un café, ou simplement votre temps avec quelqu\'un de seul.' },
  { id: 29, category: 'service', emoji: '🤲', text: 'Donnez à une cause caritative, même symboliquement, avec amour et non par obligation.' },
  { id: 30, category: 'service', emoji: '🤝', text: 'Aidez un voisin, un collègue ou un inconnu sans attendre de remerciement.' },
  { id: 31, category: 'service', emoji: '💌', text: 'Appelez un parent ou un ami âgé pour prendre de ses nouvelles, sincèrement.' },
  { id: 32, category: 'service', emoji: '🍞', text: 'Offrez votre aide à quelqu\'un en difficulté que vous avez remarqué récemment.' },
  { id: 33, category: 'service', emoji: '🤲', text: 'Bénévolat : consacrez une heure à une association de votre quartier.' },
  { id: 34, category: 'service', emoji: '🤝', text: 'Souriez sincèrement à chaque personne que vous croisez aujourd\'hui.' },
  { id: 35, category: 'service', emoji: '💌', text: 'Pardonnez quelqu\'un qui vous a offensé — en secret, dans votre cœur.' },
  { id: 36, category: 'service', emoji: '🍞', text: 'Écoutez vraiment quelqu\'un aujourd\'hui, sans l\'interrompre ni consulter votre téléphone.' },
  { id: 37, category: 'service', emoji: '🤲', text: 'Montrez une patience exceptionnelle dans une situation qui vous agace normalement.' },
  { id: 38, category: 'service', emoji: '🤝', text: 'Faites une bonne action anonyme, sans que la personne sache que c\'est vous.' },
  { id: 39, category: 'service', emoji: '💌', text: 'Dites "je t\'aime" ou "je vous aime" à quelqu\'un qui l\'entend rarement.' },
  { id: 40, category: 'service', emoji: '🍞', text: 'Déposez de la nourriture ou des vêtements dans un lieu de collecte solidaire.' },
  { id: 41, category: 'service', emoji: '🤲', text: 'Priez spécifiquement pour un proche malade ou en difficulté, en lui disant que vous priez pour lui.' },
  { id: 42, category: 'service', emoji: '🤝', text: 'Réconciliez-vous avec quelqu\'un avec qui vous avez un froid, même par un simple message.' },
  { id: 43, category: 'service', emoji: '💌', text: 'Visitez ou appelez quelqu\'un d\'isolé — un malade, une personne âgée.' },
  { id: 44, category: 'service', emoji: '🍞', text: 'Cuisinez ou achetez quelque chose et offrez-le à quelqu\'un dans le besoin.' },
  { id: 45, category: 'service', emoji: '🤲', text: 'Défendez quelqu\'un qu\'on traite injustement ou qu\'on n\'écoute pas.' },

  // Parole (20)
  { id: 46, category: 'parole',  emoji: '📖', text: 'Lisez à voix haute l\'Évangile du jour et réfléchissez à ce qu\'il dit pour vous.' },
  { id: 47, category: 'parole',  emoji: '✍️', text: 'Écrivez dans un journal une phrase de l\'Écriture qui vous touche et pourquoi.' },
  { id: 48, category: 'parole',  emoji: '📖', text: 'Mémorisez un verset biblique pour qu\'il devienne une ancre dans votre journée.' },
  { id: 49, category: 'parole',  emoji: '✍️', text: 'Partagez une sagesse spirituelle avec quelqu\'un qui en a besoin, sans imposer.' },
  { id: 50, category: 'parole',  emoji: '📖', text: 'Relisez les Béatitudes (Matthieu 5:3-12) et restez cinq minutes sur une seule.' },
  { id: 51, category: 'parole',  emoji: '✍️', text: 'Écrivez une prière personnelle — une lettre à Dieu sur ce que vous vivez.' },
  { id: 52, category: 'parole',  emoji: '📖', text: 'Lisez le Cantique des cantiques 1-2 comme méditation sur l\'amour de Dieu.' },
  { id: 53, category: 'parole',  emoji: '✍️', text: 'Notez trois moments où vous avez senti la présence de Dieu cette semaine.' },
  { id: 54, category: 'parole',  emoji: '📖', text: 'Lisez la parabole de l\'enfant prodigue (Luc 15:11-32) et identifiez-vous à un personnage.' },
  { id: 55, category: 'parole',  emoji: '✍️', text: 'Rédigez une liste de tout ce dont vous êtes reconnaissant envers Dieu et les hommes.' },
  { id: 56, category: 'parole',  emoji: '📖', text: 'Méditez 1 Corinthiens 13 ("L\'amour est patient") et évaluez honnêtement votre amour.' },
  { id: 57, category: 'parole',  emoji: '✍️', text: 'Écrivez ce que vous demanderiez à Dieu si vous saviez qu\'il répond toujours.' },
  { id: 58, category: 'parole',  emoji: '📖', text: 'Lisez les Laudes (prière du matin) dans la Liturgie des Heures.' },
  { id: 59, category: 'parole',  emoji: '✍️', text: 'Notez une parole de l\'Écriture qui vous dérange — et méditez pourquoi.' },
  { id: 60, category: 'parole',  emoji: '📖', text: 'Lisez Jean 1:1-14 sur le Verbe fait chair, lentement, trois fois de suite.' },
  { id: 61, category: 'parole',  emoji: '✍️', text: 'Écrivez une lettre à vous-même dans 5 ans, guidée par vos valeurs chrétiennes.' },
  { id: 62, category: 'parole',  emoji: '📖', text: 'Lisez le Psaume 139 ("Tu me sondes et tu me connais") et restez dans ce regard de Dieu.' },
  { id: 63, category: 'parole',  emoji: '✍️', text: 'Rédigez cinq choses concrètes que vous pouvez faire pour aimer davantage.' },
  { id: 64, category: 'parole',  emoji: '📖', text: 'Méditez l\'hymne de saint Paul aux Philippiens (4:4-9) : "Réjouissez-vous toujours."' },
  { id: 65, category: 'parole',  emoji: '✍️', text: 'Écrivez ce que le mot "grâce" signifie concrètement dans votre vie aujourd\'hui.' },

  // Silence (20)
  { id: 66, category: 'silence', emoji: '🌿', text: 'Passez dix minutes dans la nature sans écran, à écouter le monde créé.' },
  { id: 67, category: 'silence', emoji: '🧘', text: 'Pratiquez cinq minutes de silence intérieur, en répétant doucement "Dieu est là."' },
  { id: 68, category: 'silence', emoji: '🌿', text: 'Éteignez tous vos écrans pendant une heure et vivez le silence comme espace de Dieu.' },
  { id: 69, category: 'silence', emoji: '🧘', text: 'Faites une promenade contemplative : regardez, écoutez, soyez présent sans but.' },
  { id: 70, category: 'silence', emoji: '🌿', text: 'Restez immobile cinq minutes, les yeux fermés, dans la conscience de la présence divine.' },
  { id: 71, category: 'silence', emoji: '🧘', text: 'Pratiquez la lectio divina : lisez un texte sacré, méditez, priez, contemplez.' },
  { id: 72, category: 'silence', emoji: '🌿', text: 'Observez un coucher ou lever de soleil comme signe de la fidélité de Dieu.' },
  { id: 73, category: 'silence', emoji: '🧘', text: 'Jeûnez d\'un repas et consacrez le temps habituel du repas à la prière.' },
  { id: 74, category: 'silence', emoji: '🌿', text: 'Dessinez ou créez quelque chose à l\'honneur du beau que Dieu a mis dans le monde.' },
  { id: 75, category: 'silence', emoji: '🧘', text: 'Pratiquez la "présence de Dieu" à la manière de frère Lawrence : faites vos tâches en Sa présence.' },
  { id: 76, category: 'silence', emoji: '🌿', text: 'Contemplez une image sacrée (icône, tableau religieux) pendant dix minutes, sans paroles.' },
  { id: 77, category: 'silence', emoji: '🧘', text: 'Restez assis sans rien faire dix minutes — laissez venir ce qui vient, sans fuir.' },
  { id: 78, category: 'silence', emoji: '🌿', text: 'Marchez lentement en portant attention à chaque pas, en action de grâces.' },
  { id: 79, category: 'silence', emoji: '🧘', text: 'Respirez profondément dix fois en vous rappelant que Dieu a soufflé la vie en vous.' },
  { id: 80, category: 'silence', emoji: '🌿', text: 'Passez la soirée sans musique ni bruit de fond — dans la paix du silence.' },
  { id: 81, category: 'silence', emoji: '🧘', text: 'Commencez votre journée par dix minutes de silence total, avant toute parole.' },
  { id: 82, category: 'silence', emoji: '🌿', text: 'Regardez le ciel étoilé et méditez l\'immensité de Dieu qui vous connaît par votre nom.' },
  { id: 83, category: 'silence', emoji: '🧘', text: 'Pratiquez le jeûne des paroles : parlez moins aujourd\'hui, choisissez vos mots.' },
  { id: 84, category: 'silence', emoji: '🌿', text: 'Allumez une bougie, éteignez la lumière, et restez dans ce silence lumineux cinq minutes.' },
  { id: 85, category: 'silence', emoji: '🧘', text: 'Méditez la phrase de Pascal : "Tout le malheur des hommes vient d\'une seule chose, qui est de ne pas savoir demeurer en repos dans une chambre."' },

  // Lectio (15)
  { id: 86,  category: 'lectio', emoji: '📚', text: 'Lisez un chapitre des Confessions de saint Augustin et notez ce qui vous touche.' },
  { id: 87,  category: 'lectio', emoji: '📖', text: 'Lisez la Petite Voie de Thérèse de Lisieux et voyez comment l\'appliquer aujourd\'hui.' },
  { id: 88,  category: 'lectio', emoji: '📚', text: 'Méditez le Cantique des créatures de François d\'Assise comme louange personnelle.' },
  { id: 89,  category: 'lectio', emoji: '📖', text: 'Lisez un passage de l\'Imitation de Jésus-Christ (Thomas à Kempis) lentement.' },
  { id: 90,  category: 'lectio', emoji: '📚', text: 'Méditez un extrait des Pensées de Pascal sur la misère et la grandeur de l\'homme.' },
  { id: 91,  category: 'lectio', emoji: '📖', text: 'Lisez un témoignage de saint ou sainte qui a traversé une épreuve similaire à la vôtre.' },
  { id: 92,  category: 'lectio', emoji: '📚', text: 'Méditez le Sermon sur la Montagne (Matthieu 5-7) comme programme de vie.' },
  { id: 93,  category: 'lectio', emoji: '📖', text: 'Lisez la Lettre aux Éphésiens (chapitre 3) sur la plénitude de l\'amour de Dieu.' },
  { id: 94,  category: 'lectio', emoji: '📚', text: 'Méditez un psaume de lamentation (Psaume 22 ou 88) : priez à travers votre propre détresse.' },
  { id: 95,  category: 'lectio', emoji: '📖', text: 'Lisez la biographie d\'un saint de votre choix et cherchez ce qui vous inspire.' },
  { id: 96,  category: 'lectio', emoji: '📚', text: 'Méditez Romains 8:28-39 sur l\'indestructible amour de Dieu.' },
  { id: 97,  category: 'lectio', emoji: '📖', text: 'Lisez un extrait de la Nuit obscure de Jean de la Croix et accueillez vos propres ténèbres.' },
  { id: 98,  category: 'lectio', emoji: '📚', text: 'Méditez Isaïe 43:1-4 ("Je t\'ai appelé par ton nom, tu es à moi") comme parole personnelle.' },
  { id: 99,  category: 'lectio', emoji: '📖', text: 'Lisez la Règle de saint Benoît (chapitres 4-7 sur l\'humilité) et évaluez votre cœur.' },
  { id: 100, category: 'lectio', emoji: '📚', text: 'Méditez l\'hymne eucharistique de Thomas d\'Aquin (Adoro Te Devote) comme contemplation.' },
];

export function getTodayChallenge(): Challenge {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return CHALLENGES[dayOfYear % CHALLENGES.length];
}
