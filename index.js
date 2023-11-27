import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from "dotenv"
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLFloat } from 'graphql'
import pkg from 'pg'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

// DB connection
const { Pool } = pkg
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.USER,
    password: process.env.PASSWORD,
    port: 5432
})

// GraphQL type
const CrimeDataType = new GraphQLObjectType({
    name: 'CrimeData',
    fields: {
        id: { type: GraphQLString },
        crime_date: { type: GraphQLString },
        crime_description: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        location_description: { type: GraphQLString },
        iucr_primary_description: { type: GraphQLString },
        iucr_secondary_description: { type: GraphQLString },
        iucr_active: { type: GraphQLBoolean },
        case_number: { type: GraphQLString },
        primary_type: { type: GraphQLString },
        arrest: { type: GraphQLBoolean }
    }
})

// Query Resolver
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        // Query by id
        crime: {
            type: CrimeDataType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (_, { id }) => {
                const result = await pool.query('SELECT * FROM tbl_analytics WHERE id = $1', [id])
                return result.rows[0];
            }            
        },

        // Query by case number
        case: {
            type: new GraphQLList(CrimeDataType),
            args: {
                case_number: { type: GraphQLString }
            },
            resolve: async (_, { case_number }) => {
                const result = await pool.query('SELECT * FROM tbl_analytics WHERE case_number = $1', [case_number])
                return result.rows;
            }          
        },

        // Query all crimes
        crimes: {
            type: new GraphQLList(CrimeDataType),
            resolve: async () => {
                const result = await pool.query('SELECT * FROM tbl_analytics')
                return result.rows;
            }
        }
    }
})

// Schema
const schema = new GraphQLSchema({
    query: RootQueryType
})

// Routes
app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}))

app.get('/crimes', async (req, res) => {
    const result = await pool.query('SELECT * FROM tbl_analytics')
    console.log(result.rows)
    return res.status(200).json({
        res: result.rows
    })
})

app.get('/', (req, res) => {
    res.status(200).send("<h2>Welcome to Graphql")
})


app.listen(PORT, () => console.log(`server started on ${PORT}` ))