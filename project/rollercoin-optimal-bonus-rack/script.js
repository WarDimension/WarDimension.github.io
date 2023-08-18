const miners = [
    {
        "name": "8blessed",
        "img": "https://static.rollercoin.com/static/img/market/miners/6231c296a258d58160cdf676.gif?v=1.0.3",
        "rarity": "I",
        "power": 33.000,
        "bonus": 0,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Cerberus",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b561aa775e04d9a28548c.gif?v=1.0.3",
        "rarity": "I",
        "power": 63.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Cerberus",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7b828238ed283a2353a5.gif?v=1.0.3",
        "rarity": "II",
        "power": 165.375,
        "bonus": 0.55,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Chattanooga Choo",
        "img": "https://static.rollercoin.com/static/img/market/miners/63bffdd0d2e89bab14ff95bd.gif?v=1.0.3",
        "rarity": "I",
        "power": 20.230,
        "bonus": 0,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Classic Fury",
        "img": "https://static.rollercoin.com/static/img/market/miners/6422effbb78c58eb24801eb9.gif?v=1.0.3",
        "rarity": "I",
        "power": 418.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Clover-n’-Over",
        "img": "https://static.rollercoin.com/static/img/market/miners/62324419a258d5816074aeb1.gif?v=1.0.3",
        "rarity": "I",
        "power": 530.000,
        "bonus": 2.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "CP-106",
        "img": "https://static.rollercoin.com/static/img/market/miners/610a9b31bf6b53744c87cedc.gif?v=1.0.3",
        "rarity": "I",
        "power": 11.106,
        "bonus": 0.5,
        "cells": 1,
        "qty": 5
    },
    {
        "name": "Crimson Bloom",
        "img": "https://static.rollercoin.com/static/img/market/miners/61f9356a8b46ce6889390250.gif?v=1.0.3",
        "rarity": "I",
        "power": 40.000,
        "bonus": 1,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Crimson Spark",
        "img": "https://static.rollercoin.com/static/img/market/miners/61f9356a8b46ce6889390252.gif?v=1.0.3",
        "rarity": "I",
        "power": 20.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 4
    },
    {
        "name": "Chupacabra",
        "img": "https://static.rollercoin.com/static/img/market/miners/5f9ae5284ac419fdd08d0584.gif?v=1.0.3",
        "rarity": "I",
        "power": 14.000,
        "bonus": 1,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "Country Loading...",
        "img": "https://static.rollercoin.com/static/img/market/miners/country_loading.gif?v=1",
        "rarity": "I",
        "power": 50.500,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Deepdiver",
        "img": "https://static.rollercoin.com/static/img/market/miners/62a722279b5a37db46c0bca5.gif?v=1.0.3",
        "rarity": "I",
        "power": 12.500,
        "bonus": 0.25,
        "cells": 2,
        "qty": 4
    },
    {
        "name": "Demon Speeding",
        "img": "https://static.rollercoin.com/static/img/market/miners/6422f238f1cff2d95bf745a0.gif?v=1.0.3",
        "rarity": "I",
        "power": 0.010,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Disco-Roll",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c29.gif?v=1.0.3",
        "rarity": "I",
        "power": 36.300,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Doggie-Woogie",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c27.gif?v=1.0.3",
        "rarity": "I",
        "power": 0.010,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Earthbind",
        "img": "https://static.rollercoin.com/static/img/market/miners/earthbind.gif?v=1",
        "rarity": "I",
        "power": 210.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Entminer",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a28546f.gif?v=1.0.3",
        "rarity": "I",
        "power": 22.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Entminer",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7b9d8238ed283a2354ea.gif?v=1.0.3",
        "rarity": "II",
        "power": 57.750,
        "bonus": 0.55,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Fortune’s Charm",
        "img": "https://static.rollercoin.com/static/img/market/miners/fortunes_charm.gif?v=1",
        "rarity": "I",
        "power": 20.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Hasher’s Egg",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a28546d.gif?v=1.0.3",
        "rarity": "I",
        "power": 21.600,
        "bonus": 0,
        "cells": 1,
        "qty": 3
    },
    {
        "name": "Heartbeat",
        "img": "https://static.rollercoin.com/static/img/market/miners/63e61425547cfab9a27bcc78.gif?v=1.0.3",
        "rarity": "I",
        "power": 176.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Helipop",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c2a.gif?v=1.0.3",
        "rarity": "I",
        "power": 78.500,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "JBS-200",
        "img": "https://static.rollercoin.com/static/img/market/miners/610a9ae2bf6b53744c860a30.gif?v=1.0.3",
        "rarity": "I",
        "power": 13.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 5
    },
    {
        "name": "Jungle King",
        "img": "https://static.rollercoin.com/static/img/market/miners/62d687ba81b1c8e692c19e43.gif?v=1.0.3",
        "rarity": "I",
        "power": 16.800,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Jungle King",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7af18238ed283a234cd7.gif?v=1.0.3",
        "rarity": "III",
        "power": 115.815,
        "bonus": 0.55,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Katsuhito",
        "img": "https://static.rollercoin.com/static/img/market/miners/64a69674af7caabb3d1151f8.gif?v=1.0.3",
        "rarity": "I",
        "power": 0.010,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Mergedge Mk. I",
        "img": "https://static.rollercoin.com/static/img/market/miners/646ddba0260e7d19c91846b9.gif?v=1.0.3",
        "rarity": "I",
        "power": 4.860,
        "bonus": 0,
        "cells": 1,
        "qty": 3
    },
    {
        "name": "Mergedge Mk. I",
        "img": "https://static.rollercoin.com/static/img/market/miners/646de74209672fd5f06e22bd.gif?v=1.0.3",
        "rarity": "II",
        "power": 12.810,
        "bonus": 0.08,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "Mergedge Mk. IV",
        "img": "https://static.rollercoin.com/static/img/market/miners/646ddbed260e7d19c91846ba.gif?v=1.0.3",
        "rarity": "I",
        "power": 6.450,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Mergedge",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a28546b.gif?v=1.0.3",
        "rarity": "I",
        "power": 3.825,
        "bonus": 0,
        "cells": 2,
        "qty": 9
    },
    {
        "name": "Mergedge",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7b6d8238ed283a2352a1.gif?v=1.0.3",
        "rarity": "II",
        "power": 10.080,
        "bonus": 0.14,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Merry Dancers",
        "img": "https://static.rollercoin.com/static/img/market/miners/merry_dancers.gif?v=1",
        "rarity": "I",
        "power": 22.400,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Milly Mini",
        "img": "https://static.rollercoin.com/static/img/market/miners/60c9bc0965dce86c86c372fe.gif?v=1.0.3",
        "rarity": "I",
        "power": 25.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Missionaries",
        "img": "https://static.rollercoin.com/static/img/market/miners/64a696afaf7caabb3d1151f9.gif?v=1.0.3",
        "rarity": "I",
        "power": 40.000,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Nuc",
        "img": "https://static.rollercoin.com/static/img/market/miners/61532146db5008102f9f77f8.gif?v=1.0.3",
        "rarity": "I",
        "power": 26.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 4
    },
    {
        "name": "Petroglyph",
        "img": "https://static.rollercoin.com/static/img/market/miners/62444c9142a0cd1b7d749f2a.gif?v=1.0.3",
        "rarity": "I",
        "power": 25.000,
        "bonus": 0.25,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Power Symbol",
        "img": "https://static.rollercoin.com/static/img/market/miners/644bb225648294b4642f368d.gif?v=1.0.3",
        "rarity": "I",
        "power": 0.100,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Radio Gaga",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c28.gif?v=1.0.3",
        "rarity": "I",
        "power": 15.400,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "RollerArc S1",
        "img": "https://static.rollercoin.com/static/img/market/miners/61b9cce478d63d64cd626fe5.gif?v=1.0.3",
        "rarity": "I",
        "power": 0.150,
        "bonus": 0.1,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "RollerArc S1",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f79648238ed283a233a82.gif?v=1.0.3",
        "rarity": "II",
        "power": 0.420,
        "bonus": 0.11,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerArc S1",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f79658238ed283a233a8f.gif?v=1.0.3",
        "rarity": "III",
        "power": 1.155,
        "bonus": 0.11,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerArc S1",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f79668238ed283a233a9c.gif?v=1.0.3",
        "rarity": "IV",
        "power": 3.045,
        "bonus": 0.12,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerArc SX",
        "img": "https://static.rollercoin.com/static/img/market/miners/61b9cce478d63d64cd626fe4.gif?v=1.0.3",
        "rarity": "I",
        "power": 1,
        "bonus": 1,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "RollerMiner G1",
        "img": "https://static.rollercoin.com/static/img/market/miners/646ddb26260e7d19c91846b8.gif?v=1.0.3",
        "rarity": "I",
        "power": 3.500,
        "bonus": 0,
        "cells": 1,
        "qty": 7
    },
    {
        "name": "RollerMiner G1",
        "img": "https://static.rollercoin.com/static/img/market/miners/rollerminer_g1.gif?v=1",
        "rarity": "II",
        "power": 9.240,
        "bonus": 0.08,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerMiner R4",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b08abd1d9ee5894f36f30.gif?v=1.0.3",
        "rarity": "I",
        "power": 6.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 5
    },
    {
        "name": "RollerMiner S4",
        "img": "https://static.rollercoin.com/static/img/market/miners/59f05bdda8fa9b726b0742ca.gif?v=1.0.3",
        "rarity": "I",
        "power": 1.160,
        "bonus": 0.25,
        "cells": 1,
        "qty": 4
    },
    {
        "name": "RollerMiner S5+",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b08a9d1d9ee5894f36f2f.gif?v=1.0.3",
        "rarity": "I",
        "power": 4.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 3
    },
    {
        "name": "RollerMiner S7",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b022dd1d9ee5894f36f2d.gif?v=1.0.3",
        "rarity": "I",
        "power": 1.320,
        "bonus": 0.25,
        "cells": 1,
        "qty": 9
    },
    {
        "name": "Rolleron 741",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b08a7d1d9ee5894f36f2e.gif?v=1.0.3",
        "rarity": "I",
        "power": 2.730,
        "bonus": 0.5,
        "cells": 1,
        "qty": 5
    },
    {
        "name": "Rolleron 741",
        "img": "https://static.rollercoin.com/static/img/market/miners/rolleron_741.gif?v=1",
        "rarity": "II",
        "power": 7.245,
        "bonus": 0.53,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Rolleron Miner 761",
        "img": "https://static.rollercoin.com/static/img/market/miners/rolleron_miner_761.gif?v=1",
        "rarity": "I",
        "power": 6.500,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Roy and Silo",
        "img": "https://static.rollercoin.com/static/img/market/miners/6398e9e195b70ff678b1e569.gif?v=1.0.3",
        "rarity": "I",
        "power": 48.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "RPMiner",
        "img": "https://static.rollercoin.com/static/img/market/miners/6422f238f1cff2d95bf745a1.gif?v=1.0.3",
        "rarity": "I",
        "power": 15.400,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Rust Runner",
        "img": "https://static.rollercoin.com/static/img/market/miners/64491a76547cfab9a2c49655.gif?v=1.0.3",
        "rarity": "I",
        "power": 64.600,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Scarabey",
        "img": "https://static.rollercoin.com/static/img/market/miners/scarabey.gif?v=1",
        "rarity": "I",
        "power": 8.000,
        "bonus": 1,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Shaolin Temple",
        "img": "https://static.rollercoin.com/static/img/market/miners/63ca6f1d547cfab9a2c51bc2.gif?v=1.0.3",
        "rarity": "I",
        "power": 112.850,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Shifter",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f78b98238ed283a2332a3.gif?v=1.0.3",
        "rarity": "II",
        "power": 105.000,
        "bonus": 1.05,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Shrumee",
        "img": "https://static.rollercoin.com/static/img/market/miners/61532146db5008102f9f77f4.gif?v=1.0.3",
        "rarity": "I",
        "power": 22.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "Smelt Smith",
        "img": "https://static.rollercoin.com/static/img/market/miners/645b8a87eccd3c43207474ce.gif?v=1.0.3",
        "rarity": "I",
        "power": 21.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Smokin' Hotrod",
        "img": "https://static.rollercoin.com/static/img/market/miners/6422f238f1cff2d95bf745a2.gif?v=1.0.3",
        "rarity": "I",
        "power": 36.300,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Snowster-9001",
        "img": "https://static.rollercoin.com/static/img/market/miners/6398e9e195b70ff678b1e56a.gif?v=1.0.3",
        "rarity": "I",
        "power": 35.400,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Subminerine",
        "img": "https://static.rollercoin.com/static/img/market/miners/subminerine.gif?v=1",
        "rarity": "I",
        "power": 15.000,
        "bonus": 0.25,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Tape-Side-A",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c2e.gif?v=1.0.3",
        "rarity": "I",
        "power": 188.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Black Pearl",
        "img": "https://static.rollercoin.com/static/img/market/miners/62553dd842a0cd1b7dd592eb.gif?v=1.0.3",
        "rarity": "I",
        "power": 50.000,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Minertaur",
        "img": "https://static.rollercoin.com/static/img/market/miners/62553d7b42a0cd1b7dd45438.gif?v=1.0.3",
        "rarity": "I",
        "power": 100.000,
        "bonus": 1,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Thrill Rider",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5617a775e04d9a28543c.gif?v=1.0.3",
        "rarity": "I",
        "power": 13.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Think-Tronik",
        "img": "https://static.rollercoin.com/static/img/market/miners/62444ef542a0cd1b7d7eaee4.gif?v=1.0.3",
        "rarity": "I",
        "power": 180.000,
        "bonus": 1,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "ToxiFilter 99",
        "img": "https://static.rollercoin.com/static/img/market/miners/645230ae7dd1aacd1ea9bd00.gif?v=1.0.3",
        "rarity": "I",
        "power": 16.000,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Turkey Aid 2023",
        "img": "https://static.rollercoin.com/static/img/market/miners/63e4fe2b547cfab9a240e681.gif?v=1.0.3",
        "rarity": "I",
        "power": 0.100,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "TurtleCoin",
        "img": "https://static.rollercoin.com/static/img/market/miners/turtlecoin.gif?v=1",
        "rarity": "I",
        "power": 20.000,
        "bonus": 0.25,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Uniminer-42",
        "img": "https://static.rollercoin.com/static/img/market/miners/6244499b42a0cd1b7d67ca1e.gif?v=1.0.3",
        "rarity": "I",
        "power": 50.000,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Vyzzarys",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a285471.gif?v=1.0.3",
        "rarity": "I",
        "power": 22.400,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "XLZ-01",
        "img": "https://static.rollercoin.com/static/img/market/miners/618d1dda8f5ef2744b7d2386.gif?v=1.0.3",
        "rarity": "I",
        "power": 22.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "YMCA Game",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c2b.gif?v=1.0.3",
        "rarity": "I",
        "power": 114.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    }
];

let newMiners = [];
let smallMiners = [];

miners.forEach(miner => {
    miner.name += `<span hidden>${getRarity(miner.rarity)}</span>`;

    let newMiner = {...miner};
    newMiner.newBonus = newMiner.bonus == 0 ? 0 : "<strike>" + newMiner.bonus + "</strike>";
    newMiner.bonus = 0;

    switch(miner.cells){
        case 1:
            for(let i = 1; i <= miner.qty; i++){
                if(i == 1){
                    smallMiners.push(miner);
                }
                else{
                    smallMiners.push(newMiner);
                }
            }
            break;
        case 2:
            for(let i=1; i<=miner.qty;i++){
                if(i == 1){
                    newMiners.push(miner);
                }
                else{
                    newMiners.push(newMiner);
                }
            }
            break;
    }
});

smallMiners.sort((a, b) => b.power-a.power);

for(let i = 0; i < smallMiners.length; i += 2){
    switch(smallMiners[i+1]){
        case undefined:
            newMiners.push(smallMiners[i]);
            break;
        default:
            newMiners.push({"name": `${smallMiners[i].name} + ${smallMiners[i+1].name}`, "doubleMiner": true, "power": smallMiners[i].power + smallMiners[i+1].power, "bonus": smallMiners[i].bonus + smallMiners[i+1].bonus, "miners": [smallMiners[i], smallMiners[i+1]]});
            break;
    }
}

const table = document.querySelector(".miner-table");

function getRarityIcon(rarity){
    switch(rarity){
        case "I":
            return "";
        case "II":
            return `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_2.png?v=1.0.0"/>`;
        case "III":
            return `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_3.png?v=1.0.0"/>`;
        case "IV":
            return `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_4.png?v=1.0.0"/>`;
        case "V":
            return `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_5.png?v=1.0.0"/>`;
        case "VI":
            return `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_6.png?v=1.0.0"/>`;
        case "Star":
            return `<img class="rarity" src="https://rollercoin.com/static/images/level_star.4ff18517e5e8eed42060..png"/>`;
    }
}

function getRarity(rarity){
    switch(rarity){
        case "I":
            return 0;
        case "Star":
            return 1;
        case "II":
            return 2;
        case "III":
            return 3;
        case "IV":
            return 4;
        case "V":
            return 5;
        case "VI":
            return 6;
    }
}

function unitConversion(power){
    let unit = "TH/s";

    if(power >= 1000){
        power /= 1000;
        unit = "PH/s";
    }
    else if(power < 1){
        power *= 1000;
        unit = "GH/s";
    }

    return power + " " + unit;
}

function normal(){
    let total = {
        "power": 0,
        "bonus": 0
    };

    for(let i = 0; i < miners.length; i++){
        let rarity = getRarityIcon(miners[i].rarity);

        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = `<div><img class="single" src="${miners[i].img}"/>${rarity}${miners[i].name}</div>`;
        cell2.innerHTML = unitConversion(miners[i].power);
        cell3.innerHTML = miners[i].bonus + "%";

        total.power += miners[i].power;
        total.bonus += miners[i].bonus;
    }

    let row = table.insertRow(miners.length+1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = "TOTAL";
    cell2.innerHTML = unitConversion(total.power.toFixed() * 1);
    cell3.innerHTML = total.bonus.toFixed(2) * 1 + "%";
}

function crazy(){
    let total = {
        "power": 0,
        "bonus": 0
    };

    for(let i = 0; i < newMiners.length; i++){
        if(newMiners[i].doubleMiner){
            let power1, power2, unit1, unit2, rarity1 = getRarityIcon(newMiners[i].miners[0].rarity), rarity2 = getRarityIcon(newMiners[i].miners[1].rarity), bonus1, bonus2;
    
            bonus1 = newMiners[i].miners[0].newBonus != undefined ? newMiners[i].miners[0].newBonus : newMiners[i].miners[0].bonus;
            bonus2 = newMiners[i].miners[1].newBonus != undefined ? newMiners[i].miners[1].newBonus : newMiners[i].miners[1].bonus;
    
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            
            cell1.innerHTML = `<div><img src="${newMiners[i].miners[0].img}"/>${rarity1}${newMiners[i].miners[0].name}</div><span>➕</span><div><img src="${newMiners[i].miners[1].img}"/>${rarity2}${newMiners[i].miners[1].name}</div>`;
            cell2.innerHTML = `${unitConversion(newMiners[i].miners[0].power)}<span>➕</span>${unitConversion(newMiners[i].miners[1].power)}`;
            cell3.innerHTML = `${bonus1}%<span>➕</span>${bonus2}%`;
        }
        else{
            let rarity = getRarityIcon(newMiners[i].rarity), bonus;
    
            bonus = newMiners[i].newBonus != undefined ? newMiners[i].newBonus : newMiners[i].bonus;
    
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
    
            cell1.innerHTML = `<div><img class="single" src="${newMiners[i].img}"/>${rarity}${newMiners[i].name}</div>`;
            cell2.innerHTML = unitConversion(newMiners[i].power);
            cell3.innerHTML = bonus + "%";
        }

        total.power += newMiners[i].power;
        total.bonus += newMiners[i].bonus;
    }

    let row = table.insertRow(newMiners.length+1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = "TOTAL";
    cell2.innerHTML = unitConversion(total.power.toFixed() * 1);
    cell3.innerHTML = total.bonus.toFixed(2) * 1 + "%";
}

function printTable(){
    table.innerHTML = `
        <tr>
            <th>Miner Name</th>
            <th>Power</th>
            <th>Bonus Power</th>
        </tr>
    `;

    switch(isCrazy){
        case true:
            crazy();
            break;
        case false:
            normal();
            break;
    }

}

let _sortBy = "power";
let isCrazy = true;

function sortMiners(sortBy){
    _sortBy = sortBy;

    let myMiners = miners;

    if(isCrazy){
        myMiners = newMiners;
    }

    switch(_sortBy){
        case "name":
            myMiners.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "power":
            myMiners.sort((a, b) => b.power-a.power);
            break;
        case "bonus":
            myMiners.sort((a, b) => b.bonus-a.bonus);
            break;
    }
    printTable();
}
sortMiners(_sortBy);

function mode(mode){
    switch(mode){
        case "crazy":
            isCrazy = true;
            break;
        case "normal":
            isCrazy = false;
            break;
    }
    sortMiners(_sortBy);
}