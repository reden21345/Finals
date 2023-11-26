import React, { Fragment, useEffect } from 'react';

import MetaData from './layout/MetaData';
import Coffee from './coffee/Coffee';

import {useDispatch, useSelector} from 'react-redux';

import { getCoffees } from '../actions/coffeeActions';

const Home = () => {

    const disptach = useDispatch();

    const { loading, coffees, error, coffeeCount } = useSelector(state => state.coffees)

    useEffect( () => {
        disptach(getCoffees());
    }, [disptach])

  return (
    <Fragment>
        {loading? <h1>Loading...</h1> : (
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