import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import { useParams } from "react-router-dom";
import BasicCheckbox from "../../components/BasicCheckbox/BasicCheckbox";

function Questions() {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState([]);
  const [rendered, setRendered] = useState(false);
  console.log(current);
  console.log(questions);
  if (current?.answers) console.log(current?.answers?.replace(/'/g, '"'));
  if (current?.answers) console.log(current?.answers);

  useEffect(() => {
    async function fetch() {
      const res = await BasicAxios.get("tests/" + params.id);
      setQuestions(res.data);
      setCurrent(res.data.find((question) => question.id == params.questionId));
      setRendered(true);
    }
    fetch();
  }, []);

  console.log(current);
  console.log(questions);
  console.log(current?.answers?.replace(/'/g, '"')["a"]);
  if (current?.answers != undefined) console.log(current?.answers["a"]);

  if (!questions || !current || !rendered) return;
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
        <div className="bg-red-400">
          {/* {Object.keys(JSON.parse(current.answers.replace(/'/g, '"'))).map(
            (key, i) => {
              return (
                <p key={i} className="text-[16px] mt-[20px]">
                  {current.answers[key]}
                </p>
              );
              // <BasicCheckbox></BasicCheckbox>;
            }
          )} */}
          {/* <p className="text-[16px] mt-[20px]">{current.answers["ა"]}</p> */}
        </div>
      </div>
    </section>
  );
}

export default Questions;
