
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
    "route": "/booking"
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
    'index.csr.html': {size: 2513, hash: '6dae9617d023063bf447f465f5d32cb77dc1fa27743af15cc3f4a580b3214440', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2034, hash: '5fe4d1f1717cd5ec6207fd5247f7809fb2d3bd7bea0d6836b5d4d552d63c1772', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'booking/index.html': {size: 10695, hash: '16631d236ce242fc1a01bc4555dc8d4155eaf3864b69bef91612c63a5d35cfc3', text: () => import('./assets-chunks/booking_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 13956, hash: 'accf6e2b7b4f8e568fb3562fc809c67d888cb3b44281ebc332331d94bcc70fec', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 2794, hash: 'd84a2e7f49628fb746ef298ae3f51397365062d31448aeaec81aa3f62c357864', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 27546, hash: '1501831156aaf636ee282179b21222f8f48ccd09f442c1b116812408e149275d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KR2YK2O4.css': {size: 20426, hash: 'pfY7g2r1g98', text: () => import('./assets-chunks/styles-KR2YK2O4_css.mjs').then(m => m.default)}
  },
};
