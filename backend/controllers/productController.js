import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc get all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc get product by ID
// @route GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

// @desc DELETE product by id
// @route DELETE /api/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'product removed ' })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

// @desc create sample product
// @route POST /api/products
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample product name',
    price: 0,
    category: 'sample product category',
    numReviews: 0,
    description: 'sample product description',
    brand: 'sample brand',
    image: '/images/sample.jpg',
    countInStock: 0,
    user: req.user._id,
  })

  const createdProduct = await product.save()
  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(500)
    throw new Error('some error happened , please try again ')
  }
})

// @desc update sample product
// @route PUT /api/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description, brand, image, countInStock } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.category = category
    product.description = description
    product.image = image
    product.brand = brand
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    if (updatedProduct) {
      res.status(201).json(updatedProduct)
    }
  } else {
    res.status(404)
    throw new Error('product not found ')
  }
})

// @desc create product review
// @route PUT /api/products/:id/reviews
// @access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      // bad request
      res.status(400)
      throw new Error('already reviewed')
    }
    const review = {
      name: req.user.name,
      comment,
      rating: Number(rating),
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save()
    // new resource created
    res.status(201).json({ message: 'review successfully added' })
  } else {
    res.status(404)
    throw new Error('product not found ')
  }
})

// @desc get top products
// @route GET /api/products/top
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  //  sort:-1 mean sort ascending
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
