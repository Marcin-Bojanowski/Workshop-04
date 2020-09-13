$(function () {

        var BASE_URL = 'http://localhost:8282';


        function getAllBooks() {

            $('#container').empty();

            $.ajax({
                url: BASE_URL + '/books',
                method: 'GET',
                dataType: 'json'
            }).done(function (result) {

                result.forEach(function (element) {
                    var newDiv = $('<div>');
                    var link = $('<a href="index.html">Delete</a>')
                    var editLink = $('<a href="#">Edit</a>')
                    newDiv.html('<h3>' + element.title + '</h3>')

                    link.one("click", function (e) {
                        e.stopPropagation()
                        deleteBook(element.id)
                    })
                    editLink.one("click", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var editForm = $('#addForm').clone()
                        var idDiv = $('<div>')
                        idDiv.append('<label for="id">Id</label>').append('<input id="id" type="text"/>')

                        var book = getBook(element.id)
                        editForm.one("click", function (e) {
                            e.stopPropagation()
                        })
                        editForm.find('#title').attr('id', 'editTitle').val(book.title)
                        editForm.find('#isbn').attr('id', 'editIsbn').val(book.isbn)
                        editForm.find('#author').attr('id', 'editAuthor').val(book.author)
                        editForm.find('#publisher').attr('id', 'editPublisher').val(book.publisher)
                        editForm.find('#type').attr('id', 'editType').val(book.type)
                        editForm.find('#addButton').attr('id', 'editButton').one('click', function (e) {
                            e.stopPropagation()
                            var editBook = {

                                id: $('#id').val(),
                                title: $('#editTitle').val(),
                                isbn: $('#editIsbn').val(),
                                author: $('#editAuthor').val(),
                                publisher: $('#editPublisher').val(),
                                type: $('#editType').val()
                            };

                            $.ajax({
                                url: BASE_URL + "/books/" + element.id,
                                method: 'PUT',
                                data: JSON.stringify(editBook),
                                contentType: 'application/json'
                            }).done(function () {
                                getAllBooks()
                            })
                        })
                        idDiv.find('#id').val(book.id)
                        editForm.find('#editTitle').prepend(idDiv)

                        newDiv.append(editForm)


                    });
                    newDiv.append(link)
                    newDiv.append(" ")
                    newDiv.append(editLink)
                    newDiv.one("click", function () {

                        var book = getBook(element.id)
                        var detailsDiv = $('<div>');
                        detailsDiv.append('<p>' + 'id: ' + book.id + '</p>')
                        detailsDiv.append('<p>' + 'isbn: ' + book.isbn + '</p>')
                        detailsDiv.append('<p>' + 'Author: ' + book.author + '</p>')
                        detailsDiv.append('<p>' + 'Publisher: ' + book.publisher + '</p>')
                        detailsDiv.append('<p>' + 'Type: ' + book.type + '</p>')
                        newDiv.append(detailsDiv);
                    })
                    $('#container').append(newDiv);

                });

            });
        };


        function getBook(id) {

            var book = {};
            $.ajax({
                async: false,
                url: BASE_URL + '/books/' + id,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    book.id = data.id
                    book.title = data.title
                    book.isbn = data.isbn
                    book.author = data.author
                    book.publisher = data.publisher
                    book.type = data.type
                }
            })
            console.log(book)
            return book;


        }

        function deleteBook(id) {


            $.ajax({
                async: false,
                url: BASE_URL + '/books/' + id,
                method: 'DELETE',
                dataType: 'json',

            })

        }

        getAllBooks();
        $('#addButton').on('click', function (e) {
            e.preventDefault();
            var newBook = {
                title: $('#title').val(),
                isbn: $('#isbn').val(),
                author: $('#author').val(),
                publisher: $('#publisher').val(),
                type: $('#type').val()
            };
            $.ajax({
                url: BASE_URL + "/books",
                method: 'POST',
                data: JSON.stringify(newBook),
                contentType: 'application/json'
            }).done(function () {
                getAllBooks();
                $('#title').val('');
                $('#isbn').val('');
                $('#author').val('');
                $('#publisher').val('');
                $('#type').val('');
            });
        });

    }
)