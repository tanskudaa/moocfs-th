Cypress.Commands.add('createUser', function(user, options={}) {
  cy.request('POST', 'http://localhost:3000/api/users', user)
    .then(function() {
      if (options.login) {
        cy.request('POST', 'http://localhost:3000/api/login', user)
          .then(function(response) {
            localStorage.setItem('loggedBlogsUser', JSON.stringify(response.body))
          }
        )
      }
  })
})

Cypress.Commands.add('createBlog', function(blog) {
  cy.request({
    url: 'http://localhost:3000/api/blogs',
    method: 'POST',
    body: { ...blog },
    headers: {
      'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('loggedBlogsUser')).token
    }
  })
})

const initialUser = {
  name: 'Marvin Mark',
  username: 'MVM',
  password: 'lina'
}

const initialBlog = {
  title: 'New blog',
  author: 'The author',
  url: 'The website',
  likes: 59
}

describe('login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.createUser(initialUser)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened, user not logged in', function() {
    cy.contains('Blogs app')
    cy.contains('Logged in as').should('not.exist')
  })

  it('login form is shown', function() {
    cy.contains('Username:')
    cy.contains('Password:')
  })

  it('wrong credentials', function() {
    cy.get('#username').type('tiara')
    cy.get('#password').type('nifty')
    cy.get('#login-button').click()
    cy.contains('Wrong username or password')
    cy.contains('Logged in as').should('not.exist')
  })

  it('login successful', function() {
    cy.get('#username').type('MVM')
    cy.get('#password').type('lina')
    cy.get('#login-button').click()
    cy.contains('Logged in as Marvin Mark')
  })
})

describe('user logged in', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.createUser(initialUser, { login: true })
      .then(function() {
        cy.createBlog(initialBlog)
      })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened, user is logged in', function() {
    cy.contains('Blogs app')
    cy.contains('Logged in as Marvin Mark')
  })

  it('blog can be created', function() {
    cy.get('.new-blog-form__expand-button').click()
    cy.get('#title').type('Cypress blog')
    cy.get('#author').type('Cypress writer')
    cy.get('#url').type('Cypress dot com')
    cy.get('.new-blog-form__submit-button').click()

    cy.contains('Cypress blog Cypress writer')
  })

  it('blog can be expanded (View)', function() {
    cy.get('.blog__expand-button').click()
    cy.contains(initialBlog.url)
    cy.contains(initialBlog.likes)
  })

  it('blog can be liked', function() {
    cy.get('.blog__expand-button').click()
    cy.get('.blog__like-button').click()
    cy.contains(`likes ${initialBlog.likes + 1}`)
  })

  it('blog can be deleted', function() {
    cy.get('.blog__expand-button').click()
    cy.get('.blog__delete-button').click()
    cy.contains(initialBlog.title).should('not.exist')
  })

  it('blogs are sorted by likes', function() {
    cy.createBlog({ title: 'Last', author: 'AUTHOR', url: 'URL'})
    cy.createBlog({ title: 'Third highest', author: 'AUTHOR', url: 'URL', likes: initialBlog.likes - 2})
    cy.createBlog({ title: 'Second highest', author: 'AUTHOR', url: 'URL', likes: initialBlog.likes - 1})
    cy.reload()

    cy.get('.blog')
      .then(function(blogs) {
        cy.wrap(blogs[0]).contains(initialBlog.title)
        cy.wrap(blogs[1]).contains('Second highest')
        cy.wrap(blogs[2]).contains('Third highest')
        cy.wrap(blogs[3]).contains('Last')
      })
  })
})