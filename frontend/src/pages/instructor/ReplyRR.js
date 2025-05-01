import React from 'react';

export default function ReplyRR() {
    return (
        <div className='reply-container'>
            <h1>Instructor name</h1>
            <div className='main-container'>
                <h2 className='main-container-header'>INITIAL GRADES POSTING</h2>
                <div className='main-container-body'>
                    <form>
                        <div className='label-container'>
                            <label className='main-container-label'> xlsx file with initial grades:</label>
                            <input
                            type='file'
                            placeholder='select file to upload or drag and drop'
                            >
                            </input>
                        </div>
                        <button type="submit">submit initial grades</button>
                    </form>
                </div>
            </div>
            <div className='main-container'>
                <h2 className='main-container-header'>XLSX file parsing</h2>
                <form>
                    <div className='label-container'>
                    <label>Course:</label>
                    <input type="text" placeholder="Course name"/>
                    </div>
                    <div className='label-container'>
                        <label>Period:</label>
                        <input type="text" placeholder="Exam period"/>
                    </div>
                    <div className='label-container'>
                        <label>n of grades:</label>
                        <input type="text" placeholder="N"/>
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