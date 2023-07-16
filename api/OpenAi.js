import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiKey } from '../constants';
const Client = axios.create({
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
});

axiosRetry(Client, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleEndPoint = "https://api.openai.com/v1/images/generations";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiCall = async (prompt, messages) => {
  try {
    await delay(1000); // Introduce a delay of 1 second before making the request

  



    prompt = prompt.toLowerCase();
    let isArt = prompt.includes('image') || prompt.includes('sketch') || prompt.includes('art') || prompt.includes('picture') || prompt.includes('drawing');

    if (isArt) {
      console.log('dalle api call');
      return dalleapiCall(prompt, messages);
    } else {
      console.log('chatgpt api call');
      return chatgptApiCall(prompt, messages);
    }
  } catch (error) {
    console.log("error", error);
    return Promise.resolve({ success: false, msg: error.message });
  }
};
  

const chatgptApiCall = async (prompt, messages) => {
  try {
    await delay(1000); // Introduce a delay of 1 second before making the request

    const res = await Client.post(chatgptUrl, {
      model: "gpt-3.5-turbo",
      messages
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({ role: 'assistant', content: answer });

    return Promise.resolve({ success: true, data: messages });
  } catch (err) {
    console.log('error: ', err);
    return Promise.resolve({ success: false, msg: err.message });
  }
}

const dalleapiCall = async (prompt, messages) => {
  try {
    await delay(1000); // Introduce a delay of 1 second before making the request

    const res = await Client.post(dalleEndPoint, {
      prompt,
      n: 1,
      size: "512x512"
    });

    let url = res.data?.data[0]?.url;
    console.log(url);

    messages.push({ role: "assistant", content: url });
    return Promise.resolve({ success: true, data: messages });
  } catch (error) {
    console.log('err', error);
    return Promise.resolve({ success: false, msg: error.message });
  }
};
