const server = require('zcyEvE/server');
let dominlist = Handlebars.templates['zcyEvE/controller/templates/dominlist'];
let childdominlist = Handlebars.templates['zcyEvE/controller/templates/childDomList'];

class EeveePageController {
  constructor() {
    this.beforeRender();
    this.bindEvent();
  }
  beforeRender(){
    this.url = "";
    this.type = "";
  }
  /**
   * 渲染装修页面
   * @parqam
   * 1、pageID,
   * 2、code
   * */
  //渲染网站list
  renderList() {
    server.getDominList().then(d => {
      this.$el.find('.choose-url-list').find('tbody').append(dominlist(d.data));
    })
  }
  //创建站点
  creatWeb(cls) {
    let param = $(cls).getData({
      'ignore':'ign-cls'
    });
    let $tbody = this.$el.find('.choose-url-list').find('tbody');
    const hbs = dominlist([param]);
    $tbody.append(hbs);
  }
  bindEvent(){
    //选择装修方式
    this.$el.on('click','.choose-page .eevee-block-btn',(e)=>{
      let $tar = $(e.currentTarget);
      this.type = '';//$tar.hasClass('net-eevees') ? 'net' : 'web';
      if ($tar.hasClass('template-create')) {
        this.type = 'create';
        location.href='/eevees/templateCreate';
        return;
      } else {
        this.type = $tar.hasClass('net-eevees') ? 'net' : 'web';
      }
      $('.choose-page').addClass('hide');
      $('.choose-url-list').removeClass('hide');
      this.renderList();
    });
    this.$el.on('click','.choose-url-list .js-sites-new',(e)=>{
      let that = this;
      ZCY.utils.modal({
        button:["取消","确认"], //按钮文案
        templateUrl:"zcyEvE/controller/templates/webConfig",   //自定义模板路径
        title:'站点配置',
        cls:"zcyEvE-modal-webConfig",                                 // 自定义class
        confirm:function(m){                             //确认的callback
          that.creatWeb('.zcyEvE-modal-webConfig');
          m.modal('hide');
        },afterRander:function(m,target){                 //弹出框渲染成功后的callback
          $('.zcyEvE-modal-webConfig').find('select').selectric();
        }
      });
    
    });
    this.$el.on('click','.startEevee',(e)=>{
      let data = $(e.target).closest('tr').data();
      if($(e.target).hasClass('childEevee')){
        data = $(e.target).closest('ul').data();
      }
      let url = `/eevees/sites?id=${data.id}&disCode=${data.discode}&link=${data.domain}`;
      window.open(url,'_blank')
    });
    this.$el.on('click','.domainShowMore',(e)=>{
      $(e.target).toggleClass('open');
      $(e.target).hasClass('open') ? $(e.target).html('-') : $(e.target).html('+');
      $(e.target).closest('tr').next('tr').toggleClass('hide');
      const param = {
        id: $(e.target).closest('tr').data('id')
      };
      $(e.target).hasClass('open') && server.getChildDominById(param).then((d)=>{
        $(e.target).closest('tr').next('tr').find('.selfcode-list').html(childdominlist(d.data))
      })
    });
    this.$el.on('click','.js-sites-code-link',(e)=>{
      let $tar = $(e.target);
      ZCY.utils.modal({
        button:["取消","确认"], //按钮文案
        html:"<div class='code-link-box'><span>输入绑定的区划：</span><input type='text' /></div>",   //自定义模板路径
        title:'站点配置',
        cls:"zcyEvE-modal-code-modal",                                 // 自定义class
        confirm:function(m){                             //确认的callback
          let v = $('.zcyEvE-modal-code-modal').find('input').val();
          $tar.closest('tr').data('discode',v);
          $tar.closest('tr').find('td').eq(3).html(v);
          m.modal('hide');
        }
      });
    });
    this.$el.on('click','.js-release-site',(e)=>{
      const $tar = $(e.target).closest('tr');
      let param = $tar.data();
      if($tar.hasClass('domainParent')){
        //TODO update
        if(!param.id){
          server.saveMainDomin(param).then((d)=>{
            if(d.success){
              $tar.data('id',d.data);
              alert('发布成功!')
            }
          })
        }
      } else {
        param = $(e.target).closest('ul').data();
        server.saveChildDomin(param).then((d)=>{
          console.log(d);
        })
      }
    });
    this.$el.on('click','.js-sites-children-code-link',(e)=>{
      let $tar = $(e.target);
      const that = this;
      ZCY.utils.modal({
        button:["取消","确认"], //按钮文案
        templateUrl:"zcyEvE/controller/templates/bindChildrenCode",   //自定义模板路径
        title:'绑定子区划',
        cls:"zcyEvE-modal-child-code-modal",                                 // 自定义class
        confirm:function(m){                             //确认的callback
          that.addDisCode($tar,m);
          m.modal('hide');
          m.remove();
          $('.modal-backdrop').remove();
        },
        afterRander:function(m,target){                 //弹出框渲染成功后的callback
          that.bindModalEvent(target);
        }
      });
    })
  }
  addDisCode(dom,t){
    const $modal = $(t);
    let cls = $modal.find('input[name=ifself]').filter(':checked').val();
    let param = $modal.find(`.${cls}`).getData({
      'ignore':'ign-cls'
    });
    param.pid = dom.closest('tr').data('id');
    if(cls === 'index1'){
      let pd = dom.closest('tr').data('domain');
      param.pd = `${pd}/${param.discode}`
    }
    dom.closest('tr').next('.domainChild').find('.selfcode-list').append(childdominlist([param]))
  }
  bindModalEvent(t){
    const $tar = $(t);
    $tar.find('input[name=ifself]').on('change',(e)=>{
      const cls = $(e.target).val();
      $tar.find('.slefbox').addClass('hide');
      $tar.find(`.${cls}`).removeClass('hide');
    })
  }
}
module.exports = EeveePageController;
