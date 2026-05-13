import express from 'express'
import type { Request, Response } from 'express'
const app = express();
const port = 3000;
app.use(express.json());
type Produto = { id: number; nome: string; preco: number };
let produtos: Produto[] = [
{ id: 1, nome: 'mouse', preco: 89.90 },
{ id: 2, nome: 'teclado', preco: 199.90 },
];
let proximoId = 3;
app.get('/produtos', (req: Request, res: Response) => {
res.json(produtos);
});
app.get('/produtos/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
const produto = produtos.find(p => p.id === id);
if (!produto) {
res.status(404).json({ erro: 'Produto não encontrado.' });
return;
}
res.json(produto);
});
app.post('/produtos', (req: Request, res: Response) => {
const { nome, preco } = req.body;
if (!nome || preco === undefined) {
res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
return;
}
const novo: Produto = { id: proximoId++, nome, preco };
produtos.push(novo);
res.status(201).json(novo);
});
app.put('/produtos/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
const { nome, preco } = req.body;
if (!nome || preco === undefined) {
res.status(400).json({ erro: 'Envie todos os campos.' });
return;
}
const indice = produtos.findIndex(p => p.id === id);
if (indice === -1) {
res.status(404).json({ erro: 'Produto não encontrado.' });
return;
}
produtos[indice] = { id, nome, preco };
res.json(produtos[indice]);
});
app.patch('/produtos/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
const produto = produtos.find(p => p.id === id);
if (!produto) {
res.status(404).json({ erro: 'Produto não encontrado.' });
return;
}
Object.assign(produto, req.body);
res.json(produto);
});
app.delete('/produtos/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
const indice = produtos.findIndex(p => p.id === id);
if (indice === -1) {
res.status(404).json({ erro: 'Produto não encontrado.' });
return;
}
produtos.splice(indice, 1);
res.status(204).send();
});
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});
