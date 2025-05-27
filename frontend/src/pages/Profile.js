import useAuth from "../context/AuthContext";
import { Link } from "react-router-dom";
import { buildPath } from "../utils/routes";

export default function Profile() {
    const {userData} = useAuth();
    const role = userData?.role;
    const isStudent = (role === 'STUDENT');
    const isInstructor = (role === 'INSTRUCTOR');
    console.log('userData = ', userData);
    return(
        <div>
            {userData ? (
            <>
            <h1 style={{display: 'flex', justifyContent:'center'}}> Welcome to your profile page </h1>
            <form
                style={{
                    display:'grid',
                    gridTemplateColumns: '1fr',
                    gap: '10px'
                }}
            >
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
                {!isStudent && (
                <div style={{display:'flex', gap: '10px', marginTop: '1rem'}}>
                    <label>{isInstructor ? 'Post Grades' : 'User Management:'}</label>
                    <button>
                        <Link
                        style={{textDecoration:'none', color: 'inherit'}}
                        to={buildPath(userData, "/user-management")}>
                            {isInstructor ? 'post grades' : 'user management'}
                        </Link>
                    </button>
                </div>
                )}
            </form>
            </>
            ):(
            <h1 style={{display: 'flex', justifyContent:'center'}}> Please login ... </h1>
            )}
        </div>
    );
}