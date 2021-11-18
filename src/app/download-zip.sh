#!/bin/bash

artifactUrl=$1
targetFolder=$2

randomeValue=$(date +%s%N)
targetTmpFile=${randomeValue}.zip

mkdir -p ${targetFolder}

echo "Start downloading ${artifactUrl} to ${targetTmpFile}"
curl --show-error --silent -L ${artifactUrl} -o ${targetTmpFile}

echo "Unzip ${targetTmpFile} to ${targetFolder}"
unzip ${targetTmpFile} -d ${targetFolder}

echo "Delete temp file ${targetTmpFile}"
rm  ${targetTmpFile}
