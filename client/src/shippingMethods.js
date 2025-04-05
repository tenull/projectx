export const shippingMethods = [
    // {
    //     name: 'Személyes átvétel',
    //     image: '/images/dpd.png',
    //     max: 1500,
    //     date:'',
    //     prices: [
    //         { maxPrice: 100000, price: 'express' },

    //     ],
    //     details: [
            
    //     ]
    // },
    {
        name: 'DPD házhozszállítás',
        image: '/images/szallitas/dpd.png',
        max: 31.5,
        date:'Szállítási idő: kb. 1-5 munkanap.',
        prices: [
            { maxPrice: 10000, price: 2790 },
            { maxPrice: 25000, price: 2590 },
            { maxPrice: Infinity, price: 0 } ,
            { maxWeight: 31.5, price: 2790}
        ],
        details: [
            'Szállítási idő: kb. 1-5 munkanap.',
            'MAX szállítási tömeg: 31,5 kg.',
            '0 - 10 000 Ft: 2790 Ft',
            '10 000 - 25 000 Ft: 2590 Ft',
            '25 000 Ft felett: Ingyenes',
            '*Ingyenes szállítás 24 kg-ig vagy az automata térfogatáig érvényes.',
            'Utánvét: 495 Ft (Foxpost esetén, csak bankkártyával fizethető)'
        ]
    },
    {
        name: 'GLS házhozszállítás',
        image: '/images/szallitas/gls.png',
        max: 28,
        date:'Szállítási idő: kb. 1-7 munkanap.',
        prices: [
            { maxWeight: 14, price: 2490 },
            { maxWeight: 28, price: 2990 }
        ],
        details: [
            'Szállítási idő: kb. 1-7 munkanap.',
            'Költsége 28 kg alatt: 2990 Ft + utánvét',
            'Költsége 14 kg alatt: 2490 Ft + utánvét',
            'Utánvét költsége: 495 Ft',
            'Előre fizetés esetén nincs utánvét költség.'
        ]
    },
    {
        name: 'MPL futárszolgálat (Magyar Posta)',
        image: '/images/szallitas/mpl-hq-1.png',
        max: 100,
        date:'Szállítási idő: kb. 2-7 munkanap',
        prices: [
            { maxWeight: 10, price: 1990 },
            { maxWeight: 100, price: 2990 }
        ],
        details: [
            'Szállítási idő: kb. 2-7 munkanap',
            'Költsége 10 kg alatt – 1990 Ft + utánvét   ',
            'Költsége 20 kg alatt – 2990 Ft + utánvét',
            'Postán maradó csomag, postapont vagy automata esetén: 20 kg-ig 990 Ft + utánvét',
            'Minden ami a többi szállítási módra érvényes, a postára is vonatkozik. Utánvét: 590 Ft'
        ]
    },
    {
        name: 'MPL PostaPont',
        image: '/images/szallitas/PostaPont-logo.webp',
        max: 20,
        date:'Szállítási idő: kb. 1-5 munkanap',
        prices: [
            { maxPrice: 25000, price: 2290 },
            { maxPrice: Infinity, price: 0 } 
        ],
        details: [
            'Szállítási idő: kb. 1-5 munkanap',
            'MAX szállítási tömeg: 20 kg.',
            '0 - 25 000 Ft 2290 Ft + utánvét',
            '25000 Ft felett ingyenes',
            'Postán maradó csomag, postapont vagy automata esetén: 20 kg-ig 990 Ft + utánvét.',
            'Minden ami a többi szállítási módra érvényes, a postára is vonatkozik. Utánvét: 590 Ft.'
        ]
    },
    {
        name: 'MPL csomagautomata',
        image: '/images/szallitas/mplpostapont.jpg',
        max: 100,
        date:'Szállítási idő: kb. 1-5 munkanap',
        prices: [
            { maxPrice: 25000, price: 2290 },
            { maxPrice: Infinity, price: 0 } 
        ],
        details: [
            'Szállítási idő: kb. 1-5 munkanap.',
            'MAX szállítási tömeg: 20 kg',
            ' 0 - 25 000 Ft 2290 Ft + utánvét ',
            '25000 Ft felett ingyenes',
            'Minden ami a többi szállítási módra érvényes, a postára is vonatkozik. Utánvét: 590 Ft.'
        ]
    },
];