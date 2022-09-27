import {useState, useRef} from 'react';
import styles from '../styles/Maltrans.module.scss'
import ConfirmModal from './confirmModal';
import SendingLoader from './sendingLoader';

export default function MaltransData({data,tokenKey,logout}){

    const [customCenter, setCustomCenter] = useState("جمرك عمان");
    const [clearanceNo, setClearanceNo] = useState();
    const [clearanceDate, setClearanceDate] = useState();
    const [healthPath, setHealthPath] = useState("Red");
    const [customPath, setCustomPath] = useState("Red");
    const [agriPath, setAgriPath] = useState("Red");
    const [customeInsurance, setCustomeInsurance] = useState();
    const [clearanceFinish, setClearanceFinish] = useState();
    const [requiredAction, setRequiredAction] = useState("تسليم المستندات");
    const [token, setToken] = useState(tokenKey)

    function FileUpload(){
        const [selectedFileOne, setSelectedFileOne] = useState();
        const [selectedFileTwo, setSelectedFileTwo] = useState();
        const [selectedFileThree, setSelectedFileThree] = useState();
        const [selectedFileFour, setSelectedFileFour] = useState();
        const [isSelectedOne, setIsSelectedOne] = useState(false);
        const [isSelectedTwo, setIsSelectedTwo] = useState(false);
        const [isSelectedThree, setIsSelectedThree] = useState(false);
        const [isSelectedFour, setIsSelectedFour] = useState(false);
        const [isSending, setIsSending] = useState(false)
        const [msg, setMsg] = useState("")
        const [isMsg, setIsMsg] = useState(false)
        const [success, setSuccess] = useState(true)


        const ref1 = useRef()
        const ref2 = useRef()
        const ref3 = useRef()
        const ref4 = useRef()
    
        const changeHandler = (event,fileNo) => {
            const fileData = event.target.files[0]
            switch(fileNo){
                case 1:
                    setSelectedFileOne(fileData);
                    if(fileData){
                        setIsSelectedOne(true);
                    }else{
                        setIsSelectedOne(false);
                    }
                    break;
                case 2:
                    setSelectedFileTwo(fileData);
                    if(fileData){
                        setIsSelectedTwo(true);
                    }else{
                        setIsSelectedTwo(false);
                    }
                    break;
                case 3:
                    setSelectedFileThree(fileData);
                    if(fileData){
                        setIsSelectedThree(true);
                    }else{
                        setIsSelectedThree(false);
                    }
                    break;
                case 4:
                    setSelectedFileFour(fileData);
                    if(fileData){
                        setIsSelectedFour(true);
                    }else{
                        setIsSelectedFour(false);
                    }
                    break;
                default:
                    break;
            }
        };

        const removeFile = (fileNo) => {
            switch(fileNo){
                case 1:
                    setSelectedFileOne();
                    setIsSelectedOne(false);
                    ref1.current.value = ""
                    break;
                case 2:
                    setSelectedFileTwo();
                    setIsSelectedTwo(false);
                    ref2.current.value = ""
                    break;
                case 3:
                    setSelectedFileThree();
                    setIsSelectedThree(false);
                    ref3.current.value = ""
                    break;
                case 4:
                    setSelectedFileFour();
                    setIsSelectedFour(false);
                    ref4.current.value = ""
                    break;
                default:
                    break;
            }
        }

        const toBase64 = async (file) => {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result)
            };
            reader.onerror = error => reject(error);
            })
        };

        const convertFiles = async (formData) => {
            if(isSelectedOne){
                await toBase64(selectedFileOne).then((result) => {
                    formData.append('FileOneName',selectedFileOne.name)
                    formData.append('FileOne',result)
                });
            }else{
                formData.append('FileOneName',"")
            }
            if(isSelectedTwo){
                await toBase64(selectedFileTwo).then((result) => {
                    formData.append('FileTwoName',selectedFileTwo.name)
                    formData.append('FileTwo',result)
                });
            }else{
                formData.append('FileTwoName',"")
            }
            if(isSelectedThree){
                await toBase64(selectedFileThree).then((result) => {
                    formData.append('FileThreeName',selectedFileThree.name)
                    formData.append('FileThree',result)
                });
            }else{
                formData.append('FileThreeName',"")
            }
            if(isSelectedFour){
                await toBase64(selectedFileFour).then((result) => {
                    formData.append('FileFourName',selectedFileFour.name)
                    formData.append('FileFour',result)
                });
            }else{
                formData.append('FileFourName',"")
            }
            return 'done'
        }
    
        const handleSubmission = async () => {
            if(msg != ""){
                setMsg("")
                setSuccess(true)
                setIsMsg(false)
            }
            if( customCenter &&  clearanceNo && clearanceDate && healthPath && customPath && agriPath && customeInsurance && clearanceFinish && requiredAction){
                const formData = new FormData();
                formData.append('customCenter', customCenter);
                formData.append('clearanceNo', clearanceNo);
                formData.append('clearanceDate', clearanceDate);
                formData.append('healthPath', healthPath);
                formData.append('customPath', customPath);
                formData.append('agriPath', agriPath);
                formData.append('customeInsurance', customeInsurance);
                formData.append('clearanceFinish', clearanceFinish);
                formData.append('requiredAction', requiredAction);
                const dataToBase64 = await convertFiles(formData)
                console.log(dataToBase64)
                setIsSending(true)
                try{
                    fetch(
                        'http://localhost:3030/save-maltrans-data',
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: formData,
                        }
                    )
                    .then((response) => response.json())
                    .then((result) => {
                        setTimeout(() => {
                            setIsSending(false)
                            if(result.status == "unauthorized"){
                                setSuccess(false)
                                setTimeout(() => {
                                    logout()
                                },1500)
                            }
                            setMsg(result.msg)
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
            }
        };
    
        return(
            <div>
                <div className={styles.fileUpload}>
                    <div className={styles.inputContainer}>
                        {isSelectedOne?
                            <div className={styles.userActions}>
                                <button onClick={() => removeFile(1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                </button>
                            </div>
                        :
                            <></>
                        }
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" ref={ref1}  name="file1" accept=".pdf" onChange={e => changeHandler(e,1)} />
                                <label className={styles.fileLabel}  htmlFor='file1'>
                                    البيان الجمركي
                                </label>
                        </fieldset>
                    </div>
                    <div className={styles.inputContainer}>
                        {isSelectedTwo?
                            <div className={styles.userActions}>
                                <button onClick={() => removeFile(2)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                </button>
                            </div>
                        :
                            <></>
                        }
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" ref={ref2} name="file2" accept=".pdf" onChange={e => changeHandler(e,2)} />
                                <label className={styles.fileLabel}  htmlFor='file2'>
                                    فواتير التخليص
                                </label>
                        </fieldset>  
                    </div>
                    <div className={styles.inputContainer}>
                        {isSelectedThree?
                            <div className={styles.userActions}>
                                <button onClick={() => removeFile(3)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                </button>
                            </div>
                        :
                            <></>
                        }
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" ref={ref3} name="file3" accept=".pdf" onChange={e => changeHandler(e,3)} />
                                <label className={styles.fileLabel}  htmlFor='file3'>
                                    نموذج سحب العينات
                                </label>
                        </fieldset>  
                    </div>
                    <div className={styles.inputContainer}>
                        {isSelectedFour?
                            <div className={styles.userActions}>
                                <button onClick={() => removeFile(4)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                </button>
                            </div>
                        :
                            <></>
                        }
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" ref={ref4} name="file4" accept=".pdf" onChange={e => changeHandler(e,4)} />
                                <label className={styles.fileLabel}  htmlFor='file4'>
                                    نتائج البيانات والانجازات
                                </label>
                        </fieldset>  
                    </div>
                </div>
                <div className={styles.btuContainer}>
                    <div>
                        {/* <button className={styles.btu} type='submit' onClick={handleSubmission}>Submit</button> */}
                        {isSending?
                            <div>
                                <SendingLoader/>
                            </div>
                        :
                            <div style={{display:'flex',justifyConten:'center',alignItems:'center'}}>
                                {isMsg?
                                    <div>
                                        {success?
                                            <div style={{color:"green"}}>{msg}</div>
                                        :
                                            <div style={{color:"red"}}>{msg}</div>
                                        }
                                    </div>
                                :
                                    <></>
                                }
                                <ConfirmModal handleSubmission={handleSubmission}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className={styles.contentContainer}>
            <div>
                <div style={{width:'100%'}}>
                    <h2 style={{textAlign:"center"}}>
                        ادخال البيانات
                    </h2>
                </div>
                <div className={styles.info}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.forms}>
                            <fieldset className={styles.fieldset}>
                                <select name="customCenter" className={styles.opt} onChange={e => setCustomCenter(e.target.value)}>
                                    <option value="جمرك عمان">
                                        جمرك عمان
                                    </option>
                                    <option value="جمرك جابر">
                                        جمرك جابر
                                    </option>
                                    <option value="جمرك العمري">
                                        جمرك العمري
                                    </option>
                                    <option value="جمرك العقبة">
                                        جمرك العقبة
                                    </option>
                                </select>
                                <label className={styles.label2} htmlFor='customCenter'>
                                    المركز الجمركي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='clearanceNo' onChange={e => setClearanceNo(e.target.value)} required/>
                                <label className={styles.label2}  htmlFor='clearanceNo'>
                                    رقم البيان الجمركي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='clearanceDate' type="date" className={styles.opt} onChange={e => setClearanceDate(e.target.value)} required/>
                                <label className={styles.label2} htmlFor='clearanceDate'>
                                    تاريخ البيان الجمركي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <select name="healthPath" className={styles.opt} onChange={e => setHealthPath(e.target.value)}>
                                    <option value="Red">
                                        Red
                                    </option>
                                    <option value="Yellow">
                                        Yellow 
                                    </option>
                                    <option value="Green">
                                        Green 
                                    </option>
                                </select>
                                <label className={styles.label2} htmlFor='healthPath'>
                                    المسرب الصحي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <select name="customPath" className={styles.opt} onChange={e => setCustomPath(e.target.value)}>
                                    <option value="Red">
                                        Red
                                    </option>
                                    <option value="Yellow">
                                        Yellow 
                                    </option>
                                    <option value="Green">
                                        Green 
                                    </option>
                                </select>
                                <label className={styles.label2} htmlFor='customPath'>
                                    المسرب الجمركي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                            <select name="agriPath" className={styles.opt} onChange={e => setAgriPath(e.target.value)}>
                                    <option value="Red">
                                        Red
                                    </option>
                                    <option value="Yellow">
                                        Yellow 
                                    </option>
                                    <option value="Green">
                                        Green 
                                    </option>
                                </select>
                                <label className={styles.label2} htmlFor='agriPath'>
                                    المسرب الزراعي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='customeInsurance' onChange={e => setCustomeInsurance(e.target.value)} required/>
                                <label className={styles.label2} htmlFor='customeInsurance'>
                                    التأمينات الجمركية
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='clearanceFinish' type="date" className={styles.opt} onChange={e => setClearanceFinish(e.target.value)} required/>
                                <label className={styles.label2} htmlFor='clearanceFinish'>
                                    إنجاز البيان
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <select name="requiredAction" className={styles.opt} onChange={e => setRequiredAction(e.target.value)}>
                                    <option value="تسليم المستندات">
                                        تسليم المستندات
                                    </option>
                                    <option value="استلام إذن التسليم">
                                        استلام إذن التسليم
                                    </option>
                                    <option value="تفعيل إذن التسليم">
                                        تفعيل إذن التسليم
                                    </option>
                                    <option value="تنظيم البيان">
                                        تنظيم البيان
                                    </option>
                                    <option value="تخمين البيان">
                                        تخمين البيان
                                    </option>
                                    <option value="دفع البيان">
                                        دفع البيان
                                    </option>
                                    <option value="تحميل من الميناء">
                                        تحميل من الميناء
                                    </option>
                                    <option value="معاينة مع عينة">
                                        معاينة مع عينة
                                    </option>
                                    <option value="معاينة بدون عينة">
                                        معاينة بدون عينة
                                    </option>
                                    <option value="تصريح خروج">
                                        تصريح خروج
                                    </option>
                                    <option value="وصلت">
                                        وصلت
                                    </option>
                                    <option value="نتائج">
                                        نتائج
                                    </option>
                                    <option value="إنجاز">
                                        إنجاز
                                    </option>
                                </select>
                                <label className={styles.label2} htmlFor='requiredAction'>
                                    الإجراء المطلوب
                                </label>
                            </fieldset>
                        </div>
                        <FileUpload/>
                    </form>
                </div>
            </div>
            <form>
                <div style={{width:'100%'}}>
                    <h2 style={{textAlign:"center"}}>
                        بيانات الطلب
                    </h2>
                </div>
                <fieldset className={styles.fieldset}>
                    <input name="BL" readOnly value={data.BL}/>
                    <label className={styles.label} htmlFor='BL'>
                        رقم البوليصة
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_ShippingMethod' readOnly value={data.U_ShippingMethod}/>
                    <label className={styles.label}  htmlFor='U_ShippingMethod'>
                        طريقة التخليص
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_ShippingCompany' readOnly value={data.U_ShippingCompany}/>
                    <label className={styles.label} htmlFor='U_ShippingCompany'>
                        شركة الشحن
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_NoofContainer' readOnly value={data.U_NoofContainer}/>
                    <label className={styles.label} htmlFor='U_NoofContainer'>
                        عدد الحاويات
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_ContainerNo' readOnly value={data.U_ContainerNo}/>
                    <label className={styles.label} htmlFor='U_ContainerNo'>
                        أرقام الحاويات
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_ETS' readOnly value={data.U_ETS.substring(10,-1)}/>
                    <label className={styles.label} htmlFor='U_ETS'>
                        موعد الشحن
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name="U_ETA" readOnly value={data.U_ETA.substring(10,-1)}/>
                    <label className={styles.label} htmlFor='U_ETA'>
                        موعد الوصول
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_StorageMethod' readOnly value={data.U_StorageMethod}/>
                    <label className={styles.label} htmlFor='U_StorageMethod'>
                        طريقة التخزين
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_ClearanceCompany' readOnly value={data.U_ClearanceCompany}/>
                    <label className={styles.label} htmlFor='U_ClearanceCompany'>
                        شركة التخليص
                    </label>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input name='U_PO_Status' readOnly value={data.U_PO_Status}/>
                    <label className={styles.label} htmlFor='U_PO_Status'>
                        حالة الطلب
                    </label>
                </fieldset>
            </form>     
        </div>
    )
}