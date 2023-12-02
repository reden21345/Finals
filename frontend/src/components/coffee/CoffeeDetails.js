import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getCoffeeDetails, ClearErrors } from '../../actions/coffeeActions';
import { addItemToCart } from '../../actions/cartActions';

const CoffeeDetails = () => {

  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading, error, coffee} = useSelector(state => state.coffeeDetails)

  useEffect(() => {

    dispatch(getCoffeeDetails(id))

    if(error) {
      alert.error(error)
      dispatch(ClearErrors())
    }

  }, [dispatch, alert, error, id])

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success('Coffee Added to Cart')
  }

  const increaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber >= coffee.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={coffee.name}/>
          <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause='hover'>
                {coffee.images && coffee.images.map(image => (
                  <Carousel.Item key={image.public_id}>
                    <img className="d-block w-100" src={image.url} alt={coffee.title} />
                  </Carousel.Item>
                ))}
              </Carousel>
          </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{coffee.name}</h3>
            <p id="product_id">Product # {coffee._id}</p>

            <hr/>

            <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${coffee.ratings / 5 * 100}%`}}></div>
            </div>
            <span id="no_of_reviews">({coffee.numOfReviews} Reviews)</span>

            <hr/>

            <p id="product_price">${coffee.price}</p>
            <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
             <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={coffee.stock === 0} onClick={addToCart} >Add to Cart</button>

            <hr/>

            <p>Status: <span id="stock_status" className={coffee.stock > 0 ? 'greenColor' : 'redColor'}>{coffee.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

            <hr/>

            <h4 className="mt-2">Description:</h4>
            <p>{coffee.description}</p>
            <hr/>
            <p id="product_seller mb-3">Sold by: <strong>{coffee.seller}</strong></p>
    
    <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                        Submit Your Review
            </button>
    
    <div className="row mt-2 mb-5">
                <div className="rating w-50">

                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <ul className="stars" >
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                    </ul>

                                    <textarea name="review" id="review" className="form-control mt-3">

                                    </textarea>

                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        
        </div>

    </div>

</div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default CoffeeDetails