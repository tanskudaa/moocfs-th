require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

console.log('Connecting to MongoDb...')
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB OK'))
  .catch(error => console.log('Error connecting to MongoDB:', error.message))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    bookCount: Int!
    authorCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int): Author
    deleteBook(title: String!): Book
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const authorToSearch = args.author
        ? await Author.findOne({ name: args.author }).lean()
        : null

      const mongoQuery = {}
      if (authorToSearch) mongoQuery.author = authorToSearch._id
      if (args.genre) mongoQuery.genres = { $all: [args.genre] }

      const books = await Book.find(mongoQuery).populate('author')
      return books
    },

    allAuthors: async () => {
      const authors = await Author.find({}).lean()
      return authors.map(async a => {
        const bookCount = await Book.collection.countDocuments({
          author: a._id
        })
        return { ...a, bookCount }
      })
    },

    bookCount: () => {
      return Book.collection.countDocuments({})
    },

    authorCount: () => {
      return Author.collection.countDocuments({})
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    },

    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('not logged in')

      const book = new Book({
        ...args,
        author: await Author.findOne({ name: args.author })
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return book
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('not logged in')

      const author = await Author.findOne({ name: args.name })

      if (args.setBornTo) {
        try {
          author.born = args.setBornTo
          await author.save()
          return author
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      } else {
        return author
      }
    },

    deleteBook: async (root, args) => {
      const book = await Book.findOne({ title: args.title })
      if (book) await book.delete()
      return book
    },

    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user) throw new UserInputError('wrong credentials')

      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    } else {
      return null
    }
  }
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
