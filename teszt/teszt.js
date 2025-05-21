import Model from "../PUBLIC/Model.js";
// itt hívom meg a teszteket
removeKosarItemTeszt();
decreaseQuantityTeszt();
getKosarDarabszamTeszt();
kosarbaGombMegjelenesTeszt();

function removeKosarItemTeszt() {
    const model = new Model();
    const termek = { id: 111, nev: "Dinnye", ar: 500 };
    model.addKosar(termek);
    console.assert(model.getKosarLista().length === 1, "Hiba: A termék nem került be a kosárba");
    
    model.removeKosarItem(111);
    console.assert(model.getKosarLista().length === 0, "Hiba: A terméket nem törölte a kosárból");

    model.removeKosarItem(999);
    console.assert(model.getKosarLista().length === 0, "Hiba: Nem létező ID törlése hibát okozott vagy módosította a kosarat");
    console.log("removeKosarItemTeszt lefutott");
}
function decreaseQuantityTeszt() {
    const model = new Model();
    const termek = { id: 222, nev: "Alma", ar:300 };
    model.addKosar(termek);
    model.addKosar(termek);
    console.assert(model.getKosarLista()[0].mennyiseg === 2, "Hiba: nem megfelelő a kezdeti mennyiség");

    model.decreaseQuantity(222);
    let kosar = model.getKosarLista();
    console.assert(kosar[0].mennyiseg === 1, "Hiba: nem csökkent 1-re a mennyiség");

    model.decreaseQuantity(222);
    kosar = model.getKosarLista();
    console.assert(kosar.length === 0, "Hiba: nem törölte a terméket, amikor a mennyiség 1 volt");

    model.decreaseQuantity(999);
    console.assert(true, "Hiba: nem létező ID csökkentése");
    console.log("decreaseQuantityTeszt lefutott");
}
function getKosarDarabszamTeszt() {
    const model = new Model();
    const termek1 = { id: 333, nev: "Korte", ar: 350 }
    const termek2 = { id: 444, nev: "eper", ar: 200 }
    model.addKosar(termek1);
    model.addKosar(termek2);
    console.assert(model.getKosarDarabszam() === 0, "Üres kosár darabszám nem 0");

    model.addKosar(termek1);
    console.assert(model.getKosarDarabszam() === 1, "1 termék után nem 1 a darabszám");
    model.addKosar(termek1);
    console.assert(model.getKosarDarabszam() === 2, "2x hozzáadott termék után nem 2 a darabszám");
    model.addKosar(termek2);
    console.assert(model.getKosarDarabszam() === 3, "Két különböző termék után nem 3 a darabszám");
    model.increaseQuantity(2);
    console.assert(model.getKosarDarabszam() === 4, "Mennyiség növelés után nem 4 a darabszám");
    model.decreaseQuantity(1);
    console.assert(model.getKosarDarabszam() === 3, "Csökkentés után hibás a darabszám");
    model.removeKosarItem(1);
    console.assert(model.getKosarDarabszam() === 2, "Eltávolítás után hibás a darabszám");
    console.log("getKosarDarabszamTeszt lefutott");
}

function kosarbaGombMegjelenesTeszt() {
    document.body.innerHTML = `<div id="termekek"></div>`;
    const tesztTermekLista = [
        { id: 10, nev: "Banán", ar: 200 },
        { id: 11, nev: "Narancs", ar: 350 },
        { id: 12, nev: "Szilva", ar: 180 }
    ];
    const model = new Model();
    model.getTermekLista = () => tesztTermekLista;
    new Termekek(model, document.getElementById("termekek"));

    console.log("kosarbaGombMegjelenesTeszt lefutott");
}

