import {useState} from 'react';
import styles from '../styles/Maltrans.module.css'

export default function MaltransData({data}){

    const [customCenter, setCustomCenter] = useState();
    const [clearanceNo, setClearanceNo] = useState();
    const [clearanceDate, setClearanceDate] = useState();
    const [healthPath, setHealthPath] = useState();
    const [customPath, setCustomPath] = useState();
    const [agriPath, setAgriPath] = useState();
    const [customeInsurance, setCustomeInsurance] = useState();
    const [clearanceFinish, setClearanceFinish] = useState();
    const [requiredAction, setRequiredAction] = useState();

    function FileUpload(){
        const [selectedFileOne, setSelectedFileOne] = useState();
        const [selectedFileTwo, setSelectedFileTwo] = useState();
        const [selectedFileThree, setSelectedFileThree] = useState();
        const [selectedFileFour, setSelectedFileFour] = useState();
        const [isSelectedOne, setIsSelectedOne] = useState(false);
        const [isSelectedTwo, setIsSelectedTwo] = useState(false);
        const [isSelectedThree, setIsSelectedThree] = useState(false);
        const [isSelectedFour, setIsSelectedFour] = useState(false);
    
        const changeHandler = (event,fileNo) => {
            switch(fileNo){
                case 1:
                    setSelectedFileOne(event.target.files[0]);
                    setIsSelectedOne(true);
                    break;
                case 2:
                    setSelectedFileTwo(event.target.files[0]);
                    setIsSelectedTwo(true);
                    break;
                case 3:
                    setSelectedFileThree(event.target.files[0]);
                    setIsSelectedThree(true);
                    break;
                case 4:
                    setSelectedFileFour(event.target.files[0]);
                    setIsSelectedFour(true);
                    break;
                default:
                    break;
            }
        };
    
        const handleSubmission = () => {
            console.log('clicked')
            // const formData = new FormData();
            // formData.append('customCenter', customCenter);
            // formData.append('clearanceNo', clearanceNo);
            // formData.append('clearanceDate', clearanceDate);
            // formData.append('healthPath', healthPath);
            // formData.append('customPath', customPath);
            // formData.append('agriPath', agriPath);
            // formData.append('customeInsurance', customeInsurance);
            // formData.append('clearanceFinish', clearanceFinish);
            // formData.append('requiredAction', requiredAction);
            // if(isSelectedOne){
            //     formData.append('FileOne', selectedFileOne);
            // }else{
            //     formData.append('FileOne', 'empty');
            // }
            // if(isSelectedTwo){
            //     formData.append('FileTwo', selectedFileTwo);
            // }
            // else{
            //     formData.append('FileTwo', 'empty');
            // }
            // if(isSelectedThree){
            //     formData.append('FileThree', selectedFileThree);
            // }
            // else{
            //     formData.append('FileThree', 'empty');
            // }
            // if(isSelectedFour){
            //     formData.append('FileFour', selectedFileFour);
            // }
            // else{
            //     formData.append('FileFour', 'empty');
            // }
            // // console.log(selectedFileOne)
            // fetch(
            //     '/api',
            //     {
            //         method: 'POST',
            //         body: formData,
            //     }
            // )
            // .then((response) => response.json())
            // .then((result) => {
            //     console.log('Success:', result);
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            // });
        };
    
        return(
            <div>
                <div className={styles.fileUpload}>
                    {/* {selectedFileFour.name + selectedFileFour.type} */}
                    <div className={styles.inputContainer}>
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" name="file1" accept=".pdf" onChange={e => changeHandler(e,1)} />
                                <label className={styles.fileLabel}  htmlFor='clearanceNo'>
                                    البيان الجمركي
                                </label>
                        </fieldset>
                    </div>
                    <div className={styles.inputContainer}>
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" name="file2" accept=".pdf" onChange={e => changeHandler(e,2)} />
                                <label className={styles.fileLabel}  htmlFor='clearanceNo'>
                                    فواتير التخليص
                                </label>
                        </fieldset>  
                    </div>
                    <div className={styles.inputContainer}>
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" name="file3" accept=".pdf" onChange={e => changeHandler(e,3)} />
                                <label className={styles.fileLabel}  htmlFor='clearanceNo'>
                                    نموذج سحب العينات
                                </label>
                        </fieldset>  
                    </div>
                    <div className={styles.inputContainer}>
                        <fieldset className={styles.fieldset}>
                                <input className={styles.input} type="file" name="file4" accept=".pdf" onChange={e => changeHandler(e,4)} />
                                <label className={styles.fileLabel}  htmlFor='clearanceNo'>
                                    نتائج البيانات والانجازات
                                </label>
                        </fieldset>  
                    </div>
                </div>
                <div className={styles.btuContainer}>
                    <div>
                        <button className={styles.btu} type='submit' onClick={handleSubmission}>Submit</button>
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
                                <label className={styles.label} htmlFor='customCenter'>
                                    المركز الجمركي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='clearanceNo' onChange={e => setClearanceNo(e.target.value)} required/>
                                <label className={styles.label}  htmlFor='clearanceNo'>
                                    رقم البيان الجمركي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='clearanceDate' type="date" className={styles.opt} onChange={e => setClearanceDate(e.target.value)} required/>
                                <label className={styles.label} htmlFor='clearanceDate'>
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
                                <label className={styles.label} htmlFor='healthPath'>
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
                                <label className={styles.label} htmlFor='customPath'>
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
                                <label className={styles.label} htmlFor='agriPath'>
                                    المسرب الزراعي
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='customeInsurance' onChange={e => setCustomeInsurance(e.target.value)} required/>
                                <label className={styles.label} htmlFor='customeInsurance'>
                                    التأمينات الجمركية
                                </label>
                            </fieldset>
                            <fieldset className={styles.fieldset}>
                                <input name='clearanceFinish' type="date" className={styles.opt} onChange={e => setClearanceFinish(e.target.value)} required/>
                                <label className={styles.label} htmlFor='clearanceFinish'>
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
                                <label className={styles.label} htmlFor='requiredAction'>
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