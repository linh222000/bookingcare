import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageDoctor.scss'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            // save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object) 
            })
        }
        return result;
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors, 'USERS') {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
      }
    handleSaveContentmarkdown = () => {
        let {hasOldData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInforDoctor(selectedOption)
        if (res && res.errCode === 0 && res.data && res.data.Markdow) {
            let markdown = res.data.Markdow;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        //   console.log(`Option selected:`, this.state.selectedOption)
        
      };
      handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        }) 
      }
    /*lyfe cycle
    * run component:
    * 1. run contruct -> init state
    * 2. did mount (set state)
    * 3. render
    */
    render() {
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <lable>Chọn bác sĩ</lable>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placehoder={'chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right'>
                        <lable>Thông tin giới thiệu:</lable>
                        <textarea 
                            onChange={(event) => this.handleOnchangeDesc(event)} 
                            value={this.state.description} 
                            className='form-control' 
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placehoder={'Chọn giá'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placehoder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placehoder={'Chọn tỉnh thành'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='from-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='from-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='from-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button 
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"} 
                    onClick={() => this.handleSaveContentmarkdown()}
                >
                    {hasOldData === true ?
                        <span>Luu thông tin</span> : <span>Tạo thông tin</span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
