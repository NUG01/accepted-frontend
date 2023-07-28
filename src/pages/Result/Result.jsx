import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import { useParams } from "react-router-dom";
import styles from "./Result.module.scss";

function Result() {
  const [score, setScore] = useState(null);
  const [max, setMax] = useState(null);
  const [incorrect, setIncorrect] = useState([]);
  const [fetched, setFetched] = useState(false);
  const params = useParams();
  console.log(incorrect);

  useEffect(() => {
    BasicAxios.get("test-result/" + params.resultId).then((res) => {
      setScore(res.data.score);
      setMax(res.data.max);
      setIncorrect(res.data.incorrect);
      setFetched(true);
    });
  }, []);

  if (!fetched) return;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30px] bg-[var(--light-ocean-blue)] p-[18px] rounded-[5px]">
      <div>
        <p className="text-center mb-[20px] border-[var(--etxra-dark-ocean-blue)] border-[2px] rounded-[10px] bg-[var(--extra-light-ocean-blue)]">
          {score}
          <span>/</span>
          {max}
        </p>
        {incorrect.length > 0 && (
          <p className="text-[20px] text-center mb-[7px] border-b border-b-[var(--etxra-dark-ocean-blue)] pb-[5px] border-b-[2px]">
            არასწორი პასუხები
          </p>
        )}
      </div>
      {incorrect && (
        <div className={`${styles.grid} pt-[5px]`}>
          {incorrect.map((item) => {
            return Object.keys(item).map((key, i) => {
              return (
                <span
                  style={{ border: "1px solid var(--etxra-dark-ocean-blue)" }}
                  className="text-[14px] p-[3px] rounded-[3px] inline-block bg-[var(--extra-light-ocean-blue)]"
                  key={i}
                >
                  {key}: {item[key]}
                </span>
              );
            });
          })}
        </div>
      )}
    </div>
  );
}

export default Result;
