import {useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {post_init_grades_url, post_validate_url} from '../../apiConfig'
import useAuth from '../../context/AuthContext'

export default function PostInitGrades() {

    const { instructorId } = useParams();
    const {token} = useAuth();

    const [file, setFile] = useState(null);
    const [courseId, setCourseId] = useState('');
    const [name, setName] = useState('');
    const [period, setPeriod] = useState('');
    const [num, setNum] = useState('');


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleInitGrades = async (e) => {
        e.preventDefault();
        if(!file) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Token sent:", token);
            const res = await axios.post(post_init_grades_url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            });
            alert(res.data.message);
            console.log("Uploaded file:", res.data.filename);
        } catch(error) {
            console.error(error);
            alert("Failed to upload file");
        }
    }

    const handleValidate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(post_validate_url, {
                "courseId": courseId,
                "courseName": name,
                "examPeriod": period,
                "numGrades": num
            },
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            alert(res.data.message);
            console.log(res.data);
        } catch(error) {
            console.error(error);
            alert("Failed to validate file");
        }
    }

    return (
        <div className='post-init-container'>
            <h1>{instructorId}</h1>
            <div className='main-container'>
                <h2 className='main-container-header'>INITIAL GRADES POSTING</h2>
                <div className='main-container-body'>
                    <form onSubmit= {handleInitGrades}>
                        <div className='label-container'>
                            <label className='main-container-label'> xlsx file with initial grades:</label>
                            <input
                            type='file'
                            placeholder='select file to upload or drag and drop'
                            onChange={handleFileChange}
                            >
                            </input>
                        </div>
                        <button type="submit">submit initial grades</button>
                    </form>
                </div>
            </div>
            <div className='main-container'>
                <h2 className='main-container-header'>XLSX file parsing</h2>
                <form onSubmit={handleValidate}>
                    <div className='label-container'>
                        <label>id:</label>
                        <input
                        type="text" 
                        placeholder="Course id"
                        value={courseId}
                        onChange={(e)=>{setCourseId(e.target.value)}}
                        />
                    </div>
                    <div className='label-container'>
                        <label>Course:</label>
                        <input
                        type="text" 
                        placeholder="Course name"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                    </div>
                    <div className='label-container'>
                        <label>Period:</label>
                        <input
                        type="text" 
                        placeholder="Course period"
                        value={period}
                        onChange={(e)=>{setPeriod(e.target.value)}}
                        />
                    </div>
                    <div className='label-container'>
                        <label>n of grades:</label>
                        <input
                        type="text" 
                        placeholder="N"
                        value={num}
                        onChange={(e)=>{setNum(e.target.value)}}
                        />
                    </div>
                    <button type="submit">CONFIRM</button>
                    <button type="decline">CANCEL</button>
                </form>
            </div>
            <div className='message-area'>
                <div className='main-container'>
                    <h2 className='main-container-header'>Message area</h2>
                    <div className='message-text'>
                        <p>write your message here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}