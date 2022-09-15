import React, { useEffect, useState } from 'react';
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../components/SoftBox";
import Card from "@mui/material/Card";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import SoftButton from "../../components/SoftButton";
import * as PropTypes from "prop-types";
import { useGetSettingsQuery } from 'store/api/settingApi';
import { useUpdateSettingMutation } from 'store/api/settingApi';
import SoftAlert from 'components/SoftAlert';

function LoadingOverlay(props) {
    return null;
}

LoadingOverlay.propTypes = {
    active: PropTypes.any,
    text: PropTypes.string,
    spinner: PropTypes.bool,
    children: PropTypes.node
};
const SettingsIndex = () => {
    const { data, isError, error, isLoading, isSuccess, refetch } = useGetSettingsQuery();
    const [commisionFee, setCommisionFee] = useState()
    const [maxLoanAmount, setMaxLoanAmount] = useState()
    const [pledgeAmount, setPledgeAmount] = useState()
    const [penaltyFee, setPenaltyFee] = useState()
    const [inpValues, setInputValues] = useState({
        commisionFee: commisionFee,
        maxLoanAmount: maxLoanAmount,
        pledgeAmount: pledgeAmount,
        penaltyFee: penaltyFee,
    })
    // const { dataUpd, isErrorUpd, errorUpd, isLoadingUpd, isSuccessUpd, refetchUpd } = useUpdateSettingMutation(inpValues);
    const [updateLoanType, updateHandlers] = useUpdateSettingMutation();

    useEffect(() => {
        setInputValues({
            commisionFee: commisionFee,
            maxLoanAmount: maxLoanAmount,
            pledgeAmount: pledgeAmount,
            penaltyFee: penaltyFee,
        })

    }, [commisionFee, maxLoanAmount, pledgeAmount, penaltyFee])

    const handleSubmit = ({ max_pledge_amount, max_loan_amount, penalty_fee, commission_fee, }) => {
        updateLoanType({
            max_pledge_amount: max_pledge_amount, max_loan_amount: maxLoanAmount, penalty_fee: penaltyFee, commission_fee: commisionFee
        });
    }
    console.log(updateHandlers);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <Card py={3}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h4">Settings</SoftTypography>
                        {/* <SoftButton onClick={updateSettnigsBtn}> Update </SoftButton> */}
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
                            isLoading &&
                            <h1>Loading</h1>
                        }
                        {
                            isError &&
                            <SoftAlert color="error" dismissible>{error.data.message}</SoftAlert>
                        }
                        {
                            updateHandlers.isSuccess &&
                            <SoftAlert color="success" dismissible>Changed completed successfully</SoftAlert>
                        }
                        {
                            !isLoading &&
                            <form>

                                <label>
                                    Commision Fee (%)
                                    <SoftInput
                                        placeholder={data?.payload.commission_fee}
                                        onChange={(e) => setCommisionFee(e.target.value)}
                                        // value={data?.data?.payload.commission_fee}
                                        type='number'
                                    />
                                </label>
                                <label>
                                    Max Loan Amount
                                    <SoftInput
                                        placeholder={data?.payload.max_loan_amount}
                                        type="number"
                                        onChange={(e) => setMaxLoanAmount(e.target.value)}
                                    // value={data?.data?.payload.max_loan_amount}
                                    />
                                </label>
                                <label>
                                    Max pledge amount
                                    <SoftInput
                                        placeholder={data?.payload.max_pledge_amount}
                                        type="number"
                                        onChange={(e) => setPledgeAmount(e.target.value)}
                                    // value={data?.data?.payload.max_pledge_amount}

                                    />
                                </label>
                                <label>
                                    Penalty fee (%)
                                    <SoftInput
                                        placeholder={data?.payload.penalty_fee}
                                        type="number"
                                        onChange={(e) => setPenaltyFee(e.target.value)}
                                    // value={data?.data?.payload.penalty_fee}

                                    />
                                </label>
                                <SoftButton color="success" onClick={handleSubmit}>Submit</SoftButton>
                            </form>
                        }
                    </SoftBox>

                </Card>
            </SoftBox>
            {/*<Footer />*/}
        </DashboardLayout>
    );
};

export default SettingsIndex;