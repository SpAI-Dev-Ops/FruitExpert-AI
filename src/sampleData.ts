import { FruitAnalysis } from "./types";

export const sampleFruits: Record<string, FruitAnalysis & { image: string }> = {
  dragon_fruit: {
    commonName: "Dragon Fruit",
    scientificName: "Selenicereus undatus",
    confidence: 100,
    originHistory: "Originally native to southern Mexico and Central America, dragon fruit (or pitaya) was introduced to Southeast Asia by the French in the 19th century. Today, it is widely grown in tropical regions globally, particularly in Vietnam, Thailand, and Colombia, where it is treated as a major commercial crop.",
    physicalCharacteristics: "Bright pink or yellow scaly outer skin with a crown of green leaves. The inner flesh can be vibrant white or deep magenta, speckled with thousands of tiny, edible black seeds. It has a mild, refreshing sweet taste, comparable to a blend of kiwi, pear, and watermelon, with a crunchy yet juicy texture.",
    nutritionalValue: {
      vitamins: ["Vitamin C (Ascorbic Acid)", "Vitamin B2 (Riboflavin)", "Vitamin B3 (Niacin)"],
      minerals: ["Iron", "Magnesium", "Calcium", "Phosphorus"],
      healthBenefits: [
        "High in antioxidants like betalains and carotenoids that combat oxidative stress.",
        "Rich in dietary fiber, promoting healthy digestion and gut microbiome.",
        "Provides prebiotics to fuel beneficial gut bacteria.",
        "Supports immune health due to its significant Vitamin C content."
      ],
      caloriesPer100g: 60
    },
    varieties: [
      "White Pitaya (Selenicereus undatus): Pink skin, white flesh (most common)",
      "Red Pitaya (Selenicereus costaricensis): Pink skin, vibrant magenta flesh (sweeter, rich in betalains)",
      "Yellow Pitaya (Selenicereus megalanthus): Yellow thorny skin, translucent white flesh (sweetest variety)"
    ],
    culinaryUsesStorage: "Best enjoyed fresh, chilled, and sliced in half to spoon out the flesh. Frequently used in smoothie bowls, tropical salads, sorbets, and fruit platters. Storage: Store whole at room temperature for up to 3 days, or refrigerate in a plastic bag for up to 2 weeks. Once cut, wrap tightly and consume within 2 days.",
    topProducers: [
      { country: "Vietnam", quantity: "1,200,000 Metric Tons", valueNumeric: 1200 },
      { country: "China", quantity: "900,000 Metric Tons", valueNumeric: 900 },
      { country: "Indonesia", quantity: "380,000 Metric Tons", valueNumeric: 380 },
      { country: "Thailand", quantity: "120,000 Metric Tons", valueNumeric: 120 },
      { country: "Colombia", quantity: "85,000 Metric Tons", valueNumeric: 85 }
    ],
    globalLeader: "Vietnam",
    majorExporters: ["Vietnam", "Thailand", "Colombia", "Ecuador"],
    growingConditions: "Thrives in subtropical and tropical climates with dry winters and wet summers. Requires sandy-loam, well-draining soils and sturdy trellis support systems since it is a climbing cacti. Ideal temperature range is 20°C to 30°C. Heavy frosts can kill the plant.",
    seasonality: "Mainly June to November (Peak Summer/Autumn in the Northern Hemisphere), though some tropical zones produce year-round.",
    interestingFacts: [
      "The stunning large white flowers of the dragon fruit plant only bloom for a single night, earned the nickname 'Moonflower' or 'Queen of the Night'.",
      "They rely heavily on bats and moths for nocturnal pollination.",
      "Because it is a cactus, it is extremely water-efficient and drought-tolerant compared to other fruit trees."
    ],
    healthWarnings: "Generally extremely safe. Rarely, consuming large amounts of red-fleshed pitaya can cause pseudohematuria, a harmless reddish coloration of urine or stool.",
    image: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=800&auto=format&fit=crop&q=80"
  },
  mango: {
    commonName: "Mango",
    scientificName: "Mangifera indica",
    confidence: 100,
    originHistory: "Cultivated for over 4,000 years in South Asia, particularly India and Myanmar, the mango is deeply embedded in cultural and religious folklore. It spread along trade routes to East Asia, Africa, and South America. Today, it is revered as the 'King of Fruits' across many cultures.",
    physicalCharacteristics: "Variable shapes ranging from oval to kidney-shaped. The smooth skin can be green, yellow, orange, red, or multi-hued. The juicy, fibrous or smooth golden-yellow flesh surrounds a single flat, woody pit. It offers a rich, sweet tropical taste profile with floral and peach-like undertones.",
    nutritionalValue: {
      vitamins: ["Vitamin A (Beta-carotene)", "Vitamin C (Ascorbic Acid)", "Vitamin B6 (Pyridoxine)", "Vitamin E"],
      minerals: ["Potassium", "Copper", "Folate", "Magnesium"],
      healthBenefits: [
        "Promotes eye health due to exceptionally high Vitamin A and beta-carotene levels.",
        "Aids digestion with amylase enzymes that break down complex starch.",
        "Contains mangiferin, a unique bioactive antioxidant with anti-inflammatory properties.",
        "Supports skin health and collagen production."
      ],
      caloriesPer100g: 60
    },
    varieties: [
      "Alphonso (India): Known for rich, creamy, non-fibrous saffron pulp (The King of Kings)",
      "Ataulfo / Honey (Mexico): Sweet, buttery, fiberless, small yellow fruit",
      "Tommy Atkins (Florida/Brazil): Mildly sweet, highly fibrous, excellent shelf-life, widely exported",
      "Keitt (US/Mexico): Large, green-skinned with high pulp yield and late-season availability"
    ],
    culinaryUsesStorage: "Eaten fresh by cutting cheeks around the pit, cubing, and flipping inside-out ('hedgehog' cut). Used in salsas, mango sticky rice, lassis, chutneys, and dried snacks. Storage: Keep unripe mangoes at room temperature to ripen. Once soft, transfer to the refrigerator for up to 5 days.",
    topProducers: [
      { country: "India", quantity: "24,700,000 Metric Tons", valueNumeric: 24700 },
      { country: "China", quantity: "3,800,000 Metric Tons", valueNumeric: 3800 },
      { country: "Indonesia", quantity: "3,100,000 Metric Tons", valueNumeric: 3100 },
      { country: "Pakistan", quantity: "2,300,000 Metric Tons", valueNumeric: 2300 },
      { country: "Mexico", quantity: "2,100,000 Metric Tons", valueNumeric: 2100 }
    ],
    globalLeader: "India (accounting for roughly 45% of total global production)",
    majorExporters: ["Mexico", "Brazil", "India", "Peru", "Thailand"],
    growingConditions: "Thrives in warm frost-free climates (zones 10-11). Requires a distinct dry season of at least 3 months to trigger heavy flowering and fruit set. Prefer deep, rich, well-aerated soils with a neutral pH.",
    seasonality: "Varies globally; Indian mangoes peak from April to June, while Mexican and South American varieties extend the global season from March to September.",
    interestingFacts: [
      "The mango is the national fruit of India, Pakistan, and the Philippines, and the national tree of Bangladesh.",
      "A basket of mangoes is considered a traditional gesture of deep friendship in South Asia.",
      "The wild mango tree can grow up to 100 feet tall and live for over 300 years, still bearing fruit."
    ],
    healthWarnings: "Mango skin and sap contain urushiol, the chemical found in poison ivy. Sensitive individuals may develop contact dermatitis (itching, swelling) on their lips if they chew on the peel.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80"
  },
  avocado: {
    commonName: "Avocado",
    scientificName: "Persea americana",
    confidence: 100,
    originHistory: "Native to south-central Mexico, avocados have been cultivated for over 10,000 years. Indigenous Mesoamericans referred to it as 'ahuacatl' (testicle, due to its shape). It became highly commercialized in California in the early 20th century with the discovery of the Hass variety, leading to its modern global superfood status.",
    physicalCharacteristics: "Pear-shaped or spherical with a leathery, pebbled dark green to almost black skin when ripe. It contains a single large seed. The flesh has a smooth, creamy, buttery consistency with a pale green color that transitions to golden-yellow near the pit. Its flavor is subtle, nutty, and savory.",
    nutritionalValue: {
      vitamins: ["Vitamin K1 (Phylloquinone)", "Vitamin E (Tocopherol)", "Vitamin B5 (Pantothenic Acid)", "Folate"],
      minerals: ["Potassium (higher than bananas)", "Magnesium", "Copper", "Manganese"],
      healthBenefits: [
        "Rich in monounsaturated oleic acid, which is highly beneficial for cardiovascular health.",
        "Significantly increases the absorption of fat-soluble vitamins (A, D, E, K) from other foods.",
        "Contains lutein and zeaxanthin, which protect eye tissues from UV damage.",
        "Has a very low glycemic index, promoting stable blood glucose levels."
      ],
      caloriesPer100g: 160
    },
    varieties: [
      "Hass (California/Mexico): Pebbled skin that darkens when ripe, high-fat, rich, and nutty (80% of global market)",
      "Fuerte: Smooth, thin, green skin that remains green, lower fat content, pear-shaped",
      "Reed: Large, round green variety available in summer, excellent butter-like quality"
    ],
    culinaryUsesStorage: "Widely mashed into guacamole, spread over artisanal toast, or tossed into fresh salads and cold soups. In Brazil and Vietnam, it is frequently blended into sweet milkshakes. Storage: Unripe fruits should sit at room temperature. To accelerate ripening, place in a paper bag with an apple or banana. Once ripe, refrigerate whole for up to 5 days. Spritz cut flesh with lime juice to prevent oxidation.",
    topProducers: [
      { country: "Mexico", quantity: "2,440,000 Metric Tons", valueNumeric: 2440 },
      { country: "Colombia", quantity: "540,000 Metric Tons", valueNumeric: 540 },
      { country: "Peru", quantity: "530,000 Metric Tons", valueNumeric: 530 },
      { country: "Indonesia", quantity: "460,000 Metric Tons", valueNumeric: 460 },
      { country: "Dominican Republic", quantity: "390,000 Metric Tons", valueNumeric: 390 }
    ],
    globalLeader: "Mexico (producing over 30% of global supply)",
    majorExporters: ["Mexico", "Peru", "Chile", "Colombia", "Kenya"],
    growingConditions: "Requires warm, humid, frost-free climates with moderate wind resistance. Avocados have extremely delicate root systems; they require perfect soil drainage. Even 24 hours in waterlogged soil can kill the tree from root rot (phytophthora).",
    seasonality: "Available year-round, but Mexican peak harvests occur from October to March, whereas California peaks between April and August.",
    interestingFacts: [
      "Avocados do not ripen on the tree. They can be left hanging on the branches for months as a form of natural cold storage before being picked to initiate ripening.",
      "The Hass avocado tree is a single cultivar clone. Every Hass tree today traces its lineage back to a single 'mother tree' planted by postal worker Rudolph Hass in California in 1926.",
      "Botanically, the avocado is classified as a single-seeded berry."
    ],
    healthWarnings: "Extremely toxic to domestic pets (dogs, cats, horses, and birds) due to 'persin', a fungicidal toxin found in the leaves, bark, skin, and pit.",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80"
  },
  durian: {
    commonName: "Durian",
    scientificName: "Durio zibethinus",
    confidence: 100,
    originHistory: "Native to Borneo and Sumatra, durian has been harvested and consumed in Southeast Asia for prehistoric ages. Its nickname, 'The King of Fruits', was coined by early naturalists who marveled at its immense size, formidable spikes, and complex, overpowering flavor profiles that captivate or repel consumers.",
    physicalCharacteristics: "Large, roundish or oblong fruit covered in rigid, sharp, pyramidal spikes. The skin is green to yellowish-brown. Inside, there are several segments containing thick, custard-like, golden pulp wrapping large seeds. Its aroma is notoriously potent, often compared to onions, turpentine, and gym socks, while the taste is a rich custard of almonds, vanilla, and sweet garlic cream.",
    nutritionalValue: {
      vitamins: ["Vitamin C", "Vitamin B6", "Thiamine (B1)", "Riboflavin"],
      minerals: ["Potassium", "Manganese", "Magnesium", "Iron"],
      healthBenefits: [
        "Incredibly calorie-dense and rich in healthy fats, offering a massive burst of cellular energy.",
        "Contains active plant sterols and polyphenols that help lower systemic blood pressure.",
        "Provides an excellent source of prebiotic fibers to aid digestion.",
        "Rich in tryptophan, an amino acid that converts to serotonin, promoting better sleep."
      ],
      caloriesPer100g: 147
    },
    varieties: [
      "Monthong / Golden Pillow (Thailand): Mild aroma, sweet, creamy, thick flesh (most popular internationally)",
      "Musang King (Malaysia): Bright golden, highly aromatic, complex bittersweet and buttery finish (highly prized)",
      "D24 (Malaysia): Classic sweet-bitter variety with thick, slightly dry consistency"
    ],
    culinaryUsesStorage: "Eaten fresh by hand immediately after splitting the pod. Also popular in Southeast Asian desserts like sticky rice, durian ice cream, crepes, pastries, and sweet tempoyak (fermented durian condiment). Storage: Due to its extreme odor, double-wrap inside airtight plastic containers and store in the freezer or refrigerator. Consume fresh within 24 hours of opening.",
    topProducers: [
      { country: "Thailand", quantity: "1,110,000 Metric Tons", valueNumeric: 1110 },
      { country: "Malaysia", quantity: "380,000 Metric Tons", valueNumeric: 380 },
      { country: "Indonesia", quantity: "340,000 Metric Tons", valueNumeric: 340 },
      { country: "Vietnam", quantity: "270,000 Metric Tons", valueNumeric: 270 },
      { country: "Philippines", quantity: "80,000 Metric Tons", valueNumeric: 80 }
    ],
    globalLeader: "Thailand (leading in both total production and export volume)",
    majorExporters: ["Thailand", "Malaysia", "Vietnam"],
    growingConditions: "Requires a highly hot, humid, tropical rainforest climate with abundant rainfall (above 1500mm annually). Trees thrive in deep, rich, sandy-clay soils and take 7 to 10 years to bear fruit from seeds.",
    seasonality: "May to August (Main summer crop in Southeast Asia), with a secondary smaller season in December to January.",
    interestingFacts: [
      "Durian is strictly banned in public transit, airports, taxis, and luxury hotels across Southeast Asia due to its incredibly pungent and persistent smell.",
      "Durians do not get plucked; when fully ripe, they fall from trees naturally at night, making walking under durian trees in season a hazard.",
      "In local folklore, consuming durian with alcohol is believed to cause severe indigestion or hyperthermia."
    ],
    healthWarnings: "Avoid consuming durian in combination with alcohol, as research suggests sulfur compounds in durian inhibit aldehyde dehydrogenase, a key enzyme needed to metabolize alcohol, leading to rapid toxicity and intense hangovers.",
    image: "https://images.unsplash.com/photo-1595180425717-fe48135cc3bc?w=800&auto=format&fit=crop&q=80"
  },
  apple: {
    commonName: "Apple",
    scientificName: "Malus domestica",
    confidence: 100,
    originHistory: "The ancestor of the modern apple, Malus sieversii, originated in the wild forests of Kazakhstan, Central Asia. It travelled along the Silk Road to Europe, where it was hybridized and cultivated for centuries. European colonists brought apple seeds and grafting stock to North America, where it became a cornerstone of temperate fruit production.",
    physicalCharacteristics: "Round or slightly tapered fruit with skin ranging from bright green (Granny Smith) to yellow (Golden Delicious) and deep red (Red Delicious). The white, crisp flesh is crunchy, sweet, tart, or tangy, surrounding a central fibrous core that houses a few small brown seeds.",
    nutritionalValue: {
      vitamins: ["Vitamin C", "Vitamin B6", "Vitamin K", "Vitamin A"],
      minerals: ["Potassium", "Manganese", "Copper", "Magnesium"],
      healthBenefits: [
        "Superb source of pectin, a soluble fiber that lowers blood cholesterol levels.",
        "Abundant in quercetin, a flavonoid antioxidant that shields brain cells and reduces inflammation.",
        "Supports long-term weight management by promoting satiety and gut health.",
        "Helps stabilize insulin response in the body."
      ],
      caloriesPer100g: 52
    },
    varieties: [
      "Honeycrisp: Extremely juicy, crisp, sweet-tart balance (highly popular in modern markets)",
      "Fuji: Super sweet, firm, long-storing, originated in Japan",
      "Gala: Mild, sweet, yellow-red striped skin, excellent for kids",
      "Granny Smith: Hard, emerald-green skin, intensely tart and acidic, ideal for baking pies"
    ],
    culinaryUsesStorage: "Widely eaten raw as a portable, healthy snack. Grafted into salads, apple pies, crumbles, sauces, and pressed into apple cider or vinegar. Storage: Apples keep best in a cold, humid environment. Store in the refrigerator crisper drawer for up to 6 weeks. Do not store near green leafy vegetables, as apples emit ethylene gas which accelerates spoilage of neighboring foods.",
    topProducers: [
      { country: "China", quantity: "45,000,000 Metric Tons", valueNumeric: 45000 },
      { country: "United States", quantity: "4,600,000 Metric Tons", valueNumeric: 4600 },
      { country: "Turkey", quantity: "4,300,000 Metric Tons", valueNumeric: 4300 },
      { country: "Poland", quantity: "4,000,000 Metric Tons", valueNumeric: 4000 },
      { country: "India", quantity: "2,300,000 Metric Tons", valueNumeric: 2300 }
    ],
    globalLeader: "China (producing over 50% of the world's supply)",
    majorExporters: ["China", "Italy", "United States", "Poland", "Chile"],
    growingConditions: "Thrives in temperate zones with cold winters (chill hours required to break dormancy) and mild summers. Requires medium-loam soils and excellent air drainage to prevent spring frost damage during blooming.",
    seasonality: "Harvested in Autumn (August to November in Northern Hemisphere). Due to advanced Controlled Atmosphere (CA) storage, high-quality apples are available year-round.",
    interestingFacts: [
      "An average apple tree takes 4 to 5 years to produce its first crop of fruit.",
      "The seeds of an apple contain small amounts of amygdalin, which converts into cyanide when crushed and chewed. However, one would need to chew and swallow hundreds of seeds to suffer harmful effects.",
      "Apples float in water because they are 25% air by volume!"
    ],
    healthWarnings: "Very safe. For people with Oral Allergy Syndrome (OAS), raw apple proteins can cause itching in the mouth and throat if they are allergic to birch pollen. Cooking the apple neutralizes these proteins.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80"
  }
};
