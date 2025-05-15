# MICROSERVICE

## Review Request Service

POST Request
**localhost:4003/createReviewRequest**
body πχ:  
```
{
  "courseId": "",
  "studentId": "",
  "studentMessage": ""
}
```

PUT Request  
**localhost:4003/replyToReviewRequest/:courseId/:studentId**  
body πχ:  
```
{
  "professorReply": "",
  "status": ""
}
```
Το status είναι ή accepted ή rejected

GET Requests

**localhost:4003/getAllReviewRequests**
Επιστρέφει πχ:  
```
{
  "courseId": "",
  "studentId": "",
  "studentMessage": "",
  "professorReply": "",
  "status": ""
}
```

**localhost:4003/getReviewRequest/:courseId/:studentId**
Επιστρέφει πχ:
```
{
  "courseId": "",
  "studentId": "",
  "studentMessage": "",
  "professorReply": "",
  "status": ""
}
```
