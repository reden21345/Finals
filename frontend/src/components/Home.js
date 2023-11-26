import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Coffee from './coffee/Coffee';

import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import { getCoffees } from '../actions/coffeeActions';


const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, coffees, error, coffeeCount, resPerPage } = useSelector(state => state.coffees);

    const { keyword } = useParams();

    useEffect( () => {

        if(error) {
            // alert.success('Success');
            return alert.error(error)
        }

        dispatch(getCoffees(keyword, currentPage));

    }, [dispatch, alert, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

  return (
    <Fragment>
        {loading? <Loader /> : (
            <Fragment>
                <MetaData title={'Buy Best Coffee Online'} />
                <h1 id="coffees_heading">Popular Coffee</h1>

                <section id="coffees" className="container mt-5">
                    <div className="row">

                        {coffees && coffees.map(coffee => (
                            <Coffee key={coffee._id} coffee={coffee} />
                        ))}
                
                    </div>
                </section>

                {resPerPage <= coffeeCount && (
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