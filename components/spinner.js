import styles from "../styles/Spinner.module.scss"

export default function Spinner(props){
    return(
        <div className={styles.loader}>
            <svg className={styles.svg} viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle className={[styles.load,styles.one].join(" ")} cx="60" cy="60" r="40" />
                <circle className={[styles.load,styles.two].join(" ")} cx="60" cy="60" r="40" />
                <circle className={[styles.load,styles.three].join(" ")} cx="60" cy="60" r="40" />
                <g>
                <circle className={[styles.point,styles.one].join(" ")} cx="45" cy="70" r="5" />
                <circle className={[styles.point,styles.two].join(" ")} cx="60" cy="70" r="5" />
                <circle className={[styles.point,styles.three].join(" ")} cx="75" cy="70" r="5" />
                </g>
            </svg>
        </div>
    )
}