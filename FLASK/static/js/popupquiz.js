Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    title: "How well Do you know the world?",
    logo : "https://i.ibb.co/hyLsRmw/rowdy-rooster-logo.png",
    logoWidth: 70,
    logoHeight: 70,
    showProgressBar: "bottom",
    showTimerPanel: "top",
    maxTimeToFinishPage: 12,
    maxTimeToFinish: 140,
    firstPageIsStarted: true,
    startSurveyText: "Start Quiz",
    pages: [
        {
            questions: [
                {
                    type: "html",
                    html: "Welcome USC Bootcamp folks, you are about to start quiz ! <br/><br/> You have 12 seconds for every page and around 2 mins for the whole survey of 13 questions.<br/>Please click on <b>'Start Quiz'</b> button when you are ready."
                }
            ]
        }, {
            questions: [
                {
                    type: "radiogroup",
                    name: "Q1_primaryschool",
                    title: "In all low-income countries across the world today, how many girls finish primary school?",
                    choices: [
                        "20%", "40%", "60%"
                    ],
                    correctAnswer: "60%"
                }
            ]
        }, {
            questions: [
                {
                    type: "radiogroup",
                    name: "Q2_majoritypopulation",
                    title: "Where does the majority of the world population live?",                    
                    choices: [
                        "Low-income countries", "Middle- income countries", "High-income countries"
                    ],
                    correctAnswer: "Middle- income countries"
                }
            ]
        }, {            
            questions: [
                {
                    type: "radiogroup",
                    name: "Q3_povertyrate",
                    title: "In the last 20 years, the proportion of the world population living in extreme poverty has...",                    
                    choices: [
                        "Almost doubled", "Remained more or less the same", "Almost halved"
                    ],
                    correctAnswer: "Almost halved"
                }
            ]
        }, {            
            questions: [
                {
                    type: "radiogroup",
                    name: "Q4_lifeexpectancy",
                    title: "What is the life expectancy of the world today?",                    
                    choices: [
                        "50 years", "60 years", "70 years"
                    ],
                    correctAnswer: "70 years"
                }
            ]
        }, {            
            questions: [
                {
                    type: "radiogroup",
                    name: "Q5_childrenpop",
                    title: "There are 2 billion children in the world today, aged 0 to 15 years old. How many children will there be in the year 2100, according to the United Nations?",                    
                    choices: [
                        "4 billion", "3 billion", "2 billion"
                    ],
                    correctAnswer: "2 billion"
                }
            ]
        },{            
            questions: [
                {
                    type: "radiogroup",
                    name: "Q6_popincrease",
                    title: "The UN predicts that by 2100 the world population will have increased by another 4 billion people. What is the main reason?",                    
                    choices: [
                        "There will be more children (age below 15)", "There will be more adults (age 15 to 74)", "There will be more very old people (age 75 and older)"
                    ],
                    correctAnswer: "There will be more adults (age 15 to 74)"
                }
            ]        
        },{            
            questions: [
                {
                    type: "radiogroup",
                    name: "Q7_popincrease",
                    title: "How did the number of deaths per year from natural disasters change over the last hundred years?",                    
                    choices: [
                        "More than doubled", "Remained about the same", "Decreased to less than half"
                    ],
                    correctAnswer: "Decreased to less than half"
                }
            
            ]
        },{             
            questions: [
                {
                    type: "imagepicker",
                    name: "Q8_choosepicture",
                    title: "There are roughly 7 billion people in the world today. Which map shows best where they live? (Each figure represents 1 billion people.)",
                    choices: [
                        {
                            "value": "A",
                            "imageLink": "https://i.ibb.co/rGXRb4W/A.png"                            
                        }, {
                            "value": "B",
                            "imageLink": "https://i.ibb.co/VHpXvPr/B.png"
                        }, {
                            "value": "C",
                            "imageLink": "https://i.ibb.co/fHZTJGM/C.png"
                        }],
                    correctAnswer: "A"
                           
                }
            ]
        },{             
            questions: [
                {
                    type: "radiogroup",
                    name: "Q9_vaccinated",
                    title: "How many of the world’s 1-year-old children today have been vaccinated (not for COVID) against some disease?",
                    choices: [
                        "20 %", "50 %","80 %"                        
                        ],
                    correctAnswer: "80 %"
                           
                }
            ]
        },{             
            questions: [
                {
                    type: "radiogroup",
                    name: "Q10_edugap",
                    title: "Worldwide, 30-year-old men have spent 10 years in school, on average. How many years have women of the same age spent in school?",
                    choices: [
                        "9 years", "6 years","3 years"                        
                        ],
                    correctAnswer: "9 years"
                           
                }
            ]
        },{             
            questions: [
                {
                    type: "radiogroup",
                    name: "Q11_endangered",
                    title: "In 1996, tigers, giant pandas, and black rhinos were all listed as endangered. How many of these three species are more critically endangered today?",
                    choices: [
                        "Two of them", "One of them","None of them"                        
                        ],
                    correctAnswer: "None of them" 
                           
                }
            ]
        },{             
            questions: [
                {
                    type: "radiogroup",
                    name: "Q12_elec",
                    title: "How many people in the world have some access to electricity?",
                    choices: [
                        "20 %", "50 %","80 %"                         
                        ],
                    correctAnswer: "80 %" 
                           
                }
            ]
        },{
            maxTimeToFinish: 120,             
            questions: [
                {
                    type: "radiogroup",
                    name: "Q13_globalwarming",
                    title: "Global climate experts believe that, over the next 100 years, the average temperature will...",
                    choices: [
                        "get warmer", "remain the same","get colder"                         
                        ],
                    correctAnswer: "get warmer"                           
                }
            ]
        }
    ],
    completedHtml: "<h4>You have answered correctly <b>{correctedAnswers}</b> questions from <b>{questionCount}</b>.</h4>"
};

//window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    }); 

survey.render("surveyElement");

// Review

// survey.data = {
//     Q1_primaryschool: "60%",
//     Q2_majoritypopulation: "Middle- income countries",
//     Q3_povertyrate: "Almost halved",
//     Q4_lifeexpectanc:"70 years",
//     Q5_childrenpop:"2 billion", 
//     Q6_popincrease: "There will be more adults (age 15 to 74)",
//     Q7_popincrease:"Decreased to less than half",
//     Q8_choosepicture:"A",
//     Q9_vaccinated:"80 %",
//     Q10_edugap:"9 years",
//     Q11_endangered:"None of them" ,
//     Q12_elec:"80 %" ,
//     Q13_globalwarming:"get warmer"

// };

// survey.mode = "display";
// survey.questionsOnPageMode = "singlePage";
// survey.showNavigationButtons = "none";
// survey.showProgressBar = "off";
// survey.showTimerPanel = "none";
// survey.maxTimeToFinishPage = 0;
// survey.maxTimeToFinish = 0;
// survey
//     .onAfterRenderQuestion
//     .add(function (survey, options) {
//         var span = document.createElement("span");
//         var isCorrect = options
//             .question
//             .isAnswerCorrect();
//         span.innerHTML = isCorrect
//             ? "Correct"
//             : "Incorrect";
//         span.style.color = isCorrect
//             ? "green"
//             : "red";
//         var header = options
//             .htmlElement
//             .querySelector("h5");
//         if (!isCorrect) {
//             header.style.backgroundColor = "salmon";
//             var radio = options
//                 .htmlElement
//                 .querySelector('input[value="' + options.question.correctAnswer + '"]');
//             if (!!radio) {
//                 radio.parentElement.style.color = "green";
//             }
//         }
//         header.appendChild(span);
//     });

//     survey.render("surveyElement");