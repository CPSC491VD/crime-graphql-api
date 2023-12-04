# GraphQL queries using crime database
A simple GraphQL API to demonstrate what we can do with the crime database.

## To run the hosted version (recommended)
Visit this link: [GraphQL API User Interface](crime-graphql-api.vercel.app)

## To run locally
1. Clone this repo
2. Install dependencies
    ```
    npm install
    ```
3. Run the graphQL server
   ```
   npm run dev
   ```
4. Go to [localhost:5000/graphql](http://localhost:5000/graphql) to run test queries

## How to query using graphQL UI
Start with `{` and `}` then the first query inside is going to be your query endpoint. Follow the document on the right side and start nesting in what attributes you need to query. As you can see below, there are 3 queries can be made.

<img src="https://firebasestorage.googleapis.com/v0/b/chatapp-be9bd.appspot.com/o/doc.png?alt=media&token=0250f82c-72a6-4ca8-85bb-5f2e21c85c07"/>


## Example queries
Add more attributes as needed when perform any queries.
### Query all data
```javascript
{
  crimes {
    crime_date,
    id
  }
}
```

### Query by id

```javascript
{
  crime(id: "123456") {
    crime_description
  }
}
```

### Query by case_number

```javascript
{
  case(case_number: "JG497606") {
    crime_description
  }
}
```
