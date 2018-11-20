const Cookie = require("zcyEvE/tool/cookies/view")
import OriginCeiling from 'zcyEvE/tool/ceiling/view'

const locationTemplate = Handlebars.templates["zcyEvE/comps/common/ceiling/templates/location"],
      optionsTemplate = Handlebars.templates["zcyEvE/comps/common/ceiling/templates/options"]

const taxDistrictCodeArr = ['001000','981000','991000'];
const taxpoliceCodeArr = ['002500','992500']; //警备区划
const jyno_permission="http://jy.test.cai-inc.com/pages/no_permission"; //警用无权限
const jynologin_permission="http://jy.test.cai-inc.com/pages/nologin_permission"; //警用无登陆权限
const jyHostName="jy" //警用域名
class Ceiling extends OriginCeiling{

  constructor($) {
    super($)
    $('.more-options').on('mouseover', (evt) => {
      let target = $(evt.currentTarget);
      target.find('.select-box').show();
      target.find('.icon-zcy').removeClass('icon-xiangxiazhedie').addClass('icon-xiangshangzhedie');
    }).on('mouseout', (evt) => {
      let target = $(evt.currentTarget);
      target.find('.select-box').hide();
      target.find('.icon-zcy').removeClass('icon-xiangshangzhedie').addClass('icon-xiangxiazhedie');
    });
    // 警备馆域名下，默认为公安部区划
  
    if( this.isHostName(window.location.host,jyHostName)) {//判断是否是警备域名
      if(Cookie.getCookie("districtCode") != '002500'){
        let href = this.removeSubDomainForInit(window.location.host);
        Cookie.addCookie("districtCode", '002500', 0, href);
        Cookie.addCookie("districtName", '公安部装备财务局', 0, href);
        window.location.reload()
      }
      this.judgeUser()//进行权限判断
    }
  }

  static removeSubDomain(domain){
    //ip地址时不做截取
    let firstChar = domain.charAt(0);
    if(firstChar >= '0' && firstChar <= '9'){
      return domain;
    }
    let parts = domain.split('.');
    if (parts.length > 2){
      parts.splice(0,1);
      return parts.join('.');
    }
    return domain;
  }

  bindEvent () {
    this.$userRegion = $(".js-user-region-show", this.$el)
    this.$switchRegion = $(".js-switch-region", this.$el)
    super.bindEvent()
    $(document).on("click", "#js-ceiling-user-logout", evt => this.userLogout(evt))
    this.getUserRegion()
    if(taxDistrictCodeArr.indexOf(this.districtCode) !== -1){
      $('.js-seller-center-link').parents('li').hide()
    }else if(taxpoliceCodeArr.indexOf(this.districtCode) !== -1){ //警备区划
      $('.js-seller-center-link').parents('li').hide()
    }else{
      $('.js-seller-center-link').parents('li').show()
    }
    this.$switchRegion.off('click').on("click", evt => this.switchRegion(evt))
    //this.judgeUser()


    //this.$sellerCenterLink.on('click', function(evt) {
    //  return false
    //})
    //this.$sellerCenterLink.popover({
    //  trigger: 'hover',
    //  placement: 'bottom',
    //  html: true,
    //  content: '政采云平台正在迁移浙江政府采购网供应商数据，供应商入驻功能暂停。<br/>预计开放时间：2016年12月26日'
    //})
  }

  userLogout (evt) {
    $.ajax({
      type: "GET",
      url: "/api/user/logout",
      success: (data) => {
        window.location.href = data;
      }
    })
  }

  removeSubDomainForInit(domain){
    //ip地址时不做截取
    let firstChar = domain.charAt(0);
    if(firstChar >= '0' && firstChar <= '9'){
      return domain;
    }
    let parts = domain.split('.');
    if (parts.length > 2){
      parts.splice(0,1);
      return parts.join('.');
    }
    return domain;
  }

  getUserRegion () {
   // debugger
    if( window.location.host.indexOf('ctaxccgp') >= 0 ){ // 国税域名下，默认为国税区划
      let href = this.removeSubDomainForInit(window.location.host);
      if(!Cookie.getCookie("districtCode") && !Cookie.getCookie("districtName")){
        Cookie.addCookie("districtCode", '001000', 0, href);
        Cookie.addCookie("districtName", '国家税务总局', 0, href);
        window.location.reload();
      }
      else {
        this.districtCode = Cookie.getCookie("districtCode")
        this.districtName = Cookie.getCookie("districtName")
      }
    }      
    else if(this.isHostName(window.location.host,jyHostName)){//判断是否是警备域名
      let href = this.removeSubDomainForInit(window.location.host);
      if(!Cookie.getCookie("districtCode") && !Cookie.getCookie("districtName")){
        Cookie.addCookie("districtCode", '002500', 0, href);
        Cookie.addCookie("districtName", '公安部装备财务局', 0, href);
        window.location.reload();
      }
      else {
        this.districtCode = Cookie.getCookie("districtCode")
        this.districtName = Cookie.getCookie("districtName")
      }
    }
    else {
      this.districtCode = Cookie.getCookie("districtCode") || '339900'
      this.districtName = Cookie.getCookie("districtName") || "浙江省本级"
    }
  
    this.frontHref = $("#js-user-action").data("front");
    this.ctaxccgpHref = $("#js-user-action").data("ctaxccgp");
    this.policeHref = $("#js-user-action").data("police");//警备
    this.$userRegion.text(this.districtName)
    if(taxDistrictCodeArr.indexOf(this.districtCode) !== -1 && window.location.href == this.frontHref+'/'){
      window.location.href = this.ctaxccgpHref
    }
    if(taxpoliceCodeArr.indexOf(this.districtCode) !== -1 && window.location.href == this.frontHref+'/'){
      window.location.href = this.policeHref
    }
    
  }

  switchRegion () {
    let that = this;
    ZCY.utils.modal({
      button:["取消","确认"], //按钮文案
      templateUrl:"zcyEvE/comps/common/ceiling/templates/location",   //自定义模板路径
      title:'模板选择',
      data:{districtName: this.districtName},
      cls:"js-user-region-modal",                                 // 自定义class
      confirm:function(m){                             //确认的callback
        that.newswitchRegion(m)
        m.modal('hide');
        $('.js-user-region-modal').remove();
        $('.modal-backdrop').remove();
      },
      afterRander:function(m,target){                 //弹出框渲染成功后的callback
        let $userRegionModal = $(".js-user-region-modal");
        $("select").selectric();
        $(".address-select", $userRegionModal).on("change", evt => this.selectAddress(evt))
        that.selectAddress("", {level: 1})
      }
    });
  }
  newswitchRegion(m){
    this.submitRegion(m.find("form"),m)
  }
  selectAddress (e, option) {
    let $self = $(e.currentTarget),
        $selectric = $self.closest(".selectric-wrapper"),
        level = option ? option.level : $self.data("level") + 1,
        $parent = $(`.js-user-region-modal .address-select[data-level=${level - 1}] option:selected`),
        pid = $parent.length ? $parent.val() : "",
        isLeaf = $parent.length ? $parent.data("leaf") : false

    $selectric.removeClass("empty").nextAll().addClass("selectric-hide")

    if (!isLeaf) {
      let url = "/api/district/children" + (pid ? `?pid=${pid}` : "")
      $.ajax({
        url: url,
        type: "GET",
        success: (data) => {
          try {
            data = JSON.parse(data).children
          } catch (e) {

          }
          data = data ? data : []
          let $select = $(`.js-user-region-modal .address-select[data-level=${level}]`)
          $select.html(optionsTemplate({data}))
          $select.selectric("refresh")
          $select.closest(".selectric-wrapper").removeClass("selectric-hide")
        }
      })
    }
  }

  submitRegion ($form) {
    let data = $form.serializeObject(),
        href = Ceiling.removeSubDomain(window.location.host),
        $modal = $(".js-user-region-modal"),
        $select = $(".selectric-wrapper:not(.selectric-hide):last", $modal),
        $option = $("option:selected", $select),
        districtCode = $option.val()
        this.ifUser = $(".js-user-region-show").data("user");
        this.ifUserPolice = $(".js-user-region-show").data("ispolice");

    if (districtCode) {
      let districtName = districtCode ? $option.data("name") : "浙江本级",
        preDistrictCode = Cookie.getCookie("districtCode") || '',
        pathName = window.location.pathname
      Cookie.addCookie("districtCode", districtCode, 0, href)
      Cookie.addCookie("districtName", districtName, 0, href)
      // let site = $option.data('site')
      // if (site) {
      //   window.location.hostname = site
      // } else {
      //   window.location.reload()
      // }
      let origin = window.location.protocol + '//' + window.location.host;
      const isTaxHall = origin == this.ctaxccgpHref;
      const isTaxPolice = origin == this.policeHref; //警备进入到警备系统后再次在左上角选择到浙江省本级后，系统跳回系统页面
      const thisSearch = window.location.search;
     // debugger
      if (pathName == '/' || pathName == `/${preDistrictCode}`) {
        if (taxDistrictCodeArr.indexOf(districtCode) !== -1) {
          window.location.href = this.ctaxccgpHref;
        }
        else if (taxpoliceCodeArr.indexOf(districtCode) !== -1) {//警备
          if(this.ifUser){
            if(this.ifUserPolice){
              window.location.href = this.policeHref;
            }
            else{
              if(window.location.pathname !== "/pages/no_permission"){ //这里保证是切换警备下才能这样判断
                window.location.href =jyno_permission;
              }
            }
          }
          else{
            if(window.location.pathname !== "/pages/nologin_permission"){
              window.location.href =jynologin_permission;
            }
          }
        }else if(isTaxPolice && taxpoliceCodeArr.indexOf(preDistrictCode) !== -1){
          window.location.href = `${this.frontHref}/${districtCode}`
        }
         else {
          window.location.href = (isTaxHall && taxDistrictCodeArr.indexOf(preDistrictCode) !== -1) ? `${this.frontHref}/${districtCode}${thisSearch}` : `//${window.location.host}/${districtCode}${thisSearch}`
          // window.location.href = `//${window.location.host}/${districtCode}`;
        }
      }
      else {
        window.location.reload()
      }
    } else {
      $select.addClass("empty")
    }
  }

  //如果是警备域名，需要对权限进行验证
  judgeUser () {
    this.ifUser = $(".js-user-region-show").data("user");
    this.ifUserPolice = $(".js-user-region-show").data("ispolice");
    this.policeHref = $("#js-user-action").data("police");
    if (taxpoliceCodeArr.indexOf(this.districtCode) !== -1) {//警备
      if(this.ifUser){//是否登陆
        if(this.ifUserPolice){
          //没权限页面有权限后需要跳转到首页
          if(window.location.pathname == "/pages/no_permission"||window.location.pathname == "/pages/nologin_permission"){
            window.location.href =this.policeHref
          }
          return
        }
        else{//已经在没权限页面 无权限时不进行跳转
          if(window.location.pathname !== "/pages/no_permission"){
            window.location.href =jyno_permission;
          }
        }
      }
      else{
        if(window.location.pathname !== "/pages/nologin_permission"){
          window.location.href =jynologin_permission;
          
        }
      }
    }
  }

  // 获取用户信息
  fetchUserInfo () {
    let target = top.location.href
    $.ajax({
      url: "/api/user",
      type: "GET",
      success: (data) => {
        let hrefmain = this.$userAction.data("hrefmain"),
            middleHref = this.$userAction.data("middleHref"),
            supplierHref = this.$userAction.data("supplierHref");
        if (data) {
          $('.welcome-info').addClass('hide');
          this.$userName.text(data.name)
          this.$userAction.find('.hasUserInfo').show();
          $(document).on("click", "#js-ceiling-user-logout", evt => this.userLogout(evt))

          switch (data.type) {
          case 2:
            this.$sellerCenterLink.text(`商家中心`).attr("href", `${middleHref}/dashboard/todo`)
          case 0:
            this.$sellerCenterLink.text(`站点管理`).attr("href", `${hrefmain}/system/sites`)
          default:
            this.$sellerCenterLink.text(`商家入驻`)
            if (taxDistrictCodeArr.indexOf(Cookie.getCookie('districtCode'))!== -1) {
              this.$sellerCenterLink.attr("href", `${supplierHref}/supplier/register?type=tax`)
            } else {
              this.$sellerCenterLink.attr("href", `${supplierHref}/supplier/register`)
            }
          }
        } else {
          //this.$userName.text(`${Language.userCenter}`)
          this.$userAction.find('.noUserInfo').append(`<a href="${hrefmain}/login?target=${target}" class="log-in">请登录</a>`)
          this.$sellerCenterLink.text(`商家入驻`).attr("href", `${supplierHref}/supplier/register`)
        }
      },
      error: () => false
    })
  }
  //判断域名是否是警用域名
  isHostName(hostName,domainName){
    let hostArea = hostName.split('.');
    return hostArea.includes(domainName)
  }
}

module.exports = Ceiling
