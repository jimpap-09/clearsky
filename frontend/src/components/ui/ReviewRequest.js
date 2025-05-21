import {useState} from 'react';
import {post_request_url} from '../../apiConfig';
import axios from 'axios';
import useAuth from '../../context/AuthContext';

export default function ReviewRequest({studentId, course, onBack}) {

    const [request, setRequest] = useState('');
    const {token} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!request) {
            alert('Please submit a non empty request!')
            return;
        }
        try{
            const res = await axios.post(post_request_url, {
                courseId: course.id,
                studentId: studentId,
                studentMessage: request,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Backend response: ', res.data.message);
            console.log("Posted Request: ", res.data);
        }
        catch(err) {
            console.error(err);
        }
    }
    return(
        <div>
        {onBack && (
        <button onClick={onBack}>
            Back
        </button>
        )}
            <div className='main-container'>
                <h4 className='main-container-header'>NEW REVIEW REQUEST {course.name}-{course.period}</h4>
                <div className='main-container-body'>
                    <h5>Message to instructor</h5>
                    <input
                        type='text'
                        placeholder='type your review'
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        style={{
                            borderRadius: '8px',
                            padding: '10px',
                            fontFamily: 'Arial',
                            width: '100%',
                            height: '100px',  // μεγαλώνεις το ύψος για να φαίνεται πιο ορθογώνιο
                            boxSizing: 'border-box' // ώστε το padding να μετράει μέσα στο width
                        }}
                    />
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                        <button
                            type='submit'
                            onClick={handleSubmit}
                        >
                            submit grade review request
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}