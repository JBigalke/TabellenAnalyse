# TabellenAnalyse

Repository für die Masterarbeit 
Workflow zur semi-automatischen Textstrukturanalyse und Annotation von historischen Textquellen am Beispiel digitalisierter Rechnungsbücher des Stadtarchivs Löwen 
Das repository enthält alle erstellten für den Workflow notwendingen Schritte um aus einem Bilddatensatz eine TEI mit annotationen aus der Bookkeepingontoly durchzuführen.
Innerhalb des ORdners Beispieldaten befinden sich die durch die einzelnen Schritten erstellten Daten die mit den ersten 2 Seiten des Datensatzes zur Demonstrationszwecken durchgeführt wurden.

Der Workflow folgt der Reihenfolge

1. Zeilen Extraktion
  1.1 Baseline Recognition
  1.2 Textpolygon Recognition  
2. Volltext Transkription
  2.1 Image Splitting
  2.2 Handwritten Text Recognition
  2.3 Text2Image
3. Struktur Analyse
  3.1 Tabellen Analyse
4.  Annotation
  4.1 Regex

![grafik](https://user-images.githubusercontent.com/8956270/111913140-15fe7c80-8a6d-11eb-8262-c40aaee6ba21.png)

