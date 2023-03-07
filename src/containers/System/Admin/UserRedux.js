import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import TableManageUser from './TableManageUser';
// thư viện phóng to ảnh kế hiển thị ảnh
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor (props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            // dinh nghia cac bien nguoi dung
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: '',

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didupdate
        // hien tai (this) va qua khu (prev)
        // so sanh truoc sau(truoc [] va sau [3])
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            // render lai vaf so sanh tiep
            // qua khu [3] va hien tai [3] -> khong chay tiep
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            // render lai vaf so sanh tiep
            // qua khu [3] va hien tai [3] -> khong chay tiep
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            // render lai vaf so sanh tiep
            // qua khu [3] va hien tai [3] -> khong chay tiep
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                avatar: '',
                action:CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
    }
    // dùng onChange để lấy và hiển thị ảnh kế file tải ảnh
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen:true
        })
    }
    handleSaveUser = () => {
        let isValid= this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;
        if(action === CRUD_ACTIONS.CREATE) {
        // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrcheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrcheck.length; i++){
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                break;
            }
        }
        return isValid
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let genders= this.state.genderArr;
        let positions= this.state.positionArr;
        let roles= this.state.roleArr;

        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address,  gender, position, role, avatar } = this.state;
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    User redux
                </div>
                <div>{isGetGenders === true ? 'Loading genders' : ''}</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới người dùng</div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type="email" value={email} onChange={(event) => {this.onChangeInput(event, 'email')}} disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}/>
                            </div>
                            <div className='col-3'>
                                <label>Password</label>
                                <input className='form-control' type="password" value={password} onChange={(event) => {this.onChangeInput(event, 'password')}} disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}/>
                            </div>
                            <div className='col-3'>
                                <label>First name</label>
                                <input className='form-control' type="text" value={firstName} onChange={(event) => {this.onChangeInput(event, 'firstName')}}/>
                            </div>
                            <div className='col-3'>
                                <label>Last name</label>
                                <input className='form-control' type="text" value={lastName} onChange={(event) => {this.onChangeInput(event, 'lastName')}}/>
                            </div>
                            <div className='col-3'>
                                <label>Phone number</label>
                                <input className='form-control' type="text" value={phoneNumber} onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}/>
                            </div>
                            <div className='col-9'>
                                <label>Address</label>
                                <input className='form-control' type="text" value={address} onChange={(event) => {this.onChangeInput(event, 'address')}}/>
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select className='form-control' 
                                    onChange={(event) => {this.onChangeInput(event,'gender')}}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Position</label>
                                <select className='form-control' onChange={(event) => {this.onChangeInput(event,'position')}} value={position}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleID</label>
                                <select className='form-control' onChange={(event) => {this.onChangeInput(event,'role')}} value={role}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Image</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type="file" hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                    onClick={() => this.openPreviewImage()}
                                    />
                                    <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? 'Save user' : 'Save change'}   
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser 
                                    handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                    action={this.state.action}
                                />    
                            </div>
                        </div>
                    </div>
                </div>
                {/* lightbox hien thi anh */}
                {this.state.isOpen === true &&
                    <lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
