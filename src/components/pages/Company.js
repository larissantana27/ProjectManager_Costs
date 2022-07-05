import styles from './Company.module.css'


function Company() {

    return (
        <div className = {styles.company_container}>
            <div className = {styles.title_container}>
                 <h1>
                    Company
                </h1>
            </div>
        </div>
    )
}

export default Company