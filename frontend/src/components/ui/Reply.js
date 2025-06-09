import {useState} from 'react';
import {put_request_url} from '../../apiConfig';
import axios from 'axios';
import useAuth from '../../context/AuthContext';
import UserDropDown from './UserDropDown';

// create reply - main page
export default function Reply({review, onBack}) {
    // set a state for the upcoming reply
    const [reply, setReply] = useState('');
    const [action, setAction] = useState('');

    // receive token for authorization
    const {token, userData} = useAuth();
    const courseId = review.courseId;
    const studentId = review.studentId;
    const options = ['accept', 'reject'];
    const instructorId = userData?.id;
    const studentMessage = review.studentMessage;

    // when submit button is clicked
    // check if the request is empty
    // post the request to create it
    // receive backend response
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!action) {
            alert('Please select an action (accept or reject)!');
            return;
        }

        if(!reply) {
            alert('Please submit a non empty reply!')
            return;
        }
        try {
            console.log('courseId, studentId, instructorId:', courseId, studentId, instructorId);
            console.log('reply: ', reply);
            const res = await axios.put(
            `${put_request_url}/${courseId}/${studentId}`,
            { professorReply: reply, status: `${action}` },
            { headers: { Authorization: `Bearer ${token}` }});

            alert('Reply sent to student!');
            console.log("Put Reply: ", res.data);
        }
        catch(err) {
            console.error('Error on put reply request.', err);
        }
    }
    return (
    <div>
        {onBack && (
        <button
            className='main-button'
            onClick={onBack}>
            Back
        </button>
        )}
        <div className='main-container'>
            <h4 className='main-container-header'>REPLY TO GRADE REVIEW REQUEST {review.courseName}-{review.period}-{review.studentId}</h4>
            <div className='main-container-body'>
                <div style={{marginBottom: '1.5rem'}}>
                    <UserDropDown options = {options} start={'action'} setAction={setAction}/>
                </div>
                <div style={{display: 'flex', gap:'10px', alignItems: 'center'}}>
                    <label className='main-label'>students's message:</label>
                    <input
                        className='main-input'
                        type='text'
                        // placeholder='type your reply'
                        value={studentMessage}
                        // onChange={(e) => setReply(e.target.value)}
                        readOnly
                        style={{
                            borderRadius: '8px',
                            padding: '10px',
                            fontFamily: 'Arial',
                            width: '100%',
                            height: '30px',  // μεγαλώνεις το ύψος για να φαίνεται πιο ορθογώνιο
                            boxSizing: 'border-box' // ώστε το padding να μετράει μέσα στο width
                        }}
                    />
                </div>
                <div style={{display: 'flex', gap:'10px', alignItems: 'center'}}>
                    <label className='main-label'>instructor's message:</label>
                    <input
                        className='main-input'
                        type='text'
                        placeholder='type your reply'
                        value={reply}
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
                        className='main-button'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Sent reply
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}