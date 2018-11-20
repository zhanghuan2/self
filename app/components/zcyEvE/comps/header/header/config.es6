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
        'name':'hotwords',
        'label':'热词',
        'description': "热词-最多7个以,分隔",
        'type': "text",
        'defaultValue':'',
        'test':'xxx',
        'get': function($tar){
          const v = $tar.val();
          if(v){
            return v.split(',');
          }else {
            return v;
          }
        },
        'set': (v)=>{
        
        }
      },{
        'name':'link1',
        'label':'商品跳转链接',
        'description': "商品搜索跳转链接",
        'type': "text",
        'defaultValue':'/search'
      },{
        'name':'link2',
        'label':'供应商跳转链接',
        'description': "供应商搜索跳转链接",
        'type': "text",
        'defaultValue':'/search2'
      }
    ]
  }
};