import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, keywords, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keywords' content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  keywords: 'Electronics , Buy Electronics , cheap Electronics ',
  description: 'We sell best products for Cheap price ',
}
export default Meta
