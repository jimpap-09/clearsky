# NTUA ECE SAAS 2025 PROJECT

## TEAM 25

Instructions-Setup Guide

⚙️ Prerequisites

Make sure you have the following installed:

    Docker

    Docker Compose

🔧 Setup Instructions
  1. Clone the Repository

  ```
    git clone https://github.com/ntua/saas25-09.git  
    cd your-repo
  ```
  
  2. Build and Start Containers
  ```
    docker compose up --build
  ```
  This will:
  
      Build the Node.js app image
  
      Start the app and PostgreSQL containers
  
      Expose the app on http://localhost:3000

🧼 Stopping and Cleaning Up
```
  docker compose down
```
To remove volumes (database data):
```
  docker compose down -v
```
📫 Troubleshooting

    Port conflicts: Ensure ports 3000 and 5433 are free.


Notes when running the app (IMPORTANT):
You can start by registering an Instructor.  

For posting grades:
You have to provide an xlsx file similar to the one uploaded on this repo on the folder example files.  
The validation fields must be filled with data matching exactly the first cell of the file. For the example file:  
  -id: 3205  
  -name: ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ  
  -period: 2024-2025 Χειμερινή  
  -number of grades: 102  
**Else, the validation will fail.**

After the grades are uploaded all the students associated with them are automatically created by the app (if they dont already exist).    
To login to a specific student you have to enter its email and the default password "pass".
You can then make a review request, view the statistics etc.
    
