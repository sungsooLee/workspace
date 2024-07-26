module.exports = {
  root: true,
  env: { 
    browser: true, // 브라우저 환경에서 실행되는 코드임을 명시
    es2020: true, // ECMAScript 2020을 사용하여 코드가 작성되었음을 명시
    node: true // Node.js 환경에서 실행되는 코드임을 명시
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'plugin:react-refresh/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // ESLint가 무시할 파일이나 디렉토리를 지정
  parser: '@typescript-eslint/parser', 
  plugins: [
    'react-refresh',
    'jsx-a11y', 
    'react',
    'react-hooks' 
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn', 
      { allowConstantExport: true }
    ],
  },
};
