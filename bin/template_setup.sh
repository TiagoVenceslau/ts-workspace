npm run flash-forward-dependencies
node<<EOF > package.json && mv package.json file.json
var o = $(< file.json);
delete o["scripts"]["preinstall"];
console.log(JSON.stringify(o, null, 4));
EOF
rm -f ./bin/template_setup.sh