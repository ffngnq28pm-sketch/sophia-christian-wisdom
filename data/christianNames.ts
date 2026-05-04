export interface ChristianName {
  name: string;
  latin: string;
  origin: string;
  gender: 'M' | 'F' | 'MF';
  meaning: string;
  patron?: string;
  feast?: string;
  virtue?: string;
}

export const CHRISTIAN_NAMES: ChristianName[] = [
  // Masculins
  { name: 'Gabriel',    latin: 'Gabriël',    origin: 'Hébreu',  gender: 'M', meaning: 'Force de Dieu — archange annonciateur, messager de l\'Annonciation', patron: 'Saint Gabriel Archange', feast: '29 septembre', virtue: 'Foi' },
  { name: 'Paul',       latin: 'Paulus',      origin: 'Latin',   gender: 'M', meaning: 'Petit, humble — l\'Apôtre des nations, évangélisateur du monde gréco-romain', patron: 'Saint Paul, apôtre converti sur le chemin de Damas', feast: '29 juin', virtue: 'Charité' },
  { name: 'Pierre',     latin: 'Petrus',      origin: 'Grec',    gender: 'M', meaning: 'La Pierre, le roc — premier pape, prince des Apôtres, fondement de l\'Église', patron: 'Saint Pierre Apôtre, premier pape de l\'Église catholique', feast: '29 juin', virtue: 'Foi' },
  { name: 'Joseph',     latin: 'Iosephus',    origin: 'Hébreu',  gender: 'M', meaning: 'Que Dieu ajoute — époux de Marie, père nourricier de Jésus, gardien de la Sainte Famille', patron: 'Saint Joseph, patron des travailleurs et de l\'Église universelle', feast: '19 mars', virtue: 'Humilité' },
  { name: 'Jean',       latin: 'Ioannes',     origin: 'Hébreu',  gender: 'M', meaning: 'Dieu fait grâce — le disciple bien-aimé du Christ, apôtre et évangéliste', patron: 'Saint Jean l\'Évangéliste', feast: '27 décembre', virtue: 'Amour' },
  { name: 'Antoine',    latin: 'Antonius',    origin: 'Latin',   gender: 'M', meaning: 'De la famille Antonia, inestimable — patron du Portugal, docteur de l\'Évangile', patron: 'Saint Antoine de Padoue, thaumaturge franciscain', feast: '13 juin', virtue: 'Douceur' },
  { name: 'François',   latin: 'Franciscus',  origin: 'Latin',   gender: 'M', meaning: 'Français, libre — le Poverello, messager de paix et de fraternité universelle', patron: 'Saint François d\'Assise, patron de l\'Italie et de l\'écologie', feast: '4 octobre', virtue: 'Pauvreté évangélique' },
  { name: 'Louis',      latin: 'Ludovicus',   origin: 'Germain', gender: 'M', meaning: 'Guerrier illustre — roi de France canonisé, modèle de la sainteté royale', patron: 'Saint Louis IX, roi de France', feast: '25 août', virtue: 'Justice' },
  { name: 'Michel',     latin: 'Michael',     origin: 'Hébreu',  gender: 'M', meaning: 'Qui est comme Dieu ? — archange protecteur, vainqueur du dragon', patron: 'Saint Michel Archange, chef des armées célestes', feast: '29 septembre', virtue: 'Force' },
  { name: 'Philippe',   latin: 'Philippus',   origin: 'Grec',    gender: 'M', meaning: 'Ami des chevaux — apôtre appelé directement par Jésus', patron: 'Saint Philippe Apôtre', feast: '3 mai', virtue: 'Zèle apostolique' },
  { name: 'André',      latin: 'Andreas',     origin: 'Grec',    gender: 'M', meaning: 'Viril, courageux — premier apôtre appelé, patron de l\'Écosse et de la Russie', patron: 'Saint André Apôtre, frère de Simon-Pierre', feast: '30 novembre', virtue: 'Courage' },
  { name: 'Thomas',     latin: 'Thomas',      origin: 'Araméen', gender: 'M', meaning: 'Jumeau — apôtre du doute transformé en foi fervente', patron: 'Saint Thomas Apôtre, patron des architectes', feast: '3 juillet', virtue: 'Foi raisonnée' },
  { name: 'Marc',       latin: 'Marcus',      origin: 'Latin',   gender: 'M', meaning: 'Consacré à Mars — évangéliste, disciple de Pierre, fondateur de l\'Église d\'Alexandrie', patron: 'Saint Marc Évangéliste, patron de Venise', feast: '25 avril', virtue: 'Ferveur' },
  { name: 'Luc',        latin: 'Lucas',       origin: 'Latin',   gender: 'M', meaning: 'Lumière, lumineux — médecin et évangéliste, auteur de l\'Évangile et des Actes', patron: 'Saint Luc Évangéliste, patron des médecins et des peintres', feast: '18 octobre', virtue: 'Compassion' },
  { name: 'Matthieu',   latin: 'Matthaeus',   origin: 'Hébreu',  gender: 'M', meaning: 'Don de Dieu — publicain devenu apôtre, auteur du premier Évangile', patron: 'Saint Matthieu Évangéliste, patron des comptables', feast: '21 septembre', virtue: 'Miséricorde' },
  { name: 'Étienne',    latin: 'Stephanus',   origin: 'Grec',    gender: 'M', meaning: 'Couronne — premier martyr chrétien, lapidé pour sa foi ardente', patron: 'Saint Étienne, protomartyr', feast: '26 décembre', virtue: 'Pardon' },
  { name: 'Laurent',    latin: 'Laurentius',  origin: 'Latin',   gender: 'M', meaning: 'Couronné de lauriers — martyr diacre, grillé sur le gril, patron des cuisiniers', patron: 'Saint Laurent de Rome, martyr', feast: '10 août', virtue: 'Générosité' },
  { name: 'Sébastien',  latin: 'Sebastianus', origin: 'Grec',    gender: 'M', meaning: 'Vénérable, Auguste — martyr romain, patron des soldats et des sportifs', patron: 'Saint Sébastien, martyr romain', feast: '20 janvier', virtue: 'Endurance' },
  { name: 'Nicolas',    latin: 'Nicolaus',    origin: 'Grec',    gender: 'M', meaning: 'Victoire du peuple — évêque de Myre, patron des enfants et des marins', patron: 'Saint Nicolas de Myre, évêque thaumaturge', feast: '6 décembre', virtue: 'Générosité' },
  { name: 'Clément',    latin: 'Clemens',     origin: 'Latin',   gender: 'M', meaning: 'Doux, clément, miséricordieux — troisième successeur de Pierre sur le siège de Rome', patron: 'Saint Clément I, pape et martyr', feast: '23 novembre', virtue: 'Douceur' },
  { name: 'Victor',     latin: 'Victor',      origin: 'Latin',   gender: 'M', meaning: 'Vainqueur — martyr chrétien, symbole de la victoire de la foi sur la mort', patron: 'Saint Victor de Marseille, martyr', feast: '21 juillet', virtue: 'Persévérance' },
  { name: 'Théodore',   latin: 'Theodorus',   origin: 'Grec',    gender: 'M', meaning: 'Don de Dieu — martyr, soldat qui brûla un temple, confesseur de la foi', patron: 'Saint Théodore Tiron, martyr', feast: '9 novembre', virtue: 'Bravoure' },
  { name: 'Benoît',     latin: 'Benedictus',  origin: 'Latin',   gender: 'M', meaning: 'Béni — fondateur du monachisme occidental, père de l\'Europe chrétienne', patron: 'Saint Benoît de Nursie, patron de l\'Europe', feast: '11 juillet', virtue: 'Stabilité' },
  { name: 'Grégoire',   latin: 'Gregorius',   origin: 'Grec',    gender: 'M', meaning: 'Vigilant, qui veille — grand pape réformateur, organisateur de la liturgie grégorienne', patron: 'Saint Grégoire le Grand, pape et docteur de l\'Église', feast: '3 septembre', virtue: 'Prudence' },
  { name: 'Augustin',   latin: 'Augustinus',  origin: 'Latin',   gender: 'M', meaning: 'Vénérable, majestueux — le plus grand père de l\'Église latine, auteur des Confessions', patron: 'Saint Augustin d\'Hippone, évêque et docteur', feast: '28 août', virtue: 'Sagesse' },
  { name: 'Dominique',  latin: 'Dominicus',   origin: 'Latin',   gender: 'MF', meaning: 'Qui appartient au Seigneur — fondateur des Prêcheurs, apôtre de la Vérité', patron: 'Saint Dominique de Guzmán, fondateur des Dominicains', feast: '8 août', virtue: 'Vérité' },
  { name: 'Ignace',     latin: 'Ignatius',    origin: 'Latin',   gender: 'M', meaning: 'Feu ardent — fondateur de la Compagnie de Jésus, soldat de Dieu', patron: 'Saint Ignace de Loyola, fondateur des Jésuites', feast: '31 juillet', virtue: 'Discernement' },
  { name: 'Xavier',     latin: 'Xaverius',    origin: 'Basque',  gender: 'M', meaning: 'Nouvelle maison — apôtre des Indes et du Japon, co-fondateur des Jésuites', patron: 'Saint François Xavier, patron des missionnaires', feast: '3 décembre', virtue: 'Mission' },
  { name: 'Christophe', latin: 'Christophorus',origin: 'Grec',  gender: 'M', meaning: 'Porteur du Christ — martyr légendaire, protecteur des voyageurs', patron: 'Saint Christophe, patron des voyageurs et conducteurs', feast: '25 juillet', virtue: 'Protection' },
  { name: 'Léon',       latin: 'Leo',         origin: 'Latin',   gender: 'M', meaning: 'Lion, courageux — grand pape qui arrêta Attila, défenseur de Rome', patron: 'Saint Léon le Grand, pape et docteur', feast: '10 novembre', virtue: 'Courage' },
  { name: 'Félix',      latin: 'Felix',        origin: 'Latin',  gender: 'M', meaning: 'Heureux, fortuné, béni — nom de plusieurs martyrs et papes', patron: 'Saint Félix de Valois, co-fondateur des Trinitaires', feast: '20 novembre', virtue: 'Joie' },
  { name: 'Maxime',     latin: 'Maximus',     origin: 'Latin',   gender: 'M', meaning: 'Le plus grand — théologien grec, défenseur de l\'orthodoxie christologique', patron: 'Saint Maxime le Confesseur, théologien', feast: '13 août', virtue: 'Persévérance' },
  { name: 'Alexis',     latin: 'Alexius',     origin: 'Grec',    gender: 'M', meaning: 'Protecteur, défenseur — saint syrien qui vécut dans l\'humilité radicale', patron: 'Saint Alexis, homme de Dieu', feast: '17 juillet', virtue: 'Humilité' },
  { name: 'Jérôme',     latin: 'Hieronymus',  origin: 'Grec',    gender: 'M', meaning: 'Nom sacré — traducteur de la Bible en latin (Vulgate), docteur de l\'Église', patron: 'Saint Jérôme, docteur de l\'Église, patron des traducteurs', feast: '30 septembre', virtue: 'Érudition' },
  { name: 'Bernard',    latin: 'Bernardus',   origin: 'Germain', gender: 'M', meaning: 'Ours fort — moine cistercien, théologien mystique, dernier des Pères de l\'Église', patron: 'Saint Bernard de Clairvaux, docteur miel-fleur', feast: '20 août', virtue: 'Contemplation' },
  { name: 'Bruno',      latin: 'Bruno',       origin: 'Germain', gender: 'M', meaning: 'Brillant, cuirassé — fondateur des Chartreux, maître de saint Anselme', patron: 'Saint Bruno de Cologne, fondateur des Chartreux', feast: '6 octobre', virtue: 'Silence' },
  { name: 'Germain',    latin: 'Germanus',    origin: 'Latin',   gender: 'M', meaning: 'Germain, authentique — évêque de Paris, patron des enfants malades', patron: 'Saint Germain de Paris, évêque et thaumaturge', feast: '28 mai', virtue: 'Charité' },
  { name: 'Hilaire',    latin: 'Hilarius',    origin: 'Latin',   gender: 'M', meaning: 'Joyeux, gai — évêque de Poitiers, défenseur de la foi contre l\'arianisme', patron: 'Saint Hilaire de Poitiers, docteur de l\'Église', feast: '13 janvier', virtue: 'Joie' },
  { name: 'Rémy',       latin: 'Remigius',    origin: 'Latin',   gender: 'M', meaning: 'Rameur, qui rame — évêque de Reims, baptiseur de Clovis, apôtre des Francs', patron: 'Saint Rémy de Reims, apôtre des Francs', feast: '1er octobre', virtue: 'Persévérance' },
  { name: 'Thibault',   latin: 'Theobaldus',  origin: 'Germain', gender: 'M', meaning: 'Peuple audacieux — hermite et pèlerin, modèle de détachement évangélique', patron: 'Saint Thibault de Provins, ermite', feast: '30 juin', virtue: 'Détachement' },
  { name: 'Gilles',     latin: 'Aegidius',    origin: 'Grec',    gender: 'M', meaning: 'Égide, bouclier protecteur — ermite provençal, patron des mendiants et infirmes', patron: 'Saint Gilles l\'Ermite', feast: '1er septembre', virtue: 'Pénitence' },
  { name: 'Barnabé',    latin: 'Barnabas',    origin: 'Araméen', gender: 'M', meaning: 'Fils de consolation — compagnon de Paul, missionnaire en Méditerranée', patron: 'Saint Barnabé Apôtre', feast: '11 juin', virtue: 'Encouragement' },
  { name: 'Renaud',     latin: 'Rainaldus',   origin: 'Germain', gender: 'M', meaning: 'Conseil puissant — croisé saint, architecte de la cathédrale de Cologne', patron: 'Saint Renaud de Cologne', feast: '7 janvier', virtue: 'Sagesse pratique' },
  { name: 'Émile',      latin: 'Aemilius',    origin: 'Latin',   gender: 'M', meaning: 'Rival, zélé — porteur du nom d\'une grande famille romaine', patron: 'Saint Émile, martyr de Carthage', feast: '28 mai', virtue: 'Zèle' },

  // Féminins
  { name: 'Marie',      latin: 'Maria',       origin: 'Hébreu',  gender: 'F', meaning: 'Étoile de la mer ou Bien-aimée de Dieu — la Vierge, Mère de Jésus-Christ', patron: 'Notre-Dame, Reine du Ciel et de la Terre', feast: '8 septembre', virtue: 'Pureté' },
  { name: 'Anne',       latin: 'Anna',        origin: 'Hébreu',  gender: 'F', meaning: 'Grâce, faveur divine — mère de la Vierge Marie, grand-mère du Christ', patron: 'Sainte Anne, mère de Marie', feast: '26 juillet', virtue: 'Douceur' },
  { name: 'Claire',     latin: 'Clara',       origin: 'Latin',   gender: 'F', meaning: 'Claire, lumineuse — fondatrice des Clarisses, miroir de la perfection franciscaine', patron: 'Sainte Claire d\'Assise, patron des téléviseurs', feast: '11 août', virtue: 'Pauvreté' },
  { name: 'Catherine',  latin: 'Catharina',   origin: 'Grec',    gender: 'F', meaning: 'Pure, vierge — martyre d\'Alexandrie, docteur de l\'Église, mystique siennoise', patron: 'Sainte Catherine de Sienne, docteur de l\'Église', feast: '29 avril', virtue: 'Pureté' },
  { name: 'Marguerite', latin: 'Margarita',   origin: 'Grec',    gender: 'F', meaning: 'Perle précieuse — martyre, vierge courageuse face aux persécuteurs', patron: 'Sainte Marguerite d\'Antioche, vierge et martyre', feast: '20 juillet', virtue: 'Bravoure' },
  { name: 'Jeanne',     latin: 'Johanna',     origin: 'Hébreu',  gender: 'F', meaning: 'Dieu fait grâce — Pucelle d\'Orléans, patronne de la France, messagère divine', patron: 'Sainte Jeanne d\'Arc, patronne de la France', feast: '30 mai', virtue: 'Courage' },
  { name: 'Thérèse',    latin: 'Theresia',    origin: 'Grec',    gender: 'F', meaning: 'Chasseresse ou Île de Théra — docteur de la petite voie, rose mystique', patron: 'Sainte Thérèse de Lisieux, docteur de l\'Église', feast: '1er octobre', virtue: 'Confiance' },
  { name: 'Bernadette', latin: 'Bernadetta',  origin: 'Germain', gender: 'F', meaning: 'Ours courageux — voyante de Lourdes, messagère de l\'Immaculée Conception', patron: 'Sainte Bernadette Soubirous', feast: '16 avril', virtue: 'Humilité' },
  { name: 'Sophie',     latin: 'Sophia',      origin: 'Grec',    gender: 'F', meaning: 'Sagesse — vierge martyre, personnification de la sagesse divine', patron: 'Sainte Sophie, vierge et martyre', feast: '25 mai', virtue: 'Sagesse' },
  { name: 'Élisabeth',  latin: 'Elisabeth',   origin: 'Hébreu',  gender: 'F', meaning: 'Dieu est mon serment — cousine de Marie, mère de Jean-Baptiste', patron: 'Sainte Élisabeth de la Visitation', feast: '5 novembre', virtue: 'Foi' },
  { name: 'Madeleine',  latin: 'Magdalena',   origin: 'Hébreu',  gender: 'F', meaning: 'De Magdala — pécheresse convertie, première à voir le Christ ressuscité, apôtre des apôtres', patron: 'Sainte Marie-Madeleine, apôtre des apôtres', feast: '22 juillet', virtue: 'Repentir' },
  { name: 'Christine',  latin: 'Christina',   origin: 'Grec',    gender: 'F', meaning: 'Chrétienne, qui appartient au Christ — martyre courageuse du IIIe siècle', patron: 'Sainte Christine, vierge et martyre', feast: '24 juillet', virtue: 'Constance' },
  { name: 'Véronique',  latin: 'Veronica',    origin: 'Latin',   gender: 'F', meaning: 'Image vraie — femme qui essuya le visage du Christ sur le chemin de croix', patron: 'Sainte Véronique', feast: '12 juillet', virtue: 'Compassion' },
  { name: 'Cécile',     latin: 'Caecilia',    origin: 'Latin',   gender: 'F', meaning: 'Aveugle, de la famille Caecilia — martyre musicienne, patronne de la musique', patron: 'Sainte Cécile, patronne des musiciens', feast: '22 novembre', virtue: 'Joie' },
  { name: 'Bénédicte',  latin: 'Benedicta',   origin: 'Latin',   gender: 'F', meaning: 'Bénie — consacrée à Dieu, sœur jumelle de saint Benoît', patron: 'Sainte Scholastique, sœur de saint Benoît', feast: '10 février', virtue: 'Consécration' },
  { name: 'Agnès',      latin: 'Agnes',       origin: 'Latin',   gender: 'F', meaning: 'Pure, chaste comme l\'agneau — martyre de treize ans, patronne des jeunes filles', patron: 'Sainte Agnès de Rome, vierge et martyre', feast: '21 janvier', virtue: 'Chasteté' },
  { name: 'Brigitte',   latin: 'Brigitta',    origin: 'Gaélique',gender: 'F', meaning: 'Force, exaltation — sainte patronne d\'Irlande et d\'Europe, mystique suédoise', patron: 'Sainte Brigitte de Suède, patronne de l\'Europe', feast: '23 juillet', virtue: 'Force' },
  { name: 'Hélène',     latin: 'Helena',      origin: 'Grec',    gender: 'F', meaning: 'Flambeau, lumière — impératrice qui trouva la Vraie Croix en Terre Sainte', patron: 'Sainte Hélène, impératrice, mère de Constantin', feast: '18 août', virtue: 'Piété' },
  { name: 'Ursule',     latin: 'Ursula',      origin: 'Latin',   gender: 'F', meaning: 'Petite ourse — vierge martyre légendaire, patronne des étudiantes', patron: 'Sainte Ursule et ses compagnes', feast: '21 octobre', virtue: 'Courage' },
  { name: 'Rosalie',    latin: 'Rosalia',     origin: 'Latin',   gender: 'F', meaning: 'Rose — ermite sicilienne, patronne de Palerme, protectrice de la peste', patron: 'Sainte Rosalie de Palerme', feast: '4 septembre', virtue: 'Pénitence' },
  { name: 'Gertrude',   latin: 'Gertruda',    origin: 'Germain', gender: 'F', meaning: 'Lance forte — mystique médiévale, sainte des âmes du Purgatoire', patron: 'Sainte Gertrude la Grande, mystique', feast: '16 novembre', virtue: 'Contemplation' },
  { name: 'Monique',    latin: 'Monica',      origin: 'Berbère', gender: 'F', meaning: 'Conseillère, unique — mère de saint Augustin, modèle de persévérance dans la prière', patron: 'Sainte Monique, mère de saint Augustin', feast: '27 août', virtue: 'Persévérance' },
  { name: 'Angélique',  latin: 'Angelica',    origin: 'Grec',    gender: 'F', meaning: 'Messagère de Dieu, angélique — douce comme un ange, céleste de nature', patron: 'Bienheureuse Angélique de Foligno', feast: '13 janvier', virtue: 'Douceur' },
  { name: 'Isabelle',   latin: 'Isabella',    origin: 'Hébreu',  gender: 'F', meaning: 'Dieu est mon serment — princesse de France consacrée à Dieu, sœur de saint Louis', patron: 'Bienheureuse Isabelle de France', feast: '31 août', virtue: 'Consécration' },
  { name: 'Charlotte',  latin: 'Charlotta',   origin: 'Germain', gender: 'F', meaning: 'Femme libre, de caractère — princesse vertueuse, rayonnante de dignité', patron: 'Bienheureuse Charlotte, princesse de Savoie', feast: '17 décembre', virtue: 'Dignité' },
  { name: 'Julie',      latin: 'Julia',       origin: 'Latin',   gender: 'F', meaning: 'De la famille Julia — vierge et martyre carthaginoise, esclave courageuse', patron: 'Sainte Julie de Carthage, vierge et martyre', feast: '22 mai', virtue: 'Courage' },
  { name: 'Pauline',    latin: 'Paulina',     origin: 'Latin',   gender: 'F', meaning: 'Petite et humble — fondatrice brésilienne, première sainte d\'Amérique latine canonisée', patron: 'Sainte Pauline du Cœur Agonisant de Jésus', feast: '9 juillet', virtue: 'Service' },
  { name: 'Virginie',   latin: 'Virginia',    origin: 'Latin',   gender: 'F', meaning: 'Vierge, pure — femme romaine sacrifiée par son père pour préserver son honneur', patron: 'Sainte Virginie — patronne des vierges consacrées', feast: '7 juin', virtue: 'Chasteté' },
  { name: 'Florence',   latin: 'Florentia',   origin: 'Latin',   gender: 'F', meaning: 'Fleurissante, prospère — infirmière pionnière, lumière de la médecine moderne', patron: 'Sainte Florence — patronne des infirmières', feast: '20 décembre', virtue: 'Charité' },
  { name: 'Anastasie',  latin: 'Anastasia',   origin: 'Grec',    gender: 'F', meaning: 'Résurrection — martyre romaine, symbole de la résurrection en Christ', patron: 'Sainte Anastasie, vierge et martyre', feast: '25 décembre', virtue: 'Espérance' },
];

export function findChristianNameMeaning(input: string): ChristianName | null {
  if (!input.trim()) return null;
  const normalized = input.trim().toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
  return (
    CHRISTIAN_NAMES.find((n) => {
      const nNorm = n.name.toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
      return nNorm === normalized;
    }) || null
  );
}
