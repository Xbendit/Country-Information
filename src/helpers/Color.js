function countryColor(input) {

    let kleur = '';

    if (input == "Africa") {
        kleur = 'blue';
    } else if (input == "Americas") {
        kleur = "green";
    } else if (input == "Asia") {
        kleur = "red";
    } else if (input == "Europe") {
        kleur = "orange";
    } else {
        kleur = "purple"
    }
    return kleur
}

    export default countryColor;