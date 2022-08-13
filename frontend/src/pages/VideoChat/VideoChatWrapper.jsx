import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../../recoil/Auth";
import VideoChat from "./VideoChat";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VideoChatWrapper = (props) => {
  const navigate = useNavigate();
  const user = useRecoilValue(auth);
  const user_id = user.userId;
  const partyName = "구스구스 모집중...";
  const gameName = "Goose Goose Duck";

  useEffect(() => {
    if (!user_id) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "먼저 로그인을 해 주세요. &#128517",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  }, []);

  const leaveChat = () => {
    navigate("/");
  };

  return (
    <VideoChat userId={user_id} partyName={partyName} gameName={gameName} leaveChat={leaveChat} />
  );
};

export default VideoChatWrapper;
