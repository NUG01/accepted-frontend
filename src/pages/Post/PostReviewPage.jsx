import { useState } from "react";
import { useParams } from "react-router-dom";
import checkAuth from "../../guards/checkAuth";
import { useEffect } from "react";
import BasicAxios from "../../helpers/axios";
import { useSelector } from "react-redux";

function PostReviewPage() {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [fetched, setFetched] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    BasicAxios.get("review-post/" + postId).then((res) => {
      console.log(res);
    });
  }, []);
  return <h1 className="text-[#000]">{postId}</h1>;
}

export default checkAuth(PostReviewPage);
