import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCoffees, deleteCoffee, ClearErrors } from '../../actions/coffeeActions'
import { DELETE_COFFEE_RESET } from '../../constants/coffeeConstants'

const CoffeesList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, coffees } = useSelector(state => state.coffees);
    const { error: deleteError, isDeleted } = useSelector(state => state.coffee)

    useEffect(() => {
        dispatch(getAdminCoffees());

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(ClearErrors())
        }

        if (isDeleted) {
            alert.success('Coffee deleted successfully');
            navigate('/admin/coffees');
            dispatch({ type: DELETE_COFFEE_RESET })
        }

    }, [dispatch, alert, error, navigate, deleteError, isDeleted])

    const setcoffees = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        coffees.forEach(coffee => {
            data.rows.push({
                id: coffee._id,
                name: coffee.name,
                price: `$${coffee.price}`,
                stock: coffee.stock,
                actions: <Fragment>
                    <Link to={`/admin/coffee/${coffee._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteCoffeeHandler(coffee._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteCoffeeHandler = (id) => {
        dispatch(deleteCoffee(id))
    }

    return (
        <Fragment>
            <MetaData title={'All coffees'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All coffees</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setcoffees()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default CoffeesList
