import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading, size = 50, color = '#36d7b7' }) => {
    return (
        loading && (
            <div style={styles.container}>
                <ClipLoader color={color} loading={loading} size={size} />
            </div>
        )
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000,
    },
};

export default Spinner;