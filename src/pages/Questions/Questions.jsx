import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  NavLink,
} from "react-router-dom";
import BackArrow from "../../assets/icons/BackArrow";
import NextArrow from "../../assets/icons/NextArrow";
import BasicRadio from "../../components/BasicRadio/BasicRadio";
import BasicAxios from "../../helpers/axios";
import TextIcon from "../../assets/icons/TextIcon";
import styles from "./Questions.module.scss";
import BasicButton from "../../components/BasicButton/BasicButton";
import PapersIcon from "../../assets/icons/PapersIcon";

function Questions() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [requestInProcess, setRequestInProcess] = useState(false);
  const [res, setResponse] = useState([]);
  // if (current.texts) console.log(JSON.parse(current.texts[1]["texts"]));
  console.log(questions);

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

  function setFetchedValues(res) {
    setQuestions(res.data);
    setCurrent(
      res.data.data.find((question) => question.id == params.questionId)
    );
    const answersParse = res.data.data.find(
      (item) => item.id == params.questionId
    ).answers;

    setAnswers(answersParse);
    setRendered(true);
  }

  useEffect(() => {
    if (res && res.data) {
      setFetchedValues(res);
    } else {
      async function fetch() {
        const response = await BasicAxios.get("tests/" + params.id);
        setResponse(response);
        setFetchedValues(response);
      }
      fetch();
    }
  }, [location]);

  function testHandler() {
    let correct = 0;
    let incorrect = [];
    for (let index = 0; index < questions.data.length; index++) {
      if (
        questions.data[index].correct ==
        localStorage.getItem(`test${params.id}-${questions.data[index].id}`)
      ) {
        correct++;
      } else {
        let obj = {};
        const storageValue = localStorage.getItem(
          `test${params.id}-${questions.data[index].id}`
        );
        if (storageValue) {
          (obj[questions.data[index].id] = storageValue), incorrect.push(obj);
        }
      }
    }
    BasicAxios.post("store-result", {
      test_type_id: params.id,
      score: correct,
      max: questions.data.length,
      incorrect: incorrect,
    }).then((res) => {
      localStorage.clear();
      navigate(`/board/tests/${params.id}/result/${res.data.id}`);
    });
  }

  if (!questions || !current || !rendered || !answers || !res) return;

  return (
    <section className="w-[100vw] min-h-[100vh] relative">
      <div
        onClick={() => setShowNavigation(!showNavigation)}
        className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 z-50 cursor-pointer"
      >
        <PapersIcon />
      </div>
      {showNavigation && (
        <div className={`${styles.navgrid} z-50`}>
          {questions.data.map((item) => {
            return (
              <NavLink
                className={({ isActive }) => (isActive ? "bg-gray-200" : "")}
                key={item.id}
                to={`/board/tests/${params.id}/page/${item.id}`}
                style={{
                  fontSize: "15px",
                  border: "1px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.6px",
                }}
              >
                {item.id}
              </NavLink>
            );
          })}
        </div>
      )}
      <Link
        to={
          questions.data.length != params.questionId
            ? pageChange("next")
            : undefined
        }
        className="absolute right-0 bottom-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        {questions.data.length != params.questionId && <NextArrow></NextArrow>}
        {questions.data.length == params.questionId && (
          <div onClick={testHandler}>
            <BasicButton
              style="px-[12px] py-[8px]"
              disabled={buttonDisabled}
              spinner={requestInProcess}
              type="button"
            >
              <p>დასრულება</p>
            </BasicButton>
          </div>
        )}
      </Link>
      {params.questionId > 1 && (
        <Link
          to={pageChange("previous")}
          className="absolute left-0 bottom-0 translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <BackArrow></BackArrow>
        </Link>
      )}
      {current.category == "text" && (
        <div
          onClick={() => setShowText(!showText)}
          className="absolute top-[50%] left-0 translate-x-[60%] -translate-y-full cursor-pointer"
        >
          <TextIcon></TextIcon>
        </div>
      )}
      {showText && (
        <div
          className={`${styles.text} pt-[50px] px-[10px] pb-[50px] text-[15px] w-[80%] m-auto min-h-[100vh] absolute left-1/2 -translate-x-1/2`}
          style={{ backgroundColor: "var(--extra-light-normal-beige)" }}
        >
          {Object.keys(
            JSON.parse(current.texts[params.questionId < 20 ? 0 : 1]["texts"])
          ).map((key, i) => {
            return (
              <div key={key}>
                <p>
                  <span className="font-[600]">{key}:</span>{" "}
                  {
                    JSON.parse(
                      current.texts[params.questionId < 20 ? 0 : 1]["texts"]
                    )[key]
                  }
                </p>
                <br />
              </div>
            );
          })}
        </div>
      )}
      <div className="pt-[50px] max-w-[80%] m-auto min-h-[100vh]">
        <div className="text-[16px]">
          {current.number} . {current.introduction}
        </div>
        {current.image && <img src={current.image} className="mt-[10px]"></img>}
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
          {current?.extra && (
            <div className="flex items-center justify-center gap-[40px] font-[600] ml-[20px]">
              {current.extra.map((item) => {
                return (
                  <p key={item} className="text-[16px]">
                    {item}
                  </p>
                );
              })}
              <p></p>
            </div>
          )}
          {Object.keys(answers).map((key) => (
            <div
              key={`test${params.id}-${params.questionId}-${key}`}
              className="text-[16px] flex items-center justify-start gap-[10px]"
            >
              <p>{key})</p>
              <BasicRadio
                keyValue={`test${params.id}-${params.questionId}-${key}`}
                test_id={params.id}
                question_id={params.questionId}
                value={key}
                label={String(answers[key])}
                extra={current.extra ? current.extra : undefined}
                id={`test${params.id}-${params.questionId}-${key}`}
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
