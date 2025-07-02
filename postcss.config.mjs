/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-pxtorem': {
      rootValue: 16, // Giá trị gốc để chuyển đổi px sang rem
      unitPrecision: 5, // Độ chính xác của đơn vị rem
      propList: ['*'], // Danh sách các thuộc tính cần chuyển đổi
      selectorBlackList: [], // Danh sách các bộ chọn không cần chuyển đổi
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};

export default config;
