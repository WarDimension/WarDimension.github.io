let series = [
    {
        "name": "Higurashi no Naku Koro ni",
        "list": [
            {
                "title": "Higurashi no Naku Koro ni",
                "link": "https://anilist.co/anime/934/Higurashi-no-Naku-Koro-ni/"
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
                "title": "",
                "link": ""
            },
            {
                "title": "",
                "link": ""
            }
        ]
    },
    {
        "name": "Yagate Kimi ni Naru",
        "list": [
            {
                "title": "Yagate Kimi ni Naru",
                "link": "https://anilist.co/anime/101573/Yagate-Kimi-ni-Naru/"
            }
        ]
    }
];
let search = document.querySelector(".search");

function showList(){
    let content = "";

    series.forEach(show => {
        if(search.value == null || JSON.stringify(show).toLowerCase().includes(search.value.toLowerCase())){
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