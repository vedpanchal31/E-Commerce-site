import React from 'react'
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from '@mui/material';
import Allproducts from '@/src/components/dashboard/Allproducts';
import mongoose from 'mongoose'
import Product from '@/models/Product'

const Add = ({products}) => {
  
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
                        <Allproducts products={products} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
)
}

export default Add

export async function getServerSideProps(context){

  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }

  let products = await Product.findOne()
  console.log(products);
  return {props :{products : JSON.parse(JSON.stringify(products))}}
}