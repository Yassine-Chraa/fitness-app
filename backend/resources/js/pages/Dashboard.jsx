import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Dashboard() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                        <FontAwesomeIcon icon={['fas', 'coffee']} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

if (document.getElementById('dashboard')) {
    const Index = ReactDOM.createRoot(document.getElementById("dashboard"));

    Index.render(
        <React.StrictMode>
            <Dashboard/>
        </React.StrictMode>
    )
}
