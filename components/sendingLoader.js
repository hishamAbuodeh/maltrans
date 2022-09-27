import styles from '../styles/SendingLoader.module.scss'

export default function SendingLoader(props){
    return(
        <div className={styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}