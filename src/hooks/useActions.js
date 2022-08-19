import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "../store/reducers/authSlice";

function useActions () {
    const dispatch = useDispatch();
    const allActions = {
        ...authActions
    };

    return bindActionCreators(allActions, dispatch);
}

export default useActions;