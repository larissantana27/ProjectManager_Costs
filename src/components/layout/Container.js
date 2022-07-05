import styles from './Container.module.css'

/*
function Paths() {

    return (
        <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "company" element ={<Company/>} />
        <Route path = "contact" element = {<Contact/>} />
        <Route path = "newproject" element = {<NewProject/>} />
        </Routes> 
    )
}
*/

function Container(props) {
    return (
        <div className = {`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}

export default Container