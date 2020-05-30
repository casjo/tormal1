// Meldung:
// Gratuliere! Du hast gewonnen!
// Du hast 2 Schüsse geschafft, nächstes Mal schaffst du 3!
// Startknopf:
//

// Kleine Helfer
var sekunde = 1000;
var compiDenkt;

// Globale Einstellungen, die nie ändern
var spielDauer = 300 * sekunde;
var compiDenkDauer = 100 * sekunde;
var warteZeit = 4 * sekunde;

// Variablen, die immer etwas ändern.

// Was der Benutzer eingibt
var eingabe;

// Die Zufallszahlen, die wir bei jeder Rechnung berechnen.
var rechenZahl1;
var rechenZahl2;

var compiTore = 0;
var spielerTore = 0;

var spielerSchüsseTotal = 0;

// Sagen wir mal Mitte sei 0. Dann geht der Ball wohl von -3 bis 3.
var ballPosition = 0;

// Unsere Funktionen. Hier erfinden wir sie.

function rechnungStellen() {
  // 2 Zufallszahlen!
  // benutze Math.random() und auch Math.floor()
  // rechenZahl1 = ...

  rechenZahl1 = Math.floor(Math.random() * 10);

  rechenZahl2 = Math.floor(Math.random() * 10);

  compiDenkt = setTimeout(schussCompi, compiDenkDauer);
  // Fokus auf Eingabefeld setzen, damit Spieler einfach tippen kann und nicht zuerst klicken muss.
  htmlEingabe.value = "";
  htmlEingabe.readOnly = false;
  htmlEingabe.focus();
  htmlRechenZahl1.innerText = rechenZahl1;
  htmlRechenZahl2.innerText = rechenZahl2;
}

function prüfeSpielerEingabe() {
  if (eingabe === rechenZahl1 * rechenZahl2) {
    schussSpieler();
  }
}

function schussCompi() {
  // Lösung anzeigen
  ballPosition = ballPosition - 1;
  setzeHtmlBall();
  htmlEingabe.value = rechenZahl1 * rechenZahl2;
  // Eingabefeld Spieler leeren
  prüfeTor();
}

function schussSpieler() {
  // Compi hat verloren, soll nun aufhören zu "überlegen".
  clearTimeout(compiDenkt);
  // TODO: Lösung anzeigen
  ballPosition = ballPosition + 1;
  setzeHtmlBall();
  // TODO: Eingabefeld Spieler leeren
  spielerSchüsseTotal = spielerSchüsseTotal + 1;
  prüfeTor();
}

function prüfeTor() {
  htmlEingabe.readOnly = true;
  if (ballPosition === -3 || ballPosition === 3) {
    ballPosition = 0;
    setzeHtmlBall();

    if (ballPosition === -3) {
      compiTore = compiTore + 1;
    } else {
      spielerTore = spielerTore + 1;
    }

    htmlCompiTore.innerText = compiTore;
    htmlSpielerTore.innerText = spielerTore;
  }

  setTimeout(rechnungStellen, warteZeit);
}

function start() {
  htmlSplash.classList.add("hidden");
  // wichtige Variablen auf 0 zurücksetzen - welche?
  // Punkte beischbil ===5/8
  // was er geschrieben hat
  compiTore = 0;
  spielerTore = 0;
  spielerSchüsseTotal = 0;
  ballPosition = 0;
  setzeHtmlBall();

  rechnungStellen();

  setTimeout(fertig, spielDauer);

  /*
  goals -> 0
  Zeit =300

  Ballposition Mitte                                                                                                                                           
  */
}

function fertig() {
  // aless Dunkler
  htmlSplash.classList.remove("hidden");
  // anzeige Gewwwwwwwwonen
  if (spielerTore > compiTore) {
    htmlMeldung.innerText = "Gratuliere! Du hast gewonnen!";
  } else {
    htmlMeldung.innerText =
      "Du hast " +
      spielerSchüsseTotal +
      " Schüsse geschafft, nächstes Mal schaffst du " +
      (spielerSchüsseTotal + 1) +
      "!";
  }

  // Damit man auch mit Enter weiterkann
  htmlStartKnopf.focus();
}

/*
 * Mit der webseite synchronisieren
 */

// Diese Elemente verändern wir (oder bei Eingabe: hören wir) auf der Webseite
var htmlBall;
var htmlBall;
var htmlRechenZahl1;
var htmlRechenZahl2;
var htmlMeldung;
var htmlStartKnopf;
var htmlSplash;
var htmlCompiTore;
var htmlSpielerTore;
var htmlEingabe;

function setzeHtmlBall() {
  // wir haben ballPosition und wollen nun den htmlBall richtig zeichnen!

  // 0 -> 50%
  // -3 -> 0%
  // 3 -> 100%
  var prozent = 50 + (ballPosition * 50) / 3;

  // Bsp:                calc(50% - 25px)
  htmlBall.style.left = "calc(" + prozent + "% - 25px)";
}

// Was noch?

// Hier: die Liste, worauf das Programm achten muss (also die externen "Ereignisse")

function wennSeiteBereitIst() {
  // Lade alle Elemente, so dass wir sie benutzen können, zum Beispiel unsere Zufallszahlen hineinschreiben.
  // Achtung var ... ausserhalb hier, damit andere zugreifen können
  htmlBall = window.document.getElementById("ball");
  htmlRechenZahl1 = window.document.getElementById("zahl1");
  htmlRechenZahl2 = window.document.getElementById("zahl2");
  htmlMeldung = window.document.getElementById("meldung");
  htmlStartKnopf = window.document.getElementById("startknopf");
  htmlSplash = window.document.getElementById("splash");
  htmlCompiTore = window.document.getElementById("tor-compi");
  htmlSpielerTore = window.document.getElementById("tor-spieler");
  htmlEingabe = window.document.getElementById("eingabe");
  // Dem Startknopf zuhören, wann er gedrückt wird.
  htmlStartKnopf.onclick = start;
  htmlStartKnopf.focus();
  // Dem Eingabefeld zuhören, wenn etwas geschrieben wird.
  htmlEingabe.oninput = function (e) {
    eingabe = parseFloat(e.target.value);
    prüfeSpielerEingabe();
  };
}

// Nachdem jemand zu unserer Seite kommt: Wenn die Webseite mit allen Elementen bereit ist.

window.onload = wennSeiteBereitIst;
