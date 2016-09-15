# Yandex maps plugin for "Universal Editor"

Directive to "Universal Editor" editor which extends the possibility of adding a field **yandex-maps**.

## Installing extensions

This extension is pulled like a bower dependence. For connecting the extension required to execute
the following commands when you located in the root directory of the project:


* Bower install https://github.com/universal-editor/yandex-maps-plugin --save -F
* Extension uses angular-yandex-map library
* Required to make connecting javascript-file:
  * yandex-maps-plugin.min.js – the main extension file in editor.
  * ya-map-2.1.min.js - angular-yandex-map script file

Connection module:

```javascript
    angular.module ( 'unEditor', [ 'universalEditor.YandexMaps']);
```

For correct operation of the extensions editor requires a set of additional libraries that extend the functionality of AngularJS.
A current list of libraries and their version is available in bower.json of the file repository ("section" dependencies). If
extension connected via bower, then he will download the necessary libraries.

Notes:

For building the project, which connects the extension, should use a gulp plugins:
* Main-bower-files – gathers all the paths to the libraries referred to in bower.json;
* Gulp-inject – can connect js and css in the project in the specified location.

## Documentation

Types of field

* [yandex-maps](docs/en/README.md)