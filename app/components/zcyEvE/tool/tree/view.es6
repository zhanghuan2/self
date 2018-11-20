const treeList = Handlebars.templates['zcyEvE/tool/tree/templates/tree'];
const searchTemplates = Handlebars.templates['zcyEvE/tool/tree/templates/searchTemplates'];
class treecls {
  constructor(el,option) {
    this.$el = $(el);
    this.option = option;
    this.temp = "";
    this.checked = [];
    this.name = [];
    this.defaultCode = [];
  }
  init(){
    const t = require('zcyEvE/eevee_comps/mock');
    this.temp = t.discode();
    this.data = this.temp.result.children;
    this.render();
    this.setTree();
    this.bindBoxEvent();
    this.renderHtml();
    this.renderUlEvent();
  }
  render(){
    this.$el.html(`<div class="zcy-tree-box">
                    <div class="zcy-tree-input">
                    
                    </div>
                    <div class="zcy-tree-search">
                    
                    </div>
                  </div>`);
    // this.$el.find('.zcy-tree-search');
  }
  setTree(){
    this.$box = this.$el.find('.zcy-tree-box');
    this.$input = this.$el.find('.zcy-tree-input');
    this.$search = this.$el.find('.zcy-tree-search');
  }
  bindBoxEvent(){
    this.$el.on('click.tree','.zcy-tree-input',(e) => {
      this.$box.toggleClass('tree-open');
      if(this.$box.hasClass('tree-open')){
        this.bindBodyEvt();
      }else{
        $('body').off('click.zcytree');
      }
      e.stopPropagation()
    });
  }
  bindBodyEvt(){
    $('body').on('click.zcytree',(e)=>{
      this.$box.removeClass('tree-open');
      const result = this.getData();
      this.renderTitle();
      $('body').off('click.zcytree');
    })
  }
  renderTitle(){
    const result = {
      name: this.name,
      code: this.checked
    };
    this.$input.html(searchTemplates(result));
    this.$input.attr('title',this.name.join(','))
  }
  renderHtml(){
    this.$search.html(treeList(this.data));
  }
  renderData(obj){//110000
    this.checked = obj.code;
    this.name = obj.name;
    this.renderTitle();
    this.renderTreeData();
  }
  //渲染数默认选中数据
  renderTreeData(){
    const $dom = this.$el.find('.zcy-tree-ul-box').children('li');
    this.renderliData($dom);
  }
  renderliData($dom){
    $.each($dom,(i,item)=>{
      const $div = $(item).children('.zcy-tree-node');
      const $input = $div.find('input');
      const id = ($input.data('code')).toString();
      if($.inArray(id,this.checked)>-1){
        $input.prop('checked',true);
        $input.trigger('change');
      }else {
        this.renderliData($(item).children('ul').children('li'));
      }
    })
  }
  getliData($dom){
    $.each($dom,(i,item)=>{
      const $div = $(item).children('.zcy-tree-node');
      const $input = $div.find('input');
      if($div.hasClass('zcy-tree-node-check-part')){
        this.getliData($(item).children('ul').children('li'));
      }else {
        if($input.is(':checked')){
          this.checked.push($input.data('code').toString());
          this.name.push($input.data('name'));
        }
      }
    })
  }
  getData(){
    this.checked = [];
    this.name = [];
    const $dom = this.$el.find('.zcy-tree-ul-box').children('li');
    this.getliData($dom);
    return {
      name: this.name,
      code: this.checked
    }
    
  }
  clear(){
    this.$search.find('input').prop('checked',false);
    this.$search.find('.zcy-tree-node-check-part').removeClass('zcy-tree-node-check-part');
    this.$input.html('');
    this.checked = [];
    this.name = [];
  }
  renderUlEvent(){
    this.$el.find('.zcy-tree-node').on('click',(e)=>{
      const $tar = $(e.target);
      const $p = $(e.currentTarget);
      if($tar.is('span') && $tar.hasClass('zcy-tree-icons')){
        $p.parent().find('input').trigger('change');
      }else if($tar.is('input')){
      
      }else{
        if(!$p.hasClass('zcy-tree-leaf')){
          $p.hasClass('zcy-tree-close') ? this.open($p) : this.close($p);
        }
      }
      e.stopPropagation()
    });
    this.$el.find('.zcy-tree-node input').on('change',(e)=>{
      const $tar = $(e.target);
      this.check($tar);
      e.stopPropagation()
    })
  }
  open($dom){
    $dom.removeClass('zcy-tree-close').addClass('zcy-tree-open');
    $dom.parent().removeClass('zcy-tree-li-close').addClass('zcy-tree-li-open');
  }
  close($dom){
    $dom.removeClass('zcy-tree-open').addClass('zcy-tree-close');
    $dom.parent().removeClass('zcy-tree-li-open').addClass('zcy-tree-li-close');
  }
  check($dom){
    const $p = $dom.parent();
    const index = $dom.data('level');
    const v = $dom.is(':checked');
    let $ul = $dom.closest('ul');
    for(let i = 1;index-i > 0;i++) {
      const $li = $ul.children('li');
      const checkboxs = $li.children('.zcy-tree-node');
      const checked = checkboxs.find('input').filter(':checked');
      const length = $ul.data('length') || 0;
      if(checked.length === 0){
        $ul.parent().children('.zcy-tree-node').find('input').prop('checked',false);
        $ul.parent().children('.zcy-tree-node').removeClass('zcy-tree-node-check-part');
      }else if(checked.length === length){
        $ul.parent().children('.zcy-tree-node').find('input').prop('checked',true);
        $ul.parent().children('.zcy-tree-node').removeClass('zcy-tree-node-check-part');
      }else {
        $ul.parent().children('.zcy-tree-node').find('input').prop('checked',false);
        $ul.parent().children('.zcy-tree-node').addClass('zcy-tree-node-check-part');
      }
      $ul = $ul.closest('ul');
    }
    if($p.hasClass('zcy-tree-parent')){
      v ? $dom.closest('li').find('ul').find('input').prop('checked',true) :
        $dom.closest('li').find('ul').find('input').prop('checked',false);
  
      $dom.closest('li').find('ul').find('.zcy-tree-node').removeClass('zcy-tree-node-check-part');
    
    }
  }
  
}
module.exports = treecls;