// Generated by CoffeeScript 1.6.3
(function () {
    'use strict';

    var YAML = require('yamljs');

    var path = require('path')

    var env = require('../enviroments');

    var handlebars = require("handlebars");

    var tree = YAML.load(path.resolve(env.filesHome, 'resources/tree.yaml'));
    var bundles = {};
    for (var key in tree) {
        var obj = YAML.load(path.resolve(env.filesHome,`resources/${key}/${tree[key]}.yaml`));
        bundles[key] = obj;
    }

    handlebars.registerHelper("i18n", function (key,context, options){
        var v = key;
        if(context && context.hash){
            var bundleKey = context.hash['bundle'];
            var bundle =  bundles[bundleKey];
            if(bundle) {
                v = bundle[key];
            }
        }
        return v;
    });

    handlebars.registerHelper("i18nJs", function () {
        return "";
    });

    handlebars.registerHelper("i18nJsHelper", function () {
        return new handlebars.SafeString('if (window.Handlebars) {Handlebars.registerHelper("i18n", function(key) {return key;});}');
    });

}).call(this);
