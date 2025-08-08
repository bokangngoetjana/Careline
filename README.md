# 🏥 CareLine Clinic Queue Management System

## Overview
**CareLine** is a comprehensive queue management system designed for clinics to streamline patient check-ins, queue management, and staff workflows. It improves operational efficiency by providing real-time updates, ticket management, and seamless communication between patients, nurses, and administrators.

The application consists of a scalable backend built with **ABP Boilerplate (ASP.NET Core)** and a modern frontend using **Next.js with TypeScript and Ant Design**.

---

## ✨ Key Features
- 🧑‍⚕️ Patient dashboard: Join queues, view and cancel active tickets
- 👩‍⚕️ Nurse dashboard: Manage active queues, assign tickets, update statuses, and add medical history
- 🛠️ Admin dashboard: Manage visit queues, staff, and service types
- 📧 Email notifications using SendGrid for ticket confirmation and status updates
- 🔐 Secure JWT-based authentication and authorization

---

## 🏗️ Tech Stack

### 🔧 Backend – ABP Boilerplate (ASP.NET Core)
- Layered architecture with Domain, Application, and Web API layers
- PostgreSQL database
- Entity Framework Core for data access and migrations
- JWT Bearer token authentication
- Email notifications via SendGrid integration

### 🖥️ Frontend – Next.js + TypeScript (TSX)
- React-based UI with Ant Design components
- Client-side rendering and API integration
- Responsive layouts for desktop and mobile
- Context-based state management with custom hooks
- Secure session handling with JWT tokens stored in session storage

---

## 📦 Installation

### 🔧 Backend (ABP Boilerplate – ASP.NET Core)

1. **Clone the backend repository:**
   ```bash
   git clone aspnet-core
   cd aspnet-core
   ```

2. **Set up the database:**
   Create a new PostgreSQL database and update the `appsettings.json` connection string accordingly.

3. **Apply migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Configure SendGrid:**
   Add your SendGrid API key to `appsettings.json`:
   ```json
   {
     "SendGrid": {
       "ApiKey": "your-sendgrid-api-key"
     }
   }
   ```

5. **Run the backend server:**
   ```bash
   dotnet run
   ```

6. **API should now be available at:**
   ```
   https://localhost:4200
   ```

### 🖥️ Frontend – Next.js + TypeScript (TSX)

1. **Clone the frontend repository:**
   ```bash
   git clone careline-frontend
   cd careline-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   npm install antd
   npm install @ant-design/icons
   npm install axios
   npm install @microsoft/signalr
   npm install jwt-decode
   npm install react-toastify
   npm install dayjs
   ```

3. **Configure API endpoint:**
   Update your API base URL in the configuration file to point to your backend server.

4. **Run the frontend:**
   ```bash
   npm run dev
   ```

5. **Open the browser and navigate to:**
   ```
   http://localhost:5000
   ```

### 🖥️ Additional Dependencies
```bash
npm i
npm install react-icons
npm install --save-dev 
npm install --save-dev
```

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
This project is licensed under the MIT License.
