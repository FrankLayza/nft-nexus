# JuliaOS Backend Deployment Guide

This guide will help you deploy the JuliaOS Backend to Render.com.

## Prerequisites

1. A Render.com account
2. Your JuliaOS Backend code in a Git repository (GitHub, GitLab, etc.)
3. API keys for the services you want to use (see environment variables section)

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Blueprint"
3. Connect your Git repository
4. Select the repository containing your JuliaOS Backend

### 2. Configure the Blueprint

1. Render will automatically detect the `render.yaml` file in your backend directory
2. The blueprint will create:
   - A PostgreSQL database service (`juliaos-database`)
   - A web service for your Julia backend (`juliaos-backend`)

### 3. Set Environment Variables

After the services are created, you need to set the environment variables:

1. Go to your `juliaos-backend` service in the Render dashboard
2. Navigate to the "Environment" tab
3. Add the following environment variables:

#### Required Variables:

```
HOST_URL=https://your-app-name.onrender.com
```

#### Optional API Keys (add these if you want to use the corresponding features):

```
GEMINI_API_KEY=your-gemini-api-key-here
HUGGINGFACE_API_KEY=your-huggingface-api-key-here
X_API_KEY=your-x-api-key-here
X_API_KEY_SECRET=your-x-api-key-secret-here
X_ACCESS_TOKEN=your-x-access-token-here
X_ACCESS_TOKEN_SECRET=your-x-access-token-secret-here
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
```

### 4. Deploy

1. Click "Deploy" in the Render dashboard
2. Render will build and deploy your application
3. The first deployment may take 10-15 minutes as it needs to install Julia and all dependencies

## Environment Variables Explained

### Server Configuration

- `HOST`: Set to "0.0.0.0" for production (automatically configured)
- `PORT`: Set to "8052" (automatically configured)
- `HOST_URL`: Your full application URL (e.g., "https://your-app.onrender.com")

### Database Configuration (Auto-configured)

These are automatically set by Render when using the provided `render.yaml`:

- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password

### API Keys

#### Gemini API (Google AI)

- Used for: LLM chat, blog writing, text summarization, swearing detection
- Get it from: https://makersuite.google.com/app/apikey

#### Hugging Face API

- Used for: DYOR research, NFT analysis
- Get it from: https://huggingface.co/settings/tokens

#### X (Twitter) API

- Used for: Posting to X/Twitter
- Get them from: https://developer.twitter.com/en/portal/dashboard

#### Telegram Bot

- Used for: Telegram bot functionality
- Get it from: @BotFather on Telegram

## Testing Your Deployment

### 1. Health Check

Test if your server is running:

```bash
curl https://your-app-name.onrender.com/ping
```

Should return a 200 status code.

### 2. API Endpoints

Test the main API endpoints:

```bash
# List agents
curl https://your-app-name.onrender.com/api/v1/agents

# List tools
curl https://your-app-name.onrender.com/api/v1/tools

# List strategies
curl https://your-app-name.onrender.com/api/v1/strategies
```

### 3. Check Logs

Monitor your application logs in the Render dashboard to ensure everything is working correctly.

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that your `Dockerfile` is in the correct location and that all required files are present.

2. **Database Connection Issues**: Ensure the database service is running and the connection variables are correctly set.

3. **API Key Errors**: Verify that your API keys are valid and have the necessary permissions.

4. **Memory Issues**: The free tier has limited memory. Consider upgrading if you encounter memory-related errors.

### Logs

Check the logs in the Render dashboard for detailed error messages and debugging information.

## Updating Your Deployment

1. Push changes to your Git repository
2. Render will automatically detect changes and redeploy
3. Monitor the deployment logs to ensure successful updates

## Cost Considerations

- **Free Tier**: Includes 750 hours per month for web services and 90 days for PostgreSQL
- **Paid Plans**: Start at $7/month for web services and $7/month for PostgreSQL

## Security Best Practices

1. Never commit API keys to your repository
2. Use environment variables for all sensitive data
3. Regularly rotate your API keys
4. Monitor your application logs for suspicious activity

## Support

If you encounter issues:

1. Check the Render documentation: https://render.com/docs
2. Review your application logs in the Render dashboard
3. Ensure all environment variables are correctly set
4. Verify your API keys are valid and have the necessary permissions
