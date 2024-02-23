import path from "path";
import gulp from "gulp";
const {src, dest, parallel, series} = gulp;
import ts from "gulp-typescript";
const {createProject} = ts;
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import gulpIf from "gulp-if";
import merge from "merge-stream";
import named from "vinyl-named";
import replace from "gulp-replace";
import webpack from "webpack-stream";
import run from "gulp-run-command";

import pkg from './package.json' assert {type: "json"}
let {name, version} = pkg

if (name.includes("/"))
    name = name.split("/")[1] // for scoped packages
const VERSION_STRING = "##VERSION##"

function patchFiles (isDev){
    return function patchFile(){

        const doPatch = (basePath) => {
            const jsFiles = [`${basePath}/**/*.js`]
            return src(jsFiles)
                .pipe(replace(VERSION_STRING, `${version}`))
                .pipe(dest(`${basePath}/`))
        }

        if(!isDev)
            return doPatch("dist")
        return doPatch("lib");
    }
}

function getWebpackConfig(isESM, isDev){
    const webPackConfig =  {
        mode: isDev ? "development" : "production", // can be changed to production to produce minified bundle

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.json'
                        }
                    }],
                    include:[
                        path.resolve(__dirname, "src")
                    ],
                    exclude: /node_modules/,
                }
            ]
        },

        resolve: {
            extensions: ['.ts', '.js']
        },

        output: {
            filename: `${name}.bundle.${!isDev ? 'min.' : ''}${isESM ? 'esm.' : ''}js`,
            path: path.resolve(__dirname, "dist/"),
            library: {
                type: "module",
            },
        }
    }

    if(isESM)
        webPackConfig.experiments = {outputModule: true}
    else
        webPackConfig.output = Object.assign(
            {},
            webPackConfig.output,
            {
                globalObject: 'this',
                library: name,
                libraryTarget: "umd",
                umdNamedDefine: true,
            });

    if (isDev)
        webPackConfig.devtool = 'cheap-module-source-map';

    return webPackConfig;
}

function exportDefault(isDev, mode){
    return function exportDefault(){
        function createLib(){
            const tsProject = createProject('tsconfig.json', {
                module: mode
            });

            const stream =  src('./src/**/*.ts')
                .pipe(replace(VERSION_STRING, `${version}`))
                .pipe(gulpIf(isDev, sourcemaps.init()))
                .pipe(tsProject())

            const destPath = `lib${mode === "commonjs" ? "" : "/esm"}`;

            return merge([
                stream.dts.pipe(dest(destPath)),
                stream.js.pipe(gulpIf(!isDev, uglify())).pipe(gulpIf(isDev, sourcemaps.write())).pipe(dest(destPath))
            ])
        }

        return createLib()
    }

}

function exportBundles(isEsm, isDev){
    const entryFile = "src/index.ts"
    return src(entryFile)
        .pipe(named())
        .pipe(webpack(getWebpackConfig(isEsm, isDev)))
        .pipe(dest(`./dist${isEsm ? '/esm' : ""}`));
}

function exportESMDist(){
    return exportBundles(true, false);
}

function exportJSDist(){
    return exportBundles(false, false);
}

function makeDocs(){
    const copyFiles = (source, destination) => {
        return function copyFiles(){
            try {
                return src(source + "/**/*" , { base: source }).pipe(dest(destination));
            } catch (e){
                throw e
            }
        }
    }

    function compileReadme ()  {
        return run.default("npx markdown-include ./mdCompile.json")()
    }

    function compileDocs() {
        return run.default("npx jsdoc -c jsdocs.json -t ./node_modules/better-docs")()
    }


    return series(compileReadme, compileDocs, parallel(...[
            {
                src: "workdocs/assets",
                dest:  "./docs/assets"
            },
            {
                src: "workdocs/coverage",
                dest:  "./docs/coverage"
            },
            {
                src: "workdocs/badges",
                dest:  "./docs/badges"
            }
        ].map(e => copyFiles(e.src, e.dest)))
    )
}

export const dev = series(
    exportDefault(true,"commonjs"),
    exportDefault(true,"es2022")
)

export const prod = series(
    parallel(
        exportDefault(true),
        exportESMDist, exportJSDist)
    ,
    parallel(
        patchFiles(false),
        patchFiles(true)
    ))

export const docs = makeDocs()