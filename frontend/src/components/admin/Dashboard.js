import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getAdminCoffees } from '../../actions/coffeeActions';
import { allOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';

// Charts
import CoffeeSalesChart from './CoffeeSalesChart';
import UserSalesChart from './UserSalesChart';
import MonthlySalesChart from './MonthlySalesChart';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { coffees } = useSelector(state => state.coffees)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    coffees.forEach(coffee => {
        if (coffee.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminCoffees())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? <Loader/> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Coffees<br /> <b>
                                            {coffees && coffees.length} </b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/coffees">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock} </b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/><br/>
                        </Fragment>
                    )}

                    <Fragment>
                        <div className="text-center card-font-size">Coffee Sales Chart<br />
                            <CoffeeSalesChart />
                        </div>
                    </Fragment>
                    <Fragment>
                        <div className="text-center card-font-size">User Sales Chart<br />
                            <UserSalesChart />
                        </div>
                    </Fragment>
                    <Fragment>
                        <div className="text-center card-font-size">Monthly Sales Chart<br />
                            <MonthlySalesChart />
                        </div>
                    </Fragment>

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard
