import os
import shutil


jpgfiles = []
jpgfolders = os.walk("images")
newfolder = "Sal5066/data/imgs"

with open('/media/jan/Extern/TabellenAnalyse/VolltextTranskription/HandwrittenTextRecognition/Sal5066/prod/prod.lst', 'w') as prodlist:
    for jpgfolder in jpgfolders:
        pathfeed = jpgfolder[0]
        print(pathfeed)
        for file in jpgfolder[2]:
            if(".jpg" in file):
                prodlist.write(file+"\n")
                shutil.move(pathfeed+"/"+file, newfolder+"/"+file)

print("done")