import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';




/*Create and store user state of each selected selection from the drop down menu*/
/*Prevent user from submitting quiz generator using useState and prevet default on the form and button */
/*Fetch the data so that based on the choice the user selects the openAI APi will create questions based on what has been selected*/


function QuizzForm() {
    // const navigate = useNavigate(); ///store the useNavigate functioin in variable navigate
    const [formData, setFormData] = useState({
        topic: '',
        expertise: '',
        numOfQuestions: '',
        styleOfQuestions: ''
    });

    
    
    useEffect(() => {
        // Initialize Materialize select elements and allows for use of dropdown menu
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        // Validation: Check if all fields are filled
        if (Object.values(formData).some(value => value === '')) {
            alert('Please fill all fields');
            return;
        }

        // // would be navigating to the results page with the formData
        // navigate('/results', { state: { formData } });
    };

    return (
        <div className="container">
            <h2 className="left-align">Quiz Generator Options</h2>
            <p className="left-align">Choose your preferences below to generate your personalized quiz</p>
            <form onSubmit={handleSubmit} className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <select name="topic" id="topic" value={formData.topic} onChange={handleChange}>
                            <option value="" disabled></option>
                            <option value="goLang">GoLang</option>
                            <option value="AWS">AWS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="CI/CD">CI/CD</option>
                            <option value="Home gardens">Home Gardens</option>
                            <option value="Coffee">Coffee</option>
                            <option value="Finger Foods">Finger Foods</option>
                        </select>
                        <label htmlFor="topic">Topic</label>
                    </div>

                    <div className="input-field col s12">
                        <select name="expertise" id="expertise" value={formData.expertise} onChange={handleChange}>
                            <option value="" disabled></option>
                            <option value="Novice">Novice</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <label htmlFor="expertise">Expertise</label>
                    </div>

                    <div className="input-field col s12">
                        <select name="numOfQuestions" id="numOfQuestions" value={formData.numOfQuestions} onChange={handleChange}>
                            <option value="true" disable={true}></option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        <label htmlFor="numOfQuestions">Number of Questions</label>
                    </div>

                    <div className="input-field col s12">
                        <select name="styleOfQuestions" id="styleOfQuestions" value={formData.styleOfQuestions} onChange={handleChange}>
                            <option value="" disabled></option>
                            <option value="Master Oogoway">Master Oogoway</option>
                            <option value="1940s gangster">1940s Gangster</option>
                            <option value="Like I'm an 8 year old">Like I'm an 8-Year-Old</option>
                            <option value="Normal">Normal</option>
                            <option value="Jedi">Jedi</option>
                            <option value="Captain Jack Sparrow">Captain Jack Sparrow</option>
                            <option value="Matthew McConaughey">Matthew McConaughey</option>
                            <option value="Audi">Audi</option>
                        </select>
                        <label htmlFor="styleOfQuestions">Style of Questions</label>
                    </div>
                </div>
                <div className="left-align">
                    <button type="submit" className="btn waves-effect waves-light">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default QuizzForm;