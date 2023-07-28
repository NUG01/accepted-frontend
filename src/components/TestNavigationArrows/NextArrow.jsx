import React from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import NextArrowIcon from "../../assets/icons/NextArrow";
import BasicAxios from "../../helpers/axios/index.js";
import BasicButton from "../../components/BasicButton/BasicButton";

function NextArrow({ questionData, inProccess, disabled }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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

  function testHandler() {
    let correct = 0;
    let incorrect = [];
    for (let index = 0; index < questionData.length; index++) {
      if (
        questionData[index].correct ==
        localStorage.getItem(`test${params.id}-${questionData[index].id}`)
      ) {
        correct++;
      } else {
        let obj = {};
        const storageValue = localStorage.getItem(
          `test${params.id}-${questionData[index].id}`
        );
        if (storageValue) {
          (obj[questionData[index].id] = storageValue), incorrect.push(obj);
        }
      }
    }
    BasicAxios.post("store-result", {
      test_type_id: params.id,
      score: correct,
      max: questionData.length,
      incorrect: incorrect,
    }).then((res) => {
      localStorage.clear();
      navigate(`/board/tests/${params.id}/result/${res.data.id}`);
    });
  }
  return (
    <Link
      to={
        questionData.length != params.questionId
          ? pageChange("next")
          : undefined
      }
      className={
        questionData.length == params.questionId ? buttonStyles() : nextStyles()
      }
    >
      {questionData.length != params.questionId && (
        <NextArrowIcon></NextArrowIcon>
      )}
      {questionData.length == params.questionId && (
        <div onClick={testHandler}>
          <BasicButton
            style="px-[12px] py-[8px]"
            disabled={disabled}
            spinner={inProccess}
            type="button"
          >
            <p>დასრულება</p>
          </BasicButton>
        </div>
      )}
    </Link>
  );
}

export default NextArrow;

function nextStyles() {
  return "fixed right-0 bottom-0 cursor-pointer bg-[var(--soft-gray)] pr-[15px] pb-[15px] pl-[3px] pt-[3px] rounded-tl-[6px]";
}
function buttonStyles() {
  return "fixed right-0 bottom-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer";
}
