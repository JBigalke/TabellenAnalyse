#!/bin/bash

IMAGEFOLDER="data/images"
XMLFOLDER="data/xml"
CONTAINERID="page-distance"

echo $IMAGEFOLDER

#docker run --rm -t -d --name page-distance vbosch/uobel
#
 #docker start page-distance


#docker exec -it page-distance git clone https://github.com/PRHLT/pageDistanceBasedContourGenerator.git

#docker container ls

readarray -d '' IMAGEPATHS < <(find $IMAGEFOLDER -name "*.jpg" -print0)
readarray -d '' XMLPATHS < <(find $XMLFOLDER -name "*.xml" -print0)


for image in ${IMAGEPATHS[@]}; do
  IFS="/" read -r -a TOKENIZED <<< $image
  COLLECTIONAME=${TOKENIZED[-2]}
  FILENAME=${TOKENIZED[-1]}
  IFS="." read -r -a TOKENIZED <<< $FILENAME
  IMAGENAME=${TOKENIZED[0]}
  echo $IMAGENAME
  mkdir -p $XMLFOLDER/Distance/$COLLECTIONAME
  for xmlpath in ${XMLPATHS[@]}; do
    if [[ $xmlpath =~ $IMAGENAME ]]; then
      echo "PROCESSING $IMAGENAME"
      echo $xmlpath
      echo $image
      IFS="/" read -r -a SPLITTEDXMLPATH <<< $xmlpath
      XMLFILE=${SPLITTEDXMLPATH[-1]}
      docker cp $xmlpath $CONTAINERID:/home/pageDistanceBasedContourGenerator/
      docker cp $image $CONTAINERID:/home/pageDistanceBasedContourGenerator/
      docker exec -it page-distance /home/pageDistanceBasedContourGenerator/extract_lines -i /home/pageDistanceBasedContourGenerator/$FILENAME -p /home/pageDistanceBasedContourGenerator/$XMLFILE -o out_$XMLFILE -w 4 -x -1
      docker cp page-distance:/home/out_$XMLFILE $XMLFOLDER/Distance/$COLLECTIONAME/$XMLFILE
      docker exec -it page-distance rm /home/out_$XMLFILE
      docker exec -it page-distance rm /home/pageDistanceBasedContourGenerator/$XMLFILE
      docker exec -it page-distance rm /home/pageDistanceBasedContourGenerator/$FILENAME
      fi
    done



#  docker cp $image $CONTAINERID:/home
done

docker stop page-distance

echo "ALL DONE"