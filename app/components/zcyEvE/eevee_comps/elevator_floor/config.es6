module.exports = {
  beloneTo:'image',
  description:'网站图片',
  name:'商品橱窗',
  server:[
    {
      uri: 'cn.gov.zcy.service.item.search.facade.PurchaserItemSearchServiceFacade:search(PurchaserItemSearchCriteria criteria)',  //dubbo or ajax url
      type: 'DUBBO',
      returnKey: '_DATA_'
    }
  ],
  css:[
    "@width",
    "@height"
  ],
  data: [
    {
      type: 'normal',
      line:[
        {
          label:'抽取方式',
          key: 'loadType',
          isparam: true,
          type: 'radio',
          description: '抽取方式',
          options:[
            {
              name: '自动抽取',
              value: 1
            },{
              name: '自定义推荐',
              value: 2
            }
          ],
          defaultValue: 1
        },
        {
          label:'抽取范围',
          key: 'itemType',
          type: 'select',
          description: 'xxx',
          isparam: true,
          options:[
            {
              name: '网超商品',
              value: '1'
            },{
              name: '协议商品',
              value: '2'
            }
          ],
          defaultValue: '1',
          group: 'loadType|1'
        },
        {
          label:'后台类目',
          key: 'backCategoryId',
          type: 'text',
          description: '搜索链接',
          isparam: true,
          group: 'loadType|1',
          // data:'/xxx/xxx?key',
          // dataMap:{
          //   name:'label',
          //   id:'id'
          // },
          defaultValue: '',
        },
        {
          label:'排序方式',
          key: 'sortType',
          type: 'select',
          isparam: true,
          description: 'xxx',
          options:[
            {
              name: '销量',
              value: '1'
            },{
              name: '上架时间',
              value: '2'
            }
          ],
          defaultValue: '1',
          group: 'loadType|1'
        },
        {
          label:'抽取数量',
          key: 'pageSize',
          type: 'text',
          description: '',
          isparam: true,
          defaultValue: 30,
          group: 'loadType|1'
        },
        {
          label:'过滤商品',
          key: 'excludedIds',
          type: 'textarea',
          description: '',
          defaultValue: '',
          isparam: true,
          group: 'loadType|1'
        },{
          label:'商品ID',
          key: 'itemIds',
          type: 'textarea',
          description: '',
          defaultValue: '',
          isparam: true,
          group: 'loadType|2'
        },
        {
          label:'是否身份识别',
          key: 'iddf',
          type: 'switch',
          description: 'xxx',
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
        },
        {
          label:'登入前',
          key: 'blogin',
          type: 'checkbox',
          description: 'xxx',
          group: 'iddf',
          options:[
            {
              name: '销售价',
              value: 'sellp'
            },{
              name: '市场价',
              value: 'markp'
            },{
              name: '销量',
              value: 'sell'
            }
          ],
          defaultValue: 'sell'
        },
        {
          label:'登入后',
          key: 'alogin',
          type: 'checkbox',
          description: 'xxx',
          group: 'iddf',
          options:[
            {
              name: '销售价',
              value: 'sellp'
            },{
              name: '市场价',
              value: 'markp'
            },{
              name: '销量',
              value: 'sell'
            }
          ],
          defaultValue: 'sellp,markp,sell'
        },
        {
          label:'展示行数',
          key: 'line',
          type: 'text',
          description: '',
          defaultValue: 2,
        },
      ]
    }
  ]
};
