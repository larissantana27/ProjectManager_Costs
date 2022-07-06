import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './Projects.module.css'

import ProjectCard from '../project/ProjectCard'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import Message from '../layout/Message'


function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  let message = ''

  const location = useLocation()
  
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => { 
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
            setRemoveLoading(true)
          })  
          .catch((error) => console.log(error))
    }, 1000)
  }, [])
  

  function removeProject(id) {

    setProjectMessage('')

    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(
        setProjects(projects.filter((project) => project.id !== id)),
        setProjectMessage('Project sucessfully removed!')
      )
  }

  return (

    <div className = {styles.project_container}>

      <div className = {styles.title_container}>
        <h1>My Projects</h1>
        <LinkButton to = "/newproject" text = "Create Project" />
      </div>

      {message && <Message type = "success" message = {message} />}
      {projectMessage && <Message type = "success" message = {projectMessage} />}
      
      <Container customClass = "start">
  
        {projects.length > 0 &&
          projects.map((project) => (
            < ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        
        {!removeLoading && <Loading />}

        {removeLoading && projects.length === 0 && (
          <p>There are no projects registered!</p>
        )}

      </Container>

    </div>
  )
}

export default Projects

