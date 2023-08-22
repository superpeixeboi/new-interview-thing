import { BrowserRouter } from 'react-router-dom';
// import { describe, expect, test, it } from 'vitest';
import { render, screen } from '@testing-library/react'

import ContentFormLayuot from '../ContentFormPage/ContentFormLayout'

describe('The Content Form', () => {
  test('rendered with empty content', () => {
    render(<ContentFormLayuot { ...EMPTY_PROPS }/>, { wrapper: BrowserRouter })
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('coverImage')).toBeInTheDocument()
    expect(screen.getByTestId('link')).toBeInTheDocument()
    expect(screen.getByTestId('body')).toBeInTheDocument()
    expect(screen.getByTestId('access')).toBeInTheDocument()
  })
  // it('should display all fields', () => {
  // })
})

const EMPTY_PROPS = {
  content: {},
  setContent: () => {},
  message: {},
  setMessage: () => {},
  submit: () => {}
}
