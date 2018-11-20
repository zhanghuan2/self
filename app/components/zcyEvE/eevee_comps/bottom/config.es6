module.exports = {
  beloneTo:'image',
  description:'网站图片',
  name:'页尾',
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
    "@height",
    '@margin'
  ],
  data: [
    {
      type: 'normal',
      line:[
        {
          label:'链接',
          key: 'src',
          type: 'text',
          description: '显示图片',
          defaultValue: ''
        },
        {
          label:'LOGO链接地址',
          key: 'href',
          type: 'text',
          description: '搜索链接链接',
          defaultValue: ''
        },{
          label:'站点名称',
          key: 'sitesName',
          type: 'text',
          description: '站点名称',
          defaultValue: ''
        }
      ]
    }
  ]
};