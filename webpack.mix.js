const mix = require('laravel-mix')

mix.stylus('stylus/app.styl', 'docs/css/app.css')
.js('js/app.js', 'docs/js/app.js')
