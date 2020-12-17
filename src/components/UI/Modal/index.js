import React from 'react';

import styles from './style.module.css';
import Backdrop from '../Backdrop';

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default React.memo(Modal, (prevProps, nextProps) => {
    if (prevProps.show === nextProps.show && prevProps.children === nextProps.children) {
        return true;
    }
    return false;
});