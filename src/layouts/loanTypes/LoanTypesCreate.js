import React, {useState} from 'react';
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../components/SoftBox";
import Card from "@mui/material/Card";
import SoftTypography from "../../components/SoftTypography";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {useCreateLoanTypeMutation} from "../../store/api/loanTypeApi";
import LoanTypeForm from "./components/LoanTypeForm";
import SoftAlert from "../../components/SoftAlert";

const LoanTypesCreate = () => {
    const [createLoanType, {isLoading, isError, isSuccess, error}] = useCreateLoanTypeMutation();

    const handleSubmit = (loanType) => {
        createLoanType(loanType);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SoftBox py={3}>
                <Card py={3}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Create loan type</SoftTypography>
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
                        <LoanTypeForm
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            isError={isError}
                            error={error}
                            isSuccess={isSuccess}
                        />
                    </SoftBox>
                </Card>
            </SoftBox>
            {/*<Footer />*/}
        </DashboardLayout>
    );
};

export default LoanTypesCreate;