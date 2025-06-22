# NTUA ECE SAAS 2025 PROJECT

## TEAM 25

Περιγραφή - οδηγίες

Περιέχονται φάκελοι για 15 microservices. Ο αριθμός είναι εντελώς ενδεικτικός. Δημιουργήστε ακριβώς όσα απαιτούνται από τη λύση σας.

Πρεπει να κατεβασεις την postgresql 

Για καθε ενα microservice πρεπει να φτιαξεις μια βαση. Στο τερμιναλ πας στον φακελο του microservice και πατας αυτα:
```
psql -U postgres
CREATE DATABASE your_db_name;
```
Αντι για your_db_name πρεπει να βαλεις το ονομα της βασης που γραφει στο .env αρχειο του microservice  
Μετα πατα στο terminal npm install για να κατεβουν οι βιβλιοθηκες που εχει στο package.json (αν δεν τις εχεις ηδη ολες)  
Μετα πατα npm run dev για να ξεκινησει το microservice.  
Πρεπει να εκκινησεις καθε microservice και να τρεχει ξεχωριστα. Δηλαδη πρεπει να τρεχει ενα σε καθε terminal.

Εντολές docker:

1. Χτίσιμο των images και εκκίνηση των containers 
docker compose up --build
2. Το ίδιο αλλά χωρίς logs
docker compose up --build -d
3. Απλή επαννεκίνηση
docker compose up
4. Σταματάω να το τρέχω
docker compose down
5. Βλέπω τον container της βάσης μέσω terminal
docker exec -it saas25-09-postgres-1 psql -U postgres
6. Βλέπω πόσους container-images έχω και πόση μνήμη καταλαμβάνουν
docker system df
7. Βλέπω τα logs στο review request container
docker logs -f saas25-09-review-request-service-1

Upload Grades Page:
3205
ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ
2024-2025 Χειμερινή
102

el84623@mail.ntua.gr
el84610@mail.ntua.gr
el84620@mail.ntua.gr
el84625@mail.ntua.gr
el70676@mail.ntua.gr
el84618@mail.ntua.gr
el80915@mail.ntua.gr
el68190@mail.ntua.gr
el81137@mail.ntua.gr
el81872@mail.ntua.gr
el81873@mail.ntua.gr
el80098@mail.ntua.gr
el80877@mail.ntua.gr
el81697@mail.ntua.gr
el78558@mail.ntua.gr
el81097@mail.ntua.gr
el80860@mail.ntua.gr
el75501@mail.ntua.gr

pass

i want at least 9
Ok u get 10
Νο you get 8