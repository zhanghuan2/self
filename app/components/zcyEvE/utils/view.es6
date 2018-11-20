const compset = Handlebars.templates['zcyEvE/utils/templates/compSet'];
const compElE = Handlebars.templates['zcyEvE/utils/templates/compElE'];
const serverTemp = Handlebars.templates['zcyEvE/utils/templates/serverTemplate'];
const trline = Handlebars.templates['zcyEvE/utils/templates/trline'];
const server = require('zcyEvE/server');

const bizcode = 1062;
const maxSize = 20 * 1024 * 1024;
let env = 'local';
const baseCfg = require('zcyEvE/eevee_comps/config');
class maincls {
  constructor (d, data, type) {
    this.$el = $(d);
    this.orignData = data;
    this.param = data.json ? data.json._PARAMS_ : {};
    this.type = type || 'template';
    this.data = data.json ? data.json._EEVEES_ : '';
    this.cssData = data.json ? data.json._CSS_ : '';
    this.services = data.json ? data.json._SERVICES_ : [];
    this.$disTable = this.$el.find('.compsDiscode table');
    this.data2 = this.copy(this.data);
    this.cssData2 = this.copy(this.cssData);
    this.services2 = this.copy(this.services);
    this.param2 = this.copy(this.param);
    this.path = this.$el.find('.comps-box').data('path');
    this.baseCfg = '';

    this.comkey = data.comkey;
    this.serverParam = {
      comKey: this.comkey,
      pageId: ZCY.utils.query().pageId,
      siteId: ZCY.utils.query().siteId,
      comPath: this.path,
    };
    this.loadData();
  }
  isAllSiteFn () {
    let isAll = false;
    switch (this.serverParam.comPath) {
      case 'zcyEvE/eevee_comps/logo':
        isAll = true;
        break;
      case 'zcyEvE/eevee_comps/ceiling':
        isAll = true;
        break;
      case 'zcyEvE/eevee_comps/appNav':
        isAll = true;
        break;
      default:
        isAll = false;
    }
    return isAll;
  }
  loadData () {
    const path = this.$el.find('.comps-box').data('path');
    const cfg = require(`${path}/config`);
    if (this.type === 'template') {
      this.$el.find('.page-show-part').addClass('hide');
      this.init();
      this.editLine = '';
      this.bindTree();
    } else {
      let params = $.extend({}, this.serverParam);
      params.isAllSite = this.isAllSiteFn();
      server.searchAllRule(params).then(d => {
        const re = d.result;
        let hasdefault = false;
        $.each(re, (i, v) => {
          let tempresult = {
            result: JSON.parse(v.data),
            nameArr: v.distCodeName ? v.distCodeName.split(',') : [],
            codeArr: v.distCode == 0 ?   ['0'] : v.distCode.split(','),
            name: v.distCodeName,
            time: this.getDate(v.updateTime),
            id: v.id
          };
          if(v.distCode === "0"){
            hasdefault = true;
            tempresult.hasdefault = true;
            this.$disTable.find('tbody').prepend(trline(tempresult));
          } else {
            this.$disTable.find('tbody').append(trline(tempresult));
          }
        });
        this.bindTree();
        if(hasdefault){
          this.editLine = this.$disTable.find('tbody').find('tr').eq(0);
          this.editLine.find('.default-code-edit').trigger('click')
        } else {
          const data2 = {
            _EEVEES_: this.getMapData(cfg),
            _CSS_: ''
          };
          
          let tempresult = {
            result: data2,
            nameArr: [],
            codeArr: ['0'],
            name: '默认数据',
            time: this.getDate(new Date().getTime()),
            hasdefault: true
          };
          this.$disTable.find('tbody').prepend(trline(tempresult));
          this.editLine = this.$disTable.find('tbody').find('tr').eq(0);
          this.editLine.find('.default-code-edit').trigger('click')
        }
      });
    }
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
  copy (d) {
    if (!d || typeof d != 'object') {
      return d;
    } else {
      const temp = JSON.stringify(d);
      return JSON.parse(temp);
    }
  }
  init () {
    if (arguments.length != 0) {
      this.data = arguments[0]._EEVEES_;
      this.cssData = arguments[0]._CSS_;
      this.services = arguments[0]._SERVICES_ || [];
      this.param = arguments[0]._PARAMS_ || {};
    }
    this.path = this.$el.find('.comps-box').data('path');
    this.config = this.clickCompEvent(this.path);
    const data = this.changeData(this.data, this.config);
    // const newdata = this.changeData(this.data,this.config);

    const transform = baseCfg.defaultParam;
    const cssArr = [];

    data.css.forEach((item) => {
      if (typeof item === 'string') {
        cssArr.push(transform[item]);
      } else {
        cssArr.push(item);
      }
    });
    // data.css = cssArr;

    data.css = this.changeCss(this.cssData, cssArr);
    data.type = this.type;
    if(this.ifServerEmpty(this.services)){
      data.services = this.config.server;
    } else {
      data.services = this.services;
    }
    this.$el.find('.compsDo').html(compset(data));
    if (this.type === 'template') {
      this.$el.find('.self-discode-btn-add').addClass('hide');
    }
    if (data.services && data.services.length > 0) {
      this.$el.find('.compsDo').
      find('.zcy-comps-content2 .server-box').
      html(serverTemp(data));
    }
    this.$el.find('.comps-cfg').html(`${data.name}配置`);
    this.$el.find('.comps-ids').
    html(`编号：${this.orignData.comKey || new Date().getTime()}`);

    // this.$el.find('');
    this.renderIftable();
    this.bindTempEvent();
    this.bindEvent();
    this.bindUpload();
    this.bindSwitch();
    this.bindGroup();
    this.$el.find('select').selectric();
    this.renderData();
  }
  ifServerEmpty(arr){
    let result = false;
    if(!arr || arr.length === 0){
      return true
    }
    $.each(arr,(i,v)=>{
      if(v.uri && v.returnKey){
        result = false;
      }else {
        result = true;
      }
    });
    return result;
  }
  bindTree () {
    this.$el.find('.compsDo').on('click', '.tags-delete', (e) => {
      const $tar = $(e.currentTarget);
      $tar.parent().remove();
    });
    this.$el.find('.zcy-tree-cfg-tree').treeRender();
    this.$el.find('.compsDo').on('change', 'input.text-input-color', (e) => {
      const $tar = $(e.currentTarget);
      $tar.next().css('background', $tar.val());
    });
    this.$el.find('.compsDo').on('click', '.btn-insure', (e) => {
      this.renderData();
    });
    this.$el.find('.compsDo').on('click', '.addServer', (e) => {
      this.$el.find('.compsDo').
      find('.zcy-comps-content2 .server-box').
      append(serverTemp());
      this.$el.find('.compsDo').
      find('.zcy-comps-content2 .server-box').
      find('select').
      selectric();
    });

    this.$el.find('.compsDo').on('click', '.btn-cfg-form-save', (e) => {
      const result = this.renderData();
      const obj = this.$el.find('.zcy-tree-cfg-tree').treeRender('getData', {});
      if (this.cfgType === 'create') {
        const tempresult = {
          result,
          nameArr: obj.name,
          codeArr: obj.code,
          name: obj.name.join(','),
          time: this.getDate(new Date().getTime()),
        };
        const param = $.extend({}, this.serverParam);
        param.distCode = obj.code.join(',') || 0;
        param.data = JSON.stringify(result);
        param.comPath = this.path;
        param.isAllSite = this.isAllSiteFn();
        delete param._DATA_;
        server.createRule(param).then(d => {
          if (d.success) {
            tempresult.id = d.result.id;
            if(d.result.distCode == '0'){
              tempresult.hasdefault = true;
              this.$disTable.find('tbody tr').eq(0).replaceWith(trline(tempresult));
              this.setCfgType('clear', true);
            } else{
              this.$disTable.find('tbody').append(trline(tempresult));
              this.setCfgType('clear', true);
            }
            ZCY.message.info('保存成功');
          } else {
            ZCY.message.info(d.error);
          }
        });
      } else {
        const tempresult = {
          result,
          nameArr: obj.name,
          codeArr: obj.code,
          name: obj.name.join(','),
          time: this.getDate(new Date().getTime()),
        };
        const param = $.extend({}, this.serverParam);
        param.distCode = obj.code.join(',') || 0;
        param.data = JSON.stringify(result);
        if (this.type === 'template') {
          this.editLine.data('codename', obj.name);
          this.editLine.data('code', obj.code);
          this.editLine.data('result', result);
          if (this.editLine.hasClass('default-tr')) {
            this.editLine.find('td').eq(0).html('默认数据');
          } else {
            this.editLine.find('td').eq(0).html(obj.name.join(','));
          }
          const time = new Date().getTime();
          this.editLine.find('td').eq(1).html(this.getDate(time));
          this.setCfgType('clear');
        } else {
          param.id = this.editLine.data('id');
          param.comPath = this.path;
          delete param._DATA_;
          
          server.updateRule(param).then(d => {
            if (d.success) {
              this.editLine.data('codename', obj.name);
              this.editLine.data('code', obj.code);
              this.editLine.data('result', result);
              if (this.editLine.hasClass('default-tr')) {
                this.editLine.find('td').eq(0).html('默认区划');
              } else {
                this.editLine.find('td').eq(0).html(obj.name.join(','));
              }
              const time = new Date().getTime();
              this.editLine.find('td').eq(1).html(this.getDate(time));
              this.setCfgType('clear');
              ZCY.message.info('更新成功');
            } else {
              ZCY.message.info(d.error);
            }
          });
        }
      }
    });
    this.$el.find('.compsDo').on('click', '.btn-cfg-form-cancel', (e) => {
      this.setCfgType('clear');
    });
    this.$el.find('.compsDo').
    on('change', '.comps-line-ele input[type=radio]', (e) => {
      const $tar = $(e.currentTarget);
      const $p = $tar.closest('.zcy-eevees-input');
      if ($p.hasClass('hasGroupEvent')) {
        const state = $tar.parent().
        parent().
        find('input[type=radio]').
        filter(':checked').
        val();
        const keys = $p.data('keys');
        this.hideGroup(keys, Number(state));
      } else {

      }
    });
    this.$el.find('.self-discode-btn-add').on('click', () => {
      this.cfgType = 'create';
      this.setCfgType('create');
    });
    this.$disTable.on('click', 'a', (e) => {
      const $tar = $(e.currentTarget);
      this.editLine = $tar.closest('tr');
      const name = this.editLine.data('codename') || [];
      const code = this.editLine.data('code') || [];
      const data = this.editLine.data('result') || {_EEVEES_: '', _CSS_: ''};
      if (this.cfgType != null) {
        ZCY.message.info('请先保存.');
        return;
      }
      if ($tar.hasClass('default-code-edit')) {
        this.$el.find('.zcy-tree-cfg-tree').treeRender('renderData', {
          name, code,
        });
        this.init(data);
        this.editLine.addClass('comps-active');
        if(this.editLine.hasClass('default-tr') && !this.editLine.data('id')){
          this.cfgType = 'create';
          this.setCfgType('create');
        } else {
          this.cfgType = 'edit';
          this.setCfgType('edit');
        }
      } else if ($tar.hasClass('default-code-view')) {
        this.init(data);
        this.setCfgType('view');
      } else {
        const id = this.editLine.data('id');
        const pageId = this.serverParam.pageId;
        server.deleteRule({id,pageId}).then(d => {
          if(d.success){
            ZCY.message.info('删除成功！');
            this.editLine.remove();
            this.setCfgType('clear');
          }  else {
            ZCY.message.info(d.error);
          }

        });
      }
    });
  }
  setCfgType (type, ifnew) {
    if (type === 'edit') {
      if (this.editLine.hasClass('default-tr')) {
        this.$el.find('.zcy-cfg-oprate-box').removeClass('zcy-cfg-edit');
      } else {
        this.$el.find('.zcy-cfg-oprate-box').addClass('zcy-cfg-edit');
      }
      // this.editLine.find('td').eq(2).addClass('edit');
      this.$el.find('.compsDo').addClass('edit');
      const name = this.editLine.find('td').eq(0).html();
      this.$el.find('.zcy-cfg-part2 .new-discode b.action').html('修改');
      this.$el.find('.zcy-cfg-part2 .new-discode b.location').html(name + '区划');
      // this.$el.find('.compsDo .comps-config-show').addClass('comps-config-show-tram');
      // this.$el.find('.compsDo .comps-config-show').css('transform','rotateY(360deg)')
    } else if (type === 'create') {
      if (this.editLine && this.editLine.hasClass('default-tr')) {
        this.$el.find('.zcy-cfg-oprate-box').removeClass('zcy-cfg-edit');
      } else {
        this.$el.find('.zcy-cfg-oprate-box').addClass('zcy-cfg-edit');
      }
      this.$el.find('.compsDo').addClass('edit');
      this.$el.find('.zcy-cfg-part2 .new-discode b.action').html('添加');
    } else {
      this.$el.find('.zcy-cfg-oprate-box').removeClass('zcy-cfg-edit');
      // !ifnew && this.editLine.find('td').eq(2).removeClass('edit');
      this.$el.find('.compsDo').removeClass('edit');
      this.$el.find('.zcy-tree-cfg-tree').treeRender('clear', {});
      this.init({
        _EEVEES_: this.data2,
        _CSS_: this.cssData2,
        _SERVICES_: this.services2,
        _PARAMS_: this.param2,
      });
      this.$el.find('.zcy-cfg-part2 .new-discode b.action').html('添加');
      this.$el.find('.zcy-cfg-part2 .new-discode b.location').html('个性化');
      this.cfgType = null;
      this.editLine = null;
      this.$el.find('.comps-active').removeClass('comps-active')
      // this.$el.find('.compsDo .comps-config-show').css('transform','rotateY(360deg)')
    }
  }
  renderIftable () {
    const $tar = this.$el.find('.compsDo .zcy-eevees-table .btn-haschildLine');
    $.each($tar, (i, item) => {
      const json = $(item).data('defaultvalue');
      const pjson = ($(item).data('json')).children;
      if (json && json.length > 0) {
        $.each(json, (index, _item) => {
          const result = {
            children: [],
          };
          const data = this.changeEleData(pjson, _item);
          result.children = data;
          const $tr = $(item).closest('tr');
          this.addTrChild($tr, result);
        });
      }
    });
  }
  changeCss (data, cfg) {
    const result = cfg;
    if (!data) {
      return cfg;
    }
    $.each(result, (i, _item) => {
      const keys = _item.key;
      const arr = Object.keys(data);
      if ($.inArray(keys, arr) > -1) {
        _item.defaultValue = data[keys];
      }
    });
    return result;
  }
  changeEleData (line, data) {
    const result = [];
    $.each(line, (_i, _item) => {
      const keys = _item.key;
      const arr = Object.keys(data);
      if ($.inArray(keys, arr) > -1) {
        _item.defaultValue = data[keys];
      } else {
        _item.defaultValue = null;
      }
      result.push(_item);
    });
    return result;
  }
  changeData (data, cfg) {
    const result = this.copy(cfg);
    if (!data) {
      return result;
    }
    $.each(result.data, (i, item) => {
      if (item.type === 'normal') {
        $.each(item.line, (_i, _item) => {
          const keys = _item.key;
          const arr = Object.keys(data);
          if ($.inArray(keys, arr) > -1) {
            _item.defaultValue = data[keys];
          }
        });
      } else {
        const keys = item.key;
        const arr = Object.keys(data);
        const reData = $.inArray(keys, arr) > -1
          ? data[keys]
          : item.defaultValue;
        if (reData) {
          // item.tbody = [];
          const temp = [];
          $.each(reData || [], (index, _item) => {
            const tbody = $.extend(true, {}, item.tbody[0]);
            const tr = tbody.td;
            this.changeEleData(tr, _item);
            temp.push(tbody);
          });
          item.tbody = temp;
        }

      }
    });
    return result;

  }
  bindGroup () {
    const $p = this.$el.find(`.zcy-comps-content0`);
    const data = this.getDomData($p);
    const $dom = $p.find('.comps-line-group');
    $.each($dom, (i, item) => {
      const key = $(item).data('group');
      const $tar = $p.find(`.comps-line-li.comps-line-key-${key}`);
      const $v = $tar.find('.comps-line-ele .zcy-eevees-input');
      $v.addClass('hasGroupEvent');
      const da = $(item).data('groupv');
      if (da.indexOf('|') > -1) {
        const v = da.split('|')[1];
        data[key] == v ? $(item).removeClass('hide') : $(item).addClass('hide');
      } else {
        data[key] ? $(item).removeClass('hide') : $(item).addClass('hide');
      }
    });
    const $table = $p.find('.comps-table-group');
    $.each($table, (i, item) => {
      const key = $(item).data('group');
      const $tar = $p.find(`.comps-table-group.comps-line-key-${key}`);
      const $v = $tar.find('.comps-line-ele .zcy-eevees-input');
      $p.find('input[name=' + key + ']').
      parent().
      parent().
      addClass('hasGroupEvent');
      // $v.addClass('hasGroupEvent');
      const da = $(item).data('groupv');
      if (da.indexOf('|') > -1) {
        const v = da.split('|')[1];
        data[key] == v ? $(item).removeClass('hide') : $(item).addClass('hide');
      } else {
        data[key] ? $(item).removeClass('hide') : $(item).addClass('hide');
      }
    });

  }
  bindGroupSwitch ($t) {
    const $v = $t.find('.comps-line-ele .zcy-eevees-input');
    if ($v.is('div') && $v.hasClass('zcy-eevees-radio')) {
      const keys = $v.data('keys');
      $v.find('input').on('change', (e) => {
        console.log(22);
      });
    }
  }
  bindTempEvent () {
    this.$el.find('.tabs-li span').on('click', (e) => {
      const $tar = $(e.currentTarget);
      const index = $tar.data('index');
      if (!$tar.hasClass('active')) {
        this.$el.find('.tabs-li span.active').removeClass('active');
        $tar.addClass('active');
        this.$el.find('.tabs-content').addClass('hide');
        this.$el.find(`.zcy-comps-content${index}`).removeClass('hide');
      }
    });
  }
  bindEvent () {
    this.$el.find('table').
    on('click.zcy-eevees-table', '.zcy-oprate-td span', (e) => {
      const $tar = $(e.currentTarget);
      $tar.hasClass('add-tr-btn') ? this.addTrLine(e) : this.delTrline(e);
    });
    this.$el.find('.comps-box .tags-boxs a').on('click', (e) => {
      const $tar = $(e.currentTarget);
      const $p = $tar.parent();
      $tar.before('<input type="text" class="tags-boxs-input" />');
      $p.find('a').addClass('hide');
      $p.find('span').removeClass('hide');
    });
    this.$el.find('.comps-box .tags-btn-box span').on('click', (e) => {
      const $tar = $(e.currentTarget);
      const $p = $tar.closest('.tags-boxs');
      const $input = $p.find('input');
      const v = $input.val();
      $input.remove();
      if($tar.hasClass('cancel-action') || !v){
        $tar.parent().find('span').addClass('hide');
        $tar.parent().find('a').removeClass('hide');
        return;
      }
      $p.find('.tag-add-box').append(`
          <span class="tag-all-content-box">
            <span class="tags-content">${v}</span>
            <span class="tags-delete">x</span>
          </span>`);
      $tar.parent().find('span').addClass('hide');
      $tar.parent().find('a').removeClass('hide');
    });

    this.$el.find('table.zcy-eevees-table').
    on('click', '.btn-addChild', (e) => {
      const $dom = $(e.target);
      const json = $dom.data('json');
      const $tr = $dom.closest('tr');
      json.children && this.addTrChild($tr, json);
    });
    this.$el.find('table.zcy-eevees-table').on('click', '.btn-delete', (e) => {
      const $dom = $(e.target);
      const $tr = $dom.closest('tr');
      const $p = $tr.prevAll('tr').filter('.trparent').first();
      $tr.remove();
      this.resetTr($p);
    });
    this.$el.find('table.zcy-eevees-table').
    on('click', '.add-icon-point', (e) => {
      const $dom = $(e.target);
      const $tr = $dom.closest('tr');
      if ($dom.hasClass('add-icon-open')) {
        $tr.nextUntil('tr.trparent').addClass('hide');
        $dom.html('+');
      } else {
        $tr.nextUntil('tr.trparent').removeClass('hide');
        $dom.html('-');
      }
      $dom.toggleClass('add-icon-open');
    });
  }
  resetTr ($tr) {
    const len = $tr.nextUntil('tr.trparent').length;
    if (len) {
      $tr.find('.add-icon-point').removeClass('hide');
    } else {
      $tr.find('.add-icon-point').addClass('hide');
    }
  }
  addTrChild ($dom, json) {
    const $tr = $dom.closest('tr');
    const t = `
          <tr class="trchild" data-json="{{json this}}">
            {{#each this.children}}
              <td>
                {{#insert2 'zcyEvE/utils/templates/compElE'}}{{/insert2}}
              </td>
            {{/each}}
          </tr>`;
    const templates = Handlebars.compile(t);
    $tr.after(templates(json));
    this.bindUpload();
    this.bindSwitch();
    this.resetTr($tr);
  }
  getServer () {
    const $group = this.$el.find('.compsDo').
    find('.zcy-comps-content2 .server-box .server-group');
    const result = [];
    $.each($group, (i, item) => {
      const data = this.getDomData($(item));
      result.push(data);
    });
    return result;
  }
  renderData () {
    this.param = {};
    const $dom = this.$el.find('.comps-config-show .tabs-content').
    not('.zcy-comps-content2');
    const data = this.getData($dom.eq(0));//.filter(':visible')
    const obj = this.getData($dom.eq(1));//.filter(':visible')
    const server = this.getServer();
    const css = {
      _CSS_: obj._EEVEES_,
    };
    const sss = {
      _SERVICES_: server,
    };
    const ppp = {
      _PARAMS_: this.param,
    };
    const comPath = this.path;
    const result = $.extend(data, css, sss, ppp, {comPath: comPath});
    this.renderYL(result);
    return result;
  }
  renderYL (result) {
    const path = this.$el.find('.comps-box').data('path');
    const handbar = Handlebars.templates[`${path}/view`];
    this.$el.find('.comps-box .compsShow').html(handbar(result));
    const controller = require(`${path}/view`);
    new controller($);
  }
  addTrLine (e) {
    const $tr = $(e.currentTarget).closest('tr');
    const t = `
          <tr class="trparent {{#equals this.type 'addLine'}}zcy-addline-tr{{/equals}}" data-json="{{json this}}">
            {{#each this.td}}
              <td {{#equals @index 0}}style="position: relative"{{/equals}}>
                {{#equals @index 0}}<span class="add-icon-point hide add-icon-open">-</span>{{/equals}}
                {{#equals ../type 'addLine'}}
                    <input type="text" name="_zcytabletrtype_"  value="addLine" class="hide zcy-eevees-input">
                  {{/equals}}
                {{#insert2 'zcyEvE/utils/templates/compElE'}}{{/insert2}}
              </td>
            {{/each}}
            <td class="zcy-oprate-td">
              <div class="hide">
                <span class="add-tr-btn">➕</span>
                <span class="del-tr-btn">－</span>
              </div>
            </td>
          </tr>`;
    const templates = Handlebars.compile(t);
    const data = $tr.data('json');
    $tr.next('tr.trparent').length ? $tr.next('tr.trparent').
    before(templates(data)) : $tr.closest('tbody').append(templates(data));
    // $tr.next('tr.trparent').before(templates(data));
    this.bindUpload();
    this.bindSwitch();
  }
  delTrline (e) {
    const $tr = $(e.currentTarget).closest('tr');
    $tr.closest('tbody').find('tr').length > 1 && $tr.remove();
  }
  clickCompEvent (path) {
    let temp = require(`${path}/config`);
    let config = $.extend({}, temp);
    if (!config) return {};
    return config;
  }
  bindUpload ($tar) {
    const $up = this.$el.find('.upload-box').not('.uploadRended');
    $.each($up,(i,v)=>{
      $(v).uploadImage({
        bizCode: bizcode,
        maxSize: maxSize,
        downCallback: function(data,$that){
          $that.data('url',data)
        }
      });
    });
    this.$el.find('.upload-box').addClass('uploadRended');
  }
  bindSwitch () {
    const that = this;
    $('.switch-input').bootstrapSwitch({
      onSwitchChange: function (e, state) {
        const $tar = $(e.currentTarget);
        const $p = $tar.closest('.zcy-eevees-input');
        if ($p.hasClass('hasGroupEvent')) {
          const keys = $p.data('keys');
          that.hideGroup(keys, state);
        }
      },
    });
  }
  hideGroup (keys, state) {
    const $dom = this.$el.find(`.zcy-comps-content0 .comps-line-group`);
    const $group = $dom.filter(`[data-group=${keys}]`);
    $.each($group, function () {
      const groupv = $(this).data('groupv');
      if (groupv.indexOf('|') > -1) {
        const v = groupv.split('|')[1];
        state == v ? $(this).removeClass('hide') : $(this).addClass('hide');
      } else {
        state ? $(this).removeClass('hide') : $(this).addClass('hide');
      }
    });
    const $table = this.$el.find(`.zcy-comps-content0 .comps-table-group`);
    $.each($table, function () {
      const groupv = $(this).data('groupv');
      if (groupv.indexOf('|') > -1) {
        const v = groupv.split('|')[1];
        state == v ? $(this).removeClass('hide') : $(this).addClass('hide');
      } else {
        state ? $(this).removeClass('hide') : $(this).addClass('hide');
      }
    });
  }
  getData ($dom) {
    const $el = $dom.find('table.zcy-eevees-table');
    const result = {
      '_EEVEES_': {},
    };
    if ($el.length) {
      $.each($el, (i, item) => {
        const keys = $(item).data('keys');
        result._EEVEES_[keys] = this.getDataByTable($(item));
      });
    }
    const normal = this.getDomData($dom.find('.zcy-eevees-normal-div'));
    result._EEVEES_ = $.extend(result._EEVEES_, normal);
    const path = this.$el.find('.comps-box').data('path');
    const mock = this.getMockData(path);
    result._DATA_ = mock;
    return result;
  }
  getMockData (p) {
    let result = {};
    try {
      const mock = require(`zcyEvE/eevee_comps/mock`);
      result = mock[p]();
    }
    catch (err) {

    }
    return result;
  }
  getDataByTable ($table) {
    const result = [];
    const $trs = $table.find('tbody tr');
    $.each($trs, (i, v) => {
      if ($(v).hasClass('trparent')) {
        if ($(v).find('span.add-icon-point').is(':visible')) {
          const obj = this.getDomData($(v));
          obj.children = [];
          const $c = $(v).nextUntil('tr.trparent');
          $.each($c, (index, v1) => {
            const cdata = this.getDomData($(v1));
            obj.children.push(cdata);
          });
          result.push(obj);
        } else {
          const obj = this.getDomData($(v));
          result.push(obj);
        }
      }
    });
    return result;
  }
  getDomData ($dom) {
    const $el = $dom.find('.zcy-eevees-input');
    const result = {};
    $.each($el, (i, v) => {
      const $v = $(v);
      const param = {};
      const ifParam = $(v).data('isparam');
      let keys = '';
      if ($v.is('input[type=text]')) {
        keys = $v.prop('name');
        result[keys] = $v.val();
      }
      else if ($v.is('div') && $v.hasClass('zcy-eevees-radio')) {
        keys = $v.data('keys');
        result[keys] = Number($v.find('input:checked').val());
      }
      else if ($v.is('div') && $v.hasClass('zcy-eevees-tags')) {
        const $span = $v.find('span.tags-content');
        keys = $v.data('keys');
        const arr = [];
        $.each($span, (index, item) => {
          arr.push($(item).html());
        });
        result[keys] = arr;
      } else if ($v.is('div') && $v.hasClass('zcy-eevees-switch')) {
        const obj = $v.data();
        const value = $v.find('input').is(':checked');
        keys = obj.keys;
        result[keys] = value ? obj.on : obj.off;
      } else if ($v.is('select')) {
        keys = $(v).data('keys');
        result[keys] = $v.val();
      } else if ($v.is('div') && $v.hasClass('zcy-eevees-checkbox')) {
        keys = $v.data('keys');
        const $input = $('.zcy-eevees-checkbox').find('input');
        const arr = [];
        $.each($input, (index, item) => {
          if ($(item).is(':checked')) {
            arr.push($(item).val());
          }
        });
        result[keys] = arr.join(',');
      } else if($v.is('div') && $v.hasClass('upload-box')){
        keys = $v.data('keys');
        result[keys] = $v.data('uploadImage').getFiles()[0] ? $v.data('uploadImage').getFiles()[0].fileId : '';
        result[keys+'url'] = $v.data('url');
      }
      if (ifParam && this.param && keys) {
        this.param[keys] = result[keys];
      }
    });
    return result;
  }
  getDate (t) {
    const date = new Date(t);
    const y = date.getFullYear();
    const m = (date.getMonth() + 1) < 10
      ? `0${date.getMonth() + 1}`
      : (date.getMonth() + 1);
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const mi = date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes();
    const s = date.getSeconds() < 10
      ? `0${date.getSeconds()}`
      : date.getSeconds();
    return `${y}.${m}.${d}  ${h}:${mi}:${s}`;
  }
}
module.exports = maincls;
