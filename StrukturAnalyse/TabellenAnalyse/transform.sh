#!/bin/sh


java -jar ../../res/saxon-he-10.1.jar xml/buch.xml xslt/page2book.xsl -o:SAL5066_tei.xml
