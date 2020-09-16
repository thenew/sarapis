#!/bin/sh
rootFolder='public/flags-svg/'
minFolder='public/flags-svg/min/'

for pathnameFolder in $rootFolder*; do
    if [ -d "$pathnameFolder" ]
    then
        echo "dir/ $pathnameFolder"
        for pathname in "$pathnameFolder"/*; do
            if [ -e "$pathname" ]
            then
                filename=$(basename -- "$pathname")
                extension="${filename##*.}"
                filename="${filename%.*}"

                input="$pathnameFolder/${filename}.${extension}"
                output="$minFolder$(basename $pathnameFolder)/${filename}.${extension}"

                svgo --disable=removeTitle,removeUnknownsAndDefaults $input -o $output
            elif [ -d "$pathname" ]
            then
                echo "dirs/ $pathname"
            fi
        done
    fi
done