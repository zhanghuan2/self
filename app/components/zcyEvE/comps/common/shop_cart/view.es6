class ShopCart2{
  
  constructor($) {
    this.$userCartCount = $("#js-cart-count")
    ZCY.messageCenter.registerObserver('ZCY.cart.update', this, this.setCartCount, $('.js-goto-mycart'))
    this.setCartCount()
  }

  setCartCount(){
    let url =  '';
    let vm = this;
    if (!url) {
      let tags = $('.shop-cart-tags').val()||'';
      try {
        tags = JSON.parse(tags);
      } catch (e) {
        console.log(e);
      }
      if (tags && tags.blocktrade) {
        url = "/api/zcy/block/cart/count";
      } else if (tags && tags.vaccine) {
        url = "/api/zcy/carts/getVaccineCount";
      } else {
        url = "/api/zcy/carts/getNetSuperCount";
      }
    }
    $.ajax({
      url: url,
      type: "GET",
      success: function(data) {
        if (vm.$userCartCount) {
          return vm.$userCartCount.text(data || 0);
        }
      },
      error: function() {
        if (vm.$userCartCount) {
          return vm.$userCartCount.text(0);
        }
      }
    });
  }
}
module.exports = ShopCart2;
