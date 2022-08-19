/* eslint-disable react/prop-types */

import React from 'react';
import {Link} from "react-router-dom";
import SoftButton from "../SoftButton";
import {Delete, Edit} from "@mui/icons-material";

const TableActions = ({updateRoute, handleDelete}) => {
    return (
        <div>
            {
                updateRoute &&
                <Link to={updateRoute}>
                    <SoftButton variant="gradient" color="info" iconOnly>
                        <Edit />
                    </SoftButton>
                </Link>
            }
            {
                handleDelete &&
                <SoftButton variant="gradient" color="error" iconOnly onClick={handleDelete}>
                    <Delete />
                </SoftButton>
            }
        </div>
    );
};

export default TableActions;