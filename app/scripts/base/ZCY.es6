// Handlebars && Handlebars.registerHelper('component', function (a, options) {
//   const _path = this.path;
//   let className = a,
//     template = `<div class="${className}" data-compath="${_path}">${options.fn(this)}</div>`;
//   return template;
// });
Handlebars && Handlebars.registerHelper('insert', function () {
  let data  = this;
  const path = arguments[0];
  // let _data = arguments.length === 2 ? (arguments[1].hash||{}) :data;
  let template = Handlebars.templates[path];
  return template(data);
});
Handlebars && Handlebars.registerHelper('insert3', function () {
  let data  = this;
  const path = arguments[0];
  
  let result = {};
  try {
    const mock = require(path);
    result = mock[p]();
  }
  catch(err) {
  
  }
  // let _data = arguments.length === 2 ? (arguments[1].hash||{}) :data;
  let template = Handlebars.templates[path];
  return template(data);
});
Handlebars && Handlebars.registerHelper('init', function (p,d) {
  const path = arguments[0];
  // let _data = arguments.length === 2 ? (arguments[1].hash||{}) :data;
  let template = Handlebars.templates[path];
  return template(d||{});
});
window.ZCY = {};
ZCY.utils = (function(){
  var _modalId = 0;
  var _ModalTemplate = "";
  
  function _modal(){
    var param = arguments[0];
    var type = param.type || "normal";
    //获取模态框外层基础模板
    if(!_ModalTemplate)
      _ModalTemplate = Handlebars.templates["templates/modal"];
    var btn = [];
    //设置默认按钮文字
    if(param.button){
      btn = param.button;
    }
    var tempData = {
      title   :  param.title||"提示",
      btn1    :  (btn)[0] || "取消",
      btn2    :  (btn)[1] || "确定",
      cls     :  param.cls || "",
      type    :  type,
      content :  param.content || ["确认此操作吗？"],
      id      :  ++_modalId
    };
    //获取模态框dom节点
    var $modalDom = $(_ModalTemplate(tempData));
    //获取模态框body 自定义内容
    var html;
    if(param.templateUrl){
      var data = param.data || {};
      var templates =  Handlebars.templates[param.templateUrl];
      html = templates(data);
    }
    if(param.html){
      html  = param.html;
    }
    //将自定义 body内容嵌入到模态框中
    html && $modalDom.find(".modal-body").html(html);
    //当模态框不是normal时 内容填入
    if(!html && param.content.length>0 && type!="normal"){
      $modalDom.find(".modal-body .info-title").html(param.content[0]||"");
      type =="second" ?
        $modalDom.find(".modal-body .second-content").html(param.content[1]||"") :
        $modalDom.find(".modal-body .info-content").html(param.content[1]||"");
    }
    $("#modal-id-"+tempData.id).length == 0 && $('body').append($modalDom[0].outerHTML);
    
    var $modal = $("#modal-id-"+tempData.id);
    $modal.modal('show');
    
    //绑定按钮事件
    $modal.find(".modal-footer button").unbind("click.ZCY").bind("click.ZCY",function(){
      if($(this).hasClass("btn-cancel")){
        $.isFunction(param.cancel) ? param.cancel($modal) : $modal.modal('hide');
        $modal.remove();
        $('.modal-backdrop').remove();
      }else{
        $.isFunction(param.confirm) ? param.confirm($modal) : $modal.modal('hide');
      }
    });
    //加载弹框show后的事件
    $.isFunction(param.afterRander) && param.afterRander($modal,"#modal-id-"+tempData.id);
    
    //二次弹框 CheckBox 选择时 按钮disabled 控制
    if(type=="second"){
      $("#modal-id-"+tempData.id).find(".second-checkbox").on("change.zcy",function(){
        if($(this).is(":checked")){
          $("#modal-id-"+tempData.id).find(".btn-success").removeAttr("disabled");
        }else{
          $("#modal-id-"+tempData.id).find(".btn-success").attr("disabled",true);
        }
      })
    }
    
    return {
      dom:$("#modal-id-"+tempData.id),
      modal:$modal
    };
  }
  
  function _getData(){
    var $tar = $(arguments[0]).find("[name]");
    var result = {};
    var config = arguments[1] || {};
    if(config.type === 'arr'){
      $tar = $(arguments[0]).find(config.tar || "[name]");
      var result = [];
      $.each($tar,function(i,v){
        var $dom = $(this);
        var index = $dom.data('index');
        var _pop = $dom.data('key');
        if(!result[index]){
          result[index] = {};
        }
        var obj = result[index];
        if($dom.hasClass(config.ignore)){
          return true;
        }
        var value="";
    
        if($dom.is("input[type=text]") || $dom.is("textarea")){
          if($dom.hasClass(config.money)){
        
          }else if($dom.hasClass(config["date-sec"])){
        
          }else{
            obj[_pop] = $dom.data('getv') ? $dom.data('getv') : $dom.val();
          }
        }else {
          obj[_pop] = "";
        }
      });
      return result
    }
    $.each($tar,function(i,v){
      var $dom = $(this);
      var _pop = $dom.attr("name");
      if($dom.hasClass(config.ignore)){
        return true;
      }
      var value="";
      
      if($dom.is("input[type=text]") || $dom.is("textarea")){
        if($dom.hasClass(config.money)){
        
        }else if($dom.hasClass(config["date-sec"])){
        
        }else{
          result[_pop] = $dom.data('getv') ? $dom.data('getv') : $dom.val();
        }
        
      }else if($dom.is("select")){
        result[_pop] = $dom.val();
        result[_pop+"text"] = $dom.find("option:selected").text();
      } else if($dom.is("input[type=radio]")){
        if($dom.is(':checked')){
          result[_pop] = $dom.val();
        }
      } else if($dom.is("input[type=checkbox]")){
        result[_pop] = $dom.is(':checked') ? 1 : 0;
      }
      
    });
    return result;
  }
  
  $.fn.getData = function(){
    return _getData($(this),arguments[0]);
    
  };
  
  return {
    modal:function () {
      return _modal.apply(this,arguments);
    },
    query:function(){
      var param = location.href.split('?')[1];
      var result = {};
      if(!param)
        return {};
      $.each(param.split('&'),(i,v)=>{
        let temp = v.split('=');
        result[temp[0]] = temp[1];
      })
      return result;
    }
    
    
  }
  
  
  
})();
ZCY.Cookie = {
  set: function(c_name, value, expiredays) {
    var v = JSON.stringify(value);
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + encodeURIComponent(v) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  get: function(c_name) {
    if(document.cookie.length > 0) {
      var c_start, c_end;
      c_start = document.cookie.indexOf(c_name + "=")
      if(c_start != -1) {
        c_start = c_start + c_name.length + 1
        c_end = document.cookie.indexOf(";", c_start)
        if(c_end == -1) c_end = document.cookie.length
        var cookieValue;
        try{
          cookieValue = JSON.parse(decodeURIComponent(document.cookie.substring(c_start, c_end)));
        }catch(e){
          cookieValue = decodeURIComponent(document.cookie.substring(c_start, c_end));
        }
        return cookieValue;
        
        //return JSON.parse(decodeURIComponent(document.cookie.substring(c_start, c_end)))
      }
    }
    return null;
  },
  del: function(c_name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = Cookies.get(c_name);
    if(cval != null) document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
ZCY.messageCenter = (function(){
  
  let msgObsMap = {}
  
  /**
   * 注册消息观察者
   * @param message 监听的消息名称
   * @param obj 观察者对象
   * @param handler 消息回调函数
   * @param dom 观察者关联的页面元素
   */
  function registerObserver(message, obj, handler, dom) {
    let observerArray = msgObsMap[message]
    if (!observerArray) {
      observerArray = []
      msgObsMap[message] = observerArray
    }
    let observer = {
      obj: obj,
      handler: handler
    }
    observerArray.push(observer)
    if (dom) {
      let observerData = $(dom).data('ZCY_Observer')
      if (!observerData) {
        observerData = {}
      }
      if (!observerData[message]) {
        observerData[message] = []
      }
      observerData[message].push(observer)
      $(dom).data('ZCY_Observer', observerData)
    }
  }
  
  /**
   * 消息定向分发
   * @param message 消息名称
   * @param selector 消息接受者选择器
   * @param params 消息附加参数
   */
  function dispatchMessage(message, selector, params) {
    $(selector).each((i, dom) => {
      let observerData = $(dom).data('ZCY_Observer')
      if (observerData && observerData[message]) {
        let observerArray = observerData[message]
        if (observerArray && observerArray.length > 0) {
          _dispatch(observerArray, params)
        }
      }
    })
  }
  
  /**
   * 消息广播
   * @param message 消息名称
   * @param params 消息附加参数
   */
  function broadcastMessage(message, params) {
    let observerArray = msgObsMap[message]
    if (observerArray && observerArray.length > 0) {
      _dispatch(observerArray, params)
      //清理已经失效的观察者
      msgObsMap[message] = observerArray.filter((observer) => {
        return !!observer.obj
      })
    }
  }
  
  function _dispatch (observerArray, params) {
    //异步执行回调
    setTimeout(() => {
      $.each(observerArray, (i, observer) => {
        if (observer.obj) {
          if (observer.handler) {
            observer.handler.call(observer.obj, params)
          }
        }
      })
    }, 0)
  }
  
  
  return {
    registerObserver: function () {
      return registerObserver.apply(this,arguments);
    },
    dispatchMessage: function () {
      return dispatchMessage.apply(this,arguments);
    },
    broadcastMessage: function () {
      return broadcastMessage.apply(this,arguments);
    }
  }
})();

$.fn.serializeObject = function() {
  var o = {"unique_id":new Date().getTime(),"state":false};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

ZCY.message = (function(){
  var type = 'stop';
  var $body = $('body');
  
  function _show(w) {
    if(type !== 'start'){
      type = 'start';
      $body.find('.ZCY-Goble-info .ZCY-Goble-info-content').html(w)
      $body.find('.ZCY-Goble-info').fadeIn();
      setTimeout(function () {
        $body.find('.ZCY-Goble-info').fadeOut(function(){
          type = 'stop';
        })
      },1000)
    }
  }
  function _info(word) {
    if($body.find('.ZCY-Goble-info').length > 0){
      _show(word);
    }else {
      $body.append(`
        <div class="ZCY-Goble-info" style="display: none;z-index:9998;">
          <div class="ZCY-Goble-info-content">${word}</div>
        </div>
      `);
      _show(word);
    }
  }
  
  
  
  return {
    info:function () {
      return _info.apply(this,arguments);
    }
  }
})()