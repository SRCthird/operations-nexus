import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import * as departments from './src/departments.json';
import * as displaysJSON from './src/display.json';
import axios from 'axios';
import { tenantId, clientId, clientSecret } from '../src/Config';
import bodyParser from 'body-parser';
import qs from 'qs';

const app = express();
const PORT = 5000;
const STATIC_DIR = path.join(__dirname, 'static');

app.use(bodyParser.json());

/**
 * Represents the Display object that will be returned to the client.
 */
interface Display {
    /**
     * ID of the display.
     */
    ID: number;
    /**
     * Main branch of the department.
     */
    Main: string;
    /**
     * Department name of the display.
     */
    Sub: string;
    /**
     * Child department of the display.
     */
    Department: string;
    /**
     * Name of the display.
     */
    Display: string;
    /**
     * Background Image of the display.
     */
    Background: string;
};

app.use('/static/main', express.static(path.join(STATIC_DIR, 'main')));
app.use('/static/ssc', express.static(path.join(STATIC_DIR, 'ssc')));
app.use('/static', express.static(STATIC_DIR));

/**
 * Return the list of PNG converted PowerPoint files in the source location specified by `location`.
 *
 * @param {Request} req - The HTTP request object sent to the API.
 * @param {Response} res - The HTTP response object used to reply to the client.
 * @param {string} location - The name of the subfolder under "static".
 * @returns {void} - This function processes the response but does not return anything.
 */
function slides(req: Request, res: Response, location: string): void {
    const dir = path.join(STATIC_DIR, location);
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        
        const imageFiles = files.filter(file => file.toLowerCase().endsWith('.png'))
                                .map(file => path.join(location, file));
        res.json(imageFiles);
    });
}

app.post('/api/AzureADUserService', async (req: Request, res: Response) => {
    const { username, password } = req.body;


    try {
        const tokenResponse = await axios.post(
            `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, 
            null,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    grant_type: "password",
                    client_id: clientId,
                    client_secret: clientSecret,
                    resource: "https://graph.microsoft.com",
                    scope: "User.Read",
                    username,
                    password,
                }
            }
        );
        res.json(tokenResponse.data.access_token);
    } catch (error: any) {
        console.error('Error:', error);
        console.error('Error Details:', error.response?.data); // Ensure the response exists
        res.status(500).send(error);
    }
});

// Use the access token to communicate with PowerBI (or other Microsoft Graph endpoints)
// const result = await axios.get('YOUR_POWERBI_ENDPOINT', {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

app.get('/api/MainSlides', (req: Request, res: Response) => {
    slides(req, res, 'main');
});

app.get('/api/SSC', (req: Request, res: Response) => {
    slides(req, res, 'ssc');
});

app.get('/api/delay', (req: Request, res: Response) => {
    const delay = 30 * 1000; // 30 seconds
    res.json(delay);
});

app.get('/api/display', (req: Request, res: Response) => {
    let displays: Display[] = displaysJSON;
    
    const queryParameters = req.query;

    if ('departments' in queryParameters) {
        const selectedDepartment = queryParameters['departments'] as string;
        displays = displays.filter(display => display['Department'] === selectedDepartment);
    }

    if ('search' in queryParameters) {
        const searchQuery = (queryParameters['search'] as string).toLowerCase();
        displays = displays.filter(display => 
            display['Main'].toLowerCase().includes(searchQuery) ||
            display['Sub'].toLowerCase().includes(searchQuery) ||
            display['Department'].toLowerCase().includes(searchQuery) ||
            display['Display'].toLowerCase().includes(searchQuery)
        );
    }
});

app.get('/api/departments', (req: Request, res: Response) => {
    res.json(departments);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
