import React, { Fragment, useEffect } from 'react';

import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Coffee from './coffee/Coffee';

import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import { getCoffees } from '../actions/coffeeActions';


const Home = () => {

    const alert = useAlert();
    const disptach = useDispatch();

    const { loading, coffees, error, coffeeCount } = useSelector(state => state.coffees)

    useEffect( () => {

        if(error) {
            // alert.success('Success');
            return alert.error(error)
        }

        disptach(getCoffees());

    }, [disptach, alert, error])

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
            </Fragment>
        )}
    </Fragment>
  )
}

export default Home