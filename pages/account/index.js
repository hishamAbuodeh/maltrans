import { useState } from "react"
import { useRouter } from "next/router"
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from "axios"
import styles from"../../styles/Account.module.scss"
import Loader from "../../components/loader"

export default function Account(props){

    const router = useRouter()

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [msg,setMsg] = useState("")
    const [success,setSuccess] = useState(false)
    const [showMsg,setShowMsg] = useState(false)
    const [loading,setLoading] = useState(false)

    const clear = () => {
        setShowMsg(false)
        setMsg("")
        setSuccess(false)
    }

    const saveInStorage = async(tokens,msg) => {
        try {
            let day = new Date();
            day = day.getDay();
            tokens.day = day
            await AsyncLocalStorage.setItem('tokens', JSON.stringify(tokens))
            setSuccess(true)
            setMsg(msg)
            setTimeout(() => {
                router.push('/home')
            },1000)
        }catch (err){
            setSuccess(false)
            setMsg("something wrong happened !, please try again")
        }
    }

    const login = () => {
        if(showMsg){
            clear()
        }
        if(username != "" && password != ""){
            setLoading(true)
            axios({
                baseURL:'http://192.168.90.15:3030',
                url: '/check-maltrans-user',
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    username:username,
                    password:password
                })
            }).then((res) => {
                setTimeout(() => {
                    setLoading(false)
                    setShowMsg(true)
                    if(res.data.status == "success"){
                        saveInStorage(res.data.tokens,res.data.msg)
                    }else{
                        setMsg(res.data.msg)
                    }
                },3000)
            }).catch(() => {
                setTimeout(() => {
                    setLoading(false)
                    setShowMsg(true)
                    setMsg("server shutdown or connection lost!, please try again")
                },3000)
            })
        }
    }

    return (
        <div className={styles.body}>
            <img src="abuodeh.png" 
                sizes="contain"
                height="150px"
                width="250px"
            />
            <form className={styles.loginForm} action="/#">
                <div className={styles.flexRow}>
                    <label className={styles.lfLabel} htmlFor="username">
                    <svg x="0px" y="0px" width="12px" height="13px">
                        <path fill="#B1B7C4" d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"/>
                    </svg>
                    </label>
                    <input id="username" className={styles.lfInput} placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className={styles.flexRow}>
                    <label className={styles.lfLabel} htmlFor="password">
                    <svg x="0px" y="0px" width="15px" height="5px">
                        <g>
                        <path fill="#B1B7C4" d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"/>
                        </g>
                    </svg>
                    </label>
                    <input id="password" className={styles.lfInput} placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} required/>
                </div>
                {loading?
                    <Loader/>
                :
                    <input className={styles.lfSubmit} type='submit' value='LOGIN' onClick={login}/>
                }
                {showMsg?
                    <>
                        {success?
                            <div style={{
                                fontSize:"15px",
                                width:'100%',
                                marginTop:'15px',
                                textAlign:"center",
                                color:'green'
                            }}>
                                {msg}
                            </div>
                        :
                            <div style={{
                                fontSize:"15px",
                                width:'100%',
                                marginTop:'15px',
                                textAlign:"center",
                                color:'red'
                            }}>
                                {msg}
                            </div>
                        }
                    </>
                    :
                    <>
                    </>
                }
            </form>
            <img src="maltrans.png" 
            sizes="contain"
            height="150px"
            width="250px"
            />
        </div>
    )
}