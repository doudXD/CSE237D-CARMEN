[comment]: <> (This is a comment, it will not be included)

## About The Project

### Motivation - Why an Expert-in-the-Loop Interface for CARMEN?

1. **CARMEN: Cognitively Assistive Robot for Motivation and Neurorehabilitation**: 

[comment]: <> (what is carmen, who is involved in its usage, how is it currently being used, what is it's significance/how is it helpful)

CARMEN (the Cognitively Assistive Robot for Motivation and Neurorehabilitation) is a socially and cognitively assistive robot designed and developed to teach people with Mild Cognitive Impairment (MCI) compensatory strategies, or strategies that help mitigate the effects of impairment in everyday life. These include things like calendaring, and notetaking, all scaffolded in the robots delivery through activities and games. These were all designed alongside clinicians who deliver the in-person intervention, and are imagining ways that it can be supplemented through engagement at home with a robot.

2. **Expert-in-the-Loop Interface for CARMEN**:

In order to further the ways a clinician can instill their influence on how the robot interacts with an individual, an active learning loop, or an expert-in-the-loop system can be used to create online (in the moment) examples, which can be combined with the current state of the robot's interaction to learn autonomous behaviors over time from the expert (clinician). To this end, our project focuses on creating the interface, and control mechanism to allow a clinician to "interrupt" robot-delivered intervention content with novel prompts and animations at any point during the interaction. This system will allow clinicians to personalize intervention content and will enable our long term goal of creating an expert-in-the-loop system to enable that personalization to run autonomously.

---

### Abstract

CARMEN (Cognitively Assistive Robot for Motivation and Neurorehabilitation) helps individuals with Mild Cognitive Impairment (MCI) by bringing compensatory cognitive training (CCT) into the home. It builds upon CCT done in clinic by teaching mitigation strategies through fun activities and games. In order to further align how CARMEN delivers the intervention with how clinician's would want the intervention to be delivered, we developed a REACT web application that lets clinicians create and send new robot behaviors using prompts and animations in real time. Clinicians can see and adjust the robot’s planned behaviors, making the interactions more personalized and responsive. This system enables the future creation of an expert-in-the-loop active learning approach, allowing the robot to learn and adapt from clinician input over time, enhancing cognitive neurorehabilitation with flexible, home-based support that can boost user engagement and improve therapeutic outcomes.

---

### Team Members
- Anya Bouzida
- Kara Hoagland
- Pratyusha Ghosh
- Xinchen Xie

---

### Elevator Pitch

[Slides of Elevator Pitch](https://docs.google.com/presentation/d/1X-5zP_T8LLfxgnJf5mjk4AHbexQoV7Y8NyYjBcJjCSs/edit?usp=sharing)

### Project Specifications

[Document with Project Specifications](https://docs.google.com/document/d/10H6pUmHl3SZAczp-levR7cRhc9J_NGaACFJv8wNlcGw/edit?usp=sharing)

### Milestone Report

[Document on Milestone Progress](https://docs.google.com/document/d/1rjJsS09qILpKDAJw4Fnvlmxe1n0uVfqqQeGW1HdVCu0/edit?usp=sharing)

### Oral Update

[Slides of Oral Update](https://docs.google.com/presentation/d/12kv_HvILZ9NUuts5leJI20SAdBhx9o1TLjVrA0rFksk/edit?usp=sharing)

### Final Oral Presentation

[Slides of Final Oral Presentation](https://docs.google.com/presentation/d/1MFIHSK6prJjUNAwiYxMXdIeUGQSlZZ2laTrdMUac41g/edit?usp=sharing)

---

## Technical Documentation


### Repository Organization

This repository only contains the front-end code for the web app. The repository is organized as follows:

#### Folders:
**./src** : Contains the code for the web application and includes a backend Node.js mock server for testing.

**./src/main.tsx**: Renders the pages and links to the pages. Keeps a set of global data structures such as socketUrl and token to be passed and changed between pages.

**./src/pages**: Contains the various pages of the React application
Login: Contains the code for the Login page. It uses the input from the user and send websockets to the server for authentication. The app will be automatically navigated to the App page when authentication is successful.
App: Contains the code that displays the current activities planned for the CARMEN robot and customizable options for the user to send an interruption (e.g. prompt, animation) to the robot after a selected planned behavior.
History: Contains the code for the History page. It displays the interruptions the user inserts on the App page.
Logout: Contains the code for the Logout page. Safely logout the user.

**./src/components**: Contains various elements used across all the pages of the React application including a button, textbox, navbar, animation prompts, and prompt options.

**./src/backend**: Contains the code for a mock server. It runs a server on localhost.


---

### Deployment Steps

#### Frontend Deployment

The web application code can be found in the **./src** files.
Clone the repository and follow these steps to run the application:
1. Fork this repository and clone the repository.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run dev` to start the application.

#### Mock Server Deployment
The mockserver code can be found in the **./src/backend** files.
1. Navigate into the folder.
2. Run `node server.js` to run the server on localhost.
#### CARMEN Deployment

As the full CARMEN system is not currently fully open source, we are unable to share the robot files. However, we can share that to run the robot, we have included the new node created for this project in our roslaunch file `carmen.launch`. so one must only run `roslaunch carmen_controller carmen.launch` and all the respective ros nodes needed to functioning behavior will run.



---

### Usage Instructions

1. Open the web application in a browser.
2. Enter your username and password, click on the "Connect to CARMEN" button.
3. The application is consisted of three pages. The `Logout Page` is used to log out the application. The `App Page` is used to insert interruptions. The `History Page` displays all the interruptions inserted.
4. You can navigate between the different pages of the application from the web application by clicking on the buttons on the navigation bar.


### Architecture Diagram

![CARMEN Architecture Diagram](https://github.com/doudXD/CSE237D-CARMEN/assets/42587452/a7bc06b4-a35c-4f25-a06d-dab78fb32495)

---

## Demo

### Version 1 Demonstration

[Link to Demo](https://drive.google.com/file/d/1l5EyJ71iEKnRkgLNaQvXFNTW-6tjZwfK/view?usp=sharing)

### Version 2 Demonstration

### Final Project Video

[Link to Final Demo Video] (https://drive.google.com/file/d/13L6k8ccjIZ-TBFurMbwyRkE3ILKpaEMu/view?usp=sharing)

---

## Future Work

Integrate SPARC inspired expert-in-the-loop learning system:

- Detailing of state space on the robot side.
- Enable and centralize further data collection
- New ROS node to handle the SPARC framework, integrated with the ROS node that controls interruptions and the Navigation Controller.
