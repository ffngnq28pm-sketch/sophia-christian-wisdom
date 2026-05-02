export interface SessionStep {
  type: 'intro' | 'reading' | 'practice' | 'reflection' | 'closing';
  durationSec: number;
  text: string;
  instruction?: string;
}

export interface DailySessionData {
  id: string;
  title: string;
  subtitle: string;
  durationMin: number;
  theme: string;
  steps: SessionStep[];
}

export const DAILY_SESSIONS: DailySessionData[] = [
  {
    id: 'notre-pere-1',
    title: 'Le Notre-Père',
    subtitle: 'La prière que Jésus nous a enseignée',
    durationMin: 8,
    theme: 'Prière',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Entrez dans le silence et posez-vous en présence de Dieu. Respirez profondément et laissez les préoccupations du jour s\'éloigner.',
        instruction: 'Fermez les yeux et respirez lentement.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: 'Jésus nous a donné le Notre-Père comme modèle de toute prière. Cette prière commence par reconnaître que Dieu est notre Père, créant ainsi une relation de confiance filiale. Chaque demande nous oriente vers ce qui est essentiel : la gloire de Dieu, son règne, sa volonté.',
        instruction: 'Lisez lentement, en pesant chaque mot.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Récitez le Notre-Père lentement, phrase par phrase. Après chaque demande, faites une pause et laissez ces mots résonner dans votre cœur. Que signifie pour vous "que ton règne vienne" en ce jour ?',
        instruction: 'Priez avec le cœur, pas seulement avec les lèvres.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quelle demande du Notre-Père vous touche particulièrement aujourd\'hui ? Qu\'est-ce que Dieu vous invite à approfondir dans cette prière ?',
        instruction: 'Notez ce qui monte dans votre cœur.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par un acte de confiance : "Père, je remets cette journée entre tes mains." Portez la paix de cette prière dans votre quotidien.',
      },
    ],
  },
  {
    id: 'ave-maria-1',
    title: 'L\'Ave Maria',
    subtitle: 'Contempler Marie, notre mère dans la foi',
    durationMin: 8,
    theme: 'Marie',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Entrez dans la douceur de cette prière mariale. Marie nous conduit toujours vers son Fils Jésus. Laissez votre cœur s\'ouvrir à sa tendresse maternelle.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: 'L\'Ave Maria est une prière tissée de paroles évangéliques. La première partie reprend le salut de l\'ange Gabriel et d\'Élisabeth. La seconde est une supplication : nous reconnaissons Marie comme mère et lui demandons d\'intercéder pour nous, maintenant et à l\'heure de notre mort.',
        instruction: 'Méditez chaque mot comme un bijou précieux.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Récitez lentement trois Ave Maria en vous concentrant sur chaque phrase. Au premier, méditez la joie de l\'Annonciation. Au second, contemplez Marie au pied de la croix. Au troisième, imaginez Marie glorieuse et intercédant pour vous.',
        instruction: 'Laissez chaque Ave être une rencontre avec Marie.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Comment Marie vous aide-t-elle à vous approcher de Jésus ? Y a-t-il une intention particulière que vous souhaitez confier à sa prière maternelle ?',
        instruction: 'Confiez-lui ce qui pèse sur votre cœur.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par une courte prière : "Marie, conduis-moi à ton Fils." Emportez sa douceur et sa foi dans votre journée.',
      },
    ],
  },
  {
    id: 'examen-conscience',
    title: 'Examen de conscience',
    subtitle: 'Relire sa journée avec le regard de Dieu',
    durationMin: 8,
    theme: 'Discernement',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Placez-vous en présence de Dieu qui vous aime. Demandez la lumière de l\'Esprit Saint pour relire honnêtement et sans sévérité excessive votre journée écoulée.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: 'Saint Ignace de Loyola nous invite à faire chaque jour un examen de conscience en cinq points : rendre grâce, demander la lumière, examiner sa journée, exprimer son repentir et sa résolution, remettre le tout à Dieu. Cet examen n\'est pas une liste d\'erreurs mais un dialogue d\'amour.',
        instruction: 'L\'examen est un regard aimant, non un jugement.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Repassez mentalement votre journée depuis le matin. Notez les moments de grâce où vous avez ressenti la présence de Dieu. Repérez aussi les moments où vous avez manqué d\'amour ou de vérité. Pour ces moments, exprimez simplement votre regret et votre confiance en la miséricorde divine.',
        instruction: 'Soyez doux avec vous-même, Dieu l\'est encore plus.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quel est le moment de cette journée dont vous êtes le plus reconnaissant ? Quel est celui que vous confieriez à la miséricorde de Dieu ?',
        instruction: 'Écrivez ou murmurez votre réponse.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par un acte de confiance : "Seigneur, merci pour ce jour. Je te confie ce que j\'ai vécu et je m\'abandonne à ta miséricorde pour demain."',
      },
    ],
  },
  {
    id: 'lectio-divina-psaume',
    title: 'Lectio Divina sur les Psaumes',
    subtitle: 'Laisser la Parole habiter notre cœur',
    durationMin: 8,
    theme: 'Parole de Dieu',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La Lectio Divina est une lecture priante de la Parole. Disposez votre cœur comme une terre prête à recevoir la semence. Appelez l\'Esprit Saint : "Parle, Seigneur, ton serviteur écoute."',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"L\'Éternel est mon berger, je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles. Il restaure mon âme." (Psaume 23) Ces mots du roi David expriment une confiance totale en Dieu, berger attentif à chaque brebis.',
        instruction: 'Lisez deux fois, lentement, en écoutant avec le cœur.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Choisissez un mot ou une phrase qui vous a touché dans ce psaume. Répétez-le intérieurement comme une nourriture à savourer. Laissez-le descendre de la tête au cœur. Que vous dit Dieu à travers ces mots dans votre situation actuelle ?',
        instruction: 'Ruminez la Parole comme une nourriture spirituelle.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quelle image du psaume vous a le plus touché ? En quoi ce texte rejoint-il quelque chose de votre vie en ce moment ?',
        instruction: 'Laissez la Parole vous interpeller.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par une courte prière spontanée inspirée par ce psaume. Portez ce verset avec vous comme un trésor tout au long de la journée.',
      },
    ],
  },
  {
    id: 'beatitudes',
    title: 'Les Béatitudes',
    subtitle: 'Le chemin du bonheur selon Jésus',
    durationMin: 8,
    theme: 'Évangile',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Imaginez-vous sur la montagne, assis aux pieds de Jésus. Il vous regarde avec amour et commence à parler du bonheur véritable. Ouvrez votre cœur à ses paroles.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Heureux les pauvres en esprit, car le Royaume des cieux est à eux. Heureux les doux, car ils posséderont la terre. Heureux les miséricordieux, car ils obtiendront miséricorde." (Mt 5,3-7) Les Béatitudes renversent nos critères du bonheur : Jésus beatifie ceux que le monde considère comme perdants.',
        instruction: 'Recevez ces paroles comme un programme de vie.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Choisissez une béatitude qui vous interpelle particulièrement en ce moment. Méditez sur ce qu\'elle vous demande concrètement. Comment pourriez-vous vivre cette béatitude dans votre quotidien aujourd\'hui ? Demandez à Dieu la grâce de progresser sur ce chemin.',
        instruction: 'Une béatitude vécue change une vie.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quelle béatitude vous semble la plus difficile à vivre ? Quelle béatitude vous paraît la plus accessible en ce moment ?',
        instruction: 'Soyez honnête avec vous-même.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Demandez à Dieu : "Seigneur, aide-moi à marcher sur le chemin des béatitudes, même quand c\'est difficile." Repartez avec une résolution concrète pour aujourd\'hui.',
      },
    ],
  },
  {
    id: 'misericorde',
    title: 'La Miséricorde divine',
    subtitle: 'Se laisser aimer sans condition',
    durationMin: 8,
    theme: 'Miséricorde',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Posez-vous et laissez venir à vous le souvenir d\'une faiblesse ou d\'un péché qui vous pèse. Ne le fuyez pas. Dieu vous attend exactement là où vous en êtes.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Comme le ciel est haut par-dessus la terre, aussi grande est sa bonté pour ceux qui le craignent. Comme l\'orient est loin de l\'occident, ainsi il éloigne de nous nos transgressions." (Ps 103,11-12) La miséricorde de Dieu n\'est pas une tolérance résignée mais un amour qui transforme et relève.',
        instruction: 'Laissez ces mots atteindre vos profondeurs.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Imaginez que Jésus se tient devant vous comme devant la femme adultère. Il ne condamne pas. Il dit : "Va, et ne pèche plus." Accueillez sa miséricorde pour vous-même. Puis, pensez à quelqu\'un envers qui vous pourriez exercer cette même miséricorde dans votre vie.',
        instruction: 'Recevoir la miséricorde, c\'est apprendre à la donner.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Avez-vous du mal à croire que Dieu vous aime inconditionnellement ? Qu\'est-ce qui vous empêche de recevoir pleinement sa miséricorde ?',
        instruction: 'Notez ce qui monte du fond de votre cœur.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par : "Seigneur Jésus, aie pitié de moi, pauvre pécheur. Je crois en ta miséricorde et je te fais confiance." Repartez libéré et aimé.',
      },
    ],
  },
  {
    id: 'louange',
    title: 'La Louange',
    subtitle: 'Célébrer Dieu pour ce qu\'il est',
    durationMin: 8,
    theme: 'Louange',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La louange est la prière la plus désintéressée : on loue Dieu non pour ce qu\'il nous donne, mais pour ce qu\'il est. Préparez votre cœur à cette élévation de l\'âme.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Louez l\'Éternel, car il est bon, car sa bonté dure à toujours !" (Ps 106,1) Les Psaumes sont le grand livre de louange de l\'Église. Louer Dieu, c\'est reconnaître sa grandeur, sa beauté, sa bonté. C\'est une joie qui déborde et cherche à s\'exprimer.',
        instruction: 'Lisez ce texte comme un chant de joie.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Citez à voix haute ou intérieurement dix raisons de louer Dieu : pour la création, pour la vie, pour l\'amour de vos proches, pour un moment de beauté, pour sa Parole, pour Jésus... Laissez la louange monter naturellement, sans forcer. Reprenez le refrain : "Gloire à toi, Seigneur !"',
        instruction: 'Que votre cœur s\'enflamme dans la louange.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Qu\'est-ce qui vous rend le plus reconnaissant envers Dieu en ce moment ? Comment la louange change-t-elle votre regard sur votre vie ?',
        instruction: 'La louange transforme le cœur qui la pratique.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par le Gloria : "Gloire à Dieu au plus haut des cieux, et paix sur la terre aux hommes qu\'il aime." Emportez cet élan de joie dans votre journée.',
      },
    ],
  },
  {
    id: 'abandon-providence',
    title: 'L\'Abandon à la Providence',
    subtitle: 'Remettre sa vie entre les mains de Dieu',
    durationMin: 8,
    theme: 'Confiance',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Y a-t-il quelque chose qui vous inquiète en ce moment ? Une situation dont vous ne voyez pas l\'issue ? Posez-la symboliquement devant vous et invitez Dieu à s\'en approcher.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Ne vous inquiétez donc pas du lendemain. Regardez les oiseaux du ciel : ils ne sèment ni ne moissonnent, ils n\'amassent rien dans des greniers, et votre Père céleste les nourrit." (Mt 6,26) Jésus nous invite à une confiance filiale radicale. Ce n\'est pas l\'insouciance, mais la foi en un Père provident.',
        instruction: 'Recevez ces paroles comme une invitation à la liberté.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Faites l\'acte d\'abandon de Charles de Foucauld : "Mon Père, je m\'abandonne à toi, fais de moi ce qu\'il te plaira. Quoi que tu fasses de moi, je te remercie." Répétez-le lentement, en laissant chaque phrase descendre dans votre cœur. Pensez concrètement à la situation qui vous inquiète et remettez-la à Dieu.',
        instruction: 'L\'abandon n\'est pas passif, c\'est un acte de foi actif.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quelle est la différence entre s\'abandonner à Dieu et se résigner ? Comment vivez-vous la tension entre agir et faire confiance ?',
        instruction: 'Notez ce qui vous vient du cœur.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Concluez par ces mots : "Père, je te fais confiance pour aujourd\'hui et pour demain. Tu es mon roc et mon refuge." Repartez allégé de vos inquiétudes.',
      },
    ],
  },
  {
    id: 'gratitude',
    title: 'La Gratitude',
    subtitle: 'Reconnaître les dons de Dieu dans sa vie',
    durationMin: 8,
    theme: 'Gratitude',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La gratitude est une attitude spirituelle fondamentale. Elle ouvre les yeux de l\'âme sur les cadeaux cachés de la vie. Disposez votre cœur à recevoir et à reconnaître.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Rendez grâces en toutes choses, car c\'est à votre égard la volonté de Dieu en Jésus-Christ." (1 Th 5,18) Paul nous invite à une gratitude universelle, même dans l\'épreuve. Les mystiques nous enseignent que la gratitude est un chemin vers Dieu : elle nous fait passer du manque à la plénitude.',
        instruction: 'Laissez ces mots transformer votre regard.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Faites une promenade mentale dans votre vie et notez cinq grâces reçues récemment : peut-être une conversation qui vous a nourri, un paysage qui vous a touché, un geste de bonté, une santé préservée, un moment de paix. Pour chacune, dites simplement : "Merci, Seigneur."',
        instruction: 'Chaque "merci" est une prière complète.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Avez-vous tendance à vous concentrer sur ce qui manque plutôt que sur ce que vous avez ? Comment la pratique de la gratitude pourrait-elle changer votre journée ?',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par le début de la prière eucharistique : "Il est vraiment juste et bon de te rendre grâce, toujours et en tout lieu." Repartez avec un cœur reconnaissant.',
      },
    ],
  },
  {
    id: 'charite-fraternelle',
    title: 'La Charité fraternelle',
    subtitle: 'Aimer comme Dieu nous aime',
    durationMin: 8,
    theme: 'Charité',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Pensez à quelqu\'un que vous aimez facilement et à quelqu\'un avec qui vous avez des difficultés. Mettez ces deux visages devant vous, en présence de Dieu.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Je vous donne un commandement nouveau : aimez-vous les uns les autres ; aimez-vous les uns les autres comme je vous ai aimés." (Jn 13,34) Le commandement de l\'amour n\'est pas une suggestion douce mais une exigence de l\'Évangile. Jésus nous donne le modèle : un amour qui va jusqu\'au don total de soi.',
        instruction: 'Laissez ces mots vous mesurer.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Priez d\'abord pour la personne que vous aimez facilement : demandez à Dieu de bénir sa vie. Puis, plus difficile, priez pour la personne avec laquelle vous avez des tensions. Demandez la grâce de la voir avec les yeux de Dieu, qui l\'aime lui aussi infiniment. Que souhaiteriez-vous lui dire si vous n\'aviez plus peur ?',
        instruction: 'La prière pour l\'autre transforme notre cœur.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Y a-t-il quelqu\'un dans votre vie à qui vous devez pardonner ? Y a-t-il quelqu\'un à qui vous pourriez faire un geste concret d\'amour aujourd\'hui ?',
        instruction: 'L\'amour concret vaut plus que les beaux discours.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Concluez : "Seigneur, donne-moi un cœur large qui sait aimer même là où c\'est difficile." Repartez avec une résolution d\'amour concrète.',
      },
    ],
  },
  {
    id: 'humilite',
    title: 'L\'Humilité',
    subtitle: 'Se voir avec justesse devant Dieu',
    durationMin: 8,
    theme: 'Vertus',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'L\'humilité n\'est pas se déprécier mais se voir avec vérité. Disposez-vous à regarder honnêtement qui vous êtes, avec vos forces et vos limites, devant Dieu.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Apprenez de moi que je suis doux et humble de cœur, et vous trouverez le repos de vos âmes." (Mt 11,29) Jésus, qui est Dieu, se décrit comme humble. L\'humilité n\'est pas une faiblesse mais la force de celui qui n\'a rien à prouver car il sait qu\'il est aimé. C\'est la vérité sur soi-même.',
        instruction: 'Méditez l\'humilité de Jésus, Dieu fait homme.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Pensez à un domaine où vous avez tendance à l\'orgueil ou à la vanité. Maintenant, pensez à un talent ou une qualité que vous avez reçus de Dieu et non mérités. Remerciez-le pour ce don. Pensez ensuite à une limite ou faiblesse que vous acceptez difficilement : offrez-la à Dieu avec confiance.',
        instruction: 'L\'humilité est un chemin de liberté.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'En quoi l\'humilité vous libèrerait-elle dans vos relations ? Y a-t-il une situation où vous avez besoin de reconnaître que vous avez eu tort ?',
        instruction: 'La vérité sur soi libère.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par la prière de Marie : "Il a regardé la bassesse de sa servante. Il a renversé les puissants de leur trône et il a élevé les humbles." Que cette prière devienne la vôtre.',
      },
    ],
  },
  {
    id: 'paix-interieure',
    title: 'La Paix intérieure',
    subtitle: 'Recevoir la paix que le monde ne peut donner',
    durationMin: 8,
    theme: 'Paix',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Installez-vous dans un endroit tranquille. Prenez conscience du bruit intérieur : pensées, inquiétudes, tensions. Ne les combattez pas. Laissez-les s\'apaiser comme les vagues de la mer.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Je vous laisse la paix, je vous donne ma paix. Je ne vous la donne pas comme le monde la donne." (Jn 14,27) La paix de Jésus n\'est pas l\'absence de problèmes mais une présence au cœur des tempêtes. C\'est une paix profonde qui coexiste avec les difficultés de la vie.',
        instruction: 'Recevez cette promesse comme un don personnel.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Pratiquez la respiration priante : inspirez lentement en pensant "Viens, Seigneur", expirez en pensant "donne-moi ta paix." Répétez pendant deux minutes. Puis identifiez ce qui trouble votre paix intérieure et remettez-le explicitement entre les mains de Dieu.',
        instruction: 'Chaque souffle peut devenir une prière.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Qu\'est-ce qui perturbe le plus souvent votre paix intérieure ? Quelle pratique spirituelle vous aide le plus à retrouver la paix ?',
        instruction: 'Notez ce qui résonne le plus.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par : "Seigneur, garde mon cœur dans ta paix, même quand tout autour de moi s\'agite." Portez cette paix reçue à ceux que vous rencontrerez.',
      },
    ],
  },
  {
    id: 'croix-resurrection',
    title: 'La Croix et la Résurrection',
    subtitle: 'Le mystère pascal au cœur de notre foi',
    durationMin: 8,
    theme: 'Foi',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Le mystère pascal est le centre de la foi chrétienne. Disposez votre cœur à contempler à la fois la croix et la lumière de Pâques. Ces deux réalités sont inséparables.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Si nous mourons avec lui, nous vivrons aussi avec lui. Si nous persévérons, nous régnerons aussi avec lui." (2 Tm 2,11-12) Paul nous invite à voir notre vie à la lumière du mystère pascal. Nos croix portées avec foi deviennent chemin vers la résurrection. Il n\'y a pas de Pâques sans Vendredi Saint.',
        instruction: 'Reliez ce texte à une croix que vous portez.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Pensez à une souffrance ou une difficulté actuelle dans votre vie. Imaginez Jésus sur la croix à vos côtés, portant lui aussi sa douleur. Puis imaginez la lumière de Pâques : que pourrait signifier la résurrection dans cette situation ? Comment Dieu pourrait-il faire surgir la vie de cette mort ?',
        instruction: 'La foi voit au-delà de l\'apparence.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Avez-vous déjà vécu l\'expérience de voir quelque chose de bon naître d\'une épreuve ? Comment la foi en la Résurrection change-t-elle votre regard sur les difficultés présentes ?',
        instruction: 'Témoignez de la Résurrection dans votre histoire.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Concluez par le cri pascal de l\'Église : "Le Christ est ressuscité ! Il est vraiment ressuscité !" Repartez avec cette certitude lumineuse dans le cœur.',
      },
    ],
  },
  {
    id: 'presence-dieu',
    title: 'La Présence de Dieu',
    subtitle: 'Dieu habite en nous et nous en Lui',
    durationMin: 8,
    theme: 'Contemplation',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Frère Laurent de la Résurrection pratiquait la présence de Dieu dans tous ses actes, même les plus humbles. Commencez par prendre conscience que Dieu est là, maintenant, avec vous.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Ne savez-vous pas que vous êtes le temple de Dieu, et que l\'Esprit de Dieu habite en vous ?" (1 Co 3,16) Dieu n\'est pas loin dans les cieux. Il habite au plus profond de nous-mêmes. La prière, c\'est souvent simplement prendre conscience de cette présence déjà là, déjà agissante.',
        instruction: 'Recevez cette vérité qui change tout.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Asseyez-vous en silence et dites intérieurement : "Tu es là, Seigneur." Puis écoutez. Pas forcément des paroles ou des images, mais une présence. Une chaleur. Un calme. Restez dans ce silence peuplé. Si l\'esprit vagabonde, revenez doucement à cette présence avec : "Tu es là."',
        instruction: 'L\'oraison silencieuse est le cœur de la prière.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Avez-vous parfois le sentiment que Dieu est absent ? Qu\'est-ce qui vous aide à renouer avec le sens de sa présence ? Dans quels moments de la vie quotidienne pourriez-vous cultiver cette présence ?',
        instruction: 'Cherchez Dieu dans l\'ordinaire.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par : "Seigneur, aide-moi à te retrouver tout au long de cette journée, dans chaque visage, chaque instant, chaque geste." Repartez avec les yeux du cœur ouverts.',
      },
    ],
  },
  {
    id: 'priere-autres',
    title: 'Prier pour les autres',
    subtitle: 'L\'intercession, service d\'amour',
    durationMin: 8,
    theme: 'Intercession',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Prier pour les autres, c\'est les porter devant Dieu avec amour. Cet acte gratuit est l\'un des plus beaux cadeaux que nous puissions offrir à nos frères et sœurs.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Je vous exhorte donc, avant toutes choses, à faire des prières, des supplications, des requêtes, des actions de grâces, pour tous les hommes." (1 Tm 2,1) L\'intercession est au cœur de la tradition chrétienne. Jésus lui-même intercède pour nous au Père. Nous participons à cette intercession quand nous prions les uns pour les autres.',
        instruction: 'L\'intercession nous unit au ministère de Jésus.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Faites une liste intérieure de personnes à porter dans la prière : un malade, quelqu\'un qui traverse une épreuve, un lointain que vous n\'avez pas vu depuis longtemps, un ennemi ou adversaire. Pour chacun, prononcez son prénom et dites : "Seigneur, je te confie [prénom]. Protège-le, guide-le, aime-le de ton amour infini."',
        instruction: 'Chaque prénom prononcé devant Dieu est un acte d\'amour.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Y a-t-il quelqu\'un que vous n\'osez pas nommer dans la prière ? Y a-t-il quelqu\'un qui, en ce moment, a particulièrement besoin d\'être porté par votre prière ?',
        instruction: 'La prière d\'intercession est un acte de foi et d\'espérance.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Concluez : "Seigneur, reçois mes pauvres prières pour ceux que j\'ai nommés. Tu sais mieux que moi ce dont ils ont besoin. Fais-leur du bien." Repartez avec un cœur aimant.',
      },
    ],
  },
  {
    id: 'magnificat',
    title: 'Le Magnificat de Marie',
    subtitle: 'Chanter la grandeur de Dieu avec Marie',
    durationMin: 8,
    theme: 'Marie',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Le Magnificat est le chant de joie de Marie quand elle visite sa cousine Élisabeth. C\'est aussi le chant de tout croyant qui a reçu la vie de Dieu. Laissez-le devenir le vôtre.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Mon âme exalte le Seigneur, mon esprit exulte en Dieu mon Sauveur. Il s\'est penché sur son humble servante, désormais tous les âges me diront bienheureuse. Le Puissant a fait pour moi des merveilles, saint est son nom !" (Lc 1,46-49) Marie, dans sa joie, nous enseigne comment rendre grâce à Dieu.',
        instruction: 'Priez ce texte comme si vous étiez Marie.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'À la manière de Marie, faites la liste des "merveilles" que Dieu a faites dans votre propre vie : une grâce reçue, une conversion intérieure, un sauvetage de Dieu à un moment difficile. Chantez ou murmurez : "Le Puissant a fait pour moi des merveilles." Laissez la joie de Marie devenir votre joie.',
        instruction: 'Témoignez des merveilles de Dieu dans votre histoire.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quelle est la plus grande "merveille" que Dieu a faite dans votre vie ? Comment la prière du Magnificat vous aide-t-elle à voir votre histoire avec les yeux de la foi ?',
        instruction: 'La gratitude nourrit la joie spirituelle.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par le Gloria patri : "Gloire au Père, au Fils et au Saint-Esprit, comme il était au commencement, maintenant et toujours, dans les siècles des siècles. Amen."',
      },
    ],
  },
  {
    id: 'joie-spirituelle',
    title: 'La Joie spirituelle',
    subtitle: 'La joie que personne ne peut nous enlever',
    durationMin: 8,
    theme: 'Joie',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La joie chrétienne n\'est pas le bonheur superficiel des choses qui vont bien. C\'est une joie profonde fondée sur la certitude d\'être aimé. Ouvrez votre cœur à cette joie-là.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Soyez toujours dans la joie du Seigneur, je le dis encore : soyez dans la joie." (Ph 4,4) Paul écrit ces mots depuis la prison ! La joie chrétienne transcende les circonstances. Elle vient de la relation avec Dieu, de l\'espérance en sa promesse, de la certitude que rien ne peut nous séparer de son amour.',
        instruction: 'Que Paul depuis sa prison vous inspire.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Souriez intérieurement. Laissez remonter un souvenir de joie spirituelle : un moment de prière intense, une messe particulière, un passage de l\'Évangile qui vous a enflammé. Revivez ce moment. Puis dites à Dieu : "Seigneur, aide-moi à vivre davantage dans cette joie qui vient de toi."',
        instruction: 'La joie est un choix et une grâce à cultiver.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Qu\'est-ce qui vous vole votre joie chrétienne ? Comment pourriez-vous protéger et nourrir cette joie dans votre quotidien ?',
        instruction: 'La joie a besoin d\'être cultivée comme un jardin.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par cette courte prière de Saint François : "Seigneur, fais de moi un instrument de ta paix et de ta joie." Portez un visage de joie à ceux que vous rencontrerez.',
      },
    ],
  },
  {
    id: 'confiance',
    title: 'La Confiance en Dieu',
    subtitle: 'S\'appuyer sur Celui qui ne déçoit jamais',
    durationMin: 8,
    theme: 'Confiance',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Pensez à un moment de votre vie où vous avez fait confiance à Dieu et où il n\'a pas déçu. Laissez ce souvenir nourrir votre confiance d\'aujourd\'hui.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Confiez-vous en lui en tout temps, ô peuple ! Répandez vos cœurs devant lui, Dieu est notre refuge !" (Ps 62,9) La confiance en Dieu n\'est pas naïve. Elle est fondée sur la fidélité de Dieu à travers toute l\'histoire du salut. Il a tenu ses promesses hier, il les tiendra demain.',
        instruction: 'La confiance s\'enracine dans la mémoire de la fidélité de Dieu.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Identifiez la plus grande crainte ou incertitude que vous portez en ce moment. Imaginez-vous la remettre physiquement dans les mains de Dieu. Puis priez : "Seigneur, je ne sais pas comment cette situation va évoluer, mais je sais que tu es là et que tu veilles sur moi. Je te fais confiance." Répétez cela trois fois, lentement.',
        instruction: 'La confiance est un acte de foi renouvelé chaque jour.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Y a-t-il des domaines de votre vie où il vous est difficile de faire confiance à Dieu ? Qu\'est-ce qui nourrit le plus votre confiance en lui ?',
        instruction: 'Nommez vos appuis de foi.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Concluez avec cette prière de Thérèse de l\'Enfant-Jésus : "Je n\'ai que lui seul, lui seul est tout à fait bon." Repartez avec ce fondement de confiance.',
      },
    ],
  },
  {
    id: 'foi',
    title: 'La Foi',
    subtitle: 'Approfondir le don reçu au baptême',
    durationMin: 8,
    theme: 'Foi',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La foi est un don de Dieu que nous avons reçu et que nous pouvons cultiver. Commencez par remercier Dieu pour le don de la foi, même si parfois elle vacille.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"La foi, c\'est la ferme assurance des choses qu\'on espère, la démonstration de celles qu\'on ne voit pas." (He 11,1) La foi n\'est pas une certitude intellectuelle mais une confiance du cœur. Elle avance dans l\'obscurité en tenant la main de Dieu. Elle est parfois traversée de doutes, ce qui ne la détruit pas mais l\'approfondit.',
        instruction: 'La foi coexiste avec les questions.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Priez le Credo lentement, article par article. Après chaque affirmation, vérifiez si vous croyez réellement ceci ou si vous le répétez mécaniquement. Là où vous ressentez un doute ou une question, dites honnêtement : "Seigneur, aide-moi à croire davantage en ceci." Il accueille notre foi imparfaite.',
        instruction: 'La prière du Credo est aussi un acte de désir.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quel article du Credo est le plus vivant pour vous en ce moment ? Y en a-t-il un qui vous pose des questions ? La foi est-elle davantage une relation ou une doctrine pour vous ?',
        instruction: 'La foi grandit dans l\'honnêteté.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez avec la prière du père de l\'enfant épileptique : "Je crois, Seigneur ; viens en aide à mon peu de foi !" Que cette prière honnête soit la vôtre.',
      },
    ],
  },
  {
    id: 'esperance',
    title: 'L\'Espérance',
    subtitle: 'Vivre tourné vers la promesse',
    durationMin: 8,
    theme: 'Espérance',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'L\'espérance chrétienne n\'est pas un optimisme vague mais une certitude fondée sur les promesses de Dieu. Disposez votre cœur à recevoir cette vertu théologale.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"L\'espérance ne trompe pas, parce que l\'amour de Dieu a été répandu dans nos cœurs par le Saint-Esprit qui nous a été donné." (Rm 5,5) Paul fonde l\'espérance sur la certitude de l\'amour de Dieu déjà donné. L\'espérance n\'attend pas les preuves : elle avance parce qu\'elle sait que Dieu tient ses promesses.',
        instruction: 'L\'espérance est une vertu active et combative.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Identifiez une situation dans votre vie ou dans le monde qui semble sans issue. Maintenant, cherchez des signes d\'espérance dans cette situation : de petites lumières, des gestes de bien, des changements lents mais réels. Dites à Dieu : "Seigneur, je choisis d\'espérer avec toi dans cette situation."',
        instruction: 'L\'espérance voit dans l\'obscurité.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'En quoi votre espérance est-elle différente d\'un simple optimisme naturel ? Qu\'est-ce qui vous donne le plus d\'espérance dans votre vie de foi ?',
        instruction: 'L\'espérance chrétienne se nourrit de la promesse de Pâques.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par la prière pour les défunts qui exprime notre espérance : "Donne-leur le repos éternel, Seigneur, et que la lumière sans fin les illumine." L\'espérance est aussi pour ceux qui nous ont précédés.',
      },
    ],
  },
  {
    id: 'esprit-saint',
    title: 'L\'Esprit Saint',
    subtitle: 'Invoquer le Consolateur et l\'Ami',
    durationMin: 8,
    theme: 'Trinité',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'L\'Esprit Saint est le Consolateur, l\'Ami intérieur, le souffle de Dieu en nous. Commencez par une invocation simple : "Viens, Esprit Saint, remplis le cœur de tes fidèles."',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"L\'Esprit vient en aide à notre faiblesse, car nous ne savons pas ce qu\'il convient de demander dans nos prières. Mais l\'Esprit lui-même intercède en notre faveur par des soupirs inexprimables." (Rm 8,26) Quand nous ne savons plus prier, c\'est l\'Esprit qui prie en nous. Nous ne prions jamais seuls.',
        instruction: 'L\'Esprit est plus près de nous que nous-mêmes.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Priez le Veni Creator ou simplement : "Esprit Saint, guide-moi. Éclaire mon intelligence, réchauffe mon cœur, fortifie ma volonté." Puis restez en silence et soyez attentif aux mouvements intérieurs : consolation, paix, lumière, désir de bien. Ce sont souvent des signes de l\'action de l\'Esprit.',
        instruction: 'L\'Esprit agit dans le silence de notre cœur.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quel fruit de l\'Esprit (amour, joie, paix, patience, bonté, bienveillance, foi, douceur, maîtrise de soi) avez-vous le plus besoin de développer en ce moment ?',
        instruction: 'Les fruits de l\'Esprit sont les signes de sa présence.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Concluez : "Esprit de Dieu, sois le Maître de ma vie. Que tes fruits grandissent en moi et débordent sur ceux que je rencontrerai." Repartez avec la docilité de Marie.',
      },
    ],
  },
  {
    id: 'silence-contemplation',
    title: 'Silence et Contemplation',
    subtitle: 'Se laisser regarder par Dieu',
    durationMin: 8,
    theme: 'Contemplation',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Jean Vianney disait du vieux paysan qui priait en silence : "Je le regarde, il me regarde." La contemplation commence quand on cesse de parler et qu\'on se laisse simplement regarder par Dieu.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Sois tranquille et sache que je suis Dieu." (Ps 46,11) Dans notre monde agité, le silence est une forme de courage spirituel. La contemplation n\'est pas une technique mais une relation : être là, nu et vrai devant Dieu, sans faire, sans chercher à produire.',
        instruction: 'Le silence est la langue maternelle de Dieu.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Fermez les yeux. Mettez-vous simplement en présence de Dieu. Ne dites rien. N\'essayez pas de sentir quelque chose. Soyez là, disponible. Si des pensées viennent, laissez-les passer comme des nuages. Revenez à la présence par un mot simple : "Seigneur" ou "Tu es là." Restez dans ce silence aimant.',
        instruction: 'Être simplement là, c\'est déjà prier.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Comment vivez-vous le silence dans votre prière ? Vous semble-t-il vide ou fécond ? Qu\'est-ce qui vous aide à entrer dans la contemplation ?',
        instruction: 'Le silence prie pour nous quand les mots s\'épuisent.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par : "Seigneur, apprends-moi à me taire et à t\'écouter. Je veux être de plus en plus à toi, dans le silence de mon cœur."',
      },
    ],
  },
  {
    id: 'conversion',
    title: 'La Conversion du cœur',
    subtitle: 'Toujours revenir à Dieu',
    durationMin: 8,
    theme: 'Conversion',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La conversion n\'est pas un événement unique mais un mouvement permanent de retour vers Dieu. Chaque jour nous offre une nouvelle occasion de tourner notre cœur vers lui.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Revenez à moi de tout votre cœur, avec des jeûnes, des pleurs et des lamentations. Déchirez vos cœurs et non vos vêtements, et revenez à l\'Éternel, votre Dieu." (Joël 2,12-13) Dieu appelle toujours à la conversion intérieure, au déchirement du cœur plutôt qu\'aux pratiques extérieures.',
        instruction: 'La conversion est un retour aimé, non une humiliation.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Pensez à une habitude ou une attitude qui éloigne votre cœur de Dieu. Ne vous accablez pas. Présentez-la honnêtement à Dieu et dites : "Seigneur, je vois que ceci m\'éloigne de toi. Aide-moi à changer. Je ne peux pas par mes propres forces, mais tu es plus grand que mon péché." Prenez une résolution concrète et réaliste.',
        instruction: 'Une résolution humble vaut mieux que cent intentions.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quel aspect de votre vie spirituelle appelle le plus à une conversion en ce moment ? Quels obstacles empêchent cette conversion ? Quels soutiens vous aident ?',
        instruction: 'La conversion est un chemin, pas une destination.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par la prière du psalmiste : "Crée en moi un cœur pur, ô Dieu, renouvelle en moi un esprit bien disposé." Repartez avec ce désir de renouveau.',
      },
    ],
  },
  {
    id: 'eucharistie',
    title: 'L\'Eucharistie',
    subtitle: 'Le pain de vie pour le chemin',
    durationMin: 8,
    theme: 'Sacrements',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'L\'Eucharistie est le cœur de la vie chrétienne. Même quand vous n\'êtes pas à la messe, vous pouvez faire une communion spirituelle, unirez votre cœur à Jésus présent dans l\'Eucharistie.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Je suis le pain de vie. Celui qui vient à moi n\'aura jamais faim, et celui qui croit en moi n\'aura jamais soif." (Jn 6,35) Jésus se donne comme nourriture. L\'Eucharistie n\'est pas un symbole mais une présence réelle. Chaque messe est un mémorial vivant de la mort et de la résurrection.',
        instruction: 'Méditez sur le don total de Jésus dans l\'Eucharistie.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Faites une communion spirituelle : "Jésus, je crois que tu es présent dans l\'Eucharistie. Je n\'ai pas accès à toi en ce moment, mais je te désire. Viens dans mon cœur spirituellement. Je t\'offre ma vie entière." Restez quelques minutes en silence avec ce désir de Jésus dans votre cœur.',
        instruction: 'Le désir de Dieu est déjà une forme de communion.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Quelle place l\'Eucharistie tient-elle dans votre vie spirituelle ? Qu\'est-ce qui nourrit le plus votre désir de recevoir Jésus dans la communion ?',
        instruction: 'L\'Eucharistie est source et sommet de la vie chrétienne.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par l\'acte de consécration spirituelle : "Je suis à toi, Seigneur, dans la communion de toute l\'Église. Que ta présence transforme ma vie et me rende eucharistique pour les autres."',
      },
    ],
  },
  {
    id: 'pardon',
    title: 'Le Pardon',
    subtitle: 'Libérer et être libéré',
    durationMin: 8,
    theme: 'Miséricorde',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Le pardon est l\'un des actes les plus difficiles et les plus libérateurs de la vie chrétienne. Il ne minimise pas la blessure mais refuse de la laisser empoisonner notre cœur.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Pardonnez-vous mutuellement, comme Dieu vous a pardonné en Christ." (Ep 4,32) Le pardon chrétien n\'est pas une capitulation mais un choix libre d\'amour. Il ne dépend pas des actes de l\'autre. Il est un acte de la volonté, une grâce que Dieu nous donne si nous la demandons.',
        instruction: 'Le pardon libère celui qui pardonne autant que celui qui reçoit.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Pensez à quelqu\'un qui vous a blessé et à qui vous n\'avez pas encore pardonné. Ne forcez pas les sentiments. Dites simplement : "Seigneur, je ne peux pas encore pardonner de moi-même. Donne-moi la grâce de désirer pardonner." Si vous pouvez aller plus loin, dites : "Je choisis de ne pas garder cette blessure contre [prénom]."',
        instruction: 'Le pardon est un processus, pas un interrupteur.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Y a-t-il quelqu\'un dans votre vie que vous n\'avez pas encore pardonné ? Avez-vous besoin de demander pardon à quelqu\'un ? Avez-vous pleinement accepté le pardon de Dieu pour vous-même ?',
        instruction: 'Le pardon de soi est souvent le plus difficile.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez avec les paroles de Jésus sur la croix : "Père, pardonne-leur, car ils ne savent pas ce qu\'ils font." Demandez la grâce de porter ce même amour en vous.',
      },
    ],
  },
  {
    id: 'creation',
    title: 'La Louange pour la création',
    subtitle: 'Dieu parle à travers la beauté du monde',
    durationMin: 8,
    theme: 'Louange',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Saint François d\'Assise voyait Dieu dans chaque créature. La création est le premier livre de Dieu, écrit avant la Bible. Ouvrez les yeux de votre âme à cette révélation.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Les cieux racontent la gloire de Dieu, et l\'étendue céleste annonce l\'œuvre de ses mains." (Ps 19,2) Le Cantique de Frère Soleil de François d\'Assise loue Dieu pour le frère Soleil, la sœur Lune, le frère Vent, la sœur Eau. Toute créature est un reflet de la beauté de Dieu.',
        instruction: 'La beauté du monde est un sacrement de Dieu.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Visualisez votre élément naturel préféré : une montagne, la mer, un arbre, le ciel étoilé. Contemplez-le intérieurement en détail. Puis dites : "Seigneur, à travers cette beauté, tu me parles de toi. Merci pour ce cadeau." Méditez sur la responsabilité de prendre soin de la création.',
        instruction: 'Laudato si : prendre soin de la maison commune.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Dans quelle réalité naturelle ressentez-vous le plus facilement la présence de Dieu ? Comment votre foi nourrit-elle votre rapport à la création ?',
        instruction: 'La contemplation de la nature est une école spirituelle.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par le début du Cantique de Frère Soleil : "Loué sois-tu, mon Seigneur, avec toutes tes créatures, spécialement Messire Frère Soleil." Repartez avec des yeux émerveillés.',
      },
    ],
  },
  {
    id: 'service',
    title: 'Le Service',
    subtitle: 'Servir Dieu dans le prochain',
    durationMin: 8,
    theme: 'Service',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Jésus a lavé les pieds de ses disciples. Il a dit : "Je suis venu non pour être servi, mais pour servir." Méditez sur cette révolution spirituelle : la grandeur dans le service.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Car j\'ai eu faim, et vous m\'avez donné à manger ; j\'ai eu soif, et vous m\'avez donné à boire ; j\'étais étranger, et vous m\'avez recueilli. En vérité, je vous le dis, chaque fois que vous avez fait cela à l\'un de ces plus petits qui sont mes frères, c\'est à moi que vous l\'avez fait." (Mt 25,35.40)',
        instruction: 'Jésus se cache dans les pauvres et les petits.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Faites la liste des occasions de service dans votre vie quotidienne : au travail, en famille, dans votre voisinage. Choisissez un service concret que vous pourrez rendre aujourd\'hui ou cette semaine. Demandez à Dieu la grâce de le faire avec amour et sans chercher la reconnaissance.',
        instruction: 'Le service aimant est la plus haute prière.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Servez-vous par devoir ou par amour ? Qu\'est-ce qui transforme un acte ordinaire en acte de charité ? Y a-t-il un service que vous tardez à rendre ?',
        instruction: 'L\'amour se prouve par des actes, non des paroles.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par la prière de la mère Teresa : "Seigneur, utilise-moi comme instrument de ta paix et de ton amour pour ceux que je rencontrerai." Repartez avec les mains et le cœur ouverts.',
      },
    ],
  },
  {
    id: 'lectio-divina-evangile',
    title: 'Lectio Divina sur l\'Évangile',
    subtitle: 'Laisser Jésus nous parler personnellement',
    durationMin: 8,
    theme: 'Parole de Dieu',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Dans la Lectio Divina, nous ne lisons pas pour comprendre intellectuellement mais pour rencontrer une Personne. Jésus vous parle personnellement à travers l\'Évangile. Ouvrez votre cœur.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Venez à moi, vous tous qui vous sentez fatigués et accablés, et je vous donnerai du repos. Prenez mon joug sur vous et laissez-moi vous enseigner, car je suis doux et humble de cœur, et vous trouverez le repos de vos âmes." (Mt 11,28-29) Jésus invite tous ceux qui sont épuisés.',
        instruction: 'Lisez ce texte comme une invitation personnelle.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Entrez dans la scène évangélique : vous êtes dans la foule, fatigué, peut-être découragé. Jésus vous regarde et vous dit ces mots. Que ressentez-vous ? Répondez-lui simplement, en vos propres mots. Qu\'est-ce que vous portez en ce moment et que vous voudriez lui remettre ?',
        instruction: 'Laissez l\'Évangile devenir une rencontre vivante.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'De quoi êtes-vous le plus fatigué en ce moment ? Comment vivez-vous l\'invitation de Jésus à vous reposer en lui ? Qu\'est-ce que prendre son "joug léger" signifie concrètement pour vous ?',
        instruction: 'Laissez l\'Évangile vous interroger et vous consoler.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par : "Seigneur Jésus, je viens à toi avec tout ce que je suis. Donne-moi ton repos et ton doux joug." Repartez avec ce verset comme compagnon de route.',
      },
    ],
  },
  {
    id: 'priere-matin',
    title: 'L\'Offrande du matin',
    subtitle: 'Consacrer sa journée à Dieu',
    durationMin: 8,
    theme: 'Prière',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'Le matin est un moment privilégié pour offrir à Dieu la journée qui commence. Avant d\'entrer dans l\'action, prenez quelques instants pour vous orienter vers Lui.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"De bon matin, exauce ma voix ; de bon matin, je me prépare pour toi, et j\'attends." (Ps 5,4) Le Psalmiste commence sa journée par la prière. Les saints et les mystiques soulignent l\'importance de "prendre le temps de Dieu" avant de prendre le temps du monde. C\'est un acte de souveraineté spirituelle.',
        instruction: 'La prière du matin oriente toute la journée.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Faites l\'offrande du matin : "Seigneur, je t\'offre cette journée. Mes joies et mes peines, mon travail et mes repos, mes succès et mes échecs, tout est pour toi et avec toi. Prends cette journée et fais-en quelque chose de beau pour ton Royaume." Puis, confiez une intention particulière pour ce jour.',
        instruction: 'Offrir sa journée, c\'est sanctifier le temps.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Avez-vous une pratique de prière matinale régulière ? Qu\'est-ce qui vous en éloigne ? Comment pourriez-vous intégrer ce temps de Dieu dans votre routine quotidienne ?',
        instruction: 'La fidélité dans les petites choses construit la vie spirituelle.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par : "Que ton Esprit me guide à chaque pas de cette journée. Je veux vivre pour toi, avec toi, en toi." Repartez missionnaire dans votre quotidien.',
      },
    ],
  },
  {
    id: 'trinite',
    title: 'La Sainte Trinité',
    subtitle: 'Entrer dans la communion de l\'amour divin',
    durationMin: 8,
    theme: 'Trinité',
    steps: [
      {
        type: 'intro',
        durationSec: 30,
        text: 'La Trinité est le mystère central de la foi chrétienne. Elle nous révèle que Dieu n\'est pas seul mais communion, relation, amour. Nous sommes baptisés dans ce mystère.',
      },
      {
        type: 'reading',
        durationSec: 120,
        text: '"Car Dieu a tellement aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle." (Jn 3,16) Ce verset révèle la Trinité en action : le Père donne, le Fils est donné, et l\'Esprit réalise cette vie éternelle en nous.',
        instruction: 'La Trinité est amour en acte.',
      },
      {
        type: 'practice',
        durationSec: 150,
        text: 'Priez successivement les trois Personnes divines. Au Père : "Père, merci de m\'avoir créé et aimé de toute éternité." Au Fils : "Jésus, merci d\'être venu me chercher et de m\'avoir racheté." À l\'Esprit : "Esprit Saint, merci de vivre en moi et de me transformer." Terminez par le signe de croix fait lentement et avec foi.',
        instruction: 'Le signe de croix est une prière trinitaire complète.',
      },
      {
        type: 'reflection',
        durationSec: 60,
        text: 'Vers quelle Personne de la Trinité êtes-vous le plus naturellement attiré dans votre prière ? Comment chaque Personne divine vous est-elle présente différemment ?',
        instruction: 'Chaque Personne divine nous révèle un visage de l\'amour.',
      },
      {
        type: 'closing',
        durationSec: 30,
        text: 'Terminez par la doxologie trinitaire : "Gloire au Père, au Fils et au Saint-Esprit, comme il était au commencement, maintenant et toujours, dans les siècles des siècles. Amen."',
      },
    ],
  },
];
