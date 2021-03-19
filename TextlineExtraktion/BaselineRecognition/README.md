Die Baseline Recognition nutzt das Tool
Um es für den Workflow zu benutzen muss aus mit dem folgenden Befehl aus dem Repository geklont werden:

`git clone https://github.com/lquirosd/P2PaLA.git P2PaLA`

Weitere Vorraussetzung für die Nutzung von P2PaLA sind
  - Python 3.6
  - Numpy
  - PyTorch
  - OpenCV
  - Cuda

Für das Austesten des Workflows reicht es CuDNN zu installieren. Sol ein eigenes Modell trainiert werden wird von den Entwicklern von P2PaLa eine
ein GPU von NVIDIA und ein CUDA CuDNN empfohlen.

Das Model das im Zuge der Masterarbeit entstanden ist kann über Folgenden Link gedownloaded werden:
https://uni-koeln.sciebo.de/s/8m69enjVEOmndvN/download


Zum Installieren im Main Ordner von P2PaLA ausführen
`python setup.py install`

Die zur Verfügung gestellten Dateien können mit dem Befehl Analysiert werden:
`python P2PaLA.py --config --prod_SAL5066.txt`
Die so erstellten Page.xmls können im Ordner: results/prod/page gefunden werden
