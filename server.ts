import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Rio Express Travel Server" });
});

// Gemini AI Concierge Endpoint
app.post("/api/chat/gemini", async (req, res) => {
  try {
    const { prompt, travelersCount = 2, stayDays = 3, budget = "conforto" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "O campo 'prompt' é obrigatório." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        answer: `[Atendimento de Exemplo Ginga AI] Dica para "${prompt}": Recomendamos visitar o Cristo Redentor bem cedo (08:00) para evitar filas e calor intenso. Em seguida, desça para um almoço com vista na Urca antes do Pão de Açúcar no fim da tarde. Para ${travelersCount} pessoas com orçamento ${budget}, a melhor opção é contratar um motorista privativo credenciado para o dia todo.`,
        quickTips: [
          "Garanta ingressos com antecedência de 48h.",
          "Traga protetor solar e chapéu para o Corcovado e Pão de Açúcar.",
          "Use a comunicação dentro da nossa plataforma para solicitar seu motorista."
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `Você é o "Ginga AI Concierge", o especialista oficial e guia turístico virtual do Rio de Janeiro na plataforma Rio Express Travel.
Sua missão é ajudar turistas locais e internacionais a planejarem a melhor viagem ao Rio de Janeiro com segurança, conforto, transporte credenciado e economia.
Sempre seja extremamente receptivo, entusiasmado, cortês e prático.
Responda em Português do Brasil com formatação limpa e objetiva.

Contexto do usuário:
- Número de viajantes: ${travelersCount}
- Dias de permanência: ${stayDays}
- Perfil/Orçamento: ${budget}

Fatos importantes sobre o Rio para incluir quando pertinente:
- Cristo Redentor (Corcovado): melhor ir às 08h da manhã.
- Pão de Açúcar (Urca): espetacular no pôr do sol por volta das 17h30.
- Motoristas credenciados da plataforma possuem Cadastur, ar-condicionado e oferecem pacotes com desconto.
- Toda negociação e agendamento passam pela plataforma Rio Express para segurança do cliente.

Responda à pergunta do usuário de forma útil e estruturada em parágrafos claros com tópicos se necessário.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\n\nPergunta do usuário: ${prompt}` }] }
      ]
    });

    const replyText = response.text || "Desculpe, não consegui processar a resposta no momento. Tente novamente em instantes.";

    return res.json({
      answer: replyText,
      quickTips: [
        "Aproveite os cupons de até 20% OFF na aba de Descontos.",
        "Solicite orçamentos diretos com os motoristas indicados pela plataforma.",
        "Mantenha todas as trocas de mensagens e pagamentos dentro da plataforma para sua garantia."
      ]
    });

  } catch (error: any) {
    console.error("Erro no endpoint Gemini:", error);
    return res.status(500).json({
      error: "Ocorreu um erro ao consultar o concierge virtual.",
      details: error.message
    });
  }
});

// Endpoint to simulate motorista fast reply
app.post("/api/messages/reply-simulation", (req, res) => {
  const { driverName, messageText } = req.body;
  
  let simulatedResponse = `Olá! Recebi sua mensagem: "${messageText}". Como motorista credenciado pela plataforma Rio Express, fico feliz em atuar como seu transporte no Rio. Posso agendar esse serviço para você com veículo com ar-condicionado e garantia de pontualidade. Deseja confirmar os detalhes?`;

  if (messageText?.toLowerCase().includes("cristo") || messageText?.toLowerCase().includes("corcovado")) {
    simulatedResponse = `Excelente escolha! Para o Cristo Redentor recomendo sairmos por volta das 08:00h para pegar pouca fila. O transfer de ida e volta para o seu hotel na Zona Sul sai por R$ 180,00 com direito a parada na Escadaria Selarón. Podemos agendar?`;
  } else if (messageText?.toLowerCase().includes("desconto") || messageText?.toLowerCase().includes("cupom")) {
    simulatedResponse = `Com certeza! Se fechar o passeio de dia inteiro (8 horas) comigo hoje pela plataforma, consigo aplicar o cupom RIOMARAVILHA100 com R$ 100,00 de desconto no valor total.`;
  }

  setTimeout(() => {
    res.json({
      reply: simulatedResponse,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    });
  }, 1000);
});

// Setup Vite Development or Production Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor Rio Express Travel rodando na porta ${PORT}`);
  });
}

startServer();
