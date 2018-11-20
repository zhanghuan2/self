module.exports = {
  beloneTo:'image',           //组件层级，上层父元素
  description:'网站图片',      //组件描述
  allSite:true,
  name:'导航条',
  server:[
    {                 //接受服务的key
      uri: 'com.dtdream.vanyar.privilege.service.ApplicationReadService:getAppsByDistCode(java.lang.String distCode)',  //dubbo or ajax url
      type: 'DUBBO',           // get\post\dubbo
      returnKey: '_DATA_'
    }
  ],

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
      type: 'normal',
      line: [
        {
          label:'抽取方式',
          key: 'type',
          type: 'radio',
          description: '抽取方式',
          options:[
            {
              name: '标准标签',
              value: 1
            },{
              name: '自定义标签',
              value: 0
            }
          ],
          defaultValue: 0
        },
      ]
    },
    {
      type: 'table',          //展示表格样式
      key: 'commonTagArr',       //存储数据的key值
      search: 'colors',       //是否显示搜索功能，且搜索字段
      group: 'type|1',
      thead:['一级标签','链接地址','是否开启','操作'],     //表格头
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
              key:'ifshow',
              type:'switch',                  //颜色选择类型，有预览功能
              options:[
                {
                  name: '开启',
                  value: '1'
                },{
                  name: '关闭',
                  value: '0'
                }
              ],
              defaultValue: '1'
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
                  key:'ifshow',
                  type:'switch',                  //颜色选择类型，有预览功能
                  options:[
                    {
                      name: '开启',
                      value: '1'
                    },{
                      name: '关闭',
                      value: '0'
                    }
                  ],
                  defaultValue: '1'
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
      defaultValue:[
        {"tagName":"精品制造管","href":"https://zhizao.zcy.gov.cn/","ifshow":1},
        {"tagName":"特许商品馆","href":"--","ifshow":1,"children":[{"tagName":"2222","href":"2222","ifshow":1}]},
        {"tagName":"求购信息","href":"https://intentlist.zcy.gov.cn/procurement/supplier","ifshow":1}
        ]
    },
    {
      type: 'table',          //展示表格样式
      key: 'selfTagArr',       //存储数据的key值
      search: 'colors',       //是否显示搜索功能，且搜索字段
      group: 'type|0',
      thead:['一级标签','链接地址','是否开启','操作'],     //表格头
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
              key:'ifshow',
              type:'switch',                  //颜色选择类型，有预览功能
              options:[
                {
                  name: '开启',
                  value: '1'
                },{
                  name: '关闭',
                  value: '0'
                }
              ],
              defaultValue: '1'
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
                  key:'ifshow',
                  type:'switch',                  //颜色选择类型，有预览功能
                  options:[
                    {
                      name: '开启',
                      value: '1'
                    },{
                      name: '关闭',
                      value: '0'
                    }
                  ],
                  defaultValue: '1'
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
      defaultValue:''
    }
  ]
};
