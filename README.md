This is a Chat Application built using NextJS

<!-- Adding prisma/postgres to the project -->
npx prisma init --datasource-provider postgresql

add models to the schema.prisma

then npx prisma migrate dev --name init

<!-- Pending tasks -->
1. Whenever a person initiates a chat(click on new chat and sends message), the other person receives 
but cannot see until he clicks on new chat and search for this user. Automate this i.e., add this to the other account also whenever user searches for the user