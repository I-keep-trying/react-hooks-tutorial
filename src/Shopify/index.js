import React, { Component } from 'react'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
  },
}

const path = 'https://dev-store9.myshopify.com/api/graphql'

const shopifyGraphQL = axios.create({
  baseURL: path,
  headers: config.headers,
})


const TITLE = 'React GraphQL Shopify Client'

const GET_PRODUCTS_OF_SHOP = `
{
    shop {
              name
            description
            products(first:20) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  options {
                    name
                    values
                  }
                  variants(first: 5) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image {
                          src
                        }
                        price
                      }
                    }
                  }
                  images(first: 5) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
    }
  }
`

class Shopify extends Component {
  state = {
    shop: null,
    products: null,
    errors: null,
  }

  componentDidMount() {
    this.onFetchFromShopify(this.state.shop)
  }

  onChange = event => {
    this.setState({ shop: event.target.value })
  }

  onSubmit = event => {
    this.onFetchFromShopify(this.state.shop)
    event.preventDefault()
  }

  onFetchFromShopify = () => {
    shopifyGraphQL
      .post('', { query: GET_PRODUCTS_OF_SHOP })
      .then(result =>
        this.setState(() => ({
          shop: result.data.data.shop,        
          errors: result.data.errors,
        }))
      )
  }

  render() {
    const { shop, errors } = this.state

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="path">Showcase products</label>
          <input
            id="path"
            type="text"
            value={shop}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />
        {shop ? (
          <Shop shop={shop} errors={errors} />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    )
  }
}

const Shop = ({ shop, errors }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    )
  }

  return (
    <div>
      <p>
        <strong>Shop Open For Business</strong>
        <h2>{shop.name}</h2>
      </p>
      <Products products={shop.products} />
    </div>
  )
}

const Products = ({ products }) => (
  <div>
    <p>
      <strong>Here's what we got</strong>
    </p>

    <ul>
      {products.edges.map(info => (
        <li key={info.node.id}>
          <h2>{info.node.title}</h2>
        </li>
      ))}
    </ul>
  </div>
)

export default Shopify
