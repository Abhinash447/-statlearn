const quizBank = {
  "Java": {
    "Beginner": [
      {
        "question": "What is the default value of an int instance field?",
        "options": [
          "0",
          "1",
          "null",
          "false"
        ],
        "answer": "0"
      },
      {
        "question": "Which class is the parent of all Java classes?",
        "options": [
          "Object",
          "Class",
          "Main",
          "System"
        ],
        "answer": "Object"
      },
      {
        "question": "Which keyword is used to declare a package?",
        "options": [
          "package",
          "import",
          "namespace",
          "module"
        ],
        "answer": "package"
      },
      {
        "question": "Which operator creates a logical OR condition?",
        "options": [
          "||",
          "&&",
          "!",
          "|"
        ],
        "answer": "||"
      },
      {
        "question": "Which method compares two String contents?",
        "options": [
          "equals()",
          "compare()",
          "==()",
          "same()"
        ],
        "answer": "equals()"
      },
      {
        "question": "Which keyword exits a method and optionally sends a value back?",
        "options": [
          "return",
          "break",
          "exit",
          "continue"
        ],
        "answer": "return"
      },
      {
        "question": "Which loop is commonly used when the number of iterations is known?",
        "options": [
          "for",
          "while",
          "do-while",
          "switch"
        ],
        "answer": "for"
      },
      {
        "question": "Which keyword skips to the next loop iteration?",
        "options": [
          "continue",
          "skip",
          "next",
          "pass"
        ],
        "answer": "continue"
      },
      {
        "question": "Which type stores a decimal value such as 3.14?",
        "options": [
          "double",
          "int",
          "char",
          "boolean"
        ],
        "answer": "double"
      },
      {
        "question": "Which Java feature lets one class implement multiple interfaces?",
        "options": [
          "Interfaces",
          "Packages",
          "Constructors",
          "Exceptions"
        ],
        "answer": "Interfaces"
      }
    ],
    "Intermediate": [
      {
        "question": "What is method overriding mainly associated with?",
        "options": [
          "Runtime polymorphism",
          "Compile-time constants",
          "Packages",
          "Primitive casting"
        ],
        "answer": "Runtime polymorphism"
      },
      {
        "question": "Which collection maintains insertion order and unique keys?",
        "options": [
          "LinkedHashMap",
          "HashMap",
          "TreeSet",
          "PriorityQueue"
        ],
        "answer": "LinkedHashMap"
      },
      {
        "question": "What does Optional help represent?",
        "options": [
          "A value that may be absent",
          "A thread lock",
          "A file stream",
          "A primitive type"
        ],
        "answer": "A value that may be absent"
      },
      {
        "question": "Which stream operation produces a single accumulated result?",
        "options": [
          "reduce",
          "map",
          "filter",
          "peek"
        ],
        "answer": "reduce"
      },
      {
        "question": "What does dependency injection primarily improve?",
        "options": [
          "Separation of object creation and use",
          "CPU speed",
          "Bytecode size",
          "Primitive storage"
        ],
        "answer": "Separation of object creation and use"
      },
      {
        "question": "Which exception is typically thrown for an invalid array index?",
        "options": [
          "ArrayIndexOutOfBoundsException",
          "IOException",
          "ArithmeticException",
          "ClassCastException"
        ],
        "answer": "ArrayIndexOutOfBoundsException"
      },
      {
        "question": "Which interface is designed for a boolean test on one argument?",
        "options": [
          "Predicate",
          "Consumer",
          "Supplier",
          "Runnable"
        ],
        "answer": "Predicate"
      },
      {
        "question": "Which keyword explicitly throws an exception?",
        "options": [
          "throw",
          "throws",
          "raise",
          "catch"
        ],
        "answer": "throw"
      },
      {
        "question": "Which collection is ideal for FIFO behavior?",
        "options": [
          "ArrayDeque",
          "HashMap",
          "TreeSet",
          "ArrayList"
        ],
        "answer": "ArrayDeque"
      },
      {
        "question": "What does immutable mean for an object?",
        "options": [
          "Its state cannot be changed after creation",
          "It cannot be referenced",
          "It cannot be garbage collected",
          "It is always static"
        ],
        "answer": "Its state cannot be changed after creation"
      }
    ],
    "Advanced": [
      {
        "question": "What does the Java Memory Model define?",
        "options": [
          "Rules for visibility and ordering of shared memory",
          "SQL syntax",
          "UI layout",
          "File formats"
        ],
        "answer": "Rules for visibility and ordering of shared memory"
      },
      {
        "question": "Which class provides atomic integer operations?",
        "options": [
          "AtomicInteger",
          "SafeInteger",
          "ThreadInteger",
          "ConcurrentInt"
        ],
        "answer": "AtomicInteger"
      },
      {
        "question": "What is lock-free programming designed to avoid?",
        "options": [
          "Blocking locks in progress algorithms",
          "All threads",
          "All memory access",
          "Garbage collection"
        ],
        "answer": "Blocking locks in progress algorithms"
      },
      {
        "question": "Which API is used to build immutable transformations over collections?",
        "options": [
          "Stream API",
          "Reflection API",
          "JDBC API",
          "NIO Path API"
        ],
        "answer": "Stream API"
      },
      {
        "question": "What is a sealed class used to control?",
        "options": [
          "Which classes may extend it",
          "Which methods are static",
          "Which fields are public",
          "Which packages are imported"
        ],
        "answer": "Which classes may extend it"
      },
      {
        "question": "Which feature enables pattern matching with instanceof?",
        "options": [
          "Pattern variables",
          "Generics",
          "Records",
          "Modules"
        ],
        "answer": "Pattern variables"
      },
      {
        "question": "What does ThreadLocal provide?",
        "options": [
          "A separate value for each thread",
          "A global lock",
          "A shared queue",
          "A database connection pool"
        ],
        "answer": "A separate value for each thread"
      },
      {
        "question": "Which executor is useful for scheduled tasks?",
        "options": [
          "ScheduledExecutorService",
          "ExecutorReader",
          "TaskSchedulerOnly",
          "TimerPool"
        ],
        "answer": "ScheduledExecutorService"
      },
      {
        "question": "What does CopyOnWriteArrayList optimize for?",
        "options": [
          "Many reads with few writes",
          "Many writes with no reads",
          "Sorting only",
          "Database access"
        ],
        "answer": "Many reads with few writes"
      },
      {
        "question": "Which Java mechanism can inspect classes and methods at runtime?",
        "options": [
          "Reflection",
          "Serialization",
          "Generics",
          "Annotations only"
        ],
        "answer": "Reflection"
      }
    ]
  },
  "Python": {
    "Beginner": [
      {
        "question": "What is the result of 7 // 2?",
        "options": [
          "3",
          "3.5",
          "4",
          "2"
        ],
        "answer": "3"
      },
      {
        "question": "Which function converts text to an integer?",
        "options": [
          "int()",
          "str()",
          "floatText()",
          "number()"
        ],
        "answer": "int()"
      },
      {
        "question": "Which keyword checks another condition after if?",
        "options": [
          "elif",
          "elseif",
          "else if",
          "then"
        ],
        "answer": "elif"
      },
      {
        "question": "Which method adds one item to a list?",
        "options": [
          "append()",
          "add()",
          "push()",
          "insertLast()"
        ],
        "answer": "append()"
      },
      {
        "question": "Which literal creates an empty dictionary?",
        "options": [
          "{}",
          "[]",
          "()",
          "set()"
        ],
        "answer": "{}"
      },
      {
        "question": "Which literal creates an empty set?",
        "options": [
          "set()",
          "{}",
          "[]",
          "empty()"
        ],
        "answer": "set()"
      },
      {
        "question": "What does range(5) produce for iteration?",
        "options": [
          "0 through 4",
          "1 through 5",
          "0 through 5",
          "5 through 10"
        ],
        "answer": "0 through 4"
      },
      {
        "question": "Which keyword defines a class?",
        "options": [
          "class",
          "struct",
          "object",
          "type"
        ],
        "answer": "class"
      },
      {
        "question": "Which operator checks membership?",
        "options": [
          "in",
          "contains",
          "inside",
          "has"
        ],
        "answer": "in"
      },
      {
        "question": "Which built-in converts a value to text?",
        "options": [
          "str()",
          "text()",
          "string()",
          "toString()"
        ],
        "answer": "str()"
      }
    ],
    "Intermediate": [
      {
        "question": "Which method removes and returns the last list item?",
        "options": [
          "pop()",
          "remove()",
          "delete()",
          "pull()"
        ],
        "answer": "pop()"
      },
      {
        "question": "What does zip() commonly do?",
        "options": [
          "Pairs elements from iterables",
          "Compresses files",
          "Sorts dictionaries",
          "Creates threads"
        ],
        "answer": "Pairs elements from iterables"
      },
      {
        "question": "Which exception indicates an invalid value for an operation?",
        "options": [
          "ValueError",
          "NameError",
          "KeyError",
          "ImportError"
        ],
        "answer": "ValueError"
      },
      {
        "question": "What does a set union produce?",
        "options": [
          "All distinct elements from both sets",
          "Only common elements",
          "Sorted elements only",
          "Duplicate elements"
        ],
        "answer": "All distinct elements from both sets"
      },
      {
        "question": "Which expression creates a dictionary comprehension?",
        "options": [
          "{k:v for k,v in items}",
          "[k:v for k,v in items]",
          "(k:v for k,v in items)",
          "<k:v>"
        ],
        "answer": "{k:v for k,v in items}"
      },
      {
        "question": "What does * unpack in a function call?",
        "options": [
          "An iterable into positional arguments",
          "A dictionary into keywords",
          "A string into bytes",
          "An exception"
        ],
        "answer": "An iterable into positional arguments"
      },
      {
        "question": "Which built-in checks whether all elements are truthy?",
        "options": [
          "all()",
          "every()",
          "truth()",
          "andall()"
        ],
        "answer": "all()"
      },
      {
        "question": "Which built-in checks whether any element is truthy?",
        "options": [
          "any()",
          "some()",
          "exists()",
          "orall()"
        ],
        "answer": "any()"
      },
      {
        "question": "What does a virtual environment isolate?",
        "options": [
          "Project Python packages",
          "CPU cores",
          "Source control",
          "Operating system users"
        ],
        "answer": "Project Python packages"
      },
      {
        "question": "Which module is commonly used to parse JSON?",
        "options": [
          "json",
          "parsejson",
          "datajson",
          "simplejsoncore"
        ],
        "answer": "json"
      }
    ],
    "Advanced": [
      {
        "question": "What does descriptor protocol enable?",
        "options": [
          "Custom attribute access behavior",
          "Thread scheduling",
          "SQL joins",
          "Binary parsing only"
        ],
        "answer": "Custom attribute access behavior"
      },
      {
        "question": "Which module provides an event loop for asynchronous tasks?",
        "options": [
          "asyncio",
          "eventloop",
          "async",
          "concurrentonly"
        ],
        "answer": "asyncio"
      },
      {
        "question": "What is a metaclass?",
        "options": [
          "A class whose instances are classes",
          "A parent object",
          "A decorator only",
          "A module loader"
        ],
        "answer": "A class whose instances are classes"
      },
      {
        "question": "Which mechanism can create a context manager with functions?",
        "options": [
          "contextlib.contextmanager",
          "functools.context",
          "withmaker",
          "context.create"
        ],
        "answer": "contextlib.contextmanager"
      },
      {
        "question": "What does multiprocessing help bypass in CPython for CPU-bound work?",
        "options": [
          "The GIL limitation on Python bytecode execution",
          "Type checking",
          "Garbage collection",
          "Import rules"
        ],
        "answer": "The GIL limitation on Python bytecode execution"
      },
      {
        "question": "Which protocol controls object attribute lookup customization?",
        "options": [
          "__getattribute__",
          "__findattr__",
          "__lookup__",
          "__access__"
        ],
        "answer": "__getattribute__"
      },
      {
        "question": "What does a dataclass primarily reduce?",
        "options": [
          "Boilerplate for data-holding classes",
          "Thread count",
          "Import time",
          "Database tables"
        ],
        "answer": "Boilerplate for data-holding classes"
      },
      {
        "question": "Which type hint represents values of one of several specified types?",
        "options": [
          "Union",
          "Choice",
          "Either",
          "VariantOnly"
        ],
        "answer": "Union"
      },
      {
        "question": "What is an async generator able to produce?",
        "options": [
          "Values asynchronously with async for",
          "Only lists",
          "Only threads",
          "Only files"
        ],
        "answer": "Values asynchronously with async for"
      },
      {
        "question": "Which profiling module is included in the standard library?",
        "options": [
          "cProfile",
          "pyprofilex",
          "profilekit",
          "perfiler"
        ],
        "answer": "cProfile"
      }
    ]
  },
  "C": {
    "Beginner": [
      {
        "question": "Which format specifier prints an integer with printf?",
        "options": [
          "%d",
          "%s",
          "%f",
          "%c"
        ],
        "answer": "%d"
      },
      {
        "question": "Which keyword declares a constant-qualified variable?",
        "options": [
          "const",
          "constant",
          "fixed",
          "readonly"
        ],
        "answer": "const"
      },
      {
        "question": "Which header provides malloc()?",
        "options": [
          "stdlib.h",
          "stdio.h",
          "memory.h",
          "alloc.h"
        ],
        "answer": "stdlib.h"
      },
      {
        "question": "Which loop checks its condition before each iteration?",
        "options": [
          "while",
          "do-while",
          "repeat",
          "loop"
        ],
        "answer": "while"
      },
      {
        "question": "Which operator is used for logical AND?",
        "options": [
          "&&",
          "||",
          "&",
          "and"
        ],
        "answer": "&&"
      },
      {
        "question": "Which function reads formatted input?",
        "options": [
          "scanf()",
          "readf()",
          "input()",
          "getformat()"
        ],
        "answer": "scanf()"
      },
      {
        "question": "Which directive includes a header file?",
        "options": [
          "#include",
          "#import",
          "#header",
          "#using"
        ],
        "answer": "#include"
      },
      {
        "question": "Which type is commonly used for decimal values?",
        "options": [
          "float",
          "int",
          "char",
          "void"
        ],
        "answer": "float"
      },
      {
        "question": "Which statement chooses among multiple cases?",
        "options": [
          "switch",
          "select",
          "choose",
          "caseonly"
        ],
        "answer": "switch"
      },
      {
        "question": "What does sizeof return?",
        "options": [
          "Size in bytes",
          "Memory address",
          "Variable value",
          "Type name"
        ],
        "answer": "Size in bytes"
      }
    ],
    "Intermediate": [
      {
        "question": "What does pointer arithmetic depend on?",
        "options": [
          "Size of the pointed-to type",
          "Variable name",
          "CPU brand only",
          "String length"
        ],
        "answer": "Size of the pointed-to type"
      },
      {
        "question": "Which function finds the length of a C string?",
        "options": [
          "strlen()",
          "strsize()",
          "length()",
          "countstr()"
        ],
        "answer": "strlen()"
      },
      {
        "question": "What does extern usually indicate?",
        "options": [
          "A declaration defined elsewhere",
          "A local variable",
          "A constant",
          "A pointer to a file"
        ],
        "answer": "A declaration defined elsewhere"
      },
      {
        "question": "Which keyword creates an enumeration type?",
        "options": [
          "enum",
          "enumeration",
          "choice",
          "variant"
        ],
        "answer": "enum"
      },
      {
        "question": "What is recursion?",
        "options": [
          "A function calling itself",
          "A pointer to a pointer",
          "A loop keyword",
          "A memory allocator"
        ],
        "answer": "A function calling itself"
      },
      {
        "question": "Which function allocates zero-initialized blocks?",
        "options": [
          "calloc()",
          "malloc()",
          "realloc()",
          "zeroalloc()"
        ],
        "answer": "calloc()"
      },
      {
        "question": "Which operator gets a structure member directly?",
        "options": [
          ".",
          "->",
          "::",
          "#"
        ],
        "answer": "."
      },
      {
        "question": "What does fgets() help prevent compared with unsafe line input?",
        "options": [
          "It can limit the number of characters read",
          "It removes all whitespace",
          "It encrypts input",
          "It allocates unlimited memory"
        ],
        "answer": "It can limit the number of characters read"
      },
      {
        "question": "Which header declares memcpy()?",
        "options": [
          "string.h",
          "stdio.h",
          "stdlib.h",
          "memory.c"
        ],
        "answer": "string.h"
      },
      {
        "question": "What is a union used for?",
        "options": [
          "Different members sharing the same memory",
          "Automatic inheritance",
          "Dynamic arrays only",
          "Function overloading"
        ],
        "answer": "Different members sharing the same memory"
      }
    ],
    "Advanced": [
      {
        "question": "What is a function pointer commonly used for?",
        "options": [
          "Callbacks and dispatch tables",
          "Automatic garbage collection",
          "String storage",
          "Header inclusion"
        ],
        "answer": "Callbacks and dispatch tables"
      },
      {
        "question": "What does undefined behavior mean in C?",
        "options": [
          "The standard imposes no requirements on the outcome",
          "The compiler must stop",
          "The program always crashes",
          "The result is always zero"
        ],
        "answer": "The standard imposes no requirements on the outcome"
      },
      {
        "question": "What is a memory leak?",
        "options": [
          "Allocated memory that is no longer reachable but not freed",
          "A syntax error",
          "A stack variable",
          "A compiler optimization"
        ],
        "answer": "Allocated memory that is no longer reachable but not freed"
      },
      {
        "question": "What does restrict qualify?",
        "options": [
          "A pointer aliasing promise to the compiler",
          "A constant integer",
          "A function return type",
          "A structure field"
        ],
        "answer": "A pointer aliasing promise to the compiler"
      },
      {
        "question": "Which function can resize an allocated memory block?",
        "options": [
          "realloc()",
          "resize()",
          "memresize()",
          "expand()"
        ],
        "answer": "realloc()"
      },
      {
        "question": "A pointer still storing the address of an object whose lifetime ended is called what?",
        "options": [
          "A pointer to storage whose lifetime has ended",
          "A pointer set to NULL",
          "A pointer to a function",
          "A constant pointer"
        ],
        "answer": "A pointer to storage whose lifetime has ended"
      },
      {
        "question": "What is a variadic function?",
        "options": [
          "A function accepting a variable number of arguments",
          "A recursive function",
          "A static function",
          "A pointer function"
        ],
        "answer": "A function accepting a variable number of arguments"
      },
      {
        "question": "Which macro helps retrieve the number of elements in a C array at compile time?",
        "options": [
          "sizeof(array)/sizeof(array[0])",
          "length(array)",
          "count(array)",
          "array.size()"
        ],
        "answer": "sizeof(array)/sizeof(array[0])"
      },
      {
        "question": "What does volatile communicate to the compiler?",
        "options": [
          "The value may change outside normal program flow",
          "The value is immutable",
          "The variable is thread-safe",
          "The value is always zero"
        ],
        "answer": "The value may change outside normal program flow"
      },
      {
        "question": "Which toolchain stage converts source code into object code?",
        "options": [
          "Compilation",
          "Linking",
          "Loading",
          "Execution"
        ],
        "answer": "Compilation"
      }
    ]
  },
  "C++": {
    "Beginner": [
      {
        "question": "Which operator is used to access a member through a pointer?",
        "options": [
          "->",
          ".",
          "::",
          "&"
        ],
        "answer": "->"
      },
      {
        "question": "Which container stores key-value pairs?",
        "options": [
          "map",
          "vector",
          "stack",
          "array"
        ],
        "answer": "map"
      },
      {
        "question": "Which keyword declares a reference variable?",
        "options": [
          "&",
          "ref",
          "reference",
          "@"
        ],
        "answer": "&"
      },
      {
        "question": "Which stream writes to standard output?",
        "options": [
          "cout",
          "cin",
          "cerr",
          "clog"
        ],
        "answer": "cout"
      },
      {
        "question": "Which header provides std::vector?",
        "options": [
          "<vector>",
          "<array>",
          "<list>",
          "<container>"
        ],
        "answer": "<vector>"
      },
      {
        "question": "Which keyword is used to allocate dynamic storage?",
        "options": [
          "new",
          "malloc",
          "alloc",
          "create"
        ],
        "answer": "new"
      },
      {
        "question": "Which keyword releases memory allocated with new?",
        "options": [
          "delete",
          "free",
          "release",
          "remove"
        ],
        "answer": "delete"
      },
      {
        "question": "What is a constructor called when an object is created?",
        "options": [
          "Automatically",
          "Only manually",
          "Never",
          "After destructor"
        ],
        "answer": "Automatically"
      },
      {
        "question": "Which access specifier hides members from outside code?",
        "options": [
          "private",
          "public",
          "open",
          "internal"
        ],
        "answer": "private"
      },
      {
        "question": "Which feature lets a class define several constructors?",
        "options": [
          "Constructor overloading",
          "Inheritance",
          "Templates",
          "Namespaces"
        ],
        "answer": "Constructor overloading"
      }
    ],
    "Intermediate": [
      {
        "question": "Which C++ mechanism lets a base-class pointer call a derived implementation at runtime?",
        "options": [
          "Runtime polymorphism",
          "Compile-time constants",
          "Memory allocation",
          "Header inclusion"
        ],
        "answer": "Runtime polymorphism"
      },
      {
        "question": "Which container follows FIFO access?",
        "options": [
          "queue",
          "stack",
          "set",
          "map"
        ],
        "answer": "queue"
      },
      {
        "question": "Which container follows LIFO access?",
        "options": [
          "stack",
          "queue",
          "map",
          "vector"
        ],
        "answer": "stack"
      },
      {
        "question": "What does std::move primarily enable?",
        "options": [
          "Moving from an object instead of copying it",
          "Deleting an object",
          "Starting a thread",
          "Sorting a vector"
        ],
        "answer": "Moving from an object instead of copying it"
      },
      {
        "question": "Which keyword prevents a virtual method from being overridden?",
        "options": [
          "final",
          "sealed",
          "stop",
          "const"
        ],
        "answer": "final"
      },
      {
        "question": "What does const on a member function indicate?",
        "options": [
          "It should not modify the object's observable state",
          "It returns a constant",
          "It is static",
          "It cannot be called"
        ],
        "answer": "It should not modify the object's observable state"
      },
      {
        "question": "Which cast is checked at runtime for polymorphic pointers?",
        "options": [
          "dynamic_cast",
          "static_cast",
          "reinterpret_cast",
          "const_cast"
        ],
        "answer": "dynamic_cast"
      },
      {
        "question": "Which STL algorithm sorts a range?",
        "options": [
          "std::sort",
          "std::order",
          "std::arrange",
          "std::sequence"
        ],
        "answer": "std::sort"
      },
      {
        "question": "What does an iterator represent?",
        "options": [
          "A position for traversing a range",
          "A database row",
          "A class only",
          "A thread"
        ],
        "answer": "A position for traversing a range"
      },
      {
        "question": "Which feature lets functions operate on multiple types?",
        "options": [
          "Templates",
          "Namespaces",
          "Streams",
          "Destructors"
        ],
        "answer": "Templates"
      }
    ],
    "Advanced": [
      {
        "question": "What does std::unique_ptr express?",
        "options": [
          "Exclusive ownership",
          "Shared ownership",
          "Non-owning weak ownership",
          "Static storage"
        ],
        "answer": "Exclusive ownership"
      },
      {
        "question": "What does std::weak_ptr avoid?",
        "options": [
          "Owning a shared_ptr target and creating ownership cycles",
          "All exceptions",
          "Template use",
          "Dynamic allocation"
        ],
        "answer": "Owning a shared_ptr target and creating ownership cycles"
      },
      {
        "question": "What is SFINAE used for?",
        "options": [
          "Selecting viable template overloads based on substitution",
          "Managing threads",
          "Allocating memory",
          "Sorting data"
        ],
        "answer": "Selecting viable template overloads based on substitution"
      },
      {
        "question": "What does constexpr enable?",
        "options": [
          "Potential compile-time evaluation",
          "Runtime-only evaluation",
          "Automatic threading",
          "Database access"
        ],
        "answer": "Potential compile-time evaluation"
      },
      {
        "question": "What is a move constructor designed to do?",
        "options": [
          "Initialize an object by transferring resources from another object",
          "Copy every byte",
          "Destroy an object",
          "Create a virtual table"
        ],
        "answer": "Initialize an object by transferring resources from another object"
      },
      {
        "question": "What does std::optional represent?",
        "options": [
          "A value that may be absent",
          "A thread",
          "A pointer that always owns",
          "A sorted container"
        ],
        "answer": "A value that may be absent"
      },
      {
        "question": "What does std::variant store?",
        "options": [
          "One value from a fixed set of alternative types",
          "Only strings",
          "Only pointers",
          "Only arrays"
        ],
        "answer": "One value from a fixed set of alternative types"
      },
      {
        "question": "Which facility creates a callable with bound arguments?",
        "options": [
          "std::bind",
          "std::attach",
          "std::link",
          "std::callbind"
        ],
        "answer": "std::bind"
      },
      {
        "question": "What is the purpose of exception specifications using noexcept?",
        "options": [
          "Declare that a function is not expected to throw",
          "Force an exception",
          "Catch every exception",
          "Disable destructors"
        ],
        "answer": "Declare that a function is not expected to throw"
      },
      {
        "question": "Which standard library feature supports parallel algorithms when enabled?",
        "options": [
          "Execution policies",
          "Thread arrays",
          "Parallel vectors",
          "Async iterators"
        ],
        "answer": "Execution policies"
      }
    ]
  },
  "JavaScript": {
    "Beginner": [
      {
        "question": "Which declaration allows reassignment while keeping block scope?",
        "options": [
          "let",
          "const",
          "varOnly",
          "define"
        ],
        "answer": "let"
      },
      {
        "question": "Which keyword declares a block-scoped constant binding?",
        "options": [
          "const",
          "let",
          "constant",
          "final"
        ],
        "answer": "const"
      },
      {
        "question": "Which method adds an element to the end of an array?",
        "options": [
          "push()",
          "append()",
          "add()",
          "insertEnd()"
        ],
        "answer": "push()"
      },
      {
        "question": "Which method removes the first array element?",
        "options": [
          "shift()",
          "pop()",
          "removeFirst()",
          "delete()"
        ],
        "answer": "shift()"
      },
      {
        "question": "Which value represents an uninitialized declared variable?",
        "options": [
          "undefined",
          "null",
          "empty",
          "void"
        ],
        "answer": "undefined"
      },
      {
        "question": "Which equality operator compares both value and type without coercion?",
        "options": [
          "===",
          "==",
          "=",
          "!=="
        ],
        "answer": "==="
      },
      {
        "question": "Which method converts a string to a number?",
        "options": [
          "Number()",
          "parseText()",
          "toNumberString()",
          "numeric()"
        ],
        "answer": "Number()"
      },
      {
        "question": "Which syntax is used for a standard JavaScript function declaration?",
        "options": [
          "function",
          "def",
          "func",
          "method"
        ],
        "answer": "function"
      },
      {
        "question": "Which property gives an array's number of elements?",
        "options": [
          "length",
          "size",
          "count",
          "items"
        ],
        "answer": "length"
      },
      {
        "question": "Which syntax starts a single-line comment?",
        "options": [
          "//",
          "#",
          "<!--",
          "--"
        ],
        "answer": "//"
      }
    ],
    "Intermediate": [
      {
        "question": "Which array method returns the first element matching a test?",
        "options": [
          "find()",
          "filter()",
          "search()",
          "match()"
        ],
        "answer": "find()"
      },
      {
        "question": "Which array method tests whether at least one element passes a test?",
        "options": [
          "some()",
          "any()",
          "exists()",
          "one()"
        ],
        "answer": "some()"
      },
      {
        "question": "Which array method tests whether every element passes a test?",
        "options": [
          "every()",
          "all()",
          "each()",
          "complete()"
        ],
        "answer": "every()"
      },
      {
        "question": "What does object destructuring do?",
        "options": [
          "Extracts properties into variables",
          "Deletes properties",
          "Freezes an object",
          "Serializes JSON"
        ],
        "answer": "Extracts properties into variables"
      },
      {
        "question": "What does the spread syntax commonly do with an array?",
        "options": [
          "Expands its elements",
          "Sorts it",
          "Freezes it",
          "Converts it to JSON"
        ],
        "answer": "Expands its elements"
      },
      {
        "question": "Which API converts a JavaScript value to JSON text?",
        "options": [
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.toText()",
          "JSON.encodeText()"
        ],
        "answer": "JSON.stringify()"
      },
      {
        "question": "What does optional chaining ?. help with?",
        "options": [
          "Safely accessing nested values that may be nullish",
          "Creating promises",
          "Declaring constants",
          "Sorting arrays"
        ],
        "answer": "Safely accessing nested values that may be nullish"
      },
      {
        "question": "What does nullish coalescing ?? use as a fallback for?",
        "options": [
          "null or undefined",
          "false only",
          "zero only",
          "all falsy values"
        ],
        "answer": "null or undefined"
      },
      {
        "question": "Which browser API stores simple key-value data persistently?",
        "options": [
          "localStorage",
          "sessionDB",
          "browserStore",
          "webMemory"
        ],
        "answer": "localStorage"
      },
      {
        "question": "Which keyword creates a promise-producing async function?",
        "options": [
          "async",
          "await",
          "promise",
          "defer"
        ],
        "answer": "async"
      }
    ],
    "Advanced": [
      {
        "question": "What is a closure in JavaScript?",
        "options": [
          "A function retaining access to its lexical environment",
          "A closed object",
          "A promise",
          "A module"
        ],
        "answer": "A function retaining access to its lexical environment"
      },
      {
        "question": "What does the event loop coordinate?",
        "options": [
          "Callbacks and asynchronous tasks",
          "CSS rules",
          "Database schemas",
          "HTML attributes"
        ],
        "answer": "Callbacks and asynchronous tasks"
      },
      {
        "question": "What does Promise.allSettled() provide?",
        "options": [
          "Results for all promises regardless of fulfillment or rejection",
          "Only the first result",
          "Only fulfilled results",
          "A synchronous result"
        ],
        "answer": "Results for all promises regardless of fulfillment or rejection"
      },
      {
        "question": "What is prototypal inheritance based on?",
        "options": [
          "Prototype chains between objects",
          "Class files only",
          "Database tables",
          "CSS selectors"
        ],
        "answer": "Prototype chains between objects"
      },
      {
        "question": "What does a WeakMap help with?",
        "options": [
          "Associating values with object keys without preventing garbage collection of keys",
          "Sorting maps",
          "Serializing objects",
          "Storing primitive keys only"
        ],
        "answer": "Associating values with object keys without preventing garbage collection of keys"
      },
      {
        "question": "What is memoization?",
        "options": [
          "Caching function results for repeated inputs",
          "Deleting old variables",
          "Creating promises",
          "Compiling code"
        ],
        "answer": "Caching function results for repeated inputs"
      },
      {
        "question": "What does a Proxy allow?",
        "options": [
          "Intercepting operations on an object",
          "Creating threads",
          "Parsing JSON",
          "Replacing the event loop"
        ],
        "answer": "Intercepting operations on an object"
      },
      {
        "question": "What does debouncing do?",
        "options": [
          "Delays execution until calls stop for a period",
          "Runs a function more often",
          "Cancels every event",
          "Sorts callbacks"
        ],
        "answer": "Delays execution until calls stop for a period"
      },
      {
        "question": "What does throttling do?",
        "options": [
          "Limits how often a function can run",
          "Runs a function after every call",
          "Deletes events",
          "Creates promises"
        ],
        "answer": "Limits how often a function can run"
      },
      {
        "question": "What is an ES module's named export?",
        "options": [
          "An exported binding imported by its specified name",
          "A default-only value",
          "A browser cookie",
          "A class field"
        ],
        "answer": "An exported binding imported by its specified name"
      }
    ]
  },
  "SQL": {
    "Beginner": [
      {
        "question": "Which clause selects specific columns?",
        "options": [
          "SELECT",
          "COLUMNS",
          "CHOOSE",
          "GET"
        ],
        "answer": "SELECT"
      },
      {
        "question": "Which command removes rows matching a condition?",
        "options": [
          "DELETE",
          "DROP",
          "REMOVE TABLE",
          "ERASE"
        ],
        "answer": "DELETE"
      },
      {
        "question": "Which constraint uniquely identifies each row?",
        "options": [
          "PRIMARY KEY",
          "UNIQUE ROW",
          "IDENTITY ONLY",
          "ROW KEY"
        ],
        "answer": "PRIMARY KEY"
      },
      {
        "question": "Which clause specifies source tables?",
        "options": [
          "FROM",
          "SOURCE",
          "TABLE",
          "USING"
        ],
        "answer": "FROM"
      },
      {
        "question": "Which operator tests a range of values?",
        "options": [
          "BETWEEN",
          "RANGE",
          "WITHIN",
          "INRANGE"
        ],
        "answer": "BETWEEN"
      },
      {
        "question": "Which operator tests membership in a list?",
        "options": [
          "IN",
          "HAS",
          "MEMBER",
          "AMONG"
        ],
        "answer": "IN"
      },
      {
        "question": "Which pattern wildcard represents any sequence of characters in LIKE?",
        "options": [
          "%",
          "_",
          "*",
          "?"
        ],
        "answer": "%"
      },
      {
        "question": "Which keyword gives a column an alternate name?",
        "options": [
          "AS",
          "ALIAS",
          "NAME",
          "RENAME"
        ],
        "answer": "AS"
      },
      {
        "question": "Which command adds a new column?",
        "options": [
          "ALTER TABLE",
          "UPDATE COLUMN",
          "ADD ROW",
          "CREATE FIELD"
        ],
        "answer": "ALTER TABLE"
      },
      {
        "question": "Which constraint supplies a value when none is provided?",
        "options": [
          "DEFAULT",
          "FILL",
          "AUTO",
          "FALLBACK"
        ],
        "answer": "DEFAULT"
      }
    ],
    "Intermediate": [
      {
        "question": "Which join returns all matching rows plus unmatched left rows?",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "FULL ONLY"
        ],
        "answer": "LEFT JOIN"
      },
      {
        "question": "Which aggregate returns the largest value?",
        "options": [
          "MAX()",
          "LARGE()",
          "TOP()",
          "HIGH()"
        ],
        "answer": "MAX()"
      },
      {
        "question": "Which aggregate returns the smallest value?",
        "options": [
          "MIN()",
          "LOW()",
          "SMALLEST()",
          "BOTTOM()"
        ],
        "answer": "MIN()"
      },
      {
        "question": "Which clause removes groups that fail an aggregate condition?",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER GROUP",
          "GROUP WHERE"
        ],
        "answer": "HAVING"
      },
      {
        "question": "What does COALESCE() return?",
        "options": [
          "The first non-NULL expression",
          "The last row",
          "The largest value",
          "A count"
        ],
        "answer": "The first non-NULL expression"
      },
      {
        "question": "What does a subquery do?",
        "options": [
          "Uses a query inside another SQL statement",
          "Creates a new server",
          "Always updates data",
          "Only sorts rows"
        ],
        "answer": "Uses a query inside another SQL statement"
      },
      {
        "question": "Which command commits a transaction?",
        "options": [
          "COMMIT",
          "SAVE",
          "APPLY",
          "FINISH"
        ],
        "answer": "COMMIT"
      },
      {
        "question": "Which command undoes uncommitted changes?",
        "options": [
          "ROLLBACK",
          "UNDO",
          "REVERSE",
          "CANCEL SQL"
        ],
        "answer": "ROLLBACK"
      },
      {
        "question": "Which constraint references a key in another table?",
        "options": [
          "FOREIGN KEY",
          "REFERENCE KEY",
          "LINK KEY",
          "RELATED"
        ],
        "answer": "FOREIGN KEY"
      },
      {
        "question": "Which clause can return rows in descending order?",
        "options": [
          "ORDER BY ... DESC",
          "SORT DESC ONLY",
          "GROUP DESC",
          "DESCENDING"
        ],
        "answer": "ORDER BY ... DESC"
      }
    ],
    "Advanced": [
      {
        "question": "What does a window function preserve compared with GROUP BY?",
        "options": [
          "Individual result rows",
          "Only one row per group",
          "Only aggregate values",
          "No ordering"
        ],
        "answer": "Individual result rows"
      },
      {
        "question": "Which window function gives a sequential number to rows?",
        "options": [
          "ROW_NUMBER()",
          "SEQUENCE()",
          "ROW_ID()",
          "NUMBER_ROW()"
        ],
        "answer": "ROW_NUMBER()"
      },
      {
        "question": "What does PARTITION BY define in a window function?",
        "options": [
          "Independent groups over which the window calculation operates",
          "A physical table partition only",
          "A database schema",
          "A transaction"
        ],
        "answer": "Independent groups over which the window calculation operates"
      },
      {
        "question": "What is a covering index?",
        "options": [
          "An index containing all columns needed by a query",
          "An index on every table",
          "A temporary index",
          "A deleted index"
        ],
        "answer": "An index containing all columns needed by a query"
      },
      {
        "question": "What is a query execution plan?",
        "options": [
          "The optimizer's chosen operations for executing a query",
          "A table backup",
          "A user role",
          "A transaction log"
        ],
        "answer": "The optimizer's chosen operations for executing a query"
      },
      {
        "question": "What does ACID isolation address?",
        "options": [
          "How concurrent transactions interact",
          "Disk compression",
          "Column names",
          "Backup scheduling"
        ],
        "answer": "How concurrent transactions interact"
      },
      {
        "question": "What is a recursive CTE useful for?",
        "options": [
          "Hierarchical or recursive relationships",
          "Only sorting",
          "Only deleting",
          "Creating indexes"
        ],
        "answer": "Hierarchical or recursive relationships"
      },
      {
        "question": "What is a materialized view?",
        "options": [
          "Stored query results that can be refreshed",
          "A normal alias only",
          "A temporary WHERE clause",
          "A primary key"
        ],
        "answer": "Stored query results that can be refreshed"
      },
      {
        "question": "Why can an index slow writes?",
        "options": [
          "Index entries must also be maintained",
          "Indexes block SELECT",
          "Indexes remove rows",
          "Indexes disable transactions"
        ],
        "answer": "Index entries must also be maintained"
      },
      {
        "question": "What is a deadlock between transactions?",
        "options": [
          "Each transaction waits for resources held by another",
          "A missing table",
          "A failed SELECT",
          "A duplicate column"
        ],
        "answer": "Each transaction waits for resources held by another"
      }
    ]
  }
};

export default quizBank;