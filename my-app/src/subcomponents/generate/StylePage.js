import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Button, Card, Modal, TextInput, Textarea } from 'flowbite-react';
import { setData, useData, clearData, useStyleInfo } from "../../redux/DetailSlice"
import Dropdown from '../../components/Dropdown';
import DropdownDetail from './DropdownDetail'

function StylePage(props) {

  let dispatch = useDispatch();
  let getDataFromRedux = useData();
  const [nData, setNData] = useState(getDataFromRedux);
  const [loading, setLoading] = useState(true);
  // console.log(nData);
  let styleFromRedux = useStyleInfo()
  const [styleSheet, setStyleSheet] = useState(styleFromRedux);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [editStyle, setEditStyle] = useState({})

  useEffect(() => {
    setLoading(false);
  }, [styleSheet])

  const handleEdit = (each) => {
    setEditData(each);
    let tem = { ...styleSheet }
    setEditStyle(tem);
    // console.log(styleSheet.eachCard[`${each.id}`].cardColor)
    // console.log(styleSheet.eachCard[editData.id].titleColor)
    setOpenModal(true);
  };
  function handleBackgroundChange(color) {
    let tem = { ...styleSheet };
    tem.backGrondColor = color;
    setStyleSheet(tem);
  }

  function handleColorSelect(color) {
    let tem = { ...styleSheet };
    tem.cardColor = color;
    setStyleSheet(tem);
  }
  function handleTextChange(color) {
    let tem = { ...styleSheet };
    tem.contentColor = color;
    setStyleSheet(tem);
  }
  function handCardFontSelect(font) {
    let tem = { ...styleSheet };
    tem.titleStyle = font;
    setStyleSheet(tem);
  }
  function handleTextFontSelect(font) {
    let tem = { ...styleSheet };
    tem.contentStyle = font;
    setStyleSheet(tem);
  }
  function handleFontSizeSelect(size) {
    let tem = { ...styleSheet };
    tem.contentFontSize = size;
    setStyleSheet(tem);
  }
  const handleSave = () => {
    let tem = { ...editStyle };
    setStyleSheet(tem);
    setEditData({})
    setEditStyle({})
    setOpenModal(false);
  }
  function handleselectedTitleColor(color) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    // console.log(tem)
    // console.log(tem.eachCard[editData.id].titleColor)
    tem.eachCard[editData.id].titleColor = color;
    setEditStyle(tem);
  }
  function handleselectedTitleFontSize(size) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].titleFontSize = size;
    setEditStyle(tem);
  }
  function handleonselectedTitleStyle(font) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].titleStyle = font;
    setEditStyle(tem);
  }
  function handleonselectedDateColor(color) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].dateColor = color;
    setEditStyle(tem);
  }
  function handlenselectedDateFontSize(size) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].dateFontSize = size;
    setEditStyle(tem);
  }
  function handleonselectedDateStyle(font) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].dateStyle = font;
    setEditStyle(tem);
  }
  function handleonselectedContentColor(color) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].contentColor = color;
    setEditStyle(tem);
  }
  function handleonselectedContentFontSize(size) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].contentFontSize = size;
    setEditStyle(tem);
  }
  function handleonselectedContentStyle(font) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].contentStyle = font;
    setEditStyle(tem);
  }
  function handleonselectedUrlColor(color) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].urlColor = color;
    setEditStyle(tem);
  }
  function handleonselectedUrlFontSize(size) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].urlFontSize = size;
    setEditStyle(tem);
  }
  function handleonselectedUrlStyle(font) {
    let tem = JSON.parse(JSON.stringify(editStyle));
    tem.eachCard[editData.id].urlStyle = font;
    setEditStyle(tem);
  }

  return (

    <div class="w-full md:w-2/3 mx-auto text-white py-8">
      <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3"
        style={{ backgroundColor: styleSheet.backGrondColor }}>
        <div className="h-full w-full">
          <div className=' overflow-y-auto h-full'>
            <div className="flex justify-center items-center">
              <h1 style={{
                color: styleSheet.titleColor,
                fontSize: styleSheet.titleFontSize,
                fontFamily: styleSheet.titleStyle,
              }}>{props.qestionTitle}</h1>
            </div>
            <div className='flex justify-center'>
              <div className='flex flex-col w-11/12'>
                {nData.length !== 0 && (
                  nData.map((each) => (
                    <div key={each.id}
                      className="min-w-300 max-x-600">
                      <Card
                        style={{
                          backgroundColor:
                            styleSheet.eachCard[`${each.id}`].cardColor === 'default'
                              ? styleSheet.cardColor
                              : styleSheet.eachCard[`${each.id}`].cardColor,
                        }}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                          style={{
                            color: styleSheet.eachCard[`${each.id}`].titleColor === 'default'
                              ? styleSheet.contentColor
                              : styleSheet.eachCard[`${each.id}`].titleColor,
                            fontSize: styleSheet.eachCard[`${each.id}`].titleFontSize === 'default'
                              ? styleSheet.titleFontSize
                              : styleSheet.eachCard[`${each.id}`].titleFontSize,
                            fontFamily: styleSheet.eachCard[`${each.id}`].titleStyle === 'default'
                              ? styleSheet.contentStyle
                              : styleSheet.eachCard[`${each.id}`].titleStyle,
                          }}>
                          {each.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-left"
                          style={{
                            color: styleSheet.eachCard[`${each.id}`].dateColor === 'default'
                              ? styleSheet.contentColor
                              : styleSheet.eachCard[`${each.id}`].dateColor,
                            fontSize: styleSheet.eachCard[`${each.id}`].dateFontSize === 'default'
                              ? styleSheet.dateFontSize
                              : styleSheet.eachCard[`${each.id}`].dateFontSize,
                            fontFamily: styleSheet.eachCard[`${each.id}`].dateStyle === 'default'
                              ? styleSheet.contentStyle
                              : styleSheet.eachCard[`${each.id}`].dateStyle,
                          }}>
                          {each.date}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400"
                          style={{
                            color: styleSheet.eachCard[`${each.id}`].contentColor === 'default'
                              ? styleSheet.contentColor
                              : styleSheet.eachCard[`${each.id}`].contentColor,
                            fontSize: styleSheet.eachCard[`${each.id}`].contentFontSize === 'default'
                              ? styleSheet.contentFontSize
                              : styleSheet.eachCard[`${each.id}`].contentFontSize,
                            fontFamily: styleSheet.eachCard[`${each.id}`].contentStyle === 'default'
                              ? styleSheet.contentStyle
                              : styleSheet.eachCard[`${each.id}`].contentStyle,
                          }}>
                          {each.summary}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-left"
                          style={{
                            color: styleSheet.eachCard[`${each.id}`].urlColor === 'default'
                              ? styleSheet.contentColor
                              : styleSheet.eachCard[`${each.id}`].urlColor,
                            fontSize: styleSheet.eachCard[`${each.id}`].urlFontSize === 'default'
                              ? styleSheet.urlFontSize
                              : styleSheet.eachCard[`${each.id}`].urlFontSize,
                            fontFamily: styleSheet.eachCard[`${each.id}`].urlStyle === 'default'
                              ? styleSheet.contentStyle
                              : styleSheet.eachCard[`${each.id}`].urlStyle,
                          }}>
                          {each.url}
                        </p>
                        <Button onClick={() => handleEdit(each)}>
                          Edit Style
                        </Button>
                      </Card>
                    </div>
                  ))
                )}
                {openModal && (

                  <Modal size={"7xl"} show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>
                      <div>
                        <h3>Edit Style</h3>
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="flex justify-end relative right-20">
                        <DropdownDetail
                          onselectedTitleColor={handleselectedTitleColor}
                          onselectedTitleFontSize={handleselectedTitleFontSize}
                          onselectedTitleStyle={handleonselectedTitleStyle}
                          onselectedDateColor={handleonselectedDateColor}
                          onselectedDateFontSize={handlenselectedDateFontSize}
                          onselectedDateStyle={handleonselectedDateStyle}
                          onselectedContentColor={handleonselectedContentColor}
                          onselectedContentFontSize={handleonselectedContentFontSize}
                          onselectedContentStyle={handleonselectedContentStyle}
                          onselectedUrlColor={handleonselectedUrlColor}
                          onselectedUrlFontSize={handleonselectedUrlFontSize}
                          onselectedUrlStyle={handleonselectedUrlStyle}
                        />
                      </div>
                      <div>
                        <label>Title:</label>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                          style={{
                            color: editStyle.eachCard[editData.id].titleColor === 'default'
                              ? editStyle.contentColor
                              : editStyle.eachCard[editData.id].titleColor,
                            fontSize: editStyle.eachCard[editData.id].titleFontSize === 'default'
                              ? editStyle.titleFontSize
                              : editStyle.eachCard[editData.id].titleFontSize,
                            fontFamily: editStyle.eachCard[editData.id].titleStyle === 'default'
                              ? editStyle.contentStyle
                              : editStyle.eachCard[editData.id].titleStyle,
                          }}>
                          {editData.title}
                        </h5>
                      </div>
                      <div>
                        <label>Date:</label>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-left"
                          style={{
                            color: editStyle.eachCard[editData.id].dateColor === 'default'
                              ? editStyle.contentColor
                              : editStyle.eachCard[editData.id].dateColor,
                            fontSize: editStyle.eachCard[editData.id].dateFontSize === 'default'
                              ? editStyle.dateFontSize
                              : editStyle.eachCard[editData.id].dateFontSize,
                            fontFamily: editStyle.eachCard[editData.id].dateStyle === 'default'
                              ? editStyle.contentStyle
                              : editStyle.eachCard[editData.id].dateStyle,
                          }}>
                          {editData.date}
                        </p>
                      </div>
                      <div>
                        <label>Summary:</label>
                        <p className="font-normal text-gray-700 dark:text-gray-400"
                          style={{
                            color: editStyle.eachCard[editData.id].contentColor === 'default'
                              ? editStyle.contentColor
                              : editStyle.eachCard[editData.id].contentColor,
                            fontSize: editStyle.eachCard[editData.id].contentFontSize === 'default'
                              ? editStyle.contentFontSize
                              : editStyle.eachCard[editData.id].contentFontSize,
                            fontFamily: editStyle.eachCard[editData.id].contentStyle === 'default'
                              ? editStyle.contentStyle
                              : editStyle.eachCard[editData.id].contentStyle,
                          }}>
                          {editData.summary}
                        </p>
                      </div>
                      <div>
                        <label>URL:</label>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-left"
                          style={{
                            color: editStyle.eachCard[editData.id].urlColor === 'default'
                              ? editStyle.contentColor
                              : editStyle.eachCard[editData.id].urlColor,
                            fontSize: editStyle.eachCard[editData.id].urlFontSize === 'default'
                              ? editStyle.urlFontSize
                              : editStyle.eachCard[editData.id].urlFontSize,
                            fontFamily: editStyle.eachCard[editData.id].urlStyle === 'default'
                              ? editStyle.contentStyle
                              : editStyle.eachCard[editData.id].urlStyle,
                          }}>
                          {editData.url}
                        </p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleSave}>Save</Button>
                      <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>


            </div>
          </div>
          <div className="flex flex-row items-center justify-around">
            <button
              onClick={() => {
                // getText();
                props.previousPage();
              }}
              className="ButtonType6"
            >
              Previous
            </button>

            <button
              onClick={() => {
              }}
              className="ButtonType6"
            >
              Next
            </button>
          </div>
          <div className="flex justify-end fixed top-0 right-20 z-2">
            <Dropdown
              selectedCardColor={styleSheet.cardColor}
              selectedTextColor={styleSheet.contentColor}
              selectedBackgroundColor={styleSheet.backGrondColor}
              selectedCardFont={styleSheet.titleStyle}
              selectedTextFont={styleSheet.contentStyle}
              selectedFontSize={styleSheet.contentFontSize}
              onBackgroundSelect={handleBackgroundChange}
              onColorSelect={handleColorSelect}
              onTextSelect={handleTextChange}
              onCardFontSelect={handCardFontSelect}
              onTextFontSelect={handleTextFontSelect}
              onFontSizeSelect={handleFontSizeSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StylePage;