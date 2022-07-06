import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../project/ProjectForm.module.css'


function ServiceForm({ handleSubmit, buttonText, projectData }) {

  const [service, setService] = useState({})

  const submit = (e) => {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    
    <form onSubmit = {submit} className = {styles.form}>

      <Input
        type = "text"
        text = "Service Title"
        name = "name"
        placeholder = "Type the service title"
        handleOnChange = {handleChange}
      />
      <Input
        type = "number"
        text = "Cost"
        name = "cost"
        placeholder = "Type how much the service is going to cost"
        handleOnChange = {handleChange}
      />
      <Input
        type = "text"
        text = "Service Description"
        name = "description"
        placeholder = "Describe the service in question"
        handleOnChange = {handleChange}
      />

      <SubmitButton text = {buttonText} />

    </form>
  )
}

export default ServiceForm 