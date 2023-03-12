import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService'
import { all } from 'axios';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }
    async componentDidMount() {
    }
    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
        
    }
    showHideDetaiInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let {isShowDetailInfor} = this.state
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa chỉ khám</div>
                    <div className='name-clinic'>fasdfsadg</div>
                    <div className='detail-address'>vzxvzxcv</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>Giá Khám: 250.000đ. <span onClick={() => this.showHideDetaiInfor(true)}>Xem chi tiết</span></div>                    
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>Giá khám:</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250000</span>
                                </div>
                                <div className='note'>uu tien dat lich</div>
                            </div>
                            <div className='payment'>thanh toan bang the hoac tien mat</div>
                            <div className='hide-price'><span onClick={() => this.showHideDetaiInfor(false)}>Ẩn bảng giá</span></div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
