import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Coffee from './coffee/Coffee';

import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import { getCoffees } from '../actions/coffeeActions';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 500]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const categories = [
        'Americano',
        'Black Coffee',
        'Cappuccino',
        'Espresso',
        'Latte',
        'Macchiato',
        "Mocha",
        'Cold Brew',
        'Frappuccino',
        'Iced Coffee',
        'Affogato',
        'Mazagran'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, coffees, error, coffeeCount, resPerPage, filteredCoffeesCount } = useSelector(state => state.coffees);

    const { keyword } = useParams();

    useEffect( () => {

        if(error) {
            // alert.success('Success');
            return alert.error(error)
        }

        dispatch(getCoffees(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = coffeeCount
    if (keyword) {
        count = filteredCoffeesCount
    }

  return (
    <Fragment>
        {loading? <Loader /> : (
            <Fragment>
                <MetaData title={'Buy Best Coffee Online'} />
                <h1 id="coffees_heading">Popular Coffee</h1>

                <section id="coffees" className="container mt-5">
                    <div className="row">

                        {keyword ? (
                            <Fragment>
                                <div className='col-6 col-md-3 mt-5 mb-5'>
                                    <div className='px-5'>
                                        <Range
                                            marks={{
                                                1: `$1`,
                                                500
                                        : `$500
                                        `
                                            }} 
                                            min={1}
                                            max={500
                                    }
                                            defaultValue={[1, 500
                                    ]}
                                            tipFormatter={value => `$${value}`}
                                            tipProps={{
                                                placement: "top",
                                                visible: true
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />
                                    </div>

                                    <hr className="my-5" />
                                    <div className="mt-5">
                                        <h4 className="mb-3">
                                            Categories
                                        </h4>
                                        <ul className="pl-0">
                                            {categories.map(category => (
                                                <li
                                                    style={{
                                                        cursor: 'pointer',
                                                        listStyleType: 'none'
                                                    }}
                                                    key={category}
                                                     onClick={() => setCategory(category)}
                                                >
                                                    {category}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <hr className="my-3" />
                                    <div className="mt-5">
                                        <h4 className="mb-3">
                                            Ratings
                                        </h4>
                                        <ul className="pl-0">
                                            {[5,4,3,2,1].map(star => (
                                                <li
                                                    style={{
                                                        cursor: 'pointer',
                                                        listStyleType: 'none'
                                                    }}
                                                    key={star}
                                                     onClick={() => setRating(star)}
                                                >
                                                    <div className='rating-outer'>
                                                        <div className='rating-inner'
                                                            style={
                                                                {width: `${star * 20}%`}
                                                            }
                                                        >

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-6 col-md-9'>
                                    <div className='row'>
                                        {coffees.map(coffee => (
                                            <Coffee key={coffee._id} coffee={coffee} col={4} />
                                        ))}
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            coffees.map(coffee => (
                                <Coffee key={coffee._id} coffee={coffee} col={3} />
                            ))
                        )}
                
                    </div>
                </section>

                {resPerPage <= count && (
                    <div className='d-flex justify-content-center mt-5'>
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={coffeeCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
                )}
            </Fragment>
        )}
    </Fragment>
  )
}

export default Home