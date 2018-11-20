$.fn.treeRender = function(){
  const method = arguments.length === 2 ? arguments[0] : 'init';
  const option = arguments.length === 2 ? arguments[1] : arguments[0];
  let controller = '';
  if($(this).data('tree')){
    controller = $(this).data('tree');
    return method !== 'init' ? controller[method](option) : '';
  }
  const temp = require('zcyEvE/tool/tree/view');
  controller = new temp($(this),option);
  $(this).data('tree',controller);
  return controller.init();
};

