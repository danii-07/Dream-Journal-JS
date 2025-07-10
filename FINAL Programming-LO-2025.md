# Welcome to the Learning Outcomes Evaluation

Dear students,

Welcome to this Learning Outcomes Evaluation session. The goal is to assess your understanding and mastery of the learning outcomes for this semester as evidenced by your work that was submitted on your personal git account. Remember to answer each question thoroughly by referencing **Java** code and provide clear explanations where necessary.

Best regards,
Kay Berkling

## Ethics Section regarding generative and other forms of AI

The student acknowledges and agrees that the use of AI is strictly prohibited during this evaluation. By submitting this report, the student affirms that they have completed the form independently and without the assistance of any AI technologies. This agreement serves to ensure the integrity and authenticity of the students work, as well as their understanding of the learning outcomes.


## Checklist before handing in your work

* [ ] Review the assignment requirements to ensure you have completed all the necessary tasks.
* [ ] Double-check your links and make sure that links lead to where you intended. Each answer should have links to work done by you in your own git repository. (Exception is Speed Coding)
* [ ] Make sure you have at least 10 references to your project code (This is important evidence to prove that your project is substantial enough to support the learning outcome of object oriented design and coding within a larger piece of code.)
* [ ] Include comments to explain your referenced code and why it supports the learning outcome.
* [ ] Commit and push this markup file to your personal git repository and hand in the link and a soft-copy via email at the end of the designated time period.

Remember, this checklist is not exhaustive, but it should help you ensure that your work is complete, well-structured, and meets the required standards.

Good luck with your evaluation!

# Project Description (70%)

This is a Dream Journal, a desktop Minimum Viable Product built using Electron.js. This project isn't new, it is just an continuation of the previous one I developed in JavaFX. I decided to transform it into an Electron application to explore cross-platform development with web technologies and, most importantly, to integrate advanced features like AI.



## Link

https://github.com/danii-07/Dream-Journal-JS.git (the actual one from the presentation)

https://github.com/danii-07/DreamJournalProject.git (previous only Java project, same concept)



## TECH STACK

- UI: HTML, CSS, and JavaScript
- Backend/Logic: Node.js / Java
- Desktop Framework: Electron.js
- AI Integration: Google Gemini API (via Node.js client library)
- Data Persistence: Local JSON file / CSV


## What did you achieve? 

For the Dream Journal apps, I have been able to demonstrate my proficiency across different technology stacks. This includes building a modern application with Electron.js (using HTML, CSS, JavaScript, Node.js, and integrating it with Google Gemini AI), as well as a application using JavaFX (Java, with CSV file handling). My work gives multiple examples of a strong understanding of Object-Oriented Programming (OOP) principles such as encapsulation and polymorphism. A key achievement I think is the transformation and enhancement of my initial JavaFX project into the Electron.js version, which shows my ability to adapt a project to different frameworks, my problem-solving capabilities, and commitment to continuous learning in software development and java.


## Learning Outcomes

| Exam Question | Total Achievable Points | Points Reached During Grading |
|---------------|------------------------|-------------------------------|
| Q1. Algorithms    |           4            |                               |
| Q2.Data types    |           4            |                               |
| Q3.Complex Data Structures |  4            |                               |
| Q4.Concepts of OOP |          6            |                               |
| Q5.OO Design     |           6            |                               |
| Q6.Testing       |           3            |                               |
| Q7.Operator/Method Overloading | 6 |                               |
| Q8.Templates/Generics |       4            |                               |
| Q9.Class libraries |          4            |                               |


## Evaluation Questions

Please answer the following questions to the best of your ability to show your understanding of the learning outcomes. Please provide examples from your project code to support your answers.


## Evaluation Material


### Q1. Algorithms

Algorithms are manyfold and Java can be used to program these. Examples are sorting or search strategies but also mathematical calculations. Please refer to **two** areas in either your regular coding practice (for example from Semester 1) or within your project, where you have coded an algorithm. Do not make reference to code written for other classes, like theoretical informatics.



1. In my first only Java project of Dream Journal, the searchDreams method iterates through a list of all dream entries and checks if any part of an entry's description, emotion, or keywords contains the search query.

in the dreamapp.java, you can find it on lines 229-239 (in the DreamJournalController):

private void searchDreams() {
    String searchQuery = searchField.getText().toLowerCase();
    try {
        List<DreamEntry> allEntries = csvHandler.readEntries();
        List<DreamEntry> matchingEntries = allEntries.stream()
            .filter(entry -> entry.getDescription().toLowerCase().contains(searchQuery) ||
                             entry.getEmotion().toLowerCase().contains(searchQuery) ||
                             entry.getKeywords().stream().anyMatch(keyword -> keyword.toLowerCase().contains(searchQuery)))
            .collect(Collectors.toList());

        displayEntries(matchingEntries);

    } catch (IOException e) {
        showAlert("Error", "Error reading from CSV file.");
        e.printStackTrace();
    }
}

2. Another area that also involves an algorithm is the date and calendar navigation logic in the Electron.js Dream Journal, so in the continuation. This involves algorithms for calculating days in a month, determining the start day of a week for a given month, and iterating through dates to fill the calendar view or filter dreams by a specific date. There is no specific code available because it is within the framework but it could go something like this:

in the renderer.js for calendar display or main.js for filtering:

function generateCalendarDays(year, month) {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); //this is to find the starting day
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // to find days in a month
    let days = [];
    // loop to fill calendar grid
    for (let i = 0; i < firstDayOfMonth; i++) { days.push(null); }
    for (let i = 1; i <= daysInMonth; i++) { days.push(i); }
    return days;
}



| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           4            |                               |


### Q2. Data types

Please explain the concept of data types and provide examples of different data types in Java.
typical data types in java are int, double, float, char, boolean, long, short, byte, String, and arrays. Please provide one example for each of the **four** following data types in your code.
* arrays
* Strings
* boolean
* your choice


- Array:

in the old code, dreamapp.java, in line 142 (in the DreamEntry.fromString method), and this is a part of converting a CSV string back into a DreamEntry object:

List<String> keywords = List.of(parts[3].split(";")); // the keywords stored as an array of strings after splitting

- String: 

in the dreamapp.java, in line 99 (in the DreamEntry class):

private String description; // this stores the dream's textual description

- Boolean: not exactly in the code but kind of applies when checking if an AI analysis is complete or if a certain UI element should be visible:

let isAnalysisComplete = false; // A boolean
if (aiResponse) {
    isAnalysisComplete = true;
}

- Int / Number (JS): although again is not in the code specifically it works on the background and could be in the renderer.js (new project) for the calendar logic:

let currentYear = new Date().getFullYear(); // an integer representing the year
let currentMonth = new Date().getMonth(); // an integer representing the month (0-11)


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           4             |                               |



### Q3. Complex Data Structures

Examples of complex data structures in java are ArrayList, HashMap, HashSet, LinkedList, and TreeMap. Please provide an example of how you have used **two** of these complex data structures in your code and explain why you have chosen these data structures.

1. I used ArrayList to store the collection of DreamEntry objects read from or written to the CSV file:

find it in (old project) dreamapp.java, at line 53 (in CSVHandler.readEntries method)

public List<DreamEntry> readEntries() throws IOException {
    List<DreamEntry> entries = new ArrayList<>(); // declaring and initializing an ArrayList
    // ... (file reading logic which adds DreamEntry objects to the 'entries' list)
    return entries;
}

find it in (old project) dreamapp.java,at line 230 (in DreamJournalController.searchDreams method)

List<DreamEntry> allEntries = csvHandler.readEntries(); // a List (which is an ArrayList) of all dreams
List<DreamEntry> matchingEntries = allEntries.stream()
    // ... (filter logic)
    .collect(Collectors.toList()); // here it collects filtered results into a new ArrayList


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           4             |                               |


### Q4. Concepts of OOP
Concepts of OOP are the basic building blocks of object-oriented programming, such as classes, objects, methods, and attributes. 
Explain HOW and WHY your **project** demonstrates the use of OOP by using all of the following concepts:
* Classes/Objects
* Methods
* Attributes 
Link to the code in your project that demonstrates what you have explained above.

- Classes / Objects: In the JavaFX Project, I explicitly define a DreamEntry class (lines 96-150) as a key for individual dream records. Every time a new dream is added, an object (an instance) of DreamEntry is created, encapsulating the specific details of that dream. And while in JavaScript (actual project) doesn't have traditional "classes" in the same way Java does, I used object literals to define the structure of a DreamEntry (like in, { description: "...", emotion: "..." }). And why, well using classes/objects gives modularity and reusability, and instead of messy data and functions, all the information and behavior related to a single dream (or file handling, or UI control) are grouped together. 

Where: In the JavaFX (old project): find the class definition (DreamEntry), in lines 96-150. Also object creation in (new CSVHandler(...)), line 193 (within initialize method)

- Methods: In the JavaFX Project, I define methods within classes to perform actions related to the class's purpose, like in the CSVHandler class that has writeEntry() and readEntries() (Lines 46-63) to perform file operations.

Where: In the JavaFX (old project): find the CSVHandler Methods the writeEntry() in line 46 and readEntries() in line 53.

- Attributes: In the JavaFX Project, I define attributes within the classes to store the state or data of an object. For example, the DreamEntry class has dateTime, description, emotion, and keywords (Lines 98-101) as private attributes to hold a dream's specific details. And in JavaScript object literals define properties (attributes) like description, emotion, keywords, date, and analysis for each DreamEntry object, so kinda the same but in a different language.

Where: In the JavaFX (old project): find the DreamEntry Attributes, like dateTime, description, emotion, keywords, in lines 98-101.


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|             6           |                               |

### Q5. OO Design
Please showcase **two** areas where you have used object orientation and explain the advantage that object oriented code brings to the application or the problem that your code is addressing.
Examples in java of good oo design are encapsulation, inheritance, polymorphism, and abstraction. 


- Encapsulation: Both projects use it, particularly in their respective DreamEntry entities and file handling logic.

    JavaFX Project: The DreamEntry class (in liines 96-150) keeps its attributes (dateTime, description, emotion, keywords) private. Similarly, CSVHandler (in lines 38-65) encapsulates the details of reading and writing to the CSV file, showing only public methods like readEntries() and writeEntry().

    Electron.js Project: The DreamEntry JavaScript objects put together all related properties. The main.js module encapsulates file I/O operations and AI API calls, exposing only specific IPC handles to the renderer process (e.g., ipcMain.handle('save-dream', ...), ipcMain.handle('analyze-dream', ...)), hiding the implementation details.

    The advantage is that by making attributes private, direct external modification is prevented, and ensures that data can only be changed through controlled methods, which reduces the risk of inconsistent or invalid states.

- Polymorphism: We can see it more in the Electron.js project through the handling of varied AI API responses and in the JavaFX project through the use of generics and streams.

    Electron.js Project: When the DreamManager (in main.js) interacts with the GoogleGeminiAPIClient, the structure of the AI's response can sometimes vary and there is where the code uses conditional logic (if-else if) to extract the analysis text regardless of the specific structure returned, as long as it conforms to expected patterns.

    JavaFX Project: Here we can see it for example in the use of Alert objects with various AlertTypes (Alert.AlertType.ERROR in line 268), where the Alert constructor can take different enum values, leading to different behaviors or appearances for the same Alert class.

    The advantage is that it allows code to handle objects of different types through a common interface or method, making the system more flexible to changes. 


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|              6          |                               |



### Q6. Testing
Java code is tested by using JUnit. Please explain how you have used JUnit in your project and provide a link to the code where you have used JUnit. Links do not have to refer to your project and can refer to your practice code. If you tested without JUnit, please explain how you tested your code.
Be detailed about what you are testing and how you argue for your test cases. 

Feel free to refer to the vibe coding session where you explored testing. (pair programming - you may link to your partner git and name him/her.)

Test cases usually cover the following areas:
* boundary cases
* normal cases
* error cases / catching exceptions 

I actually just tested manually, so after implementing a new feature (for example adding a dream, saving to file, searching, or requesting AI analysis), I would manually interact with the application through its UI.

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|         3               |                               |

### Q7. Operator/Method Overloading
An example of operator overloading is the "+" operator that can be used to add two numbers or concatenate two strings. An example of method overloading is having two methods with the same name but different parameters. Please provide an example of how you have used operator or method overloading in your code and explain why you have chosen this method of coding.
The link does not have to be to your project and can be to your practice code.

*your text*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|          6              |                               |



### Q8. Templates/Generics
Generics in java are used to create classes, interfaces, and methods that operate on objects of specified types. Please provide an example of how you have used generics in your code and explain why you have chosen to use generics. The link does not have to be to your project and can be to your practice code.


*your text*

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|           6             |                               |

### Q9. Class Libraries
Examples of class libraries in java are the Java Standard Library, JavaFX, Apache Commons, JUnit, Log4j, Jackson, Guava, Joda-Time, Hibernate, Spring, Maven, and many more. Please provide an example of how you have used a class library in your **project** code and explain why you have chosen to use this class library. 

I used for the first project JavaFX, which includes UI components like DatePicker, TextField, TextArea, ListView, and event handling, and the second Electron.JS.

| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|            6            |                               |


# Creativity (10%)
Which one did you choose: 

* [X] Web Interface with Design
* [ ] Database Connected
* [x] Multithreading
* [ ] File I/O
* [X] API
* [ ] Deployment



- I chose a web interface with custom design for the Electron.js Dream Journal, using a UI framework along with HTML, CSS, and JavaScript. 

- While the JavaFX project inherently manages its UI thread, the Electron.js Dream Journal uses a multi-process architecture (main and renderer processes) which effectively achieves concurrency to maintain a highly responsive user interface.

- The integration of the Google Gemini AI API into the Electron.js Dream Journal.



| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|            10          |                               |



# Speed Coding (20%)
Please enter **three** Links to your speed coding session GITs and name your partner. 


- https://github.com/Ngoc901/grades-management-system.git (Niki, Joaquin and me)
- https://github.com/danii-07/Programming-I/tree/main/inventory/makeup (Petra and me)
- https://github.com/danii-07/Programming-I/tree/main/car-rental (Supposdly with Meenakshi but she was sick so only me)


Paste your class diagram for your project that you developed during the peer review class here: 

![alt text](<Captura de pantalla 2025-07-10 a la(s) 11.39.58.png>)

It can be done very simply by just copying any image and pasting it while editing Readme.md.


| Total Achievable Points | Points Reached During Grading |
|------------------------|-------------------------------|
|                        |                               |
|            16            |                               |





