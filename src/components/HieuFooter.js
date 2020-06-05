import React, { Component } from 'react'

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
                        <img
                            src="https://library.kissclipart.com/20181116/tq/kissclipart-github-octocat-clipart-github-inc-d75c5e491a5ca190.jpg"
                            width="35px"
                            height="35px"
                            alt="githublogo"
                        />
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
