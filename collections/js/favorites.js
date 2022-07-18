let favorites = [
    {
        "category": "Anime",
        "list": [
            {
                "rankedList": [
                    {
                        "title": "Yagate Kimi ni Naru",
                        "link": "./watch-order?s=やがて君になる"
                    }
                ]
            },
            {
                "subCategory": "Adventure",
                "rankedList": [
                    {
                        "title": "Sora yori mo Tooi Basho",
                        "link": "./watch-order?s=宇宙よりも遠い場所"
                    }
                ]
            },
            {
                "subCategory": "Horror",
                "rankedList": [
                    {
                        "title": "Higurashi no Naku Koro ni",
                        "link": "./watch-order?s=ひぐらしのなく頃に"
                    },
                    {
                        "title": "Mayoiga",
                        "link": "./watch-order?s=迷家-マヨイガ-"
                    },
                    {
                        "title": "Another",
                        "link": "./watch-order?s=アナザー"
                    }
                ]
            },
            {
                "subCategory": "Psychological",
                "rankedList": [
                    {
                        "title": "Aku no Hana",
                        "link": "./watch-order?s=惡の華"
                    }
                ]
            },
            {
                "subCategory": "Yuri",
                "rankedList": [
                    {
                        "title": "Yagate Kimi ni Naru",
                        "link": "./watch-order?s=やがて君になる"
                    },
                    {
                        "title": "citrus",
                        "link": "./watch-order?s=citrus"
                    }
                ]
            },
            {
                "subCategory": "Waifu",
                "rankedList": [
                    {
                        "title": "Koito Yuu",
                        "subTitle": "Yagate Kimi ni Naru",
                        "link": "./waifu?s=小糸侑"
                    },
                    {
                        "title": "Yamamura Kumiko - Josee",
                        "subTitle": "Josee to Tora to Sakana-tachi",
                        "link": "./waifu?s=山村クミ子"
                    }
                ]
            }
        ]
    },
    {
        "category": "Cartoon",
        "list": [
            {
                "rankedList": [
                    {
                        "title": "Adventure Time"
                    },
                    {
                        "title": "Gravity Falls"
                    },
                    {
                        "title": "SpongeBob SquarePants"
                    },
                    {
                        "title": "Rick and Morty"
                    }
                ]
            },
            {
                "subCategory": "Plan to Watch (Probably Will Be One of My Favorites)",
                "rankedList": [
                    {
                        "title": "The Owl House"
                    }
                ]
            }
        ]
    },
    {
        "category": "Games",
        "list": [
            {
                "rankedList": [
                    {
                        "title": "Clone Hero/Guitar Hero/Rock Band"
                    },
                    {
                        "title": "Rocksmith 2014"
                    },
                    {
                        "title": "osu!"
                    },
                    {
                        "title": "Resident Evil"
                    },
                    {
                        "title": "The Adventures of Tintin: The Secret of the Unicorn"
                    }
                ]
            }
        ]
    },
    {
        "category": "Light Novel",
        "list": [
            {
                "rankedList": [
                    {
                        "title": "Yagate Kimi ni Naru Saeki Sayaka ni Tsuite"
                    }
                ]
            }
        ]
    },
    {
        "category": "Manga",
        "list": [
            {
                "rankedList": [
                    {
                        "title": "Yagate Kimi ni Naru"
                    }
                ]
            },
            {
                "subCategory": "Psychological",
                "rankedList": [
                    {
                        "title": "Aku no Hana"
                    }
                ]
            },
            {
                "subCategory": "Yuri",
                "rankedList": [
                    {
                        "title": "Yagate Kimi ni Naru"
                    }
                ]
            }
        ]
    },
    {
        "category": "Music",
        "list": [
            {
                "subCategory": "Band",
                "rankedList": [
                    {
                        "title": "nano.RIPE"
                    }
                ]
            },
            {
                "subCategory": "Composer",
                "rankedList": [
                    {
                        "title": "Frédéric Chopin"
                    }
                ]
            },
            {
                "subCategory": "Guitar Solo",
                "rankedList": [
                    {
                        "title": "Naisho no Hanashi",
                        "subTitle": "ClariS"
                    },
                    {
                        "title": "Haru Natsu Aki Fuyu",
                        "subTitle": "sumika"
                    }
                ]
            },
            {
                "subCategory": "Singer",
                "rankedList": [
                    {
                        "title": "Sayuri"
                    },
                    {
                        "title": "Kimiko",
                        "subTitle": "nano.RIPE"
                    }
                ]
            },
            {
                "subCategory": "Song",
                "rankedList": [
                    {
                        "title": "Furaregai Girl",
                        "subTitle": "Sayuri"
                    }
                ]
            },
            {
                "subCategory": "Vocal",
                "rankedList": [
                    {
                        "title": "Furaregai Girl",
                        "subTitle": "Sayuri"
                    },
                    {
                        "title": "Taisetsu na Kimi no Tame ni, Boku ni Dekiru Ichiban no Koto",
                        "subTitle": "Duca"
                    }
                ]
            }
        ]
    }
];

let content = "";

favorites.forEach(favorite => {
    content += `<p>${favorite.category}</p>`;
    favorite.list.forEach(item => {
        item.subCategory != undefined ? content += `<span>${item.subCategory}</span>` : "";
        content += "<ol>";
        item.rankedList.forEach(rankedItem => {
            let link = rankedItem.link != undefined ? `<a href="${rankedItem.link}" target="_blank">` : "";
            content += `${link}<li>${rankedItem.title}${rankedItem.subTitle != undefined ? `<span>${rankedItem.subTitle}</span>` : ""}</li>`;
            content += link != "" ? "</a>" : "";
        });
        content += "</ol>";
    })
});

document.querySelector(".container").innerHTML = content;