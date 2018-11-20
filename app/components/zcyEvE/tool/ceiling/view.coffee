###
  吊顶组件
  author by zhanghuan
###
class Ceiling

  smallCartTemplate = Handlebars.templates["zcyEvE/comps/common/ceiling/templates/small_cart"]
  that = this

  constructor: ($) ->
    @$userName = $("#js-user-name")
    @$userAction = $("#js-user-action")
    @$userCartCount = $("#js-cart-count")
    @$sellerCenterLink = $(".js-seller-center-link")
    @$time = $("#js-time")
    @$favorite = $("#js-add-to-favorite")
    @$smallCart = $("#header-cart")
    @bindEvent()

  bindEvent: ->
    that = this
    @$favorite.on "click", @addToFavorite
    @showTime()
    @fetchUserInfo()

  #根据时间判断时段
  showTime: ->
    now = new Date()
    hour = now.getHours()
    time = switch
      when hour < 11
        "早上"
      when 11 <= hour and hour < 13
        "中午"
      when 13 <= hour and hour < 18
        "下午"
      else
        "晚上"
    @$time.html time+"好"

  #获取用户信息
  fetchUserInfo: ->
    console.log(2)

  #添加收藏
  addToFavorite: ->
    window = top.window
    document = top.document
    if window.sidebar and window.sidebar.addPanel # Mozilla Firefox Bookmark
      window.sidebar.addPanel document.title, window.location.href, ""
    else if window.external and ("AddFavorite" of window.external) # IE Favorite
      window.external.AddFavorite location.href, document.title
    else if window.opera and window.print # Opera Hotlist
      @title = document.title
    else # webkit - safari/chrome
      alert "您所使用的浏览器不支持此操作，请使用 " + ((if navigator.userAgent.toLowerCase().indexOf("mac") isnt -1 then "Command/Cmd" else "CTRL")) + " + D 进行添加"

module.exports = Ceiling
