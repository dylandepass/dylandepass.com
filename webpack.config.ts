import path from 'path';
import webpack, { Configuration } from 'webpack';

interface Environment {
  development?: boolean;
  production?: boolean;
}

const webpackConfig = (env: Environment): Configuration => ({
  mode: env.production || !env.development ? 'production' : 'development',
  ...(env.production || !env.development ? {} : { devtool: 'source-map' }),
  entry: {
    app: ['./app/app.ts']
  },
  watch: env.production || !env.development ? false : true,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-bundle.js'
  },
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: ['.css', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': env.production || !env.development,
      'process.env.NAME': JSON.stringify(require('./package.json').name),
      'process.env.VERSION': JSON.stringify(require('./package.json').version)
    })
  ]
});

export default webpackConfig;
