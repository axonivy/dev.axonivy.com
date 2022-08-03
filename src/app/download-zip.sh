#!/bin/bash

artifactUrl=$1
targetFolder=$2

randomeValue=$(date +%s%N)
targetTmpFile=${randomeValue}.zip

echo "Create ${targetFolder}"
mkdir -p ${targetFolder}

echo "Start downloading ${artifactUrl} to ${targetTmpFile}"
curl --show-error --silent -L ${artifactUrl} -o ${targetTmpFile}

echo "Unzip ${targetTmpFile} to ${targetFolder}"
unzip ${targetTmpFile} -d ${targetFolder}

if [ $? -eq 0 ] 
then 
  echo "Successfully unzipped" 
else 
  echo "Unzip failed removing ${targetFolder}"
  rmdir ${targetFolder}
fi

echo "Delete temp file ${targetTmpFile}"
rm  ${targetTmpFile}
