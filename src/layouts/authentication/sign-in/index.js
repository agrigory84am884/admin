/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {useEffect, useState} from "react";

// react-router-dom components
import {useNavigate} from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import useActions from "../../../hooks/useActions";
import {useLoginMutation} from "../../../store/api/authApi";
import SoftAlert from "../../../components/SoftAlert";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [login, {data, isLoading, isError, error, isSuccess}] = useLoginMutation();
  const {setTokens} = useActions();
  let navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      email,
      password
    });
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setTokens({...data.payload, rememberMe});
      navigate("/dashboard");
    }
  }, [isLoading]);

  return (
    <CoverLayout
      title="Welcome to cDram"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          {
            isLoading &&
              <SoftTypography variant="caption" fontWeight="bold">
                Loading
              </SoftTypography>
          }
          {
            isError &&
              <SoftAlert color="error" dismissible>{`Error ${error.data.message}`}</SoftAlert>
          }

        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
            sign in
          </SoftButton>
        </SoftBox>
        {/*<SoftBox mt={3} textAlign="center">*/}
        {/*  <SoftTypography variant="button" color="text" fontWeight="regular">*/}
        {/*    Don&apos;t have an account?{" "}*/}
        {/*    <SoftTypography*/}
        {/*      component={Link}*/}
        {/*      to="/authentication/sign-up"*/}
        {/*      variant="button"*/}
        {/*      color="info"*/}
        {/*      fontWeight="medium"*/}
        {/*      textGradient*/}
        {/*    >*/}
        {/*      Sign up*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftTypography>*/}
        {/*</SoftBox>*/}
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
