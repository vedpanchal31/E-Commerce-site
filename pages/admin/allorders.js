import React from 'react'
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ProductPerfomance from '@/src/components/dashboard/Allproducts';

const Allorders = () => {
    return (

        <ThemeProvider theme={theme}>
        <style jsx global>{`
        footer{
          display : none;
        }
      `}
            </style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <ProductPerfomance />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allorders