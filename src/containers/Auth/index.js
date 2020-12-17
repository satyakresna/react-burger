import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import styles from './style.module.css';

function parseJSON(response) {
    return new Promise((resolve) => response.json()
    .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json
    })));
}

function request(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(parseJSON)
            .then(response => {
                if (response.ok) {
                    return resolve(response.json);
                }
                return reject(response.json);
            })
            .catch(error => reject({
                networkError: error.message
            }))
    })
}

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true,
        token: null,
        userId: null,
        error: null,
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
    
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {
            returnSecureToken: true
        };
        for (let formElementIdentifier in this.state.controls) {
            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        if (!this.state.isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        }
        // cheat
        request(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData),
            mode: 'cors'
        })
        .then(result => {
            localStorage.setItem('token', result.idToken);
            this.setState({
                userId: result.localId,
                token: result.idToken,
                loading: false,
                error: null
            });
            // Update state in grand parent
            this.props.toggleLoggedIn();
        })
        .catch(err => {
            this.setState({
                userId: null,
                token: null,
                error: err.error,
                loading: false
            });
        });
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <p>{this.state.error.message}</p>
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger"
                clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

export default Auth;