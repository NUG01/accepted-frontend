import BasicAxios from "./helpers/axios/index.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    BasicAxios.get("user")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div></div>;
}

export default App;
