module.exports = function(env){
  //webpack config
  var webpack = require('webpack');
  var path = require('path');
  var fs = require('fs');
  var glob = require('glob');
  var HtmlwebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require("extract-text-webpack-plugin");
  var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
  var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

  //var WebpackMd5Hash = require('webpack-md5-hash');

  var ROOT_PATH = path.resolve(__dirname);
  var SRC_PATH = path.resolve(ROOT_PATH, 'src/modules/');
  var DIST_PATH = path.resolve(ROOT_PATH, 'app');
  var VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views/');
  var NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules');

  //获取构建环境
  var NODE_ENV = process.env.NODE_ENV?process.env.NODE_ENV:env;
  var isProduction = NODE_ENV ==='production' ? true : false;
  var isTest = NODE_ENV ==='testing' ? true : false;

  var entryTpl = {};
  var plugins = [];


  var entryHtml = glob.sync(VIEWS_PATH + '/**/*.html');

  entryHtml.forEach(function(filePath){
      var entryPath = path.dirname(filePath);
          entryPath = entryPath.substring(entryPath.lastIndexOf('\/')+1);
      var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
      var conf = {
          template: filePath,
          filename: 'views/' + entryPath + '/'+filename + '.html',
          inject:'body',
          chunks:['runtime','babel-polyfill','vender',filename]
      }
      plugins.push(new HtmlwebpackPlugin(conf));
      entryTpl[filename] = filePath;
  });


  var entryFiles = glob.sync(SRC_PATH + '/**/*.{js,vue}');
  var entryJs = {};
  entryFiles.forEach(function(filePath){
      if(filePath.indexOf('common')==-1){
          var entryName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
          if(entryName in entryTpl){
              entryJs[entryName] = filePath;
          }
      }
  });

  var extractCSS;
  if(isProduction || isTest){
      extractCSS = new ExtractTextPlugin('[name]/[name].[contenthash:20].css');
       plugins.push(extractCSS,
          new UglifyJSPlugin({
              compress: {
                  warnings: false
              },
              sourceMap: true
          }),
          new webpack.DefinePlugin({
              "process.env": {
                  NODE_ENV: JSON.stringify(process.env.NODE_ENV)
              }
          }),
          new OptimizeCSSPlugin(),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
          //new WebpackMd5Hash() // 解决只修改css文件时 导致引用该文件的js重复生成新hash值的问题（正常不需要）， 参考文献 http://www.cnblogs.com/ihardcoder/p/5623411.html
      );

  }else{
      extractCSS = new ExtractTextPlugin('[name]/[name].css');
      //new webpack.optimize.UglifyJsPlugin({minimize: true})
      plugins.push(extractCSS,
      new webpack.HotModuleReplacementPlugin(), //热更新插件
      new webpack.NoEmitOnErrorsPlugin(), //不触发错误,即编译后运行的包正常运行
      new FriendlyErrorsPlugin() //友好的错误提示
      );
  }

  return {
    entry: Object.assign(entryJs,{
      'vender': ['vue','vuex','vue-router'],
      'babel-polyfill':'babel-polyfill'
    }),
    output: {
      path: DIST_PATH,
      filename: isProduction ? '[name]/[name].[chunkhash].js':'[name]/[name].js',
      chunkFilename: isProduction ? '[name].[chunkhash].bundle.js':'[name].bundle.js',
      publicPath: '/app/'
    },
    module: {
        rules:[
            {
              test: /\.vue$/,
              exclude: /node_modules/,
              use: {
                  loader: 'vue-loader',
              }
            },
             {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use:{
                      loader: 'babel-loader'
                  }
              },
              {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options:{
                                ident:'postcss',
                                plugins:[
                                    require('postcss-import')(),
                                    require('postcss-url')(),
                                    require('postcss-cssnext')({
                                        features:{
                                            rem:false
                                        }
                                    })
                                ]
                            }
                        }
                    ]
                })
              },
              {
                  test: /\.(jpe?g|png|gif|svg)$/i,
                  exclude: /node_modules/,
                  use: {
                      loader: 'url-loader',
                      options: {
                          limit: 10000,
                          name:'img/[name].[ext]'
                      }
                  }
              },
              {
                  test: /\.(woff2?|eot|ttf|otf)$/i,
                  exclude: /node_modules/,
                  use: {
                      loader: 'url-loader',
                      options: {
                          limit: 10000,
                          name:'fonts/[name].[ext]'
                      }
                  }
              }
        ]
    },
    resolve: {
          extensions: ['.js','.vue','.json','.css']
          //模块别名定义，方便后续直接引用别名，无须多写长长的地址
      },
    plugins: [
          new webpack.optimize.CommonsChunkPlugin({
          name:['vender','babel-polyfill','runtime'],
          filename:'[name]/[name].[hash].js',
         // children:true,
          minChunks: Infinity
      }),
      new webpack.HotModuleReplacementPlugin() //热更新插件
    ].concat(plugins),
     devtool: (isProduction ? '' : 'source-map')
     ,devServer: {
          contentBase:"./app",
          historyApiFallback: true,
          disableHostCheck: true,
          hot: true,
          inline: true,
          progress: true,
          stats: {
              cached: false,
              colors: true
          },
          proxy: {

          }
      }
  }
};
