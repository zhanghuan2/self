module.exports = {
  beloneTo:'image',           //组件层级，上层父元素
  description:'网站图片',      //组件描述
  allSite:true,
  name:'吊顶',
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
      key: 'items',       //存储数据的key值
      search: 'colors',       //是否显示搜索功能，且搜索字段
      thead:['一级标签','链接地址','操作'],     //表格头
      tbody:[                               //表格内容
        {
          td:[                              //表格列
            {
              key:'tagName',                  //单个配置项保存数据的key
              type:'text',                   //文件上传类型
              description: '设置banner图片',   //单个配置项描述
              defaultValue:''                 //默认值
            },{
              key:'href',                   //单个配置项保存数据的key
              type:'text',                   //文本类型
              description: 'xxx',
              defaultValue:''
            },{
              key:'children',                   //单个配置项保存数据的key
              type:'addChild',                   //文本类型
              name:'添加下级标签',
              description: 'xxx',
              children: [
                {
                  key:'tagName',                  //单个配置项保存数据的key
                  type:'text',                   //文件上传类型
                  description: '设置banner图片',   //单个配置项描述
                  defaultValue:''                 //默认值
                },{
                  key:'href',                   //单个配置项保存数据的key
                  type:'text',                   //文本类型
                  description: 'xxx',
                  defaultValue:''
                },{
                  type:'delete',                   //文本类型
                  defaultValue:''
                }
              ]
            }

          ],
          type:'addLine'
        },
      ],
      defaultValue: [{"_zcytabletrtype_":"addLine","tagName":"我的关注","href":"","children":[{"tagName":"我的关注店铺","href":""},{"tagName":"我的常购商品","href":""}]},{"_zcytabletrtype_":"addLine","tagName":"商家支持","href":"","children":[{"tagName":"商家帮助","href":""},{"tagName":"商家规则","href":""},{"tagName":"商家入驻","href":""}]},{"_zcytabletrtype_":"addLine","tagName":"服务大厅","href":"","children":[{"tagName":"联系我们","href":""},{"tagName":"规则中心","href":""},{"tagName":"帮助中心","href":""},{"tagName":"在线客户","href":""}]},{"_zcytabletrtype_":"addLine","tagName":"培训中心","href":"","children":[{"tagName":"在线直播入口","href":""},{"tagName":"培训授权合作伙伴","href":""},{"tagName":"培训课程","href":""}]}]
    },
    {
      type: 'normal',
      line:[
        {
          label:'其他入口',
          key: 'site',
          type: 'checkbox',
          description: '显示图片',
          defaultValue: 'districts,workspace,net',
          options:[
            {
              name: '区划切换',
              value: 'districts'
            },{
              name: '我的工作台',
              value: 'workspace'
            },{
              name: '网站导航',
              value: 'net'
            }
          ],
        }
      ]
    },
    {
      type: 'table',          //展示表格样式
      key: 'others',       //存储数据的key值
      search: 'colors',       //是否显示搜索功能，且搜索字段
      thead:['一级标签','链接地址','操作'],     //表格头
      tbody:[                               //表格内容
        {
          td:[                              //表格列
            {
              key:'tagName',                  //单个配置项保存数据的key
              type:'text',                   //文件上传类型
              description: '设置banner图片',   //单个配置项描述
              defaultValue:''                 //默认值
            },{
              key:'href',                   //单个配置项保存数据的key
              type:'text',                   //文本类型
              description: 'xxx',
              defaultValue:''
            },{
              key:'children',                   //单个配置项保存数据的key
              type:'addChild',                   //文本类型
              name:'添加下级标签',
              description: 'xxx',
              children: [
                {
                  key:'tagName',                  //单个配置项保存数据的key
                  type:'text',                   //文件上传类型
                  description: '设置banner图片',   //单个配置项描述
                  defaultValue:''                 //默认值
                },{
                  key:'href',                   //单个配置项保存数据的key
                  type:'text',                   //文本类型
                  description: 'xxx',
                  defaultValue:''
                },{
                  type:'delete',                   //文本类型
                  defaultValue:''
                }
              ]
            }

          ],
          type:'addLine'
        },
      ],
      defaultValue: [{"_zcytabletrtype_":"addLine","tagName":"电子卖场","href":"","children":[{"tagName":"网上超市","href":""},{"tagName":"在线询价","href":""},{"tagName":"协议供货","href":""},{"tagName":"定点服务","href":""},{"tagName":"精品制造馆","href":""}]},{"_zcytabletrtype_":"addLine","tagName":"特许商品馆","href":"","children":[{"tagName":"医疗器械","href":""},{"tagName":"二级疫苗","href":""},{"tagName":"大宗商品","href":""},{"tagName":"医疗馆","href":""},{"tagName":"警用装备","href":""}]}]
    }
  ]
};
