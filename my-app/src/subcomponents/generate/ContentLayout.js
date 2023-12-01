import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableSection from './DraggableSection'; // Adjust the import according to your file structure
import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import update from 'immutability-helper';
import RightControl from './RightControl';
import { useDispatch } from "react-redux";
import {
  setTopic,
  useData,
  useTopic,
  setNewsletter,
  setData,
  setBackgroundColor,
  useBackgroundColor,
  useGenPageTwo,
  setGenPageTwo,
  useGenPageThree,
  setGenPageThree,
  useGenPageFour,
  setGenPageFour
} from "../../redux/newsLetterSlice";
import { useDetailPageOne } from "../../redux/DetailSlice"
import { useDetailPageTwo } from "../../redux/DetailSlice"
import DraggableNewBlock from "./DroppableNewBlock"

const sectionArrangements = {
  'Freshly Brewed': [
    { id: 'logo', type: "logo", title: "", content: 'LOGO/MASTHEAD', css: 'flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'intro', type: "intro", title: "", content: 'Intro 2-liner sentence, relevant or culture-related', css: 'min-h-[10vh] text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article1', type: "article", title: "", content: 'Article #1 blurb & CTA to read full story on owned asset (ex. blog)', css: 'min-h-[25vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'sponsor1', type: "sponsor", title: "", content: 'Advertorial style sponsored content', css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article2', type: "article", title: "", content: 'Article #2 blurb + breakdown + takeaway', css: 'min-h-[15vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article3', type: "article", title: "", content: 'Article #3 blurb + breakdown + takeaway', css: 'min-h-[15vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'footer', type: "footer", title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
  ],
  'High Gloss': [
    { id: 'logo', type: "logo", title: "", content: 'LOGO/MASTHEAD', css: 'flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'image', type: "image", title: "", content: 'Image', css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article1', type: "article", title: "", content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'min-h-[25vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    {
      id: 'content', type: "content", title: "", content: [
        { id: 'content1', type: "contentInside", title: "", content: 'Recent piece of content #1, ~80 characters + CTA', css: 'min-h-[30vh] h-max m-2', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
        { id: 'content2', type: "contentInside", title: "", content: 'Recent piece of content #2, ~80 characters + CTA', css: 'min-h-[30vh] h-max m-2', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
        { id: 'content3', type: "contentInside", title: "", content: 'Recent piece of content #3, ~80 characters + CTA', css: 'min-h-[30vh] h-max m-2', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
      ], css: "flex items-start justify-around w-full", backgroundColor: "", fontColor: "", fontStyle: "", fontSize: ""
    },
    { id: 'story1', type: "story", title: "", content: 'Few stories of interest', css: "min-h-[15vh] h-max text-center flex items-center justify-center", backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'footer', type: "footer", title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
  ],
  'The NewPort': [
    { id: 'logo', type: "logo", title: "", content: 'LOGO/MASTHEAD', css: 'flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'intro', type: "intro", title: "", content: 'Intro 2-liner sentence, relevant or culture-related', css: 'min-h-[10vh] text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'story1', type: "story", title: "", content: 'Few stories of interest', css: 'min-h-[15vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    {
      id: 'article1', type: "article", title: "", content: ' \
    #1 link of the day/related story of interest \
    #2 link of the day/related story of interest \
    #3 link of the day/related story of interest \
    ', css: 'min-h-[25vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: ""
    },
    { id: 'article2', type: "article", title: "", content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'min-h-[15vh] h-max text-center flex items-center justify-center', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'footer', type: "footer", title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
  ],
};

const ContentLayout = ({
  // sections,
  // setSections,
  previousPage,
  nextPage }) => {
  let dispatch = useDispatch();
  let firstPageDataFRedux = useTopic();
  let secondPageDataFRedux = useGenPageTwo();
  let thirdPageDataFRedux = useGenPageThree();
  let fourthPageDataFRedux = useGenPageFour();
  let firstPageDetailDataFRedux = useDetailPageOne();
  let secondPageDetailDataFRedux = useDetailPageTwo();
  let getBackgroundColorFromRedux = useBackgroundColor();
  let getDataFromRedux = useData();
  const [majorityColor, setMajorityColor] = useState(firstPageDetailDataFRedux[6].data);
  const [firstPageData, setFirstPageData] = useState(firstPageDataFRedux);
  const [secondPageData, setSecondPageData] = useState(secondPageDataFRedux);
  const [select, setSelect] = useState("layOut");
  const [selectType, setSelectType] = useState("")
  const [sections, setSections] = useState([]);


  function newObj(type) {
    return {
      id: '' + Math.random().toString(36).substring(7),
      type: type,
      title: '',
      content: type,
      css: 'h-max',
      backgroundColor: '',
      fontColor: '',
      fontStyle: '',
      fontSize: '',
    }
  }
  const handleAddObjectAbove = (id, type) => {
    console.log(id, type)
    const newEle = newObj(type)
    console.log(newEle)

    const updatedLayout = sections.slice(); // Create a copy of the layout array
    const index = sections.findIndex((item) => item.id === id);
    updatedLayout.splice(index, 0, newEle); // Insert the new object above the clicked object

    setSections(updatedLayout);
  };

  const handleAddObjectBelow = (id) => {
    const newEle = newObj()

    const updatedLayout = sections.slice(); // Create a copy of the layout array
    const index = sections.findIndex((item) => item.id === id);
    updatedLayout.splice(index + 1, 0, newEle); // Insert the new object below the clicked object

    setSections(updatedLayout);
  };
  // console.log("sections", sections)
  useEffect(() => {
    // console.log("useEffect")
    if (getDataFromRedux && getDataFromRedux.length !== 0) {
      // let newSections = JSON.parse(JSON.stringify(sectionArrangements[secondPageData[0].data]));
      // let temGetDataFromRedux = JSON.parse(JSON.stringify(getDataFromRedux));
      // newSections.forEach((item) =>{
      //   if (item.id == "logo") {
      //     item.title = firstPageDetailDataFRedux[2].data
      //     item.content = firstPageDetailDataFRedux[3].data
      //   }
      //   if (item.id == "footer") {
      //     item.content = [];
      //     for (let i = 9; i < secondPageDetailDataFRedux.length; i++) {
      //       // console.log("footerqweqweqwe", secondPageDetailDataFRedux[i].data)
      //       if(secondPageDetailDataFRedux[i].data !== ''){
      //         item.content.push(secondPageDetailDataFRedux[i].data)
      //       }
      //     }
      //   }
      // })
      // console.log("get in to the if first", getBackgroundColorFromRedux)
      // console.log("get in to the if first", majorityColor)
      setSections(getDataFromRedux);
      if (getBackgroundColorFromRedux !== "") {
        setMajorityColor(getBackgroundColorFromRedux)
      }
      // console.log("get in to the if first")
    }
    else {
      if (secondPageData[0].data === "") {
        setSections([])
        // console.log("get in to the if then else")
      }
      else {
        // console.log("get in to the else")
        let selectedSection = JSON.parse(JSON.stringify(sectionArrangements[secondPageData[0].data]));
        selectedSection.forEach((item) => {
          item.fontColor = firstPageDetailDataFRedux[7].data
          item.fontStyle = firstPageDetailDataFRedux[8].data
          item.fontSize = secondPageDetailDataFRedux[3].data
          if (item.id == "content") {
            item.content.forEach((each) => {
              each.fontColor = firstPageDetailDataFRedux[7].data
              each.fontStyle = firstPageDetailDataFRedux[8].data
              each.fontSize = secondPageDetailDataFRedux[3].data
            })
          }
          if (item.id === "logo") {
            item.title = firstPageDetailDataFRedux[2].data
            item.content = firstPageDetailDataFRedux[3].data
          }
          else if (item.id == "sponsor1") {
            item.content = "None ";
          }
          else if (item.id == "footer") {
            item.content = [];
            for (let i = 9; i < secondPageDetailDataFRedux.length; i++) {
              // console.log("footerqweqweqwe", secondPageDetailDataFRedux[i].data)
              if (secondPageDetailDataFRedux[i].data !== '') {
                item.content.push(secondPageDetailDataFRedux[i].data)
              }
            }
          }
        })
        console.log(selectedSection)
        setSections(selectedSection || []);
      }
    }
  }, [secondPageDataFRedux[0].data]);

  const findSection = useCallback((id) => {
    // console.log("callback")
    const section = sections.find((s) => `${s.id}` === id);
    return {
      section,
      index: sections.indexOf(section),
    };
  }, [sections]);

  const moveSection = useCallback((dragId, hoverId) => {
    const dragIndex = findSection(dragId).index;
    const hoverIndex = findSection(hoverId).index;

    if (dragIndex === hoverIndex) return;

    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      const [removed] = updatedSections.splice(dragIndex, 1);
      updatedSections.splice(hoverIndex, 0, removed);
      return updatedSections;
    });
  }, [findSection]);

  const handleOnPersonaChange = (data) => {
    console.log(data)
    dispatch(setGenPageFour(data));
  }

  const handleOnpageOneDataChange = (data) => {
    if (select === "layOut") {
      console.log(firstPageDetailDataFRedux[6].data)
      setMajorityColor(firstPageDetailDataFRedux[6].data)
      dispatch(setGenPageTwo(data));
      let selectedSection = JSON.parse(JSON.stringify(sectionArrangements[data[0].data]));
      selectedSection.forEach((item) => {
        item.fontColor = firstPageDetailDataFRedux[7].data
        item.fontStyle = firstPageDetailDataFRedux[8].data
        item.fontSize = secondPageDetailDataFRedux[3].data
        if (item.id == "content") {
          item.content.forEach((each) => {
            each.fontColor = firstPageDetailDataFRedux[7].data
            each.fontStyle = firstPageDetailDataFRedux[8].data
            each.fontSize = secondPageDetailDataFRedux[3].data
          })
        }
        if (item.id === "logo") {
          item.title = firstPageDetailDataFRedux[2].data
          item.content = firstPageDetailDataFRedux[3].data
        }
        else if (item.id == "sponsor1") {
          item.content = "Sponsor By ";
        }
        else if (item.id == "footer") {
          item.content = [];
          for (let i = 9; i < secondPageDetailDataFRedux.length; i++) {
            // console.log("footerqweqweqwe", secondPageDetailDataFRedux[i].data)
            if (secondPageDetailDataFRedux[i].data !== '') {
              item.content.push(secondPageDetailDataFRedux[i].data)
            }
          }
        }
      })
      dispatch(setData(selectedSection))
      console.log("change layOut", data)
      setSecondPageData(data);
    }
  }

  const handleOnSelect = (data, type) => {
    console.log("select", data)
    if (data !== select) {
      setSelect(data);
      setSelectType(type);
    }
    else {
      setSelect("layOut");
      setSelectType('');
    }
  }

  // console.log(`h-[70vh] max-h-[70vh] overflow-y-scroll bg-${majorityColor}`)

  return (
    <div>
      <div className={`h-[65vh] max-h-[65vh] overflow-y-scroll`}>
        <DndProvider backend={HTML5Backend}>
          <div className='flex'>
          <div className="px-10 w-3/4" style={{ backgroundColor: majorityColor }}>
            {sections.map(({ id, type, content, title, css, backgroundColor, fontColor, fontStyle, fontSize }, index, array) => {
              const arrangement = sectionArrangements[secondPageData[0].data];

              if (arrangement && id == "content" && Array.isArray(content)) {
                return (
                  <div key={id} className={css}>
                    {content.map(({ id, type, content, title, css, backgroundColor, fontColor, fontStyle, fontSize }) => (
                      <div key={id} className={`${select === id ? ' border-4 border-gray-500' : ''} mb-1 w-2/5`} onClick={() => { handleOnSelect(id, type) }}>
                        <DraggableSection
                          css={css}
                          key={id}
                          backgroundColor={backgroundColor}
                          fontColor={fontColor}
                          fontStyle={fontStyle}
                          fontSize={fontSize}
                          id={id}
                          type={type}
                          content={content}
                          title={title}
                          moveSection={moveSection}
                          findSection={findSection}
                        />
                      </div>
                    ))}
                  </div>
                );
              } else {
                return (
                  <div>
                    <DraggableNewBlock index={id} handleAddObjectAbove = {(index, type)=>{handleAddObjectAbove(index, type)}} className="w-full h-1 border-1 border-transparent group mb-4">
                    </DraggableNewBlock>
                    <div key={id} className={`${select === id ? 'border-4 border-gray-500' : ''} mb-1`} onClick={() => { handleOnSelect(id, type) }}>
                      <DraggableSection
                        css={css}
                        key={id}
                        backgroundColor={backgroundColor}
                        fontColor={fontColor}
                        fontStyle={fontStyle}
                        fontSize={fontSize}
                        id={id}
                        type={type}
                        content={content}
                        title={title}
                        moveSection={moveSection}
                        findSection={findSection}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
          

          <div className="fixed right-20 top-44 bottom-10 w-[20%] bg-white " aria-label="Sidebar with logo branding example">
            <RightControl
              updateData={(data) => { handleOnpageOneDataChange(data) }}
              updatePersona={(data) => { handleOnPersonaChange(data) }}
              firstPageData={firstPageData}
              secondPageData={secondPageData}
              thirdPageData={thirdPageDataFRedux}
              fourthPageData={fourthPageDataFRedux}
              select={select}
              selectType={selectType}
              sections={sections}
              handleOnSelect={handleOnSelect}
              setSections={setSections}
              majorityColor={majorityColor}
              setMajorityColor={setMajorityColor}
            />
          </div>
          </div>
        </DndProvider>
      </div>
      <div className="absolute bottom-5 left-10">
        <button
          outline
          onClick={() => {
            previousPage();
          }}
          className=" h-10 w-40 cursor-pointer flex justify-around font-bold text-sm items-center text-white mr-5 bg-orange-500 rounded-lg hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-0.5" />
          Previous
        </button>
      </div>
      <div className="absolute bottom-5 right-96">
        <button
          outline
          onClick={() => {
            dispatch(setBackgroundColor(majorityColor))
            dispatch(setData(sections));
            nextPage();
          }}
          className=" h-10 w-40 cursor-pointer flex justify-around font-bold text-sm items-center text-white mr-5 bg-orange-500 rounded-lg hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500"
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
        </button>
      </div>
    </div>
  );
};

export default ContentLayout;