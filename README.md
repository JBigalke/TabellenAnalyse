# TabellenAnalyse

Repository für die Masterarbeit 
Workflow zur semi-automatischen Textstrukturanalyse und Annotation von historischen Textquellen am Beispiel digitalisierter Rechnungsbücher des Stadtarchivs Löwen 
Das repository enthält alle erstellten für den Workflow notwendingen Schritte um aus einem Bilddatensatz eine TEI mit annotationen aus der Bookkeepingontoly durchzuführen.
Innerhalb des ORdners Beispieldaten befinden sich die durch die einzelnen Schritten erstellten Daten die mit den ersten 2 Seiten des Datensatzes zur Demonstrationszwecken durchgeführt wurden.

Der Workflow folgt der Reihenfolge

* Zeilen Extraktion
  * Baseline Recognition
  * Textpolygon Recognition  
* Volltext Transkription
  * Image Splitting
  * Handwritten Text Recognition
  * Text2Image
* Struktur Analyse
  * Tabellen Analyse
* Annotation
  * Regex

![Workflowdiagramm](https://user-images.githubusercontent.com/8956270/113892346-309f5800-97c6-11eb-9d65-50bd62acb582.jpg)

