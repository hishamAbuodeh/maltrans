import axios from 'axios'

export default function handler(req, res) {
    let data = req.body
    const baseURL = 'https://alrayhan-rate.herokuapp.com/maltrans'
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
