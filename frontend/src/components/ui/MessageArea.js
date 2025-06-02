export default function MessageArea () {
    return (
        <div className="main-container">
            <h2 className="main-container-header"> Message Area </h2>
            <div className="main-container-body">
                <div className="message-area">
                    <input
                        type='text'
                        style={{
                            display: 'flex',
                            textWrap: 'start',
                            width: '100%',
                            minHeight: '100px',
                            borderColor: "ButtonFace",
                            bottom: '0',
                            fontSize: '1rem',
                        }}
                        placeholder='Write your message here...'
                    />
                </div>
            </div>
        </div>
    );
}