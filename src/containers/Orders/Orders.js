import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        fetch('https://react-burger-id.firebaseio.com/orders.json')
        .then(response => {
            if (!response.ok) {
                throw Error(`${response.statusText}, ${response.status}`);
            }
            return response.json()
        })
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
        .catch(error => {
            this.setState({loading: false, error: error});
        });
    }

    errorConfirmedHandler = () => {
        this.setState({ error: null });
    }

    render() {
        let result;
        if (this.state.error !== null) {
            result = <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                {this.state.error.message ? this.state.error.message : null}
            </Modal>
        } else {
            result = this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
        }

        return (
            <React.Fragment>
                {result}
            </React.Fragment>
        );
    }
}

export default Orders;