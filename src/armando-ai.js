'use strict'
import OpenAI from 'openai'; 

export async function getAssistantMessage (msg, messageHistory) {
    const openai = new OpenAI({apiKey: localStorage.getItem('openaiKey'), dangerouslyAllowBrowser: true });

    var messages = new Array();
    const delimiter = '####';

    messages = messages.concat(
        [{
            content: `
                Você é um assistente especialista em organização de armários para objetos e roupas.
                A seguir o usuário irá enviar perguntas. Sempre responda com a melhor opção para organizar os objetos que encontrar na pergunta.
                A mensagem do usuário está após o delimitador ` + delimiter,
            role: 'system'   
        }],
        messageHistory,
        [{
            content : delimiter + ' ' + msg,
            role : 'user'
        }]
    );
    
    const chatParams = {
        model: "gpt-3.5-turbo", // The model to use
        messages: messages,
        temperature: 0.5, // The randomness of the completion
        frequency_penalty: 0.1, // The penalty for repeating words or phrases
        presence_penalty: 0.1 // The penalty for mentioning new entities
    };

    const completion = await openai.chat.completions.create(chatParams);
    return completion.choices[0].message;
}