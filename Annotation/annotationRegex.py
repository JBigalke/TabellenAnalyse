#!/usr/bin/env python3
import os
import re


infile = open("data/original/SAL5066_tei.xml", 'rt')
outfile = open("data/result/SAL5066_tei.xml", 'w')

for line in infile:
    line = re.sub(r'([\w|ˀ]* gul[d]?ˀ)', r"<measure ana='bk:money' type='currency' unit='gulden'>\1</measure>", line)
    line = re.sub(r'(\W)(suˀ)(\W)', r"\1<term>\2</term>\3", line)
    outfile.write(line)

infile.close()
outfile.close()