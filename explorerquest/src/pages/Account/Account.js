import React from 'react';
import './Account.css'; // Importa il file CSS per gli stili

const Account = () => {
    return (
        <div className="account-container">
            <div className="account-header">
                <h1>Account Page</h1>
                <p>Benvenuto nella tua area personale. Questa è una pagina segnaposto per la sezione "Account".</p>
            </div>
            <div className="account-content">
                <p>Qui puoi gestire il tuo profilo, controllare le impostazioni e molto altro.</p>
            </div>
        </div>
    );
};

export default Account;
