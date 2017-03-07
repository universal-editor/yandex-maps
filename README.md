# Yandex maps components for "Universal Editor"

Module for "Universal Editor" editor which extends the possibility of adding a component `ue-yandex-maps`.

## Installing extensions

This extension is pulled like a bower dependence. For connecting the extension required to execute
the following commands when you located in the root directory of the project:


* Bower install https://github.com/universal-editor/yandex-maps --save -F
* Extension uses angular-yandex-map library
* Required to make connecting javascript-file:
  * ue-yandex-maps.min.js – the main extension file in editor.
  * ya-map-2.1.min.js - angular-yandex-map script file

Connection module:

```javascript
    angular.module('myApp', ['universal-editor', 'ue-yandex-maps']);
```

For correct operation of the extensions editor requires a set of additional libraries that extend the functionality of AngularJS.
A current list of libraries and their version is available in bower.json of the file repository ("section" dependencies). If
extension connected via bower, then he will download the necessary libraries.

## Building

Recommendation: running console with Administrator permissions. Address http://ue-yandex-maps.dev is including into host file and open in browser.
If don't running console this way, have to enter http://ue-yandex-maps.dev in host file manually as new line like this

127.0.0.1 ue-tinymce.dev

Install dependences:

1. `npm install`
1. `bower install`

Run build:

* `npm run dev`: build and watch sources, create web server. 
* `npm run dist`: create web server from './dist' directory.
* `npm run build`: build to `./dist` directory.

## Documentation

* [Русский](docs/ru/README.md)
