module.exports =  {
  'basePath':'zcyEvE/eevee_comps',
  'comp':{
    
    //分类
    '头部组件':{
      'msg':'图片组件',
      'keyId':'images',
      'include':{
        '顶通': {
          'path':'ceiling',
          'msg':'站点logo组件',
          'icon': 'icon-dingtong'
        },
        '搜索': {
          'path':'normalSearch',
          'msg':'网超banner组件',
          'icon':'icon-sousuo2'
        },
        '商品类目': {
          'path':'nav_category',
          'msg':'网超banner组件',
          'icon':'icon-shangpinleimu'
  
        },
        'logo': {
          'path':'logo',
          'msg':'网超banner组件',
          'icon':'icon-logo'
        },
        '导航条': {
          'path':'appNav',
          'msg':'网超banner组件',
          'icon':'icon-daohangtiao'
        },
      }
    },
    '内容组件':{
      'msg':'图片组件',
      'keyId':'images',
      'include':{
        'banner': {
          'path':'banner',
          'msg':'站点logo组件',
          'icon': 'icon-banner'
        },
        '登录': {
          'path':'service_guarantee',
          'msg':'网超banner组件',
          'icon':'icon-denglu'
        },
        '商品橱窗': {
          'path':'elevator_floor',
          'msg':'网超banner组件',
          'icon':'icon-shangpinchuchuang'
  
        },
        '标题行': {
          'path':'title',
          'msg':'网超banner组件',
          'icon':'icon-biaotihang'
        },
        '页尾': {
          'path':'bottom',
          'msg':'网超banner组件',
          'icon':'icon-yewei'
        }
      }
    }
  },
  defaultParam:{
    '@padding':{
      'key':'padding',
      'label':'内间距',
      'description': "设置组件内间距",
      'type': "text",
      'defaultValue':'0'
    },
    '@textAlign':{
      'key':'textAlign',
      'label':'对齐',
      'description': "设置组件内间距",
      'type': "text",
      'defaultValue':'0'
    },
    '@margin':{
      'key':'margin',
      'label':'外间距',
      'description': "设置组件外间距",
      'type': "text",
      'defaultValue':'0'
    },
    '@width':{
      'key':'width',
      'label':'组件宽度',
      'description': "组件宽度",
      'type': "text",
      'defaultValue':''
    },
    '@height':{
      'key':'height',
      'label':'组件高度',
      'description': "组件高度",
      'type': "text",
      'defaultValue':''
    }
  },
  'transform':{
    'textAlign':'text-align'
  },
  'themeMap': {
    "#197aff": 'eevee-theme-normal',
    "#ffae3e": 'eevee-theme-yellow'
  }
}