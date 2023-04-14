import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import BasicRadio from "../../components/BasicRadio/BasicRadio";
import NextArrow from "../../assets/icons/NextArrow";
import BackArrow from "../../assets/icons/BackArrow";

function Questions() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [rendered, setRendered] = useState(false);

  function pageChange(ev) {
    let url = location.pathname;

    let parts = url.split("/");

    let lastParam = parts.pop();
    let newLastParam;
    if (ev == "next") newLastParam = parseInt(lastParam) + 1;
    if (ev == "previous") newLastParam = parseInt(lastParam) - 1;

    parts.push(newLastParam);

    let newUrl = parts.join("/");

    return newUrl;
  }

  useEffect(() => {
    async function fetch() {
      const res = await BasicAxios.get("tests/" + params.id);
      setQuestions(res.data);
      setCurrent(res.data.find((question) => question.id == params.questionId));
      const answersParse = JSON.parse(
        res.data.find((question) => question.id == params.questionId).answers
      );
      setAnswers(answersParse);
      setRendered(true);
    }
    fetch();
  }, [location]);

  if (!questions || !current || !rendered || !answers) return;
  return (
    <section className="w-[100vw] min-h-[100vh] relative">
      <Link
        to={pageChange("next")}
        className="absolute right-0 bottom-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <NextArrow></NextArrow>
      </Link>
      <Link
        to={pageChange("previous")}
        className="absolute left-0 bottom-0 translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <BackArrow></BackArrow>
      </Link>
      <div className="pt-[50px] max-w-[80%] m-auto min-h-[100vh]">
        <div className="text-[16px]">
          {current.number} . {current.introduction}
        </div>
        <ul className="list-disc mt-[23px] pl-[10px]">
          {current.conditions?.map((item, i) => {
            return (
              <li key={i} className="text-[15px]">
                {item}
              </li>
            );
          })}
        </ul>
        <p className="text-[16px] italic mt-[30px]">{current.question}</p>
        <div className="mt-[30px] flex flex-col items-start justify-center gap-[7px]">
          {Object.keys(answers).map((key) => (
            <div
              key={key}
              className="text-[16px] flex items-center justify-start gap-[10px]"
            >
              <p>{key})</p>
              <BasicRadio
                test_id={params.id}
                question_id={params.questionId}
                value={key}
                label={String(answers[key])}
                id={key}
                name={`test${params.id}-${params.questionId}`}
              ></BasicRadio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Questions;
