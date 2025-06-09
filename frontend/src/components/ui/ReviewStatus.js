import axios from 'axios';
import { useEffect, useState } from 'react';
import { get_review_request_url } from '../../apiConfig';
import useAuth from '../../context/AuthContext';

export default function ReviewStatus({studentId, course, onBack}) {

    const [request, setRequest] = useState('');
    const courseId = course?.id;

    const {token} = useAuth();
    
    useEffect(() => {
        const load_review = async () => {
            try {
                const res = await axios.get(`${get_review_request_url}/${courseId}/${studentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Posted Request: ", res.data);
                setRequest(res.data.professorReply);
                if (!res.data.professorReply) alert('You have no reply!');
            } catch (err) {
                console.error(err);
            }
        }
        if(studentId && courseId && token) load_review();
    }
    ,[studentId, courseId, token]
    )

    const handleSubmit = async (e) => {
        alert('You submitted');
    }

    return(
    <div>
        {onBack && (
        <button
            className='main-button'
            onClick={onBack}
        >
            Back
        </button>
        )}
        <div className='main-container'>
            <h4 className='main-container-header'>REVIEW REQUEST STATUS {course.name}-{course.period}</h4>
            <div className='main-container-body'>
                <h5>Message FROM instructor</h5>
                <input
                    className='main-input'
                    type='text'
                    value={request}
                    readOnly
                    style={{
                        borderRadius: '8px',
                        padding: '10px',
                        fontFamily: 'Arial',
                        width: '100%',
                        height: '100px',  // μεγαλώνεις το ύψος για να φαίνεται πιο ορθογώνιο
                        boxSizing: 'border-box' // ώστε το padding να μετράει μέσα στο width
                    }}
                />
                {/* <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                    <button
                        className='main-button'
                        type='submit'
                        onClick={handleSubmit}
                        style={{marginRight:'1rem'}}
                    >
                        Download attachment
                    </button>
                    <button
                        className='main-button'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Ack
                    </button>
                </div> */}
            </div>
        </div>
    </div>
    );
}