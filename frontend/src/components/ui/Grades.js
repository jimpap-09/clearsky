import {useEffect, useState} from 'react';
import { fetchCourseData, fetchStudentGrades } from '../../api/stats';
import GradesBox from './GradesBox';
import StatsCards from './StatsCards';

// show personal grades - main page
export default function Grades({userId, course, onBack, personal}) {

    const courseId = course?.id;
    const [grades, setGrades] = useState(null);
    const [courseStats, setCourseStats] = useState(null);
    const [questionStats, setQuestionStats] = useState(null);

    console.log('Grades: userId = ', userId);
    console.log('Grades: courseId = ', courseId);

    // fetch student grades for the selected course
    useEffect(() => {
        const loadGrades = async () => {
            const data = await fetchStudentGrades(userId, courseId);
            console.log("Grades Fetched: ", data);
            setGrades(data);
        };
        if(userId && courseId && personal) loadGrades();
    }, [courseId, userId, personal]);

    // fetch total distribution and average per qeustion for the selected course
    useEffect(() => {
        const loadStats = async () => {
            const stats = await fetchCourseData(course);
            setCourseStats(stats?.tot_course_grades);
            setQuestionStats(stats?.tot_question_grades);
        };
        if(course) loadStats();
    }, [course]);

    return (
        <div style={{ fontFamily: 'Arial' }}>
            {onBack && (
            <button className='main-button' onClick={onBack}>
                Back
            </button>
            )}
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-start'}}>
                <div>
                {course && grades && personal && (
                <GradesBox 
                    course={course}
                    grades={{ total: grades.totalGrade, ...grades.perQuestion }} />
                )}
                </div>
                <div className='graphs'>
                    <StatsCards course={course} courseStats={courseStats} title={'Total Distribution'} />
                    {questionStats && Object.entries(questionStats).map(([question, data]) => (
                    <StatsCards key={question} course={course} courseStats={data} title={question} />
                    ))}
                </div>
            </div>
        </div>
    );
}