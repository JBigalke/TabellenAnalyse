#!/bin/bash

exper_path=exper/Trans_SAL/Models;
imgs_list="prod/prod.lst"
lines_char="prod/result.txt"


pylaia-htr-decode-ctc \
  "$exper_path"/syms_ctc.txt \
  data/imgs_h128 \
  "$imgs_list" \
  --train_path $exper_path \
  --join_str=" " \
  --gpu 1 \
  --batch_size 10 \
  --checkpoint "experiment.ckpt.lowest-valid-cer*" \
  --use_letters | sort -V > "$lines_char";
