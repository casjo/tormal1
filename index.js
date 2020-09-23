// hier speichern wir Dinge fürs nächste Spiel

// vergessen: funktionen: imBrowserSpeichern(7), und: vomBrowserLaden() => 7

// --> funktonen: timerStarten(), timerLesen() <-- gibt die Zeit zurück seit timerStarten()

// Meldung:
// Gratuliere! Du hast gewonnen!
// Du hast 2 Schüsse geschafft, nächstes Mal schaffst du 3!
// Startknopf:
//

// Kleine Helfer
var sekunde = 1000;
var compiDenkt;
var lösungBaldAus;

// Unser Timer
var startZeit;

var highscore = Number(localStorage.getItem('highscore') || 0);

new Date().getTime();

function timerStarten() {
  startZeit = new Date().getTime();
}

function timerLesen() {
  var jetzt = new Date().getTime();
  var dauer = jetzt - startZeit;
  return dauer;
}

// 400, damit bei 8 Sekunden denkDauer der Level grad 50 ist.
var LEVEL_FAKTOR = 400 * sekunde;
var compiAnfangsDenkdauer = 8 * sekunde;

function tempo() {
  return Math.floor(LEVEL_FAKTOR / compiDenkDauer);
}

function setzeDenkdauer(neueDauer) {
  neueDauer = Math.floor(neueDauer)
  compiDenkDauer = neueDauer;
  localStorage.setItem('denkDauer', neueDauer);
}

function setzeHighscore(neueScore) {
  highscore = neueScore;
  localStorage.setItem('highscore', neueScore);
}

// Globale Einstellungen, die nie ändern
var spielDauer = 60 * sekunde;
var compiDenkDauer = Number(
  localStorage.getItem('denkDauer') || compiAnfangsDenkdauer
);
var warteZeit = 3 * sekunde;

// Variablen, die immer etwas ändern.

// Was der Benutzer eingibt
var eingabe;

// Die Zufallszahlen, die wir bei jeder Rechnung berechnen.
var rechenZahl1;
var rechenZahl2;

var compiTore = 0;
var spielerTore = 0;

var spielerSchüsseTotal = 0;

// Für den Durchschnitt
var denkdauerTotal = 0;
var schüsseTotal = 0;

// Sagen wir mal Mitte sei 0. Dann geht der Ball wohl von -3 bis 3.
var ballPosition = 0;

// Diese Elemente verändern wir (oder bei Eingabe: hören wir) auf der Webseite
var htmlBall;
var htmlRechenZahl1;
var htmlRechenZahl2;
var htmlMeldung;
var htmlStartKnopf;
var htmlSplash;
var htmlCompiTore;
var htmlSpielerTore;
var htmlEingabe;
var htmlAusruf;

// Unsere Funktionen. Hier erfinden wir sie.

function rechnungStellen() {
  // 2 Zufallszahlen!
  // benutze Math.random() und auch Math.floor()
  // rechenZahl1 = ...
  timerStarten();
  rechenZahl1 = Math.floor(Math.random() * 10);

  rechenZahl2 = Math.floor(Math.random() * 10);

  compiDenkt = setTimeout(schussCompi, compiDenkDauer);
  // Fokus auf Eingabefeld setzen, damit Spieler einfach tippen kann und nicht zuerst klicken muss.
  htmlEingabe.value = '';
  htmlRechenZahl1.innerText = rechenZahl1;
  htmlRechenZahl2.innerText = rechenZahl2;
  htmlEingabe.focus();
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
  prüfeTor();
}

function schussSpieler() {
  // Compi hat verloren, soll nun aufhören zu "überlegen".
  clearTimeout(compiDenkt);
  // TODO: Lösung anzeigen
  ballPosition = ballPosition + 1;
  setzeHtmlBall();
  spielerSchüsseTotal = spielerSchüsseTotal + 1;
  prüfeTor();
}

function lösungEinOderAus(aktiv) {
  if (aktiv === true) {
    htmlAusruf.innerText = 'Schuss!';
    htmlEingabe.readOnly = true;
    htmlRechenZahl1.classList.add('lösung');
    htmlRechenZahl2.classList.add('lösung');
    htmlEingabe.classList.add('lösung');
  } else {
    htmlAusruf.innerText = '';
    htmlEingabe.readOnly = false;
    htmlRechenZahl1.classList.remove('lösung');
    htmlRechenZahl2.classList.remove('lösung');
    htmlEingabe.classList.remove('lösung');
  }
}

function prüfeTor() {
  var schussDauer = timerLesen();

  // denkdauerTotal um schussDauer erhöhen
  denkdauerTotal = denkdauerTotal + schussDauer;

  schüsseTotal = schüsseTotal + 1;

  var tor = false;

  lösungEinOderAus(true);

  if (ballPosition === -3 || ballPosition === 3) {
    htmlAusruf.innerText = 'Tor!';
    tor = true;

    if (ballPosition === -3) {
      compiTore = compiTore + 1;
    } else {
      spielerTore = spielerTore + 1;
    }

    htmlCompiTore.innerText = compiTore;
    htmlSpielerTore.innerText = spielerTore;
  }

  lösungBaldAus = setTimeout(function () {
    lösungEinOderAus(false);

    if (tor) {
      ballPosition = 0;
      setzeHtmlBall();
    }
    rechnungStellen();
  }, warteZeit);
}

function start() {
  htmlSplash.classList.add('hidden');
  // wichtige Variablen auf 0 zurücksetzen - welche?
  // Punkte beischbil ===5/8
  // was er geschrieben hat
  compiTore = 0;
  htmlCompiTore.innerText = compiTore;
  spielerTore = 0;
  htmlSpielerTore.innerText = spielerTore;
  spielerSchüsseTotal = 0;
  ballPosition = 0;
  setzeHtmlBall();

  setTimeout(fertig, spielDauer);

  rechnungStellen();

  /*
  goals -> 0
  Zeit =300

  Ballposition Mitte                                                                                                                                           
  */
}

function fertig() {
  // Ball setzen braucht Zeit. Es sieht schöner aus, wenn wir ihn hier zurücksetzen,
  // als erst wenn das Spiel wieder beginnt.
  ballPosition = 0;
  setzeHtmlBall();
  // Falls Spiel aus ist, wenn lösung ein, dann blockiert das Eingabefeld beim
  // nächsten Spiel.
  lösungEinOderAus(false);

  // Durchschnittszeit um eine Rechnung zu lösen
  var durchschnittsZeit = denkdauerTotal / schüsseTotal;
  // aless Dunkler
  clearTimeout(compiDenkt);
  clearTimeout(lösungBaldAus);
  htmlSplash.classList.remove('hidden');
  // anzeige Gewwwwwwwwonen
  var altesTempo = tempo();
  if (spielerTore > compiTore) {
    if (altesTempo > highscore) {
      setzeHighscore(altesTempo);
    }
    setzeDenkdauer(durchschnittsZeit);
    htmlHighscore.innerText = highscore;

    var nochmalsSpielenText =
      tempo() < highscore
        ? 'Willst du nochmals spielen?'
        : 'Schaffst du das Tempo für einen neuen Rekord nochmals?';

    htmlMeldung.innerHTML =
      'Gratuliere! Du hast Tempo ' +
      tempo() +
      ' erreicht!<br /><br />' +
      nochmalsSpielenText;
  } else {
    setzeDenkdauer(compiDenkDauer + 1 * sekunde);
    htmlHighscore.innerText = highscore;
    htmlMeldung.innerHTML =
      'Du hast ' +
      spielerSchüsseTotal +
      (spielerSchüsseTotal === 1 ? ' Schuss' : ' Schüsse') +
      ' auf Tempo ' +
      altesTempo +
      ' geschafft!<br /><br />Spielst du nochmals etwas langsamer?';
  }

  // Damit man auch mit Enter weiterkann
  htmlStartKnopf.focus();
}

/*
 * Mit der webseite synchronisieren
 */

function setzeHtmlBall() {
  // wir haben ballPosition und wollen nun den htmlBall richtig zeichnen!

  // 0 -> 50%
  // -3 -> 0%
  // 3 -> 100%
  var prozent = 50 + (ballPosition * 50) / 3;

  // Bsp:                calc(50% - 1.5em)
  htmlBall.style.left = 'calc(' + prozent + '% - 1.5em)';
}
// Was noch?

// Hier: die Liste, worauf das Programm achten muss (also die externen "Ereignisse")

function wennSeiteBereitIst() {
  // Lade alle Elemente, so dass wir sie benutzen können, zum Beispiel unsere Zufallszahlen hineinschreiben.
  // Achtung var ... ausserhalb hier, damit andere zugreifen können
  htmlBall = window.document.getElementById('ball');
  htmlRechenZahl1 = window.document.getElementById('zahl1');
  htmlRechenZahl2 = window.document.getElementById('zahl2');
  htmlMeldung = window.document.getElementById('meldung');
  htmlHighscore = window.document.getElementById('highscore');
  htmlStartKnopf = window.document.getElementById('startknopf');
  htmlSplash = window.document.getElementById('splash');
  htmlCompiTore = window.document.getElementById('tor-compi');
  htmlSpielerTore = window.document.getElementById('tor-spieler');
  htmlEingabe = window.document.getElementById('eingabe');
  htmlAusruf = window.document.getElementById('ausruf');
  // Dem Startknopf zuhören, wann er gedrückt wird.
  htmlStartKnopf.onclick = start;
  htmlStartKnopf.focus();
  // Dem Eingabefeld zuhören, wenn etwas geschrieben wird.
  htmlEingabe.oninput = function (e) {
    eingabe = parseFloat(e.target.value);
    prüfeSpielerEingabe();
  };

  // Willkommensgruss
  htmlHighscore.innerText = highscore;
  htmlMeldung.innerHTML =
    'Willkommen bei Tormal1!<br /><br /> Spieltempo: ' +
    tempo() +
    '<br /><br />Ein Spiel dauert ' +
    spielDauer / sekunde +
    ' Sekunden.';
}

// Nachdem jemand zu unserer Seite kommt: Wenn die Webseite mit allen Elementen bereit ist.

window.onload = wennSeiteBereitIst;
