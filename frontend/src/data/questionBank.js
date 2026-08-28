const questionBank = {
  Java: {
    Beginner: [
      {
        question: "Which keyword is used to define a class in Java?",
        options: ["class", "struct", "define", "object"],
        answer: "class",
      },
      {
        question: "Which method is the entry point of a Java application?",
        options: ["start()", "main()", "run()", "init()"],
        answer: "main()",
      },
      {
        question: "Which data type stores true or false?",
        options: ["boolean", "bool", "bit", "logical"],
        answer: "boolean",
      },
      {
        question: "Which symbol ends most Java statements?",
        options: [".", ":", ";", "#"],
        answer: ";",
      },
      {
        question: "Which keyword is used to create an object?",
        options: ["new", "create", "object", "make"],
        answer: "new",
      },
      {
        question: "Which keyword is used for inheritance?",
        options: ["extends", "inherits", "implements", "super"],
        answer: "extends",
      },
      {
        question: "Which keyword prevents a variable from being changed?",
        options: ["static", "final", "const", "fixed"],
        answer: "final",
      },
      {
        question: "Which exception occurs when an integer is divided by zero?",
        options: [
          "IOException",
          "ArithmeticException",
          "NullPointerException",
          "ClassCastException",
        ],
        answer: "ArithmeticException",
      },
      {
        question: "Which package contains the Scanner class?",
        options: ["java.io", "java.util", "java.lang", "java.net"],
        answer: "java.util",
      },
      {
        question: "Which collection stores key-value pairs?",
        options: ["ArrayList", "HashMap", "Stack", "Queue"],
        answer: "HashMap",
      },
    ],

    Intermediate: [
      {
        question: "What is method overloading?",
        options: [
          "Same method name with different parameters",
          "Same method in different packages",
          "Replacing a class",
          "Using multiple threads",
        ],
        answer: "Same method name with different parameters",
      },
      {
        question: "Which interface is used for natural ordering of objects?",
        options: ["Runnable", "Comparable", "Serializable", "Cloneable"],
        answer: "Comparable",
      },
      {
        question: "What does JVM stand for?",
        options: [
          "Java Variable Machine",
          "Java Virtual Machine",
          "Java Verified Machine",
          "Java Visual Machine",
        ],
        answer: "Java Virtual Machine",
      },
      {
        question: "Which collection does not allow duplicate elements?",
        options: ["List", "Set", "ArrayList", "Vector"],
        answer: "Set",
      },
      {
        question: "What is encapsulation?",
        options: [
          "Bundling data and methods with controlled access",
          "Creating many objects",
          "Running threads",
          "Converting data types",
        ],
        answer: "Bundling data and methods with controlled access",
      },
      {
        question: "Which keyword refers to the current object?",
        options: ["self", "this", "current", "object"],
        answer: "this",
      },
      {
        question: "Which block is used to handle exceptions?",
        options: ["try-catch", "if-else", "switch-case", "for"],
        answer: "try-catch",
      },
      {
        question: "Which concept allows one interface to have multiple implementations?",
        options: ["Polymorphism", "Compilation", "Parsing", "Casting"],
        answer: "Polymorphism",
      },
      {
        question: "What does static mean for a method?",
        options: [
          "It belongs to the class rather than an instance",
          "It can never return",
          "It is private",
          "It runs only once",
        ],
        answer: "It belongs to the class rather than an instance",
      },
      {
        question: "Which stream is commonly used to read bytes from a file?",
        options: [
          "FileInputStream",
          "FileWriter",
          "PrintWriter",
          "BufferedWriter",
        ],
        answer: "FileInputStream",
      },
    ],

    Advanced: [
      {
        question: "Which mechanism provides runtime method dispatch in Java?",
        options: [
          "Dynamic method dispatch",
          "Method hiding",
          "Static binding",
          "Preprocessing",
        ],
        answer: "Dynamic method dispatch",
      },
      {
        question: "Which memory area stores objects created using new?",
        options: ["Heap", "Stack", "Register", "Code cache"],
        answer: "Heap",
      },
      {
        question: "What does volatile primarily provide?",
        options: [
          "Visibility of changes across threads",
          "Atomicity of all operations",
          "Object serialization",
          "Garbage collection",
        ],
        answer: "Visibility of changes across threads",
      },
      {
        question:
          "Which functional interface represents a function that accepts one argument and returns a result?",
        options: ["Supplier", "Consumer", "Function", "Runnable"],
        answer: "Function",
      },
      {
        question: "Type erasure is associated with which Java feature?",
        options: ["Generics", "Exceptions", "Threads", "Annotations"],
        answer: "Generics",
      },
      {
        question: "Which utility is commonly used to manage a pool of threads?",
        options: [
          "ExecutorService",
          "Scanner",
          "Formatter",
          "StringBuilder",
        ],
        answer: "ExecutorService",
      },
      {
        question: "What is the purpose of synchronized?",
        options: [
          "Control concurrent access to a critical section",
          "Create immutable objects",
          "Compile code",
          "Load classes",
        ],
        answer: "Control concurrent access to a critical section",
      },
      {
        question: "What does garbage collection identify?",
        options: [
          "Objects that are no longer reachable",
          "Unused methods only",
          "Syntax errors",
          "Unused imports",
        ],
        answer: "Objects that are no longer reachable",
      },
      {
        question:
          "Which class is preferred for mutable character sequences in single-threaded code?",
        options: ["StringBuilder", "String", "Character", "Formatter"],
        answer: "StringBuilder",
      },
      {
        question:
          "Which Java feature provides concise immutable data-carrying classes?",
        options: ["Records", "Pointers", "Macros", "Header files"],
        answer: "Records",
      },
    ],
  },

  Python: {
    Beginner: [
      {
        question: "Which symbol starts a comment in Python?",
        options: ["//", "#", "/*", "--"],
        answer: "#",
      },
      {
        question: "Which keyword defines a function?",
        options: ["func", "def", "function", "define"],
        answer: "def",
      },
      {
        question: "Which data type stores an ordered mutable collection?",
        options: ["tuple", "list", "set", "frozenset"],
        answer: "list",
      },
      {
        question: "Which function displays output?",
        options: ["print()", "show()", "display()", "echo()"],
        answer: "print()",
      },
      {
        question: "Which keyword is used for a condition?",
        options: ["if", "when", "check", "case"],
        answer: "if",
      },
      {
        question: "Which operator performs exponentiation?",
        options: ["^", "**", "//", "%%"],
        answer: "**",
      },
      {
        question: "Which collection stores unique values?",
        options: ["list", "tuple", "set", "array"],
        answer: "set",
      },
      {
        question: "Which function returns the number of items?",
        options: ["count()", "size()", "len()", "length()"],
        answer: "len()",
      },
      {
        question: "What is the extension of a Python source file?",
        options: [".java", ".py", ".cpp", ".js"],
        answer: ".py",
      },
      {
        question: "Which keyword imports a module?",
        options: ["include", "import", "using", "require"],
        answer: "import",
      },
    ],

    Intermediate: [
      {
        question: "What does a list comprehension create?",
        options: [
          "A list from an expression and iterable",
          "A database",
          "A class",
          "A thread",
        ],
        answer: "A list from an expression and iterable",
      },
      {
        question: "Which object is immutable?",
        options: ["list", "dict", "set", "tuple"],
        answer: "tuple",
      },
      {
        question: "What does *args collect in a function?",
        options: [
          "Positional arguments",
          "Keyword arguments",
          "Exceptions",
          "Modules",
        ],
        answer: "Positional arguments",
      },
      {
        question: "What does **kwargs collect?",
        options: [
          "Positional arguments",
          "Keyword arguments",
          "Lists",
          "Exceptions",
        ],
        answer: "Keyword arguments",
      },
      {
        question: "Which keyword creates a generator value?",
        options: ["yield", "generate", "returning", "async"],
        answer: "yield",
      },
      {
        question: "What is required for a dictionary key?",
        options: [
          "It must be hashable",
          "It must be a list",
          "It must be a string",
          "It must be an integer",
        ],
        answer: "It must be hashable",
      },
      {
        question: "Which statement handles exceptions?",
        options: ["try-except", "if-catch", "catch-only", "handle"],
        answer: "try-except",
      },
      {
        question: "What does lambda define?",
        options: [
          "An anonymous function",
          "A class",
          "A module",
          "A loop",
        ],
        answer: "An anonymous function",
      },
      {
        question: "Which module is commonly used for regular expressions?",
        options: ["regex", "re", "regexp", "pattern"],
        answer: "re",
      },
      {
        question: "What is slicing used for?",
        options: [
          "Selecting part of a sequence",
          "Sorting only",
          "Compiling code",
          "Creating classes",
        ],
        answer: "Selecting part of a sequence",
      },
    ],

    Advanced: [
      {
        question: "What does a decorator commonly do?",
        options: [
          "Modify or wrap callable behavior",
          "Compile Python",
          "Create a database",
          "Allocate GPU memory",
        ],
        answer: "Modify or wrap callable behavior",
      },
      {
        question: "Which statement is commonly used with a context manager?",
        options: ["with", "using", "manage", "context"],
        answer: "with",
      },
      {
        question: "Which special method initializes an instance?",
        options: ["__init__", "__start__", "__newclass__", "__begin__"],
        answer: "__init__",
      },
      {
        question: "What does the GIL primarily affect in CPython?",
        options: [
          "Execution of Python bytecode by multiple threads",
          "Disk capacity",
          "Database indexing",
          "Syntax parsing",
        ],
        answer: "Execution of Python bytecode by multiple threads",
      },
      {
        question: "How is a coroutine commonly defined?",
        options: ["async def", "coroutine def", "await def", "go def"],
        answer: "async def",
      },
      {
        question:
          "Which keyword pauses an async coroutine until an awaitable completes?",
        options: ["wait", "await", "pause", "yieldonly"],
        answer: "await",
      },
      {
        question: "What is MRO in Python?",
        options: [
          "Method Resolution Order",
          "Memory Runtime Object",
          "Module Runtime Operation",
          "Method Return Object",
        ],
        answer: "Method Resolution Order",
      },
      {
        question: "Which built-in supports lazy iteration over an iterable?",
        options: ["iter()", "lazy()", "stream()", "defer()"],
        answer: "iter()",
      },
      {
        question: "What does functools.lru_cache provide?",
        options: [
          "Memoization/caching of function results",
          "Thread creation",
          "File compression",
          "Type checking",
        ],
        answer: "Memoization/caching of function results",
      },
      {
        question: "Which protocol enables an object to work with len()?",
        options: ["__len__", "__size__", "__count__", "__length__"],
        answer: "__len__",
      },
    ],
  },

  C: {
    Beginner: [
      {
        question: "Which function is the entry point of a C program?",
        options: ["main()", "start()", "run()", "begin()"],
        answer: "main()",
      },
      {
        question: "Which symbol ends a C statement?",
        options: [".", ";", ":", "#"],
        answer: ";",
      },
      {
        question: "Which header provides printf()?",
        options: ["stdio.h", "stdlib.h", "string.h", "math.h"],
        answer: "stdio.h",
      },
      {
        question: "Which type stores a single character?",
        options: ["char", "string", "character", "byte"],
        answer: "char",
      },
      {
        question: "Which operator gets the address of a variable?",
        options: ["&", "*", "@", "#"],
        answer: "&",
      },
      {
        question: "Which operator dereferences a pointer?",
        options: ["&", "*", "->", "%"],
        answer: "*",
      },
      {
        question: "Which keyword declares a constant variable?",
        options: ["const", "constant", "fixed", "final"],
        answer: "const",
      },
      {
        question: "Which loop executes while a condition is true?",
        options: ["while", "repeat", "loop", "during"],
        answer: "while",
      },
      {
        question: "Which function allocates dynamic memory?",
        options: ["malloc()", "alloc()", "new()", "create()"],
        answer: "malloc()",
      },
      {
        question: "Which header provides strlen()?",
        options: ["string.h", "stdio.h", "stdlib.h", "ctype.h"],
        answer: "string.h",
      },
    ],

    Intermediate: [
      {
        question: "What does a pointer store?",
        options: [
          "A memory address",
          "A file name",
          "A keyword",
          "A data type",
        ],
        answer: "A memory address",
      },
      {
        question: "What is the purpose of malloc()?",
        options: [
          "Dynamic memory allocation",
          "String comparison",
          "File closing",
          "Program termination",
        ],
        answer: "Dynamic memory allocation",
      },
      {
        question: "Which function releases memory allocated by malloc()?",
        options: ["free()", "delete()", "release()", "clear()"],
        answer: "free()",
      },
      {
        question: "What is a structure used for?",
        options: [
          "Grouping related variables of different types",
          "Creating loops",
          "Allocating only arrays",
          "Defining macros",
        ],
        answer: "Grouping related variables of different types",
      },
      {
        question: "Which operator accesses a structure member through a pointer?",
        options: ["->", ".", "::", "=>"],
        answer: "->",
      },
      {
        question: "What does a static local variable preserve?",
        options: [
          "Its value between function calls",
          "Its memory address forever",
          "Its type only",
          "Its source code",
        ],
        answer: "Its value between function calls",
      },
      {
        question: "Which function opens a file?",
        options: ["fopen()", "openfile()", "fileopen()", "startfile()"],
        answer: "fopen()",
      },
      {
        question: "Which preprocessor directive includes a header?",
        options: ["#include", "#import", "#header", "#using"],
        answer: "#include",
      },
      {
        question: "What does sizeof return?",
        options: [
          "Size in bytes",
          "Number of elements always",
          "Address",
          "Type name",
        ],
        answer: "Size in bytes",
      },
      {
        question:
          "Which storage class limits a global symbol to its source file?",
        options: ["static", "extern", "auto", "register"],
        answer: "static",
      },
    ],

    Advanced: [
      {
        question: "What is undefined behavior?",
        options: [
          "Behavior for which the C standard imposes no requirements",
          "A compiler warning only",
          "A syntax error",
          "A runtime exception class",
        ],
        answer: "Behavior for which the C standard imposes no requirements",
      },
      {
        question: "What can pointer arithmetic depend on?",
        options: [
          "Pointed-to type size",
          "Variable name",
          "CPU brand only",
          "File extension",
        ],
        answer: "Pointed-to type size",
      },
      {
        question: "What is a dangling pointer?",
        options: [
          "A pointer referring to an invalid or lifetime-ended object",
          "A null pointer",
          "A pointer to a function",
          "A pointer with a large address",
        ],
        answer:
          "A pointer referring to an invalid or lifetime-ended object",
      },
      {
        question:
          "Which keyword prevents modification through a particular lvalue?",
        options: ["const", "static", "volatile", "restrict"],
        answer: "const",
      },
      {
        question: "What does volatile tell the compiler?",
        options: [
          "The value may change unexpectedly",
          "The variable is thread-safe",
          "The variable is constant",
          "The variable is atomic",
        ],
        answer: "The value may change unexpectedly",
      },
      {
        question: "What is a function pointer?",
        options: [
          "A pointer storing a function address",
          "A pointer to an integer",
          "A function returning a pointer only",
          "A macro",
        ],
        answer: "A pointer storing a function address",
      },
      {
        question: "What does restrict primarily specify?",
        options: [
          "A restricted aliasing relationship for a pointer",
          "Read-only memory",
          "No recursion",
          "No pointers",
        ],
        answer: "A restricted aliasing relationship for a pointer",
      },
      {
        question: "Which tool can detect many memory errors in C?",
        options: ["AddressSanitizer", "printf", "make", "grep"],
        answer: "AddressSanitizer",
      },
      {
        question: "What is a flexible array member?",
        options: [
          "An array member with omitted size at the end of a struct",
          "A dynamically resized stack array",
          "A pointer alias",
          "A macro array",
        ],
        answer: "An array member with omitted size at the end of a struct",
      },
      {
        question: "What does realloc() do?",
        options: [
          "Resizes a previously allocated memory block",
          "Always frees memory",
          "Creates a stack variable",
          "Opens a file",
        ],
        answer: "Resizes a previously allocated memory block",
      },
    ],
  },

  "C++": {
    Beginner: [
      {
        question: "Which keyword defines a class in C++?",
        options: ["class", "structonly", "object", "define"],
        answer: "class",
      },
      {
        question: "Which stream is commonly used for output?",
        options: ["cout", "cin", "print", "output"],
        answer: "cout",
      },
      {
        question: "Which header provides cout?",
        options: ["iostream", "stdio.h", "string.h", "vector.h"],
        answer: "iostream",
      },
      {
        question: "Which operator is used with cout?",
        options: ["<<", ">>", "::", "->"],
        answer: "<<",
      },
      {
        question: "Which keyword creates an object dynamically?",
        options: ["new", "malloc", "create", "alloc"],
        answer: "new",
      },
      {
        question: "Which keyword destroys a dynamically allocated object?",
        options: ["delete", "free", "remove", "destroy"],
        answer: "delete",
      },
      {
        question: "Which container is a dynamic array?",
        options: ["vector", "map", "set", "queue"],
        answer: "vector",
      },
      {
        question:
          "Which access specifier makes members accessible only within the class and friends?",
        options: ["private", "public", "protected", "internal"],
        answer: "private",
      },
      {
        question: "Which symbol starts a single-line comment?",
        options: ["//", "#", "--", "/*"],
        answer: "//",
      },
      {
        question: "What is called automatically when an object is created?",
        options: ["constructor", "destructor", "initializer", "main"],
        answer: "constructor",
      },
    ],

    Intermediate: [
      {
        question: "What is function overloading?",
        options: [
          "Same function name with different parameter lists",
          "Replacing a function at runtime",
          "Multiple return types",
          "Multiple namespaces",
        ],
        answer: "Same function name with different parameter lists",
      },
      {
        question: "What is a virtual function used for?",
        options: [
          "Runtime polymorphism",
          "Static allocation",
          "File handling",
          "Template parsing",
        ],
        answer: "Runtime polymorphism",
      },
      {
        question: "Which container stores key-value pairs?",
        options: ["map", "vector", "stack", "array"],
        answer: "map",
      },
      {
        question: "What does RAII associate resource management with?",
        options: [
          "Object lifetime",
          "Global variables only",
          "Macros",
          "Inheritance only",
        ],
        answer: "Object lifetime",
      },
      {
        question: "Which smart pointer provides exclusive ownership?",
        options: ["unique_ptr", "shared_ptr", "weak_ptr", "auto_ptr"],
        answer: "unique_ptr",
      },
      {
        question: "Which keywords are used for exception handling?",
        options: ["try", "catch", "throw", "All of these"],
        answer: "All of these",
      },
      {
        question: "What is a namespace used for?",
        options: [
          "Avoiding name collisions",
          "Allocating memory",
          "Creating threads",
          "Sorting arrays",
        ],
        answer: "Avoiding name collisions",
      },
      {
        question: "What does a const member function indicate?",
        options: [
          "It does not modify the object's state through this",
          "It cannot be called",
          "It is static",
          "It returns const only",
        ],
        answer: "It does not modify the object's state through this",
      },
      {
        question: "Which syntax is used for templates?",
        options: [
          "template<typename T>",
          "generic<T>",
          "type<T>",
          "template(type)",
        ],
        answer: "template<typename T>",
      },
      {
        question: "Which container follows FIFO?",
        options: ["queue", "stack", "vector", "set"],
        answer: "queue",
      },
    ],

    Advanced: [
      {
        question: "What is move semantics designed to reduce?",
        options: [
          "Unnecessary copying of resources",
          "Compilation time only",
          "Inheritance depth",
          "Header count",
        ],
        answer: "Unnecessary copying of resources",
      },
      {
        question: "Which reference type is commonly used for move operations?",
        options: [
          "rvalue reference",
          "lvalue reference",
          "const reference only",
          "pointer reference",
        ],
        answer: "rvalue reference",
      },
      {
        question: "What does std::move actually do?",
        options: [
          "Casts an expression to an xvalue enabling move operations",
          "Moves bytes immediately in all cases",
          "Deletes the object",
          "Allocates memory",
        ],
        answer: "Casts an expression to an xvalue enabling move operations",
      },
      {
        question: "Why is a virtual destructor important?",
        options: [
          "For correct destruction through a base pointer",
          "For faster compilation",
          "For preventing inheritance",
          "For making classes static",
        ],
        answer: "For correct destruction through a base pointer",
      },
      {
        question: "What does constexpr indicate?",
        options: [
          "A value or function can potentially be evaluated at compile time",
          "A value is always mutable",
          "A function is virtual",
          "A class is abstract",
        ],
        answer:
          "A value or function can potentially be evaluated at compile time",
      },
      {
        question: "What is SFINAE associated with?",
        options: [
          "Template substitution failure",
          "Memory allocation",
          "Thread scheduling",
          "File streams",
        ],
        answer: "Template substitution failure",
      },
      {
        question: "What does std::weak_ptr help avoid?",
        options: [
          "Owning a shared object and creating reference cycles",
          "All pointers",
          "Compilation",
          "Exceptions",
        ],
        answer: "Owning a shared object and creating reference cycles",
      },
      {
        question: "Which feature supports compile-time branching based on types?",
        options: ["if constexpr", "if static", "compile_if", "type_if"],
        answer: "if constexpr",
      },
      {
        question: "What is a lambda capture?",
        options: [
          "A way for a lambda to access surrounding variables",
          "A thread lock",
          "A class constructor",
          "A template parameter",
        ],
        answer: "A way for a lambda to access surrounding variables",
      },
      {
        question: "Which standard library utility represents an optional value?",
        options: ["std::optional", "std::maybe", "std::value", "std::nullable"],
        answer: "std::optional",
      },
    ],
  },

  JavaScript: {
    Beginner: [
      {
        question:
          "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["let", "var", "const", "define"],
        answer: "let",
      },
      {
        question: "Which keyword declares a constant binding?",
        options: ["const", "constant", "fixed", "static"],
        answer: "const",
      },
      {
        question: "Which operator performs strict equality?",
        options: ["===", "==", "=", "!=="],
        answer: "===",
      },
      {
        question: "Which method prints a message to the browser console?",
        options: [
          "console.log()",
          "print()",
          "echo()",
          "writeConsole()",
        ],
        answer: "console.log()",
      },
      {
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: "push()",
      },
      {
        question: "Which keyword defines a function declaration?",
        options: ["function", "def", "func", "method"],
        answer: "function",
      },
      {
        question: "Which data type represents true or false?",
        options: ["Boolean", "Binary", "Bit", "Logical"],
        answer: "Boolean",
      },
      {
        question: "Which value represents intentional absence of an object value?",
        options: ["null", "empty", "void", "none"],
        answer: "null",
      },
      {
        question: "Which operator assigns a value?",
        options: ["=", "==", "===", "=>"],
        answer: "=",
      },
      {
        question: "Which file extension is commonly used for JavaScript?",
        options: [".js", ".java", ".cpp", ".script"],
        answer: ".js",
      },
    ],

    Intermediate: [
      {
        question: "What does map() return for an array?",
        options: [
          "A new array with transformed elements",
          "A boolean",
          "A string only",
          "The original array only",
        ],
        answer: "A new array with transformed elements",
      },
      {
        question: "What does filter() return?",
        options: [
          "A new array containing elements that pass a test",
          "A single element",
          "An object only",
          "A number",
        ],
        answer: "A new array containing elements that pass a test",
      },
      {
        question: "What does reduce() commonly do?",
        options: [
          "Accumulates array values into a result",
          "Sorts only",
          "Creates DOM nodes",
          "Stops a loop",
        ],
        answer: "Accumulates array values into a result",
      },
      {
        question: "What is a Promise?",
        options: [
          "An object representing eventual completion or failure of an async operation",
          "A synchronous loop",
          "A DOM element",
          "A module",
        ],
        answer:
          "An object representing eventual completion or failure of an async operation",
      },
      {
        question: "Which syntax handles asynchronous operations sequentially?",
        options: ["async/await", "try/loop", "promise/wait", "sync/await"],
        answer: "async/await",
      },
      {
        question: "What is destructuring?",
        options: [
          "Extracting values from arrays or objects into variables",
          "Deleting properties",
          "Cloning classes only",
          "Sorting data",
        ],
        answer: "Extracting values from arrays or objects into variables",
      },
      {
        question: "What does spread syntax (...) commonly do?",
        options: [
          "Expands iterable elements or object properties",
          "Deletes an array",
          "Freezes an object",
          "Creates a Promise",
        ],
        answer: "Expands iterable elements or object properties",
      },
      {
        question: "What is a closure?",
        options: [
          "A function retaining access to its lexical environment",
          "A closed browser tab",
          "A class without methods",
          "A Promise",
        ],
        answer: "A function retaining access to its lexical environment",
      },
      {
        question: "Which method selects the first matching DOM element?",
        options: [
          "querySelector()",
          "getFirst()",
          "selectOne()",
          "findElement()",
        ],
        answer: "querySelector()",
      },
      {
        question: "What is event bubbling?",
        options: [
          "An event propagating from a target upward through ancestors",
          "Creating events repeatedly",
          "Stopping all events",
          "Dispatching only to the document",
        ],
        answer: "An event propagating from a target upward through ancestors",
      },
    ],

    Advanced: [
      {
        question: "What is the event loop responsible for?",
        options: [
          "Coordinating synchronous execution and queued asynchronous jobs",
          "Compiling CSS",
          "Rendering only",
          "Database transactions",
        ],
        answer:
          "Coordinating synchronous execution and queued asynchronous jobs",
      },
      {
        question: "What is the microtask queue commonly used for?",
        options: [
          "Promise reactions and other microtasks",
          "Images only",
          "CSS parsing",
          "Server startup only",
        ],
        answer: "Promise reactions and other microtasks",
      },
      {
        question: "What does prototypal inheritance use?",
        options: [
          "Prototype chains",
          "Header files",
          "Classes only",
          "SQL tables",
        ],
        answer: "Prototype chains",
      },
      {
        question: "What is hoisting?",
        options: [
          "Processing declarations before execution in their scope",
          "Moving files upward",
          "DOM reordering",
          "Network caching",
        ],
        answer: "Processing declarations before execution in their scope",
      },
      {
        question: "What is WeakMap useful for?",
        options: [
          "Associating data with object keys without preventing their garbage collection",
          "Sorting objects",
          "Deep cloning",
          "Serializing JSON",
        ],
        answer:
          "Associating data with object keys without preventing their garbage collection",
      },
      {
        question: "Which statement about closures is true?",
        options: [
          "They can retain variables from an outer lexical scope",
          "They always copy all variables",
          "They require classes",
          "They cannot be returned",
        ],
        answer: "They can retain variables from an outer lexical scope",
      },
      {
        question: "What does optional chaining ?. help with?",
        options: [
          "Safely accessing nested properties when an intermediate value may be nullish",
          "Creating promises",
          "Type casting",
          "Declaring variables",
        ],
        answer:
          "Safely accessing nested properties when an intermediate value may be nullish",
      },
      {
        question: "How is a generator function declared?",
        options: ["function*", "generator", "async*", "yield function"],
        answer: "function*",
      },
      {
        question: "What does Object.freeze() do?",
        options: [
          "Prevents modifications to an object's own properties in the usual way",
          "Deletes the object",
          "Makes it deeply immutable automatically",
          "Converts it to JSON",
        ],
        answer:
          "Prevents modifications to an object's own properties in the usual way",
      },
      {
        question: "What is debouncing commonly used for?",
        options: [
          "Delaying execution until calls stop for a specified interval",
          "Running every call immediately",
          "Caching API responses only",
          "Sorting events",
        ],
        answer:
          "Delaying execution until calls stop for a specified interval",
      },
    ],
  },

  SQL: {
    Beginner: [
      {
        question: "Which command retrieves data from a table?",
        options: ["SELECT", "GET", "FETCH", "READ"],
        answer: "SELECT",
      },
      {
        question: "Which command adds new rows?",
        options: ["INSERT", "ADD", "CREATE", "APPEND"],
        answer: "INSERT",
      },
      {
        question: "Which command modifies existing rows?",
        options: ["UPDATE", "CHANGE", "MODIFY", "ALTER"],
        answer: "UPDATE",
      },
      {
        question: "Which command removes rows?",
        options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
        answer: "DELETE",
      },
      {
        question: "Which clause filters rows?",
        options: ["WHERE", "FILTER", "HAVING", "WHEN"],
        answer: "WHERE",
      },
      {
        question: "Which clause sorts query results?",
        options: ["ORDER BY", "SORT BY", "GROUP BY", "ARRANGE"],
        answer: "ORDER BY",
      },
      {
        question: "Which function counts rows?",
        options: ["COUNT()", "SUM()", "TOTAL()", "ROWS()"],
        answer: "COUNT()",
      },
      {
        question: "Which keyword removes duplicate rows from a result?",
        options: ["DISTINCT", "UNIQUE", "DEDUP", "ONLY"],
        answer: "DISTINCT",
      },
      {
        question: "Which command creates a table?",
        options: ["CREATE TABLE", "MAKE TABLE", "NEW TABLE", "BUILD TABLE"],
        answer: "CREATE TABLE",
      },
      {
        question: "Which key uniquely identifies a row?",
        options: ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE ROW", "INDEX KEY"],
        answer: "PRIMARY KEY",
      },
    ],

    Intermediate: [
      {
        question: "What does GROUP BY do?",
        options: [
          "Groups rows for aggregate calculations",
          "Sorts rows only",
          "Deletes duplicates",
          "Joins tables",
        ],
        answer: "Groups rows for aggregate calculations",
      },
      {
        question: "Which clause filters groups after aggregation?",
        options: ["HAVING", "WHERE", "GROUPFILTER", "AFTER"],
        answer: "HAVING",
      },
      {
        question: "What is an INNER JOIN?",
        options: [
          "Returns matching rows from both joined tables",
          "Returns all left rows",
          "Returns all rows regardless of match",
          "Returns only unmatched rows",
        ],
        answer: "Returns matching rows from both joined tables",
      },
      {
        question: "What is a foreign key used for?",
        options: [
          "Referencing a key in another table",
          "Sorting a table",
          "Encrypting rows",
          "Counting records",
        ],
        answer: "Referencing a key in another table",
      },
      {
        question: "Which function calculates an average?",
        options: ["AVG()", "MEAN()", "AVERAGE()", "MID()"],
        answer: "AVG()",
      },
      {
        question: "What does COALESCE do?",
        options: [
          "Returns the first non-NULL expression",
          "Combines tables",
          "Counts NULLs only",
          "Sorts columns",
        ],
        answer: "Returns the first non-NULL expression",
      },
      {
        question: "What is normalization intended to reduce?",
        options: [
          "Redundancy and update anomalies",
          "Query syntax",
          "Indexes",
          "Primary keys",
        ],
        answer: "Redundancy and update anomalies",
      },
      {
        question: "Which command changes table structure?",
        options: ["ALTER TABLE", "UPDATE TABLE", "CHANGE TABLE", "MODIFY ROW"],
        answer: "ALTER TABLE",
      },
      {
        question: "What is an index mainly used for?",
        options: [
          "Improving lookup and query performance",
          "Guaranteeing uniqueness always",
          "Storing backups",
          "Replacing tables",
        ],
        answer: "Improving lookup and query performance",
      },
      {
        question: "Which operator matches a text pattern?",
        options: ["LIKE", "MATCHES", "PATTERN", "SIMILAR"],
        answer: "LIKE",
      },
    ],

    Advanced: [
      {
        question: "What is a window function?",
        options: [
          "A function calculating across related rows without collapsing them",
          "A function for GUI windows",
          "A table creation command",
          "A transaction type",
        ],
        answer:
          "A function calculating across related rows without collapsing them",
      },
      {
        question: "Which keyword commonly defines a window specification?",
        options: ["OVER", "WINDOWONLY", "PARTITIONONLY", "FRAMEONLY"],
        answer: "OVER",
      },
      {
        question: "What is a CTE introduced with?",
        options: ["WITH", "CTE", "DEFINE", "TEMP"],
        answer: "WITH",
      },
      {
        question: "What does a recursive CTE enable?",
        options: [
          "Queries that reference their own result iteratively",
          "Automatic indexing",
          "Encryption",
          "Parallel joins only",
        ],
        answer: "Queries that reference their own result iteratively",
      },
      {
        question: "What does A represent in ACID?",
        options: ["Atomicity", "Availability", "Accuracy", "Allocation"],
        answer: "Atomicity",
      },
      {
        question: "What does COMMIT do?",
        options: [
          "Makes transaction changes permanent",
          "Undoes changes",
          "Starts a transaction",
          "Locks a table permanently",
        ],
        answer: "Makes transaction changes permanent",
      },
      {
        question: "What does ROLLBACK do?",
        options: [
          "Undoes uncommitted transaction changes",
          "Saves changes",
          "Creates a savepoint only",
          "Drops a database",
        ],
        answer: "Undoes uncommitted transaction changes",
      },
      {
        question: "What is a query execution plan used for?",
        options: [
          "Understanding how a database intends to execute a query",
          "Creating tables",
          "Backing up data",
          "Defining users only",
        ],
        answer: "Understanding how a database intends to execute a query",
      },
      {
        question: "What is a deadlock?",
        options: [
          "Transactions waiting on resources held by each other in a cycle",
          "A failed SELECT",
          "A missing table",
          "A syntax error",
        ],
        answer:
          "Transactions waiting on resources held by each other in a cycle",
      },
      {
        question: "How does PARTITION BY in a window function differ from GROUP BY?",
        options: [
          "It can retain individual rows while computing partition-level results",
          "It always deletes rows",
          "It cannot use ORDER BY",
          "It only works on strings",
        ],
        answer:
          "It can retain individual rows while computing partition-level results",
      },
    ],
  },
};

export default questionBank;