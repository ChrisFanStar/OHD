/* global api */
class ai_chatgpt_en_en_dictionary {
  constructor(options) {
    this.options = options;
    this.maxexample = 2;
    this.word = '';
  }

  async displayName() {
    let locale = await api.locale();
    return 'ai_enen_dictionary';
  }

  setOptions(options) {
    this.options = options;
    this.maxexample = options.maxexample;
  }

  async findTerm(word) {
    console.log(word);
    this.word = word;
    let results = [];

    if (!word) return [];


    // const payload = {
    //   model: 'gpt-4o-mini', // Or use the appropriate model here
    //   store: true,
    //   messages: [{ role: 'user', content: `Define the word: ${word}` }],
    // };

    const payload = {
      model: 'qwen-plus', // Or use the appropriate model here
      messages: [{ role: 'user', content: `Define the word: ${word},Parts of speech and example sentences.` }],
    };
    // Retry logic with exponential backoff

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('AI response:', data);
      const aiResponse = data.choices[0].message.content.trim();

      results.push({
        expression: word,
        definitions: [aiResponse],
      });

      return [].concat(...results).filter((x) => x);
    } catch (err) {
      console.log('Error fetching from API:', err);
      return [];
    }
  }
}
