import express from 'express'
import type { Request, Response } from 'express'

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello');
});

app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/hello', (req: Request, res: Response) => {
   const nome = req.query.nome as string;

   if (!nome) {
      res.status(400).json({ erro: 'O parâmetro "nome" é obrigatório.' });
      return;
   }

   res.json({ mensagem: `Olá, ${nome}!` });
});

app.get('/soma/:n1/:n2', (req: Request, res: Response) => {
   const n1 = Number(req.params.n1);
   const n2 = Number(req.params.n2);

if (isNaN(n1) || isNaN(n2)) {
      res.status(400).json({ erro: 'Os parâmetros devem ser números.' });
      return;
   }

   res.json({ n1, n2, resultado: n1 + n2 });
});