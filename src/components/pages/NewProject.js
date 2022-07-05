import { useNavigate } from 'react-router-dom'

import styles from './NewProject.module.css'

import ProjectForm from '../project/ProjectForm'


function NewProject() {

    const history = useNavigate()

    function createPost(project) {

        // initialize cost and services
        project.cost = 0
        project.services = []
    
        fetch('http://localhost:5000/projects', 
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', } ,
                    body: JSON.stringify(project),
                }
            )
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                //redirect
                history('/projects', { message: 'Projet sucessfully created!' })
                }
            )
    }

    return (
        <div className = {styles.newproject_container}>
            <h1>Create Project</h1>
            <p>Create a new project so that you can add services</p>
            <ProjectForm handleSubmit = { createPost } buttonText = "Create Project" />
        </div>
    )
}

export default NewProject

//checar a aula 25 dnv dps