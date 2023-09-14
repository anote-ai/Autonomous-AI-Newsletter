import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Button, Card, Modal, TextInput, Textarea } from 'flowbite-react';
import { setData, getGPTData, useTopic, useData, clearData, setStyleInfo } from "../../redux/DetailSlice"

function Content(props) {

  let dispatch = useDispatch();
  let getDataFromRedux = useData();
  const [nData, setNData] = useState(getDataFromRedux);
  console.log(nData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  let searchInfo = useTopic();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});


  async function generateGPTData() {
    setLoading(true);
    setError(false);
    setError('');
    try{

      let data = await dispatch(getGPTData(searchInfo));
      console.log(data.payload);
      dispatch(setData(data.payload));
      setNData(data.payload)
      console.log(nData);
    }
    catch(e){
      setError(true);
      setErrorInfo(e);
    }
    setLoading(false)
  }
  // useEffect(() => {
  //   async function getDataFB() {
  //     // console.log(nData.length == 0);
  //     if (nData.length == 0) {
  //       // console.log(nData);
  //       await generateGPTData();
  //     }
  //   }
  //   getDataFB();
  // }, [])
  async function clearRData() {
    dispatch(clearData());
    setNData([])
  }

  async function mSetData() {
    let styleInitial = {
      backGrondColor: 'rgb(17 24 39);',
      titleColor: 'rgb(255 255 255);',
      titleFontSize: "1.5rem;",
      titleStyle:"Helvetica",
      dateColor: "rgb(156 163 175);",
      //font-weight:
      dateFontSize: "16px",
      dateStyle:"Helvetica",
      contentColor: "rgb(156 163 175);",
      contentFontSize: "16px",
      contentStyle:"Helvetica",
      urlColor: "rgb(156 163 175);",
      urlFontSize: "16px",
      urlStyle:"Helvetica",
      cardColor:'rgb(31 41 55);',
      eachCard:{}
    }
    let eachCardTem = [];
    for(let i = 0; i < nData.length; i++){
      let temObj = {};
      temObj.titleColor = 'default';
      temObj.titleFontSize = 'default';
      temObj.titleStyle = 'default';
      temObj.dateColor = 'default';
      temObj.dateFontSize = 'default';
      temObj.dateStyle = 'default';
      temObj.contentColor = 'default';
      temObj.contentFontSize = 'default';
      temObj.contentStyle = 'default';
      temObj.urlColor = 'default';
      temObj.urlFontSize = 'default';
      temObj.urlStyle = 'default';
      temObj.cardColor = 'default';
      styleInitial.eachCard[`${nData[i].id}`] = temObj;
    }
    // console.log(styleInitial);
    await dispatch(setStyleInfo(styleInitial));
    await dispatch(setData(nData));
    props.changeState(nData);
    props.nextPage();
  }
  const handleEdit = (each) => {
    setEditData(each);
    setOpenModal(true);
  };
  const handleSave = () => {
    const updatedData = nData.map(item => {
      if (item.id === editData.id) {
        return { ...item, ...editData};
      }
      return item;
    });
    setNData(updatedData);
    setOpenModal(false);
  }

  return (
    <div className="h-full w-full">
      <div className=' overflow-y-auto h-full'>
        <div className="flex justify-center items-center">
          <h1>{props.qestionTitle}</h1>
        </div>
        <div className='flex flex-col items-center overflow-y-auto h-full'>
          {error &&(
            <p class="font-bold text-red">{errorInfo}</p>
          )}
          {loading && (
            <div className='w-full flex justify-items-center flex-col'>
              <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p> Generating, do not skip other steps ...</p>
            </div>
          )}
          <div className='w-full flex flex-wrap'>
            {!loading && nData.length !== 0 && !error && (
              nData.map((each) => (
                <div key={each.id}
                  className="min-w-300 max-x-600">
                  <Card className="">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {each.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
                      {each.date}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {each.summary}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
                      {each.url}
                    </p>
                    <Button onClick={() => handleEdit(each)}>
                      Edit
                    </Button>
                  </Card>
                </div>
              ))
            )}
            <Modal size={"7xl"} show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>
                <h3>Edit Data</h3>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <label>Title:</label>
                  <TextInput
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label>Summary:</label>
                  <Textarea
                    value={editData.summary}
                    onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                  />
                </div>
                <div>
                  <label>URL:</label>
                  <TextInput
                    type="text"
                    value={editData.url}
                    onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              </Modal.Footer>
            </Modal>
          </div>


        </div>
        <div className="flex flex-row items-center justify-around">
          <button
            disabled={loading}
            onClick={() => {
              // getText();
              props.previousPage();
            }}
            className="ButtonType6"
          >
            Previous
          </button>
          <button
            disabled={loading}
            onClick={() => {
              clearRData();
            }}
            className="ButtonType6"
          >
            Clear
          </button>
          <button
            disabled={loading}
            onClick={() => {
              generateGPTData();
            }}
            className="ButtonType6"
          >
            Generate
          </button>

          <button
            disabled={loading || nData.length === 0}
            onClick={() => {
              // getText();
              mSetData();
            }}
            className="ButtonType6"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content;