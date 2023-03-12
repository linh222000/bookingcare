import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService'
import { all } from 'axios';
import NumberFormat from 'react-number-format'

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    async componentDidMount() {
    }
    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
        }
        
    }
    showHideDetaiInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let {isShowDetailInfor, extraInfor} = this.state
        let {language} = this.props
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa chỉ khám</div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            Giá Khám: 
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                && 
                                <NumberFormat 
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                                }
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                && 
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                                }
                            <span 
                                className='detail'
                                onClick={() => this.showHideDetaiInfor(true)}
                            >
                                Xem chi tiết
                            </span>
                        </div>                    
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>Giá khám:</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                        && 
                                        <NumberFormat 
                                            className="currency"
                                            value={extraInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                        }
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                        && 
                                        <NumberFormat
                                            className="currency"
                                            value={extraInfor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>Người bệnh có thể thanh toán bằng:
                                {extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueVi : ''}
                            </div>
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
