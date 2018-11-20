module.exports = {
  name:'logo',
  allSite:true,
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
          label:'LOGO图片',
          key: 'src',
          type: 'upload',
          description: '显示图片',
          defaultValue: '',
          warn:'只能上传png,jpg等格式的图片'
        },
        {
          label:'LOGO链接地址',
          key: 'href',
          type: 'text',
          description: '搜索链接链接',
          defaultValue: 'www.zcy.gov.cn',
          isparam: true
        },{
          label:'站点名称',
          key: 'sitesName',
          type: 'text',
          description: '站点名称',
          defaultValue: '电子卖场'
        }
      ]
    }
  ]
};
