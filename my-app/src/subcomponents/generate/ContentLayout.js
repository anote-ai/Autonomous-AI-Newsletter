import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableSection from './DraggableSection'; // Adjust the import according to your file structure
import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  useGenPageTwo
} from "../../redux/newsLetterSlice";
import { useDetailPageOne } from "../../redux/DetailSlice"
import { useDetailPageTwo } from "../../redux/DetailSlice"

const sectionArrangements = {
  'Freshly Brewed': [
    { id: 'logo', title: "", content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'intro', title: "", content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article1', title: "", content: 'Article #1 blurb & CTA to read full story on owned asset (ex. blog)', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'sponsor1', title: "", content: 'Advertorial style sponsored content', css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article2', title: "", content: 'Article #2 blurb + breakdown + takeaway', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article3', title: "", content: 'Article #3 blurb + breakdown + takeaway', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'footer', title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
  ],
  'High Gloss': [
    { id: 'logo', title: "", content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'image', title: "", content: 'Image', css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'article1', title: "", content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'content1', title: "", content: 'Recent piece of content #1, ~80 characters + CTA', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'content2', title: "", content: 'Recent piece of content #2, ~80 characters + CTA', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'content3', title: "", content: 'Recent piece of content #3, ~80 characters + CTA', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'story1', title: "", content: 'Few stories of interest', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'footer', title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
  ],
  'The NewPort': [
    { id: 'logo', title: "", content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'intro', title: "", content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'story1', title: "", content: 'Few stories of interest', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    {
      id: 'article1', title: "", content: ' \
    #1 link of the day/related story of interest \
    #2 link of the day/related story of interest \
    #3 link of the day/related story of interest \
    ', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: ""
    },
    { id: 'article2', title: "", content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
    { id: 'footer', title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
  ],
};

const ContentLayout = ({ layoutType,
  // sections,
  // setSections,
  previousPage,
  nextPage }) => {
  let dispatch = useDispatch();
  let firstPageDataFRedux = useTopic();
  let secondPageDataFRedux = useGenPageTwo();
  let firstPageDetailDataFRedux = useDetailPageOne();
  let secondPageDetailDataFRedux = useDetailPageTwo();
  let getBackgroundColorFromRedux = useBackgroundColor();
  let getDataFromRedux = useData();
  const [majorityColor, setMajorityColor] = useState(firstPageDetailDataFRedux[6].data);
  const [firstPageData, setFirstPageData] = useState(firstPageDataFRedux);
  const [secondPageData, setSecondPageData] = useState(secondPageDataFRedux);
  const [select, setSelect] = useState("layOut");
  const [sections, setSections] = useState([]);


  // console.log("sections", sections)
  useEffect(() => {
    // console.log("useEffect")
    if (getDataFromRedux && getDataFromRedux.length !== 0) {
      // console.log(getDataFromRedux);
      setSections(getDataFromRedux);
      setMajorityColor(getBackgroundColorFromRedux)
    }
    else {
      if (secondPageData[0].data === "") {
        setSections([])
      }
      else {
        // console.log("get in to the else")
        let selectedSection = sectionArrangements[secondPageData[0].data]
        selectedSection.forEach((item) => {
          item.fontColor = firstPageDetailDataFRedux[7].data
          item.fontStyle = firstPageDetailDataFRedux[8].data
          item.fontSize = secondPageDetailDataFRedux[3].data
          if (item.id === "logo") {
            item.title = firstPageDetailDataFRedux[2].data
            item.content = firstPageDetailDataFRedux[3].data
          }
          else if (item.id == "sponsor1") {
            item.content = "Sponsor By " + firstPageData[2].data;
          }
          else if (item.id == "footer") {
            item.content = [];
            for (let i = 9; i < secondPageDetailDataFRedux.length; i++) {
              // console.log("footerqweqweqwe", secondPageDetailDataFRedux[i].data)
              item.content.push(secondPageDetailDataFRedux[i].data)
            }
          }
        })
        setSections(selectedSection || []);
      }
    }
  }, [secondPageData]);

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

  const handleOnpageOneDataChange = (data) => {
    if (select === "layOut") {
      setSecondPageData(data);
      dispatch(setTopic(data));
    }
  }

  const handleOnSelect = (data) => {
    console.log("select")
    if (data !== select) {
      setSelect(data);
    }
    else {
      setSelect("layOut");
    }
  }

  // console.log(`h-[70vh] max-h-[70vh] overflow-y-scroll bg-${majorityColor}`)

  return (
    <div>

      <div className={`h-[70vh] max-h-[70vh] overflow-y-scroll`} style={{ backgroundColor: majorityColor }}>
        <DndProvider backend={HTML5Backend}>
          <div className="p-4">
            {sections.map(({ id, content, title, css, backgroundColor, fontColor, fontStyle, fontSize }, index, array) => (
              <div className={
                `${secondPageData[0].data === 'High Gloss' && (id === 'content1' || id === 'content2' || id === 'content3')
                  ? `inline-block w-1/4 ${index !== array.length - 1 ? 'mx-5' : ''}`
                  : ''} ${''} ${select === id ? `border-2 border-white` : ``} mb-5`
              }
                onClick={() => { handleOnSelect(id) }}>
                <DraggableSection
                  css={css}
                  key={id}
                  backgroundColor={backgroundColor}
                  fontColor={fontColor}
                  fontStyle={fontStyle}
                  fontSize={fontSize}
                  id={`${id}`}
                  content={content}
                  title={title}
                  moveSection={moveSection}
                  findSection={findSection}
                />
              </div>
            ))}
          </div>
        </DndProvider>
      </div>
      <div className="absolute bottom-5 left-10">
        <Button
          outline
          onClick={() => {
            previousPage();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-0.5" />
          Previous
        </Button>
      </div>
      <div className="absolute bottom-5 right-10">
        <Button
          outline
          onClick={() => {
            dispatch(setBackgroundColor(majorityColor))
            dispatch(setData(sections));
            nextPage();
          }}

        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
        </Button>
      </div>
      <div className="fixed px-5 rounded-xl right-10 top-24 w-1/6 bottom-24 bg-gray-900 " aria-label="Sidebar with logo branding example">
        <RightControl
          updateData={(data) => { handleOnpageOneDataChange(data) }}
          firstPageData={firstPageData}
          secondPageData={secondPageData}
          select={select}
          sections={sections}
          handleOnSelect={handleOnSelect}
          setSections={setSections}
          majorityColor={majorityColor}
          setMajorityColor={setMajorityColor}
        />
      </div>
    </div>
  );
};

export default ContentLayout;