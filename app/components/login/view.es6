const BaseComponent = require('base/base-component');
class login extends BaseComponent{
  constructor($) {
    super({
      events: {                      //事件----自动代理绑定事件
        "click .submit": 'submit'   //绑定事件
      }
    });
  }
  init(){
  
  }
  submit(){
    let data = this.$el.find('form').getData();
    $.ajax({
      url:'/api/logincheck',
      data:JSON.stringify(data),
      contentType: 'application/json;charset=UTF-8',
      type:'POST',
      success:d=>{
        if(d.success){
          let user = data.username;
          ZCY.Cookie.set('username',user,0.5);
          let target = ZCY.utils.query().target || '/';
          location.href = target;
        }else{
          alert(d.msg);
        }
      }
    })
  }

}
module.exports = login;