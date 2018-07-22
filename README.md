# How to build(requires npm)

        1.cd into projects directory.
        2.Run 'npm init'.
        3.Run 'npm i webpack webpack-cli -D'.
        4.Run 'npm i react react-dom -S'.
        5.Run 'npm i babel-core babel-loader babel-preset-env babel-preset-react -D'.
        6.Create webpack.config.js:
```
  module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```
        7.Create .babelrc:
```
{
    "presets": ["env", "react"]
}
```
        8.Run 'npx webpack' to build.

# Styling

# Styling
## Class names:
* root - root <div>, contains: 
    * comments_list - <ul> list containing all the comments, contains:
        * comment - <li>, contains:
        * author_name - <p>, name of comments author
        * publication_date - <p>, when comment was posted
        * commentContent - <div>, container for comments content
    * get_more_btn - <button> rendered at the bottom
    * author_name - <p> containing comments author name