import React, { useState } from 'react'
import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
import BaseCard from '@/src/components/baseCard/BaseCard';


const Allproducts = () => {

    const [form, setForm] = useState({})
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value 
        })
    }

    const submitForm = (e) =>{
        e.preventDefault()
        
    }
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
                        <BaseCard title="Add Products">
                            <Stack spacing={3}>
                               
                                <TextField onChange={onChange} value={form.title ? form.title : ""} name="title" label="Title" variant="outlined" />
                                <TextField onChange={onChange} value={form.type ? form.type : ""} name="type" label="Type" variant="outlined" />
                                <TextField onChange={onChange} value={form.size ? form.size : ""} name="size" label="Size" variant="outlined" />
                                <TextField onChange={onChange} value={form.color ? form.color : ""} name="color" label="Color" variant="outlined" />
                                <TextField onChange={onChange} value={form.slug ? form.slug : ""} name="slug" label="Slug" variant="outlined" />
                              
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={form.description ? form.description : ""}
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                />
                                <TextField
                                    error
                                    name="er-basic"
                                    label="Error"
                                    defaultValue="ad1avi"
                                    variant="outlined"
                                />

                            </Stack>
                            <br />
                            <Button onClick={submitForm} variant="outlined" mt={2}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>

                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allproducts