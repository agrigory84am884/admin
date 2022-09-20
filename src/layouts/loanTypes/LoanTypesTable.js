import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import Card from "@mui/material/Card";
import DataTable from "react-data-table-component";
import {useDeleteLoanTypeMutation, useGetLoanTypesQuery} from "../../store/api/loanTypeApi";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";
import SidenavCollapse from "../../examples/Sidenav/SidenavCollapse";
import {Link} from "react-router-dom"
import {Delete, Edit} from "@mui/icons-material";
import SoftAlert from "../../components/SoftAlert";
import TableActions from "../../components/TableActions";
import useDebounce from "../../hooks/useDebounce";

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        dataName: 'name',
        sortable: true
    },
    {
        name: 'Months count',
        selector: row => row.months_count,
        dataName: 'months_count',
        sortable: true
    },
    {
        name: 'Monthly percentage',
        selector: row => row.monthly_percentage,
        dataName: 'monthly_percentage',
        sortable: true
    },
    {
        name: 'Loan collateral ratio',
        selector: row => row.providing_percentage,
        dataName: 'Loan collateral ratio',
        sortable: true
    },
    {
        name: 'Actions',
        selector: row => row.actions,
        sortable: false
    }
];

const LoanTypesTable = () => {
    const [options, setOptions] = useState({
        orderField: '',
        orderDirection: '',
        page: 1,
        limit: 10,
        search: ''
    });
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const {data, isError, error, isLoading} = useGetLoanTypesQuery(options);
    const [deleteLoanType, deleteHandlers] = useDeleteLoanTypeMutation();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!data?.payload) {
            return ;
        }

        const newData = data.payload.rows.map(item => {
            return {
                ...item,
                actions: (
                    <TableActions
                        updateRoute={`/loan-types/update/${item.id}`}
                        handleDelete={() => handleDelete(item.id)}
                    />
                )
            }
        });

        setTableData(newData);
    }, [data]);

    useEffect(() => {
        setOptions({
            ...options,
            search: debouncedSearch
        });
    }, [debouncedSearch]);

    const handleSort = (column, sortDirection) => {
        setOptions({
            ...options,
            orderField: column.dataName,
            orderDirection: sortDirection
        });
    }

    const handlePerRowsChange = (newPerPage, page) => {
        setOptions({
            ...options,
            page: page,
            limit: newPerPage
        });
    }

    const handlePageChange = (page) => {
        setOptions({
            ...options,
            page: page
        });
    }

    const handleSearchChange = (evt) => {
        setSearch(evt.target.value);
    }

    const handleDelete = (id) => {
        deleteLoanType(id);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SoftBox py={3}>
                <Card p={3}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Loan Types table</SoftTypography>
                        <Link
                            to="/loan-types/create"
                        >
                            <SoftButton color="info">Create</SoftButton>
                        </Link>
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
                        px={3}
                    >
                        {
                            deleteHandlers.isSuccess &&
                            <SoftAlert color="success" dismissible>Loan Type deleted successfully</SoftAlert>
                        }
                        {
                            deleteHandlers.isError &&
                            <SoftAlert color="error" dismissible>{`Error ${deleteHandlers.error.data.message}`}</SoftAlert>
                        }
                        <SoftBox display="flex" mb={3}>
                            <SoftInput placeholder="Search" onChange={handleSearchChange}/>
                        </SoftBox>
                        {
                            isError ?
                                <h1>Error</h1>
                                :
                                data?.payload?.rows &&
                                <DataTable
                                    columns={columns}
                                    data={tableData}
                                    onSort={handleSort}
                                    sortServer
                                    pagination
                                    paginationServer
                                    paginationTotalRows={data?.payload?.count}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    onChangePage={handlePageChange}
                                    progressPending={isLoading}
                                />
                        }
                    </SoftBox>
                </Card>
            </SoftBox>
            {/*<Footer />*/}
        </DashboardLayout>
    );
};

export default LoanTypesTable;