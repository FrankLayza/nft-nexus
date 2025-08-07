# Environment Variables for Deployment

This document outlines all the environment variables required to deploy the JuliaOS Backend.

## Required Environment Variables

### Server Configuration

- `HOST`: Server host (default: "127.0.0.1", use "0.0.0.0" for production)
- `PORT`: Server port (default: "8052")
- `HOST_URL`: Full URL of your deployed backend (e.g., "https://your-app.onrender.com")

### Database Configuration

These are automatically configured by Render when using the provided `render.yaml`:

- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password

### API Keys (Optional but Recommended)

#### Gemini API (Google AI)

- `GEMINI_API_KEY`: Your Google Gemini API key
  - Used for: LLM chat, blog writing, text summarization, swearing detection
  - Get it from: https://makersuite.google.com/app/apikey

#### Hugging Face API

- `HUGGINGFACE_API_KEY`: Your Hugging Face API key
  - Used for: DYOR research, NFT analysis
  - Get it from: https://huggingface.co/settings/tokens

#### X (Twitter) API

- `X_API_KEY`: Your X API key
- `X_API_KEY_SECRET`: Your X API key secret
- `X_ACCESS_TOKEN`: Your X access token
- `X_ACCESS_TOKEN_SECRET`: Your X access token secret
  - Used for: Posting to X/Twitter
  - Get them from: https://developer.twitter.com/en/portal/dashboard

#### Telegram Bot (Optional)

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
  - Used for: Telegram bot functionality
  - Get it from: @BotFather on Telegram

## Setting Up Environment Variables on Render

1. Go to your Render dashboard
2. Select your `juliaos-backend` service
3. Go to the "Environment" tab
4. Add the following variables manually:

### Required Variables to Set:

```
HOST_URL=https://your-app-name.onrender.com
GEMINI_API_KEY=your-gemini-api-key-here
HUGGINGFACE_API_KEY=your-huggingface-api-key-here
X_API_KEY=your-x-api-key-here
X_API_KEY_SECRET=your-x-api-key-secret-here
X_ACCESS_TOKEN=your-x-access-token-here
X_ACCESS_TOKEN_SECRET=your-x-access-token-secret-here
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
```

### Database Variables (Auto-configured):

These will be automatically set by Render when you deploy using the `render.yaml`:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## Local Development

For local development, copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your actual API keys and configuration.

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Consider using Render's secret management for production

## Testing Your Setup

After deployment, you can test if your environment variables are working by:

1. Checking the server logs in Render dashboard
2. Making a request to your health endpoint: `https://your-app.onrender.com/health`
3. Testing API endpoints that require the configured services
