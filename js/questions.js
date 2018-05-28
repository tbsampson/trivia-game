function resetQuestions() {
    questions = [{ 
        question: "The sequence of numbers on the blackboard is an example of...?",
        answers: ["The Phyllotaxis Array", "The Lombardi Moving Sum Principle","The Fibonacci Sequence","The Hawking Paired Sequence"],
        correct: 2,
        hint: "The first two numbers in the The Fibonacci Sequence are either 1 and 1, or 0 and 1, and each subsequent number is the sum of the previous two.",
        blackboard: function () {
            var a = 1, b = 0, num=29, temp; //show only first 29 numbers of the sequence
                while (num >= 0){
                temp = a;
                a = a + b;
                b = temp;
                num--;
                $('.number-parent').append(`<div class ="number-child wider-child float-right text-right">${temp}</div>`);
                }
            return b;
            }
    },
    {
        question: "The darkened numbers on the blackboard are all what type of numbers?",
        answers: ["Prime", "Composite","Orwellian","Non-Prime"],
        correct: 3,
        hint: "A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. A composite number is whole number that can be divided exactly by numbers other than 1 or itself.  Because the set contains the number 1, it is neither.  Orwellian has nothing to do with numbers.",
        blackboard: function () {
            displayNumbers(1, 80, 1, true);
        }
    },
    {
        question: "The lightened numbers on the blackboard are all what type of numbers?",
        answers: ["Prime", "Composite","Orwellian","Non-Prime"],
        correct: 0,
        hint: "A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers.",
        blackboard: function () {
            displayNumbers(1, 80, 1, true);
        }
    },
    {
        question: "The lightened numbers on the blackboard are all what type of numbers?",
        answers: ["Prime", "Composite","Orwellian","Non-Prime"],
        correct: 1,
        hint: "A composite number is whole number that can be divided exactly by numbers other than 1 or itself.",
        blackboard: function () {
            for(let i=1; i <= 80; i++){
                $('.number-parent').append(`<div class ="composite-child text-right">${i}</div>`);
            }
        }
    },
    {
        question: "How many multiples of 3 are there between 5 and 77?",
        answers: ["23", "24", "25", "26"],
        correct: 2,
        hint: "5-2=3 and 77-2=75 ==> 75/3=25",
        blackboard: function () {
            displayNumbers(5, 77, 3, false);
        }
    },
    {
        question: "How many times would the number 7 (in any place) appear in this sequence if 1 were added to the start and ending numbers?",
        answers: ["5", "6", "7", "8"],
        correct: 1,
        hint: "The squence on the blackboard is 0 to 200, in multiples of 7.  The same number of 7s appears when adding 1 to the begining and ending number of this sequence",
        blackboard: function () {
            displayNumbers(0, 200, 7, false);
        }
    },
    {
        question: "What is the product of the numbers on the blackboard?",
        answers: ["32,443", "128,944", "32,444,442", "0"],
        correct: 3,
        hint: "The product of two numbers is the two numbers multiplied.  Anything multiplied by zero is zero, and zero is in the sequence.",
        blackboard: function () {
            displayNumbers(0, 12, 1, false);
        }
    },
    {
        question: "What is the sum of the numbers on the blackboard?",
        answers: ["1000", "1050", "1100", "1025"],
        correct: 1,
        hint: "From 0, The sum of multiples of 50 to 100 = 150,  of 25 = 250, of 10 = 550, and of 5 = 1050",
        blackboard: function () {
            displayNumbers(0, 100, 5, false);
        }
    }
    
    ];
}
