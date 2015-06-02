/**
 * Created by berry on 15/6/2.
 */

/**
 * var r = [];
 * r.push();
 * r.join();
 */
var template = function (tpl, data) {
    var re = /<%([^%>]+)?%>/g;  // + 好像有问题
    var regExp = /^( )?(if|else|for|switch|case|break|continue|{|})(.*)?/g; //{}，感觉不靠谱啊
    var cursor = 0;
    var code = 'var r = [];\n';
    var match = [];
    var add = function (line, js) {
        js ? (code += line.match(regExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n');
    };

    while (match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        add(match[1], true);
        cursor = match.index + match[0].length;
    }
    code += 'return r.join("");';
    console.log(code);
    return new Function(code.replace(/\t\n\r/g, '')).apply(data);
};

var tpl = '<h1><%this.name%> is <%this.age.number%> years old.</h1>' +
    '<h2><%for(var skill in this.skills){%>' +
    '<span><%this.skills[skill]%></span>' +
    '<%}%></h2>';
var data = {
    name: 'berry',
    age: {
        number: 28
    },
    skills: ['haha', 'guagua', 'huhu']
};

console.log(template(tpl, data));

