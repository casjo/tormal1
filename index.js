// Meldung:
// Gratuliere! Du hast gewonnen!
// Du hast 2 Schüsse geschafft, nächstes Mal schaffst du 3!
// Startknopf:
//

// Kleine Helfer
var sekunde = 1000
var compiDenkt
var zeigeLösung

// Globale Einstellungen, die nie ändern
var spielDauer = 180 * sekunde
var compiDenkDauer = 10 * sekunde
var warteZeit = 3 * sekunde

// Variablen, die immer etwas ändern.

// Was der Benutzer eingibt
var eingabe

// Die Zufallszahlen, die wir bei jeder Rechnung berechnen.
var rechenZahl1
var rechenZahl2

var compiTore = 0
var spielerTore = 0

var spielerSchüsseTotal = 0

// Sagen wir mal Mitte sei 0. Dann geht der Ball wohl von -3 bis 3.
var ballPosition = 0

// Diese Elemente verändern wir (oder bei Eingabe: hören wir) auf der Webseite
var htmlBall
var htmlRechenZahl1
var htmlRechenZahl2
var htmlMeldung
var htmlStartKnopf
var htmlSplash
var htmlCompiTore
var htmlSpielerTore
var htmlEingabe
var htmlAusruf

// Unsere Funktionen. Hier erfinden wir sie.

function rechnungStellen() {
  // 2 Zufallszahlen!
  // benutze Math.random() und auch Math.floor()
  // rechenZahl1 = ...

  rechenZahl1 = Math.floor(Math.random() * 10)

  rechenZahl2 = Math.floor(Math.random() * 10)

  compiDenkt = setTimeout(schussCompi, compiDenkDauer)
  // Fokus auf Eingabefeld setzen, damit Spieler einfach tippen kann und nicht zuerst klicken muss.
  htmlEingabe.value = ''
  htmlEingabe.focus()
  htmlRechenZahl1.innerText = rechenZahl1
  htmlRechenZahl2.innerText = rechenZahl2
}

function prüfeSpielerEingabe() {
  if (eingabe === rechenZahl1 * rechenZahl2) {
    schussSpieler()
  }
}

function schussCompi() {
  // Lösung anzeigen
  ballPosition = ballPosition - 1
  setzeHtmlBall()
  htmlEingabe.value = rechenZahl1 * rechenZahl2
  // Eingabefeld Spieler leeren
  prüfeTor()
}

function schussSpieler() {
  // Compi hat verloren, soll nun aufhören zu "überlegen".
  clearTimeout(compiDenkt)
  // TODO: Lösung anzeigen
  ballPosition = ballPosition + 1
  setzeHtmlBall()
  // TODO: Eingabefeld Spieler leeren
  spielerSchüsseTotal = spielerSchüsseTotal + 1
  prüfeTor()
}

function prüfeTor() {
  htmlAusruf.innerText = 'Schuss!'
  var tor = false

  htmlEingabe.readOnly = true
  htmlRechenZahl1.classList.add('lösung')
  htmlRechenZahl2.classList.add('lösung')
  htmlEingabe.classList.add('lösung')

  if (ballPosition === -3 || ballPosition === 3) {
    htmlAusruf.innerText = 'Tor!'
    tor = true

    if (ballPosition === -3) {
      compiTore = compiTore + 1
    } else {
      spielerTore = spielerTore + 1
    }

    htmlCompiTore.innerText = compiTore
    htmlSpielerTore.innerText = spielerTore
  }

  zeigeLösung = setTimeout(function () {
    htmlAusruf.innerText = ''
    htmlRechenZahl1.classList.remove('lösung')
    htmlRechenZahl2.classList.remove('lösung')
    htmlEingabe.classList.remove('lösung')
    htmlEingabe.readOnly = false

    if (tor) {
      ballPosition = 0
      setzeHtmlBall()
    }
    rechnungStellen()
  }, warteZeit)
}

function start() {
  htmlSplash.classList.add('hidden')
  // wichtige Variablen auf 0 zurücksetzen - welche?
  // Punkte beischbil ===5/8
  // was er geschrieben hat
  compiTore = 0
  htmlCompiTore.innerText = compiTore
  spielerTore = 0
  htmlSpielerTore.innerText = spielerTore
  spielerSchüsseTotal = 0
  ballPosition = 0
  setzeHtmlBall()

  rechnungStellen()

  setTimeout(fertig, spielDauer)

  /*
  goals -> 0
  Zeit =300

  Ballposition Mitte                                                                                                                                           
  */
}

function fertig() {
  // aless Dunkler
  clearTimeout(compiDenkt)
  clearTimeout(zeigeLösung)
  htmlSplash.classList.remove('hidden')
  // anzeige Gewwwwwwwwonen
  if (spielerTore > compiTore) {
    htmlMeldung.innerText =
      'Gratuliere! Du hast gewonnen! Willst du nochmals spielen?'
  } else {
    htmlMeldung.innerText =
      'Du hast ' +
      spielerSchüsseTotal +
      (spielerSchüsseTotal === 1 ? ' Schuss' : ' Schüsse') +
      ' geschafft, nächstes Mal schaffst du ' +
      (spielerSchüsseTotal + 1) +
      '! Nochmals spielen?'
  }

  // Damit man auch mit Enter weiterkann
  htmlStartKnopf.focus()
}

/*
 * Mit der webseite synchronisieren
 */

function setzeHtmlBall() {
  // wir haben ballPosition und wollen nun den htmlBall richtig zeichnen!

  // 0 -> 50%
  // -3 -> 0%
  // 3 -> 100%
  var prozent = 50 + (ballPosition * 50) / 3

  // Bsp:                calc(50% - 1.5em)
  htmlBall.style.left = 'calc(' + prozent + '% - 1.5em)'
}
// Was noch?

// Hier: die Liste, worauf das Programm achten muss (also die externen "Ereignisse")

function wennSeiteBereitIst() {
  // Lade alle Elemente, so dass wir sie benutzen können, zum Beispiel unsere Zufallszahlen hineinschreiben.
  // Achtung var ... ausserhalb hier, damit andere zugreifen können
  htmlBall = window.document.getElementById('ball')
  htmlRechenZahl1 = window.document.getElementById('zahl1')
  htmlRechenZahl2 = window.document.getElementById('zahl2')
  htmlMeldung = window.document.getElementById('meldung')
  htmlStartKnopf = window.document.getElementById('startknopf')
  htmlSplash = window.document.getElementById('splash')
  htmlCompiTore = window.document.getElementById('tor-compi')
  htmlSpielerTore = window.document.getElementById('tor-spieler')
  htmlEingabe = window.document.getElementById('eingabe')
  htmlAusruf = window.document.getElementById('ausruf')
  // Dem Startknopf zuhören, wann er gedrückt wird.
  htmlStartKnopf.onclick = start
  htmlStartKnopf.focus()
  // Dem Eingabefeld zuhören, wenn etwas geschrieben wird.
  htmlEingabe.oninput = function (e) {
    eingabe = parseFloat(e.target.value)
    prüfeSpielerEingabe()
  }
}

// Nachdem jemand zu unserer Seite kommt: Wenn die Webseite mit allen Elementen bereit ist.

window.onload = wennSeiteBereitIst