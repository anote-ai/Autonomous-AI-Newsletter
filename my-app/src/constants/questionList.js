export const questionList = {
    pageOne: [
        {
            title: 'Brand or Company Name',
            require: true,
            type: 'input',
            data: '',
            id: 1
        },
        { title: 'URL', require: true, type: 'url', data: '', id: 2 },
        {
            title: 'Name of Publication or Newsletter',
            require: true,
            type: 'input',
            data: '',
            id: 3
        },
        {
            title: 'Newsletter Header Image or Company Logo',
            require: false,
            type: 'url',
            data: '',
            id: 4
        },
        {
            title: 'Description of Newsletter',
            require: true,
            type: 'text',
            data: '',
            id: 5
        },
        {
            title: 'Business Category',
            require: true,
            type: 'bubbleSelect',
            data: [],
            id: 6
        },
        {
            title: 'What color you want for the background',
            require: true,
            type: 'colorSelect',
            data: '',
            id: 7
        },
        {
            title: 'What color you want for the Text',
            require: true,
            type: 'colorSelect',
            data: '',
            id: 8
        },
        {
            title: 'Select your font styles',
            require: true,
            type: 'fontSelect',
            data: '',
            id: 9
        }
    ],
    pageTwo: [
        {
            title: 'Which email platform do you use?',
            require: false,
            type: 'input',
            data: '',
            id: 1
        },
        {
            title: 'How often do you send your newsletter?',
            require: false,
            type: 'timeSelect',
            data: '',
            id: 2
        },
        {
            title: 'Publication Language',
            require: false,
            type: 'languageSelect',
            data: '',
            id: 3
        },
        {
            title: 'Newsletter Size',
            require: false,
            type: 'fontSizeSelect',
            data: '',
            id: 4
        },
        {
            title: 'Audience Demographics',
            require: false,
            type: 'peopleDemographics',
            data: [],
            id: 5
        },
        {
            title: 'Audience Age Range',
            require: false,
            type: 'numberRange',
            data: [],
            id: 6
        },
        {
            title: 'Audience Income Level',
            require: false,
            type: 'incomeRange',
            data: [],
            id: 7
        },
        {
            title: 'Do you adhere to a stylistic choice?',
            require: false,
            type: 'styleSelect',
            data: [],
            id: 8
        },
        {
            title: 'Does your brand writing style use emojis?',
            require: false,
            type: 'toggleSwitch',
            data: false,
            id: 9
        },
        {
            title: 'YouTube Channel URL',
            require: false,
            type: 'url',
            data: '',
            id: 10
        },
        {
            title: 'Facebook URL',
            require: false,
            type: 'url',
            data: '',
            id: 11
        },
        {
            title: 'Instagram URL',
            require: false,
            type: 'url',
            data: '',
            id: 12
        },
        {
            title: 'Twitter URL',
            require: false,
            type: 'url',
            data: '',
            id: 13
        },
        {
            title: 'Linkedin URL',
            require: false,
            type: 'url',
            data: '',
            id: 14
        },
        {
            title: 'Pinterest URL',
            require: false,
            type: 'url',
            data: '',
            id: 15
        },
        {
            title: 'Shop URL',
            require: false,
            type: 'url',
            data: '',
            id: 16
        },
        {
            title: 'Portfolio URL',
            require: false,
            type: 'url',
            data: '',
            id: 17
        },
        {
            title: 'Threads URL',
            require: false,
            type: 'url',
            data: '',
            id: 18
        }
    ],
    pageThree: [
        {
            title: 'Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice',
            require: true,
            type: 'text',
            data: '',
            id: 1
        },
        {
            title: "Do you have a brand mission statement? It can be absolutely informal and messy—don't worry if it's not polished.",
            require: false,
            type: 'text',
            data: '',
            id: 2
        },
        {
            title: 'In a nutshell, what do you set out to do every day on the job? What do you do for your current clients, customers, students, or followers?',
            require: false,
            type: 'text',
            data: '',
            id: 3
        },
        {
            title: 'When people come to you for help, what do they usually want help with?',
            require: false,
            type: 'text',
            data: '',
            id: 4
        },
        {
            title: "Bragadocious time—give it to me: what is something that you can claim that your competitors can't?",
            require: false,
            type: 'text',
            data: '',
            id: 5
        },
        {
            title: 'Trusted News Sources',
            require: false,
            type: 'text',
            data: '',
            id: 6
        }
    ],
    pageFour: [
        {
            title: 'What are some phrases that sound just like you or your brand?',
            require: false,
            type: 'text',
            data: '',
            id: 1
        },
        {
            title: "Optional—drop in a writing sample of some of your work.  We'll snag some of your common phrases, basic syntax, & average reading level you prefer to stick to.",
            require: false,
            type: 'text',
            data: '',
            id: 2
        },
        {
            title: 'Opposites day—now give me the words you never use in your branding ... or just hate.',
            require: false,
            type: 'text',
            data: '',
            id: 3
        },
        {
            title: 'What are some other brands with aesthetics and/or voices you enjoy?',
            require: false,
            type: 'text',
            data: '',
            id: 4
        },
        {
            title: "If your brand could go shopping, where would it go? (Clothing, home stuff, doesn't matter.)",
            require: false,
            type: 'text',
            data: '',
            id: 5
        },
        {
            title: 'How do YOU want to be viewed by your audience?',
            require: false,
            type: 'text',
            data: '',
            id: 6
        },
        {
            title: "This section is optional, but better inputs = better copy. If you'd like the copy to sound like your brand & reflect your brand's opinions, select your 5 favorite questions below and spitball some answers.",
            require: false,
            type: 'text',
            data: '',
            id: 7
        },
        {
            title: "What are your brand's core values?",
            require: false,
            type: 'text',
            data: '',
            id: 8
        },
        {
            title: 'What is something you think everyone should do at least once in their lives?',
            require: false,
            type: 'text',
            data: '',
            id: 9
        },
        {
            title: 'What`s worth spending more on to get the best?',
            require: false,
            type: 'text',
            data: '',
            id: 10
        },
        {
            title: 'What gets you fired up in your industry?',
            require: false,
            type: 'text',
            data: '',
            id: 11
        },
        {
            title: 'What is something a ton of people are obsessed with but you just don`t get the point of?',
            require: false,
            type: 'text',
            data: '',
            id: 12
        },
        {
            title: 'What risks are worth taking?',
            require: false,
            type: 'text',
            data: '',
            id: 13
        },
        {
            title: 'What is one personal “rule” you never break?',
            require: false,
            type: 'text',
            data: '',
            id: 14
        },
        {
            title: 'What could you do with two million dollars to impact the most people?',
            require: false,
            type: 'text',
            data: '',
            id: 15
        },
        {
            title: 'Imagination time: You get to pick any character or famous person to embody your brand voice. Who do you pick?',
            require: false,
            type: 'text',
            data: '',
            id: 16
        },
        {
            title: 'If you could have a never-ending candle that smelled like anything you wanted, what fragrance would you want it to be? ',
            require: false,
            type: 'text',
            data: '',
            id: 17
        },
        {
            title: 'What`s your favorite piece of clothing you own?',
            require: false,
            type: 'text',
            data: '',
            id: 18
        },
        {
            title: 'What songs have you completely memorized?',
            require: false,
            type: 'text',
            data: '',
            id: 19
        },
        {
            title: 'What would your perfect room look like?',
            require: false,
            type: 'text',
            data: '',
            id: 20
        },
        {
            title: "If I spied on you for a week, what are 3-4 types of beverages you'd be sipping on?",
            require: false,
            type: 'text',
            data: '',
            id: 21
        },
        {
            title: "What shows, books, or movies are you into—some shows you've binged lately, or just favorite shows of all time?",
            require: false,
            type: 'text',
            data: '',
            id: 22
        },
        {
            title: 'What did you think you would grow out of but haven`t? ',
            require: false,
            type: 'text',
            data: '',
            id: 23
        },
        {
            title: 'What would be some of the most annoying things about having yourself as a roommate?',
            require: false,
            type: 'text',
            data: '',
            id: 24
        },
        {
            title: 'If your brand could identify with an object and/or a color, what would it identify with?',
            require: false,
            type: 'text',
            data: '',
            id: 25
        },
        {
            title: 'If you had your own magazine or TV network, what would it be about?',
            require: false,
            type: 'text',
            data: '',
            id: 26
        },
        {
            title: 'What was the best compliment you or your brand ever received?',
            require: false,
            type: 'text',
            data: '',
            id: 27
        },
        {
            title: 'When do you feel truly “alive”?',
            require: false,
            type: 'text',
            data: '',
            id: 28
        },
        {
            title: 'What dumb accomplishment are you most proud of?',
            require: false,
            type: 'text',
            data: '',
            id: 29
        },
        {
            title: "You're throwing a brand party—where's the location? ",
            require: false,
            type: 'text',
            data: '',
            id: 30
        },
        {
            title: 'If your brand were a season, which would it be?',
            require: false,
            type: 'text',
            data: '',
            id: 31
        },
        {
            title: "Any chacters, memes, or social references you don't want to be referred to in your copy or GIFs?",
            require: false,
            type: 'text',
            data: '',
            id: 32
        },
        {
            title: 'Oh, you want me to show up? Just tell me there will be ...',
            require: false,
            type: 'text',
            data: '',
            id: 33
        },
        {
            title: 'Here are some of my go-to snacks',
            require: false,
            type: 'text',
            data: '',
            id: 34
        }
    ]
}