// ==UserScript==
// @name         MyWaifuList Table Fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mywaifulist.moe/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mywaifulist.moe
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let style = document.createElement("style");
    style.type = "text/css";

    style.innerHTML += `*{
        white-space: normal !important;
        word-wrap: break-word;
    }
    td{
        max-width: 200px;
    }`;

    document.head.appendChild(style);
})();