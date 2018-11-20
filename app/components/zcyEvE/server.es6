// const path = '172.16.101.154:7001';
const path = 'http://127.0.0.1:7001';
module.exports =  {
  groupSave: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `${path}/node/eevees/admin/groupSave`,
    data: JSON.stringify(params)
  }),
  //发布子模板
  saveChildTemplate: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `${path}/node/eevees/admin/saveChildTemplate`,
    data: JSON.stringify(params)
  }),
  saveMainDomin: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `${path}/node/eevees/admin/saveMainDomin`,
    data: JSON.stringify(params)
  }),
  saveChildDomin: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `${path}/node/eevees/admin/saveChildDomin`,
    data: JSON.stringify(params)
  }),
  getChildDominById: params => $.ajax({
    spins: true,
    type: 'GET',
    url: `${path}/node/eevees/admin/getChildDominById`,
    data: params
  }),
  getOnePages: params => $.ajax({
    spins: true,
    type: 'get',
    url: `${path}/node/eevees/admin/getOnePages`,
    data: params
  }),
  //获取某一站点下的所有页面
  getDominPages: params => $.ajax({
    spins: true,
    type: 'get',
    url: `${path}/node/eevees/admin/getDominPages`,
    data: params
  }),
  getTemplatePages: id => $.ajax({
    spins: true,
    type: 'get',
    url: `/decorate/template/${id}/decorateInfo`
  }),
  submitPages: id => $.ajax({
    spins: true,
    type: 'get',
    // contentType: 'application/json;charset=UTF-8',
    url: `/decorate/page/${id}/release`
  }),
  getDominList: params => $.ajax({
    spins: true,
    type: 'get',
    url: `${path}/node/eevees/admin/getDominList`,
    data: params
  }),
  //获取模板
  getTemplate: () => $.ajax({
    spins: true,
    type: 'get',
    url: `${path}/node/eevees/admin/getTemplate`
  }),
  //发布模板
  submitTemplate: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `/decorate/template/decorate`,
    data: JSON.stringify(params)
  }),
  //发布
  submit: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `${path}/node/eevees/admin/savePage`,
    data: JSON.stringify(params)
  }),//发布
  submitTempmlate: (id,params) => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `/decorate/template/${id}/decorate`,
    data: JSON.stringify(params)
  }),
  // saveRule: params => $.ajax({
  //   spins: true,
  //   type: 'POST',
  //   contentType: 'application/json;charset=UTF-8',
  //   url: `${path}/node/eevees/admin/saveRule`,
  //   data: JSON.stringify(params)
  // }),
  findAllRule: () => $.ajax({
    spins: true,
    type: 'GET',
    url: `${path}/node/eevees/admin/findAllRule`,
  }),
  findOneRule: params => $.ajax({
    spins: true,
    type: 'GET',
    url: `${path}/node/eevees/admin/findOneRule`,
    data:params
  }),
  //-------------config
  createRule: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `/decorate/personal/create`,
    data: JSON.stringify(params)
  }),
  updateRule: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `/decorate/personal/update`,
    data: JSON.stringify(params)
  }),
  searchAllRule: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    url: `/decorate/personal/list`,
    data: JSON.stringify(params)
  }),
  deleteRule: params => $.ajax({
    spins: true,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify(params),
    url: '/decorate/personal/delete'
  }),
};
