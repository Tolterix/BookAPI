ISRESET=$(egrep "(//[0,1]){1}" ./knexfile.js | cut -d "/" -f2);

echo $ISRESET