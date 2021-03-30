import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <Form inline onSubmit={submitHandler}>
        <Form.Control
          type='text'
          placeholder='search for product .. '
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='mr-sm-2 ml-sm-5'></Form.Control>
        <Button className='p-2' variant='outline-success' type='submit'>
          Search
        </Button>
      </Form>
    </>
  )
}

export default SearchBox
