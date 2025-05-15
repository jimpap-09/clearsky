# MICROSERVICE

## Post Grades Service

Post Requests  

**localhost:4001/uploadInitialGrades**  
**localhost:4001/uploadFinalGrades**  
Στο body πρεπει και στα 2 να στειλεις file με key "file" και για file βαζεις το excel που μας δωσαν  

**localhost:4001/validateAndPost**  
body πχ:  
```
{
    "courseId": "3205",
    "courseName": "ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ",
    "examPeriod": "2024-2025 Χειμερινή",
    "numGrades": "102"
}
```
ΠΡΟΣΟΧΗ!!!: Αυτά που βάζεις στο body εδω πρεπει να ειναι ακριβως οπως στην πρωτη γραμμη του excel αλλιως δεν πετυχαινει
