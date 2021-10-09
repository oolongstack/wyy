import * as actionTypes from "./constants";
import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList,
} from "@/services/recommend";

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOPBANNERS,
  topBanners: res.banners,
});

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result,
});

const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  hotNewAlbum: res.albums,
});

const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist,
});

const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist,
});

const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGION_RANKING,
  originRanking: res.playlist,
});

//Action
export const getTopBannerAction = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannerAction(res));
    });
  };
};
export const getHotRecommendAction = (limit) => {
  return (dispatch) => {
    getHotRecommends(limit).then((res) => {
      dispatch(changeHotRecommendAction(res));
    });
  };
};
export const getNewAlbumAction = (limit) => {
  return (dispatch) => {
    getNewAlbums(limit).then((res) => {
      dispatch(changeNewAlbumAction(res));
    });
  };
};

export const getTopListAction = (id) => {
  return (dispatch) => {
    getTopList(id).then((res) => {
      switch (id) {
        case 5854512:
          dispatch(changeUpRankingAction(res));
          break;
        case 152462525:
          dispatch(changeNewRankingAction(res));
          break;
        case 474106626:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  };
};
