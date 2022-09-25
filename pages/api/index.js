import axios from 'axios'

export default function handler(req, res) {
    const data = req.body
    // console.log(data.data)
    // console.log(data.url)
    const baseURL = 'http://localhost:3033'
    const urls = {
        loginURL: "login-user",
        registerURL: "register-user",
        getDataURL: "get-data",
        saveDataURL: "save-data",
    }
    try{
        // axios({
        //     baseURL,
        //     url:urls.[`${data.url}`],
        //     method:"post",
        //     timeout:10000,
        //     headers:{'Content-Type': 'application/json'},
        //     data:JSON.stringify(data.data)
        // }).then(result => {
        //     res.send(result.data)
        // }).catch(err => {
        //     res.send("internal error")
        // })
        res.send(res.send({
            status:"success",
            msg:"registered",
            tokens:{
                token:'ggggggg',
                username:'hisham',
                email:'hisham@gmail.com'
            },
            data:{
                fieldOne:"red",
                fieldTwo:"green"
            }
        }))
    }catch(err){
        res.send("connection error")
    }
}
