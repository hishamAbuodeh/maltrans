import styles from "../styles/Loader.module.scss"

export default function Loader(props){
    return(
        <div className={styles.loaderContainer}>
            <div className={styles.ldsDefault}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}