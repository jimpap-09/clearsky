import {useState} from 'react';
import {put_request_url} from '../../apiConfig';
import axios from 'axios';
import useAuth from '../../context/AuthContext';

// create reply - main page
export default function Reply({review, onBack}) {

    // set a state for the upcoming reply
    const [reply, setReply] = useState('');
    // receive token for authorization
    const {token} = useAuth();
    const request = review.request;
    const courseId = request.courseId;
    const studentId = request.studentId;

    // when submit button is clicked
    // check if the request is empty
    // post the request to create it
    // receive backend response
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!reply) {
            alert('Please submit a non empty reply!')
            return;
        }
        try {
            console.log('courseId, studentId:', courseId, studentId);
            console.log('reply: ', reply);
            const res = await axios.put(
            `${put_request_url}/${courseId}/${studentId}`,
            { professorMessage: reply, status: 'accepted' },
            { headers: { Authorization: `Bearer ${token}` }});

            alert('Backend response: ', res.headers['x-message']);
            console.log("Putted Reply: ", res.data);
        }
        catch(err) {
            console.error('Error on put reply request.', err);
        }
    }
    return (
        <div>
            {onBack && (
            <button onClick={onBack}>
                Back
            </button>
            )}
            <div className='main-container'>
                <h4 className='main-container-header'>REPLY TO GRADE REVIEW REQUEST {request.course}-{request.period}-{request.student}</h4>
                <div className='main-container-body'>

                    <div style={{display: 'flex', gap:'10px'}}>
                        <label>instructor's message</label>
                        <input
                            type='text'
                            placeholder='type your reply'
                            value={request.professorMessage}
                            onChange={(e) => setReply(e.target.value)}
                            style={{
                                borderRadius: '8px',
                                padding: '10px',
                                fontFamily: 'Arial',
                                width: '100%',
                                height: '100px',  // μεγαλώνεις το ύψος για να φαίνεται πιο ορθογώνιο
                                boxSizing: 'border-box' // ώστε το padding να μετράει μέσα στο width
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                        <button
                            type='submit'
                            onClick={handleSubmit}
                        >
                            upload reply attachment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}