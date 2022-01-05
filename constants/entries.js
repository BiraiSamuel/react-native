export const ENTRIES1 = [
    {
        title: 'Fast Food',
        subtitle: 'Food and all types of edibles delivered around you',
        image: 'https://lisheapp.co.ke/resources/food.jpg',
        order:'category',
        type: 'food'

    },
    {
        title: 'Drinks and Smoothies',
        subtitle: 'Drinks and smoothies delivery around you',
        image: 'https://lisheapp.co.ke/resources/drinks.jpg',
        order:'category',
        type: 'drinks'
    },
    {
        title: 'Vegetables and Fruits',
        subtitle: 'Vegetables and fruit packages to give you that health boost',
        image: 'https://lisheapp.co.ke/resources/vegetables.jpg',
        order:'category',
        type: 'vegetables'
    },
    {
        title: 'Yoghurt and milk packages',
        subtitle: 'Organic yoghurt delivered near you',
        image: 'https://lisheapp.co.ke/resources/juo.jpg',
        order:'listing',
        price: 'Ksh.50',
        type: 'yoghurt'
    },
    {
        title: 'All content',
        subtitle: 'All goods delivered in your area',
        image: 'https://lisheapp.co.ke/resources/coming.jpg',
        order:'category',
        type: 'all'
    }
];

export const ENTRIES2 = [
    {
        title: 'Organic champagne',
        subtitle: 'pineapple Lime Mango',
        image: 'https://lisheapp.co.ke/resources/organic.jpg',
        urls : [
           'http://192.168.100.224/resources/organic.jpg',
           'http://192.168.100.224/resources/champagne.jpg',
           'http://192.168.100.224/resources/organic.jpg',
           'http://192.168.100.224/resources/champagne.jpg'
        ],
        type: 'drinks',
        order: 'listing',
        price: 'Ksh. 50'
    },
    {
        title: 'Peppered Rice(Pilau)',
        subtitle: 'Rice cooked with spices',
        image: 'https://lisheapp.co.ke/resources/pilau.jpeg',
        urls:  [
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'"
        ],
        type: 'food',
        order: 'listing',
        price: 'Ksh. 150'
    },
    {
        title: 'Bhajias',
        subtitle: 'Fried potatoes',
        image: 'https://lisheapp.co.ke/resources/bhajia.jpg',
        urls:  [
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'"
        ],
        type: 'food',
        order: 'listing',
        price: 'Ksh. 150'
    },
    {
        title: 'Chips Masala',
        subtitle: 'Pepper fried potatoes',
        image: 'https://lisheapp.co.ke/resources/masala.jpg',
        urls:  [
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'"
        ],
        type: 'food',
        order: 'listing',
        price: 'ksh. 150'
    },
    {
        title: 'Strawberry flavored yoghurt',
        subtitle: 'Organic natural yoghurt that comes in all shapes and flavors',
        image: 'https://lisheapp.co.ke/resources/juo.jpg',
        urls:  [
            "'http://192.168.100.224/resources/coming.jpg'",
            "http://192.168.100.224/resources/coming.jpg",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'"
        ],
        type: 'drinks',
        order: 'listing',
        price: 'Ksh. 50'
    },
    {
        title: 'Chips',
        subtitle: 'Good chips',
        image: 'https://lisheapp.co.ke/resources/chips.jpg',
        urls:  [
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'",
            "'http://192.168.100.224/resources/coming.jpg'"
        ],
        type: 'food',
        order: 'listing',
        price: 'Ksh. 130'
    }
];

var imagese = [
    'https://lisheapp.co.ke/resources/coming.jpg',
    'https://lisheapp.co.ke/resources/coming.jpg',
    'https://lisheapp.co.ke/resources/coming.jpg',
    'https://lisheapp.co.ke/resources/coming.jpg'
];

var similarItemsO = [
  { quantity: 1, title: 'Pinapple lemonade', price: 'Ksh. 50', image: 'https://lisheapp.co.ke/resources/pineapplelemonade.JPG', images: imagese, specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], similarItems: similarItemsTwo},
  { quantity: 1, title: 'Mango lemonade', price: 'Ksh. 50', image: 'https://lisheapp.co.ke/resources/mangolemon.JPG', images: imagese, specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], similarItems: similarItemsTwo },
  { quantity: 1, title: 'Passion lemonade', price: 'Ksh. 50', image: 'https://lisheapp.co.ke/resources/passionlemon.JPG', images: imagese, specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], similarItems: similarItemsTwo }
];

var similarItemsTwo = [
  { quantity: 1, title: 'Pinapple lemonade', price: 'Ksh. 50', image: 'https://lisheapp.co.ke/resources/pineapplelemonade.JPG', images: imagese, specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], similarItems: similarItemsTwo},
  { quantity: 1, title: 'Mango lemonade', price: 'Ksh. 50', image: 'https://lisheapp.co.ke/resources/mangolemon.JPG', images: imagese, specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], similarItems: similarItemsTwo },
  { quantity: 1, title: 'Passion lemonade', price: 'Ksh. 50', image: 'https://lisheapp.co.ke/resources/passionlemon.JPG', images: imagese, specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], similarItems: similarItemsTwo }
];

export const VEGESTABLE = [
    {quantity: 1, title: 'Spinach', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/spinach.jpg', description: "Spinach the best farms have to provide", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Cabbage', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/cabbage.jpg', description: "Cabbage produced from the best farms", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Mchicha', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/mchicha.jpg', description: "stining nettle the best farms have to provide", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Cauliflower', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/cauli.jpg', description: "Cauliflower the best farms have to provide", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Avocado (Guacamole)', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['with parcely', 'with corriander leaves', 'Plain Mashed'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/ova.jpg', description: "Avocado the best farms have to provide", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Lettuce', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/lettuce.jpg', description: "Lettuce the best farms have to provide", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Capsicum', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['chopped', 'sliced', 'default'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/capsicum.jpg', description: "Pili-pili hoho as its commonly known, to add spice to your food!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Sukuma wiki', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/sukuma.jpg', description: "Sukuma wiki just as its swahili name implies", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Managu', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Raw form', 'Steamed state', 'Shredded'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/managu.png', description: "Managu as most would call it, nutritious can best describe its nature", images: imagese, similarItems: similarItemsO},
  ];

  export const FOOD = [
    {quantity: 1, title: 'Pilau', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Meat', 'Vegan'], price: 'Ksh.120', image: 'https://lisheapp.co.ke/resources/pilau.jpeg', description: "Spiced rice served with meat or vegetables (optional)", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Plain Chips', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Coleslaw', 'Sauce'], price: 'Ksh.100', image: 'https://lisheapp.co.ke/resources/chips.jpg', description: "Plain chips that comes with impeccable sauce or coleslaw (optional)", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Chips Masala', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Pepper sauce', 'Non-peppered sauce'], price: 'Ksh.150', image: 'https://lisheapp.co.ke/resources/masala.jpg', description: "Spiced chips served with peppered sauce or non peppered sauce (optional)", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Bhajia', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Coleslaw', 'Sauce'], price: 'Ksh.130', image: 'https://lisheapp.co.ke/resources/bhajia.jpg', description: "Disc shaped chips dipped in curry and fried. Comes with optional spiced sauce", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Ugali pork', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Coleslaw', 'Sauce'], price: 'Ksh.150', image: 'https://lisheapp.co.ke/resources/coming.jpg', description: "Disc shaped chips dipped in curry and fried. Comes with optional spiced sauce", images: imagese, similarItems: similarItemsO}
  ];

  export const YOGHURT = [
    {quantity: 1, title: 'strawberry Flavor', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['plain', 'fused'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/strawberry.jpg', description: "Fresh Yogis delight yoghurt!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Vanilla flavor', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['plain', 'fused'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/vanilla.jpg', description: "Fresh Yogis delight yoghurt!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Banana flavor', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['plain', 'fused'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/banana.jpg', description: "Fresh Yogis delight yoghurt!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Chocolate flavor', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['plain', 'fused'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/chocolate.jpg', description: "Fresh Yogis delight yoghurt!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Tropical flavor', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['plain', 'fused'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/yogu.jpg', description: "Fresh Yogis delight yoghurt!", images: imagese, similarItems: similarItemsO},
  ];

  export const TROPICAL = [
    {quantity: 1, title: 'Mango', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Whole', 'Cut'], price: 'Ksh.50', image: 'http://www.biraisamuel.co.ke/wp-content/uploads/2019/08/spinach.jpg', description: "How do you choose a mango, and how do you know if it's ripe? We'll do it for you", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Paw paw', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Whole', 'Cut'], price: 'Ksh.50', image: 'http://www.biraisamuel.co.ke/wp-content/uploads/2019/08/cabbage.jpg', description: "Full of antioxidants, flavonoids, plus loads of vitamins and minerals, this is one of the healthiest of nature's fruit!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Pineapple', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Whole', 'Cut'], price: 'Ksh.50', image: 'http://www.biraisamuel.co.ke/wp-content/uploads/2019/08/mchicha.jpg', description: "there's absolutely nothing that tastes as good as fresh pineapple.", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Durian fruit', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Whole', 'Cut'], price: 'Ksh.50', image: 'http://www.biraisamuel.co.ke/wp-content/uploads/2019/08/cauli.jpg', description: "Get to know why it is called the 'King of fruit'", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Mangosteen', sizes: ['250g', '500g', '750g', '1000g', '1500g'], specialization: ['Whole', 'Cut'], price: 'Ksh.50', image: 'http://www.biraisamuel.co.ke/wp-content/uploads/2019/08/ova.jpg', description: "you'll find mangosteen to be a beautiful fruit that offers numerous health benefits in the form of antioxidants - both the fruit itself and the skin are incredibly potent disease-fighters.", images: imagese, similarItems: similarItemsO},
  ]; 


  export const ALL = [
    {quantity: 1, title: 'Pilau', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Meat', 'Vegan'], price: 'Ksh.120', image: 'https://lisheapp.co.ke/resources/pilau.jpeg', description: "Spiced rice served with meat or vegetables (optional)", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Plain Chips', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Coleslaw', 'Sauce'], price: 'Ksh.100', image: 'https://lisheapp.co.ke/resources/chips.jpg', description: "Plain chips that comes with impeccable sauce or coleslaw (optional)", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Chips Masala', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Pepper sauce', 'Non-peppered sauce'], price: 'Ksh.150', image: 'https://lisheapp.co.ke/resources/masala.jpg', description: "Spiced chips served with peppered sauce or non peppered sauce (optional)", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Bhajia', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Coleslaw', 'Sauce'], price: 'Ksh.130', image: 'https://lisheapp.co.ke/resources/bhajia.jpg', description: "Disc shaped chips dipped in curry and fried. Comes with optional spiced sauce", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Ugali pork', sizes: ['Small 250g', 'Medium 350g', 'Large 500g'], specialization: ['Coleslaw', 'Sauce'], price: 'Ksh.150', image: 'https://lisheapp.co.ke/resources/coming.jpg', description: "Disc shaped chips dipped in curry and fried. Comes with optional spiced sauce", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Organic champagne', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/organic.jpg', description: "Passion, Pinaapple and lime combo. Makes you wanna step on the dance floor and shake it!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Tropical Bella', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/champagne.JPG', description: "Pineapple, mint and lime combo. Psyches you for the next nature walk!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Turi', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/bella.JPG', description: "Beetroot, Passion and lime combo. Adds more flavor to true friendship!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Melvin', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/mel.JPG', description: "Avocado, Beetroot and banana combo. Keeps you bubbly, smiley and stomach full for longer!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Bahamas', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/bah.JPG', description: "Mango, Apple and Banana combo. Takes you to the deep seas and back", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Tropical Dee', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/dee.JPG', description: "Mango, apple and mint combo. Sparks true love, a proposal drink!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Yellow wine', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/wine.JPG', description: "Mango, passion and banana combo. A tantalizing taste that keeps you coming for more!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Pina colada', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/colada.JPG', description: "Avocado, pineapple, banana. Leaves a smooth sensation on your lips and keeps you refreshed!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Cardiac', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/cardiac.JPG', description: "Avocado, passion, banana. Brings out the grit within you!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Calvo', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/calvo.JPG', description: "Mango, pineapple and passion combo. Adds a tropical delight to your life!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Detox karura', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/detox.JPG', description: "Spinach, Mango and banana combo. Reminds you that your body is not your own - maintain it!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'ABC Detox', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/abc.JPG', description: "Apple, beetroot and carrot combo. A miracle drink that recovers the nutrients lost!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Tropical jos', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/jos.JPG', description: "Pineapple and passion combo. Makes you stand out in any context!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Tropical dee', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/trop.JPG', description: "Mango, apple and mint combo. Sparks true love, a proposal drink!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Threesome', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/three.JPG', description: "Peanut, milk and banana combo. Helps you build your masculinity while keeping your energy levels up!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Tropical Mahiri', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/mahiri.JPG', description: "Avocado, milk and pineapple combo. Reminds you that all is not lost in this selfish world!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Guacamole', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/guac.JPG', description: "Avocado, milk and passion combo. Drives the impossibilities of life into reality!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Karen White', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/white.JPG', description: "Mango, milk and banana combo. A perfect blend that rejuvenates your day!", images: imagese, similarItems: similarItemsO},
    {quantity: 1, title: 'Lavender Blues', sizes: ['250ml', '350ml', '500ml', '750ml', '1ltr'], specialization: ['coconut sprinkles', 'Ginger', 'Ground-nuts'], price: 'Ksh.50', image: 'https://lisheapp.co.ke/resources/lav.JPG', description: "Beetroot, Apple, Banana and milk combo. Enchants your life with positivism!", images: imagese, similarItems: similarItemsO},
  ];
