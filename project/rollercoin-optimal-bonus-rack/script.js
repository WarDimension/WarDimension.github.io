const miners = [
    {
        "name": "Cerberus",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7b828238ed283a2353a5.gif?v=1.0.3",
        "rarity": "II",
        "power": 145.530,
        "bonus": 0.55,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Chattanooga Choo",
        "img": "https://static.rollercoin.com/static/img/market/miners/63bffdd0d2e89bab14ff95bd.gif?v=1.0.3",
        "power": 20.230,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Clover-n’-Over",
        "img": "https://static.rollercoin.com/static/img/market/miners/62324419a258d5816074aeb1.gif?v=1.0.3",
        "power": 530.000,
        "bonus": 2.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "CP-106",
        "img": "https://static.rollercoin.com/static/img/market/miners/610a9b31bf6b53744c87cedc.gif?v=1.0.3",
        "power": 11.106,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Crimson Bloom",
        "img": "https://static.rollercoin.com/static/img/market/miners/61f9356a8b46ce6889390250.gif?v=1.0.3",
        "power": 40.000,
        "bonus": 1,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Deepdiver",
        "img": "https://static.rollercoin.com/static/img/market/miners/62a722279b5a37db46c0bca5.gif?v=1.0.3",
        "power": 12.500,
        "bonus": 0.25,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Disco-Roll",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c29.gif?v=1.0.3",
        "power": 36.300,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "Doggie-Woogie",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c27.gif?v=1.0.3",
        "power": 0.010,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Entminer",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a28546f.gif?v=1.0.3",
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
        "name": "Hasher’s Egg",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a28546d.gif?v=1.0.3",
        "power": 21.600,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Helipop",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c2a.gif?v=1.0.3",
        "power": 78.500,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "JBS-200",
        "img": "https://static.rollercoin.com/static/img/market/miners/610a9ae2bf6b53744c860a30.gif?v=1.0.3",
        "power": 13.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 4
    },
    {
        "name": "Jungle King",
        "img": "https://static.rollercoin.com/static/img/market/miners/62d687ba81b1c8e692c19e43.gif?v=1.0.3",
        "power": 16.800,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Jungle King",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7af18238ed283a234cd7.gif?v=1.0.3",
        "rarity": "III",
        "power": 93.240,
        "bonus": 0.55,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Mergedge",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a28546b.gif?v=1.0.3",
        "power": 3.825,
        "bonus": 0,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Mergedge",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f7b6d8238ed283a2352a1.gif?v=1.0.3",
        "rarity": "II",
        "power": 8.925,
        "bonus": 0.14,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Nuc",
        "img": "https://static.rollercoin.com/static/img/market/miners/61532146db5008102f9f77f8.gif?v=1.0.3",
        "power": 26.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "Radio Gaga",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c28.gif?v=1.0.3",
        "power": 15.400,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "RollerArc S1",
        "img": "https://static.rollercoin.com/static/img/market/miners/61b9cce478d63d64cd626fe5.gif?v=1.0.3",
        "power": 0.150,
        "bonus": 0.1,
        "cells": 1,
        "qty": 14
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
        "power": 1.050,
        "bonus": 0.11,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "RollerMiner R4",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b08abd1d9ee5894f36f30.gif?v=1.0.3",
        "power": 6.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerMiner S4",
        "img": "https://static.rollercoin.com/static/img/market/miners/59f05bdda8fa9b726b0742ca.gif?v=1.0.3",
        "power": 1.160,
        "bonus": 0.25,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerMiner S5+",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b08a9d1d9ee5894f36f2f.gif?v=1.0.3",
        "power": 4.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 3
    },
    {
        "name": "RollerMiner S7",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b022dd1d9ee5894f36f2d.gif?v=1.0.3",
        "power": 1.320,
        "bonus": 0.25,
        "cells": 1,
        "qty": 3
    },
    {
        "name": "Rolleron 741",
        "img": "https://static.rollercoin.com/static/img/market/miners/5a0b08a7d1d9ee5894f36f2e.gif?v=1.0.3",
        "power": 2.730,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Shifter",
        "img": "https://static.rollercoin.com/static/img/market/miners/631f78b98238ed283a2332a3.gif?v=1.0.3",
        "rarity": "II",
        "power": 92.400,
        "bonus": 1.05,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Shrumee",
        "img": "https://static.rollercoin.com/static/img/market/miners/61532146db5008102f9f77f4.gif?v=1.0.3",
        "power": 22.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Tape-Side-A",
        "img": "https://static.rollercoin.com/static/img/market/miners/63930d86380ccf549d7f5c2e.gif?v=1.0.3",
        "power": 188.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Black Pearl",
        "img": "https://static.rollercoin.com/static/img/market/miners/62553dd842a0cd1b7dd592eb.gif?v=1.0.3",
        "power": 50.000,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Thrill Rider",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5617a775e04d9a28543c.gif?v=1.0.3",
        "power": 13.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Turkey Aid 2023",
        "img": "https://static.rollercoin.com/static/img/market/miners/63e4fe2b547cfab9a240e681.gif?v=1.0.3",
        "power": 0.100,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Vyzzarys",
        "img": "https://static.rollercoin.com/static/img/market/miners/631b5619a775e04d9a285471.gif?v=1.0.3",
        "power": 22.400,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    }
];

let newMiners = [];
let smallMiners = [];

miners.forEach(miner => {
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

function normal(){
    for(let i = 0; i < miners.length; i++){
        let power, unit, rarity = "";

        if(miners[i].power >= 1){
            power = miners[i].power;
            unit = "TH/s";
        }
        else{
            power = miners[i].power * 1000;
            unit = "GH/s";
        }

        switch(miners[i].rarity){
            case "II":
                rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_2.png?v=1.0.0"/>`;
                break;
            case "III":
                rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_3.png?v=1.0.0"/>`;
                break;
            case "IV":
                rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_4.png?v=1.0.0"/>`;
                break;
            case "V":
                rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_5.png?v=1.0.0"/>`;
                break;
            case "VI":
                rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_6.png?v=1.0.0"/>`;
                break;
        }

        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = `<div><img class="single" src="${miners[i].img}"/>${rarity}${miners[i].name}</div>`;
        cell2.innerHTML = power + " " + unit;
        cell3.innerHTML = miners[i].bonus + "%";
    }

}

function crazy(){
    for(let i = 0; i < newMiners.length; i++){
        if(newMiners[i].doubleMiner){
            let power1, power2, unit1, unit2, rarity1 = "", rarity2 = "", bonus1, bonus2;
    
            bonus1 = newMiners[i].miners[0].newBonus != undefined ? newMiners[i].miners[0].newBonus : newMiners[i].miners[0].bonus;
            bonus2 = newMiners[i].miners[1].newBonus != undefined ? newMiners[i].miners[1].newBonus : newMiners[i].miners[1].bonus;
    
            if(newMiners[i].miners[0].power >= 1){
                power1 = newMiners[i].miners[0].power;
                unit1 = "TH/s";
            }
            else{
                power1 = newMiners[i].miners[0].power * 1000;
                unit1 = "GH/s";
            }
    
            if(newMiners[i].miners[1].power >= 1){
                power2 = newMiners[i].miners[1].power;
                unit2 = "TH/s";
            }
            else{
                power2 = newMiners[i].miners[1].power * 1000;
                unit2 = "GH/s";
            }
    
            switch(newMiners[i].miners[0].rarity){
                case "II":
                    rarity1 = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_2.png?v=1.0.0"/>`;
                    break;
                case "III":
                    rarity1 = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_3.png?v=1.0.0"/>`;
                    break;
            }
    
            switch(newMiners[i].miners[1].rarity){
                case "II":
                    rarity2 = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_2.png?v=1.0.0"/>`;
                    break;
                case "III":
                    rarity2 = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_3.png?v=1.0.0"/>`;
                    break;
            }
    
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            
            cell1.innerHTML = `<div><img src="${newMiners[i].miners[0].img}"/>${rarity1}${newMiners[i].miners[0].name}</div><span>➕</span><div><img src="${newMiners[i].miners[1].img}"/>${rarity2}${newMiners[i].miners[1].name}</div>`;
            cell2.innerHTML = `${power1} ${unit1}<span>➕</span>${power2} ${unit2}`;
            cell3.innerHTML = `${bonus1}%<span>➕</span>${bonus2}%`;
        }
        else{
            let power, unit, rarity = "", bonus;
    
            bonus = newMiners[i].newBonus != undefined ? newMiners[i].newBonus : newMiners[i].bonus;
    
            if(newMiners[i].power >= 1){
                power = newMiners[i].power;
                unit = "TH/s";
            }
            else{
                power = newMiners[i].power * 1000;
                unit = "GH/s";
            }
    
            switch(newMiners[i].rarity){
                case "II":
                    rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_2.png?v=1.0.0"/>`;
                    break;
                case "III":
                    rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_3.png?v=1.0.0"/>`;
                    break;
                case "IV":
                    rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_4.png?v=1.0.0"/>`;
                    break;
                case "V":
                    rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_5.png?v=1.0.0"/>`;
                    break;
                case "VI":
                    rarity = `<img class="rarity" src="https://rollercoin.com/static/img/storage/rarity_icons/level_6.png?v=1.0.0"/>`;
                    break;
            }
    
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
    
            cell1.innerHTML = `<div><img class="single" src="${newMiners[i].img}"/>${rarity}${newMiners[i].name}</div>`;
            cell2.innerHTML = power + " " + unit;
            cell3.innerHTML = bonus + "%";
        }
    }
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