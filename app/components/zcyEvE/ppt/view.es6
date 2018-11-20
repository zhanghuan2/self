const server = require('zcyEvE/server');
let dominlist = Handlebars.templates['zcyEvE/controller/templates/dominlist'];

class pptcontroller {
  constructor() {
   this.render()
   this.bindEvent();
  }
  render(){
    this.index = 0;
    this.body = this.$el.find('.ppt-body');
    this.getTemplate()
  }
  bindEvent(){
    $('body').on('keydown',(e)=>{
      let key = e.which;
      if(key === 37){
        if(this.index === 0) {
          return;
        }
        this.index--;
        this.getTemplate();
      }else if(key === 39){
        this.index++;
        this.getTemplate();
      }
    })
  }
  getTemplate(){
    const key = this.index;
    const temp = Handlebars.templates[`zcyEvE/ppt/templates/ppt${key}`];
    this.body.html(temp())
  }
  
}
module.exports = pptcontroller;
