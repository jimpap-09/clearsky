import useAuth from "../context/AuthContext";

export default function Profile() {
    const {userData} = useAuth();
    console.log('userData = ', userData);
    return(
        <div>
            {userData && (
            <>
            <h1>Welcome to your profile page</h1>
            <form
                style={{
                    display:'grid',
                    gridTemplateColumns: '1fr',
                    gap: '10px'
                }}>
                <div style={{display:'flex', gap: '10px'}}> 
                    <label>id:</label>
                    <input readOnly value={userData.id}/>
                </div>
                <div style={{display:'flex', gap: '10px'}}> 
                    <label>password:</label>
                    <input readOnly value={userData.password}/>
                </div>
                <div style={{display:'flex', gap: '10px'}}> 
                    <label>email:</label>
                    <input readOnly value={userData.email}/>
                </div>
                <div style={{display:'flex', gap: '10px'}}> 
                    <label>name:</label>
                    <input readOnly value={userData.name}/>
                </div>
                <div style={{display:'flex', gap: '10px'}}> 
                    <label>role:</label>
                    <input readOnly value={userData.role}/>
                </div>
            </form>
            </>
            )}
        </div>
    );
}