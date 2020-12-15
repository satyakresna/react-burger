import React, { Component } from 'react';

import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        fetch('https://react-burger-id.firebaseio.com/orders.json')
        .then(response => response.json())
        .then(data => {
            const fetchedOrders = [];
            for (let key in data) {
                fetchedOrders.push({
                    ...data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </React.Fragment>
        );
    }
}

export default Orders;