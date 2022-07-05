import { useState, useEffect } from 'react'

import styles from './ProjectForm.module.css'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


function ProjectForm({ handleSubmit, buttonText, projectData }) {
  
    const [project, setProject] = useState(projectData || {})
    const [categories, setCategories] = useState([])

    useEffect(() => 
        {
            fetch('http://localhost:5000/categories', 
                    {
                        method: 'GET',
                        Headers: {'Content-Type': 'application/json', }
                    , }
                )
                .then((response) => response.json())
                .then((data) => { setCategories(data) })
                .catch((error) => console.log(error))
        }, [])

    
    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
        ...project,
        category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
        <Input
            type="text"
            text="Project Name"
            name="name"
            placeholder="Type project name"
            handleOnChange={handleChange}
            value={project.name}
        />
        <Input
            type="number"
            text="Project Budget"
            name="budget"
            placeholder="Type project budget"
            handleOnChange={handleChange}
            value={project.budget}
        />
        <Select
            name="category_id"
            text="Select a category"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
        />
        <SubmitButton text = {buttonText} />
        </form>
    )
}

export default ProjectForm