require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');
mongoose.connect('mongodb://fissioner:qibvod-9rizmu-pyJtef@ds255253.mlab.com:55253/emp-test', { useNewUrlParser: true });

app.use('/', express.static(path.join(__dirname, './../client/build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './../client/build/index.html'));
});
const port = process.env.PORT_NUM || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const Employee = mongoose.model('Employee', {
    empID: Number,
    first: String,
    last: String,
    email: String,
    phone: Number,
    salary: Number,
});

const typeDefs = `
  type Employee {
    id: ID!
    first: String!
    last: String!
    email: String!
    phone: String!
    salary: Int!
  }
  type Query {
    employees: [Employee]
  }
  type Mutation {
    createEmployee(
        first: String!
        last: String!
        email: String!
        phone: String!
        salary: Int!
    ): Employee
    updateEmployee(
        id: ID!
        first: String!
        last: String!
        email: String!
        phone: String!
        salary: Int!
    ): Boolean
    removeEmployee(id: ID!):Boolean
  }
`;

const resolvers = {
    Query: {
        employees: () => Employee.find()
    },
    Mutation: {
        createEmployee: async (_, { first, last, email, phone, salary }) => {
            const employee = new Employee({ first, last, email, phone, salary });
            await employee.save();
            return employee;
        },
        updateEmployee: async (_, { id, first, last, email, phone, salary }) => {
            await Employee.findByIdAndUpdate(id, { first, last, email, phone, salary });
            return true;
        },
        removeEmployee: async (_, { id }) => {
            await Employee.findByIdAndRemove(id);
            return true;
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    server.start(() => console.log('Server is running on localhost:4000'));
});
