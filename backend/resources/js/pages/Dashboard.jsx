import React from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
    function test() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer 5|hkLO5Bycie59YLQ0oAtdyxAoCOspy1w2hY21lqyD`,
            },
        };
        axios
            .get("http://127.0.0.1:8000/api/users", config)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    test();
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">
                            I'm an example component!
                        </div>
                        <FontAwesomeIcon icon={["fas", "coffee"]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

if (document.getElementById("dashboard")) {
    const Index = ReactDOM.createRoot(document.getElementById("dashboard"));

    Index.render(
        <React.StrictMode>
            <Dashboard />
        </React.StrictMode>
    );
}
