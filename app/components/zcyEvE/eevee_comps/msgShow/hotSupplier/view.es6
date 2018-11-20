class hotSupplier {
  constructor () {
    this.init();
    this.bindEvent();
  }

  init () {
    const width = $(".component-hotSupplier .supplier-list").find(".list-li")
                                                            .eq(0)
                                                            .width()
    $(".component-hotSupplier .supplier-mask").width(width - 1)
    const li = $(".component-hotSupplier .list-li");
    $.each(li, (index, t) => {
      const $target = $(t);
      const $save = $(t).find(".js-supplier-avg-save");
      $.each($save, function (i, v) {
        const arr = ($(this).val() || []).split("_");
        const name = v.name;
        const tar = parseFloat(arr[0]);
        const avg = ((parseFloat(arr[1])) / 100) || 0;
        if (tar - avg > 0) {
          $target.find("." + name).find("i").addClass("icon-jiantouxiangshang avg-up")
        } else if (tar - avg == 0) {
          $target.find("." + name).find("i").addClass("icon-shuiping avg-cp")
        } else {
          $target.find("." + name).find("i").addClass("icon-jiantouxiangxia avg-down")
        }
      })
    });
  }
  bindEvent () {
    $(".component-hotSupplier .supplier-title").on("mouseover mouseout", (event) => {
      const $parent = $(event.target).hasClass("supplier-title") ?
                            $(event.target) :
                                ($(event.target).parents(".supplier-title"));
      if (event.type == "mouseover") {
        $parent.parent().find(".supplier-mask").removeClass("hide");
        // $parent.find("img").addClass("scale");
        // $parent.find(".title-msg").addClass("scale");
      } else if (event.type == "mouseout") {
        $parent.parent().find(".supplier-mask").addClass("hide")// 鼠标离开
        // $parent.find("img").removeClass("scale");
        // $parent.find(".title-msg").removeClass("scale");
      }
    })
    $(".component-hotSupplier .supplier-link").on("mouseover mouseout", function (event) {
      const dom = $(this).find("div.link-info");
      if (event.type == "mouseover") {
        dom.removeClass("hide");
      } else if (event.type == "mouseout") {
        dom.addClass("hide")// 鼠标离开
      }
    })
    $(".component-hotSupplier .supplier-link").on("click", function () {
      const $dom = $(this).find("div.link-info");
      const _id = $dom.data("linkid");
      location.href = "/items/" + _id + "?searchType=1"
    })
    $(".component-hotSupplier .supplier-title").find(".product-image,.title-msg").on("click", function () {
      const link = $(this).parent(".supplier-title").find(".title-content a.initShop")
                                                    .attr("href");
      location.href = link;
    })
    $('.component-hotSupplier .js-add-favor').on('click', evt => this.addFavoriteShop(evt));
  }
  static followShops (shopIds, successCallback, failureCallback) {
    if (shopIds.length === 0) {
      return
    }
    $.ajax({
      url: '/api/fav-shop/follow',
      type: 'post',
      data:{'shopIds':shopIds}
    }).done((result) => {
      if(result.code == '200') {
        ZCY.utils.modal({
          title:"关注成功",                     //可不传，默认为“提示”,
          content:['可在<a href="/buyer/favorite-shops" target="_blank">我的关注</a>查看'],  //内容，数组的第一项为 内容的第一行。
          type:"success"
        });
      }
      else if(result.code == '901') {
        ZCY.utils.modal({
          title:"已关注此店铺",                     //可不传，默认为“提示”,
          content:['可在<a href="/buyer/favorite-shops" target="_blank">我的关注</a>查看'],  //内容，数组的第一项为 内容的第一行。
          type:"info"
        })
      }
      if (successCallback) {
        successCallback(result)
      }
    }).fail((error) => {
      if (failureCallback) {
        failureCallback(error)
      }
    })
  }
  addFavoriteShop (evt) {
    const shopId = $(evt.currentTarget).data('shopId');
    if (!shopId) {
      return
    }
    $(evt.currentTarget).prop('disabled', true)
    this.followShops([shopId], () => {
      $(evt.currentTarget).replaceWith('<button class="btn btn-info" style="width: 82px;" disabled>已关注</button>')
    }, ()=>{
      $(evt.currentTarget).prop('disabled', false)
    })
  }

}
module.exports = hotSupplier;
