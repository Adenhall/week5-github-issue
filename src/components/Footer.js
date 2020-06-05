import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/footer.css'
export default class HieuFooter extends Component {
    render() {
        return (
            <div>
                <div style={{ height: 100, backgroundColor: "white" }}>
            <div className="container py-3">
                <div className="row">
                    <div className="col">
                        <ul className="footer-list">
                            <li>&copy;&nbsp;GitHub,&nbsp;Inc.</li>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Security</a></li>
                            <li><a href="#">Status</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                    <div className="col d-none d-lg-block">
                    </div>
                    <div className="col">
                        <ul className="footer-list">
                            <li><a href="#">Contact&nbsp;GitHub</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">API</a></li>
                            <li><a href="#">Training</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            </div>
        )
    }
}
