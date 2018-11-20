Handlebars.registerHelper("json", function(json, options) {
  return JSON.stringify(json);
});
Handlebars.registerHelper("motp", function(a,b, options) {
  return parseInt(a*b);
});
Handlebars.registerHelper("toArr", function(a,b, options) {
  let result = [];
  if(typeof a === 'object'){
    return a;
  }
  if(a && typeof a === 'string') {
    result = a.split(',');
  }
  return result;
});

Handlebars.registerHelper("equals", function(a, b, options) {
  if ((a != null ? a.toString() : void 0) === (b != null ? b.toString() : void 0)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
Handlebars.registerHelper("arrChange", function(a, b, options) {
  if(a && a.indexOf('|')){
   const index = Number(b);
   return a.split('|')[index];
  }else{
    return a;
  }
});