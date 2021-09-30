import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Title',
  author: 'Author',
  url: 'URL',
  likes: 5,
  user: {
    username: 'paleskowitz',
    name: 'Paul Leskowitz'
  }
}

const user = {
  username: 'MVM',
  name: 'Marvin Mark'
}

test('rendered blog has title and author but not likes or url', () => {
  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Title')
  expect(div).toHaveTextContent('Author')
  expect(div).not.toHaveTextContent('URL')
  expect(div).not.toHaveTextContent('5')
})

test('rendered blog has title, author, url and likes after \'view\' fired', () => {
  const component = render(<Blog blog={blog} user={user}/>)

  const button = component.container.querySelector('.blog__expand-button')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Title')
  expect(div).toHaveTextContent('Author')
  expect(div).toHaveTextContent('URL')
  expect(div).toHaveTextContent('5')
})

test('like handler function called twice on two button fires', () => {
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} handleLikeBlog={mockHandler}/>)

  const viewButton = component.container.querySelector('.blog__expand-button')
  fireEvent.click(viewButton)

  const likeButton = component.container.querySelector('.blog__like-button')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})