# tokenisation
~/mosesdecoder/scripts/tokenizer/tokenizer.perl -l en < ~/corpus/training/skunkworks.es-en.en > ~/corpus/skunkworks.es-en.tok.en -threads 16

~/mosesdecoder/scripts/tokenizer/tokenizer.perl -l es < ~/corpus/training/skunkworks.es-en.es > ~/corpus/skunkworks.es-en.tok.es -threads 16

# truecasing
~/mosesdecoder/scripts/recaser/train-truecaser.perl --model ~/corpus/truecase-model.en --corpus ~/corpus/skunkworks.es-en.tok.en

~/mosesdecoder/scripts/recaser/train-truecaser.perl --model ~/corpus/truecase-model.es --corpus ~/corpus/skunkworks.es-en.tok.es

# recasing
~/mosesdecoder/scripts/recaser/truecase.perl --model ~/corpus/truecase-model.en < ~/corpus/skunkworks.es-en.tok.en > ~/corpus/skunkworks.es-en.true.en

~/mosesdecoder/scripts/recaser/truecase.perl --model ~/corpus/truecase-model.es < ~/corpus/skunkworks.es-en.tok.es > ~/corpus/skunkworks.es-en.true.es

# truncate sentence length to 80 chars
~/mosesdecoder/scripts/training/clean-corpus-n.perl ~/corpus/skunkworks.es-en.true es en ~/corpus/skunkworks.es-en.clean 1 80

# create lm
mkdir ~/lm
cd ~/lm
~/irstlm/bin/add-start-end.sh < ~/corpus/skunkworks.es-en.true.es > skunkworks.es-en.sb.es
export IRSTLM=$HOME/irstlm; ~/irstlm/bin/build-lm.sh -i skunkworks.es-en.sb.es -t ./tmp -p -s improved-kneser-ney -o skunkworks.es-en.lm.es

# create arpa
~/irstlm/bin/compile-lm --text yes skunkworks.es-en.lm.es.gz skunkworks.es-en.arpa.es

# create blm
~/irstlm/bin/compile-lm skunkworks.es-en.lm.es.gz skunkworks.es-en.blm.es

# binarize arpa file
~/mosesdecoder/bin/build_binary skunkworks.es-en.arpa.es skunkworks.es-en.blm.es

# check model
echo "is this an English sentence ?" | ~/mosesdecoder/bin/query skunkworks.es-en.blm.es

#######################################
#  training the translation engine    #
#							10:52										#
#######################################
mkdir ~/working
cd ~/working
nohup ~/mosesdecoder/scripts/training/train-model.perl -root-dir train -corpus ~/corpus/skunkworks.es-en.clean -f en -e es -alignment grow-diag-final-and -reordering msd-bidirectional-fe -lm 0:3:$HOME/lm/skunkworks.es-en.blm.es:8 -external-bin-dir $HOME/mosesdecoder/tools -cores 12 --parallel >& training.out &

# binarising the model
mkdir ~/working/binarised-model
cd ~/working
~/mosesdecoder/bin/processPhraseTable -ttable 0 0 train/model/phrase-table.gz -nscores 5 -out binarised-model/phrase-table
~/mosesdecoder/bin/processLexicalTable -in train/model/reordering-table.wbe-msd-bidirectional-fe.gz -out binarised-model/reordering-table
cp ~/working/train/model/moses.ini ~/working/binarised-model
sed -i 's/PhraseDictionaryMemory/PhraseDictionaryBinary/' ~/working/binarised-model/moses.ini
sed -i 's/train\/model/binarized-model/' ~/working/binarised-model/moses.ini

# running hte model
~/mosesdecoder/bin/moses -f ~/working/binarised-model/moses.ini
~/mosesdecoder/bin/moses -f ~/working/train/model/moses.ini


