import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import M from 'materialize-css';




function QuizzForm() {
    const navigate = useNavigate(); ///store the useNavigate functioin in variable navigate
    const [formData, setFormData] = useState({
        topic: '',
        level: '',
        questionNum: '',
        style: ''
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



        document.getElementById('loading').style.display = 'block';
        document.getElementById('quizform').style.display = 'none';
      
        try {
          const response = await fetch('/api/quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Sending form data in JSON format
          });
      
    
          
          if (!response.ok) { 
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error('Failed to submit form data');
          }
      
          const responseData = await response.json(); // Process the JSON data from the response
      
          navigate('/quiz', { state: { responseData, formData } }); // Navigate with formData and responseData
      
        } catch (error) {
          console.error('Error in handleSubmit:', error); // Log the error message
        }
      };
      

       
    

    return (
        <>
            <div className="container" id="quizform">
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
                            <select name="level" id="level" value={formData.level} onChange={handleChange}>
                                <option value="" disabled></option>
                                <option value="Novice">Novice</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                            <label htmlFor="level">Expertise</label>
                        </div>

                        <div className="input-field col s12">
                            <select name="questionNum" id="questionNum" value={formData.questionNum} onChange={handleChange}>
                                <option value="true" disable={true}></option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                            <label htmlFor="questionNum">Number of Questions</label>
                        </div>

                        <div className="input-field col s12">
                            <select name="style" id="style" value={formData.style} onChange={handleChange}>
                                <option value="" disabled></option>
                                <option value="Master Oogoway">master oogway</option>
                                <option value="1940s gangster">1940s gangster</option>
                                <option value="Like I'm an 8 year old">like i'm an 8 year old</option>
                                <option value="Normal">normal</option>
                                <option value="Jedi">jedi</option>
                                <option value="Captain Jack Sparrow">captain jack sparrow</option>
                                <option value="Matthew McConaughey">matthew mcconaughey</option>
                            </select>
                            <label htmlFor="style">Style of Questions</label>
                        </div>
                    </div>
                    <div className="left-align">
                        <button type="submit" className="btn waves-effect waves-light">Submit</button>
                    </div>
                </form>
            </div>
            <div className='row valign-wrapper' style={{height: '100%'}}>
                <div className='col m6 offset-m5'>
                    <div style={{display: 'none'}} id='loading' className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-green-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizzForm;