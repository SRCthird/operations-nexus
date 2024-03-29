# Operations Nexus

Operations Nexus is a meticulously crafted web application, developed utilizing the robustness of React and the precision of TypeScript, designed to streamline and enhance the visualization of essential data and metrics for operations displays. It establishes a centralized hub that curates, manages, and controls visual displays across multiple screens in a manufacturing setting, ensuring that the right information is consistently presented where it’s most impactful.

## Features

1. Power BI Embedding:
    - Embed Power BI reports and dashboards directly within the application, offering vivid and *real-time* analytical data to be displayed on the manufacturing floor.
2. Slideshows:
    - Create and deploy dynamic slideshows, combining Power Points, images, and more to deliver diversified and engaging content on the floor.
3. Multi-Screen Management:
    - Implement logical screen grouping, allowing for the simultaneous control and alteration of displays within specified groups.
4. Azure OAuth 2.0:
    - Creates an interactive environment for users based on their current role, and allows seamless access to reports and resources.
5. More to come!
## Tech Stack

The application is built with a variety of modern technologies to ensure efficiency, scalability, and performance.

**Frontend:**
- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static types, enhancing developer productivity and code predictability.

**Backend:**
- **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications using TypeScript.
- **Python**: Used for src file monitoring and PowerPoint to PNG conversion.

## Getting Started

### Prerequisites

- Node.js: [Download & Install Node.js](https://nodejs.org/en/download/)
- Python: [Download & Install Python](https://www.python.org/downloads/)
- Register your application within [Azure AD](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)

### Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/SRCthird/operations-nexus.git
```

2. Navigate to project directory and Install dependencies for the frontend and backend

```bash
cd operations-nexus
npm run init
```

3. Set up configuration

### Configuration

1. `Config.ts`
    - `Config.ts` is the document that hold all Azure information. To set this up find [Config.blank.ts](./src/Config.blank.ts) and rename it to `Config.ts`.
    - There you will be able to update any information required.

2. `.env`
    - There are two `.env` files that you can use.
    - `/backend/.env` will be created on initialization of Prisma in `/backend`. You will need to add an endpoint to your database.
    - `/.env` is optional but hold the react runtime variables like HTTPS and HOST.

### Running the Frontend

**Dev Mode**
This command will allow you to run the frontend in dev mode. 
```bash
npm run frontend:dev
```

**Building**
This command will delete the `/build/` directory and rebuild a static server:
```bash
npm run frontend:build
```

**Production**
This command serves the built server, without watching for file modification:
```bash
npm run frontend:prod
```

### Running the Backend

**Dev Mode**
This command will delete all physical files uploaded to the server, but will monitor file updates.
```bash
# Useing this command will delete all physical files uploaded to the server.
npm run backend:dev
```

**Building**
This command will delete the `backend/dist/` directory and rebuild a static server for the backend:
```bash
npm run backend:build
```

**Production**
This command serves the built backend server, without watching for file modification:
```bash
npm run backend:prod
```

**Running the Slideshow change checker**
This will monitor changes to the `pptx/`directory in the backend and convert all PowerPoints to PNGs while updateing the version number in the database.
```bash
npm run backend:slides
```

backend:slides will continue to run until the backend is closed. Although you can set a custom stop condition within `stop()` in [slides.py](./backend/src/slides.py).

### Appding new Templates

**Template Location**
All templates are located in `src/plugins/templates/`.

**Template Structure**
Each template is a folder with the following structure:
```
template-name/
    - index.ts
    - types.ts
    - empty.ts
    - Component.tsx
    - Form.tsx
    - styles.css
```
**index.ts**
This file is the main file for the template. It will export all of the necessary components and types for the template. the exported default should always be the `Component.tsx`.

**types.ts**
This file will hold all of the types for the template. This will be the datatypes for interfacing with the backend.

**empty.ts**
This file will hold the default values for the template. This will be the values for an empty template.

**Component.tsx**
This file will hold the main component for the template. This will be the component that is displayed on the screen.

**Form.tsx**
This file will hold the form component for the template. This will be the component that is displayed when the user is editing the template from the admin portal.

**styles.css**
This file will hold the styles for the template. This will be the styles that are applied to the template and/or the form.

**Backend**
The template will then need to be added to the backend API. This will be done through a Prisma module and a Nest service.

**Prisma**
The template will need to be added to the Prisma schema. This will be done by adding a new model to the `/backend/prisma/schema.prisma` file.

**Nest**
The template will need to be added to the Nest service. This will be done by adding a new service to the `/backend/src/pages` directory.<br>
First you will need to create a new service file in the `/backend/src/pages/templates` directory. This file will hold all of the logic for the template. You will then need to add the service to the `pages.module.ts` file in the `/backend/src/pages` directory. <br>
You will also need to add the service as a private readonly dependency of the `/backend/src/pages/pages.controller.ts` file. This will allow the service to be accessed through the API.


### API Endpoints

**Azure API Endpoint**
Azure API endpoints refer to the URL patterns that Azure services utilize to provide access to their API functionality. The endpoint that Operations Nexus relies on most is Microsoft Entra ID, or the endpoint for your tenet authority. This allows you to log in with an Azure account and view Power BI components without needing to connect to [Power BI](app.powerbi.com).

**Power BI API Endpoint**
The Power BI API offers a robust and versatile interface for developers and administrators to interact programmatically with Power BI, a popular business analytics service provided by Microsoft. This application provides easy access to the Power BI API with only a few steps. After you have regestered your application in the Azure Active Directory you will be able to enter the client id and Azure Endpoints for your company.

## License

[License details](./LICENSE)
