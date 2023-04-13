import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import { useParams } from "react-router-dom";
import BasicCheckbox from "../../components/BasicCheckbox/BasicCheckbox";

function Questions() {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [rendered, setRendered] = useState(false);

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
  }, []);

  if (!questions || !current || !rendered || !answers) return;
  return (
    <section className="w-[100vw] min-h-[100vh]">
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
              <p>{answers[key]}</p>
            </div>
          ))}
          {/* // <BasicCheckbox></BasicCheckbox>; */}
          {/* <p className="text-[16px] mt-[20px]">{current.answers["ა"]}</p> */}
        </div>
      </div>
    </section>
  );
}

export default Questions;
