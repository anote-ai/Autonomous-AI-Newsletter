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
  clearData,
} from "../../redux/newsLetterSlice";

const sectionArrangements = {
  'Freshly Brewed': [
    { id: 'logo', title: '', content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto' },
    { id: 'intro', title: '', content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto' },
    { id: 'content1', title: '', content: 'Article #1 blurb & CTA to read full story on owned asset (ex. blog)', css: 'h-20' },
    { id: 'sponsor1', title: '', content: 'Advertorial style sponsored content', css: '' },
    { id: 'content2', title: '', content: 'Article #2 blurb + breakdown + takeaway', css: 'h-20' },
    { id: 'content3', title: '', content: 'Article #3 blurb + breakdown + takeaway', css: 'h-20' },
    { id: 'footer', title: '', content: 'Footer', css: '' },
  ],
  'High Gloss': [
    { id: 'logo', title: '', content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto' },
    { id: 'image', title: '', content: 'Image + CTA to head to shop, 1-2 lines', css: '' },
    { id: 'longArticle1', title: '', content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-20' },
    { id: 'content1', title: '', content: 'Recent piece of content #1, ~80 characters + CTA', css: 'h-20' },
    { id: 'content2', title: '', content: 'Recent piece of content #2, ~80 characters + CTA', css: 'h-20' },
    { id: 'content3', title: '', content: 'Recent piece of content #3, ~80 characters + CTA', css: 'h-20' },
    { id: 'story1', title: '', content: 'Few stories of interest', css: 'h-20' },
    { id: 'footer', title: '', content: 'Footer', css: '' },
  ],
  'The NewPort': [
    { id: 'logo', title: '', content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto' },
    { id: 'intro', title: '', content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto' },
    { id: 'story1', title: '', content: 'Few stories of interest', css: 'h-20' },
    {
      id: 'content1', title: '', content: ' \
    #1 link of the day/related story of interest \
    #2 link of the day/related story of interest \
    #3 link of the day/related story of interest \
    ', css: 'h-20'
    },
    { id: 'content2', title: '', content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-32' },
    { id: 'footer', title: '', content: 'Footer', css: '' },
  ],
};

const ContentLayout = ({
  majorityColor,
  setMajorityColor,
  colorPalette,
  setColorPalette,
  // sections,
  // setSections,
  previousPage,
  nextPage }) => {
  let dispatch = useDispatch();
  let nData = useData();
  let firstPageDataFRedux = useTopic();
  const [firstPageData, setFirstPageData] = useState(firstPageDataFRedux);
  const [select, setSelect] = useState("layOut");
  const [sections, setSections] = useState([]);


  // console.log("sections", sections)
  useEffect(() => {
    setSections(sectionArrangements[firstPageData[2].data] || []);
  }, [firstPageData]);

  const findSection = useCallback((id) => {
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
      setFirstPageData(data);
      setTopic(data);
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
  async function clearRData() {
    dispatch(clearData());
  }


  return (
    <div>
      <div className='h-[70vh] max-h-[70vh] overflow-y-scroll' style={{backgroundColor: majorityColor}}>
        <DndProvider backend={HTML5Backend}>
          <div className="p-4">
            {sections.map(({ id, content, css }, index, array) => {
              if (id !== "content1" && id !== "content2" && id !== "content3" && id !== "article1" && id !== "article2" && id !== "article3") {
                // console.log("in if id",id, "id === content1", id ==="content1")
                // console.log("in if")
                return (
                  <div
                    className={
                      `${firstPageData[2].data === 'High Gloss' && (id === 'content1' || id === 'content2' || id === 'content3')
                        ? `inline-block w-1/4 ${index !== array.length - 1 ? 'mx-5' : ''}`
                        : ''} ${''} ${select === id ? `border-2 border-white` : ``} mb-5`
                    }
                    onClick={() => { handleOnSelect(id) }}
                  >
                    <DraggableSection
                      css={css}
                      colorPalette = {colorPalette}
                      key={id}
                      id={`${id}`}
                      content={content}
                      moveSection={moveSection}
                      findSection={findSection}
                    />
                  </div>
                );
              } else {
                // console.log("id",id)
                console.log('ndata', nData)
                const matchingData = nData.filter((data) => {
                  console.log("each",data)
                  return data.id === id
                });
                console.log("matchingData", matchingData)
                return (
                  <div
                    className={
                      `${firstPageData[2].data === 'High Gloss' && (id === 'content1' || id === 'content2' || id === 'content3')
                        ? `inline-block w-1/4 ${index !== array.length - 1 ? 'mx-5' : ''}`
                        : ''} ${''} ${select === id ? `border-2 border-white` : ``} mb-5`
                    }
                    onClick={() => { handleOnSelect(id) }}
                  >
                    {matchingData && matchingData.length !== 0 ? (
                      <DraggableSection
                        css={css}
                        colorPalette = {colorPalette}
                        key={id}
                        id={`${id}`}
                        title={matchingData[0].title}
                        content={matchingData[0].summary}
                        moveSection={moveSection}
                        findSection={findSection}
                      />
                    ) : (
                      <DraggableSection
                        css={css}
                        colorPalette = {colorPalette}
                        key={id}
                        id={`${id}`}
                        title=""
                        content={content}
                        moveSection={moveSection}
                        findSection={findSection}
                      />
                    )}
                  </div>
                );
              }
            })}
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
      <div className="absolute bottom-5 left-1/2">
        <Button
          outline
          onClick={() => {
            clearRData();
          }}
        >
          Clear Data
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
        </Button>
      </div>
      <div className="absolute bottom-5 right-10">
        <Button
          outline
          onClick={() => {
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
          majorityColor = {majorityColor}
          setMajorityColor = {setMajorityColor}
          colorPalette = {colorPalette}
          setColorPalette = {setColorPalette}
          select={select}
          sections={sections}
          setSections={setSections}
        />
      </div>
    </div>
  );
  
};

export default ContentLayout;