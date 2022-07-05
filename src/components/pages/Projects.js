import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './Projects.module.css'

import ProjectCard from '../project/ProjectCard'
import Container from '../layout/Container'
//import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import Message from '../layout/Message'


function Projects() {

  const [projects, setProjects] = useState([])
  //const [removeLoading, setRemoveLoading] = useState(false)
  //const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()

  let message = ''
  
  if (location.state) {
    message = location.state.message
  }

  fetch('http://localhost:5000/projects', 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json', } ,
    }
          )
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            setProjects(data)
          })  
          .catch((error) => console.log(error))

  return (

    <div className = {styles.project_container}>

      <div className = {styles.title_container}>
        <h1>My Projects</h1>
        <LinkButton to = "/newproject" text = "Create Project" />
      </div>

      {message && <Message type = "success" message = {message} />}
      
      <Container customClass = "start">
  
        {projects.length > 0 &&
          projects.map((project) => (
            < ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              //handleRemove={removeProject}
            />
          ))}
        
      </Container>

    </div>
  )
}

export default Projects

//{projectMessage && <Message type = "success" message = {projectMessage} />}

/*
        {!removeLoading && <Loading />}

        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
        */