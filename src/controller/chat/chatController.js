import { Configuration, OpenAIApi } from 'openai';
import { rc4 } from 'npm-rc4';

const configuration = new Configuration({
    apiKey: process.env['OPENAI_API_KEY']
});

const openai = new OpenAIApi(configuration);

const conversation = [
];

export const goChat = (req, res) => {
    const openAIApiKey = process.env['OPENAI_API_KEY'];
    if (!openAIApiKey) {
        return res.render('chat', { messages: [{
            type: 'error',
            text: `Falta la variable de entorno "OPENAI_API_KEY" en el servidor. Sin ella, el chat no funciona :-(`,
        }], conversation });
    }
    res.render('chat', { messages: [{
        type: 'ok',
        text: `Pregunta lo que quieras a Chat-GPT`,
        autoDestroy: true
    }], conversation });
};

export const addUserPrompt = async (req, res) => {
    const { userPrompt } = req.body;

    conversation.push({ role: 'user', content: userPrompt });
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversation,
        });
        conversation.push(completion.data.choices[0].message);
    } catch (error) {
        let msg = null;
        if (error.response && error.response.status === 429) {
            msg = `No hay saldo en tu cuenta de OpenAI. No puedes usar la API`;
        } else {
            msg = error;
        }
        return res.render('chat', { messages: [{
            type: 'error',
            text: msg
        }],conversation });
        
    }
    
    return res.render('chat', { conversation });
};