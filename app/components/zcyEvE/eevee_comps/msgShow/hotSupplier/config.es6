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
        'name':'whiteList',
        'label':'供应商白名单',
        'description': "供应商白名单",
        'type': "text",
        'defaultValue':''
      },{
        'name':'blackList',
        'label':'供应商黑名单',
        'description': "供应商黑名单",
        'type': "text",
        'defaultValue':''
      },{
        'name':'supplierName',
        'label':'供应商楼层名称',
        'description': "供应商楼层名称",
        'type': "text",
        'defaultValue':''
      },{
        'name':'supplierMore',
        'label':'更多链接',
        'description': "更多链接",
        'type': "text",
        'defaultValue':''
      }
    ]
  }
};