
const axios = require('axios');

// 用于调用GPT的API地址
const apiURL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// 设置GPT API的参数
const params = {
  temperature: 0.8,
  max_tokens: 50,
  top_p: 1.0,
  frequency_penalty: 0.0,
};

// 定义对话历史记录
const conversationHistory = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Who won the world series in 2020?' },
  { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
  { role: 'user', content: 'Where was it played?' },
];

// 构建完整的对话prompt
const buildPrompt = () => {
  let prompt = '';

  conversationHistory.forEach((msg) => {
    prompt += `${msg.role}: ${msg.content}\n`;
  });

  prompt += 'Assistant:';

  return prompt;
};

// 调用GPT API发送请求
const generateResponse = async (prompt) => {
  const data = {
    prompt: prompt,
    ...params,
  };

  try {
    const response = await axios.post(apiURL, data, {
      headers: {
        Authorization: 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    return 'Error generating response.';
  }
};

// 根据用户输入获取回复
const getResponse = async (userInput) => {
  // 将用户输入添加到历史记录中
  conversationHistory.push({ role: 'user', content: userInput });

  // 构建对话prompt
  const prompt = buildPrompt();

  // 调用GPT API生成回复
  const response = await generateResponse(prompt);

  // 将模型生成的回复添加到历史记录中
  conversationHistory.push({ role: 'assistant', content: response });

  return response;
};

// 调用示例
const userInput = 'What is the capital of France?';
getResponse(userInput).then((response) => {
  console.log('Assistant:', response);
});
