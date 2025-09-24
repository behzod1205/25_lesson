import http, { request } from "node:http"
import fs from "node:fs/promises"

const server = http.createServer(async (request, response) => {
    const method = request.method.toLowerCase()
    const url = request.url
})



server.listen(3535, ()=>{
    console.log("Server is running on 3535")
})