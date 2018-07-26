# Including in the project
App will be rendered in the element with 'comment_app' id.

# Styling
## CSS class names:
* root: root of the app, &lt;div> 
* comments_list: &lt;ul> of all the comments
* comment: &lt;li> child of comments_list, contains:
  * author_name: &lt;p>, name of comments author
  * publication_date: &lt;p>, when comment was posted
  * commentContent: &lt;div>, container for comments content
* get_more_btn: &lt;button> rendered at the bottom
* author_name: &lt;p> containing comments author name
* loading_icon: svg rendered when app is waiting for response from the server

## Example HTML:
```
<div class="root">
    <ul class="comments_list">
      <li class="comment">
        <p class="authors_name">John</p>
        <p class="publication_date">25.09.1995</p>
        <div class="commentContent">
          <p>Hello</p>
        </div>
      </li>
      <li class="comment">
        ...
      </li>
      <li class="comment">
        ...
      </li>
      </ul>
    <button class="get_more_btn">Load comments</button>
</div>
```
## Changing loading icon
Set loading icon by setting data-loading-icon-path attribute in root of the app.

# Communication with the server
## Requests
App will be sending requests to <host>/<commentendpoint>, this can be set in the app element in html, for example:
```
<div id="comments_app" data-url="http://127.0.0.1:5000/getc" data-loading-icon-path="./assets/load_icon.svg"></div>
```
'loaded' querry parameter will be provided, it contains number of elements already loaded. So, if one request was sent, and 5 coments were sent in response, loaded will be equal to 5.

## Responses
Example of expected response:
```
{
  "comments":[
      {"author":"Bart","content":"<p>Hey</p>","publicationDate":"13.03.2018"}
    ],
  "isLast":false
}
```

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
