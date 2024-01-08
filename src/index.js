const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json());
console.log('server start');

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    const customer = customers.find((customer) => customer.cpf == cpf);

    if (!customer) {
        return response.status(400).json({ error: "Costumer not found" })
    }

    request.customer = customer;
    return next();
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf == cpf)

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send()
})

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement)
})

app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() == new Date(dateFormat).toDateString())

    return response.json(statement)
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { descripition, amount } = request.body;
    const { customer } = request;

    const statementOperation = {
        descripition,
        amount,
        created_at: new Date(),
        type: "Credit"
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})


app.listen(7000);

