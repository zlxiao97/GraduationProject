import slash from 'slash2';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import themePluginConfig from './themePluginConfig';

const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

/*
  local dev proxy
*/
const serveUrlMap = {
  local: 'http://localhost:3000',
  // dev: 'http://36.110.117.58:8000',
  dev: 'http://120.26.77.19:3000',
};

export const serverUrl = serveUrlMap.dev;

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          redirect: '/user/login',
        },
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['super', 'admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/attendance/attendanceap',
            },
            {
              name: 'attendance',
              path: '/attendance',
              icon: 'TeamOutlined',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'AttendanceAp',
                  path: '/attendance/attendanceap',
                  component: './Attendance/AttendanceAp',
                },
                {
                  name: 'AttendanceSt',
                  path: '/attendance/attendancest',
                  component: './Attendance/AttendanceSt',
                },
              ],
            },
            {
              name: 'classManage',
              path: '/classmanage',
              icon: 'ProfileOutlined',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'classList',
                  path: '/classmanage/classlist',
                  component: './ClassManage/ClassList',
                },
                {
                  name: 'studentList',
                  path: '/classmanage/studentlist:courseid',
                  component: './ClassManage/StudentList',
                },
                {
                  name: 'attendanceRule',
                  path: '/classmanage/attendancerule:courseid',
                  component: './ClassManage/AttendanceRule',
                },
              ],
            },
            {
              name: 'account',
              path: '/account',
              icon: 'UserOutlined',
              authority: ['super', 'admin', 'user'],
              routes: [
                {
                  name: 'studentManage',
                  path: '/account/studentmanage',
                  component: './Account/StudentManage',
                },
                {
                  name: 'accountManage',
                  path: '/account/accountmanage',
                  component: './Account/AccountManage',
                  authority: ['super', 'admin'],
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              hideInMenu: true,
              routes: [
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/api/': {
  //     target: serveUrlMap.dev,
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/': '' },
  //   },
  // },
};
