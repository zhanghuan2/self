// const CustomerService = require('common/customer-service/extend');

class ServiceGuaranteeNew{
  constructor($){
    this.render($)
    
  }
  supcls(){
    this.btnSubmit = $(".btn-submit");
    this.supplierEnv = $('.env_supplier').val()
    this.$btnShopLocated = $('.btn-shop-located')
  }
  render($){
    this.supcls();
    this.init($)
    this.bindEvent();
  }
  init($){
    let $elem = $('.container-wrapper').find('.order-info');
    if($elem.length > 0){
      let len = $elem.data('orderInfo').length;
      if( len > 0 && len <=4 ){
        for(let i=0; i< 4-len; i++){
          $elem.find('ul').append(`
            <li></li>
          `);
        }
      }
      if( len > 4 && len <= 6 ){
        for(let i=0; i< 6-len; i++){
          $elem.find('ul').append(`
            <li></li>
          `);
        }
      }
    }
  }

  bindEvent () {
    const self = this
    this.btnSubmit.on("click", this.submitBtn);

    const hour = (new Date()).getHours();
    if (hour >= 6 && hour < 8) {
      $(".time-tip").text("早上好 ,");
    } else if (hour >= 8 && hour < 11) {
      $(".time-tip").text("上午好 ,");
    } else if (hour >= 11 && hour < 13) {
      $(".time-tip").text("中午好 ,");
    } else if (hour >= 13 && hour < 18) {
      $(".time-tip").text("下午好 ,");
    } else {
      $(".time-tip").text("晚上好 ,");
    }

    $('.js-kefu-service').on('click', () => {
      const uid = $('.js-kefu-service').data('uid');
      if (uid) {
        $.ajax({
          url: '/api/customer/ant/param/encipher?uid=' + uid,
          type: 'get',
          success: (resp) => {
            const data = JSON.parse(resp);
            // CustomerService.openFrame(data.cinfo, data.key);
          }
        })
      } else {
        // CustomerService.openFrame();
      }
    });

    $('.js-shop-located').on('click', () => {
      // 国税和网超合并处理
        window.location.href = $('.user-information').data('link')
    })
  }

  submitBtn () {
    const member = $(".env_member").val();
    const target = $(".env_target").val();
    const notlogin = $(".not_login").val();
    if (member && target && notlogin) {
      location.href = member + "/login?target=" + target;
    } else {
      location.href = "/login";
    }
  }
}

module.exports = ServiceGuaranteeNew