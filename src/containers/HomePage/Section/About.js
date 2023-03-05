import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'


class About extends Component {
    
    render() {
        // truyền props cho ảnh specialty
        
        
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Linh Dev
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe 
                            width="100%" 
                            height="400px" 
                            src="https://www.youtube.com/embed/fhFLEBXz3Mc" 
                            title="Học Giỏi Bất Chấp Tuổi Tác, Trình Độ, Năng Khiếu" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            >
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Nói về tình yêu thương, ai trong cuộc đời mà không có chút tình cảm dành cho cha mẹ, người thân hay bạn bè, bạn đời của mình đúng không nào? Sự thể hiện tình yêu thương của mỗi người sẽ chia thành nhiều mức độ khác nhau, cách họ cho đi và nhận lại tình thương cũng không giống nhau.
                        </p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
