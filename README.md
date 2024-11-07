# NextJS AI Chatbot to Generate Textual Adventure Game

We use Google's Gemini API to generate text. NextJS app calls the API through a chat interface

The system prompt instructs Gemini to act as an interactive adventure storyteller, generating  user-driven narratives with multiple possible paths and endings. It requires the AI to craft immersive scenes that unfold based on user choices. Each choice should lead to unique outcomes and include plot twists to keep the adventure engaging.

<img src="app-screenshot.png" alt="app demo" width=600>

## Getting Started

First, duplicate the `.env` file into a new file named `.env.local`. Update the value of your [OpenAI API key](https://platform.openai.com/api-keys) there.

The first time you are running this project, you will need to install the dependencies. Run this command in your terminal:

```bash
yarn
```

To start the app, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Challenges

### Challenge 1
TypeScript detects mismatch due to different versions of *@ai-sdk/provider* and *@ai-sdk/google*

**Solution: Clear node_modules and Reinstall:** Delete the node_modules folder and the lock file (*package-lock.json or yarn.lock*), then reinstall dependencies to ensure all packages are aligned:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Challenge 2
Loading **favicon** in the web title. 

**Solution: Add favicon in the head tag.**:
In *layout.tsx*, add the following code:

```tsx
<head>
<link rel="icon" href="/favicon.ico" />
</head>
```
The code snippet should be under the html tag.

## References
- [NextJS ChatBot Template Tutorial](https://www.youtube.com/watch?v=sHuIIX79MOs&ab_channel=CodebenderAI)
- [useChat() documentation](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)
- [ai-sdk chatbot](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot)

