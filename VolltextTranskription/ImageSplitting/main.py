#!/usr/bin/env python3
import readpagexml
import line
import extraktlinesfromsite
import os
import shutil








def getxmllist():
    xmlfiles = []
    xmlfolders = os.walk("data/xml")
    for xmlfolder in xmlfolders:
        pathfeed = xmlfolder[0]
        for file in xmlfolder[2]:
            if(".xml" in file):
                filefeed = pathfeed+"/"+file
                xmlfiles.append(filefeed)

    return xmlfiles


def getimgeslist():
    jpgfiles = []
    jpgfolders = os.walk("data/images")
    for jpgfolder in jpgfolders:
        pathfeed = jpgfolder[0]
        for file in jpgfolder[2]:
            if(".jpg" in file or ".png" in file):
                filefeed = pathfeed+"/"+file
                jpgfiles.append(filefeed)

    return jpgfiles


def processtextline(xml, textline, jpgfeed):
        coords = xml.getallcoordselements(textline)
        id = textline.attrib['id']
        print("Prozess textline: %s" %id)
        for coord in coords:
            newline = line.Line(coord, id)
            newextractlines = extraktlinesfromsite.extraclinefromsite(id, newline.lineresolution,
                                                                      newline.minx, newline.miny,
                                                                      newline.getcoordsstring(), jpgfeed)
            newextractlines.fillpolygongreen()
            newextractlines.notcolortocolorfill("white", "green", "10%", "jpg", "jpg")
            newextractlines.whitetoalpha()
            newextractlines.distin()
            newextractlines.alphatowhite()
            newextractlines.notcolortocolorfill("white", "black", "65%","png", "png")
            newextractlines.trimline()
           # print("original name: "+newextractlines.originalname)
           # print("original feed: "+ newextractlines.originalfeed)
           # print("original path: "+newextractlines.originalpath)
           # print("result name: "+newextractlines.resultname)
           # print("result path"+newextractlines.resultpath)
           # print("temp path: "+newextractlines.temppath)

xmllist = getxmllist()



for xmlfile in xmllist:
    print(xmlfile)
    xml = readpagexml.ReadPageXml(xmlfile)
    jpgfeed = xml.path.replace("Xml", "images/originals") + "/" + xml.name.replace(".xml", ".jpg")
    print("feed")
    print(jpgfeed)
    if(os.path.exists(jpgfeed)):
        print("prozess image %s:" %jpgfeed)
        lineclasses = []
        textlines = xml.getalltextlineelements()
        for textline in textlines:
            processtextline(xml, textline, jpgfeed)



#if (os.path.exists("data/images")):
 #   shutil.rmtree("data/images")

