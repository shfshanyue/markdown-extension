const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    options: './pages/options.tsx',
    popup: './pages/popup.tsx',
    content_script: './pages/content_script.ts',
  },
  output: {
    filename: 'assets/[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'tailwindcss',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' }
      ]
    })
  ]
}
