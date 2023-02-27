const miners = [
    {
        "name": "test1",
        "power": 1000,
        "bonus": 5,
        "cells": 2,
        "qty": 2
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
        
        cell1.innerHTML = `${newMiners[i].miners[0].name} + ${newMiners[i].miners[1].name}`;
        cell2.innerHTML = `${power1} ${unit1} + ${power2} ${unit2}`;
        cell3.innerHTML = `${newMiners[i].miners[0].bonus}% + ${newMiners[i].miners[1].bonus}%`;
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