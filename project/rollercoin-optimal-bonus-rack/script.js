const miners = [
    {
        "name": "Cerberus II",
        "power": 145.530,
        "bonus": 0.55,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Chattanooga Choo",
        "power": 20.230,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "CP-106",
        "power": 11.106,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Crimson Bloom",
        "power": 40.000,
        "bonus": 1,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Deepdiver",
        "power": 12.500,
        "bonus": 0.25,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Disco-Roll",
        "power": 36.300,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Doggie-Woogie",
        "power": 0.010,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Hasher’s Egg",
        "power": 21.600,
        "bonus": 0,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "JBS-200",
        "power": 13.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 4
    },
    {
        "name": "Jungle King",
        "power": 16.800,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Mergedge",
        "power": 3.825,
        "bonus": 0,
        "cells": 2,
        "qty": 3
    },
    {
        "name": "Mergedge II",
        "power": 8.925,
        "bonus": 0.14,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Nuc",
        "power": 26.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Radio Gaga",
        "power": 15.400,
        "bonus": 0,
        "cells": 2,
        "qty": 2
    },
    {
        "name": "RollerArc S1",
        "power": 0.150,
        "bonus": 0.1,
        "cells": 1,
        "qty": 9
    },
    {
        "name": "RollerArc S1 II",
        "power": 0.420,
        "bonus": 0.11,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerArc S1 III",
        "power": 1.050,
        "bonus": 0.11,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "RollerMiner R4",
        "power": 6.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerMiner S4",
        "power": 1.160,
        "bonus": 0.25,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "RollerMiner S5+",
        "power": 4.000,
        "bonus": 0.5,
        "cells": 1,
        "qty": 3
    },
    {
        "name": "RollerMiner S7",
        "power": 1.320,
        "bonus": 0.25,
        "cells": 1,
        "qty": 2
    },
    {
        "name": "Rolleron 741",
        "power": 2.730,
        "bonus": 0.5,
        "cells": 1,
        "qty": 1
    },
    {
        "name": "Shifter II",
        "power": 92.400,
        "bonus": 1.05,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Black Pearl",
        "power": 50.000,
        "bonus": 0.5,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "The Thrill Rider",
        "power": 13.000,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Turkey Aid 2023",
        "power": 0.100,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    },
    {
        "name": "Vyzzarys",
        "power": 22.400,
        "bonus": 0,
        "cells": 2,
        "qty": 1
    }
];

let newMiners = [];
let smallMiners = [];

miners.forEach(miner => {
    switch(miner.cells){
        case 1:
            for(let i = 1; i <= miner.qty; i++){
                smallMiners.push(miner);
            }
            break;
        case 2:
            for(let i=1; i<=miner.qty;i++){
                newMiners.push(miner);
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
            newMiners.push({"doubleMiner": true, "power": smallMiners[i].power + smallMiners[i+1].power, "bonus": smallMiners[i].bonus + smallMiners[i+1].bonus, "miners": [smallMiners[i], smallMiners[i+1]]});
            break;
    }
}

newMiners.sort((a, b) => b.power-a.power);

const table = document.querySelector(".miner-table");

for(let i = 0; i < newMiners.length; i++){
    if(newMiners[i].doubleMiner){
        let power1, power2, unit1, unit2;

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

        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        
        cell1.innerHTML = `${newMiners[i].miners[0].name}<span>➕</span>${newMiners[i].miners[1].name}`;
        cell2.innerHTML = `${power1} ${unit1}<span>➕</span>${power2} ${unit2}`;
        cell3.innerHTML = `${newMiners[i].miners[0].bonus}%<span>➕</span>${newMiners[i].miners[1].bonus}%`;
    }
    else{
        let power, unit;

        if(newMiners[i].power >= 1){
            power = newMiners[i].power;
            unit = "TH/s";
        }
        else{
            power = newMiners[i].power * 1000;
            unit = "GH/s";
        }

        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = newMiners[i].name;
        cell2.innerHTML = power + " " + unit;
        cell3.innerHTML = newMiners[i].bonus + "%";
    }
}