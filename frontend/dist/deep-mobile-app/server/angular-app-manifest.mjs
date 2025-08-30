
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/home"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2513, hash: 'adaa784510365dc1c4d99a6ee2c36c9552cf7f32a5736b1565fb430d9888b558', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2034, hash: '5dc7a45685818d164d2e6681bb760cf59a99835ab0d79779a4718d5625aae577', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 2794, hash: '7c01537a1094efbc7dfacc36b8343887bdd5a1cd8ad3879214961c8b7f8d0e10', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 13956, hash: '9bdca9c36f122f3e72477725e259568812ffe61e024d5daf4a02b2ba7c28ef75', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 27546, hash: 'a9381c926509f61224a8f923112690804e2e1a356ad46ab7086ccabe466b954d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KR2YK2O4.css': {size: 20426, hash: 'pfY7g2r1g98', text: () => import('./assets-chunks/styles-KR2YK2O4_css.mjs').then(m => m.default)}
  },
};
