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
        'name':'moreNewsLink',
        'label':'更多资讯链接:',
        'description': "更多资讯链接",
        'type': "text",
        'defaultValue':''
      },
      {
        'name':'newsCount',
        'label':'资讯数量',
        'description': "设置资讯数量，最大 10 屏",
        'type': "addBox",
        'defaultValue':'',
        'connect':[
          {
            'name':'title@index',
            'label':'标题@index',
            'description': "设置标题",
            'type': "text",
          },
          {
            'name':'content@index',
            'label':'内容@index',
            'description': "设置内容",
            'type': "text",
          },{
            'name':'href@index',
            'label':'链接@index',
            'description': "设置资讯@index",
            'type': "text",
          }
        ]
      }
    ]
  }
};