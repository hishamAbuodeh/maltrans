import { useState } from 'react';
import Popup from 'reactjs-popup';
import styles from '../styles/ConfirmModal.module.css'

export default function ConfirmModal({handleSubmission}){
    return(
        <Popup
            trigger={<button className={styles.btu}> Submit </button>}
            modal
            nested
        >
            {close => (
            <div className={styles.modal}>
                <button className={styles.close} onClick={close}>
                &times;
                </button>
                <div className={styles.header}> تأكيد الارسال </div>
                <div className={styles.content}>
                    <div className={styles.contentMsg}>
                        هل تريد ارسال البيانات ؟
                    </div>
                </div>
                <div className={styles.actions}>
                <button 
                    className={styles.btuConfirm}
                    onClick={handleSubmission}
                > 
                    Confirm 
                </button>
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
            </div>
            )}
        </Popup>
    )
};