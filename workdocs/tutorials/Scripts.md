### Scripts

The following npm scripts are available for development:
  - `preinstall` - will run only on the first install to trigger the dep update. will self delete;
  - `do-install` - sets a `TOKEN` environment variable to the contents of `.token` and runs npm install (useful when you have private dependencies);
  - `flash-forward` - updates all dependencies. Take care, This may not be desirable is some cases;
  - `reset` - updates all dependencies. Take care, This may not be desirable is some cases;
  - `build` - builds the code (via gulp `gulpfile.js`) in development mode (generates `lib` and `dist` folder);
  - `build:prod` - builds the code (via gulp `gulpfile.js`) in production mode (generates `lib` and `dist` folder);
  - `test` - runs unit tests;
  - `test:integration` - runs it tests;
  - `test:all` - runs all tests;
  - `prepare-release` - defines the commands to run prior to a new tag (defaults to building production code, running tests and documentation generation);
  - `release` - triggers a new tag being pushed to master (via `./bin/tag_release.sh`);
  - `clean-publish` - cleans the package.json for publishing;
  - `coverage` - runs all test, calculates coverage and generates badges for readme;
  - `drawings` - compiles all DrawIO `*.drawio` files in the `workdocs/drawings` folder to png and moves them to the `workdocs/resources` folder;
  - `uml` - compiles all PlantUML `*.puml` files in the `workdocs/uml` folder to png and moves them to the `workdocs/resources` folder;
  - `docs` - ;
  - `` - ;
