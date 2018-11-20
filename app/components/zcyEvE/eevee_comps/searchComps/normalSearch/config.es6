module.exports = {
  beloneTo:'image',
  description:'网站图片',
  server:{
    _DATA_: {
      url: 'cn.gov.zcy.vaccine.voucher.service.VoucherReadService:findVoucherTransferDetailById',  //dubbo or ajax url
      type: 'dubbo'  // get\post\dubbo
    },
    _LINK_: {
      url: '/api/common/getUrl',
      type: 'GET'
    }
  },
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
          defaultValue: ''
        },
        {
          label:'搜索链接',
          key: 'href',
          type: 'text',
          description: '搜索链接',
          defaultValue: ''
        },{
          label:'热词',
          key: 'hotWords',
          type: 'tags',
          description: '',
          defaultValue: ''
        },{
          label:'商品标签显示',
          key: 'ifShow',
          type: 'radio',
          description: 'xxx',
          options:[
            {
              name: '是',
              value: '1'
            },{
              name: '否',
              value: '0'
            }
          ],
          defaultValue: '0'
        },{
          label:'供应商标签显示',
          key: 'proShow',
          type: 'switch',
          description: 'xxx',
          options:[
            {
              name: '是',
              value: '1'
            },{
              name: '否',
              value: '0'
            }
          ],
          defaultValue: '0'
        }
      ]
    }
  ]
};