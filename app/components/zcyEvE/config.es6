module.exports =  {
  'basePath':'zcyEvE/comps',
  'comp':{
    //分类
    '头部组件':{
      'msg':'搜索组件',
      'include':{
        //组件列表
        'header':{
          'path':'header/header',
          'msg':'网超首页搜索'
        }
      }
    },'搜索组件':{
      'msg':'搜索组件',
      'include':{
        //组件列表
        'header':{
          'path':'header/header',
          'msg':'网超首页搜索'
        }
      }
    },
    '图片组件': {
      'msg':'图片显示组件',
      'include': {
        'image': {
          'path':'images/image',
          'msg':'网站图片'
        },
        'banner': {
          'path':'common/carousel',
          'msg':'轮播图片'
        }
      }
    },
    'common': {
      'msg':'通用组件',
      'include': {
        'cart': {
          'path':'common/shop_cart',
          'msg':'购物车'
        },
        'nav_category': {
          'path':'common/nav_category',
          'msg':'菜单栏'
        },
        'ceiling': {
          'path':'common/ceiling',
          'msg':'吊顶'
        },
        '登入组件': {
          'path':'common/service_guarantee',
          'msg':'登入组件'
        }
      }
    },
    '文案组件': {
      'msg':'显示文案组件',
      'include': {
        'text': {
          'path':'text/text',
          'msg':'文字'
        },
        '新闻': {
          'path':'text/news',
          'msg':'新闻'
        }
      }
    },
    '信息展示组件': {
      'msg':'展示信息列表组件',
      'include': {
        '热销供应商': {
          'path':'msgShow/hotSupplier',
          'msg':'热销供应商'
        }
      }
    }
    
    // 'shuffling':'shuffling',
    // 'announcement':'announcement',
    // 'goodSearch':'goods_search',
    // 'daohang':'daohang',
    // 'banner':'banner',
    // 'quickentry-y':'quickentry-y',
    // 'sitemap':'sitemap',
    // 'journal-list':'journal-list',
    // 'quickentry-x':'quickentry-x',
    // 'quickentry-x2':'quickentry-x2',
    // 'footer':'footer',
    // 'gotopbar':'gotopbar'
  },
  defaultParam:{
    '@padding':{
      'name':'padding',
      'label':'内间距',
      'description': "设置组件内间距",
      'type': "text",
      'defaultValue':'0'
    },
    '@textAlign':{
      'name':'textAlign',
      'label':'对齐',
      'description': "设置组件内间距",
      'type': "text",
      'defaultValue':'0'
    },
    '@margin':{
      'name':'margin',
      'label':'外间距',
      'description': "设置组件外间距",
      'type': "text",
      'defaultValue':'0'
    }
  },
  'transform':{
    'textAlign':'text-align'
  },
  'themeMap': {
    "#197aff": '.eevee-theme-normal'
  }
}