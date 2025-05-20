import {useEffect, useState} from 'react';
import { fetchCourseData, fetchStudentGrades } from '../../api/coursesStats';
import GradesBox from './GradesBox';
import StatsCards from './StatsCards';

// show personal grades - main page
export default function PersonalGrades({studentId, course, onBack}) {

    const courseId = course?.id;
    const [grades, setGrades] = useState(null);
    const [courseStats, setCourseStats] = useState(null);
    const [questionStats, setQuestionStats] = useState(null);

    console.log('Personal Grades: studentId = ', studentId);
    console.log('Personal Grades: courseId = ', courseId);

    // fetch student grades for the selected course
    useEffect(() => {
        const loadGrades = async () => {
            const data = await fetchStudentGrades(studentId, courseId);
            console.log("Grades Fetched: ", data);
            setGrades(data);
        };
        if(studentId || courseId) loadGrades();
    }, [courseId, studentId]);

    // fetch total distribution and average per qeustion for the selected course
    useEffect(() => {
        const loadStats = async () => {
            const stats = await fetchCourseData(course);
            setCourseStats(stats?.tot_course_grades);
            setQuestionStats(stats?.tot_question_grades);
            console.log("Courses Stats: ", courseStats);
            console.log("Question Stats: ", questionStats);
        };
        if(course) loadStats();
    }, [course]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <div className='main-container'>
                <div className='main-container-header'>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{course.name} - {course.period}</div>
                    {onBack && (
                    <button
                        onClick={onBack}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '6px 12px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Back
                    </button>
                    )}
                </div>
                <div className='main-container-body' style={{display: 'flex', flexWrap: 'wrap'}}>
                {course && grades && (
                <GradesBox 
                    course={course} 
                    grades={{ total: grades.totalGrade, ...grades.perQuestion }} />
                )}
                <StatsCards course={course} courseStats={courseStats} title={'Total Distribution'} />
                {questionStats && Object.entries(questionStats).map(([question, data]) => (
                <StatsCards key={question} course={course} courseStats={data} title={question} />
                ))}
                </div>
            </div>
        </div>
    );
}