import axios from 'axios'

export default function handler(req, res) {
    let data = req.body
    const baseURL = 'https://194.165.152.206:3030'
    console.log(data)
    try{
        axios({
            baseURL:baseURL,
            url:'/save-maltrans-data',
            method:"post",
            timeout:30000,
            headers:{'Content-Type': `multipart/form-data, boundary=${formData.getBoundary()}`},
            data
        }).then(result => {
            res.send({data:result.data})
        }).catch(err => {
            res.send({msg:"internal error"})
        })
    }catch(err){
        res.send({msg:"connection error"})
    }
    res.send({msg:'done'})
}
