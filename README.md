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
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, facilitating non-blocking, event-driven architecture.
- **TypeScript**: For leveraging static typing and object-oriented components.
- **Python**: Employed for src file monitoring.

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

2. Navigate to project directory and Install dependencies for the frontend

```bash
cd operations-nexus
npm i
```

3. Navigate to project directory and Install dependencies for the backend

```bash
cd backend
npm i
```

4. Set up configuration

### Configuration

1. `Config.ts`
    - `Config.ts` is the document that hold all Azure information. To set this up find [Config.blank.ts](./src/Config.blank.ts) and rename it to `Config.ts`.
    - There you will be able to update any information required.

2. `departments.json`
    - `departments.json` is the document that holds all of the departments, or groups. To set this up find [departments.blank.json](./backend/src/departments.blank.json) and rename it to `departments.json.`
    - For the ablility to add and manage new or exsisting departments.

3. `display.json`
    - `display.json` is the document that holds all of the displays for any given department. To set this up find [display.json](./backend/src/display.blank.json) and rename it to `display.json`.
    - For the ablility to add and manage new or existing displays connecting them to each department.

### Running the Application

**Running the Frontend**

Navigate to the frontend directory and run the following command:

```bash
npm run test-frontend
```

**Running the Backend**

From the frontend directory use the command:

```bash
npm run test-backend
```

**Running the Slideshow change checker**

From the frontend directory use the command:

```bash
npm run test-slides
```

test-slides will continue to run until the backend is closed. Although you can set a custom stop condition within `stop()` in [slides.py](./backend/slides.py).

### API Endpoints

**Azure API Endpoint**
Azure API endpoints refer to the URL patterns that Azure services utilize to provide access to their API functionality. The endpoint that Operations Nexus relies on most is Microsoft Entra ID, or the endpoint for your tenet authority. This allows you to log in with an Azure account and view Power BI components without needing to connect to [Power BI](app.powerbi.com).

**Power BI API Endpoint**
The Power BI API offers a robust and versatile interface for developers and administrators to interact programmatically with Power BI, a popular business analytics service provided by Microsoft. This application provides easy access to the Power BI API with only a few steps. After you have regestered your application in the Azure Active Directory you will be able to enter the client id and Azure Endpoints for your company.

## License

[License details](./LICENSE)
