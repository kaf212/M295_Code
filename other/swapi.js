async function getCharacterOverview(id) {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const character = await response.json();
    console.log(
        `Name:\t\t${character.name}\nBirth year:\t${character.birth_year}`
    )

}

getCharacterOverview(1)
