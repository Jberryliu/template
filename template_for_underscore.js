/**
 * Created by berry on 15/6/2.
 * todo: 正则匹配有问题
 */

var REG = {
    evaluate: /<%([^=-](?:[\S\s])+?)%>/g,
    interpolate: /<%=([\S\s]+?)%>/g,
    escape: /<%-([\S\s]+?)%>/g
};

var ESCAPEHTML = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#x27;',
    '"': '&quot;',
    '`': '&#x60;'
};

function template(tpl) {
    var match = RegExp([
        REG.evaluate.source,
        REG.interpolate.source,
        REG.escape.source
    ].join('|'), 'g');

    var index = 0;
    var source = "__p +='";
    console.log(match);

    tpl.replace(match, function (match, evaluate, interpolate, escape, offset) {
        // 先加载原生 html
        console.log('match: ' + match + '\n');
        console.log('evaluate: ' + evaluate + '\n');
        console.log('interpolate: ' + interpolate + '\n');
        console.log('escape: ' + escape + '\n');
        console.log('offset: ' + offset + '\n');

        source += tpl.slice(index, offset); // todo: 这里会处理特殊的实体字符
        index = offset + match.length;

        debugger;
        if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
        } else if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null ? '': __t)+\n'";
        } else if (escape) {
            source += "'+\n((__t=(" + escape + "))==null ? '': escape(__t))+\n'";
        }

        return match;
    });

    source += "'\n";
    source = '' +
    'var __t;\n' +
    'var __p = "";\n' +
    'var __j = Array.prototype.join;\n' +
    source +
    'return __p;\n';

    return source;

}

var tpl = 'hello: <%= name %>' +
    '<b><%- value %></b>' +
    '<% for(var key in skills){ %>' +
    '<span><%= skills[key] %></span>' +
    '<% } %>';
console.log(template(tpl));