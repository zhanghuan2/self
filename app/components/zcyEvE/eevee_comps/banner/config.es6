module.exports = {
  beloneTo:'image',           //组件层级，上层父元素
  description:'网站图片',      //组件描述
  name:'banner',
  /**
   * 组件样式配置项
   * */
  css:[
    '@width',
    '@height',
    '@margin'
  ],
  /**
   * 组件业务参数配置项
   * */
  data: [
    {
      type: 'table',          //展示表格样式
      key: 'imagesArr',       //存储数据的key值
      search: 'colors',       //是否显示搜索功能，且搜索字段
      thead:['图片','链接地址','背景色'],     //表格头
      tbody:[                               //表格内容
        {
          td:[                              //表格列
            {
              key:'image',                  //单个配置项保存数据的key
              type:'upload',                   //文件上传类型
              description: '设置banner图片',   //单个配置项描述
              defaultValue:''                 //默认值
            },{
              key:'href',                   //单个配置项保存数据的key
              type:'text',                   //文本类型
              description: 'xxx',
              defaultValue:'asd'
            },{
              key:'bgcolor',
              type:'color',                  //颜色选择类型，有预览功能
              description: '选择颜色',
              defaultValue:'#0099ff'
            }
          ],
          type:'addLine'
        }
      ],
      defaultValue:''
    }
  ]
};
