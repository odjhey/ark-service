# A sample implementation of Relay's Graphql Cursor Connections

[GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)

Data used is from one of my favorite mobile games of 2020 (Arknights!)

## Example Query

```gql
query {
  pageRequestOperators(first: 2) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        name
        avatar {
          url
        }
        rarity
        profession
      }
    }
  }
}
```

### Response

```json
{
  "data": {
    "pageRequestOperators": {
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "char_263_skadi",
        "endCursor": "char_220_grani"
      },
      "edges": [
        {
          "node": {
            "id": "char_263_skadi",
            "name": "Skadi",
            "avatar": {
              "url": "http://localhost:8181/assets/avatars/char_263_skadi.png"
            },
            "rarity": "5",
            "profession": "WARRIOR"
          }
        },
        {
          "node": {
            "id": "char_220_grani",
            "name": "Grani",
            "avatar": {
              "url": "http://localhost:8181/assets/avatars/char_220_grani.png"
            },
            "rarity": "4",
            "profession": "PIONEER"
          }
        }
      ]
    }
  }
}
```

> \*Note: Assets folder is ignored to reduce repo size
