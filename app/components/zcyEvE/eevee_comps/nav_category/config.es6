module.exports = {
  beloneTo:'image',
  description:'网站图片',
  name:'商品类目',
  server:[
    {
      uri: 'cn.gov.zcy.service.category.facade.FrontCategoryReadServiceFacade:findCategoryList(FrontCategorySearchCriteria criteria)',  //dubbo or ajax url
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
          label:'类目名称',
          key: 'title',
          type: 'text',
        },
        {
          label:'添加类目',
          key: 'frontCategoryIds',
          type: 'text',
          isparam: true
        },{
          label:'是否默认显示',
          key: 'ifshow',
          type: 'switch',
          description: 'xxx',
          options:[
            {
              name: '显示',
              value: '1'
            },{
              name: '隐藏',
              value: '0'
            }
          ],
          defaultValue: '1'
        }
      ]
    }
  ]
};
