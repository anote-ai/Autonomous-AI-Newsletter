export const GenerateQestion = {
    pageOne: [
        {
            title: 'NewsLetter Name',
            require: true,
            type: 'input',
            data: '',
            id: 1
        },
        {
            title: 'Which idea you want for this NewsLetter',
            require: true,
            type: 'ideaSelect',
            ideaId: 0,
            data: '',
            subIdea: [],
            id: 2
        },
        {
            title: 'Type in your Sponsor company',
            require: false,
            type: 'input',
            data: '',
            id: 3
        },
        {
            title: "Recent Content description? (Use for generate the story)",
            require: false,
            type: 'text',
            data: '',
            id: 4
        }
    ],
    pageTwo: [
        {
            title: 'Which Theme you want for this NewsLetter',
            require: true,
            type: 'themeSelect',
            data: '',
            id: 1
        },
        {
            title: 'Choose Your Character-Style Writer Personas',
            require: true,
            type: 'characterSelect',
            data: '',
            id: 2
        },
    ],
    backgroundColor: "",
    ideas: [],
    data:[],
    urlArr: [],
    allData: []
}
export const GenerateQestionDemoData = {
    pageOne: [
        {
            title: 'Which Theme you want for this NewsLetter',
            require: true,
            type: 'themeSelect',
            data: '',
            id: 1
        },
        {
            title: 'Which Theme you want for this NewsLetter',
            require: true,
            type: 'themeSelect',
            data: '',
            id: 2
        },
        {
            title: "Recent Content description?",
            require: false,
            type: 'text',
            data: '',
            id: 3
        }
    ],
    data:[
        {
            "date": "09/11/2023",
            "id": 1,
            "summary": "Georgia Bulldogs are trending to secure a commitment from 2024 defensive lineman Michai Boireau after his decommitment from Florida. Georgia now holds a 68.0 percent chance of landing him according to the On3 Recruiting Prediction Machine. Boireau, standing at 6-foot-5 and weighing 350 pounds, is ranked as the No. 717 player nationally and the No. 67 defensive lineman. Georgia is also looking to add to its nation's No. 1 recruiting class, with already 21 blue-chip commitments, including top-ranked players at various positions.",
            "title": "Georgia Bulldogs Strengthen Nations No. 1 Recruiting",
            "url": "https://www.on3.com/college/georgia-bulldogs/news/michai-boireau-georgia-bulldogs-trending-to-land-2024-defensive-lineman-recent-florida-decommit/"
        },
        {
            "date": "09/16/2023",
            "id": 2,
            "summary": "Two key pass catchers, Chase Lane from Georgia Tech and Tre Harris from Ole Miss, are trending towards not playing in their upcoming game against each other. Lane, who is the second leading receiver for Georgia Tech, has been ruled out due to injury but is not expected to have a season-ending injury. Harris, the go-to receiver for Ole Miss, suffered a knee injury in their last game and his status for the game against Georgia Tech is in doubt. This could be a significant blow to both teams' offenses.",
            "title": "Two Key Pass Catchers Out: Georgia Tech and Ole Miss Face",
            "url": "https://247sports.com/college/ole-miss/article/two-key-pass-catchers-trending-towards-not-playing-in-georgia-tech-at-ole-miss--216051504/"
        },
        {
            "date": "09/12/2023",
            "id": 3,
            "summary": "At the 2023 Dreamforce Conference, Salesforce announces updates to its AI systems, including Einstein, and a partnership with Google. UPS shares details of its union contract with Teamsters workers. Enphase Energy stock gets downgraded by Truist analysts.",
            "title": "Explore the Impact of Salesforce AI UPS Union Contract",
            "url": "https://finance.yahoo.com/video/salesforce-ai-ups-union-contract-142546554.html"
        },
        {
            "date": "09/12/2023",
            "id": 4,
            "summary": "Supermodel Gisele Bündchen was spotted wearing a pair of black leather stiletto clogs with a back strap, adorned with studs along the base and a dark-stained wooden sole. This puts clogs at the forefront of fall fashion trends, showing that they can be both sexy and sensible. Celebrities like Reese Witherspoon and Sarah Jessica Parker have also embraced the clog trend. The updated versions of clogs for 2023 offer a modern twist on a classic shoe style.",
            "title": "Gisele Bündchen Rocks the Trendiest Take on",
            "url": "https://www.instyle.com/gisele-bundchen-clog-fall-trend-7968643"
        },
        {
            "date": "10/27/2021",
            "id": 5,
            "summary": "Summary: The recent news regarding the SI.com website is that users are advised to enable JavaScript and disable any ad blockers in order to access the site.",
            "title": "Enable JavaScript for Seamless Browsing: How to",
            "url": "https://www.si.com/college/miami/football/miami-hurricanes-trending-up"
        }
    ],
    allData: []
}