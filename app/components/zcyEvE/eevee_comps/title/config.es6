module.exports = {
  beloneTo:'image',
  description:'网站图片',
  name:'标题行',
  css:[
    "@width",
    "@height"
  ],
  data: [
    {
      type: 'normal',
      line:[
        {
          label:'标题名称',
          key: 'title',
          type: 'text',
          defaultValue: ''
        },
        {
          label:'标题图片',
          key: 'image',
          type: 'text',
          defaultValue: ''
        },{
          label:'查看更多显示',
          key: 'showMore',
          type: 'switch',
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
          label:'跳转链接',
          key: 'sitesName',
          type: 'text',
          defaultValue: ''
        }
      ]
    }
  ]
};