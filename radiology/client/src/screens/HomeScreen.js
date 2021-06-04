import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Nav } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta title='Radiology Dept' />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Our Services</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Row>
        <LinkContainer to='/patientform'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Register Patient Form
                  </Nav.Link>
                </LinkContainer>
        </Row>
        <Row>
        <LinkContainer to='/admin/patientlist'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Patient List
                  </Nav.Link>
                </LinkContainer>
        </Row>
        <Row>
        <LinkContainer to='/admin/transactionlist'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> See Patient Transaction History
                  </Nav.Link>
                </LinkContainer>
        </Row>
          {/* <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  )
}

export default HomeScreen
