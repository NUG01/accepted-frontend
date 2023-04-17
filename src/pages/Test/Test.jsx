import styles from "./Test.module.scss";

import { useEffect, useState } from "react";
import checkAuth from "../../guards/checkAuth";
import HomeIcon from "../../assets/icons/HomeIcon";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicAxios from "../../helpers/axios";
import DetailsIcon from "../../assets/icons/DetailsIcon";

function Test() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [fetched, setFetched] = useState(false);
  const [results, setResults] = useState(false);

  const params = useParams();
  const dateOptions = { month: "numeric", day: "numeric", year: "2-digit" };

  useEffect(() => {
    async function fetch() {
      const res = await BasicAxios.get("user-tests/results/" + params.id);
      setResults(res.data);
      console.log(res);
    }
    fetch();
    setFetched(true);
  }, []);

  if (!fetched) return;
  return (
    <section className="text-[20px] text-[#000] w-[100vw] min-h-[100vh] flex items-start justify-center">
      <div
        className="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 cursor-pointer z-50"
        onClick={() => {
          localStorage.clear();
          navigate("/board/tests");
        }}
      >
        <HomeIcon></HomeIcon>
      </div>
      {path == "/board/tests/1" && (
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <Link
            to="page/1"
            className="text-[20px] text-[#000] inline-block cursor-pointer mt-[180px]"
          >
            <BasicButton style="px-[12px] py-[8px] text-[20px] mt-0">
              ტესტის დაწყება
            </BasicButton>
          </Link>
          {results && (
            <div className={`text-[16px] mt-[30px] overflow-y-scroll`}>
              <p className="text-center mb-[12px] font-[600]">
                შედეგების არქივი
              </p>
              <div className={styles.grid}>
                {results.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className={styles.resultContainer}>
                        <div>{item.score}/50</div>
                        <div>
                          {new Date(item.created_at).toLocaleDateString(
                            undefined,
                            dateOptions
                          )}
                        </div>
                        <div className="cursor-pointer">
                          <DetailsIcon></DetailsIcon>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <Outlet></Outlet>
    </section>
  );
}

export default checkAuth(Test);
