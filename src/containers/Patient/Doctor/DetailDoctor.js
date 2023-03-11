import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import {getDetailInforDoctor} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
// import { redirect } from 'react-router-dom';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { detaiDoctor } = this.state;
        let {language} = this.props;
        let nameVi = '', nameEn = '';
        if (detaiDoctor && detaiDoctor.positionData) {
            nameVi = `${detaiDoctor.positionData.valueVi},  ${detaiDoctor.lastName}, ${detaiDoctor.firstName}`;
            nameEn = `${detaiDoctor.positionData.valueEn}, ${detaiDoctor.firstName}, ${detaiDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='infor-doctor'>
                        <div 
                        className='content-left'
                        style={{ backgroundImage: `url(${detaiDoctor && detaiDoctor.image ? detaiDoctor.image : ''})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {/* Phó giáo sư Linh Dev */}
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detaiDoctor && detaiDoctor.Mardown && detaiDoctor.Mardown.description
                                    &&
                                    <span>
                                        {detaiDoctor.Mardown.description}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className='schedule-doctor'>
                                <div className='content-left'>
                                    <DoctorSchedule 
                                        doctorIdFromParent={this.state.currentDoctorId}
                                    />
                                </div>
                                <div className='content-right'></div>
                        </div>
                        <div className='detail-infor-doctor'>
                                {detaiDoctor && detaiDoctor.Mardown.contentHTML
                                    &&
                                        <div dengerouslySetInnerHTML={{__html: detaiDoctor.Mardown.contentHTML}}>

                                        </div>
                                }
                        </div>
                        <div className='comment-doctor'>

                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
