# GraphQL queries using crime database

## Query by id

```javascript
{
    crime(id: "123456") {
		crime_description
	}
}
```

## Query by case_number

```javascript
{
    case(case_number: "JG497606") {
		crime_description
	}
}
```