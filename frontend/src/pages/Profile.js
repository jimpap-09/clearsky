import useAuth from "../context/AuthContext";
import { Link } from "react-router-dom";
import { buildPath } from "../utils/routes";

export default function Profile() {
    const {userData} = useAuth();
    const role = userData?.role;
    const isStudent = (role === 'STUDENT');
    const isInstructor = (role === 'INSTRUCTOR');
    const subPath = isInstructor ? "/post-grades" : "/user-management";
    console.log('userData = ', userData);
    return(
        <div>
            {userData ? (
            <>
            <h1 style={{display: 'flex', justifyContent:'center'}}> Welcome to your profile page </h1>
            <form
                className="main-form"
                // style={{
                //     display:'grid',
                //     gridTemplateColumns: '1fr',
                //     gap: '10px'
                // }}
            >
                <div className="label-container"> 
                    <label className="main-label">id:</label>
                    <input className="main-input" readOnly value={userData.id}/>
                </div>
                <div className="label-container"> 
                    <label className="main-label">password:</label>
                    <input className="main-input" readOnly value={userData.password}/>
                </div>
                <div className="label-container"> 
                    <label className="main-label">email:</label>
                    <input className="main-input" readOnly value={userData.email}/>
                </div>
                <div className="label-container"> 
                    <label className="main-label">name:</label>
                    <input className="main-input" readOnly value={userData.name}/>
                </div>
                <div className="label-container"> 
                    <label className="main-label">role:</label>
                    <input className="main-input" readOnly value={userData.role}/>
                </div>
                {!isStudent && (
                <div className="label-container">
                    <label className="main-label">{isInstructor ? 'Post Grades' : 'User Management:'}</label>
                    <button className="main-button">
                        <Link
                        style={{textDecoration:'none', color: 'inherit'}}
                        to={buildPath(userData, subPath)}>
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