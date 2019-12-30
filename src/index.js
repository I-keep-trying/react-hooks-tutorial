import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './style.css'

const Shopify = require('shopify-api-node')

const shopify = new Shopify({
  shopName: process.env.REACT_APP_SHOP_NAME,
  accessToken: process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN,
})

const query = `{
  shop {
    name
  }
}`

shopify
  .graphql(query)
  .then(shop => console.log(shop))
  .catch(err => console.error(err))

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
