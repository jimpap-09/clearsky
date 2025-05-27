// analytics routes
export const get_student_grades_url = 'http://localhost:4002/studentGrades'
export const get_total_grade_distribution_url = 'http://localhost:4002/totalGradeDistribution'
export const get_question_distribution_url = 'http://localhost:4002/questionDistribution'

// course routes
export const get_student_courses_url = 'http://localhost:4004/getStudentCourses'
export const get_instructor_courses_url = 'http://localhost:4004/getInstructorCourses'
export const get_all_courses_url = 'http://localhost:4004/getAllCourses'

// post grades routes
export const post_init_grades_url = 'http://localhost:4001/uploadInitialGrades'
export const post_final_grades_url = 'http://localhost:4001/uploadFinalGrades'
export const post_validate_url = 'http://localhost:4001/validateAndPost'

// review requests routes
export const post_request_url = 'http://localhost:4003/createReviewRequest'
export const put_request_url = 'http://localhost:4003/replyToReviewRequest'
export const get_all_reviews_requests_url = 'http://localhost:4003/getAllReviewRequests'
export const get_review_request_url = 'http://localhost:4003/getReviewRequest'
export const get_instructor_review_request_url = 'http://localhost:4003/getReviewRequestsByInstructor'

// user management routes
export const post_register_url = 'http://localhost:5000/register'
export const get_login_url = 'http://localhost:5000/login'
export const get_users_by_ids_url = 'http://localhost:5000/getUsersByIds'