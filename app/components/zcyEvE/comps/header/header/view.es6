var OriginHeader = require("zcyEvE/comps/temp/view");

export default class commonHeader extends  OriginHeader {
  constructor($) {
    super($);
    this.render();
  }
  render(){
    this.$el = $('.tab-header-search');
    let that = this;
    let $forms = this.$el.find('#form-search');
    let hrefbase = $forms.data("hrefbase");
    this.$el.find(".search-tab a").on("click",function(){
      that.$el.find(".search-tab a").removeClass("active");
      $(this).addClass("active");
      if($(this).hasClass("supplier-tab")){
        that.$el.find(".search-input").attr("placeholder","输入您要搜索的供应商");
        that.$el.find(".isSupplier").val(1);
        // $forms.attr("action",hrefbase + "/pages/supplierlist");
      }else{
        that.$el.find(".search-input").attr("placeholder","输入您要搜索的商品");
        that.$el.find(".isSupplier").val(0);
        // $forms.attr("action",hrefbase + "/search");
      }
    })
  }
  searchSubmit(evt) {
    let $forms = $('#form-search');
    let searchInput = $(".search-input.active");
    if(!$.trim(searchInput.val())) {
      evt.preventDefault();
    }else{
      let link = $(".search-tab a").filter(".active");
      if(link.hasClass("supplier-tab")){
        let hrefbase = $forms.data("hrefbase");
        $forms.attr("action",hrefbase + "/pages/supplierlist");
      }
    }
  }
}