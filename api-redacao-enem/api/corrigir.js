export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ erro: "Método não permitido" });

  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ erro: "Prompt ausente" });

  try {
    const resposta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "Você é um corretor de redações especializado no ENEM." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5
      })
    });

    const dados = await resposta.json();
    const conteudo = dados.choices?.[0]?.message?.content || "Sem resposta da IA";
    res.status(200).json({ resposta: conteudo });

  } catch (erro) {
    res.status(500).json({ erro: "Erro interno", detalhe: erro.message });
  }
}
