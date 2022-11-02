import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from 'axios'
import styles from "../../styles/Home.module.scss"
import Spinner from '../../components/spinner'
import MaltransData from '../../components/maltransData'

let prevBillNo = ""

export default function Home(props){

    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [token, setToken] = useState("")
 
    useEffect(() => {
        const checkLogin = async() => {
            try {
            let tokens = await AsyncLocalStorage.getItem('tokens')
            if(tokens){
                tokens = JSON.parse(tokens)
                let day = new Date();
                day = day.getDay();
                if(tokens.day != day){
                    await AsyncLocalStorage.removeItem('tokens')
                    router.push('/account')
                }else{
                    setUsername(tokens.username)
                    setToken(tokens.token)
                    setLoading(false)
                }
            }else{
                router.push('/account')
            }
            }catch(err){
                router.push('/account')
            }
        }
        checkLogin()
    },[])

    const logout = async() => {
        try {
            await AsyncLocalStorage.removeItem('tokens')
            prevBillNo = ""
            router.push('/account')
        }catch(err){
            alert("Somthing wrong happened !")
        }
    }

    const HomeLayout = () => {
        
        const [billNo, setBillNo] = useState("")
        const [billData, setBillData] = useState({})
        const [updatedData, setUpdatedData] = useState({
            customCenter:"جمرك عمان",
            clearanceNo:"",
            clearanceDate:"",
            healthPath:"Red",
            customPath:"Red",
            agriPath:"Red",
            Ins215:"0",
            Ins250:"0",
            Ins251:"0",
            clearanceFinish:"",
            requiredAction:"تسليم المستندات",
            DocDone:"غير منجز",
            Notes:""
        })
        const [histData, setHistData] = useState([])
        const [msg,setMsg] = useState("")
        const [showMsg,setShowMsg] = useState(false)
        const [innerLoading,setInnerLoading] = useState(false)

        const clear = () => {
            prevBillNo = ""
            setBillData({})
            setUpdatedData({
                customCenter:"جمرك عمان",
                clearanceNo:"",
                clearanceDate:"",
                healthPath:"Red",
                customPath:"Red",
                agriPath:"Red",
                Ins215:"0",
                Ins250:"0",
                Ins251:"0",
                clearanceFinish:"",
                requiredAction:"تسليم المستندات",
                DocDone:"غير منجز",
                Notes:""
            })
            setHistData([])
        }

        const getData = async() => {
            console.log('clicked')
            console.log(billNo,prevBillNo)
            if(showMsg){
                setMsg("")
                setShowMsg(false)
            }
            if(billNo != "" && billNo != prevBillNo){
                prevBillNo = billNo
                setInnerLoading(true)
                axios({
                    baseURL:'https://alrayhan-rate.herokuapp.com/maltrans',
                    url: '/bill-of-lading',
                    method: 'post',
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    data: JSON.stringify({
                        billNo:billNo,
                    })
                }).then((res) => {
                    setTimeout(() => {
                        setInnerLoading(false)
                        if(res.data.status == "success"){
                            res.data.data.mainData.U_ContainerNo = res.data.data.mainData.U_ContainerNo.split('/')
                            setBillData(res.data.data.mainData)
                            if(res.data.data.isUpdated == "1"){
                                res.data.data.updatedData.clearanceDate = res.data.data.updatedData.clearanceDate.split("T")[0]
                                if(res.data.data.updatedData.requiredAction == "إنجاز"){
                                    res.data.data.updatedData.clearanceFinish = res.data.data.updatedData.clearanceFinish.split("T")[0]
                                }else if(res.data.data.updatedData.DocDone == "منجز"){
                                    res.data.data.updatedData.clearanceFinish = res.data.data.updatedData.clearanceFinish.split("T")[0]
                                }else{
                                    res.data.data.updatedData.clearanceFinish = ""
                                }
                                setUpdatedData(res.data.data.updatedData)
                            }
                            if(res.data.data.isHistory == "1"){
                                setHistData(res.data.data.historyData)
                            }
                        }else{
                            clear()
                            setShowMsg(true)
                            setMsg(res.data.msg)
                            if(res.data.status == "unauthorized"){
                                setTimeout(() => {
                                    logout()
                                },1500)
                            }
                        }
                    },1000)
                }).catch(() => {
                    setTimeout(() => {
                        clear()
                        setInnerLoading(false)
                        setShowMsg(true)
                        setMsg("server shutdown or connection lost!, please try again")
                    },1000)
                })
            }else if(billNo == ""){
                clear()
                setShowMsg(true)
                setMsg("please insert bill of lading no.")
            }
        }

        return(
            <div>
                <aside className={styles.searchWrap}>
                    <div className={styles.imgContainer}>
                        <img src="abuodeh.png" 
                            sizes="contain"
                            height="90px"
                            width="120px"
                        />
                    </div>
                    <div className={styles.nameDiv}>
                        شركة مالترانس للخدمات اللوجستية
                    </div>
                    <div className={styles.imgContainer}>
                        <img src="maltrans.png" 
                            sizes="contain"
                            height="90px"
                            width="120px"
                        />
                    </div>
                </aside>

                <aside className={styles.searchWrap}>
                    <div className={styles.search}>
                        <label htmlFor="search">
                            <input placeholder='ادخل رقم البوليصة او رقم البيان' type="text" id="search" value={billNo} onChange={e => setBillNo(e.target.value)}/>
                            <div className={styles.userActions}>
                                <button onClick={getData}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/></svg>
                                </button>
                            </div>
                        </label>
                    </div>
                    <div className={styles.msgContainer}>
                        <div className={styles.msgInner}>
                            {showMsg?
                                <div className={styles.msgText}>
                                    {msg}
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                    <div className={styles.userActions}>
                        <button onClick={logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"/><path d="M11 2h2v10h-2z"/></svg>
                        </button>
                        <button>
                            <svg style={{zIndex:-2}}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7L11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11z"/><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"/></svg>
                        </button>
                    </div>
                </aside>
                
                <main className={styles.contentWrap}>
                    <div className={styles.content}>
                        {innerLoading?
                            <div style={{
                                marginTop:"100px"
                            }}>
                                <Spinner/>
                            </div>
                        :
                            <>
                                {Object.keys(billData).length > 0?
                                    <div style={{width:'100%'}}>
                                        <MaltransData data={billData} tokenKey={token} logout={logout} username={username} updatedData={updatedData} histData={histData}/>
                                    </div>
                                :
                                    <></>
                                }
                            </>
                        }
                    </div>
                </main>
            </div>
        )
    } 

    return(
        <>
            {
            loading?
            <div style={{
                height:"100vh",
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Spinner/>
            </div>
            :
                <HomeLayout/>
            }
        </>
    )
}