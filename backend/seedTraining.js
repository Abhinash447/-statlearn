import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import TrainingMaterial from "./models/TrainingMaterial.js";

dotenv.config();

const trainingMaterials = [
  // =====================================================
  // JAVA
  // =====================================================

  {
    title: "Java Fundamentals",
    description:
      "Learn the core concepts of Java including variables, data types, operators and control flow.",

    skill: "Java",

    level: "Beginner",

    competency: "Java Fundamentals",

    content:
      "This module covers Java syntax, variables, primitive data types, operators, conditional statements and loops.",

    duration: 60,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "Java",
      "Basics",
      "Variables",
      "Loops",
    ],

    isActive: true,
  },

  {
    title: "Java Object Oriented Programming",
    description:
      "Understand classes, objects, inheritance, polymorphism and encapsulation in Java.",

    skill: "Java",

    level: "Intermediate",

    competency: "Object Oriented Programming",

    content:
      "Learn classes and objects, constructors, inheritance, polymorphism, abstraction and encapsulation.",

    duration: 120,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "Java",
      "OOP",
      "Classes",
      "Inheritance",
      "Polymorphism",
    ],

    isActive: true,
  },

  {
    title: "Java Exception Handling",
    description:
      "Learn how to handle runtime errors using Java exception handling mechanisms.",

    skill: "Java",

    level: "Intermediate",

    competency: "Exception Handling",

    content:
      "Learn try, catch, finally, throw, throws and custom exceptions in Java.",

    duration: 75,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "Java",
      "Exceptions",
      "Error Handling",
    ],

    isActive: true,
  },

  // =====================================================
  // PYTHON
  // =====================================================

  {
    title: "Python Programming Fundamentals",
    description:
      "Learn Python syntax, variables, data types, conditions, loops and functions.",

    skill: "Python",

    level: "Beginner",

    competency: "Python Fundamentals",

    content:
      "Introduction to Python programming including variables, data types, operators, conditions, loops and functions.",

    duration: 60,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "Python",
      "Basics",
      "Functions",
      "Loops",
    ],

    isActive: true,
  },

  {
    title: "Python Object Oriented Programming",
    description:
      "Learn object-oriented programming concepts using Python.",

    skill: "Python",

    level: "Intermediate",

    competency: "Object Oriented Programming",

    content:
      "Learn classes, objects, constructors, inheritance, polymorphism and encapsulation in Python.",

    duration: 90,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "Python",
      "OOP",
      "Classes",
      "Inheritance",
    ],

    isActive: true,
  },

  // =====================================================
  // C++
  // =====================================================

  {
    title: "C++ Programming Fundamentals",
    description:
      "Build a strong foundation in C++ programming and problem solving.",

    skill: "C++",

    level: "Beginner",

    competency: "C++ Fundamentals",

    content:
      "Learn C++ syntax, variables, data types, operators, conditions, loops and functions.",

    duration: 60,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "C++",
      "Basics",
      "Programming",
    ],

    isActive: true,
  },

  {
    title: "C++ STL and Data Structures",
    description:
      "Learn the Standard Template Library and commonly used data structures in C++.",

    skill: "C++",

    level: "Intermediate",

    competency: "Data Structures",

    content:
      "Learn vectors, stacks, queues, maps, sets, priority queues and other STL containers.",

    duration: 120,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "C++",
      "STL",
      "Data Structures",
      "Vectors",
      "Maps",
    ],

    isActive: true,
  },

  // =====================================================
  // JAVASCRIPT
  // =====================================================

  {
    title: "JavaScript Fundamentals",
    description:
      "Learn JavaScript fundamentals including variables, functions, arrays and objects.",

    skill: "JavaScript",

    level: "Beginner",

    competency: "JavaScript Fundamentals",

    content:
      "Learn variables, data types, operators, functions, arrays, objects and basic JavaScript programming.",

    duration: 60,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "JavaScript",
      "Basics",
      "Functions",
      "Arrays",
      "Objects",
    ],

    isActive: true,
  },

  {
    title: "JavaScript Asynchronous Programming",
    description:
      "Understand promises, async/await and asynchronous JavaScript.",

    skill: "JavaScript",

    level: "Intermediate",

    competency: "Asynchronous Programming",

    content:
      "Learn callbacks, promises, async and await, error handling and asynchronous API requests.",

    duration: 90,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "JavaScript",
      "Async",
      "Promises",
      "Async Await",
    ],

    isActive: true,
  },

  // =====================================================
  // SQL
  // =====================================================

  {
    title: "SQL Fundamentals",
    description:
      "Learn SQL basics including SELECT, WHERE, ORDER BY and filtering.",

    skill: "SQL",

    level: "Beginner",

    competency: "SQL Fundamentals",

    content:
      "Learn relational databases, SELECT queries, filtering, sorting and basic data manipulation.",

    duration: 60,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "SQL",
      "Database",
      "SELECT",
      "Queries",
    ],

    isActive: true,
  },

  {
    title: "SQL Joins and Aggregation",
    description:
      "Learn how to combine tables and perform analytical queries using SQL.",

    skill: "SQL",

    level: "Intermediate",

    competency: "SQL Joins",

    content:
      "Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, GROUP BY, HAVING and aggregate functions.",

    duration: 90,

    type: "course",

    source: "StatLearn AI",

    url: "",

    tags: [
      "SQL",
      "Joins",
      "GROUP BY",
      "Aggregation",
    ],

    isActive: true,
  },
];


// =====================================================
// SEED DATABASE
// =====================================================

const seedTraining = async () => {
  try {

    await connectDB();

    console.log(
      "Connected to MongoDB."
    );

    // -----------------------------------------------
    // Remove existing training materials
    // -----------------------------------------------

    await TrainingMaterial.deleteMany({});

    console.log(
      "Old training materials removed."
    );

    // -----------------------------------------------
    // Insert new materials
    // -----------------------------------------------

    const inserted =
      await TrainingMaterial.insertMany(
        trainingMaterials
      );

    console.log(
      `${inserted.length} training materials inserted successfully.`
    );

    // -----------------------------------------------
    // Close database connection
    // -----------------------------------------------

    await mongoose.connection.close();

    console.log(
      "MongoDB connection closed."
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Training seed error:",
      error
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};


seedTraining();