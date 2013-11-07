var Formula = function(id, value, inline) {
  this.id = 'math_' + id;
  this.value = value;
  this.inline = inline;
};

Formula.prototype = {
  get url() {
    var param = this.value;
    if (!this.inline)
      param = '$$' + value + '$$';
    return 'http://chart.apis.google.com/chart?cht=tx&chl=' +
        encodeURIComponent(param);
  },

  get markdown() {
    var result = '![' + this.value + '][' + this.id + ']';
    if (!this.inline)
      result = '\n\n' + result + '\n\n';
    return result;
  },

  get footer() {
    return '  [' + this.id + ']: ' + this.url;
  }
};

var mathify = function(post) {
  var regex = new RegExp('(^|\\s)(\\$|\\$\\$)(.+?)\\2($|\\s)', 'g');
  var formulae = [];
  var replacer = function(match, spaceBefore, mark, value, spaceAfter) {
    var formula = new Formula(formulae.length, value, mark == '$');
    formulae.push(formula);
    if (formula.inline)
      return spaceBefore + formula.markdown + spaceAfter;
    else
      return formula.markdown;
  };
  var result = post.replace(regex, replacer);
  formulae.forEach(function(formula) {
    result += '\n' + formula.footer;
  });
  return result;
}
/*
var originalInput = top.Attacklab.panels.input;
var infectedInput = {
  original: originalInput,
  get value() { return this.input.value + " ===HACK=== "; }
};

var originalIsVisible = top.Attacklab.Util.isVisible;
var infectedIsVisible = function(elem) {
  if (elem.hasOwnProperty('original'))
    return originalIsVisible.call(this, elem.input);
  else
    return originalIsVisible.call(this, elem);
};

top.Attacklab.Util.isVisible = infectedIsVisible;
top.Attacklab.panels.input = infectedInput;
*/
