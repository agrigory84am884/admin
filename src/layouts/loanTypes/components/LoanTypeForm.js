/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";
import SoftAlert from "../../../components/SoftAlert";

const LoanTypeForm = ({ loanType, onSubmit, isLoading, isError, error, isSuccess }) => {
    const [name, setName] = useState(loanType?.name || '');
    const [monthsCount, setMonthsCount] = useState(loanType?.months_count || 0);
    const [monthlyPercentage, setMonthlyPercentage] = useState(loanType?.monthly_percentage || 0);
    const [providingPercentage, setProvidingPercentage] = useState(loanType?.providing_percentage || 0);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit({
            name: name,
            months_count: monthsCount,
            monthly_percentage: monthlyPercentage,
            providing_percentage: providingPercentage
        });
    }

    return (
        <form>
            {
                isLoading &&
                <h1>Loading</h1>
            }
            {
                isError &&
                <SoftAlert color="error" dismissible>{error.data.message}</SoftAlert>
            }
            {
                isSuccess &&
                <SoftAlert color="success" dismissible>Changed completed successfully</SoftAlert>
            }
            <label>
                Name
                <SoftInput
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label>
                Months count
                <SoftInput
                    placeholder="Months count"
                    type="number"
                    onChange={(e) => setMonthsCount(e.target.value)}
                    value={monthsCount}
                />
            </label>
            <label>
                Monthly percentage
                <SoftInput
                    placeholder="Monthly percentage"
                    type="number"
                    onChange={(e) => setMonthlyPercentage(e.target.value)}
                    value={monthlyPercentage}
                />
            </label>
            <label>
                Loan collateral ratio
                <SoftInput
                    placeholder="Provided percentage"
                    type="number"
                    onChange={(e) => setProvidingPercentage(e.target.value)}
                    value={providingPercentage}
                />
            </label>
            <SoftButton color="success" onClick={handleSubmit}>Submit</SoftButton>
        </form>
    );
};

export default LoanTypeForm;