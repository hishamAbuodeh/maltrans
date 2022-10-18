import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styles from '../styles/ContainerModal.module.scss'
import axios from 'axios';
import ConfirmModal from './confirmModal';
import SendingLoader from './sendingLoader';

export default function ContainerInfo({containerNo,tokenKey,username,bl,logout,getContainerNo}){

    const [token, setToken] = useState(tokenKey)
    const [user, setUser] = useState(username)
    const [containerNO,setContainerNO] = useState(containerNo)
    const [bL,setBL] = useState(bl)
    const [driverName, setDriverName] = useState("")
    const [driverNumber, setDriverNumber] = useState("")
    const [truckNumber, setTruckNumber] = useState("")
    const [shippingName, setShippingName] = useState("")
    const [note, setNote] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [msg, setMsg] = useState("")
    const [isMsg, setIsMsg] = useState(false)
    const [success, setSuccess] = useState(true)

    useEffect(() => {
        const value = getContainerNo()
        setContainerNO(value)
        if(isLoading){
            try{
                axios({
                    baseURL:'https://alrayhan-rate.herokuapp.com/maltrans',
                    url: '/get-container-info',
                    method: 'post',
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    data: JSON.stringify({
                        containerNo:value,
                        bL:bL,
                    })
                }).then((res) => {
                    setTimeout(() => {
                        setIsLoading(false)
                        if(res.data.status == "unauthorized"){
                            setSuccess(false)
                            setTimeout(() => {
                                logout()
                            },1500)
                        }
                        if(res.data.status != "success"){
                            setSuccess(false)
                            setMsg(res.data.msg)
                            setIsMsg(true)
                        }else{
                            if(res.data.data.length > 0){
                                fillInfo(res.data.data[0])
                            }
                        }
                    },1500)
                })
                .catch((error) => {
                    setTimeout(() => {
                        setIsLoading(false)
                        setSuccess(false)
                        setIsMsg(true)
                        setMsg("server shutdown or connection lost!, please try again")
                    },1500)
                });
            }catch(err){
                setTimeout(() => {
                    setIsLoading(false)
                    setSuccess(false)
                    setIsMsg(true)
                    setMsg("server shutdown or connection lost!, please try again")
                },1500)
            }
        }
    },[isLoading])

    const fillInfo = (data) => {
        setDriverName(data.DriverName)
        setDriverNumber(data.DriverMobile)
        setTruckNumber(data.TruckNo)
        setShippingName(data.ShippingCompany)
        setNote(data.Notes)
    }

    const clearAllData = () => {
        setMsg("")
        setSuccess(true)
        setIsMsg(false)
        setDriverName("")
        setDriverNumber("")
        setTruckNumber("")
        setShippingName("")
        setNote("")
    }

    const handleSubmission = async () => {
        if(msg != ""){
            setMsg("")
            setSuccess(true)
            setIsMsg(false)
        }
        setIsSending(true)
        const data = {
            containerNo:containerNO,
            bL:bL,
            driverName:driverName,
            driverNumber:driverNumber,
            truckNumber:truckNumber,
            shippingName:shippingName,
            note:note,
            username:user
        }
        console.log(containerNO)
        try{
            axios({
                baseURL:'https://alrayhan-rate.herokuapp.com/maltrans',
                url: '/save-container-info',
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: JSON.stringify(data)
            }).then((res) => {
                setTimeout(() => {
                    setIsSending(false)
                    if(res.data.status == "unauthorized"){
                        setSuccess(false)
                        setTimeout(() => {
                            logout()
                        },1500)
                    }
                    if(res.data.msg != "Submit is Done"){
                        setSuccess(false)
                    }
                    setMsg(res.data.msg)
                    setIsMsg(true)
                },1500)
            })
            .catch((error) => {
                setTimeout(() => {
                    setIsSending(false)
                    setSuccess(false)
                    setIsMsg(true)
                    setMsg("server shutdown or connection lost!, please try again")
                },1500)
            });
        }catch(err){
            setTimeout(() => {
                setIsSending(false)
                setSuccess(false)
                setIsMsg(true)
                setMsg("server shutdown or connection lost!, please try again")
            },1500)
        }
    };

    return(
        <Popup
            onOpen={() => setIsLoading(true)}
            onClose={clearAllData}
            trigger={
            <div className={styles.userActions2}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 24 24"><path d="M13 7L11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11z"/><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"/></svg>
                </div>
            </div>}
            modal
            nested
        >
            {close => (
            <div className={styles.modal}>
                <button className={styles.close} onClick={close}>
                &times;
                </button>
                <div className={styles.header}>{containerNo} حاوية رقم </div>
                <div className={styles.content}>
                    {!isLoading?
                        <>
                            {success?
                                <div className={styles.innerContent}>
                                    <form className={styles.form}>
                                        <fieldset className={styles.fieldset2}>
                                            <label className={styles.label2}  htmlFor='note'>
                                                ملاحظات
                                            </label>
                                            <textarea className={styles.textarea} name='note' value={note} onChange={e => setNote(e.target.value)}/>
                                        </fieldset>
                                        <div>
                                            <fieldset className={styles.fieldset}>
                                                <input className={styles.textInput} name='driverName' value={driverName} onChange={e => setDriverName(e.target.value)}/>
                                                <label className={styles.label}  htmlFor='driverName'>
                                                    اسم السائق
                                                </label>
                                            </fieldset>
                                            <fieldset className={styles.fieldset}>
                                                <input className={styles.textInput} name='driverNumber' value={driverNumber} onChange={e => setDriverNumber(e.target.value)}/>
                                                <label className={styles.label}  htmlFor='driverNumber'>
                                                    رقم هاتف السائق
                                                </label>
                                            </fieldset>
                                            <fieldset className={styles.fieldset}>
                                                <input className={styles.textInput} name='truckNo' value={truckNumber} onChange={e => setTruckNumber(e.target.value)}/>
                                                <label className={styles.label}  htmlFor='truckNo'>
                                                    رقم الشاحنة
                                                </label>
                                            </fieldset>
                                            <fieldset className={styles.fieldset}>
                                                <input className={styles.textInput} name='shippingName' value={shippingName} onChange={e => setShippingName(e.target.value)}/>
                                                <label className={styles.label}  htmlFor='shippingName'>
                                                    اسم شركة النقل
                                                </label>
                                            </fieldset>
                                        </div>
                                    </form> 
                                </div>
                            :
                                <div className={styles.loadingDiv}>
                                    <div style={{color:"red"}}>{msg}</div>
                                </div>
                            }
                        </>
                    :
                    <div className={styles.loadingDiv}>
                        <SendingLoader/>
                    </div>
                    }
                </div>
                {!isLoading?
                    <>
                        {success?
                            <div className={styles.actions}>
                                <div className={styles.closeDiv}>
                                    <button
                                        className={styles.btuClose}
                                        onClick={() => {
                                        console.log('modal closed ');
                                        close();
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                                {isSending?
                                    <div>
                                        <SendingLoader/>
                                    </div>
                                :
                                    <div style={{display:'flex',justifyConten:'center',alignItems:'center'}}>
                                        {isMsg?
                                            <div>
                                                {success?
                                                    <div style={{color:"green",fontSize:15}}>{msg}</div>
                                                :
                                                    <div style={{color:"red",fontSize:15}}>{msg}</div>
                                                }
                                            </div>
                                        :
                                            <></>
                                        }
                                        <ConfirmModal handleSubmission={handleSubmission}/>
                                    </div>
                                }
                            </div>
                        :
                            <div className={styles.loadingDiv} style={{paddingBottom:"20px"}}>
                                <button
                                    className={styles.btuClose}
                                    onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        }
                    </>
                :
                    <></>
                }
            </div>
            )}
        </Popup>
    )
};