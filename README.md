# Bankdata_coding_challenge
Opgaven gik ud på at implementere en Banking API, som kan bruges af brugere til at oprette en konto, se deres konti og overføre et beløb.

## Backend 
For at løse denne opgave valgte jeg at benytte mig af C#/.NET på grund af de best practices, den tillader, og den måde, man kan få lavet en layered arkitektur på, som giver mulighed for separation of concern og maintainability. Da API'en bruges i et miljø, hvor sikkerhed er vigtigt, kan denne arkitektur også tillade hvert layer at have sin egen logging-mekanisme. Derudover læner .NET sig op af RESTful designprincipperne, som blandt andet gør, at API'en er stateless og derfor ikke afhænger af de tidligere requests.

API'en understøtter følgende operationer (Postman):

1. Muligheden for at se sine egne konti
2. Overføre et beløb fra en konto til en anden
3. Oprette en konto

Som bruger er det muligt at oprette en konto, men på nuværende tidspunkt er saldoen automatisk sat til 50 kr. Derudover er der også blevet implementeret en SQLite-database. Grunden til, at denne database blev valgt, er fordi den er lightweight og simpel at bruge til at teste logikken med. 

## Frontend
Der er også implementeret en frontend med et meget simpelt loginsystem, som blot tager brugernavn (Pradeep) og ID (1) til sig, hvor brugeren herefter har mulighed for at interagere med API'en. Det er dog kun muligt at se sine konti med saldo og overføre fra en konto til en anden, da den sidste operation ikke er blevet implementeret grundet tiden. Frontenden er blevet implementeret i Angular som sammen med bootstrap visualiserer den data, som bliver hentet via Kestrel serveren via HTTP requests. Disse HTTP requests bliver kaldt i de såkaldte Angular services, som er blevet implementeret for at kunne genanvende den samme logik. Ved at indkapsle business logik i services øger man også scalability. Angular applikationen består af komponenter, som man kan diagere ved brug af Angular routing. Da enkelte routes kan indeholde sensitiv data er der blevet implementeret Angular guards, så man kan kontrollere dem som rent faktisk har adgang til data og sende en notifikation til dem som ikke kan
