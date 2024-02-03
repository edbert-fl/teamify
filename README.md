<a name="readme-top"></a>

<h1 align="center">Teamify Employee Management App</h1>

<p align="center">
  <a href="https://www.typescriptlang.org/"><img alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a>
  <a href="https://reactnative.dev/"><img alt="React Native" src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></a>
  <a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"></a>
  <a href="https://nodejs.org/en"><img alt="Node.js" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"></a>
  <a href="https://www.javascript.com/"><img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

Teamify is a Team Management application that caters specifically to small businesses employing part-time staff. The frontend is powered by React Native and Typescript, while the backend boasts the efficiency of Javascript, Node.js and PostgreSQL for seamless data management. Elevating user authentication to a new level, we leverage the robust capabilities of Microsoft Azure's Vision API for facial recognition, ensuring a secure and modernized experience for both employers and employees.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

### 📱 Cross-Platform Compatibility:
Runs on both iOS and Android

### 🔐 Authentication:
- Custom User Authentication
    - Organization-specific roles and permissions
    - AI-powered facial recognition for employee clock-in

### 👩‍💼 Admin Features:
- Admin Dashboard
    - Organization data overview
    - (Under Development) Custom roles and user management
    - (Under Development) Rate setting for all users

### 🔄 Organization Management:
- Admins can create organizations
- Invite employees using organization codes for user registration

### 📅 Shift Management:
- Shift creation and assignment to employees
- (Under Development) View upcoming shifts and receive notifications

<!-- GETTING STARTED -->

# Getting Started

To get a local copy up and running follow these simple example steps.

## Prerequisites

### Node.js and npm

Make sure you have Node.js and npm installed on your machine. You can download them from https://nodejs.org/.

### React Native CLI

Install React Native CLI globally by running the following command:

```bash
npm install -g react-native-cli
```

## Installation

Clone the repository to your local machine using Git then navigate to the project directory.

```bash
git clone <repository_url>
cd <project_directory>
```

Then install the project dependencies using npm.

```bash
npm install
```

To use the database you can setup a free PostgreSQL database using <a href="https://www.elephantsql.com/">ElephantSQL</a> and set up a Microsoft Azure account then get a Vision key and Vision Endpoint for their <a href="https://azure.microsoft.com/en-us/products/ai-services/ai-vision">Vision API</a>. Then create a `.env` file in the backend folder and place the following inside:

```bash
DATABASE_URL=<your_database_url>
VISION_KEY=<your_vision_key>
VISION_ENDPOINT=<your_vision_endpoint>
```

Once it's working run the following command to setup the SQL Database.

```bash
cd backend
node sqlsetup
```

You can run this to check if everything has been set up correctly.

```bash
node sqlsetup -c
```

Once setup then create another `.env` file in the root of the project and then add your computer's IP address so that it can connect to your computer for testing while in development. Follow the instructions here to get your computer's IP Address.

- <a href="https://support.microsoft.com/en-us/windows/find-your-ip-address-in-windows-f21a9bbc-c582-55cd-35e0-73431160a1b9">🖥️ Windows</a>
- <a href="https://www.security.org/vpn/find-mac-ip-address/">🍎 MacOS</a>

Once you know your computer's IP address then place it into the root `.env` file:

```bash
EXPO_PUBLIC_IOS_SERVER_URL=<your_computers_ip_address>
```

Then run `npm start` to run the project and scan the QR code to load it on your iOS or Android device with Expo!



<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### User Authentication

<p align="center">
  <img src="https://github.com/edbert-fl/teamify/assets/102503467/57ac46ff-dd67-4608-8a30-acb90c030e48" hspace="10" alt="Sign Up GIF" align="center" width="200" />
</p>

Users of the app are able to create new organizations easily when signing up. Then once the organizatino is created they can sign up for a personal account that is immediately made into the admin of their created organization. As an admin they are able to receive their organization's randomly generated 6 digit alphanumeric organization code on their personal Home page which can then be shared to other employees to create their own accounts which will immediately be registered as part of the parent organization.

```typescript
const signUp = async () => {
    setLoading(true);
    try {
      // Generate a random alphanumeric code of 6 digits
      const generatedCode = Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase();

      if (organizationName && generatedCode) {
        // Save organization information to be added to database after owner account is created
        setCurrOrganization({
          code: generatedCode,
          name: organizationName,
        });

        // Sends call to API endpoint with the generated organization code and name to update the database
        const response = await axios.post(`${SERVER_URL}/organization/add`, {
          code: generatedCode,
          name: organizationName,
        });

        // Navigate to the Registration page
        navigation.navigate('Registration', { userCreatedOrganization: true });
      } else {
        throw new Error("Organization name or code is undefined.");
      }
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Admin Dashboard

<p align="center">
  <img src="https://github.com/edbert-fl/teamify/assets/102503467/397a5769-68ec-41cf-bb7d-a9e861e1464f" hspace="10" alt="Manage Shifts GIF" align="center" width="250" />
</p>

Admins have access to the Organization tab which is an admin dashboard that displays different relevant statistics of the whole organization. From here they are also able to manage shifts for their employees. They can choose whether to create a shift for a particular day, or have a repeating shift that occurs every week at the same time. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

