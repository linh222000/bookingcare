import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUser, deleteUserService, editUserService } from '../../../services/userService';
import { toast } from 'react-toastify'

export const fetchGenderStart =  () => {
    // type: actionTypes.ADMIN_GENDER_START
    return async(dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.users.reverse()))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e)
        }
    }
}

export const fetchPositionStart =  () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e)
        }
    }
}

export const fetchRoleStart =  () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e)
        }
    }
}
export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await createNewUserService(data) ;
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed !')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchAllUserStart =  () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllUser("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users))
            } else {
                toast.error('fetch all user failed !')
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error('fetch all user failed !')
            dispatch(fetchAllUserFailed());
            console.log(e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteAUser = (userId) => {
    return async(dispatch, getState) => {
        try {
            let res = await deleteUserService(userId) ;
            if (res && res.errCode === 0) {
                toast.success('delete the user succeed !')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('delete the user failed !')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log(e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editAUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await editUserService(data) ;
            if (res && res.errCode === 0) {
                toast.success('update the user succeed !')
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('update the user failed !')
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log(e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

