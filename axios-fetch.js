const token = ...
const url = ...
const variables = {
  cursor: ...,
  range: ...
}
axios({
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': token
  },
  method: 'post',
  data: {
    query: `
      query($range: String!, $cursor: String) {
        tenderTransactions(first: 50, after: $cursor, query: $range) {
          edges {
            node {
              id
            }
            cursor
          }
        }
      }
    `,
    variables: variables
  },
  url: url
}).then(result => {
  console.log(result.data)
}).catch(error => {
  console.log(error)
})