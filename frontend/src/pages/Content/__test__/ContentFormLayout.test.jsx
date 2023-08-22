import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react'

import ContentFormLayuot from '../ContentFormPage/ContentFormLayout'
import { EMPTY_PROPS, FULL_PROPS } from './contentMock'

describe('Empty Content Form', () => {
  test('should render display empty fields', () => {
    render(<ContentFormLayuot { ...EMPTY_PROPS }/>, { wrapper: BrowserRouter })
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('coverImageField')).toBeInTheDocument()
    expect(screen.getByTestId('link')).toBeInTheDocument()
    expect(screen.getByTestId('body')).toBeInTheDocument()
    expect(screen.getByTestId('access')).toBeInTheDocument()
  }) 
})

describe('Filled ContentForm', () => {
  test('should have filled fields', () => {
    render(<ContentFormLayuot { ...FULL_PROPS }/>, { wrapper: BrowserRouter })
    expect(screen.getByTestId('title')).toHaveValue(FULL_PROPS.content.title)
    expect(screen.getByTestId('coverImage').src).toBe(FULL_PROPS.content.coverImage)
    expect(screen.getByTestId('link')).toHaveValue(FULL_PROPS.content.link)
    expect(screen.getByTestId('body')).toHaveTextContent('Olá Jovens')
    expect(screen.getByTestId('public').selected).toBe(true)
  })
})
