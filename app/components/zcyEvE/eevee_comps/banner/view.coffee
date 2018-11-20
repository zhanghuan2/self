# 新轮播组件：无背景色切换
class CarouselNetsuperNew
  constructor: ($)->
    @$carousel = $(".carousel")
    @interval = parseInt(@$carousel.data("interval"))

    @bindEvent()

  bindEvent: ->
    @$carousel.carousel
      interval: @interval

  tempRender: ->
    @$carousel.carousel
      interval: @interval

module.exports = CarouselNetsuperNew
