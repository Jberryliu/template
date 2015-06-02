/**
 * Created by berry on 15/6/2.
 */
var template = function(tpl, data){
    var re = /<%([^%>]+)?%>/g;  // + 好像有问题
    var match = [];

    while(match = re.exec(tpl)){
        tpl = tpl.replace(match[0], data[match[1]]);
    }
    return tpl;

};

var tpl = '<h1><%name%> is <%age%> years old.</h1>';
var data = {
    name: 'berry',
    age: 28
};

console.log(template(tpl, data));

