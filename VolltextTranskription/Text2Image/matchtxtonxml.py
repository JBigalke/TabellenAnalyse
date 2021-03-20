import lxml.etree as ET

xmliddict = {}
xmlidslist = []
collectionidlist = []

projectpath = "xslt/"
oripath = "data/page/"
withtextpath = "data/withtext/"
texttoxmlxslfile = projectpath + "texttoxml.xsl"
texttoxmlxsl = ET.parse(texttoxmlxslfile)
transformtexttoxml = ET.XSLT(texttoxmlxsl)
transformtofo = ET.parse





def createsitexmlnodes(root, data, id):
    Site = ET.SubElement(root,'site')
    Site.set('id', id)
    for key, value in data.items():
        line = ET.SubElement(Site, 'line')
        line.set('id', key)
        line.text = value
    return Site



with open("data/htr/result.txt") as f:

    for line in f:
        splittedline = line.split(" ")
        xmlid = splittedline[0].split("-")[0]
        lineid = splittedline[0].split("-")[1]
        collectionid = splittedline[0].split("_")[0]
        text = "".join(splittedline[1:]).replace("@", " ").replace("\n","")
        if xmlid not in xmlidslist:
            xmlidslist.append(xmlid)
            xmliddict[xmlid] = {lineid:text}
        else:
            textdict = xmliddict[xmlid]
            textdict[lineid] = text
            xmliddict[xmlid] = textdict
        if collectionid not in collectionidlist:
           collectionidlist.append(collectionid)


f = open("data/collections.txt", "w")

for collectionid in collectionidlist:
    collectionpagelist = []
    for xmlid in xmlidslist:
        if collectionid in xmlid:
            collectionpagelist.append(xmlid)
    collectionpagelist.sort()
    f.write(";".join(collectionpagelist))
    f.write("\n")

f.close()



for xmlid in xmlidslist:
    data = xmliddict[xmlid]
    root = ET.Element("page")
    root.set('id', xmlid)
    for key, value in data.items():
        line = ET.SubElement(root, 'line')
        line.set('id', key)
        line.text = value
    tree = ET.ElementTree(root)
    tree.write(projectpath+"params.xml")
    dom = ET.parse(oripath+xmlid+'.xml')
    newdom = transformtexttoxml(dom)
    infile = str(newdom)
    resultfile = withtextpath+xmlid+'.xml'
    newfile = open(resultfile, 'w')
    newfile.write(infile)
    newfile.close()
