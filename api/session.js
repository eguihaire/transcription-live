export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-4o-realtime-preview",
            audio: {
              input: {
                transcription: {
                  model: "gpt-4o-transcribe",
                  language: "fr",
                },
              },
            },
          },
        }),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
