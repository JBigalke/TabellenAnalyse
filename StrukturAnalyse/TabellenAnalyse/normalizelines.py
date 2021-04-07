#!/usr/bin/env python3

import lxml.etree as ET
import os
from datetime import datetime
import createtei

from subprocess import call
import shlex


projectfolder = "./"
orixmlfolder = projectfolder + "normalize/originals/"
resultxmlfolder = projectfolder + "normalize/results/"


namespaces = {'d': 'http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15'}
ns = {'d': 'http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15'}



def sort(unsorted):
    return sorted(unsorted.items(), key=get_key)

def get_key(item):
    return item[1][0]



def sort_list(list):
    sortedlist = []
    for item in list:
        x = item[1][1]
        if len(sortedlist) == 0:
            sortedlist.append(item)
        else:
            for index,entry in enumerate(sortedlist):
                entry_x = entry[1][1]
                if x < entry_x:
                    sortedlist.insert(index, item)
                    break
                else:
                    sortedlist.append(item)
                    break;
    return sortedlist



completecollection =[]
files = os.listdir(orixmlfolder)
files.sort()
for filename in files:
    newlines =[]
    linedict = {}
    xml = ET.parse(orixmlfolder + filename)
    lines = xml.findall(".//d:TextLine", namespaces)

    for line in lines:
        id = line.attrib['id']
        baseline = line.find("./d:Baseline", namespaces)
        xpoints = []
        ypoints = []
        points = baseline.attrib['points'].split(" ")
        for point in points:
            xpoints.append(float(point.split(",")[0]))
            ypoints.append(float(point.split(",")[1]))
        linedict[id] = [sum(ypoints) / len(ypoints), xpoints[0], points[-1]]
    sorted = sort(linedict)

    lastsame = False
    line = []
    for index,item in enumerate(sorted):
            if len(line) == 0:
                line.append(item)
            elif len(line) > 0:
                actualy = item[1][0]
                actualx = item[1][1]
                last = line[-1]
                lasty = last[1][0]
                lastx = last[1][1]
                ydifference = actualy - lasty
                xdifference = actualx - lastx
                if ydifference < 30 and abs(xdifference)>50:
                    line.append(item)
                    line = sort_list(line)
                else:
                    newlines.append(line)
                    line = []
                    line.append(item)

    newlines.append(line)
    normedx = []
    for index, item in enumerate(newlines):
        if len(normedx) == 0:
            normedx.append(item)
        else:
            lastline = normedx[-1]
            if index < len(newlines)-1:
                nextline = newlines[index+1]
            if len(item) == len(lastline):
                if len(item) == 1:
                    actualx = item[0][1][1]
                    lastx = lastline[0][1][1]
                    if abs(actualx - lastx) < 50:
                        item[0][1][1] = lastx
                        normedx.append(item)
                    else:
                        normedx.append(item)
                else:
                    for i,e in enumerate(item):
                        actualx = e[1][1]
                        lastx = lastline[i][1][1]
                        if abs(actualx - lastx) < 50:
                            item[i][1][1] = lastx
                    normedx.append(item)
            else:
                normedx.append(item)


    params = []
    textelements = []
    actualelement = []
    actualline = []
    lastline =[]
    nextline =[]

    for index,line in enumerate(normedx):
        if index == 0:
            actualelement.append(line)
            lastline = line
        else:
            actualx = line[0][1][1]
            actualy = line[0][1][0]
            if len(lastline) !=0:
                lastx = lastline[0][1][1]
                lasty = lastline[0][1][0]
            if index == len(normedx)-1:
                nextline = []
                actualelement.append(line)
                textelements.append(actualelement)
                actualelement = []
                lastline = []
            else:

                nextline = normedx[index+1]
                nextx = nextline[0][1][1]
                nexty = nextline[0][1][0]
                if len(lastline) != 0 and len(nextline) != 0:

                    xdifferencelastline = abs(actualx - lastx)
                    ydifferencelastline = actualy - lasty
                    xdifferencenextline = abs(nextx - actualx)
                    ydifferencenextline = nexty - actualy
                    if len(line) != len(lastline) and len(line) == len(nextline):

                        if ydifferencelastline > 70:

                            textelements.append(actualelement)
                            actualelement = []
                            actualelement.append(line)
                        else:
                            actualelement.append(line)
                    elif len(line) == len(lastline) and len(line) != len(nextline):

                        if ydifferencelastline > 70:
                            textelements.append(actualelement)
                            actualelement = []
                            actualelement.append(line)
                        else:
                            actualelement.append(line)
                    elif len(line) == len(lastline) and len(line) == len(nextline):
                        if ydifferencelastline > 70:
                            textelements.append(actualelement)
                            actualelement = []
                            actualelement.append(line)
                        elif ydifferencelastline < 70:
                            actualelement.append(line)
                    elif len(line) != len(lastline) and len(line) != len(nextline):
                            if ydifferencelastline < 70:
                                textelements.append(actualelement)
                                actualelement = []
                                actualelement.append(line)
                            else:
                                actualelement.append(line)


            lastline = line
    root = ET.Element("PcGts", xmlns="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15")
    Metadata = ET.SubElement(root, "Metadata")
    Creator = ET.SubElement(Metadata, "Creator").text = "Jan Bigalke"
    Created = ET.SubElement(Metadata, "Created").text = str(datetime.now())
    pagexml = xml.findall(".//d:Page", ns)
    textregionxml = pagexml[0].findall("./d:TextRegion", ns)
    print(pagexml[0])
    Page = ET.SubElement(root, "Page", imageFilename=pagexml[0].attrib['imageFilename'], imageHeight=pagexml[0].attrib["imageHeight"], imageWidth=pagexml[0].attrib["imageWidth"])
    if len(textregionxml) != 0:
        TextRegionPage = ET.SubElement(Page, "TextRegion",custom=textregionxml[0].attrib['custom'], id=textregionxml[0].attrib['id'])
        coordsxml = textregionxml[0].findall(".//d:Coords", ns)
        coords = ET.SubElement(TextRegionPage, "Coords", points=coordsxml[0].attrib['points'])
    else:
        TextRegionPage = ET.SubElement(Page, "TextRegion",custom="structure {type:full_page;}")

    completecollection.append(textelements)


    for index,element in enumerate(textelements):
        firstpoints =[]
        lastpoints =[]
        textlines = []
        linelength = 0
        for line in element:
            for part in line:
                linelength = len(line)
                first = str(part[1][1])+","+str(part[1][0])
                firstpoints.append(first)
                lastpoints.append(part[1][2])
              #  collectionpagelist.sort()
                textline = ET.Element("TextLine", id=part[0], custom=str(linelength))
                textlinecoordsxml = textregionxml[0].xpath(".//d:TextLine[@id='"+part[0]+"']/d:Coords", namespaces=ns)
                textlinecoords = ET.SubElement(textline, "Coords", points=textlinecoordsxml[0].attrib["points"])
                baselinecoords = ET.SubElement(textline, "Baseline", points=first+" "+part[1][2])

                textlines.append(textline)
        firstxpoints = []
        firstypoints = []
        lastxpoints = []
        lastypoints = []
        for point in firstpoints:
            firstxpoints.append(float(point.split(",")[0]))
            firstypoints.append(float(point.split(",")[1]))
        for point in lastpoints:
            lastxpoints.append(float(point.split(",")[0]))
            lastypoints.append(float(point.split(",")[1]))

        firstxpoints.sort()
        lastxpoints.sort()
        firstypoints.sort()
        lastypoints.sort()
        ally = firstypoints + lastypoints
        ally.sort()
        allx = firstxpoints + lastxpoints
        allx.sort()

        TextRegion = ET.SubElement(Page, "TextRegion", id="TexReg"+str(index))
        #"0,0 0,2568 2045,2568 2045,0"
        Coords = ET.SubElement(TextRegion, "Coords", points=str(allx[0]-10)+','+str(ally[0]-10)+" " # smx and smy
                                                      +str(allx[0]-10)+","+str(ally[-1]+10)          # smx and bmy
                                                      +" "+str(allx[-1]+10)+","+str(ally[-1]+10)+" "  # bmx and bmy
                                                      +str(allx[-1]+10)+","+str(ally[0]-10))         # bmx and smy
        for textline in textlines:
            TextRegionPage.append(textline)

    tree = ET.ElementTree(root)
    tree.write(projectfolder+"/newPage/"+filename, pretty_print=True, xml_declaration=True, encoding="utf-8")

    del normedx
    del line
    del sorted


createtei = createtei.createtei()
createtei.create_tei(completecollection)
