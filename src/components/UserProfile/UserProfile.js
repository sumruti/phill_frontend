import React, { Component } from "react";
import "./UserProfile.css";
// import avatar_img from './Resources/user_profile_avatar.png';

class UserProfile extends Component {
  render() {
    return (
      <div className="user_profile" onClick={this.props.toggleReg}>
        <img
          className="user_profile_avatar"
          src={"https://img.icons8.com/ios/25/ffffff/user-male-circle.png"}
          alt="user profile avatar"
        />
        <h3 className="user_profile_name">{`Sign Up!`}</h3>
        {/* <h3 className='user_profile_name'>{`Hello ${this.props && this.props.name ? this.props.name : 'John!'}`}</h3> */}
      </div>
    );
  }
}

export default UserProfile;
