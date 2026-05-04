import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

// ── Types ──────────────────────────────────────────────────────────────────

interface PsalmEntry {
  id: string;
  number?: number;
  title: string;
  theme: string;
  latin?: string;
  text: string;
}

interface CategoryDef {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  items: PsalmEntry[];
}

// ── Data ───────────────────────────────────────────────────────────────────

const PSALM_CATEGORIES: CategoryDef[] = [
  {
    id: 'psalms',
    title: 'Psaumes',
    subtitle: 'Psaumes de David',
    icon: '📜',
    color: '#4A7FA5',
    items: [
      {
        id: 'ps1',
        number: 1,
        title: 'Psaume 1 — Les Deux Voies',
        theme: 'Sagesse',
        latin: 'Beatus vir',
        text:
          'Heureux l\'homme qui ne suit pas le conseil des impies,\n' +
          'qui ne s\'arrête pas sur le chemin des pécheurs,\n' +
          'qui ne s\'assied pas en compagnie des railleurs,\n' +
          'mais qui trouve sa joie dans la loi du Seigneur\n' +
          'et la médite jour et nuit.\n\n' +
          'Il est comme un arbre planté près d\'un ruisseau,\n' +
          'qui donne du fruit en sa saison\n' +
          'et dont le feuillage ne se flétrit pas.\n' +
          'Tout ce qu\'il fait réussit.',
      },
      {
        id: 'ps22',
        number: 22,
        title: 'Psaume 22 — Cri et Confiance',
        theme: 'Souffrance & Espérance',
        latin: 'Deus, Deus meus',
        text:
          'Mon Dieu, mon Dieu, pourquoi m\'as-tu abandonné ?\n' +
          'Tu es loin de me sauver, loin de mes cris.\n\n' +
          'En toi nos pères avaient confiance ;\n' +
          'ils avaient confiance, et tu les délivrais.\n' +
          'Vers toi ils criaient, et ils étaient sauvés ;\n' +
          'en toi ils espéraient, et ils n\'étaient pas confondus.\n\n' +
          'Car il n\'a pas méprisé ni dédaigné\n' +
          'la misère du pauvre en sa détresse ;\n' +
          'il ne lui a pas caché son visage,\n' +
          'mais il a écouté, quand il criait vers lui.',
      },
      {
        id: 'ps23',
        number: 23,
        title: 'Psaume 23 — Le Bon Pasteur',
        theme: 'Confiance',
        latin: 'Dominus pascit me',
        text:
          'Le Seigneur est mon berger :\n' +
          'je ne manque de rien.\n' +
          'Sur des prés d\'herbe fraîche,\n' +
          'il me fait reposer.\n\n' +
          'Il me mène vers les eaux tranquilles\n' +
          'et me fait revivre ;\n' +
          'il me guide par le juste chemin\n' +
          'pour l\'honneur de son nom.\n\n' +
          'Si je traverse les ravins de la mort,\n' +
          'je ne crains aucun mal,\n' +
          'car tu es avec moi :\n' +
          'ton bâton me guide et me rassure.',
      },
      {
        id: 'ps51',
        number: 51,
        title: 'Psaume 51 — Miserere',
        theme: 'Pénitence',
        latin: 'Miserere mei, Deus',
        text:
          'Pitié pour moi, mon Dieu, dans ton amour,\n' +
          'selon ta grande miséricorde, efface mon péché.\n\n' +
          'Lave-moi tout entier de ma faute,\n' +
          'purifie-moi de mon offense.\n\n' +
          'Crée en moi un cœur pur, ô mon Dieu,\n' +
          'renouvelle et raffermis au fond de moi mon esprit.\n\n' +
          'Ne me chasse pas loin de ta face,\n' +
          'ne me reprends pas ton esprit saint.\n\n' +
          'Rends-moi la joie d\'être sauvé ;\n' +
          'que l\'esprit généreux me soutienne.',
      },
      {
        id: 'ps91',
        number: 91,
        title: 'Psaume 91 — Sous la Protection Divine',
        theme: 'Confiance & Protection',
        latin: 'Qui habitat',
        text:
          'Qui habite sous l\'abri du Très-Haut\n' +
          'et loge à l\'ombre du Tout-Puissant\n' +
          'peut dire au Seigneur : « Mon refuge, ma forteresse,\n' +
          'mon Dieu, en qui je me confie ! »\n\n' +
          'Il est lui qui te libère du filet du chasseur\n' +
          'et de la peste aux paroles mauvaises.\n\n' +
          'Il te couvre de ses ailes,\n' +
          'sous ses plumes tu trouves refuge ;\n' +
          'sa fidélité est bouclier et armure.',
      },
      {
        id: 'ps121',
        number: 121,
        title: 'Psaume 121 — Le Gardien d\'Israël',
        theme: 'Protection',
        latin: 'Levavi oculos',
        text:
          'Je lève les yeux vers les montagnes :\n' +
          'd\'où me viendra le secours ?\n' +
          'Le secours me vient du Seigneur\n' +
          'qui a fait le ciel et la terre.\n\n' +
          'Qu\'il ne laisse pas trébucher ton pied,\n' +
          'qu\'il ne dorme pas, ton gardien !\n\n' +
          'Le Seigneur est ton gardien,\n' +
          'le Seigneur est ton ombre,\n' +
          'il est à ta droite.\n\n' +
          'Le Seigneur te gardera de tout mal,\n' +
          'il gardera ta vie.',
      },
      {
        id: 'ps130',
        number: 130,
        title: 'Psaume 130 — De profundis',
        theme: 'Pénitence & Espérance',
        latin: 'De profundis clamavi',
        text:
          'Des profondeurs, je t\'appelle, Seigneur !\n' +
          'Seigneur, écoute mon cri !\n' +
          'Que tes oreilles soient attentives\n' +
          'à ma voix suppliante !\n\n' +
          'Si tu retiens les fautes, Seigneur,\n' +
          'Seigneur, qui peut subsister ?\n' +
          'Mais près de toi se trouve le pardon,\n' +
          'et c\'est pourquoi on te révère.\n\n' +
          'J\'espère le Seigneur de toute mon âme ;\n' +
          'je l\'espère, et j\'attends sa parole.\n' +
          'Mon âme attend le Seigneur\n' +
          'plus qu\'un veilleur ne guette l\'aurore.',
      },
      {
        id: 'ps150',
        number: 150,
        title: 'Psaume 150 — Louez Dieu',
        theme: 'Louange',
        latin: 'Laudate Dominum',
        text:
          'Louez Dieu dans son temple saint,\n' +
          'louez-le au firmament de sa puissance,\n' +
          'louez-le pour ses actions éclatantes,\n' +
          'louez-le selon son immense grandeur.\n\n' +
          'Louez-le en sonnant de la trompette,\n' +
          'louez-le sur la harpe et la cithare,\n' +
          'louez-le avec les tambours et la danse,\n' +
          'louez-le sur les cordes et les flûtes,\n' +
          'louez-le sur les cymbales sonores,\n' +
          'louez-le sur les cymbales vibrantes !\n\n' +
          'Que tout ce qui respire loue le Seigneur !\n' +
          'Alléluia !',
      },
    ],
  },
  {
    id: 'prayers',
    title: 'Prières',
    subtitle: 'Prières Traditionnelles',
    icon: '🙏',
    color: '#C8A96E',
    items: [
      {
        id: 'pater',
        title: 'Notre Père',
        theme: 'Prière du Seigneur',
        latin: 'Pater Noster',
        text:
          'Notre Père qui es aux cieux,\n' +
          'que ton nom soit sanctifié,\n' +
          'que ton règne vienne,\n' +
          'que ta volonté soit faite\n' +
          'sur la terre comme au ciel.\n\n' +
          'Donne-nous aujourd\'hui notre pain de ce jour.\n' +
          'Pardonne-nous nos offenses\n' +
          'comme nous pardonnons aussi\n' +
          'à ceux qui nous ont offensés.\n' +
          'Et ne nous soumets pas à la tentation,\n' +
          'mais délivre-nous du Mal.\n\n' +
          '— — — — — — — — — — — —\n' +
          'Pater noster, qui es in caelis,\n' +
          'sanctificetur nomen tuum ;\n' +
          'adveniat regnum tuum ;\n' +
          'fiat voluntas tua,\n' +
          'sicut in caelo, et in terra.\n' +
          'Panem nostrum cotidianum da nobis hodie,\n' +
          'et dimitte nobis debita nostra,\n' +
          'sicut et nos dimittimus debitoribus nostris ;\n' +
          'et ne nos inducas in tentationem,\n' +
          'sed libera nos a malo. Amen.',
      },
      {
        id: 'ave',
        title: 'Je vous salue Marie',
        theme: 'Prière mariale',
        latin: 'Ave Maria',
        text:
          'Je vous salue, Marie pleine de grâces ;\n' +
          'le Seigneur est avec vous.\n' +
          'Vous êtes bénie entre toutes les femmes\n' +
          'et Jésus, le fruit de vos entrailles, est béni.\n\n' +
          'Sainte Marie, Mère de Dieu,\n' +
          'priez pour nous pauvres pécheurs,\n' +
          'maintenant et à l\'heure de notre mort.\n' +
          'Amen.\n\n' +
          '— — — — — — — — — — — —\n' +
          'Ave Maria, gratia plena,\n' +
          'Dominus tecum.\n' +
          'Benedicta tu in mulieribus,\n' +
          'et benedictus fructus ventris tui, Iesus.\n' +
          'Sancta Maria, Mater Dei,\n' +
          'ora pro nobis peccatoribus,\n' +
          'nunc et in hora mortis nostrae. Amen.',
      },
      {
        id: 'gloria',
        title: 'Gloire au Père',
        theme: 'Doxologie trinitaire',
        latin: 'Gloria Patri',
        text:
          'Gloire au Père, et au Fils, et au Saint-Esprit,\n' +
          'comme il était au commencement,\n' +
          'maintenant et toujours,\n' +
          'dans les siècles des siècles.\n' +
          'Amen.\n\n' +
          '— — — — — — — — — — — —\n' +
          'Gloria Patri et Filio\n' +
          'et Spiritui Sancto,\n' +
          'sicut erat in principio\n' +
          'et nunc et semper\n' +
          'et in saecula saeculorum. Amen.',
      },
      {
        id: 'credo',
        title: 'Credo des Apôtres',
        theme: 'Profession de foi',
        latin: 'Symbolum Apostolorum',
        text:
          'Je crois en Dieu, le Père tout-puissant,\n' +
          'Créateur du ciel et de la terre.\n\n' +
          'Je crois en Jésus-Christ, son Fils unique, notre Seigneur ;\n' +
          'qui a été conçu du Saint-Esprit,\n' +
          'est né de la Vierge Marie,\n' +
          'a souffert sous Ponce Pilate,\n' +
          'a été crucifié, est mort et a été enseveli,\n' +
          'est descendu aux enfers,\n' +
          'le troisième jour est ressuscité des morts,\n' +
          'est monté aux cieux,\n' +
          'est assis à la droite de Dieu le Père tout-puissant,\n' +
          'd\'où il viendra juger les vivants et les morts.\n\n' +
          'Je crois en l\'Esprit Saint,\n' +
          'à la sainte Église catholique,\n' +
          'à la communion des saints,\n' +
          'à la rémission des péchés,\n' +
          'à la résurrection de la chair,\n' +
          'à la vie éternelle.\n' +
          'Amen.',
      },
      {
        id: 'salveregina',
        title: 'Salve Regina',
        theme: 'Antienne mariale',
        latin: 'Salve Regina',
        text:
          'Salut, ô Reine, Mère de miséricorde,\n' +
          'notre vie, notre douceur, et notre espérance, salut !\n\n' +
          'Vers vous nous crions, pauvres enfants d\'Ève exilés ;\n' +
          'vers vous nous soupirons, gémissant et pleurant\n' +
          'dans cette vallée de larmes.\n\n' +
          'Ô vous, notre avocate, tournez vers nous\n' +
          'vos yeux miséricordieux ;\n' +
          'et après cet exil, montrez-nous Jésus,\n' +
          'le fruit béni de vos entrailles.\n\n' +
          'Ô clémente, ô pieuse, ô douce Vierge Marie !\n\n' +
          '— — — — — — — — — — — —\n' +
          'Salve, Regina, Mater misericordiae,\n' +
          'vita, dulcedo et spes nostra, salve.\n' +
          'Ad te clamamus, exsules filii Hevae,\n' +
          'ad te suspiramus, gementes et flentes\n' +
          'in hac lacrimarum valle.\n' +
          'Eia ergo, advocata nostra,\n' +
          'illos tuos misericordes oculos ad nos converte,\n' +
          'et Iesum, benedictum fructum ventris tui,\n' +
          'nobis post hoc exsilium ostende.\n' +
          'O clemens, o pia, o dulcis Virgo Maria.',
      },
      {
        id: 'angelus',
        title: 'Angélus',
        theme: 'Prière de l\'Annonciation',
        latin: 'Angelus Domini',
        text:
          'L\'ange du Seigneur apporta l\'annonce à Marie,\n' +
          'et elle conçut du Saint-Esprit.\n' +
          '— Je vous salue, Marie…\n\n' +
          'Voici la servante du Seigneur,\n' +
          'qu\'il me soit fait selon votre parole.\n' +
          '— Je vous salue, Marie…\n\n' +
          'Et le Verbe s\'est fait chair,\n' +
          'et il a habité parmi nous.\n' +
          '— Je vous salue, Marie…\n\n' +
          'Priez pour nous, sainte Mère de Dieu,\n' +
          'afin que nous soyons rendus dignes des promesses du Christ.\n\n' +
          'Répandons nos prières, Seigneur,\n' +
          'dans nos âmes ta grâce ;\n' +
          'par l\'Annonciation de l\'Ange nous avons connu\n' +
          'l\'Incarnation de ton Fils Jésus-Christ ;\n' +
          'conduis-nous par sa Passion et sa Croix\n' +
          'à la gloire de la Résurrection. Amen.',
      },
    ],
  },
  {
    id: 'liturgical',
    title: 'Liturgique',
    subtitle: 'Heures Liturgiques',
    icon: '⛪',
    color: '#6A5A8A',
    items: [
      {
        id: 'laudes',
        title: 'Laudes — Matin',
        theme: 'Louange du matin',
        text:
          'Les Laudes (de "laudare", louer) constituent la grande prière du matin.\n' +
          'Elles se célèbrent à l\'aube, sanctifiant les premières heures du jour.\n\n' +
          '• Hymne du matin (Iam lucis orto sidere)\n' +
          '• Deux psaumes de louange (dont le Ps 63 ou Ps 150)\n' +
          '• Cantique de l\'Ancien Testament\n' +
          '• Lecture brève\n' +
          '• Cantique de Zacharie (Benedictus)\n' +
          '• Intercessions matinales\n' +
          '• Notre Père\n\n' +
          'Bénédiction : "Que le Seigneur nous bénisse et nous garde. Amen."',
      },
      {
        id: 'tierce',
        title: 'Tierce — 9h',
        theme: 'Heure médiane du matin',
        text:
          'Tierce (9h) rappelle l\'heure où l\'Esprit Saint descendit sur les Apôtres\n' +
          'le jour de la Pentecôte.\n\n' +
          '• Hymne de la petite heure\n' +
          '• Trois psaumes ou portions de psaumes\n' +
          '• Lecture brève\n' +
          '• Verset et répons\n' +
          '• Oraison conclusive\n\n' +
          'Intention : offrir le travail du matin à Dieu et demander l\'assistance de l\'Esprit Saint.',
      },
      {
        id: 'sexte',
        title: 'Sexte — Midi',
        theme: 'Heure de midi',
        text:
          'Sexte (midi) sanctifie l\'heure où le Christ fut crucifié selon saint Jean.\n\n' +
          '• Hymne de midi\n' +
          '• Trois psaumes\n' +
          '• Lecture brève\n' +
          '• Oraison\n\n' +
          'Méditation proposée : "Père, entre tes mains je remets mon esprit." (Lc 23,46)\n\n' +
          'Intention : unir le milieu du jour à la Passion du Christ, source de notre salut.',
      },
      {
        id: 'none',
        title: 'None — 15h',
        theme: 'Heure de l\'après-midi',
        text:
          'None (15h) commémore la mort du Christ en croix, à la neuvième heure.\n\n' +
          '• Hymne de l\'après-midi\n' +
          '• Trois psaumes\n' +
          '• Lecture brève\n' +
          '• Oraison de l\'heure\n\n' +
          'Prière suggérée :\n' +
          '« Seigneur Jésus-Christ, par ta mort sur la croix à cette heure,\n' +
          'accorde-nous de mourir à nous-mêmes\n' +
          'pour ne vivre que pour toi. Amen. »',
      },
      {
        id: 'vepres',
        title: 'Vêpres — Soir',
        theme: 'Grande prière du soir',
        text:
          'Les Vêpres constituent, avec les Laudes, l\'une des deux "colonnes"\n' +
          'de la Liturgie des Heures. Elles se célèbrent en fin d\'après-midi.\n\n' +
          '• Hymne vespérale\n' +
          '• Cinq psaumes avec antiennes\n' +
          '• Lecture brève\n' +
          '• Cantique de Marie (Magnificat)\n' +
          '• Intercessions du soir\n' +
          '• Notre Père et oraison\n\n' +
          'Magnificat :\n' +
          '« Mon âme exalte le Seigneur,\n' +
          'exulte mon esprit en Dieu, mon Sauveur ! »',
      },
      {
        id: 'complies',
        title: 'Complies — Coucher',
        theme: 'Prière de la nuit',
        text:
          'Complies clôturent la journée liturgique. Elles se récitent avant le coucher.\n\n' +
          '• Examen de conscience bref\n' +
          '• Hymne du soir (Te lucis ante terminum)\n' +
          '• Psaume 91 ou 4\n' +
          '• Lecture brève\n' +
          '• Hymne de Siméon (Nunc dimittis)\n' +
          '• Antienne mariale finale (Salve Regina)\n\n' +
          'Nunc dimittis :\n' +
          '« Maintenant, Seigneur, tu peux laisser ton serviteur\n' +
          'aller en paix, selon ta parole. »',
      },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function PsalmsScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('psalms');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const category = PSALM_CATEGORIES.find((c) => c.id === activeCategory)!;

  function toggleItem(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Psaumes & Prières</Text>
            <Text style={styles.headerSub}>ΣΟΦΙΑ · SAGESSE</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        {/* Category Tabs */}
        <View style={styles.tabs}>
          {PSALM_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.tab, isActive && { borderColor: cat.color, backgroundColor: cat.color + '18' }]}
                onPress={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                activeOpacity={0.8}
              >
                <Text style={styles.tabIcon}>{cat.icon}</Text>
                <Text style={[styles.tabTitle, isActive && { color: cat.color }]}>{cat.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleRow}>
          <View style={[styles.subtitleLine, { backgroundColor: category.color }]} />
          <Text style={[styles.subtitleText, { color: category.color }]}>{category.subtitle}</Text>
          <View style={[styles.subtitleLine, { backgroundColor: category.color }]} />
        </View>

        {/* List */}
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {category.items.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <Pressable key={item.id} onPress={() => toggleItem(item.id)} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemHeaderLeft}>
                    {item.number !== undefined && (
                      <View style={[styles.psalmNumber, { backgroundColor: category.color + '22' }]}>
                        <Text style={[styles.psalmNumberText, { color: category.color }]}>{item.number}</Text>
                      </View>
                    )}
                    <View style={styles.itemTitles}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.theme && (
                        <Text style={styles.itemTheme}>{item.theme}</Text>
                      )}
                    </View>
                  </View>
                  <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>›</Text>
                </View>

                {item.latin && !isOpen && (
                  <Text style={styles.itemLatin}>{item.latin}</Text>
                )}

                {isOpen && (
                  <View style={styles.itemBody}>
                    {item.latin && (
                      <Text style={[styles.itemBodyLatin, { color: category.color }]}>{item.latin}</Text>
                    )}
                    <Text style={styles.itemBodyText}>{item.text}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
          <View style={styles.bottomPad} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0F0B18' },
  safe: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#C8A96E',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 18,
    color: '#F2EAD8',
    letterSpacing: 1,
  },
  headerSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: 'rgba(200,169,110,0.5)',
    letterSpacing: 3,
    marginTop: 2,
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    gap: 4,
  },
  tabIcon: { fontSize: 18 },
  tabTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10,
    color: '#4A5068',
    letterSpacing: 0.5,
  },

  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 10,
  },
  subtitleLine: { flex: 1, height: 1, opacity: 0.4 },
  subtitleText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, gap: 10 },
  bottomPad: { height: 40 },

  itemCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  psalmNumber: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  psalmNumberText: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
  },
  itemTitles: { flex: 1 },
  itemTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
    color: '#E8E0CC',
    lineHeight: 18,
  },
  itemTheme: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#4A5068',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: '#4A5068',
    transform: [{ rotate: '0deg' }],
    marginLeft: 8,
  },
  chevronOpen: {
    transform: [{ rotate: '90deg' }],
    color: '#C8A96E',
  },
  itemLatin: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#4A5068',
    fontStyle: 'italic',
    marginTop: 6,
  },
  itemBody: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    gap: 8,
  },
  itemBodyLatin: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  itemBodyText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#B0B8CC',
    lineHeight: 22,
  },
});
