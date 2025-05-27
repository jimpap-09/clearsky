import {useState} from 'react';
import {post_request_url} from '../../apiConfig';
import axios from 'axios';
import useAuth from '../../context/AuthContext';

// create review - main page
export default function ReviewRequest({studentId, course, onBack}) {

    // set a state for the upcoming request
    const [request, setRequest] = useState('');
    // receive token for authorization
    const {token} = useAuth();
    const courseId = course?.id;

    // when submit button is clicked
    // check if the request is empty
    // post the request to create it
    // receive backend response
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!request) {
            alert('Please submit a non empty request!')
            return;
        }
        try {
            console.log('courseId: ', courseId);
            console.log('studentId: ', studentId);
            console.log('studentMessage: ', request);

            const res = await axios.post(post_request_url, {
                courseId,
                studentId,
                studentMessage: request,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(res.status === 203) {
                alert(res.data.error);
                return;
            }
            alert('Backend response: ', res.headers['x-message']);
            console.log("Posted Request: ", res.data);
        }
        catch(err) {console.error(err);}
    }
    return (
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