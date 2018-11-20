const eevee = require('zcyEvE/ZCYeevee');
const server = require('zcyEvE/server');
let mask = Handlebars.templates['zcyEvE/controller/templates/mask'];
let selectTemplates = Handlebars.templates['zcyEvE/controller/templates/select'];
let selectCommp = Handlebars.templates['zcyEvE/controller/templates/selectCommp'];
let changeRegx = Handlebars.templates['zcyEvE/controller/templates/changeRegx'];
let changepageTemplates = Handlebars.templates['zcyEvE/controller/templates/changePage'];
let addTemplates = Handlebars.templates['zcyEvE/controller/templates/addTemplate'];
let ruleModalTemp = Handlebars.templates['zcyEvE/eevees/templates/ruleModalTemp'];
let reviewPage = Handlebars.templates['zcyEvE/controller/templates/reviewPage'];
let commonPage = Handlebars.templates['zcyEvE/eevees/templates/commonPage'];
let compinitPage = Handlebars.templates['zcyEvE/controller/templates/compinitPage'];
let compElE = Handlebars.templates['zcyEvE/eevees/templates/compElE'];
let compsetTemplates = Handlebars.templates['zcyEvE/controller/templates/compSet'];
let options = Handlebars.templates['zcyEvE/eevees/templates/options'];

let rightPart = Handlebars.templates['zcyEvE/controller/templates/rightPart'];
let compsSetRightPart = Handlebars.templates['zcyEvE/controller/templates/compsSetRightPart'];



const bizcode = 1011;
const maxSize = 20*1024*1024;

const offsetLeft = 338;
class EeveePageController {
  constructor(obj) {
    this.basecfg = obj;
    if(obj.$el){
      this.$el = $(obj.$el);
    }
    this.beforeRender();
    this.render();
    this.bindEvent();
  }
  beforeRender(){
    this.page = '';
    this.pageName = '';
    this.disCode = ZCY.utils.query().disCode || '339900';
    this.pageId = ZCY.utils.query().pageId;
    this.templateId = ZCY.utils.query().templateId;
    this.link = ZCY.utils.query().link;
    this.type2 = ZCY.utils.query().type;
    this.config = eevee.getBaseCfg();
    this.pageBox = this.$el.find('.ZCY-eevee-row-page');
    this.$con = this.$el.find('.body-content');
    //保存数据
    this.tempjson = [];
    //发布数据
    this.data = {};
    this.index=null;
    this.name=null;
    this.url = "";
    this.type = "";
    this.drag = false;
    this.position = {};
    this.lineArr = [];
    this.lineMap = {};
    this.lineIndex = 0;
    this.scroll = {x:0,y:0};
    this.mouseE = "";
    this.template = '';
    this.tid = '';
    this.conectTemplate = false;
    this.RULL = {};
    this.compth = "";
    this.siteId = ZCY.utils.query().siteId;
    
    this.methodType = ZCY.utils.query().method;
    this.pageType = ZCY.utils.query().type;
  
    const temps = ZCY.utils.query().theme || '#197aff';
    this.theme = this.config.themeMap[temps.toLowerCase()];
  }
  render(){
    let param = {
      'templateId': this.page,
      'district':this.url
    };
    this.renderPage(param);
    const query = ZCY.utils.query();
    if(query.type==='template'){
      this.$el.find('.page-li').addClass('hide');
      this.$el.find('.template-li').removeClass('hide');
      this.$el.find('.template-name').html(decodeURI(query.templateName))
      this.$el.find('.template-name').attr('title',decodeURI(query.templateName));
      this.$el.find('.js-page-release').html('保存模板');
      this.$el.find('.js-page-saveTemp').addClass('hide');
      
    } else {
      this.$el.find('.site-name').html(decodeURI(query.siteName));
      this.$el.find('.site-name').attr('title',decodeURI(query.siteName));
      this.$el.find('.site-net').html(query.siteUrl);
      this.$el.find('.site-net').attr('title',query.siteUrl);
      this.$el.find('.local-page').html(decodeURI(query.pageName));
      this.$el.find('.local-page').attr('title',decodeURI(query.pageName));
      
      this.$el.find('.theme-color span.title').html('天蓝色');
      this.$el.find('.theme-color span.theme-bgm').css('background',query.theme);
    }
    
    
    
    
    // $('.tempTree').treeRender();
    // $('.tempTree').treeRender('renderData',{
    //   name: ['北京市'],
    //   code: ['110000']
    // })
    
  }
  /**
   * 渲染装修页面
   * @parqam
   * 1、pageID,
   * 2、code
   * */
  renderPage(p){
    //TODO
    this.param = p;
    this.data = this.pageBox.data('json');
    this.tempjson = [];//this.data._DATA_.templateJson.slice(0);
    let cfg = this.config.comp;
    this.$el.find('.side-content .compsSet').html(compsSetRightPart(cfg));
    // this.methodType === 'edit' && server.getDominPages({
    //   id:this.pageId,
    //   disCode:this.disCode
    // }).then((d)=>{
    //   this.initPage(d.result)
    // });
    server.getTemplatePages(this.templateId).then((d)=>{
      this.initPage(JSON.parse(d.result));
    });
  
    // const mock = this.getMockData('page/data');
    // this.initPage(JSON.parse(mock.result));
    // server.getTemplate().then(d=>{
    //   this.template = d.data;
    // })
    // server.findAllRule().then(d=>{
    //   this.RULL = d.data;
    // })
  }
  initPage(current){
    if(!current) return;
    // this.page = current.page;
    // this.pageName = current.pageName;
    // this.$el.find('span.currentPage b').html(current.page);
    this.pageBox.html(commonPage(current.templateJson));
    
    $('.eevee-theme-normal').removeClass('eevee-theme-normal');
    $('.eevee-theme-yellow').removeClass('eevee-theme-yellow');
    $('.eevee-grids').addClass(this.theme);
    this.index = $('.eevee-grids').length;
    // console.log(current.templateJson)
    // if(current.tid){
    //   this.$el.find('.currentTemplate b').html(current.tid);
    //   $('[name="switch"]').bootstrapSwitch('state',true);
    //   this.conectTemplate = true;
    // }else{
    //   this.$el.find('.currentTemplate b').html("--");
    //   $('[name="switch"]').bootstrapSwitch('state',false);
    //   this.conectTemplate = false;
    // }
  }
  bindEvent(){
    let that = this;
    this.$el.find('.side-content').on('change','.baseSet input',(e)=>{
      let $tar = $(e.target);
      let v = $tar.val();
      if($tar.is('input[type=radio]')){
        let $dom = this.pageBox.find('.comp-selected .eevee-row-ele');
        if($tar.filter(':checked').val()==='right'){
          $dom.closest('.eevee-line-row-box').css('float','right');
        }else if($tar.filter(':checked').val()==='left'){
          $dom.closest('.eevee-line-row-box').css('float','none');
        }
        return;
      }
      if(!!v){
        let $dom = this.pageBox.find('.comp-selected .eevee-row-ele');
        // $('.click-evt').removeClass('click-evt');
        $tar.hasClass('setStyleWidth') ? $dom.width(v) : $dom.height(v);
        if(v.indexOf('%')>0 && $tar.hasClass('setStyleWidth')){
          $dom.parent().width(v);
          $dom.parent().parent().width(v);
        }
      }
    });
    this.pageBox.on('mouseover mouseout',(e)=>{
      if(!this.drag){
        return
      }
      this.mouseE = e;
      e.type === "mouseover" ?
        this.pageBox.on('mousemove',(e1)=>{
          this.dragComps(e1);
        }) :
        this.pageBox.off('mousemove');
    });
    this.pageBox.on('click',()=>{
      if(this.drag){
        this.pageBox.off('mousemove');
        this.drag = false;
        this.placeComps(this.position);
      }
    });
    this.pageBox.on('scroll',()=>{
      this.scroll={
        x:this.pageBox.scrollLeft(),
        y:this.pageBox.scrollTop()
      }
    });
    this.$el.on('click','.side-content .compsSet a',(e)=>{
      !this.drag && this.addAllComp(e);
    });
    this.$el.find('.ZCY-eevee-page-body').on('click','.closeReview',()=>{
      this.$el.find('.ZCY-eevee-page-controller-content').removeClass('hide');
      this.$el.find('.review').html('').addClass('hide');
    });
    this.$el.on('click','.side-content .compsSet li.showmore',(e)=>{
      
      if(!this.drag){
        this.$el.find('.side-content').find(e.currentTarget).toggleClass('active');
      }
      e.preventDefault();
      e.stopPropagation();
      
    });
    this.$el.on('click','.saveCfgForm',(e)=>{
      let type = $(e.target).hasClass('all') ? 'all' : 'base';
      this.saveCfgForm(type);
    });
    //组件hover事件
    this.$el.on('mouseover mouseout','.eevee-grids .eevee-line-row .eevee-row-ele',(e)=>{
      if(this.drag){
        return
      }
      if (e.type === "mouseover") {
        this.mouseover(e)
      } else if (e.type === "mouseout") {
        this.mouseout(e)
      }
      e.preventDefault();
      e.stopPropagation();
    });
    // //边框hover事件
    // this.$el.on('mouseover mouseout','.eevee-grids,.eevee-col-row',(e)=>{
    //   let $tar = $(e.target);
    //   if (e.type == "mouseover") {
    //     $tar.addClass('hover-evt');
    //   } else if (e.type == "mouseout") {
    //     $tar.removeClass('hover-evt');
    //   }
    // });
    // //边框点击事件
    this.$el.on('click','.eevee-grids .controller-mask',(e)=>{
      let cls = $(e.target);
      if(cls.hasClass('delComp')){
         this.deleComp();
      }else if(cls.hasClass('setStyle')){
        this.setStyle();
      }else if(cls.hasClass('editMask')){
        this.modalEdit(e);
      }else{
        this.clickEvent(e);
        this.setBorder();
        this.resetStyleLine();
      }
      e.preventDefault();
      e.stopPropagation();
    });

    //点击组件进行设置
    // this.$el.on('click','.eevee-col-box',(e)=>{
    //   this.index = $(e.target).closest('.eevee-grids').data('index');
    //   this.name = $(e.currentTarget).data('name');
    //   this.clickEvent(e);
    // });
    // 点击组件进行设置
    this.$el.on('click','.choose-line',(e)=>{
      let $p = $(e.target).parent();
      if($p.hasClass('boder-evt'))return;
      let $pageSet = this.$el.find('.side-content');
      this.$el.find('.boder-evt').removeClass('boder-evt');
      this.$el.find('.comp-selected').removeClass('comp-selected');
      $p.addClass('boder-evt');
      const style = $p.attr('style');
      const objs = this.changeCss(style);
      const temp = $p.data('csstheme');
      const cssData = temp ? temp.split(' ') : [];
      this.$el.find('.comps-set').html(compsetTemplates({type:'line',css:objs,cssData}));
      !this.$el.find('.menu-li .settingComps').hasClass('active') && this.$el.find('.menu-li .settingComps').trigger('click');
      e.preventDefault();
      e.stopPropagation();
    });
    //页面选择
    this.$el.on('change','.controller-main input',(e)=>{
      this.setValue(e);
    });
    this.$el.on('click','.serverSet a',(e)=>{
      let $tar = $(e.target);
      if($tar.hasClass('add-server-line')){
        const html = `
            <li>
              <input type="text" placeholder="请输入服务标识" />
              <input type="text" placeholder="请输入服务名称" />
              <a class="add-server-line">增加</a>
              <a class="del-server-line">删除</a>
            </li>`;
        $tar.closest('li').after(html);
      } else {
        $tar.closest('ul').find('li').length > 2 && $tar.closest('li').remove();
      }
      
    });
    this.$el.find('.pageSet').on('click','ul li',(e)=>{
      let $tar = $(e.target).closest('li');
      if($tar.hasClass('active')){
        return;
      }
      ZCY.utils.modal({
        title:"提示",                     //可不传，默认为“提示”,
        content:["确认切换页面？","请确认页面数据已保存"],  //内容，数组的第一项为 内容的第一行。
        type:"confirm",                 //必须 success、info、error、confirm
        confirm:function(m){      // 点击确认的callback，默认为关闭弹框
          that.$el.find('.pageSet').find('.active').removeClass('active');
          $tar.addClass('active');
          that.changePage($tar);
          m.modal('hide');
        }
      })
    });
    // this.$el.find('.pageSet').on('click','a',(e)=>{
    //   let $tar = $(e.target);
    //   if($tar.closest('li').hasClass('active')){
    //     return;
    //   }
    //   if($tar.hasClass('page-link')){
    //     ZCY.utils.modal({
    //       title:"提示",                     //可不传，默认为“提示”,
    //       content:["确认切换页面？","请确认页面数据已保存"],  //内容，数组的第一项为 内容的第一行。
    //       type:"confirm",                 //必须 success、info、error、confirm
    //       confirm:function(m){      // 点击确认的callback，默认为关闭弹框
    //         that.changePage($tar);
    //         m.modal('hide');
    //       }
    //     })
    //   }
    // });
    // this.$el.on('click','.controller-box .h1-logo img',()=>{
    //   this.$el.find('.controller-box').addClass('upaction');
    // });
    //保存、发布
    this.$el.on('click','button,a.evt',(e)=>{
      let $tar = $(e.target);
      if($tar.hasClass('js-page-release')){
        this.submit();
      }else if($tar.hasClass('js-page-save')){
        this.saveComp();
      }else if($tar.hasClass('js-page-yl')){
        this.showPage();
      }else if($tar.hasClass('js-comps-init')){
        this.showcompsInit();
      }else if($tar.hasClass('js-choose-templates')){
        if(this.template){
          this.chooseTemplate(this.template);
        }else{
          server.getTemplate().then(d=>{
            this.template = d.data;
            this.chooseTemplate(d.data);
          })
        }
      }else if ($tar.hasClass('js-page-saveTemp')) {
        ZCY.message.info('保存成功!')
      }
    });
    this.$el.on('click','.controller-tabs li',(e)=>{
      let $tar = $(e.target);
      $tar.hasClass('addLi') ? this.newRegx():this.changeTabs(e);
    });
    this.$el.on('click','.addRow',(e)=>{
      let type = $(e.target).hasClass('insideRow') ? 'inside' : 'out';
      let lx = $(e.target).hasClass('after') ? 'after' : false;
      this.addOutLine(type,lx);
    });
    this.$el.on('click','.textaline',(e)=>{
      this.addInsertRow();
    });
    this.$el.on('click','.deleLine',(e)=>{
      this.$el.find('.boder-evt').remove();
      this.resetMap();
    });
    this.$el.on('click','.savelineForm',()=>{
      let css = this.$el.find('.line-edit-box').getData() || {};
      const $tar = this.$el.find('.boder-evt');
      $tar.removeClass('eevee-theme-line-borderTop eevee-theme-line-borderBottom eevee-theme-line-background');
      let datacls = '';
      for(let pop in css){
        if(pop.indexOf("|")>-1 && css[pop] && css[pop]!=0){
          const arr = pop.split('|');
          const cls = `eevee-theme-line-${arr[0]}`;
          datacls = datacls + ' ' + cls;
          this.$el.find('.boder-evt').css(pop,'');
        } else {
          this.$el.find('.boder-evt').css(pop,css[pop]);
        }
      }
      datacls && $tar.data('csstheme',datacls);
      datacls && $tar.addClass(datacls);
    });
    //new event
    this.$el.on('click','button.js-page-show',()=>{
      this.$el.find('.comps-set').addClass('hide');
      this.$el.find('.body-content').toggleClass('body-showRight');
    });
    this.$el.on('click','button.addpage',()=>{
      this.addPage();
    });
    this.$el.find('.left-menu').on('click','ul.menu-li li',(e)=>{
      let $tar = $(e.currentTarget);
      if($tar.hasClass('active')){
        let index = $tar.index();
        let $doms = this.$el.find('.page-list-container .side-content .tabSwitch');
        $doms.addClass('hide');
        $tar.removeClass('active');
        $('.body-content').removeClass('body-showRight');
        return;
      };
      this.$el.find('.left-menu ul.menu-li li').removeClass('active');
      $tar.addClass('active');
      let index = $tar.index();
      let $doms = this.$el.find('.page-list-container .side-content .tabSwitch');
      $doms.addClass('hide');
      $doms.eq(index).removeClass('hide');
      $('.body-content').addClass('body-showRight');
    });

    this.$el.on('click','.addAllComps',(e)=>{
      this.addAllCompsModal();

    });
    $('body').on('click',()=>{
      $('body').off('.eevee');
    });
    this.$el.on('click', '.zcy-comps-init-box li .mask', (e)=>{
      this.renderCompModal(e);
    });
    
    $('[name="switch"]').bootstrapSwitch({    //初始化按钮
      onText:"绑定模板",
      offText:"自定义页面",
      onColor:"success",
      offColor:"info",
      size:"small",
      state:true,
      onSwitchChange:function(event,state){
        that.conectTemplate = state;
      }
    });
  }
  changeCss(str){
    const result = {};
    if(!str){
      return {};
    }
    const arr = str.split(';');
    $.each(arr,(i,item)=>{
      const temp = item.split(':');
      const key = $.trim(temp[0]);
      const v = $.trim(temp[1]);
      if(key && v){
        result[key] = v;
      }
    });
    return result;
  }
  submit(a){
    let data = this.getPageData();
    let result = {
      templateJson:data,
      id:this.templateId
    };
    if(this.pageType === 'template'){
      
      server.submitTemplate({content:JSON.stringify(result),id:Number(result.id)}).then(d=>{
            if(d.success){
              ZCY.message.info('保存模板成功');
            } else {
              ZCY.message.info(d.error);
            }
          })
    } else {
      result.id = this.pageId;
      server.submitPages(Number(result.id)).then(d=>{
        if(d.success){
          ZCY.message.info('发布页面成功');
        } else {
          ZCY.message.info(d.error);
        }
      })
      
    }
    // if (this.basecfg.type === 'template') {
    //   return result;
    // } else {
    //   result.tid = this.conectTemplate ? this.tid : '';
    //   result.link = ZCY.utils.query().link;
    //   server.submit(result).then(d=>{
    //     ZCY.utils.modal({
    //       title:"提示",                     //可不传，默认为“提示”,
    //       content:["保存成功"],  //内容，数组的第一项为 内容的第一行。
    //       type:"success",                 //必须 success、info、error、confirm
    //     })
    //   })
    // }
  }
  changePage($tar){
    let param = $tar.closest('li').data();
    param.link = ZCY.utils.query().link;
    server.getOnePages(param).then(d=>{
      let result = d.data;
      if(result.tid){
        result = this.soveData(result);
      }else {
        result = this.soveData(result,true);
      }
      this.initPage(result);
    })
    // this.pageBox.html(commonPage(data));
  }
  soveData(d,iftid){
    //非模板
    if(iftid){
      $.each(d.templateJson,(i,item)=>{
        $.each(item.comps,(j,item2)=>{
          $.each(item2.insert,(k,item3)=>{
            item3.data = this.checkRull(item3,d.page) || item3.data;
          })
        })
      });
      return d;
    }else {
      const data = this.findObj(this.template,d.tid);
      const map = this.changeMap(d.templateJson);
      $.each(data,(i,item)=>{
        $.each(item.comps,(j,item2)=>{
          $.each(item2.insert,(k,item3)=>{
            if(map[item3.comkey]){
              item3.data = this.checkRull(item3,d.page) || map[item3.comkey];
            }
          })
        })
      });
      d.templateJson = data;
      return d;
    }
    
  }
  checkRull(item,pages){
    let p = item.path;
    let page = pages;
    let disc = this.disCode;
    let link = this.link;
    let result = false;
    if(this.RULL[p]){
      $.each(this.RULL[p],(i,pop)=>{
        let rule = pop.rule;
        let parr = rule.doPage.split(',');
        if($.inArray(page,parr) > -1){
          let docode = rule.doCode || 'all';
          let dohall = rule.doHall || 'all';
          if(this.checkOneRule(docode,rule.unlessCode,disc) && this.checkOneRule(dohall,rule.unlessHall,link)){
            result = pop.data;
            return false;
          }
        }
      })
    }
    console.log(result);
    return result;
  }
  checkOneRule(rule,unrule,code){
    let result = false;
    let _unrule = unrule || '';
    let rarr = _unrule.split(',');
    if(rule === 'all'){
      result = $.inArray(code,rarr) === -1;
    }else{
      let ruleA = rule.split(',');
      result = ($.inArray(code,ruleA) > -1) && ($.inArray(code,rarr) === -1);
    }
    return result;
  }
  changeMap(d){
    const map = {};
    $.each(d,(i,item)=>{
      $.each(item.comps,(j,item2)=>{
        $.each(item2.insert,(k,item3)=>{
          map[item3.comkey] = item3.data;
        })
      })
    });
    return map;
  }
  chooseTemplate (d) {
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/eevees/templates/addTemplate",   //自定义模板路径
      title:'模板选择',
      data:d,
      cls:"zcyEvE-comps-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        let data =  $('.zcyEvE-comps-modal').getData();
        that.renderTemplatesPage(data);
        m.modal('hide');
        $('.zcyEvE-comps-modal').remove();
        $('.modal-backdrop').remove();
      },
      afterRander:function(m,target){                 //弹出框渲染成功后的callback
        let $tar = $('.zcyEvE-comps-modal');
        $tar.find('select').selectric();
        $tar.find('.radio-choose').on('change',()=>{
          let check = $tar.find('.radio-choose').filter(':checked').val();
          if(check === 'input'){
            $tar.find('.line2').removeClass('hide');
            $tar.find('.line3').addClass('hide');
          }else {
            $tar.find('.line3').removeClass('hide');
            $tar.find('.line2').addClass('hide');
          }
        });
        $tar.find('.chooseGroup').on('change',(e)=>{
          let v = $(e.target).find('option:selected').data('child') || [];
          $tar.find('.choosetemplates').html(options(v));
          $tar.find('select').selectric();
        })
      }
    });
  }
  renderTemplatesPage(d){
    this.tid = d.chooseType === 'input' ? d.tid : d.coms;
    const data = this.findObj(this.template,this.tid);
    this.pageBox.html(commonPage(data));
    this.$el.find('.currentTemplate b').html(this.tid)
  }
  findObj(d,id){
    let result = [];
    const arr = id.split('|');
    $.each(d,(i,item)=>{
      if(item.groupID === arr[0]){
        $.each(item.children,(j,_item)=>{
          if(_item.page === id){
            result = _item.templateJson;
            return false;
          }
        });
        return false
      }
    });
    return result;
  }
  renderCompModal (e) {
    let $tar = $('.zcy-comps-init-box');
    const $dom = $(e.target);
    $tar.find('.active').removeClass('active');
    $dom.addClass('active');
    let that = this;
    const result = this.clickCompEvent($dom);
    result.path = $dom.data('compath');
    server.findOneRule({path:result.path}).then((d)=>{
      result.ruleList = d.data || [];
      ZCY.utils.modal({
        button:["取消","确认"], //按钮文案
        templateUrl:"zcyEvE/controller/templates/setCompsInit",   //自定义模板路径
        data:result,
        title:'之间作用域配置',
        cls:"zcyEvE-comps-modal",                                 // 自定义class
        confirm:function(m){                             //确认的callback
          that.saveCompInit();
          m.modal('hide');
          $('.zcyEvE-comps-modal').remove();
          $('.modal-backdrop').remove();
        },
        afterRander:function(m,target){                 //弹出框渲染成功后的callback
          $('.zcyEvE-comps-modal').find('.editor-config-parts').html(ruleModalTemp(result.data));
          that.bindModalEvent();
          that.bindFnEvent('',$('.zcyEvE-comps-modal'),result.path);
        }
      });
    });
  }
  saveCompInit() {
    const $modal = $('.zcyEvE-comps-modal');
    const arr = {
      path: $modal.find('.base-modal').data('path'),
      rule: []
    };
    $modal.find('.docomps-line').each((index,item)=>{
      const obj = {};
      obj.rule = $(item).data('value');
      obj.data = $(item).data('keys');
      arr.rule.push(obj);
    });
    server.saveRule(arr).then(d=>{
      console.log(d)
    })
  }
  bindModalEvent(){
    
    const $modal = $('.zcyEvE-comps-modal');
    $modal.on('click', '.docomps-line a', (e)=>{
       let $tar = $(e.target);
       if($tar.hasClass('docomps-addRule')) {
         let temp = `<li class="docomps-line">
          <label>
            <span>生效区划：</span><input name="doCode" />
          </label>
          <label>
            <span>例外区划：</span><input name="unlessCode" />
          </label>
          <label>
            <span>生效大厅：</span><input name="doHall" />
          </label>
          <label>
            <span>例外大厅：</span><input name="unlessHall" />
          </label>
          <label>
            <span>生效页面：</span><input name="doPage" />
          </label>
          <a class="docomps-addRule">增加规则</a>
          <a class="docomps-delRule">删除规则</a>
          <a class="docomps-saveRule">保存规则</a>
          <a class="docomps-viewRule">查看配置</a>
        </li>`;
         $tar.closest('li').after(temp);
       }else if($tar.hasClass('docomps-delRule')) {
         if($tar.find('li.docomps-line').length > 1) {
           //TODO ajax
           $tar.closest('li').remove()
         }
       }else if ($tar.hasClass('docomps-saveRule')){
         $modal.find('.dataform').find('.dogetfn').trigger('get');
         const rule = $tar.closest('li').getData();
         const data = $modal.find('.dataform').getData({
           ignore:'ignorename'
         });
         if(!!$modal.find('.dataform').find('.compset-addBox')){
           const addbox = $modal.find('.dataform').find('.compset-addBox-content').getData();
           data.connectData = addbox;
         }
         $tar.closest('li').data('value',rule);
         $tar.closest('li').data('keys',data);
       } else if($tar.hasClass('docomps-viewRule')){
         //TODO2
         const newdata = $tar.closest('li').data('data') || {};
         const path = $modal.find('.base-modal').data('path');
         const cfg = require(`${path}/config`);
         let temp = this.changData(cfg.data,newdata);
         $modal.find('.editor-config-parts').html(ruleModalTemp(temp));
         if(newdata.connectData){
           temp = this.renderAddBoxData(path,newdata.connectData);
           $('.zcyEvE-comps-modal').find('.dataform').find('.compset-addBox-content').html(compElE(temp));
         }
         this.bindFnEvent('',$('.zcyEvE-comps-modal'),path);
       }
    })
  }
  showPage(){
    let data = this.getPageData();
    let html = reviewPage(data);
    this.$el.find('.ZCY-eevee-page-controller-content').addClass('hide');
    this.$el.find('.review').html(html).removeClass('hide');
  }
  showcompsInit(){
    let cfg = this.config.comp;
    let html = compinitPage(cfg);
    this.$el.find('.ZCY-eevee-page-controller-content').addClass('hide');
    this.$el.find('.review').html(html).removeClass('hide');
  }
  getPageData(){
    let $line = this.pageBox.find('.eevee-grids');
    let result = [];
    let time = new Date().getTime();
    
    $.each($line,(i,that)=>{
      let $that = $(that);
      let type = $(that).hasClass('eevee-col-box') ? 'cen':'col';
      let obj = {
         type:type,
        'comps':[],
        'css':$(that).attr('style'),
        theme: this.theme,
        lineCss: $(that).data('csstheme')
      };
      if($that.find('.eevee-insert-row').length > 0){
        obj.childCss = $that.find('.eevee-insert-row').attr('style');
        obj.cls = $that.find('.eevee-insert-row').hasClass('eevee-insert-center') ? 'eevee-insert-center' : '';
      }
      if(!!$that.find('.eevee-line-row-box').length){
        let $dom = $that.find('.eevee-line-row-box');
        $.each($dom,(j,_that)=>{
          let _$that = $(_that);
          let box = {
          
          };
          let css = _$that.attr('style');
          box.css = css;
          box.insert = [];
          let _$ele = _$that.find('.eevee-line-row');
          $.each(_$ele,(k,ele)=>{
            let $ele = $(ele);
            time+=100;
            let comkey = $ele.children('.eevee-row-ele').data('comkey') || `cid_${time}`;
            let css = $ele.children('.eevee-row-ele').attr('style');
            
            
            // let theme = $ele.children('.eevee-row-ele').data('theme');
            
            let data = $ele.children('.eevee-row-ele').data('json')||{};
            let path = $ele.data('compath');
            box.insert.push({
              css,data,path,comkey
            })
          });
          obj.comps.push(box);
        });
        result.push(obj);
      }
    });
    return result;
  }
  setBorder(){
    let $dom = this.pageBox.find('.comp-selected .eevee-row-ele');
    $dom.find('.border-line').length === 0 &&
        $dom.append(`
                      <div class="style-width-line border-line"></div>
                      <div class="style-height-line border-line"></div>
        `);
    $dom.find('.border-line').length === 0 && this.bindRresizeEvent();
    this.resetBorderLine()
  }
  bindRresizeEvent(){
    let $dom = this.pageBox.find('.comp-selected').find('.eevee-row-ele .border-line');
    let x,y,type,w,h;
    $dom.on('mousedown.eeveeborder',(e)=>{
      x = e.clientX;
      y = e.clientY;
      w = $dom.width();
      h = $dom.height();
      let $e = $(e.target);
      type = $e.hasClass('style-width-line') ? 'width' : 'height';
      $dom.on('mousemove.eeveeborder',(e1)=>{
        let x1 = e1.clientX,
            y1 = e1.clientY;
        if(type ==='width'){
          $dom.css('width',w+(x1-x));
        }else{
          $dom.css('height',h+(y1-y));
        }
        e.preventDefault();
        e.stopPropagation();
      })
    }).on('mouseup.eeveeborder',()=>{
      $dom.off('mousemove.eeveeborder');
    })
  
  }
  resetBorderLine(){
    let $dom = this.pageBox.find('.comp-selected').find('.eevee-row-ele');
    let w = $dom.width();
    let h = $dom.height();
    
  }
  resetStyleLine(){
    let $dom = this.pageBox.find('.comp-selected').find('.eevee-row-ele');
    $dom.find('.style-line').length === 0 &&
        $dom.append(`<div class="style-left-line style-line"></div><div class="style-top-line style-line"></div>`);
    let l = $dom.css('marginLeft').replace('px','')-0;
    let t = $dom.css('marginTop').replace('px','')-0;
    let w = $dom.width();
    let h = $dom.height();
    $dom.find('.style-left-line').css({
      'top':h/2-21,
      'left':`${-1*l}px`,
      'width':l
    }).html(l);
    $dom.find('.style-top-line').css({
      'top':`${-1*t}px`,
      'left':w/2,
      'height':t,
      'line-height':`${t}px`
    }).html(t);
  }
  getWhtchLine(p){
    if(!this.lineArr.length){
      return false;
    }
    let result = false;
    let arr = this.lineArr.slice();
    arr.forEach((v,i)=>{
      let h = v+this.scroll.y;
      let cls = this.lineMap[`key${this.lineArr[i]}`];
      let e = (this.lineArr[i+1]+this.scroll.y) || (this.lineArr[i]+$(cls).height()+1);
      if((p.y-h>0||p.y-h===0) && (p.y-e <0||p.y-e ===0)){
        result = cls;
        return false;
      }
    });
    return result;
  }
  getWhtchRow(p,cls){
    let $tar = $(cls);
    let cfg = {};
    let dom =$tar.find('.eevee-line-row-box');
    if(dom.length===0){
      // $tar.append(`<div class="eevee-line-row-box eevee-line-row-box0"></div>`)
      // cfg.tar = $tar.find('.eevee-line-row-box0');
      // cfg.type='append';
      cfg.type ='noBox';
      cfg.tar = $tar;
    }else{
      let result = false;
      let w = $tar.width;
      $.each(dom,(i,v)=>{
        let e = $(v).width()+$(v).offset().left-offsetLeft+this.scroll.x;
        if(p.x>e && i+2<=dom.length){
          return true
        }
        if(p.x>$(v).offset().left && p.x<e){
          cfg.type ='after';
          cfg.tar = $(v);
          return false;
        }
        cfg.type ='noBox';
        cfg.tar = $tar;
      })
    }
    return cfg;
  }
  reContMap(){
    let arr = this.lineArr.slice();
    let obj = {};
    arr.forEach((v,i)=>{
      let cls = this.lineMap[`key${v}`];
      let num = $(cls).offset().top-51;
      this.lineArr[i] = num;
      obj[`key${num}`] = cls;
    });
    this.lineMap = obj;
  }
  appendNewBox(cfg,p){
    let _$tar = $(cfg.tar);
    let $tar = _$tar;
    if(_$tar.find('.eevee-insert-row').length>0){
      $tar = _$tar.find('.eevee-insert-row');
    }
    let html = this.pageBox.find('.dragStart')[0].innerHTML;
    let $dom = $(`<div class="eevee-line-row-box eevee-line-row-box0">${html}</div>`);
    if(cfg.type==='after'){
      $dom = $(html);
      $tar.append($dom);
    }else{
      $tar.append($dom);
    }
    this.pageBox.find('.dragStart').remove();
    $dom.find('.eevee-row-ele').data('json',this.jsonData);
  }
  placeComps(p) {
    this.resetMap();
    let positon = p;
    
    let line = this.getWhtchLine(p);
    if(line) {
      let cfg = this.getWhtchRow(p,line);
      this.appendNewBox(cfg,p);
      this.resetMap();
      return;
    }else{
      this.pageBox.find('.dragStart').remove();
      return;
    }
    // this.$el.find('.dragStart').removeClass('dragStart');
    let $tar = this.pageBox.find('.dragStart');
    $tar.css({
      top:positon.y,
      left:positon.x
    })
  }
  dragComps(e) {
    this.position = {
      x:e.clientX+this.scroll.x-offsetLeft,
      y:e.clientY-60+this.scroll.y
    };
    this.moveComps(this.position);
    this.getDefaultDIV();
  }
  getDefaultDIV(){
    let positon = this.position;
  }
  moveComps(p) {
    let positon = p;
    let $tar = this.pageBox.find('.dragStart');
    $tar.css({
      top:positon.y,
      left:positon.x
    })
  }
  saveCfgForm(type) {
    if(type ==='base'){
      let cfg = this.$el.find('.editor-config-panel').getData();
      let $tar = this.$el.find('.click-evt');
      for(let pop in cfg) {
        if(cfg[pop]!= 0){
          $tar.css(pop,cfg[pop]);
        }
      }
    }else {
      let cfg = this.controller.renderData();
      this.renderCss(cfg._CSS_);
      let $tar = this.$el.find('.comp-selected');
      $tar.children('.eevee-row-ele').data('json',cfg);
      let path = $tar.data('compath');
      let html = Handlebars.templates[`${path}/view`];
      $tar.children('.eevee-row-ele').find('.evees-comp').replaceWith(html(cfg));
    }
  }
  addAllCompsModal(){
    let $pageSet = this.$el.find('.side-content');
    $pageSet.find('.tabSwitch').addClass('hide');
    $pageSet.find('.compsSet').removeClass('hide');
  }
  getCompAllData(p) {
    let temp = require(`${p}/config`);
    let defaultData = this.getMapData(temp);
    // let ifrule = this.checkRull({path:p},this.page) || {};
    // let data = this.changData()//$.extend({},temp.defaultParam.data);
    let result = $.extend({},defaultData);
    return result;
  }
  getMapData(obj){
    const arr = obj.data;
    let result = {};
    $.each(arr,(i,item)=>{
      if(item.type === 'table'){
        result[item.key] = item.defaultValue;
      }else{
        $.each(item.line,(_i,_item)=>{
          result[item.key] = item.defaultValue;
        })
      }
    });
    return result;
  }
  compareCompData (t,p) {
    const data1 = t;
    const rule = data1.rule;
    let result = false;
    let data = {};
    $.each(rule,(index,items)=>{
      const item = items.rule;
      if(item.doPage){
        const arr = item.doPage.split(',');
        if($.inArray(this.page,arr) > -1){
          data = items.data;
          result = true;
          return true;
        }
      }
    });
    // let _data = this.getconfigFn(p);
    // _data.data = this.compareArr(_data.data, data);
    return {
      result,
      data
    }
  }
  addAllComp(e){
    this.drag = true;
    let comp = $(e.currentTarget).data('path');
    let rootPath = this.config.basePath;
    let path = rootPath+'/'+comp+'/view';
    //TODO
    let temp = Handlebars.templates[path];
    let compData = this.getCompAllData(rootPath+'/'+comp);
    // let _result = resultData.result ? resultData.data : {};
    let positon = {
      x:e.clientX+(this.scroll.x||0)-offsetLeft,
      y:e.clientY-60+(this.scroll.y||0)
    };
    const mock = this.getMockData(rootPath+'/'+comp);
    const data = {
      _EEVEES_:compData,
      path:rootPath+'/'+comp,
      _DATA_: mock
    };
    this.pageBox.append(`<div class="dragStart hide"><div class="eevee-line-row" data-compath="${rootPath}/${comp}"><div class="eevee-row-ele" data-json="${JSON.stringify(data)}" data-type="create">${temp(data)}</div></div></div>`);
    this.jsonData = data;
    this.pageBox.find('.dragStart').css({
      top:positon.y,
      left:positon.x
    }).removeClass('hide');
    // let fn = false;
    // this.$el.find('.click-evt .eevee-col-row').append(`<div class="eevee-col-box" data-compath="${rootPath}/${d.coms}">${temp()}</div>`);
    // try{
    //   fn = require(path);
    // }catch(e){
    //   console.log(e);
    // }
    // fn && new fn($);
  }
  addOutLine(t,lx){
    
    let index = this.index++;
    let html = `<div class="eevee-clu-line eevee-grids eevee-line${index} ${this.theme}" data-index="${index}">
                  <div class="choose-line">+</div>
                  <div class="eevee-insert-row">
                  
                  </div>
                </div>`;
    if(t==='inside'){
      html = `<div class="eevee-col-box eevee-grids eevee-line${index} ${this.theme}" data-index="${index}">
                <div class="choose-line">+</div>
              </div>`
    }
    let $tar = this.$el.find('.click-evt');
    if(!!$tar.length){
      this.$el.find('.click-evt').after(html);
    }else{
      lx ? this.$el.find('.boder-evt').after(html):this.pageBox.append(html);
    }
    this.resetMap();
  }
  addInsertRow(){
    const $tar = this.$el.find('.boder-evt').find('.eevee-insert-row');
    $tar.length > 0 && $tar.toggleClass('eevee-insert-center');
  }
  resetMap(){
    let $dom = this.pageBox.find('.eevee-grids');
    $.each($dom,(i,v)=>{
      let num = $(v).offset().top;
      this.lineArr.push(num-51);
      let index = $(v).data('index');
      this.lineMap[`key${num-51}`] = `.eevee-line${index}`;
    });
    this.index = $dom.length;
  }
  addPage(){
    let that = this;
    let cfg = this.config.page;//changepageTemplates
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/controller/templates/changePage",   //自定义模板路径
      data:cfg,
      title:'新增页面',
      cls:"zcyEvE-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        that.$el.find('.pageSet').find('.active').removeClass('active');
        let param = $('.zcyEvE-modal').find('table').getData({});
        that.addlink(param);
        m.modal('hide');
      },afterRander:function(m,target){                 //弹出框渲染成功后的callback
        $('.zcyEvE-modal').find('select').selectric();
      }
    });

  }
  addlink(param){
    let li = `<li class="show-title active" data-page="${param.href}" data-pagename="${param.pagename}">
      <div class="page-title">${param.pagename}</div>
      <div>
        <a class="page-link">${param.href}</a>
        <a class="delete-page">x</a>
      </div>
    </li>`;
    this.$el.find('.side-content .pageSet ul').append(li);

    this.showTemplate(param);
  }
  showTemplate(d){
    let param = {
      page:d.href,
      pageName:d.pagename,
      templateJson:[]
    };
    this.initPage(param);
  }

  renderHall(){
    this.$el.find('.side-content .pageSet').html(rightPart());
  }
  addLi(){
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/controller/templates/changeRegx",   //自定义模板路径
      title:'大厅配置',
      cls:"zcyEvE-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        let param = $('.zcyEvE-modal').find('table').getData({});
        that.changeRegx(param);
        m.modal('hide');
      },afterRander:function(m,target){                 //弹出框渲染成功后的callback
        $('.zcyEvE-modal').find('select').selectric();
      }
    })
  }


  changeTabs(e){
    let $tar = $(e.target);
    if($tar.hasClass('active'))return;
  }
  newRegx(){
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/controller/templates/changeRegx",   //自定义模板路径
      title:'区划配置',
      cls:"zcyEvE-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        let val = $('.zcyEvE-modal').find('input[name=newregx]').val();
        if(val){
          that.changeRegx(val)
        }
        m.modal('hide');
      },afterRander:function(m,target){                 //弹出框渲染成功后的callback
        $('.zcyEvE-modal').find('select').selectric();
      }
    })
  }
  changeRegx(v){
    let litemp = `<li class="active">${v.hallname}</li>`;
    this.$el.find('.addLi').before(litemp);
  }
  repComp(){
    let $tar = this.$el.find('.comp-selected');
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/controller/templates/changeComp",   //自定义模板路径
      data:that.cfg.comp, //自定义模板的数据，
      title:'组件列表',
      cls:"zcyEvE-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        let key = $('.zcyEvE-modal').find('select option:selected').html();
        let param = eevee.createHtml({name:key});
        that.$el.find('.comp-selected').replaceWith(param.content());
        m.modal('hide');
      },
      afterRander:function(m,target){                 //弹出框渲染成功后的callback
        $('.zcyEvE-modal').find('select').selectric();
      }
    })

  }
  deleComp(){
    let $tar = this.$el.find('.comp-selected');
    if($tar.parent().children().length ===1){
      $tar.parent().remove();
    }else{
      $tar.remove();
    }
    this.resetMap();
    this.$el.find('.side-content').find('.comps-set').empty();
  }
  setStyle(){
    let $parent = this.$el.find('.comp-selected');//.addClass('settingStyle');
    let $tar = $parent.find('.eevee-row-ele');
    let m = `${$tar.css('marginTop')} ${$tar.css('marginBottom')} ${$tar.css('marginLeft')} ${$tar.css('marginRight')}`;
    
    $('body').on('keydown.eevee',(e)=>{
      let key = e.which;
      console.log(key);
      e.preventDefault();
      e.stopPropagation();
      if(key===38){
        let t = $tar.css('marginTop').replace('px','');
        t = Number(t)===0 ? 0 : Number(t)-1;
        $tar.css('marginTop',t);
      }else if(key===40){
        let t = $tar.css('marginTop').replace('px','');
        t = Number(t)+1;
        $tar.css('marginTop',t);
      }else if(key===37){
        let t = $tar.css('marginLeft').replace('px','');
        t = Number(t)===0 ? 0 : Number(t)-1;
        $tar.css('marginLeft',t);
      }else if(key===39){
        let t = $tar.css('marginLeft').replace('px','');
        t = Number(t)+1;
        $tar.css('marginLeft',t);
      }else if(key===27){//退出
        $tar.css('margin',m);
        $('body').off('keydown.eevee');
      }else if(key===13){//确认
        $('body').off('keydown.eevee');
      }
      this.resetStyleLine();
    })
  }
  saveComp(){
    let obj = this.tempjson[this.index].insert.comps;
    let saveData = this.getSaveData();
    $.each(obj,(i,v)=>{
      if(v.name === this.name){
        v.css = saveData.css;
        v.data = saveData.data;
      }
    });
    console.log(this.tempjson);
  }
  getSaveData(){
    let $tar = this.$el.find('.comps-set');
    let $css = $tar.find('form.cssform').find('.setdom');
    let $data = $tar.find('form.dataform').find('.setdom');
    let cssData = this.getCompsCommonData($css);
    let commonData = this.getCompsCommonData($data);
    return {
      css:cssData,
      data:commonData
    }
  }
  getCompsCommonData($dom){
    let result = {};
    $.each($dom,(i,v)=>{
      let key = $(v).attr('name');
      if($(v).is('input[type=text]')){
        result[key] = $(v).val();
      }else if($(v).is('input[type=radio]')){
        $(v).is(':checked') && (result[key] = $(v).val());
      }
    });
    return result
  }
  mouseover(e){
    let $tar = $(e.currentTarget);
    $tar.addClass('hover-evt');
    $tar.find('.controller-mask').length === 0 ? $tar.append(mask()) : $tar.find('.controller-mask').removeClass('disnone');
  }
  mouseout(e){
    let $tar = $(e.currentTarget);
    $tar.find('.controller-mask').addClass('disnone');
  }
  modalEdit(e){
    $('.zcyEvE-comps-edit-modal').remove();
    $('.modal-backdrop').remove();
    this.controller = null;
    const compsPath = this.compath;
    const that = this;
    let $tar = $(e.currentTarget).closest('.eevee-line-row');
    const $ele = $(e.currentTarget).closest('.eevee-row-ele');
    let newdata = $(e.currentTarget).closest('.eevee-row-ele').data('json')||{};
    let result = this.clickCompEvent($tar);
    const csstemp = {
      width: $ele.css('width'),
      height: $ele.css('height'),
    };
    newdata._CSS_ = $.extend({},csstemp,newdata._CSS_);
    const attr = $(e.currentTarget).closest('.eevee-row-ele').data();
    const d = attr.type === 'create' ? null : newdata._EEVEES_;
    const cs = attr.type === 'create' ? null : newdata._CSS_;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/utils/view",   //自定义模板路径
      title:'配置选择',
      data:{
        compsPath
      },
      cls:"zcyEvE-comps-edit-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        // let data =  $('.zcyEvE-comps-edit-modal').getData();
        // that.renderTemplatesPage(data);
        // m.modal('hide');
        that.saveCfgForm('all');
        $ele.data('type','');
        $('.zcyEvE-comps-edit-modal').remove();
        $('.modal-backdrop').remove();
      },
      afterRander:function(m,target){                 //弹出框渲染成功后的callback
        const controller = require('zcyEvE/utils/view');
        that.controller = new controller($('.ZCY-eevee-comps-main'),attr,that.pageType);
      },
      cancel: function(){
        $('.zcyEvE-comps-edit-modal').remove();
        $('.modal-backdrop').remove();
      }
    });
  }
  renderCss(d){
    if(!d)return;
    let $dom = this.pageBox.find('.comp-selected').find('.eevee-row-ele');
    let style = $dom.attr('style')||'';
    let css = '';
    const cssmap = this.changeCss(style)||{};
    const result = $.extend({},cssmap,d||{});
    for(let pop in result) {
      let str = `${pop}:${d[pop]};`;
      css += str;
    }
    if(result.width == '100%'){
      $dom.parent().css('width','100%');
      $dom.parent().parent().css('width','100%');
    }
    $dom.attr('style',css);
  }
  clickEvent(e){
    let $tar = $(e.currentTarget).closest('.eevee-line-row');
    // $('.click-evt').removeClass('click-evt');
    this.pageBox.find('.comp-selected').removeClass('comp-selected');
    this.$el.find('.boder-evt').removeClass('boder-evt');
    if($tar.length>0){
      this.compath = $tar.data('compath');
      // let result = this.clickCompEvent($tar);
      // let newdata = $(e.currentTarget).closest('.eevee-row-ele').data('json');
      // if(typeof newdata === 'String'){
      //   newdata = JSON.parse(newdata);
      // }
      // result.data = this.changData(result.data,newdata);
      // result.comkey = $(e.currentTarget).closest('.eevee-row-ele').data('comkey');
      // console.log(result);
      // this.$el.find('.comps-set').html(compsetTemplates(result));
      $tar.addClass('comp-selected');
      // this.bindFnEvent($tar.data('compath'));
      // if(newdata.connectData){
      //   const _result = this.renderAddBoxData($tar.data('compath'),newdata.connectData);
      //   this.$el.find('.comps-set .dataform').find('.compset-addBox-content').html(compElE(_result));
      //   this.bindUpload(this.$el.find('.comps-set .dataform').find('.compset-addBox-content'));
      // }
      // console.log(newdata);
    }else{
      // this.$el.find('.comps-set').html(compsetTemplates({type:'line'}));
      $tar.addClass('click-evt');
    }
    // let $pageSet = this.$el.find('.side-content');
    // $pageSet.find('.tabSwitch').addClass('hide');
    // $pageSet.find('.comps-set').removeClass('hide');
    
    this.current = $tar;

    e.preventDefault();
    e.stopPropagation();
    //let path = $tar.data('compPath');

    //let config = require(`${path}/config`);
    //if(!config) return;
    //let data = eevee.getConfig(config.defaultParam);
    //this.$el.find('.controller-main').html(part(data));
  }
  bindFnEvent(p,nt,np){
    const $tar = nt ? nt : this.$el.find('.comps-set .dataform');
    let temp = np ? require(`${np}/config`) : require(`${p}/config`);
    let config = $.extend({},temp);
    if(!config) return {};
    const result = config.data;
    $.each(result,(i,item)=>{
      let $dom = $tar.find(`[name=${item.name}]`);
      if(!$dom.length)return true;
      if(item.get && typeof item.get === 'function'){
        $dom.addClass('dogetfn');
        $dom.off('get').on('get',()=>{
          const v = item.get($dom,$tar);
          $dom.data('getv',v);
        })
      }
    });
    $tar.find('.compset-addBox').off('.eeveeaddline').on('change.eeveeaddline',(e)=>{
      let $that = $(e.target);
      let len = isNaN($that.val()) ? 0 : parseInt($that.val());
      let arr = [];
      let obj = $that.data('connect');
      for(let i=0;i<len;i++){
        let temp = {};
        $.each(obj,(index,item)=>{
          temp = $.extend({},item);
          temp.key = ((temp.name).split('@'))[0];
          temp.name = (temp.name).replace('@index',i+1);
          temp.label = (temp.label).replace('@index',i+1);
          temp.description = (temp.description).replace('@index',i+1);
          temp.index = i;
          arr.push(temp);
        })
      }
      $that.closest('label').next('.compset-addBox-content').html(compElE(arr));
      this.bindUpload($that.closest('label').next('.compset-addBox-content'));
    });
    this.bindUpload($tar);
  }
  bindUpload($tar){
    $tar.find('.upload-box').uploadImage({bizCode: bizcode, maxSize: maxSize});
  }
  renderAddBoxData(p,d){
    let tempCfg = require(`${p}/config`);
    let config = $.extend({},tempCfg);
    if(!config) return {};
    const _cfg = config.defaultParam.data;
    const cfg = this.getObjByKey(_cfg,'connect');
    let arr = [];
    $.each(d,(index, item)=>{
      let obj = $.extend({},item);
      $.each(cfg.connect,(_index,_item)=>{
        let temp = {};
        temp = $.extend({},_item);
        temp.index = index;
        temp.key = ((temp.name).split('@'))[0];
        temp.name = (temp.name).replace('@index',index+1);
        temp.label = (temp.label).replace('@index',index+1);
        temp.description = (temp.description).replace('@index',index+1);
        if(obj[temp.key]){
          temp.defaultValue = obj[temp.key];
        }
        arr.push(temp);
      })
    });
    return arr;
  }
  getObjByKey(obj,key) {
    let result = {};
    $.each(obj, (i,item) => {
      if(item[key]){
        result = item;
        return false;
      }
    });
    return result;
  }
  changData(o,n){
    if(!n){
      return o;
    }
    let arr = [];
    $.each(o,(i,item)=>{
      let obj = item;
      let keys = item.name;
      if(n[keys]){
        obj.defaultValue = n[keys];
      }
      if(o.set){
      
      }
      arr.push(obj);
    });
    return arr;
  }
  getconfigFn (p) {
    let path = p;
    let temp = require(`${path}/config`);
    let config = $.extend({},temp);
    if(!config) return {};
    let result = eevee.getConfig(config);
    let cssobj = {};
    let dataobj = {};
    let defaultobj = {};
    defaultobj.css = this.compareArr(result.css,cssobj);
    defaultobj.data = this.compareArr(result.data,dataobj);
    return defaultobj;
  }
  clickCompEvent (t){
    let $tar = t;
    let path = $tar.data('compath');

    let temp = require(`${path}/config`);
    let config = $.extend({},temp);
    if(!config) return {};
    let result = eevee.getConfig(config);
    let param = {
      'width': t.width(),
      'height': t.height()
    };
    let json = $tar.data('json') || {};
    let cssobj = json.css || {};
    let dataobj = json.data || {};
    let defaultobj = {};
    defaultobj.css = this.compareArr(result.css,cssobj);
    defaultobj.data = this.compareArr(result.data,dataobj);
    return $.extend(defaultobj,param);
  }
  changeConfig(obj){
    let result = [];
    for(let pop in obj){
      let temp = {};
      temp.name = pop;
      temp.defaultValue = obj[pop];
      result.push(temp)
    }
  }
  compareArr(arr1,obj){
    let result = [];
    $.each(arr1,(i,v)=>{
      let temp = v;
      let key = temp.name;
      if(obj[key]){
        temp.defaultValue = obj[key];
      }
      result.push(temp);
    });
    return result
  }
  setValue(e){
    let $tar = $(e.target);
    let name = $tar.attr('name');
    let value = $tar.val();
    this.current.css(name,value);
  }
  getMockData(p){
    let result = {};
    try {
      const mock = require(`zcyEvE/eevee_comps/mock`);
      result = mock[p]();
    }
    catch(err) {
    
    }
    return result;
  }
}
module.exports = EeveePageController;
