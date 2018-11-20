module.exports = {
  beloneTo:'image',
  description:'网站图片',
  name:'登录',
  css:[
    "@width",
    "@height"
  ],
  data: [
    {
      type: 'normal',
      line:[
        {
          label:'显示正品保障',
          key: 'show1',
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
          label:'价格优惠',
          key: 'show2',
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
          label:'双向信用',
          key: 'show3',
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
          label:'售后无忧',
          key: 'show4',
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
        }
      ]
    }
  ]
};