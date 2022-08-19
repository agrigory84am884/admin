import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import Card from "@mui/material/Card";
import DataTable from "react-data-table-component";
import {useGetTransactionsQuery} from "../../store/api/transactionApi";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";
import useDebounce from "../../hooks/useDebounce";

const columns = [
    {
        name: 'Type',
        selector: row => row.type,
        dataName: 'type',
        sortable: true
    },
    {
        name: 'Buy sum',
        selector: row => row.buy_sum,
        dataName: 'buy_sum',
        sortable: true
    },
    {
        name: 'Sell sum',
        selector: row => row.sell_sum,
        dataName: 'sell_sum',
        sortable: true
    },
    {
        name: 'Buy currency',
        selector: row => row.buy_currency,
        dataName: 'buy_currency',
        sortable: true
    },
    {
        name: 'Sell currency',
        selector: row => row.sell_currency,
        dataName: 'sell_currency',
        sortable: true
    },
    {
        name: 'Actions',
        selector: row => row.actions,
        sortable: false
    }
];

const TransactionsTable = () => {
    const [options, setOptions] = useState({
        orderField: '',
        orderDirection: '',
        page: 1,
        limit: 10,
        search: ''
    });
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const {data, isError, error, isLoading, refetch} = useGetTransactionsQuery(options);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!data?.payload) {
            return ;
        }

        const newData = data.payload.rows.map(item => {
            return {
                ...item,
                actions: <SoftButton key={item.id} onClick={() => {handleButtonClick(item.id)}}>Action</SoftButton>
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

    const handleButtonClick = (id) => {
        alert(id);
    }

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

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SoftBox py={3}>
                <Card p={3}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Transactions table</SoftTypography>
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

export default TransactionsTable;