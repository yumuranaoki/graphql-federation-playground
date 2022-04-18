## Query Example

```graphql
query ExampleQuery {
  reviews {
    id
    comment
    reviewer {
      id
      displayName
    }
  }
}
```
