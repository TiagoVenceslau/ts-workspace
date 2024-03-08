npm run flash-forward-dependencies
node<<EOF > _.json && mv _.json package.json
var o = $(cat package.json);
delete o["scripts"]["preinstall"];
console.log(JSON.stringify(o, null, 2));
EOF
rm -f ./bin/template_setup.sh