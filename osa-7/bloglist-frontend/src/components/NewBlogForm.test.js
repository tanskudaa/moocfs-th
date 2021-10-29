import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('new blog handler receives right parameters from form', () => {
  const expectedObject = {
    title: 'Title',
    author: 'Author',
    url: 'URL'
  }

  const mockHandler = jest.fn()
  const component = render(<NewBlogForm handlePostBlog={mockHandler}/>)

  const expandButton = component.container.querySelector('.new-blog-form__expand-button')
  fireEvent.click(expandButton)

  const inputTitle = component.container.querySelector('#title')
  fireEvent.change(inputTitle, { target: { value: expectedObject.title } } )
  const inputAuthor = component.container.querySelector('#author')
  fireEvent.change(inputAuthor, { target: { value: expectedObject.author } } )
  const inputUrl = component.container.querySelector('#url')
  fireEvent.change(inputUrl, { target: { value: expectedObject.url } } )

  const submitButton = component.container.querySelector('.new-blog-form__submit-button')
  fireEvent.click(submitButton)

  const receivedObject = mockHandler.mock.calls[0][0]
  expect(receivedObject).toEqual(expectedObject)
})