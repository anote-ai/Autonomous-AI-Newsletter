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
} from "../../redux/newsLetterSlice";

const sectionArrangements = {
  'Freshly Brewed': [
    { id: 'logo', content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto' },
    { id: 'intro', content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto' },
    { id: 'article1', content: 'Article #1 blurb & CTA to read full story on owned asset (ex. blog)', css: 'h-20' },
    { id: 'sponsor1', content: 'Advertorial style sponsored content', css: '' },
    { id: 'article2', content: 'Article #2 blurb + breakdown + takeaway', css: 'h-20' },
    { id: 'article3', content: 'Article #3 blurb + breakdown + takeaway', css: 'h-20' },
    { id: 'footer', content: 'Footer', css: '' },
  ],
  'High Gloss': [
    { id: 'logo', content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto' },
    { id: 'image', content: 'Image + CTA to head to shop, 1-2 lines', css: '' },
    { id: 'article1', content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-20' },
    { id: 'content1', content: 'Recent piece of content #1, ~80 characters + CTA', css: 'h-20' },
    { id: 'content2', content: 'Recent piece of content #2, ~80 characters + CTA', css: 'h-20' },
    { id: 'content3', content: 'Recent piece of content #3, ~80 characters + CTA', css: 'h-20' },
    { id: 'story1', content: 'Few stories of interest', css: 'h-20' },
    { id: 'footer', content: 'Footer', css: '' },
  ],
  'The NewPort': [
    { id: 'logo', content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto' },
    { id: 'intro', content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto' },
    { id: 'story1', content: 'Few stories of interest', css: 'h-20' },
    {
      id: 'article1', content: ' \
    #1 link of the day/related story of interest \
    #2 link of the day/related story of interest \
    #3 link of the day/related story of interest \
    ', css: 'h-20'
    },
    { id: 'article1', content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-32' },
    { id: 'footer', content: 'Footer', css: '' },
  ],
};

const ContentLayout = ({ layoutType,
  // sections,
  // setSections,
  previousPage,
  nextPage }) => {
  let dispatch = useDispatch();
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


  return (
    <div>
      <span className='text-lg font-semibold text-sky-500' >Drag and Drop Elements according to your preference</span>
      <div className='h-[70vh] max-h-[70vh] overflow-y-scroll'>
        <DndProvider backend={HTML5Backend}>
          <div className="p-4">
            {sections.map(({ id, content, css }, index, array) => (
              <div className={
                `${firstPageData[2].data === 'High Gloss' && (id === 'content1' || id === 'content2' || id === 'content3')
                  ? `inline-block w-1/4 ${index !== array.length - 1 ? 'mx-5' : ''}`
                  : ''} ${''} ${select === id ? `border-2 border-white` : ``} mb-5` 
              }
              onClick={ ()=>{handleOnSelect(id)}}>
                <DraggableSection
                  css={css}
                  key={id}
                  id={`${id}`}
                  content={content}
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
            nextPage();
          }}

        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
        </Button>
      </div>
      <div className="fixed right-0 top-[6%] w-1/6 h-[94%] bg-gray-900 " aria-label="Sidebar with logo branding example">
        <RightControl
          updateData={(data) => { handleOnpageOneDataChange(data) }}
          firstPageData={firstPageData}
          select={select}
        >

        </RightControl>
      </div>
    </div>
  );
};

export default ContentLayout;