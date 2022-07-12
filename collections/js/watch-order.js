let series = [
    {
        "name": "Higurashi no Naku Koro ni",
        "list": [
            {
                "title": "Higurashi no Naku Koro ni",
                "link": "https://anilist.co/anime/934/Higurashi-no-Naku-Koro-ni/",
                "tags": "ひぐらしのなく頃に/When They Cry"
            },
            {
                "title": "Higurashi no Naku Koro ni: Nekogoroshi-hen",
                "link": "https://anilist.co/anime/2899/Higurashi-no-Naku-Koro-ni-Nekogoroshihen/"
            },
            {
                "title": "Higurashi no Naku Koro ni Kaku: Outbreak",
                "link": "https://anilist.co/anime/16700/Higurashi-no-Naku-Koro-ni-Kaku-Outbreak/"
            },
            {
                "title": "Higurashi no Naku Koro ni Kira",
                "link": "https://anilist.co/anime/10491/Higurashi-no-Naku-Koro-ni-Kira/"
            },
            {
                "title": "Higurashi no Naku Koro ni Kai",
                "link": "https://anilist.co/anime/1889/Higurashi-no-Naku-Koro-ni-Kai/"
            },
            {
                "title": "Ura☆Higu",
                "link": "https://anilist.co/anime/6064/UraHigu/",
                "tags": "うら☆ひぐ/Ura Higu"
            },
            {
                "title": "Higurashi no Naku Koro ni Rei",
                "link": "https://anilist.co/anime/3652/Higurashi-no-Naku-Koro-ni-Rei/"
            },
            {
                "title": "Higurashi no Naku Koro ni Gou",
                "link": "https://anilist.co/anime/114446/Higurashi-no-Naku-Koro-ni-Gou/"
            },
            {
                "title": "Higurashi no Naku Koro ni Sotsu",
                "link": "https://anilist.co/anime/131149/Higurashi-no-Naku-Koro-ni-Sotsu/"
            }
        ]
    },
    {
        "name": "Yagate Kimi ni Naru",
        "list": [
            {
                "title": "Yagate Kimi ni Naru",
                "link": "https://anilist.co/anime/101573/Yagate-Kimi-ni-Naru/",
                "tags": "やがて君になる/Bloom Into You/YagaKimi"
            }
        ]
    },
    {
        "name": "Yahari Ore no Seishun Love Come wa Machigatteiru.",
        "list": [
            {
                "title": "Yahari Ore no Seishun Love Come wa Machigatteiru.",
                "link": "https://anilist.co/anime/14813/Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru/",
                "": "やはり俺の青春ラブコメはまちがっている。/俺ガイル/Oregairu/My Teen Romantic Comedy SNAFU/My youth romantic comedy is wrong as I expected."
            },
            {
                "title": "Yahari Ore no Seishun Love Come wa Machigatteiru.: Kochira to Shite mo Karera Kanojora no Yukusue ni Sachi Ookaran Koto wo Negawazaru wo Enai.",
                "link": "https://anilist.co/anime/18753/Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru-Kochira-to-Shite-mo-Karera-Kanojora-no-Yukusue-ni-Sachi-Ookaran-Koto-wo-Negawazaru-wo-Enai/"
            },
            {
                "title": "Yahari Ore no Seishun Love Come wa Machigatteiru. Zoku",
                "link": "https://anilist.co/anime/20698/Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru-Zoku/"
            },
            {
                "title": "Yahari Ore no Seishun Love Come wa Machigatteiru. Zoku: Kitto, Onnanoko wa Osatou to Spice to Suteki na Nanika de Dekiteiru",
                "link": "https://anilist.co/anime/21769/Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru-Zoku-Kitto-Onnanoko-wa-Osatou-to-Spice-to-Suteki-na-Nanika-de-Dekiteiru/"
            },
            {
                "title": "Yahari Ore no Seishun Love Come wa Machigatteiru. Kan",
                "link": "https://anilist.co/anime/108489/Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru-Kan/"
            },
            {
                "title": "Yahari Ore no Seishun Love Come wa Machigatteiru. Kan OVA",
                "link": "https://anilist.co/anime/128643/Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru-Kan-OVA/"
            }
        ]
    }
];
let search = document.querySelector(".search");

function showList(){
    let content = "";

    series.forEach(show => {
        if(search.value == null || JSON.stringify(show).match(new RegExp(search.value, "mi"))){
            content += `<p>${show.name}</p>`;
            content += "<ol>";
            show.list.forEach(item => {
                content += `<a href="${item.link}" target="_blank"><li>${item.title}</li></a>`;
            })
            content += "</ol>";
        }
    });

    document.querySelector(".container").innerHTML = content;
}

showList();