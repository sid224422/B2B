// Test script to debug AI API endpoint
const fetch = require('node-fetch');

async function testAIAPI() {
  try {
    console.log('Testing AI API endpoint...');
    
    const response = await fetch('http://localhost:3000/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: 'web development agencies',
        filter: { type: 'company' }
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAIAPI();
