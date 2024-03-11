// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Forgot from "@/models/Forgot"
import User from "@/models/User"

export default function handler(req, res) {

if(req.body.sendMail){

    let token  = `nkjsgiusgeiufgsiugfsfsfsfs`
    
    let forgot = new Forgot({
        email : req.body.email,
        token : token
    })
    
    let email = `We have sent you this email in response to your request to reset your password on Codeswear.com
    
    To reset your password , please follow the link below:
    
    <a href="http://codeswear.com/forgot?token=${token}">Click here to reset your passowrd </a>
    
    <br/><br/>
    
    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your  My Account Page and clicking on the "Change your Password".
    
    <br/><br/>`
    
}
else{

}
    res.status(200).json({ name: 'John Doe' })
} 
