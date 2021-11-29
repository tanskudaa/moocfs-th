import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuhtorDetails on Author {
    name
    born
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuhtorDetails
      bookCount
    }
  }
  ${AUTHOR_DETAILS}
`

export const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuhtorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation ($username: String!) {
    login(username: $username, password: "password") {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
