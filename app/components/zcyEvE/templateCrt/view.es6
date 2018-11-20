const server = require('zcyEvE/server');
const eevee = require('zcyEvE/ZCYeevee');
const reviewPage = Handlebars.templates['zcyEvE/controller/templates/reviewPage'];
const groupLine = Handlebars.templates['zcyEvE/templateCrt/templates/groupLine'];
const eeveefn = require('zcyEvE/eevees/view');
const commonPage = Handlebars.templates['zcyEvE/eevees/templates/commonPage'];
 
 class TempController {
  constructor() {
    this.render();
    this.bindTempEvent();
    this.page = "";
    this.$dom = '';
    this.eeveesfn = new eeveefn({
      $el : this.$el,
      type: 'template'
    });
  }
  render(){
    server.getTemplate().then(d=>{
      console.log(d);
      this.$el.find('.ZCY-template-box').html(groupLine(d.data));
    })
  }
  bindTempEvent() {
    this.$el.on('click','.ZCY-template-list .review-btn',(e)=>{
      let data =  $(e.target).closest('li').data('json');
      this.showPage(data.templateJson);
    });
    this.$el.on('click','.ZCY-template-list .edit-btn',(e)=>{
      this.editTemplate(e);
    });
    this.$el.find('.ZCY-eevee-page-body').on('click','.closeReview',(e)=>{
      this.$el.find('.ZCY-eevee-page-controller-content').removeClass('hide');
      this.$el.find('.review').html('').addClass('hide');
      e.preventDefault();
      e.stopPropagation();
    });
    this.$el.find('.js-page-addGroup').on('click',() => {
      this.addGroup();
    });
    this.$el.find('.js-cancel-edit').on('click',() => {
      this.$el.find('.edit-op').addClass('hide');
      this.$el.find('.hide-btn').removeClass('hide');
      this.$el.find('.ZCY-eevee-row-page').empty();
      this.$dom = '';
    });
    this.$el.on('click', '.ZCY-template-list h1',(e)=>{
      let $tar = $(e.target);
      $tar.closest('.ZCY-template-list').toggleClass('active');
    });
    this.$el.on('click', '.ZCY-template-list a',(e)=>{
      let $tar = $(e.target);
      let $p = $tar.closest('.ZCY-template-list');
      let len = $p.find('ul li').length + 1;
      let keys = $p.data('key');
      if ($tar.hasClass('add-template')) {
        this.addTemplate({
          keys,len,$p
        })
      }
      e.preventDefault();
      e.stopPropagation();
    })
    this.$el.find('.js-template-save').on('click',()=>{
      this.savePage();
    })
    // this.$el.find('.js-save-page').on('click',()=>{
    //   this.savePage();
    // })
    $('.js-invoice-image').uploadImage({bizCode: '1011', maxSize: 20*1024*1024});
  
  }
  addTemplate(obj){
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/templateCrt/templates/addDisc",   //自定义模板路径
      title:'添加描述',
      cls:"zcyEvE-comps-modal-addDisc",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        const $tar = $('.zcyEvE-comps-modal-addDisc');
        const data = $tar.getData();
        that.sendAddAjax(data,obj);
        m.modal('hide');
        $tar.remove();
        $('.modal-backdrop').remove();
      }
    });
  }
  sendAddAjax(d,obj){
    const param = {};
    const temp = obj.$p.data();
    param.page = "";
    param.templateJson = "";
    param.templateId = temp.id;
    param.text = d.text;
    server.saveChildTemplate(param).then(data=>{
      if(data.success) {
        obj.$p.find('ul').append(`
          <li data-id="${data.data}" data-pid="${temp.id}" data-page="${temp.key}|${data.data}" data-text="${param.text}">
            <div class="review-comp-box"></div>
            <div class="mask">
              <button class="review-btn">预览</button>
              <button class="edit-btn">编辑</button>
            </div>
            <h3 class="text-center">${temp.key}|${data.data}</h3>
            <h3 class="text-center">${param.text}</h3>
          </li>
        `)
      }
    })
  }
  savePage(){
    let re = this.eeveesfn.submit();
    re.page = this.$dom.data('page');
    re.id = this.$dom.data('id');
    re.text = this.$dom.data('text');
    re.pid = this.$dom.data('pid');
    re.version = re.page;
    this.$dom.data('json',re);
    
    server.submitTemplate({result:re}).then(d=>{
      console.log(d);
    })
  }
  editTemplate(e) {
    let $tar = $(e.target);
    let data = $tar.closest('li').data('json')||{};
    let html = commonPage(data.templateJson||[]);
    this.$dom = $tar.closest('li');
    this.page = this.$dom.data('page');
    this.$el.find('.ZCY-eevee-row-page').html(html);
    this.$el.find('.currentPage').html(this.page);
    this.$el.find('.edit-op').removeClass('hide');
    this.$el.find('.hide-btn').addClass('hide');
    this.eeveesfn.resetMap();
  }
  showPage(data){
    let html = reviewPage(data);
    this.$el.find('.ZCY-eevee-page-controller-content').addClass('hide');
    this.$el.find('.review').html(html).removeClass('hide');
  }
  addGroup(){
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/templateCrt/templates/addGroup",   //自定义模板路径
      title:'模板选择',
      cls:"zcyEvE-comps-modal-addGroup",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        const $tar = $('.zcyEvE-comps-modal-addGroup');
        const data = $tar.getData();
        data.children = [];
        that.sendaddGroup(data);
        m.modal('hide');
        $tar.remove();
        $('.modal-backdrop').remove();
      }
    });
  }
  sendaddGroup(d){
    let that = this;
    let param = {
      groupId: d.groupID,
      groupName: d.groupName,
      groupWord : d.groupword
    }
    server.groupSave(param).then(data=>{
      if(data.success){
        param.id = data.data;
        that.$el.find('.ZCY-template-box').append(groupLine([param]));
      }
    })
  }
}
module.exports = TempController;
