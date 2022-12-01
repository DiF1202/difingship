module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: prop => {
            if (prop.parent) {
              return !prop.parent.fileName.includes("node_modules");
            }
            return true;
          }
        }
      }
    ]
  });
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      // 将 JS 字符串生成为 style 节点
      "style-loader",
      // 将 CSS 转化成 CommonJS 模块
      "css-loader",
      // 将 Sass 编译成 CSS
      "sass-loader"
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
