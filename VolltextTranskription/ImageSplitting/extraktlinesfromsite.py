#!/usr/bin/env python3

import subprocess
import os
import shutil

class extraclinefromsite():
    def __init__(self, lineid, lineresolution, x, y, coords, originalfeed):
        self.originalfeed = originalfeed
        self.originalpath = "/".join(originalfeed.split("/")[:-1])
        self.originalname = originalfeed.split("/")[-1]
        self.resultname = self.originalname.replace(".jpg", "-"+lineid)
        self.resultpath = self.originalpath.replace("originals", "results")+"/"+self.originalname.replace(".jpg", "")
        self.resultfeed = self.resultpath +"/"+ self.resultname+".jpg"
        self.temppath = self.originalpath.replace("originals", "Temp")+"/"+self.originalname.replace(".jpg", "")+"/"+\
                                                    self.resultname.replace(".jpg", "")
        self.resolution = lineresolution
        self.coords = coords
        self.x = x
        self.y = y
        self.actualstep = 0
        self.createpath(self.temppath)



    def createpath(self, path):
        patharray = path.split("/")
        actualpath = patharray[0]
        print(actualpath)
        for i,folder in enumerate(patharray):
            if i>0:
                actualpath = actualpath+"/"+folder
            if not os.path.exists(actualpath):
                try:
                    os.mkdir(actualpath)
                except OSError:
                    print("Ordner konnte nicht angelegt werden")



    def createtempfilefeed(self, postfix):
        return self.temppath+"/step_"+str(self.actualstep)+"."+postfix



    def fillpolygongreen(self):
        self.actualstep = self.actualstep+1
        resultfile = self.createtempfilefeed('jpg')
        command = 'convert '+self.originalfeed + ' -fill green -draw "polygon '+self.coords+'" '+resultfile
        subprocess.call(command, shell=True)

    def notcolortocolorfill(self, colorfill, exclusivecolor, fuzz, resultfiletype, fromfiletype):
        fromfile = self.createtempfilefeed(fromfiletype)
        self.actualstep = self.actualstep+1
        resultfile = self.createtempfilefeed(resultfiletype)
        command = 'convert '+fromfile+' -fuzz '+fuzz+' -fill '+colorfill+' +opaque '+exclusivecolor+' '+resultfile
        subprocess.call(command, shell=True)

    def whitetoalpha(self):
        fromfile = self.createtempfilefeed("jpg")
        self.actualstep = self.actualstep+1
        resultfile = self.createtempfilefeed("png")
        command = 'convert '+fromfile+' -fuzz 20% -transparent white ' + resultfile
        subprocess.call(command, shell=True)

    def alphatowhite(self):
        fromfile = self.createtempfilefeed("png")
        self.actualstep = self.actualstep+1
        resultfile = self.createtempfilefeed("png")
        command = 'convert '+fromfile +' -background white -alpha remove -alpha off '+resultfile
        subprocess.call(command, shell=True)


    def distin(self):
        fromfile = self.createtempfilefeed("png")
        self.actualstep = self.actualstep+1
        resultfile = self.createtempfilefeed("png")
        command = 'composite -compose Dst_In -gravity center '+fromfile+' '+self.originalfeed+' -alpha Set '+resultfile
        subprocess.call(command, shell=True)

    def trimline(self):
        fromfile = self.createtempfilefeed("png")
        self.createpath(self.resultpath)
        command = 'convert '+fromfile+' -crop '+self.resolution+'+'+str(self.x)+'+'+str(self.y)+' '+self.resultfeed
        subprocess.call(command, shell=True)
        #shutil.rmtree(self.temppath)


    def extraktline(self):
        transformcmd = "convert "+self.originalfeed+" -crop "+self.resolution+"+"+str(self.x)+"+"+str(self.y)+" Images/results/"+self.resultname
        subprocess.call(transformcmd, shell=True)
