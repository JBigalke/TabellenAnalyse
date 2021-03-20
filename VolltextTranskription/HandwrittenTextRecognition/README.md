Für die Volltexttranskription wird das Tool pyLaia verwendet
Das Tool muss mit 
git clone https://github.com/jpuigcerver/PyLaia.git PyLaia gecloned werden und mit
`pip install -e` installiert werden

Als nächstes muss der Ordner SAL5066 in den Hauptordner von PyLaia kopiert werden und das File
createprodlist.py ausgeführt werden.
Dieses verschiebt die Bilder aus den images ordner in den richtigen Zielordner für PyLaia und erstellt außerdem eine Liste mit allen Bildern die von PyLaia analysiert werden sollen.

vom Ordner PyLaia/SAL5066 aus müssen nacheinander die Files
./src/prepimages.sh
und
./src/processLine.sh
ausgeführt werden.
