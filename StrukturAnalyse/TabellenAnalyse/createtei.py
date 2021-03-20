#!/usr/bin/env python3

from subprocess import call
import shlex

class createtei:
    def __init__(self):
        self.lastlinetype = ""
        self.newtextele = True
        self.lenlastline = 0
        self.tablecounter = 0
        self.linecounter = 0
        self.divcounter = 0
        self.pagecounter = 0
        self.newxml = open('xml/buch.xml','w')

    def create_tei(self, completecollection):
            self.newxml.write("<?xml version='1.0' encoding='UTF-8'?>\n")
            self.newxml.write("<buch>\n")
            print("<buch>")
            for index,site in enumerate(completecollection):
                self.pagecounter = index
                self.tablecounter = 1
                self.newxml.write("<pb n='%s'/>\n" %str(index+1))
                print("<pb n='%s'/>" %str(index+1))
                self.lastlinetype = "pagebreak"
                self.linecounter = 0
                for txtindex, textelement in enumerate(site):
                    self.divcounter = txtindex
                    self.newtextele = True
                    self.newxml.write("<div n='p%s_d%d'>\n" % (index + 1, txtindex + 1))
                    print("<div n='p%s_d%d'>"%(index+1, txtindex+1))
                    if len(textelement[0]) > 1:
                        self.newxml.write("<table n='p%s_t%s'>\n"%(index+1, self.tablecounter))
                        print("<table n='p%s_t%s'>"%(index+1, self.tablecounter))
                    else:
                        self.newxml.write("<p>\n")
                        print("<p>")
                    for lineindex, line in enumerate(textelement):
                        self.linecounter += 1
                        self.process_line(line, lineindex)
                        self.lenlastline = len(line)
                        self.newtextele = False
                    if self.lastlinetype == "tableline":
                       self.newxml.write("</table>\n")
                       print("</table>")
                    else:
                        self.newxml.write("</p>\n")
                        print("</p>")
                    self.newxml.write("</div>\n")
                    print("</div>")
            self.newxml.write("</buch>\n")
            print("</buch>")
            self.newxml.close()
            call(shlex.split('bash ./transform.sh'))

    def process_line(self, line, position):
        if len(line) == 1:
            if self.lastlinetype == "tableline" and self.newtextele == False:
                self.newxml.write("</table>\n")
                self.newxml.write("<p>\n")
                print("</table>")
                print("<p>")
            self.process_len_1(line,  position)
        elif len(line) >1:
            if self.lastlinetype == "line" and self.newtextele == False:
                self.newxml.write("</p>\n")
                self.newxml.write("<table>\n")
                print("</p>")
                print("<table>")
            self.process_len_2(line, position)

    def process_len_1(self, line,  position):
        self.newxml.write("<l xml:id='%s' n='p%d_l%d'/>\n" %(line[0][0],self.pagecounter+1, self.linecounter))
        print(" <l xml:id='%s' n='p%d_l%d'/>" %(line[0][0],self.pagecounter+1, self.linecounter))
        self.lastlinetype = "line"

    def process_len_2(self, line, position):
        if self.lenlastline == 1 or self.lastlinetype == "pagebreak":
            self.create_table_row(line)
            self.lastlinetype = "tableline"
        elif self.lenlastline >1:
            self.create_table_row(line)
            self.lastlinetype = "tableline"


    def create_table_row(self, line):
        self.newxml.write("<row>\n")
        print("<row>")
        for index,element in enumerate(line):
            self.newxml.write("<cell xml:id='%s' n='p%d_l%d'/>\n" % (element[0], self.pagecounter + 1, self.linecounter))
            print("<cell xml:id='%s' n='p%d_l%d'/>" %(element[0], self.pagecounter+1, self.linecounter))
            self.linecounter += 1
        self.newxml.write("</row>\n")
        print("  </row>")
        self.lenlastline = "tableline"

