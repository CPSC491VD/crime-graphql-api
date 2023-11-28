# GraphQL queries using crime database
A simple GraphQL API to demonstrate what we can do with the crime database.

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
