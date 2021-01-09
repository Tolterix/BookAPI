Pair Project - Check out a book

Create an Express API that achieves the following:

Requirements:

This should be Dockerized utilizing `docker-compose up`, and can have a readme for any steps needed to initialize the project. 
    ie: a) Run docker-compose up
        b) Run “this command to execute file to initialize the database”
        c) Run “this command to make magical programming things occur”
        d) etc...

This should be an Express TDD Driven project.

This project should satisfy the following criteria:
1. As a user, I want to be able to see a list of every book in the library so that I can browse the selections.
        including:
            Book Title,
            Author,
            ISBN Number (this can be any number for today!),
            If the book is checked out or not
    API endpoint: `/api/books`

2.  As a user, I want to be able to see details about an individual book so that I can focus on one book at a time.
        including:
            Book Title,
            Author,
            ISBN Number (this can be any number for today!),
            If the book is checked out or not
            Date due back if checked out
            UserId of user that checked out the book
    API endpoint: `/api/books/:bookId`

3. As a user, I want to be able to check out a book for two weeks so that I may read it.
    API endpoint: `/api/books/:bookId/checkout/:userId`

4. As a user, I want to know if a book is available to checkout (if I am the person that checked it out, I should see a message indicating that I have the book already and if someone else checked the book out, I should see a message telling me to check back after the current due date of the book), so that I can save time.
    API endpoint: `/api/books/:bookId/checkout/:userId`

5.  As a librarian, I want to be able to check on the due date for a book that someone just checked out so that I may 	keep track of its status and identify the person who checked it out.
    API endpoint: `/api/books/:bookId`

6. As a librarian, I want to be able to update the system for a book that has been returned
    API endpoint: `/api/books/:bookId/return`