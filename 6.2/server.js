const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Updated to use generated Swagger output

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve Swagger UI at /swagger-ui/
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let books = [
    {
        "isbn": "978-0-575-07641-2",
        "title": "Dune",
        "year": 1965,
        "author": "Frank Herbert"
    },
    {
        "isbn": "978-1-1012-0383-5",
        "title": "Foundation",
        "year": 1951,
        "author": "Isaac Asimov"
    },
    {
        "isbn": "978-0-345-43881-0",
        "title": "The War of the Worlds",
        "year": 1898,
        "author": "H.G. Wells"
    },
    {
        "isbn": "978-0-06-085052-4",
        "title": "Neuromancer",
        "year": 1984,
        "author": "William Gibson"
    },
    {
        "isbn": "978-0-575-08643-3",
        "title": "Do Androids Dream of Electric Sheep?",
        "year": 1968,
        "author": "Philip K. Dick"
    },
    {
        "isbn": "978-1-1011-7519-2",
        "title": "The Martian Chronicles",
        "year": 1950,
        "author": "Ray Bradbury"
    },
    {
        "isbn": "978-0-8050-5221-6",
        "title": "Snow Crash",
        "year": 1992,
        "author": "Neal Stephenson"
    },
    {
        "isbn": "978-0-575-09939-6",
        "title": "Hyperion",
        "year": 1989,
        "author": "Dan Simmons"
    },
    {
        "isbn": "978-0-380-97365-4",
        "title": "Stranger in a Strange Land",
        "year": 1961,
        "author": "Robert A. Heinlein"
    },
    {
        "isbn": "978-0-7653-4166-0",
        "title": "Ender's Game",
        "year": 1985,
        "author": "Orson Scott Card"
    },
    {
        "isbn": "978-1-1012-0913-4",
        "title": "2001: A Space Odyssey",
        "year": 1968,
        "author": "Arthur C. Clarke"
    },
    {
        "isbn": "978-0-575-07640-5",
        "title": "The Hitchhiker's Guide to the Galaxy",
        "year": 1979,
        "author": "Douglas Adams"
    },
    {
        "isbn": "978-0-553-29335-0",
        "title": "The Left Hand of Darkness",
        "year": 1969,
        "author": "Ursula K. Le Guin"
    },
    {
        "isbn": "978-0-553-29238-4",
        "title": "Foundation and Empire",
        "year": 1952,
        "author": "Isaac Asimov"
    },
    {
        "isbn": "978-0-8129-7221-5",
        "title": "The Time Machine",
        "year": 1895,
        "author": "H.G. Wells"
    }
]

let lends = [
    {
        "id": 1,
        "customer_id": "CUST001",
        "isbn": "978-0-575-07641-2",
        "borrowed_at": "2024-04-16T10:00:00",
        "returned_at": null
    },
    {
        "id": 2,
        "customer_id": "CUST002",
        "isbn": "978-1-1012-0383-5",
        "borrowed_at": "2024-04-16T10:15:00",
        "returned_at": "2024-04-18T09:30:00"
    },
    {
        "id": 3,
        "customer_id": "CUST003",
        "isbn": "978-0-345-43881-0",
        "borrowed_at": "2024-04-16T11:30:00",
        "returned_at": null
    },
    {
        "id": 4,
        "customer_id": "CUST004",
        "isbn": "978-0-006-085052-4",
        "borrowed_at": "2024-04-17T08:45:00",
        "returned_at": "2024-04-20T11:20:00"
    },
    {
        "id": 5,
        "customer_id": "CUST005",
        "isbn": "978-0-575-09939-6",
        "borrowed_at": "2024-04-18T13:20:00",
        "returned_at": null
    },
    {
        "id": 6,
        "customer_id": "CUST006",
        "isbn": "978-0-380-97365-4",
        "borrowed_at": "2024-04-19T10:10:00",
        "returned_at": "2024-04-21T14:00:00"
    },
    {
        "id": 7,
        "customer_id": "CUST007",
        "isbn": "978-0-7653-4166-0",
        "borrowed_at": "2024-04-19T14:30:00",
        "returned_at": null
    },
    {
        "id": 8,
        "customer_id": "CUST008",
        "isbn": "978-1-1012-0913-4",
        "borrowed_at": "2024-04-20T11:45:00",
        "returned_at": null
    },
    {
        "id": 9,
        "customer_id": "CUST009",
        "isbn": "978-0-575-07640-5",
        "borrowed_at": "2024-04-21T09:20:00",
        "returned_at": null
    },
    {
        "id": 10,
        "customer_id": "CUST010",
        "isbn": "978-0-553-29335-0",
        "borrowed_at": "2024-04-21T15:00:00",
        "returned_at": null
    }
]


app.use(express.json())

function validateBookJSON(json) {
    for (key in json) {
        if (json[key] === "" || json[key] === undefined) {
            return false
        }
    }
    return true
}

function validateLendJSON(json) {
    for (key in json) {
        if ((json[key] === "" || json[key] === undefined) && key !== "returned_at") {
            return false
        }
    }
    return true
}

function isBorrowed(isbn) {
    let isBorrowed = false
    lends.filter(lend => lend.isbn === isbn).forEach(item => {
        if (item.returned_at === null) {
            console.log("Book is already borrowed")
            isBorrowed = true
        }
    })
    return isBorrowed
}

function checkCustomerLends(customerID) {
    const customerLends = lends.filter(lend => (lend.customer_id === customerID && lend.returned_at === null))
    if (customerLends.length > 3) {
        return false
    }
    return true
}

app.get("/books", (req, res) => {
    res.json(books)
})
app.get("/books/:isbn", (req, res) => {
    books.forEach(book => {
        if (book.isbn === req.params.isbn) {
            res.json(book)
        }
    })
})
app.post("/books", (req, res) => {
    if (!validateBookJSON(req.body)) {
        res.send(422)
        console.log(false)

    } else {
        books.push(req.body)
        res.json(req.body)
    }

})
app.put("/books/:isbn", (req, res) => {
    if (!validateBookJSON(req.body)) {
        res.send(422)
        console.log(false)
    } else {
        books.forEach(book => {
            if (book.isbn === req.params.isbn) {
                console.log(books.indexOf(book))
                const idx = books.indexOf(book)
                books[idx] = req.body
                res.json(books[idx])
            }
        })
    }

})
app.delete("/books/:isbn", (req, res) => {
    books.forEach(book => {
        if (book.isbn === req.params.isbn) {
            books.splice(books.indexOf(book), 1)
            res.json(books)
        }
    })
})
app.patch("/books/:isbn", (req, res) => {
    if (!validateBookJSON(req.body)) {
        res.send(422)
        console.log(false)

    } else {
        const patch = req.body
        console.log(patch)
        books.forEach(book => {
            if (book.isbn === req.params.isbn) {
                const idx = books.indexOf(book)
                for (const key in book) {
                    if (book[key] !== patch[key]) {
                        console.log(`replace ${book[key]} with ${patch[key]}`)
                        book[key] = patch[key]

                    }
                }
                res.json(books[idx])
            }
        })


    }
})


app.get("/lends", (req, res) => {
    res.json(lends)
})

app.get("/lends/:id", (req, res) => {
    res.json(lends.find(lend => lend.id === parseInt(req.params.id)))
})

app.post("/lends", (req, res) => {
    let newLend = req.body
    newLend.borrowed_at = new Date().toLocaleDateString()
    if (!validateBookJSON(newLend)) {
        res.send(422)
    }
    if (isBorrowed(newLend.isbn)) {
        return res.status(423).send("Book is already borrowed")
    }
    if (!checkCustomerLends(newLend.customer_id)) {
        return res.status(403).send("Customer has too many books")
    } else {
        lends.push(newLend)
        res.send(newLend)
    }
})


app.delete("/lends/:id", (req, res) => {
    const target = lends.find(lend => lend.id === parseInt(req.params.id))
    if (target === undefined) {
        return res.status(404).send("Lend not found")
    }
    lends.splice(lends.indexOf(target), 1)
    return res.status(204).json(target)
})


app.listen(port, () => {
    console.log(`Library API Server running on port ${port}`)
})

