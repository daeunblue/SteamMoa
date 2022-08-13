import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="w-full h-auto">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div className={`${this.props.isMine ? "bg-sky-400 " :"bg-gray-100 "}absolute text-semibold px-3 rounded`}><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
