import path from "path";
import gulp from "gulp";
import rename from "gulp-rename";
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
                        path.join(process.cwd(), "./src")
                    ],
                    exclude: /node_modules/,
                }
            ]
        },

        resolve: {
            extensions: ['.ts', '.js'],
            fallback: {
                "path": false,
                "fs": false,
                "stream": false,
                "os": false,
                "assert": false,
                "util": false
            }
        },

        output: {
            filename: `${name}.bundle.${!isDev ? 'min.' : ''}${isESM ? 'esm.' : ''}js`,
            path: path.join(process.cwd(), "./dist/")
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
        webPackConfig.devtool = 'eval-source-map';

    return webPackConfig;
}

function exportDefault(isDev, mode){
    const func = () => {
        function createLib(){
            const tsProject = createProject('tsconfig.json', {
                module: mode,
                declaration: true,
                declarationMap: true,
                emitDeclarationOnly: false,
                isolatedModules: false
            });

            const stream =  src('./src/**/*.ts')
                .pipe(replace(VERSION_STRING, `${version}`))
                .pipe(gulpIf(isDev, sourcemaps.init()))
                .pipe(tsProject())

            const destPath = `lib${mode === "commonjs" ? "" : "/esm"}`;

            return merge([
                stream.dts.pipe(dest(destPath)),
                stream.js.pipe(gulpIf(!isDev, uglify()))
                    .pipe(gulpIf(isDev, sourcemaps.write()))
                    .pipe(gulpIf(mode === "commonjs",
                        rename((file) => {
                            if (file.dirname === "." && file.basename === "index")
                                Object.assign(file, {extname: ".cjs"})
                            return file
                        })))
                    .pipe(dest(destPath))
            ])
        }

        return createLib()
    }
    Object.defineProperty(func, "name", {
        value: `exportDefault-${isDev ? "dev" : "prod"}-${mode}`
    })
    return func;
}

function exportBundles(isEsm, isDev){
    const entryFile = "src/index.ts"
    return src(entryFile)
        .pipe(named())
        .pipe(webpack(getWebpackConfig(isEsm, isDev)))
        .pipe(dest(`./dist${isEsm ? '/esm' : ""}`));
}

function exportESMDist(isDev){
    const func = () =>  exportBundles(true, isDev);
    Object.defineProperty(func, "name", {
        value: `exportESMDist-${isDev ? "dev" : "prod"}`
    })
    return func;
}

function exportJSDist(isDev){
    const func = () =>  exportBundles(false, isDev);
    Object.defineProperty(func, "name", {
        value: `exportJSDist-${isDev ? "dev" : "prod"}`
    })
    return func;
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

    return series(
        compileReadme,
        compileDocs,
        parallel(...[
            {
                src: "workdocs/assets",
                dest:  "./docs/workdocs/assets"
            },
            {
                src: "workdocs/coverage",
                dest:  "./docs/workdocs/coverage"
            },
            {
                src: "workdocs/badges",
                dest:  "./docs/workdocs/badges"
            },
            {
                src: "workdocs/resources",
                dest:  "./docs/workdocs/resources"
            }
        ].map(e => copyFiles(e.src, e.dest)))
    )
}

export const dev = series(
    parallel(
        series(
            exportDefault(true,"commonjs"),
            exportDefault(true,"es2022")
        ), exportESMDist(true), exportJSDist(false))
)

export const prod = series(
    parallel(
        series(
            exportDefault(false,"commonjs"),
            exportDefault(false,"es2022")
        ), exportESMDist(false), exportJSDist(false)),
    patchFiles(true)
)

export const docs = makeDocs()