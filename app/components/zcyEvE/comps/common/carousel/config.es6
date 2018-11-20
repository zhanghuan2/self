module.exports = {
  defaultParam:{
    css:[
      {
        'name':'background',
        'label':'背景色',
        'description': "设置组件背景色",
        'type': "text",
        'defaultValue':'#000000'
      }
    ],
    data:[
      {
        'name':'colors',
        'label':'banner颜色列表:',
        'description': "设置banner切换颜色，多个以逗号分隔，如#ccc,#fff",
        'type': "text",
        'defaultValue':''
      },
      {
        'name':'rowSize',
        'label':'banner行层级差:',
        'description': "当前组件与需要切换颜色的容器的行层级差",
        'type': "text",
        'defaultValue':''
      },
      {
        'name':'imageCount',
        'label':'轮播屏数',
        'description': "设置轮播组件的屏数，最大 10 屏",
        'type': "addBox",
        'defaultValue':'',
        'connect':[
          {
            'name':'image@index',
            'label':'图片@index',
            'description': "设置图片@index",
            'type': "upload",
          },{
            'name':'href@index',
            'label':'链接@index',
            'description': "设置图片链接@index",
            'type': "text",
          }
        ]
      }
    ]
  }
};