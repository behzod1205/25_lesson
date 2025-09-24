import fs from "node:fs/promises"

const filePath = "./database/books.json"

async function readB() {
    try {
        const data = await fs.readFile(filePath, "utf8")
        return JSON.parse(data)
    } catch(err){
        throw new Error(err)
    }
}

async function saveB(books){
    await fs.writeFile(filePath, JSON.stringify(books, null, 2))
}

export async function getAllBooks() {
    return readB()
}

export async function getBookById(id) {
    const books = await readB()
    return books.find(b => b.id === id)
}

export async function saveBooks(book) {
    const books = await readB()
    const newBook = { id: Math.random().toString(36).substr(2, 9), ...book}
    books.push(newBook)
    await saveB(books)
    return newBook
}

export async function updateBook(id, data) {
    const books = await readB()
    const bookIndex = books.findIndex((b) => b.id === id)
    if (bookIndex == -1) return null
    books[bookIndex] = {id, ...data}
    await saveB(books)
    return books[bookIndex]
}

export async function deleteBook(id) {
    const books = await readB()
    const bookIndex = books.findIndex((b) => b.id === id)
    if (bookIndex == -1) return false
    books.splice(bookIndex, 1)
    await saveB(books)
    return true
}
