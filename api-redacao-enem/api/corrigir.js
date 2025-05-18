// api/corrigir.js
export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validação do método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Resposta de teste (substitua pela sua lógica depois)
    res.status(200).json({ 
      status: 'SUCESSO', 
      message: 'API está funcionando!',
      promptRecebido: req.body.prompt 
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
}
