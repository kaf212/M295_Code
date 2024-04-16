const express = require("express")
const app = express()
const port = 3000

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


app.use(express.json())

function validateBookJSON(json) {
    for (key in json) {
        if (json[key] === "" || json[key] === undefined) {
            return false
        }
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
    if (! validateBookJSON(req.body)) {
        res.status(422)
        console.log(false)

    }
    else {
        books.push(req.body)
        res.json(req.body)
    }

})


app.put("/books/:isbn", (req, res) => {
    if (! validateBookJSON(req.body)) {
        res.status(422)
        console.log(false)

    }
    else {
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
    if (! validateBookJSON(req.body)) {
        res.status(422)
        console.log(false)

    }
    else {
        const patch = req.body
        console.log(patch)
        books.forEach(book =>{
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

app.listen(port, () => {
    console.log(`Library API Server running on port ${port}`)
})