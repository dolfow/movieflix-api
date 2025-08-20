import express from "express";
import client = require("./generated/prisma/client");


const port = 3000;
const app = express();
const prisma = new client.PrismaClient();

app.get('/movies', async (_, res) => {
 const movies = await prisma.movie.findMany({
   orderBy: { title: 'asc' },
   include: { genres: true, languages: true },
 });
 res.json(movies);
 
});
app.post('/movies', async (req, res) => {
console.log(`conteudo: ${req.body.title}`)
/* const { title, genre_id, language_id, oscar_count, release_date } = req.body;

 await prisma.movie.create({
   data: {
     title: title,
     genre_id: genre_id,
     language_id: language_id,
     oscar_count: oscar_count,
     release_date: new Date(release_date),
   },
 });*/

 res.status(201).send();
});
/*app.post('/movies', async (req, res) => {
 await prisma.movie.create({
   data: {
     title: 'Filme de teste',
     genre_id: 7,
     language_id: 1,
     oscar_count: 0,
  // cuidado aqui, o mes começa em 0 e vai até 11
     release_date: new Date(2020, 0, 1),
   },
 });
 res.status(201).send();
});*/

app.listen(port, () => {
   console.log(`Servidor em execução em http://localhost:${port}`);
});