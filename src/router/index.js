import React from 'react';
import { Redirect } from "react-router-dom";
 
const CJLDiscover = React.lazy(() => import("@/pages/discover"));
const CJLRecommend = React.lazy(() => import("@/pages/discover/children-page/recommend"));
const CJLRanking = React.lazy(() => import("@/pages/discover/children-page/ranking"));
const CJLSongs = React.lazy(() => import("@/pages/discover/children-page/songs"));
const CJLDjradio = React.lazy(() => import("@/pages/discover/children-page/djradio"));
const CJLArtist = React.lazy(() => import("@/pages/discover/children-page/artist"));
const CJLAlbum = React.lazy(() => import("@/pages/discover/children-page/album"));
const CJLPlayer = React.lazy(() => import("@/pages/player"));
const CJLFriend = React.lazy(() => import("@/pages/friend"));
const CJLMine = React.lazy(() => import("@/pages/mine"));

const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: CJLDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: CJLRecommend
      },
      {
        path: "/discover/ranking",
        component: CJLRanking
      },
      {
        path: "/discover/songs",
        component: CJLSongs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: CJLDjradio
      },
      {
        path: "/discover/artist",
        component: CJLArtist
      },
      {
        path: "/discover/album",
        component: CJLAlbum
      },
      {
        path: "/discover/player",
        component: CJLPlayer
      }
    ]
  },
  {
    path: "/mine",
    component: CJLMine
  },
  {
    path: "/friend",
    component: CJLFriend
  },
];

export default routes;


// import CJLDiscover from "@/pages/discover";
// import CJLRecommend from "../pages/discover/children-page/recommend";
// import CJLRanking from "../pages/discover/children-page/ranking";
// import CJLSongs from "../pages/discover/children-page/songs";
// import CJLDjradio from "../pages/discover/children-page/djradio";
// import CJLArtist from "../pages/discover/children-page/artist";
// import CJLAlbum from "../pages/discover/children-page/album";
// import CJLPlayer from "../pages/player";
// import CJLMine from "@/pages/mine";
// import CJLFriend from "@/pages/friend";
