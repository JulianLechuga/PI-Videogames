    for (let i = 0; i < 30; i++) { //108
        try {
            let videogamesAPI =  `https://api.rawg.io/api/games/${i}?key=${API_KEY}`
            let videogamesData = await axios(videogamesAPI);
            finalData = await videogamesData.data
            if (!finalData.detail) {
                await Videogame.create({
                    id: finalData.id,
                    name: finalData.name,
                    description: finalData.description.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br />","").replaceAll("<br/>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("<ul>","").replaceAll("</ul>","").replaceAll("<li>","").replaceAll("</li>","").replaceAll("[object Object]",""),
                    released: finalData.released ,
                    platforms: finalData.platforms.map(ps => ps.platform.name),
                    background_image: finalData.background_image,
                    rating: finalData.rating,
                    metacritic: finalData.metacritic,
                    playtime: parseInt(finalData.playtime),
                })
            let genreMap = finalData.genres.map(g => g.id)
            if ( typeof genreMap[0] === "number") {
                for (let j = 0; j < genreMap.length; j++) {
                    let toSet = await Videogame.findByPk(finalData.id)
                    let genreBdd = await Genre.findByPk(genreMap[j])
                    await toSet.addGenres(genreBdd)
                    }
                }
            }
        } catch (error) {
            continue
        };
    };