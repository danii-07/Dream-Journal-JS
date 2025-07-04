require('dotenv').config();
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs/promises'); // Use fs.promises for async file operations


const { GoogleGenAI } = require('@google/genai');

let mainWindow;

const dreamsFilePath = path.join(app.getPath('userData'), 'dreams.json');

// --- Google Gemini AI Configuration (for @google/genai) ---

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let aiClient;
let generativeModelId = "gemini-2.5-flash";

if (GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
    console.log("New Gemini AI client initialized successfully.");
  } catch (initError) {
    console.error("ERROR: Failed to initialize GoogleGenAI client:", initError);
    aiClient = null;
  }
} else {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is not set or empty. AI functions will not work.");
}


// --- Electron Window Creation ---

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 772,
    height: 1000,
    minWidth: 600,
    minHeight: 800,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- IPC Handler for Saving Dreams ---

ipcMain.handle('save-dream', async (event, dreamData) => {
  try {
    let dreams = [];
    await fs.access(dreamsFilePath, fs.constants.F_OK)
      .then(async () => {
        const rawData = await fs.readFile(dreamsFilePath, 'utf8');
        dreams = JSON.parse(rawData);
      })
      .catch(() => {
        // IF file does not exist, 'dreams' remains an empty array
      });

    dreams.push(dreamData);
    await fs.writeFile(dreamsFilePath, JSON.stringify(dreams, null, 2));
    return { success: true, message: 'Dream saved successfully!' };
  } catch (error) {
    console.error('Failed to save dream:', error);
    return { success: false, message: 'Failed to save dream.', error: error.message };
  }
});

// --- IPC Handler for Loading Dreams ---

ipcMain.handle('load-dreams', async () => {
  try {
    await fs.access(dreamsFilePath, fs.constants.F_OK);
    const rawData = await fs.readFile(dreamsFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Failed to load dreams:', error);
    return [];
  }
});

// --- IPC Handler for Google Gemini AI Analysis ---

ipcMain.handle('analyze-dream', async (event, dreamContext) => {
    
    if (!aiClient) {
        console.error("AI analysis not fully initialized. GoogleGenAI client failed to load during app startup.");
        return "AI analysis is not configured. Please ensure your GEMINI_API_KEY is correct and client initialized.";
    }

    const { description, emotion, keywords } = dreamContext;

    let promptContent = `Analyze the following dream. Focus on potential meanings, common interpretations, and psychological insights.
    
Dream Description: "${description}"`;

    if (emotion && emotion !== 'N/A') {
        promptContent += `\nReported Emotion: "${emotion}"`;
    }
    if (keywords && keywords.length > 0 && !(keywords.length === 1 && keywords[0] === 'N/A')) {
        promptContent += `\nKeywords/Symbols: ${keywords.join(', ')}`;
    }

    // --- PROMPT LINE ---

    promptContent += `\n\nPlease provide a concise analysis in a single paragraph. Start directly with the analysis, no conversational filler.`;
  

    try {
        const response = await aiClient.models.generateContent({
            model: generativeModelId,
            contents: promptContent,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });

        let text;
        if (response && response.contents) {
            text = response.contents;
        } else if (response && response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
            text = response.candidates[0].content.parts[0].text;
        } else {
            console.error("DEBUG: Unexpected response structure from Gemini API:", JSON.stringify(response, null, 2));
            return "Error: Could not parse AI response. Unexpected format.";
        }
        
        return text;
    } catch (error) {
        console.error("ERROR: Error analyzing dream with new Gemini client:", error);
        return `Error during AI analysis: ${error.message}. This might be due to network issues, model unavailability, or API key issues with the new client.`;
    }
});