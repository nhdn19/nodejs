const getButton = document.getElementById('get-btn')
const postButton = document.getElementById('post-btn')
const deleteButton = document.getElementById('delete-btn')

const titleInput = document.getElementById('title-inp')
const descriptInput = document.getElementById('descript-inp')
const booksList = document.getElementById('book-list')

const displayBooks = (books) => {
    booksList.textContent = ''
    for (var i = 0; i < books.length; i++) {
        let book = document.createElement('div')

        let check = document.createElement('input')
        check.type = 'checkbox'
        book.appendChild(check)

        let number = document.createElement('input')
        number.type = 'hidden'
        number.value = books[i]._id
        book.appendChild(number)

        let detail = document.createElement('span')
        detail.innerText = books[i].title + ': ' + books[i].description
        book.appendChild(detail)

        booksList.appendChild(book)
    }
}

const checkedBooks = () => {
    var ids = []
    var childs = booksList.getElementsByTagName('div')
    for (var i = 0; i < childs.length; i++) {
        if (childs[i].childNodes[0].checked) {
            ids.push(childs[i].childNodes[1].value)
        }
    }
    return(ids)
}

const sendRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest()
        http.open(method, url)
        http.setRequestHeader('Content-Type', 'application/json')
        http.onload = () => resolve(JSON.parse(http.response))
        http.send(JSON.stringify(data))
    })
    return promise
}

const getBooks = () => {
    sendRequest('GET', '/books')
    .then(data => displayBooks(data))
}

const postBook = () => {
    const bookTitle = titleInput.value.trim()
    const bookDescript = descriptInput.value.trim()
    titleInput.value = ''
    descriptInput.value = ''
    if (!bookTitle || !bookDescript) return

    const data = {
        title: bookTitle,
        description: bookDescript
    }
    sendRequest('POST', '/books', data)
    .then(data => displayBooks(data))
}

const deleteBook = () => {
    sendRequest('DELETE', '/books', checkedBooks())
    .then(data => displayBooks(data))
}

getButton.addEventListener('click', getBooks)
postButton.addEventListener('click', postBook)
deleteButton.addEventListener('click', deleteBook)