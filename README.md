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
