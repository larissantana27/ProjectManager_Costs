import { v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Project.module.css'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [services, setServices] = useState([])
    const [showServiceForm, setShowServiceForm] = useState(false)
    
    //----------------------------------------------------------------------------

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, 
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json',},
            }
                )
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((error) => console.log)
        }, 300)
    }, [id])

    //----------------------------------------------------------------------------

    function editPost(project) {

        setMessage('')
        //fix why the message is showing just the first time
        
        if (project.budget < project.cost) {
          setMessage('The total of costs in a project must be in the Budget!')
          setType('error')
          return false
        }
    
        fetch(`http://localhost:5000/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage('The project has been updated!')
            setType('success')
          })
      }

    //----------------------------------------------------------------------------
    
    function createService(project) {

        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost

        const moneyUsedUntilNow = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (moneyUsedUntilNow > parseFloat(project.budget)) {
            setMessage('This project does not afford this service, check the total budget to see the resources available!')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = moneyUsedUntilNow

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessage('Service Added Sucessfully!')
            setType('success')
            })
    }

    //----------------------------------------------------------------------------
    
    function removeService(id, cost) {

        setMessage('')

        const servicesUpdated = project.services.filter(
          (service) => service.id !== id,
        )
    
        const projectUpdated = project
        projectUpdated.services = servicesUpdated

        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectUpdated),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Service deleted sucessfully!')
          })
    }

    //----------------------------------------------------------------------------

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (

                <div className = {styles.project_details}>

                    {/*----------------------------------------------------------------*/}

                    <Container customClass = "column">

                        {/*----------------------------------------------------------------*/}

                        {message && <Message type = {type} message = {message} />}

                        <div className = {styles.details_container}>

                            <h1> Project: {project.name} </h1>

                            <button className = {styles.button} onClick = {toggleProjectForm} >
                                {!showProjectForm ? 'Edit Project': 'Close'}
                            </button>

                            {!showProjectForm ? (
                                <div className = {styles.form}>
                                    <p>
                                        <span>Category:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total Budget:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Money used until now:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className = {styles.form}>
                                <ProjectForm
                                    handleSubmit = {editPost}
                                    buttonText = "Save"
                                    projectData = {project} />
                                </div>
                            )}
                        </div>

                        {/*----------------------------------------------------------------*/}
                        
                        <div className = {styles.service_form_container}>

                            <h2>Add a service:</h2>

                            <button className = {styles.button} onClick = {toggleServiceForm}>
                                {!showServiceForm ? 'Add service' : 'Close'}
                            </button>

                            <div className = {styles.form}>

                                {showServiceForm && (
                                <ServiceForm
                                    handleSubmit = {createService}
                                    buttonText = "Add Service"
                                    projectData = {project}
                                />
                                )}

                            </div>

                        </div>

                        {/*----------------------------------------------------------------*/}

                        <h2>Serviços:</h2>

                        <Container customClass = "start">

                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id = {service.id}
                                        name = {service.name}
                                        cost = {service.cost}
                                        description = {service.description}
                                        key = {service.id}
                                        handleRemove = {removeService}
                                    />
                                    ))}

                            {services.length === 0 && <p> No services registered. </p>}

                        </Container>
                
                    {/*----------------------------------------------------------------*/}
                
                    </Container>

                </div>
            ) : ( 
                <Loading/>
            )}
        </>
    )
}

export default Project