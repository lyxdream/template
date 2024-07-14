// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    definePageConfig:true,
    defineAppConfig: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser", // JavaScript 代码所使用的解析器
    ecmaVersion: 2021, // ECMAScript 语法版本
    sourceType: "module", //模块系统的类型
  },
  extends: [
    "taro/vue",
    "plugin:vue/essential",
    "eslint:recommended", // 包含ESLint推荐的基本规则
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/attribute-hyphenation": ["error"], //DOM 属性使用短横线命名（kebab-case）
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }], //这个规则控制 Vue 模板中的 HTML 标签闭合括号（>）的位置。multiline 设置为 'never' 表示不允许将闭合括号放到新的一行，
    'vue/html-closing-bracket-spacing': ['error'],// 控制 Vue 模板中的 HTML 标签闭合括号前后的空格。
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
      },
    ], //控制 HTML 代码缩进。['error', 2] 表示每层缩进使用 2 个空格
    "vue/html-quotes": ["error", "double"], //  HTML 属性值使用双引号
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ], //此规则限制了单行和多行元素上的最大属性数量
    "vue/mustache-interpolation-spacing": ["error"], //双大括号 {{ }}）内部的空格
    "vue/no-multi-spaces": ["error"], //禁止不必要的多空格出现
    "vue/prop-name-casing": ["error"], //强制组件props名称遵循一定的大小写约定
    "vue/require-default-prop": ["error"], //要求所有props都声明默认值（default value）
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'fetch',
        'asyncData',
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        'head',
        ['template', 'render'],
        'renderError'
      ]
    }],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: [
          // "/^van-/"
          "/(swiper|swiper-item|scroll-view|web-view|movable-area|movable-view|rich-text|picker)/", // 忽略小程序组件
        ],
      },
    ],
    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
    "vue/multi-word-component-names": [
      "off",
      {
        ignores: [],
      },
    ],
  }
};
