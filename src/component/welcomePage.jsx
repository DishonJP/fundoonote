import React, { Component } from 'react'
class WelcomePage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="content_decor">
                <h1 className="appname2_decor">Fundoonote</h1>
                    <span className="data_Decor">Created by DishonJp</span>
                <div>
                        <button
                            onClick={() => {
                                this.props.history.push("/registration")
                            }}
                            className="button1">sign up</button>
                        <button 
                            onClick={() => {
                                this.props.history.push("/login")
                            }}
                            className="button2">sign in</button>
                    </div>
                    </div>
            </div>
        )
    }
}
export default WelcomePage