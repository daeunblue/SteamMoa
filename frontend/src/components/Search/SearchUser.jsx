import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchLists } from "../../api/Search";
import ProfileSearchUser from "../Profile/ProfileSearchUser";

const SearchUser = (props) => {
  const [searchParams] = useSearchParams();
  const keyword = decodeURIComponent(searchParams.get("word"));
  const [userList, setUserList] = useState([
    {
      userId: 1,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 39.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
          },
          {
            partyId: 17,
            gameId: 457,
            gameImgPath:
              "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
            gameName: "Starting Life In Another World Naked",
            partyTitle: "Title",
            maxPlayer: 3,
            curPlayer: 1,
            startTime: "2021-11-08T20:44",
            writeTime: "2022-08-05T00:41",
            partyStatus: "1",
            partyIsUrgent: true,
          },
          {
            partyId: 18,
            gameId: 457,
            gameImgPath:
              "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
            gameName: "Starting Life In Another World Naked",
            partyTitle: "Title",
            maxPlayer: 3,
            curPlayer: 1,
            startTime: "2021-11-08T20:44",
            writeTime: "2022-08-05T00:41",
            partyStatus: "1",
            partyIsUrgent: true,
          },
      ],
    },
    {
      userId: 2,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 33.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
    {
      userId: 10,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 34.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
    {
      userId: 3,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 35.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
    {
      userId: 4,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 36.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
    {
      userId: 5,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 37.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
    {
      userId: 6,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 36.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
    {
      userId: 7,
      userName: "사용자 이름",
      userServiceId: "user_id",
      userPoint: 38.5,
      userTags: ["즐겜러", "빡겜러"],
      userParties: [
        {
          partyId: 16,
          gameId: 457,
          gameImgPath:
            "https://cdn.akamai.steamstatic.com/steam/apps/2050430/header.jpg?t=1658495323",
          gameName: "Starting Life In Another World Naked",
          partyTitle: "Title",
          maxPlayer: 3,
          curPlayer: 1,
          startTime: "2021-11-08T20:44",
          writeTime: "2022-08-05T00:41",
          partyStatus: "1",
          partyIsUrgent: true,
        },
      ],
    },
  ]);

  //   useEffect(() => {
  //     getSearchLists("user", keyword)
  //       .then(({ data }) => {
  //         setUserList([...data.users]);
  //       })
  //       .catch();
  //   });

  return (
    <div className="w-per50 mx-auto">
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-purple">유저모아</span>
        </div>
        <div className="w-full grid grid-cols-1 gap-3">
          {userList.map((user) => (
              <ProfileSearchUser key={ user.userId } user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchUser;
