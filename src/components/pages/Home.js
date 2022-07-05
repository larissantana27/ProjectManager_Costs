import styles from './Home.module.css'
import savings from '../../img/saving.svg'

import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className = {styles.home_container}>
            <h1>
                Welcome to <span>Costs</span>
            </h1>
            
            <p>Start managing your projects right now!</p>
            
            <LinkButton to = "/newproject" text = "Create Project" />

            <img src = {savings} alt = "Savings" />
      </section>
    )
}

export default Home