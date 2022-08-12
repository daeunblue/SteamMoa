import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchLists } from "../../api/Search";
import MiniPagination from "../MiniPagination";
import ProfileSearchUser from "../Profile/ProfileSearchUser";
import { range } from "lodash";

const SearchUser = (props) => {
  const [searchParams] = useSearchParams();
  const keyword = decodeURIComponent(searchParams.get("word"));

  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [contentCnt, setContentCnt] = useState(0);
  const [totPage, setTotPage] = useState(1);
  const [viewablePages, setViewablePages] = useState([]);
  const reviewsPerPage = 5;
  const [showContents, setShowContents] = useState([]);

  useEffect(() => {
    getSearchLists("user", keyword.slice(1, keyword.length))
      .then(({ data }) => {
        const { users } = data;
        setUserList([...users]);
      })
      .catch();
  }, [keyword]);

  useEffect(() => {
    setContentCnt(userList.length);
    setTotPage(Math.ceil(contentCnt / reviewsPerPage));
    setViewablePages(
      userList.length ? [...range(1, Math.min(totPage, 5) + 1)] : []
    );
  }, [userList, contentCnt, totPage]);

  useEffect(() => {
    const tmp = userList.slice(
      (page - 1) * reviewsPerPage,
      page * reviewsPerPage
    );
    setShowContents(tmp);
  }, [page, userList]);

  return (
    <div className="w-per50 mx-auto">
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-purple">
            유저모아
          </span>
        </div>
        {showContents.length ? (
          <div className="w-full grid grid-cols-1 gap-3">
            {showContents.map((user) => (
              <ProfileSearchUser key={user.userId} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-main-400 p-2 rounded text-white">해당 유저가 없습니다.</div>
        )}

        <div className="flex flex-row justify-center text-white mt-3">
          {userList.length ? (
            <MiniPagination
              totPage={totPage}
              page={page}
              viewablePages={viewablePages}
              setPage={setPage}
              setViewablePages={setViewablePages}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchUser;
