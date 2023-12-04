import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCoffeeReviews, ClearErrors } from '../../actions/coffeeActions'
// import { DELETE_REVIEW_RESET } from '../../constants/coffeeConstants'

const CoffeeReviews = () => {

    const [coffeeId, setCoffeeId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.coffeeReviews);
    // const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(ClearErrors())
        // }

        if (coffeeId !== '') {
            dispatch(getCoffeeReviews(coffeeId))
        }

        // if (isDeleted) {
        //     alert.success('Review deleted successfully');
        //     dispatch({ type: DELETE_REVIEW_RESET })
        // }



    }, [dispatch, alert, error, coffeeId])

    // const deleteReviewHandler = (id) => {
    //     dispatch(deleteReview(id, coffeeId))
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getCoffeeReviews(coffeeId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2">
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'coffee Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="coffeeId_field">Enter coffee ID</label>
                                        <input
                                            type="text"
                                            id="coffeeId_field"
                                            className="form-control"
                                            value={coffeeId}
                                            onChange={(e) => setCoffeeId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
								    </button>
                                </ form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                                <p className="mt-5 text-center">No Reviews.</p>
                            )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default CoffeeReviews
