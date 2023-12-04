const jatekosokLink = "https://www.balldontlie.io/api/v1/players";
const csapatokLink = "https://www.balldontlie.io/api/v1/teams";

let jelenlegiOldal = 0;
const oldalMeret = 10;

function gombokatFrissit() {
    const eloreGomb = document.getElementById("elore");
    const visszaGomb = document.getElementById("vissza");

    eloreGomb.disabled = false;
    visszaGomb.disabled = false;

    if (jelenlegiOldal === 0) {
        visszaGomb.disabled = true;
    }

    const osszOldalak = Math.ceil(110 / oldalMeret); // Feltételezve, hogy összesen 110 játékos van
    if (jelenlegiOldal === osszOldalak - 1) {
        eloreGomb.disabled = true;
    }
}

function jatekosAdatokatLeker(jelenlegiOldal) {
    const eltolas = jelenlegiOldal * oldalMeret;
    const url = `${jatekosokLink}?per_page=${oldalMeret}&page=${eltolas / oldalMeret + 1}`;

    const ujUrl = `${window.location.href.split('?')[0]}?oldal=${jelenlegiOldal + 1}`;
    window.history.pushState({ path: ujUrl }, '', ujUrl);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let tartalom = `<ul>`;
            for (let jatekos of data.data) {
                tartalom += `<li>${jatekos.first_name} ${jatekos.last_name} csapat: ${jatekos.team.full_name} </li>`;
            }
            tartalom += `</ul>`;
            document.getElementById("jatekos").innerHTML = tartalom;
            gombokatFrissit();
        })
        .catch(err => {
            document.getElementById("jatekos").innerHTML = `Valami hiba történt: ${err}`;
        });
}

document.getElementById("elore").addEventListener("click", () => {
    console.log("A tovább gomb működik.");
    jelenlegiOldal++;
    jatekosAdatokatLeker(jelenlegiOldal);
});

document.getElementById("vissza").addEventListener("click", () => {
    console.log("A vissza gomb működik.");
    if (jelenlegiOldal > 0) {
        jelenlegiOldal--;
        jatekosAdatokatLeker(jelenlegiOldal);
    }
});

jatekosAdatokatLeker(jelenlegiOldal);