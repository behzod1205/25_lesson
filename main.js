import http from "node:http"
import { getAllBooks, getBookById, saveBooks, updateBook, deleteBook } from "./functions.js"

const server = http.createServer(async (request, response) => {
    const method = request.method.toLowerCase()
    const url = request.url

    console.log({ 
        method,
        url
     })

    // Get
    if (method === "get" && url === "/books"){
        const books = await getAllBooks()
        response.writeHead(200, { "content-type": "aplication/json" })
        response.write(JSON.stringify(books))
        response.end()
    }else if(method === "get" && url.startsWith("/books/")){
        const id = url.split("/")[2]
        const book = await getBookById(id)
        if (!book){
            response.writeHead(404, { "content-type": "aplication/json" })
            response.write({ message: "Not Found"})
            response.end()
        }else{
            response.writeHead(200, { "content-type": "aplication/json" })
            response.write(JSON.stringify(book))
            response.end()
        }
    }
    // Post
    else if(method === "post" && url === "/books"){
        let body = ""
        request.on("data", (chunk)=>{
            body += chunk
        })
        request.on("end", async ()=>{
            try{
                const data = JSON.parse(body)
                
                const book = await saveBooks(data)
                response.writeHead(201, { "conntent-type": "aplication/json" })
                response.end(JSON.stringify(book))
            }catch(err){
                response.writeHead(400, { "Content-Type": "application/json" })
                response.end(JSON.stringify({ error: "Invalid JSON" }))
            }
        })
    }

    // Put

    else if(method === "put" && url.startsWith("/books/")){
        const id = url.split("/")[2]
        let body = ""
        request.on("data", (chunk)=>{
            body += chunk
        })
        request.on("end", async ()=>{
            try{
                const data = JSON.parse(body)
                
                const book = await updateBook(id, data)
                response.writeHead(201, { "conntent-type": "aplication/json" })
                response.end(JSON.stringify(book))
            }catch(err){
                response.writeHead(400, { "Content-Type": "application/json" })
                response.end(JSON.stringify({ error: "Invalid JSON" }))
            }
        })
    }

    // Delete

    else if(method === "delete" && url.startsWith("/books/")){
        const id = url.split("/")[2]
        const check = await deleteBook(id)
        if(!check){
            response.writeHead(404, { "content-type": "aplication/json" })
            response.write(JSON.stringify({ message: "Not Found"}))
            response.end()
        }else{
            response.writeHead(200, { "content-type": "aplication/json" })
            response.write(JSON.stringify({ message: "Book is deleted!"}))
            response.end()
        }
    }else{
        response.writeHead(404, { "content-type": "application/json" })
        response.end(JSON.stringify({ message: "API not found" }))
    }
})





server.listen(3535, ()=>{
    console.log("Server is running on 3535")
})