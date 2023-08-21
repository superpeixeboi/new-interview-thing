import { describe, expect, it } from 'vitest';


import { render, screen } from '@testing-library/react'
import ContentFormLayuot from '../ContentFormPage/ContentFormLayout'

describe('With no content', () => {
  render(<ContentFormLayuot { ...EMPTY_PROPS }/>)

  it('should render all fields', () => {
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('coverImage')).toBeInTheDocument()
    expect(screen.getByTestId('link')).toBeInTheDocument()
    expect(screen.getByTestId('body')).toBeInTheDocument()
    expect(screen.getByTestId('access')).toBeInTheDocument()
  })
})

const EMPTY_PROPS = {
  content: {},
  setContent: () => {},
  message: {},
  setMessage: () => {},
  submit: () => {}
}
