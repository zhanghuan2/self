Cookie = require "zcyEvE/libs/cookies/view"

class Header

  _.extend @::, Cookie

  suggestTemplate = Handlebars.templates["zcyEvE/comps/header/header/templates/suggestion-list"]

  constructor: ($) ->
    @searchForm = $("#form-search")
    @searchTypeLi = $(".search-type-li")
    @searchTypeUl = $(".search-type-group")
    @searchInput = $(".search-input.active")
    @jsHotword = $(".js-hotword")
    @bindEvent()

  that = this
  bindEvent: ->
    that = this
    @searchTypeUl.on "mouseover", @searchTypeLiMouseover
    @searchTypeUl.on "mouseout", @searchTypeLiMouseout
    @searchTypeLi.on "click", @searchTypeLiClick
    @searchForm.on "submit", @searchSubmit
    @bindSuggest()
    @setType()
    # @getHotword()

  getHotword: =>
    $.ajax
      url: "/api/search/hotword/top?size=1&position=0"
      type: "GET"
      success: (data) ->
        $(".search-input").attr("placeholder", data[0].keyword) if data.length
      error: (data) ->
    if @jsHotword.length && !@getCookie("isSearch")
      $.ajax
        url: "/api/search/hotword/top?size=5&position=1"
        type: "GET"
        success: (data) =>
          @renderHotwords data
          @addCookie "isSearch", "true", 1, document.domain
        error: (data) ->
    else
      $.ajax
        url: "/api/search/hotword/random?size=5&position=1"
        type: "GET"
        success: (data) =>
          @renderHotwords data
        error: (data) ->

  renderHotwords: (data) ->
    str = ""
    _.map data, (v, i) ->
      href = if v.type then v.content else "/search?q=#{v.keyword}"
      style = ""
      _.map v.styles, (v, i) ->
        style += "bold " if !v
        style += "red " if v
      str += "<li><a class='#{style}' href='#{href}' target='_blank'>#{v.keyword}</a></li>"
    @jsHotword.html str

  setType: ->
    re = new RegExp(".*/shops.*")
    hrefbase = $("#form-search").data("hrefbase")
    url = window.location.href
    if re.test(url)
      $(".search-type-shops").addClass("active")
      $(".search-type-items").removeClass("active")
      $(".items-suggest").removeClass("active").removeAttr("name")
      $(".shops-suggest").addClass("active").hide().show().attr("name", "q")
      $(".search-type-items").before($(".search-type-shops")[0])
      $("#form-search").attr("action", hrefbase + "/shops")

  shopsSuggest: (evt)->
    hrefbase = $("#form-search").data("hrefbase")
    $(".shops-suggest").suggest
      margin: {left: 75}
      url: "/api/suggest?t=shops&q="
      dataFormat: (data)->
        data
      callback: (text)->
        action = $("#form-search").attr "action"
        if text isnt ""
          top.location.href = action + "?q=" + text

  bindSuggest: ->
    # that.itemsSuggest()
    # that.shopsSuggest()

  searchTypeLiMouseover: ->
    $(".search-type-li").css("display", "block")

  searchTypeLiMouseout: ->
    $(".search-type-li.active").siblings(".search-type-li").css("display", "none")

  searchTypeLiClick: ->
    $(@).siblings(".search-type-li").removeClass("active")
    $(@).addClass("active")
    hrefbase = $("#form-search").data("hrefbase")
    $(".search-type-li.active").siblings(".search-type-li").css("display", "none")
    activeHtml = @
    $(@).prev().before(activeHtml)
    type = parseInt($(".search-type-li.active").data("type"))
    if type is 1
      $(".items-suggest").addClass("active").show().attr("name", "q")
      $(".shops-suggest").removeClass("active").hide().removeAttr("name")
      $("#form-search").attr "action", hrefbase + "/search"
    else
      $(".shops-suggest").addClass("active").show().attr("name", "q")
      $(".items-suggest").removeClass("active").hide().removeAttr("name", "")
      $("#form-search").attr "action", hrefbase + "/shops"

  searchSubmit: (evt)->
    searchInput = $(".search-input.active")
    if !$.trim searchInput.val()
      if searchInput.attr("placeholder")
        searchInput.val (searchInput.attr("placeholder"))
      else
        evt.preventDefault()
    # else
    #   window.location = encodeURI($("#form-search").attr("action") + "?q=" + searchInput.val())

module.exports = Header
