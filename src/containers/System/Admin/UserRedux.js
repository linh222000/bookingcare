import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class UserRedux extends Component {

    constructor (props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        let genders= this.state.genderArr;
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    User redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới người dùng</div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type="email"/>
                            </div>
                            <div className='col-3'>
                                <label>Password</label>
                                <input className='form-control' type="password"/>
                            </div>
                            <div className='col-3'>
                                <label>First name</label>
                                <input className='form-control' type="text"/>
                            </div>
                            <div className='col-3'>
                                <label>Last name</label>
                                <input className='form-control' type="text"/>
                            </div>
                            <div className='col-3'>
                                <label>Phone number</label>
                                <input className='form-control' type="text"/>
                            </div>
                            <div className='col-9'>
                                <label>Address</label>
                                <input className='form-control' type="text"/>
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Position</label>
                                <select className='form-control'>
                                    <option select>Chose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleID</label>
                                <select className='form-control'>
                                    <option select>Chose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Image</label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'>Save</button>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
