import { Configuration, OpenAIApi } from 'openai';
import { cfg } from '../../config.js'

const configuration = new Configuration({
    apiKey: cfg.openAI.API_KEY
});

const openai = new OpenAIApi(configuration);

const conversation = [
];

export const goChat = (req, res) => {
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
        console.log(completion.data.choices[0].message);
        conversation.push(completion.data.choices[0].message);
    } catch (error) {
        return res.render('chat', { messages: [{
            type: 'error',
            text: `No hay saldo en tu cuenta de OpenAI. No puedes usar la API`
        }],conversation });
        
    }
    
    return res.render('chat', { conversation });
};