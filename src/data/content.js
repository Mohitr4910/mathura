/* =====================================================================
   ALL EDITABLE CONTENT LIVES HERE  (text, prices, images, links)
   ---------------------------------------------------------------------
   1. Change the BRAND block first (name, city, year, WhatsApp number).
   2. Images are Unsplash URLs. If one fails to load, the site automatically
      falls back to a local image from /public/images (fb-1 ... fb-8.webp).
      Replace any `img(...)` call with your own '/images/my-photo.webp'.
   ===================================================================== */

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

// A pool of Unsplash photo ids (Indian sweets / mithai / festive). Swap freely.
export const PHOTO_IDS = [
  '1601050690597-df0568f70950', // mithai platter
  '1589301760014-d929f3979dbc', // ladoo
  '1666190050470-a9aa1bc0f3a5', // jalebi
  '1610192244261-3f33de3f55e4', // gulab jamun
  '1606491048802-8342506d6471', // barfi
  '1631452180519-c014fe946bc7', // diwali sweets
  '1567337710282-00832b415979', // sweets in bowl
  '1578985545062-69928b1d9587', // festive dessert
  '1599599810769-bcde5a160d32', // dry fruits
  '1558961363-fa8fdf82db35', // sweets table
];
// USE_LOCAL_PHOTOS = true -> uses the mithai crops in /public/images (always correct).
// Set to false to load the Unsplash ids above instead (check each one yourself).
export const USE_LOCAL_PHOTOS = true;
export const FALLBACK_COUNT = 12;
export const photo = (n, w = 800, h = 600) =>
  USE_LOCAL_PHOTOS ? `/images/fb-${(n % FALLBACK_COUNT) + 1}.webp` : unsplash(PHOTO_IDS[n % PHOTO_IDS.length], w, h); // /images/fb-1.webp ... fb-8.webp

/* ------------------------------ BRAND ------------------------------ */
export const BRAND = {
  name: 'Mathura Mithai Wala',
  short: 'Mathura',
  sub: 'Mithai Wala',
  city: 'Bhopal',
  established: 1974,
  // International format, digits only, NO plus sign. e.g. 919876543210
  whatsapp: '919999999999',
  phoneDisplay: '+91 99999 99999',
  email: 'hello@mathuramithaiwala.in',
  address: 'Shop No. 12, Sarafa Bazaar Road, Old City, Bhopal, Madhya Pradesh 462001',
  timings: [
    { days: 'Monday – Saturday', hours: '8:00 AM – 10:30 PM' },
    { days: 'Sunday', hours: '8:00 AM – 11:00 PM' },
    { days: 'Festival weeks', hours: '6:30 AM – 12:00 AM' },
  ],
  // Google Maps embed (no API key needed). Replace `q=` with your exact shop address / Plus Code.
  mapEmbed: 'https://maps.google.com/maps?q=Sarafa+Bazaar+Bhopal&t=&z=14&ie=UTF8&iwloc=&output=embed',
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'YouTube', href: 'https://youtube.com/' },
  ],
};

export const waLink = (text) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;

/* ------------------------------ NAV ------------------------------ */
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------ HERO STORY ------------------------------ */
export const HERO = {
  tagline: 'Mithaas jo dil tak pahunche',
  scrollLabel: 'Scroll',
  chapters: [
    { n: '01', label: 'Swagat' },
    { n: '02', label: 'Kahani' },
    { n: '03', label: 'Shuddhta' },
    { n: '04', label: 'Tyohaar' },
    { n: '05', label: 'Order' },
  ],
  // Interludes: extra scroll scenes that sit between the main chapters
  ingredients: {
    eyebrow: 'Chuni Hui Saamagri',
    title: 'Sirf asli cheezein. Koi shortcut nahi.',
    items: [
      { n: '01', name: 'Gaay ka Desi Ghee', text: 'Har kadhai mein shuddh, dhimi aanch par' },
      { n: '02', name: 'Kesar', text: 'Rang aur khushboo, bina kisi artificial colour ke' },
      { n: '03', name: 'Pista & Badam', text: 'Haath se chune, taaza kate hue' },
      { n: '04', name: 'Taaza Doodh', text: 'Roz subah ka, apna khoya aur chhena' },
      { n: '05', name: 'Elaichi', text: 'Seedhe pisi hui, dabbe wali nahi' },
      { n: '06', name: 'Chaandi Warq', text: 'Sirf shuddh, khaane laayak' },
    ],
  },
  process: {
    eyebrow: 'Kadhai Se Dibbe Tak',
    title: 'Ek mithai ka safar.',
    steps: [
      { time: '4:00 AM', title: 'Kadhai chadhti hai', text: 'Halwai parivaar subah ki pehli aanch jalata hai.' },
      { time: '6:30 AM', title: 'Dheemi aanch', text: 'Ghee, doodh aur dheeraj — jaldbaazi bilkul nahi.' },
      { time: '9:00 AM', title: 'Haath ki kaarigari', text: 'Ladoo bandhna, warq lagana, pista sajana.' },
      { time: '11:00 AM', title: 'Taaza packing', text: 'Sundar dibbe mein, seedha aapke ghar ke liye.' },
    ],
  },
  planner: {
    eyebrow: 'Hamara Vaada',
    title: 'Tyohaar se pehle, hum taiyaar.',
    line: 'Bade orders aur hampers ke liye thoda pehle bata dijiye — hum poori planning sambhaal lenge.',
    items: [
      { name: 'Raksha Bandhan', when: 'Book 10 days ahead' },
      { name: 'Diwali', when: 'Book 15 days ahead' },
      { name: 'Holi', when: 'Book 7 days ahead' },
      { name: 'Eid', when: 'Book 7 days ahead' },
      { name: 'Wedding Season', when: 'Book 2–4 weeks ahead' },
    ],
  },
  ch2: {
    eyebrow: 'Hamari Kahani',
    title: 'Har mithai ek kahani hai.',
    lines: [
      `${BRAND.established} se hamare parivaar ke halwai apne haathon se mithai banate aa rahe hain — wahi purani vidhi, wahi dheemi aanch, wahi apnapan.`,
      'Kaju ki katli ho ya garam jalebi, har ek tukda dadi-nani ke swaad ki yaad dilata hai.',
    ],
  },
  ch3: {
    eyebrow: 'Shuddhta Ka Vachan',
    title: '100% Pure Desi Ghee. Zero Compromise.',
    counters: [
      { value: 50, suffix: '+', label: 'Years of Tradition' },
      { value: 100, suffix: '+', label: 'Varieties' },
      { value: 10000, suffix: '+', label: 'Happy Families' },
    ],
  },
  ch4: {
    eyebrow: 'Har Khushi Ke Saath',
    title: 'Tyohaar ho ya taiyaar, hum hain saath.',
    line: 'Diwali ke diyon se Rakhi ke dhaagon tak, Holi ki gujiya se Eid ki sheer tak — aur shaadi ke har shagun mein — Mathura Mithai Wala aapki khushi ka meetha hissa hai.',
    chips: ['Diwali', 'Rakhi', 'Holi', 'Eid', 'Shaadi'],
  },
  ch5: {
    eyebrow: 'Aaiye, Meetha Kijiye',
    title: 'Aapki mithaas, hamari zimmedari.',
    line: 'Taaza mithai, sundar dibbon mein — seedha aapke ghar tak.',
    primary: { label: 'Explore Menu', href: '#menu' },
    secondary: { label: 'Order on WhatsApp', text: 'Namaste! Mujhe Mathura Mithai Wala se mithai order karni hai.' },
  },
};

/* ------------------------------ STORY ------------------------------ */
export const STORY = {
  eyebrow: 'Our Story',
  title: 'Teen peedhiyon ka swaad, ek hi mithaas.',
  paragraphs: [
    `Humari kahani ${BRAND.established} mein Bhopal ki ek chhoti si bhatti se shuru hui. Pandit Ramswaroop ji ka ek hi usool tha — "mithai wahi, jo ghar jaisi lage." Na shortcut, na milawat, sirf shuddh desi ghee, taaza doodh aur dheeraj.`,
    'Aaj bhi hamari rasoi mein wahi kadhai, wahi halwai parivaar aur wahi subah 4 baje ki aanch hai. Fark sirf itna hai ki ab ye swaad hazaaron gharon ki dining table tak pahunchta hai.',
  ],
  image: photo(0, 1000, 1250),
  timelineTitle: 'Safar ke padav',
  timeline: [
    { year: BRAND.established, title: 'Pehli bhatti', text: 'Ek chhoti si dukaan, ek kadhai aur Pandit Ramswaroop ji ka sapna.' },
    { year: BRAND.established + 12, title: 'Pehli asli dukaan', text: 'Purane shehar mein pehli pakki dukaan — jahan Motichoor aur Kalakand ne naam kamaya.' },
    { year: BRAND.established + 24, title: 'Doosri peedhi', text: 'Parivaar ke bete ne kaman sambhali; desi ghee ki alag rasoi bani.' },
    { year: BRAND.established + 38, title: 'Festival hampers', text: 'Diwali aur Rakhi ke khaas dibbe, shaadiyon ke custom hampers shuru hue.' },
    { year: 'Aaj', title: 'Pan-India delivery', text: '10,000+ parivaar, 100+ varieties aur poore desh mein taaza delivery.' },
  ],
};

/* ------------------------------ SWEETS ------------------------------ */
export const CATEGORIES = [
  'Bengali Sweets',
  'Dry Fruit Mithai',
  'Ghee Sweets',
  'Barfi & Peda',
  'Namkeen',
  'Festival Boxes',
];

// Real product photos (public/images/sweets/<id>.webp). Add more ids here as you get photos.
export const SWEET_PHOTOS = {
  'kaju-katli': '/images/sweets/kaju-katli.webp',
  'motichoor-ladoo': '/images/sweets/motichoor-ladoo.webp',
  'gulab-jamun': '/images/sweets/gulab-jamun.webp',
  'pista-barfi': '/images/sweets/pista-barfi.webp',
  'soan-papdi': '/images/sweets/soan-papdi.webp',
  peda: '/images/sweets/peda.webp',
  'anjeer-roll': '/images/sweets/anjeer-roll.webp',
  'mysore-pak': '/images/sweets/mysore-pak.webp',
  rasmalai: '/images/sweets/rasmalai.webp',
  'khoya-barfi': '/images/sweets/khoya-barfi.webp',
};

let _n = 0;
const s = (id, name, cat, price, desc, unit = 'kg') => ({
  id, name, cat, price, desc, unit, img: SWEET_PHOTOS[id] || photo(_n++, 900, 700), fb: _n % FALLBACK_COUNT,
});

export const SWEETS = [
  // Bengali Sweets
  s('rasmalai', 'Rasmalai', 'Bengali Sweets', 640, 'Narm chhene ki tikkiyan, kesar-elaichi wali garam rabri mein dooba hua.'),
  s('rasgulla', 'Rasgulla', 'Bengali Sweets', 420, 'Doodh ke chhene se bane safed, rasile aur hawa jaise halke golgappe.'),
  s('sandesh', 'Sandesh', 'Bengali Sweets', 560, 'Taaze chhene aur mishri ka naazuk sandesh, pista ki sajaavat ke saath.'),
  s('chum-chum', 'Chum Chum', 'Bengali Sweets', 520, 'Malai se dhaka hua, nariyal ke boorey mein lipta hua kesariya chum chum.'),
  s('gulab-jamun', 'Gulab Jamun', 'Bengali Sweets', 460, 'Khoye ke garam jamun, ilaichi ki chaashni mein ghanton bheege hue.'),
  s('petha', 'Kesar Petha', 'Bengali Sweets', 380, 'Agra style paarbhashak petha, kesar aur gulab jal ki khushboo ke saath.'),
  // Dry Fruit Mithai
  s('kaju-katli', 'Kaju Katli', 'Dry Fruit Mithai', 1050, 'Pure kaju ki patli, chaandi ke warq wali katli — muh mein ghul jaane wali.'),
  s('anjeer-roll', 'Anjeer Roll', 'Dry Fruit Mithai', 1280, 'Anjeer aur kaju ki paratdaar roll, ghee mein halki bhuni hui.'),
  s('pista-barfi', 'Pista Barfi', 'Dry Fruit Mithai', 1400, 'Mote pista ke tukdon se bani hari, mulayam aur khushboodaar barfi.'),
  s('dry-fruit-ladoo', 'Dry Fruit Ladoo', 'Dry Fruit Mithai', 1180, 'Badam, kaju, akhrot aur khajoor ke ladoo — bina cheeni ke bhi meethe.'),
  s('badam-halwa', 'Badam Halwa', 'Dry Fruit Mithai', 1250, 'Dheemi aanch par ghee mein bhuna hua, kesar wala shahi badam halwa.'),
  s('kaju-pista-roll', 'Kaju Pista Roll', 'Dry Fruit Mithai', 1320, 'Kaju ki parat mein pista ki bharaai — tyohaar ka pasandida tohfa.'),
  // Ghee Sweets
  s('motichoor-ladoo', 'Motichoor Ladoo', 'Ghee Sweets', 480, 'Mehin boondi, desi ghee aur kesar — shagun ka sabse shubh ladoo.'),
  s('besan-ladoo', 'Besan Ladoo', 'Ghee Sweets', 520, 'Ghee mein dheere bhuna besan, ilaichi aur kaaju-kishmish ke saath.'),
  s('mysore-pak', 'Mysore Pak', 'Ghee Sweets', 560, 'Besan aur ghee ki chhidrayukt, muh mein ghul jaane wali dakshin ki shaan.'),
  s('soan-papdi', 'Soan Papdi', 'Ghee Sweets', 420, 'Resha-resha, hawa jaisi halki, ghee aur ilaichi se mehakti soan papdi.'),
  s('gajar-halwa', 'Gajar Halwa', 'Ghee Sweets', 600, 'Desi gajar, khoya aur ghee — sardiyon ki sabse garam yaadgaar.'),
  s('jalebi', 'Jalebi', 'Ghee Sweets', 360, 'Garam, kurkuri aur kesariya chaashni mein dubi — rabri ke saath best.'),
  s('imarti', 'Imarti', 'Ghee Sweets', 400, 'Urad dal ki phooldaar imarti, ghee mein tali aur gaadhi chaashni mein bheegi.'),
  s('ghewar', 'Malai Ghewar', 'Ghee Sweets', 780, 'Jaali-daar ghewar par malai aur kesar, Teej-Rakhi ka khaas swaad.'),
  s('balushahi', 'Balushahi', 'Ghee Sweets', 440, 'Parat-daar, ghee mein tali hui balushahi, upar se meethi chaashni ki chamak.'),
  // Barfi & Peda
  s('khoya-barfi', 'Khoya Barfi', 'Barfi & Peda', 620, 'Gaadhe khoye ki danedaar barfi, halki ilaichi aur chaandi ka warq.'),
  s('coconut-barfi', 'Coconut Barfi', 'Barfi & Peda', 480, 'Taaze nariyal aur doodh ki barfi, narm aur mithi.'),
  s('peda', 'Mathura Peda', 'Barfi & Peda', 560, 'Bhuna khoya, mishri aur ilaichi — Mathura ki asli paramparik peda.'),
  s('milk-cake', 'Milk Cake', 'Barfi & Peda', 600, 'Dheemi aanch par jamaaya hua, bhoora aur danedaar milk cake.'),
  s('kalakand', 'Kalakand', 'Barfi & Peda', 640, 'Phate doodh ka malaidar kalakand, upar se pista ki kataran.'),
  s('rabri', 'Kesar Rabri', 'Barfi & Peda', 540, 'Ghanton ubala hua doodh, kesar aur badam ki katran — thanda khayein.'),
  s('til-ladoo', 'Til Ladoo', 'Barfi & Peda', 460, 'Makar Sankranti ke til aur gur ke kurkure, sehat bhare ladoo.'),
  // Namkeen
  s('mathri', 'Mathri', 'Namkeen', 380, 'Ajwain-jeera wali khasta mathri, chai ke saath sabse achhi jodi.'),
  s('namak-pare', 'Namak Pare', 'Namkeen', 340, 'Kurkure, namkeen aur halke masaledaar — safar ka bharosemand saathi.'),
  s('boondi-ladoo', 'Boondi Ladoo', 'Ghee Sweets', 440, 'Choti boondi ke narm ladoo, mungfali aur kaju ke saath.'),
  s('bhujia', 'Bikaneri Bhujia', 'Namkeen', 360, 'Moth dal ki patli, teekhi aur kurkuri Bikaneri bhujia.'),
  s('khasta-kachori', 'Khasta Kachori', 'Namkeen', 420, 'Moong dal bhari, parat-daar aur garam khasta kachori.'),
  s('sev-mixture', 'Ratlami Sev Mixture', 'Namkeen', 380, 'Laung-kaali mirch wali Ratlami sev aur mixture ka chatpata mel.'),
  // Festival Boxes
  s('diwali-box', 'Diwali Shagun Box', 'Festival Boxes', 1499, 'Kaju katli, motichoor, soan papdi aur dry fruits — diya aur kandeel ke saath.', 'box'),
  s('rakhi-box', 'Rakhi Pyaar Box', 'Festival Boxes', 999, 'Rakhi, roli-chawal, ladoo aur barfi — bhai ke liye pyaar bhara tohfa.', 'box'),
  s('holi-box', 'Holi Gujiya Box', 'Festival Boxes', 899, 'Mawa gujiya, thandai mix aur gulaal — rangon ka meetha utsav.', 'box'),
  s('eid-box', 'Eid Mubarak Box', 'Festival Boxes', 1299, 'Kesar sewai, khajoor, dry fruits aur sheer khurma mix.', 'box'),
  s('wedding-box', 'Shaadi Hamper', 'Festival Boxes', 2499, 'Shagun ke liye dry fruit, mithai aur silver coin wala shahi hamper.', 'box'),
  s('assorted-box', 'Premium Assorted Box', 'Festival Boxes', 1799, '12 chuni hui mithaiyan ek sundar cream box mein — har mauke ka tohfa.', 'box'),
];

export const SIGNATURE_IDS = [
  'kaju-katli', 'motichoor-ladoo', 'gulab-jamun', 'rasmalai',
  'jalebi', 'peda', 'mysore-pak', 'badam-halwa',
];
export const SIGNATURE = {
  eyebrow: 'Signature Sweets',
  title: 'Jo har dil ko chhu jaaye.',
  lead: 'Hamare aath sabse pasandida swaad — jinke liye log door-door se aate hain.',
};
export const SIGNATURE_SWEETS = SIGNATURE_IDS.map((id) => SWEETS.find((x) => x.id === id));

export const MENU_COPY = {
  eyebrow: 'Full Menu',
  title: 'Har mithai, ek nazar mein.',
  lead: 'Prices per kg (festival boxes per box). Taaza roz banta hai — stock ke liye WhatsApp par pooch lein.',
};

/* ------------------------------ FESTIVALS ------------------------------ */
export const FESTIVAL_COPY = {
  eyebrow: 'Festival Specials',
  title: 'Har tyohaar ka apna swaad.',
  lead: 'Bulk aur corporate orders ke liye 10–15 din pehle bataiye.',
};
export const FESTIVALS = [
  { id: 'diwali', name: 'Diwali', tag: 'Roshni ka tyohaar', offer: 'Flat 10% off on 5 kg+', text: 'Kaju katli, motichoor aur dry fruit boxes — diyon se saji hui khaas packing.', img: photo(5, 700, 900) },
  { id: 'rakhi', name: 'Raksha Bandhan', tag: 'Bhai-behen ka pyaar', offer: 'Free rakhi with every box', text: 'Ghewar, kaju roll aur ladoo ke saath rakhi aur roli-chawal ka combo.', img: photo(1, 700, 900) },
  { id: 'holi', name: 'Holi', tag: 'Rangon ki mithaas', offer: 'Gujiya combo at ₹899', text: 'Mawa gujiya, malpua aur thandai — Holi ki masti ke liye.', img: photo(2, 700, 900) },
  { id: 'eid', name: 'Eid', tag: 'Mubarak ho Eid', offer: 'Sheer khurma kit free on 3 kg+', text: 'Kesar sewai, khajoor aur dry fruit — mehmaan-nawazi ke liye.', img: photo(8, 700, 900) },
  { id: 'wedding', name: 'Wedding Hampers', tag: 'Shaadi ka shagun', offer: 'Custom names & monogram free', text: 'Baraat-swagat se vidaai tak — personalised hampers, bulk discount ke saath.', img: photo(9, 700, 900) },
];

export const GIFTBOX = {
  eyebrow: 'Build Your Own Gift Box',
  title: 'Apna dibba, apni pasand.',
  lead: 'Apni pasand ki 4 mithaiyan chuniye — hum sundar box mein pack karke bhejenge.',
  slots: 4,
  optionIds: [
    'kaju-katli', 'motichoor-ladoo', 'gulab-jamun', 'pista-barfi',
    'soan-papdi', 'peda', 'anjeer-roll', 'mysore-pak', 'rasmalai', 'khoya-barfi',
  ],
};

/* ------------------------------ WHY US ------------------------------ */
export const WHY = {
  eyebrow: 'Why Choose Us',
  title: 'Swaad ke peeche ka vishwas.',
  items: [
    { icon: 'ghee', title: 'Pure Desi Ghee', text: 'Sirf gaay ka shuddh desi ghee. Vanaspati ya palm oil ka naam-o-nishaan nahi.' },
    { icon: 'fresh', title: 'Fresh Daily', text: 'Roz subah taaza banti hai, shaam ko bachi mithai alag. Kal ki mithai aaj nahi.' },
    { icon: 'leaf', title: 'No Preservatives', text: 'Koi artificial rang, flavour ya preservative nahi — sirf asli saamagri.' },
    { icon: 'clean', title: 'Hygienic Kitchen', text: 'Saaf-suthri rasoi, gloves, caps aur regular safai audit ke saath.' },
    { icon: 'custom', title: 'Custom Orders', text: 'Naam, logo aur pasand ki mithai — shaadi aur corporate gifts ke liye bhi.' },
    { icon: 'truck', title: 'Pan-India Delivery', text: 'Surakshit packing, tez courier — poore Bharat mein taaza pahunche.' },
  ],
};

/* ------------------------------ GALLERY ------------------------------ */
export const GALLERY = {
  eyebrow: 'Behind the Kitchen',
  title: 'Rasoi ke andar ki jhalak.',
  items: [
    { src: photo(0, 800, 1000), w: 800, h: 1000, alt: 'Halwai preparing mithai on a large kadhai', caption: 'Subah 4 baje ki pehli kadhai' },
    { src: photo(1, 800, 600), w: 800, h: 600, alt: 'Freshly rolled motichoor ladoo', caption: 'Haath se bandhe ladoo' },
    { src: photo(2, 800, 800), w: 800, h: 800, alt: 'Golden jalebi being fried in ghee', caption: 'Garam jalebi, seedhe ghee se' },
    { src: photo(3, 800, 1100), w: 800, h: 1100, alt: 'Gulab jamun in sugar syrup', caption: 'Chaashni mein dubi hui khushiyan' },
    { src: photo(4, 800, 600), w: 800, h: 600, alt: 'Silver-leaf covered barfi slices', caption: 'Chaandi ka warq, haath se' },
    { src: photo(5, 800, 900), w: 800, h: 900, alt: 'Diwali gift boxes arranged for packing', caption: 'Diwali dibbon ki packing' },
    { src: photo(6, 800, 700), w: 800, h: 700, alt: 'Assorted Indian sweets in a bowl', caption: 'Taaza thaal, roz' },
    { src: photo(7, 800, 1000), w: 800, h: 1000, alt: 'Festive Indian dessert table', caption: 'Tyohaar ki saj-dhaj' },
    { src: photo(8, 800, 650), w: 800, h: 650, alt: 'Dry fruits used for mithai', caption: 'Chuna hua kaju, badam, pista' },
  ],
};

/* ------------------------------ REVIEWS ------------------------------ */
export const REVIEWS_COPY = { eyebrow: 'Reviews', title: 'Parivaaron ka pyaar.' };
export const REVIEWS = [
  { name: 'Anjali Sharma', city: 'Bhopal', stars: 5, text: 'Diwali par 5 kg kaju katli li thi — ek bhi tukda bachne nahi paya. Ghee ki khushboo aur swaad bilkul ghar jaisa.' },
  { name: 'Rohit Verma', city: 'Indore', stars: 5, text: 'Rakhi box time par aur ekdum fresh pahuncha. Behen ko bahut pasand aaya. Packing premium thi.' },
  { name: 'Priya Nair', city: 'Mumbai', stars: 5, text: 'Delivery pan-India sach mein kaam karti hai. Mysore Pak mumbai tak bina toote, taaza pahuncha.' },
  { name: 'Imran Khan', city: 'Hyderabad', stars: 4, text: 'Eid ke liye sewai aur dry fruit box mangwaya. Mehmaan sab tareef karte rahe. Agli baar bulk order denge.' },
  { name: 'Sunita Agrawal', city: 'Jabalpur', stars: 5, text: 'Beti ki shaadi ke hampers custom naam ke saath bane. Har rishtedaar ne poocha — kahan se banwaya?' },
  { name: 'Deepak Joshi', city: 'Delhi', stars: 5, text: 'Motichoor ladoo mein wahi purana swaad hai jo bachpan mein dadi ke ghar milta tha.' },
  { name: 'Kavita Mishra', city: 'Nagpur', stars: 5, text: 'Rasmalai itni narm ki muh mein ghul jaaye. Bina preservative ka saaf-saaf pata chalta hai.' },
  { name: 'Arjun Patel', city: 'Ahmedabad', stars: 4, text: 'Office ke liye 50 dibbe mangwaye. Time par aur sundar packing mein mile. WhatsApp par response bhi turant.' },
];

/* ------------------------------ FAQ ------------------------------ */
export const FAQ_COPY = { eyebrow: 'FAQ', title: 'Frequently asked questions.' };
export const FAQS = [
  { q: 'Kya aap poore India mein delivery karte hain?', a: 'Ji haan. Hum poore Bharat mein secure packing ke saath courier karte hain. Bhopal aur aas-paas ke shehron mein same-day delivery bhi uplabdh hai. Delivery charge pin code ke hisaab se lagta hai.' },
  { q: 'Mithai kitne din tak taaza rehti hai?', a: 'Doodh ki mithai (rasmalai, rasgulla, kalakand) 2–3 din fridge mein. Ghee ki mithai (ladoo, soan papdi, mysore pak) 10–15 din. Dry fruit mithai aur namkeen 15–30 din. Har dibbe par best-before likha hota hai.' },
  { q: 'Bulk ya shaadi ke order kaise karein?', a: '50 kg se upar ya shaadi ke orders ke liye kam se kam 7–10 din pehle WhatsApp par bataiye. Hum sample, quote aur bulk discount ke saath poori planning mein madad karte hain.' },
  { q: 'Kya main apna custom gift box bana sakta hoon?', a: 'Bilkul. "Build your own gift box" mein 4 mithaiyan chuniye ya WhatsApp par bataiye. Naam, logo aur greeting card bhi lagwa sakte hain.' },
  { q: 'Payment ke kaun se tareeke hain?', a: 'UPI (GPay, PhonePe, Paytm), debit/credit card, net banking aur dukaan par cash. Bade orders par 50% advance aur baaki delivery se pehle.' },
  { q: 'Festival hampers kab tak book karne chahiye?', a: 'Diwali aur Rakhi ke hampers kam se kam 10–15 din pehle book kar lijiye kyunki us samay maang bahut badh jaati hai. Early-bird offers WhatsApp par milte hain.' },
];

/* ------------------------------ CONTACT / FOOTER ------------------------------ */
export const CONTACT = {
  eyebrow: 'Contact',
  title: "Let's talk sweets.",
  occasions: ['Diwali', 'Raksha Bandhan', 'Holi', 'Eid', 'Wedding', 'Birthday / Anniversary', 'Corporate Gifting', 'Just because'],
};

export const FOOTER = {
  blurb: 'Teen peedhiyon se shuddh desi ghee ki mithai. Haath se bani, dil se parosi.',
  newsletter: 'Festival offers seedha aapke inbox mein.',
  copyright: `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`,
};
