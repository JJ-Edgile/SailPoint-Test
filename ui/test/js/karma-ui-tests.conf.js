// Karma configuration for unit tests of JavaScript in the ui folder

function getLoadFiles(config) {
    function addPath(path, loadFiles) {
        loadFiles.push('test/js/' + path + '/**/*Test?(s).js');
    }

    // Load any test files that are dependencies for other files.
    //jquery is a dependency of Angular so it must be loaded first
    // DO NOT REMOVE THESE
    var loadFiles = [
        'js/lib/jquery/jquery.min.js',
        'js/shared/util.js',
        'test/js/SailPointGlobal.js'
    ];

    config.testPaths.forEach(function(testPath) {
        // 'all' is special case, run the whole thing.
        if (testPath === 'all') {
            addPath('**', loadFiles);
        } else {
            addPath(testPath, loadFiles);
        }
    });

    return loadFiles;
}

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        // Specify path in gulpfile based on build process
        // basePath: '../..',

        frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],

        jspm: {
            config: 'jspm.config.js',
            packages: 'jspm_packages',
            loadFiles: getLoadFiles(config),
            serveFiles: [
                // Configure where to serve the files from that tests will import
                'js/**/*.js',
                'js/**/template/**/*.html',
                'images/**/*',
                'test/js/*.js',
                'test/js/**/*Data.js',
                'test/js/**/*Ctrl.js',
                'test/js/**/*Service.js',
                'test/js/**/*Filter.js',
                'test/js/**/Mock*.js',
                'test/js/common/util/SpDateServiceMocker.js'
            ],
            paths: {
                'github:*': 'jspm_packages/github/*',
                'npm:*': 'jspm_packages/npm/*',
                'test/*': 'test/*',
                'js/*': 'js/*',
                '*': 'js/*'
            }
        },

        proxies: {
            '/ui/images/': '/base/images/',
            '/test/': '/base/test/',
            '/js/': '/base/js/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        //     config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Specify browsers in Gruntfile.js
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        //browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 120000,

        // Up the browser no activity timeout to give JSPM time to load up and transpile the files it needs
        browserNoActivityTimeout: 120000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true


    });
};
