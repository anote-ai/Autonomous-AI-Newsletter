import React from "react";
import Feed from './components/Feed';

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  
  return (
    <div>
      
      <Feed />
     
    </div>
  );
}

export default App;
