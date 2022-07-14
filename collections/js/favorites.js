let favorites = [
    {
        "category": "Anime",
        "list": [
            {
                "rankedList": [
                    {
                        "title": "Yagate Kimi ni Naru"
                    }
                ]
            },
            {
                "subCategory": "Adventure",
                "rankedList": [
                    {
                        "title": "Sora yori mo Tooi Basho"
                    }
                ]
            },
            {
                "subCategory": "Horror",
                "rankedList": [
                    {
                        "title": "Higurashi no Naku Koro ni"
                    },
                    {
                        "title": "Mayoiga"
                    },
                    {
                        "title": "Another"
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
                    },
                    {
                        "title": "citrus"
                    }
                ]
            },
            {
                "subCategory": "Waifu",
                "rankedList": [
                    {
                        "title": "Koito Yuu",
                        "subTitle": "Yagate Kimi ni Naru"
                    },
                    {
                        "title": "Yamamura Kumiko",
                        "subTitle": "Josee to Tora to Sakana-tachi"
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
            content += `<li>${rankedItem.title}${rankedItem.subTitle != undefined ? `<span>${rankedItem.subTitle}</span>` : ""}</li>`;
        });
        content += "</ol>";
    })
});

document.querySelector(".container").innerHTML = content;