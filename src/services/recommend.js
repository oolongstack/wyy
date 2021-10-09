import request from './request';

export function getTopBanners() {
  return request({
    url: "/banner"
  })
}

export function getHotRecommends(limit) {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  })
}

export function getNewAlbums(limit) {
  return request({
    url: "/album/new",
    params: {
      limit
    }
  })
}
export function getlistphoto(){
  return request({
    url: "/toplist"
  })
}
export function getTopList(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}
