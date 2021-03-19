#!/usr/bin/env python3


import xml.etree.ElementTree as ET


class ReadPageXml:
    def __init__(self, xmlfile):
        self.namespaces = {'d': 'http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15'}
        self.name = xmlfile.split("/")[-1]
        self.path = "/".join(xmlfile.split("/")[:-1])
        self.xml = self.parsexml(xmlfile)

    def parsexml(self, xmlfile):
        try:
            xml = ET.parse(xmlfile)
        except IOError:
            print("can't read %s" % xmlfile)
        else:
            return xml


    def getalltextlineelements(self):
        return self.xml.findall('.//d:TextLine', self.namespaces)

    def getallcoordselements(self, parentelement=None):
        if parentelement is not None:
            return parentelement.findall('./d:Coords', self.namespaces)
        else:
            return self.xml.findall('.//d:Coords', self.namespaces)
