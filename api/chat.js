import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export default async function handler(req, res) {

  try {

    const { pergunta } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const contexto = `
Você é o PorkBot.

Você representa o time Porkitos.

Responda apenas assuntos relacionados aos Porkitos.

Se não souber algo,
oriente o usuário a entrar em contato com a equipe.
`;

    const result =
      await model.generateContent(
        contexto + "\n\nPergunta: " + pergunta
      );

    const resposta =
      result.response.text();

    res.status(200).json({
      resposta
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      resposta: "Erro interno."
    });
  }
}