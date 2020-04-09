var http = require('http')
var fs = require('fs')

var server = http.createServer(function(request, response) {
    if (request.url == '/') 
    {
        response.writeHead(200, {
            "Context-type": "text/plain"
        })
        response.write('Stupid Page');
        response.end();
    }

    if (request.url == '/home' || request.url == '/about')
    {
        response.writeHead(200, {
            "Context-type": "text/html"
        })
        fs.readFile('./public' + request.url + '.html', null, function(error, data) {
            if (error) 
            {
                response.writeHead(404);
                response.write('Page not found!');
            } 
            else 
            {
                response.write(data);
            }
            response.end();
        })
    }
    else 
    {
        response.writeHead(404);
        response.write('Request not found!');
        response.end();
    }

})

server.listen(8000, function() {
    console.log('Server is run on port 8000')
})