module.exports = {
  beloneTo:'image',
  description:'网站图片',
  name:'搜索',
  css:[
    "@width",
    "@height"
  ],
  data: [
    {
      type: 'normal',
      line:[
        {
          label:'搜索按钮名称',
          key: 'btnName',
          type: 'text',
          description: '搜索按钮名称',
          defaultValue: '搜索'
        },{
          label:'商品标签显示',
          key: 'proShow',
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
        },{
          label:'搜索链接',
          key: 'href',
          type: 'text',
          description: '搜索链接',
          defaultValue: '/search',
          group: 'proShow'
        },{
          label:'热词',
          key: 'hotWords',
          type: 'tags',
          description: '',
          defaultValue: ['硒鼓','打印纸','中性笔','墨粉','墨盒'],
          group: 'proShow'
        },{
          label:'供应商标签显示',
          key: 'supShow',
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
        },{
          label:'供应商搜索链接',
          key: 'suplierHref',
          type: 'text',
          description: '供应商搜索链接',
          defaultValue: '',
          group: 'supShow'
        },{
          label:'搜索全站按钮显示',
          key: 'allBtnShow',
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
          defaultValue: '0'
        },{
          label:'全站按钮名称',
          key: 'allbtnName',
          type: 'text',
          description: '全站按钮名称',
          defaultValue: '',
          group: 'allBtnShow'
        },{
          label:'全站按钮链接',
          key: 'allbtnHref',
          type: 'text',
          description: '全站按钮链接',
          group: 'allBtnShow',
          defaultValue: ''
        },{
          label:'购物车按钮显示',
          key: 'cartShow',
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
        },{
          label:'购物车链接',
          key: 'cartHref',
          type: 'text',
          description: '全站按钮链接',
          defaultValue: '',
          group: 'cartShow'
        }
      ]
    }
  ]
};