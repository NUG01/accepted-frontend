import { useState } from "react";
import { useParams } from "react-router-dom";
import checkAuth from "../../guards/checkAuth";
import { useEffect } from "react";
import BasicAxios from "../../helpers/axios";
import { useSelector } from "react-redux";
import BasicPost from "../../pages/Corridor/components/BasicPost";
import { useLocation } from "react-router-dom";

function PostReviewPage() {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [fetched, setFetched] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    BasicAxios.get("review-post/" + postId).then((res) => {
      setPost(res.data);
      setFetched(true);
    });
  }, [location]);
  if (!fetched) return;
  return <BasicPost key={postId} postData={post} user={user} />;
}

export default PostReviewPage;
