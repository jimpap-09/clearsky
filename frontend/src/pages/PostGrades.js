import {useState} from 'react';
import {post_init_grades_url, post_final_grades_url, post_validate_url} from '../apiConfig'
import useAuth from '../context/AuthContext'
import axios from 'axios'
import MessageArea from '../components/ui/MessageArea';

export default function PostGrades() {

    const {token, userData} = useAuth();
    const instructorName = userData?.name;

    const [file, setFile] = useState(null);
    const [courseId, setCourseId] = useState('');
    const [name, setName] = useState('');
    const [period, setPeriod] = useState('');
    const [num, setNum] = useState('');
    const [init, setInit] = useState(true);
    const [validating, setValidating] = useState(false);

    const post_grades_url = init ? post_init_grades_url : post_final_grades_url;
    const header = init ? 'INITIAL' : 'FINAL';
    const script = init ? 'initial' : 'final';

    // update file-value each time we choose a file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    // when grades are submitted
    const handleInitGrades = async (e) => {

        // first choose a file or show alert
        e.preventDefault();
        if(!file) {
            alert("Please select a file first");
            return;
        }

        // create formdata for the chosen file
        // in order to send it to the backend
        const formData = new FormData();
        formData.append("file", file);

        // send request to backend
        // and show the response
        try {
            console.log("Token sent:", token);
            const res = await axios.post(post_grades_url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }});
            alert(`File uploaded successfully: ${res.data.filename}`);
            console.log("Uploaded file:", res.data.filename);
        } catch(error) {
            console.error(error);
            alert("Failed to upload file");
        }
    }

    // validation stage
    // make sure the credentials are the same with these in the chosen xlsx file
    const handleValidate = async (e) => {
        e.preventDefault();
        setValidating(true);
        try {
            // send request to backend
            // and show the response
            const res = await axios.post(post_validate_url, {
                "courseId": courseId,
                "courseName": name,
                "examPeriod": period,
                "numGrades": num,
                "isFinalised": !init,
            },
            {headers: {Authorization: `Bearer ${token}`}});
            alert('Validation successful! The grades are posted.');
            console.log(res.data);
        } catch(error) {
            console.error(error);
            alert("Failed to validate file");
        } finally {
            setValidating(false);
        }
    }

    return (
        <div className='post-grades-container'>
            <h1>{instructorName}</h1>
            <div style={{display: 'flex', gap:'10px'}}>
                <button
                className='main-button'
                onClick={() => setInit(true)}
                style={{
                    backgroundColor: init ? '#ADD8E6' : '#F0FFFF' // active: light blue
                }}
                >
                    Post Initial Grades
                </button>
                <button
                className='main-button'
                onClick={() => setInit(false)}
                style={{
                    backgroundColor: !init ? '#ADD8E6' : '#F0FFFF' // active: light blue
                }}
                >
                    Post Final Grades
                </button>
            </div>
            <div className='main-container'>
                <h2 className='main-container-header'>{header} GRADES POSTING</h2>
                <div className='main-container-body'>
                    <form
                        onSubmit= {handleInitGrades}
                        className='main-form'
                    >
                        <div className='label-container'>
                            <label className='main-label'> xlsx file with {script} grades:</label>
                            <input
                            className='main-input'
                            type='file'
                            placeholder='select file to upload or drag and drop'
                            onChange={handleFileChange}
                            />
                        </div>
                        <button className='main-button' type="submit">Submit {script} grades</button>
                    </form>
                </div>
            </div>
            <div className='main-container'>
                <h2 className='main-container-header'>XLSX file parsing</h2>
                <form
                    onSubmit={handleValidate}
                    className='main-form'
                >
                    <div className='label-container'>
                        <label className='main-label'>id:</label>
                        <input
                        className = 'main-input'
                        type="text" 
                        placeholder="Course id"
                        value={courseId}
                        onChange={(e)=>{setCourseId(e.target.value)}}
                        />
                    </div>
                    <div className='label-container'>
                        <label className='main-label'>Course:</label>
                        <input
                        className = 'main-input'
                        type="text" 
                        placeholder="Course name"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                    </div>
                    <div className='label-container'>
                        <label className='main-label'>Period:</label>
                        <input
                        className = 'main-input'
                        type="text" 
                        placeholder="Course period"
                        value={period}
                        onChange={(e)=>{setPeriod(e.target.value)}}
                        />
                    </div>
                    <div className='label-container'>
                        <label className='main-label'>n of grades:</label>
                        <input
                        className = 'main-input'
                        type="text" 
                        placeholder="N"
                        value={num}
                        onChange={(e)=>{setNum(e.target.value)}}
                        />
                    </div>
                    {validating && (
                        <div style={{ textAlign: 'center', margin: '10px 0', color: '#333' }}>
                            <span>Validating... Please wait</span>
                        </div>
                    )}

                    <div style={{display: 'flex', gap:'10px'}}>
                        <button className='main-button' type="submit" disabled={validating}>{validating ? 'Validating...' : 'CONFIRM'}</button>
                        <button className='main-button' type="decline">CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
}