import styles from "./Loader.module.scss";
import PageLoader from "../../components/Spinner/PageLoader";
import { useParams, useNavigate } from "react-router-dom";
import BasicAxios from "../../helpers/axios/index";
import { useEffect } from "react";

import React from "react";

function Loader() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const code = params.code;
        const res = await BasicAxios.post("email/verify", { code });
        console.log(res);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setTimeout(() => {
          navigate("..");
        }, 3000);
      }
    })();
  }, []);
  return (
    <div className={styles.container}>
      <PageLoader />
    </div>
  );
}

export default Loader;
