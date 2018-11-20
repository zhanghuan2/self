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
        'name':'href',
        'label':'链接',
        'description': "点击链接地址",
        'type': "text",
        'defaultValue':''
      },{
        'name':'blank',
        'label':'是否新开页面',
        'description': "是否新开页面",
        'type': "radio",
        'options':{
          "yes": "新开页面",
          "no": "当前页面"
        },
        'defaultValue': "no"
      },
      {
        'name':'src',
        'label':'图片',
        'description': "图片上传",
        'type': "upload",
        'defaultValue':''
      }
    ]
  }
};