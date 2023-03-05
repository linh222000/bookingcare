import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'


class HomeFooter extends Component {
    
    render() {
        // truyền props cho ảnh specialty
        
        
        return (
            <div className='home-footer'>
                <p>&copy; 2023 LinhDev.com <a href='#'>More infomation</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
