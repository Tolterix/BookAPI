const request = require('supertest')
const bookAPI = require('./BookAPI')

describe('GET endpoints', () => {
      
    it('returns every book with details on /api/books', async (done) => {
        //setup
        let testData = [
            {id: 1, book_title: 'Harry Potter & The Sorceror\'s Stone', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-0', checked_out: false},
            {id: 2, book_title: 'Harry Potter & The Chamber of Secrets', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-1', checked_out: true},
            {id: 3, book_title: 'Harry Potter & The Prisoner of Azkaban', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-2', checked_out: true},
            {id: 4, book_title: 'Harry Potter & The Goblet of Fire', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-3', checked_out: true},
            {id: 5, book_title: 'Harry Potter & The Order of the Phoenix', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-4', checked_out: false},
            {id: 6, book_title: 'Harry Potter & The Half-Blood Prince', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-5', checked_out: false},
            {id: 7, book_title: 'Harry Potter & The Deathly Hollows Pt.1', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-6', checked_out: false},
            {id: 8, book_title: 'Harry Potter & The Deathly Hollows Pt.2', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-7', checked_out: false}
        ]

        //excercise
        const res = await request(bookAPI)
            .get('/api/books')

        //assert
        expect(res.body).toEqual(testData)
        expect(res.statusCode).toEqual(200)

        //teardown
        done()
    })

    it('returns details of specified book via id', async (done) => {
        let details = [
            {id: 3, book_title: 'Harry Potter & The Prisoner of Azkaban', author: 'J.K.Rowling', isbn_number: '000-0-00-000000-2', checked_out: true, checkout_id: 3, due_date: 0}
        ]

        const res = await request(bookAPI)
            .get('/api/books/3')

        expect(res.body).toEqual(details)
        expect(res.body[0].checked_out).toEqual(true)
        expect(res.body[0].checkout_id).toEqual(3)
        expect(res.body[0].due_date).toEqual(0)
        expect(res.statusCode).toEqual(200)

        done()
    })

    it('checking out a book', async (done) => {
        let testData1 = {
            isCheckedOut: false,
            dueDate: 0
        }

        let testData2 = {
            successful: true
        }

        let testData3 = {
            isCheckedOut: true,
            dueDate: 0,
            message: 'You have the book'
        }

        let testData4 = {
            isCheckedOut: true,
            dueDate: 0
        }

        const res1 = await request(bookAPI)
            .get('/api/books/1/checkout/3')
        const res2 = await request(bookAPI)
            .get('/api/books/1/checkout/3?checkout=true')
        const res3 = await request(bookAPI)
            .get('/api/books/1/checkout/3')
        const res4 = await request(bookAPI)
            .get('/api/books/1/checkout/2')

        expect(res1.body).toEqual(testData1)
        expect(res1.statusCode).toEqual(200)

        expect(res2.body).toEqual(testData2)
        expect(res2.statusCode).toEqual(200)

        expect(res3.body).toEqual(testData3)
        expect(res3.statusCode).toEqual(200)

        expect(res4.body).toEqual(testData4)
        expect(res4.statusCode).toEqual(200)

        done()
    })

    it('checking book back in', async (done) => {
        let testData = {
            successful: true
        }

        const res = await request(bookAPI)
            .get('/api/books/1/return')

        expect(res.body).toEqual(testData)
        expect(res.statusCode).toEqual(200)

        done()
    })

})

