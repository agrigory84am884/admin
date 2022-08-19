import React, {useEffect, useState} from 'react';
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../components/SoftBox";
import Card from "@mui/material/Card";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import SoftButton from "../../components/SoftButton";
import {useGetLoanTypeQuery, useUpdateLoanTypeMutation} from "../../store/api/loanTypeApi";
import SoftAlert from "../../components/SoftAlert";
import * as PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import LoanTypeForm from "./components/LoanTypeForm";

function LoadingOverlay(props) {
    return null;
}

LoadingOverlay.propTypes = {
    active: PropTypes.any,
    text: PropTypes.string,
    spinner: PropTypes.bool,
    children: PropTypes.node
};
const LoanTypesUpdate = () => {
    const params = useParams();
    const {data, isError, error, isLoading} = useGetLoanTypeQuery(params.id);
    const [updateLoanType, updateHandlers] = useUpdateLoanTypeMutation();

    const handleSubmit = (loanType) => {
        updateLoanType({
            id: params.id,
            loanType
        });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SoftBox py={3}>
                <Card py={3}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Update loan type</SoftTypography>
                    </SoftBox>
                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                        p={3}
                    >
                        {
                            isLoading ?
                                <h1>Loading</h1>
                            : isError ?
                                <SoftAlert color="error" dismissible>{`Error ${error.data.message}`}</SoftAlert>
                            :
                                <LoanTypeForm
                                    loanType={data.payload}
                                    onSubmit={handleSubmit}
                                    isError={updateHandlers.isError}
                                    isSuccess={updateHandlers.isSuccess}
                                    error={updateHandlers.error}
                                    isLoading={updateHandlers.isLoading}
                                />
                        }
                    </SoftBox>
                </Card>
            </SoftBox>
            {/*<Footer />*/}
        </DashboardLayout>
    );
};

export default LoanTypesUpdate;