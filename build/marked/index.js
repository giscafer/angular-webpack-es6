'use strict'
/**
 * Modules
 */

var fs = require('fs'),
    path = require('path'),
    highlightJS = require('highlight.js'),
    marked = require('marked');

// Synchronous highlighting with highlight.js
marked.setOptions({
    highlight: function(code) {
        return highlightJS.highlightAuto(code).value;
    }
});

/**
 * Load files
 */

function loadFiles() {
    let dir = path.join(__dirname, '../../doc/pages/'),
        files = {},
        list = [],
        file, i, l;
    console.log(dir);
    let travel = (dir) => {
        fs.readdirSync(dir)
            .forEach((file) => {
                let pathname = path.join(dir, file);
                // console.info(pathname,fs.statSync(pathname).isDirectory());
                if (fs.statSync(pathname).isDirectory()) {
                    travel(pathname);
                } else {
                    if (path.extname(file) === '.md') {
                        list.push(pathname);
                    }
                }
            });
    };
    travel(dir);
    i = 0;
    l = list.length;
    console.log(list);
    for (; i < l; i++) {
        file = list[i];
        // console.log(path.basename(file));
        let text = fs.readFileSync(file, 'utf8');
        fs.writeFileSync(file.replace(/[^.]+$/, 'html'), '<div class="markdown-body">' + marked(text) + '</div>');
    }

    return list;
}

module.exports = loadFiles;
