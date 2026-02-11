ABSTRACT
This project introduces MediBridge, a web-based healthcare platform designed to streamline early patient assessment and improve access to real-time hospital resource information. The system enables users to describe their symptoms in natural language, which are then analyzed by a machine-learning model to generate a preliminary disease prediction and a structured summary report. This assists patients in understanding their condition before visiting a hospital and provides doctors with valuable pre-consultation insights. Additionally, the platform allows hospitals to update and display the availability of essential resources such as beds, oxygen cylinders, and ambulances, along with their location details.

Throughout this phase, the project performs detailed system analysis, requirement gathering, feasibility evaluation, and creation of core design artifacts including DFDs, ER diagrams, and data dictionaries. These outcomes establish a strong foundation for system design and implementation in subsequent stages.

Chapter 1: Introduction

1.1. Background
Healthcare systems around the world, especially in developing regions, continue to face significant challenges related to accessibility, information accuracy, communication gaps, and real-time resource management. Despite clinical and medical advancements, the lack of integrated digital platforms often leads to delays in diagnosis and treatment. Particularly, in densely populated countries like India, hospitals tend to experience heavy patient inflow, causing long waiting times and reduced efficiency in handling preliminary assessment tasks. Patients frequently visit hospitals without any prior documentation, symptom summary, or structured description of their condition, which forces doctors to begin every consultation from scratch. This consumes valuable time and reduces the effectiveness of hospital workflows.
In emergency situations, the problem becomes even more critical. People often struggle to find reliable information on hospital resources such as bed availability, oxygen cylinders, or ambulance services. During health crises—such as the COVID-19 pandemic—families were forced to contact multiple hospitals manually to check for available beds or oxygen facilities. This decentralized, manual method of communication resulted in confusion, misinformation, and delays, sometimes with severe outcomes. The absence of a unified portal that aggregates hospital resource availability remains a major pain point in the healthcare sector.
Another major gap in existing healthcare service delivery is the absence of preliminary diagnosis tools. Many people experience early symptoms but are unsure whether the condition requires immediate medical attention. Some may ignore symptoms until they worsen, while others may panic unnecessarily due to lack of accurate information. Traditional symptom checkers available online often rely on static rule-based systems that do not adapt well to varied natural-language symptom descriptions. Moreover, these tools rarely generate structured, doctor-readable summary reports that could help physicians prepare for patient visits ahead of time.

Digital healthcare portals available today tend to focus on isolated functionalities: a few provide appointment scheduling, others support telemedicine, some offer health information articles, while others provide emergency contact details. However, very few platforms integrate intelligent symptom evaluation with hospital resource information in a unified manner. This fragmentation leads to inefficiencies and prevents patients from receiving holistic support.
Given these limitations, there is a clear need for a modern healthcare system that can bridge the information gap between patients and hospitals. A system that allows users to enter symptoms in their own words, uses machine learning to interpret and predict possible diseases, and produces a structured summary report can greatly enhance the pre-consultation process. Simultaneously, a digital interface that allows hospitals to update their real-time resource availability—such as beds, ambulances, and oxygen cylinders—can empower patients to make informed decisions quickly.
The project MediBridge is conceptualized to address these gaps. The system leverages modern web technologies and machine learning to create a seamless bridge between patients and healthcare facilities. The name “MediBridge” symbolizes the platform’s goal of establishing a digital connection that enhances transparency, accessibility, and preparedness in healthcare delivery.
By offering a two-fold solution—symptom-based pre-diagnosis and hospital resource availability—MediBridge aims to improve decision-making for both patients and doctors. The system reduces unnecessary hospital visits, improves the quality of consultations, optimizes hospital workflows, and enables efficient emergency response. This introductory chapter provides an overview of the project’s background, objectives, scope, applicability, achievements, and report structure.




1.2. Objectives

The primary objective of MediBridge is to develop an intelligent, user-friendly healthcare platform that enhances the flow of information between patients and hospitals. The project focuses on two essential goals:
To provide an AI-driven, symptom-based preliminary diagnosis system that interprets user-input natural language descriptions and predicts possible diseases, accompanied by a structured summary report.
To create a hospital resource management portal where hospitals can log in and update real-time information regarding available beds, oxygen cylinders, and ambulances, along with their geographical location.
Together, these objectives strive to minimize waiting time, improve accuracy in patient assessments, and help individuals make informed decisions during emergencies.
Beyond these core functionalities, the project also aims to analyze the healthcare domain and transform real-world workflows into a structured digital system using established software engineering principles. The objective includes gathering system requirements, identifying existing challenges, assessing feasibility from technical and operational perspectives, and designing the system through data flow diagrams, process models, and structural components. By establishing this foundation, MediBridge ensures that the final system will not only be technologically sound but also logically consistent, scalable, and capable of meeting real-world healthcare needs.












1.3. Purpose and Scope

1.3.1. Purpose

The primary purpose of MediBridge is to create a unified online platform that simplifies early diagnosis and improves accessibility to hospital resource information. The system intends to shift a portion of the preliminary clinical workflow into the digital space, thereby reducing congestion in hospitals and providing patients with clearer guidance before seeking treatment. The symptom-based assessment module helps users better understand the urgency of their medical condition while empowering doctors with pre-collected information that enhances the consultation experience.

Additionally, the purpose extends to strengthening the emergency care infrastructure by giving patients direct visibility into the current availability of essential hospital resources. Instead of relying on phone calls or fragmented information, patients can quickly identify hospitals that have beds, oxygen cylinders, or ambulance services available. This contributes to faster decision-making and increases the chances of timely treatment.

1.3.2. Scope

The scope of the project includes:
Development of a complete login-based system for users and hospitals.
A symptom analysis tool powered by machine learning, capable of understanding natural language inputs.
A prediction engine that identifies probable diseases and generates structured summary reports.
A hospital dashboard for updating real-time availability of beds, ambulances, and oxygen cylinders.
Integration of a map feature to display hospital locations.
Creation of a clean, accessible, and responsive user interface.
Establishment of secure authentication and role-based access control.

The project excludes telemedicine video consultations, appointment scheduling, chronic disease analysis, or advanced diagnostic tools. The focus remains on a simplified, high-impact, two-feature system that is practical, feasible, and relevant.
Assumptions include user access to the internet, honest reporting of symptoms, and consistent updates from hospitals. Limitations include the system's inability to replace formal medical diagnosis and its reliance on trained ML models that may require periodic updates.
1.3.3. Applicability

MediBridge is applicable across a wide range of real-world healthcare scenarios:
Hospitals: Can use the platform to maintain transparent and up-to-date information on resources.
Patients: Benefit from early guidance about their symptoms and can identify suitable hospitals during emergencies.
Doctors: Receive structured symptom reports before consultations, allowing more efficient evaluation.
Health authorities: Can potentially extend the portal for crisis management and resource coordination.
The system can also serve as a foundational model for future expansions such as telemedicine, automated prescription suggestions, or real-time healthcare analytics.


Chapter 2: System Analysis

2.1. Existing System

2.1.1. Traditional Patient–Hospital Interaction
In most healthcare settings, patients must physically visit hospitals for initial assessment, even for minor or unclear symptoms. Doctors first collect patient history manually, ask general questions, and then proceed with diagnosis. This process often causes delays, long queues, and overcrowding—especially during high patient inflow or emergencies. Hospitals also maintain independent offline records for resource availability (ambulances, beds, oxygen tanks), resulting in slow information updates.
2.1.1.1. Limitations in the Existing Infrastructure
No digital pre-consultation platform where patients can enter symptoms before arriving.
Doctors lack structured information about the patient’s condition prior to consultation.
Hospital resources (beds, oxygen, ambulances) are not visible to the public.
Patients must call hospitals individually to check resource availability.
No unified portal connecting user information, hospital details, and AI-driven preliminary diagnosis.
These limitations result in inefficient workflows, unnecessary travel, delayed decision-making, and increased pressure on healthcare professionals.






2.2. Proposed System

2.2.1. System Concept
MediBridge is a modern web-based healthcare portal designed to bridge the gap between patients and hospitals by offering two essential services:
AI-powered initial symptom-based diagnosis
Users describe their symptoms in natural language.
The system analyses the input, predicts the most likely disease using a machine-learning model, and generates a structured summary report.
Doctors can access this report before the patient arrives, improving diagnosis efficiency.
Hospital resources portal
Hospitals can log in and update real-time information about:
Ambulance availability
Oxygen cylinder availability
Bed availability
Hospital location/map
This allows patients to make informed decisions during emergencies.
Together, these features create a unified healthcare information system that reduces waiting time, improves preparedness, and enhances communication between patients and hospitals.






2.2.1.1. Key Advantages
Provides early insight into possible diseases before hospital arrival.
Improves doctor readiness through pre-consultation reports.
Reduces patient confusion and stress by giving structured summaries.
Gives hospitals a digital dashboard to manage and update internal resources.
Helps users locate the nearest and best-equipped hospital quickly.
Enhances overall efficiency and transparency in healthcare workflows.

2.3. Requirement Analysis
Requirement analysis forms the foundation of system development, ensuring that user needs, system capabilities, and project constraints are clearly understood.
2.3.1 Functional Requirements
2.3.1.1. User-Related Functions
Users can register and log in securely.
Users can describe their symptoms in free text.
The system predicts possible diseases using ML-based text classification.
Users can view/download their symptom summary report.
Users can view hospital resource availability (beds, oxygen, ambulances).
Users can view hospital locations/maps.
2.3.1.2. Hospital Functions
Hospitals can log in to their dashboard.
Hospitals can update available beds, oxygen tanks, and ambulances.
Hospitals can manage their location/map information.
Hospitals can view incoming patient pre-diagnosis reports.

2.3.1.3. System Functions

Authenticate and authorize users (user vs. hospital roles).
Communicate with the ML microservice for symptom prediction.
Sync hospital resource data with frontend in real time or at regular intervals.

2.3.2 Non-Functional Requirements
2.3.2.1. Performance Requirements
The symptom diagnosis result should be returned within 1–2 seconds.
Hospital resource updates must be reflected quickly to ensure accuracy.
The system must support multiple users accessing hospital data simultaneously.
2.3.2.2. Security Requirements
Strong authentication using Auth0/Firebase Auth.
Role-based access control for hospital logins.
All sensitive data transmitted over HTTPS.
ML and backend services secured with API tokens or JWT.
2.3.2.3. Usability Requirements
UI must be simple and clean for users of all ages.
Reports must be easy to read and understand.
Hospital dashboard must allow quick updates with minimal steps.
2.3.2.4. Scalability Requirements
Ability to add more hospitals without redesigning the system.
ML service can scale independently when traffic increases.


2.4. Hardware Requirements

2.4.1. Minimum Hardware Requirements
2.4.2.1. Development System
Processor: Intel Core i5 or above
RAM: 8–16 GB
Storage: 30+ GB
Stable internet connection
2.4.2.2. Deployment Environment
Cloud hosting (Render, Vercel, Fly.io, AWS, etc.)
Docker-compatible server for ML microservice and backend
2.5. Software Requirement
2.5.1. Frontend Technology Stack
Frameworks and Libraries
React 18
Vite or Next.js
Material UI 5 (clean and modern UI)
React Query (TanStack Query) for API caching
React Hook Form + Zod/Yup for validation
Axios for API communication
jsPDF + html2canvas for generating reports
Maps API (Google Maps / Leaflet) for hospital location display



2.5.2. Backend Technology Stack
2.5.2.1. Backend Framework
Node.js + NestJS
2.5.2.2. Database
MongoDB – suitable for flexible data structures like hospital resources, symptoms, and prediction outputs
Mongoose ORM – for schema enforcement in MongoDB
2.5.3. ML Technology Stack
FastAPI for prediction endpoint
scikit-learn for disease prediction model
numpy, pandas for data preprocessing
joblib/pickle – to load pretrained models efficiently
2.5.4. DevOps & Deployment Tools
Git & GitHub – for version control and collaboration
Vercel  – simple one-click deployment for frontend
Railway – simple hosting for backend API and ML service
dotenv – to manage local environment variables securely





2.6. Justification of Platform

2.6.1. Frontend Justification
React 18 provides a fast, modern UI experience and pairs well with Vite for quick development. 
Material UI gives ready-made responsive components, which simplifies UI building.
React Query and Axios reduce boilerplate code and improve data-fetching efficiency. These tools help create a clean and user-friendly interface without complexity.

2.6.2. Backend Justification
Express (Node.js) or FastAPI supports rapid development with minimal setup. They offer simple routing, easy validation, and fast performance. 
MongoDB integrates smoothly with both technologies. 
JWT-based authentication works naturally with Node, making role-based login (user/hospital) easy to implement.

2.6.3. ML Microservice Justification
FastAPI is lightweight, fast, and perfect for exposing ML prediction endpoints.
scikit-learn provides stable models for NLP-based symptom analysis. Keeping ML separate improves maintainability and reduces backend complexity.

Chapter 3: System Design

3.1. Module Division
The MediBridge system is divided into three major modules for clarity, maintainability, and scalability. Each module performs specific functions and interacts with others through well-defined APIs.
3.1.1 User Module
This module handles all operations related to normal users.
Functions:
User registration and login
Symptom input using natural language text
Receiving AI-based prediction
Viewing/downloading summary report
Viewing hospital resource availability
Viewing hospital location on the map
3.1.2 Hospital Module
This module is used by hospitals to manage and share real-time resource information.
Functions:
Hospital login
Update bed availability
Update oxygen cylinder availability
Update ambulance availability
Add/update hospital location (map coordinates)
View incoming patient pre-diagnosis reports

3.1.3 ML Diagnosis Module
This module is responsible for analyzing symptoms and predicting possible diseases.
Functions:
Accept natural-language symptom input
Preprocess and interpret text
Apply trained ML text-classification model
Return predicted disease
Generate summary data for user reports

3.2. Data Dictionary
3.2.1 User Collection
Field
Type
Description
user_id
ObjectId
Unique identifier for the user
name
String
Full name of the user
email
String
User’s email (unique)
password
String
Encrypted password
age
Number
Age of the user
symptoms_history
Array
List of past symptom reports

			3.1 User Table









3.2.2 Hospital Collection

Field
Type
Description
hospital_id
ObjectId
Unique identifier for the hospital
hospital_name
String
Name of the hospital
email
String
Hospital login email
password
String
Encrypted password
beds_available
Number
Count of available beds
ambulances_available
Number
Count of ambulances
oxygen_cylinders
Number
Available oxygen tanks
location
Object
Coordinates or address

			3.2 Hospital Table


3.2.3 Report Collection

Field
Type
Description
report_id
ObjectId
Unique ID for report
user_id
ObjectId
Foreign key referencing user
symptoms_text
String
Symptoms entered by user
predicted_disease
String
Output from ML model
summary
String
Generated summary explanation
created_at
Date
Report generation timestamp

3.3 Report Table
