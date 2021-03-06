import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'
const initialState = {
  products: [],
}

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      }
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

const productInitialState = {
  product: {
    reviews: [],
  },
}

export const productDetailsReducer = (state = productInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { success: true, loading: false }
    case PRODUCT_DELETE_FAIL:
      return { error: payload, loading: false }

    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { success: true, loading: false, product: payload }
    case PRODUCT_CREATE_FAIL:
      return { error: payload, loading: false }
    case PRODUCT_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { success: true, loading: false, product: payload }
    case PRODUCT_UPDATE_FAIL:
      return { error: payload, loading: false }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }

    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { success: true, loading: false }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { error: payload, loading: false }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}

    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: payload }
    case PRODUCT_TOP_FAIL:
      return { error: payload, loading: false }

    default:
      return state
  }
}
