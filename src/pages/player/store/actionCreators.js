import * as actionTypes from './contants'
import { getRandom } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'
import { getSongDetail, getLyric } from '@/services/player'
//目前歌曲
const changeCurrentSongAction = (currentSong) => ({
    type: actionTypes.CHANGE_SONG_DETAIL,
    currentSong
})
//歌曲列表
const changePlayListAction = (playList) => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playList
})
//目前歌曲index
const changeCurrentSongIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
    index
})
const changeLyricListAction = (lyricList)=>({
    type: actionTypes.CHANGE_LYRICS_LIST,
    lyricList
})
//保存歌词
export const changeCurrentLyricIndex = (index) => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    index
})



//判断是什么播放模式
export const changeSequenceAction = (sequence) => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
})
//切换歌曲 判断是什么模式
export const changeQieHuanSongAction = (tag) => {
    return (dispatch, getState) => {
        const sequence = getState().getIn(["player", "sequence"])
        let currentSongIndex = getState().getIn(["player", "currentSongIndex"])
        let playList = getState().getIn(["player", "playList"])
        switch (sequence) {
            case 1://随机
                let randomIndex = getRandom(playList.length)
                //避免随机的是同一个歌曲
                while (randomIndex === currentSongIndex) {
                    randomIndex = getRandom(playList.length)
                }
                currentSongIndex = randomIndex
                break;
            default://顺序
                currentSongIndex += tag
                if (currentSongIndex >= playList.length) currentSongIndex = 0
                if (currentSongIndex < 0) currentSongIndex = playList.length - 1
        }
        const currentSong = playList[currentSongIndex]
        dispatch(changeCurrentSongAction(currentSong))
        dispatch(changeCurrentSongIndexAction(currentSongIndex))
        //请求歌词
        dispatch(getLyricAction(currentSong.id))
    }
}
export const getPlayerDetailAction = (id) => {

    return (dispatch, getState) => {
        //根据id查找一下playlist中是否有该歌曲
        const playList = getState().getIn(["player", "playList"])
        const songIndex = playList.findIndex(song => song.id === id)
        //判断是否找到歌曲 -1为没有找到歌曲
        let song = null
        if (songIndex !== -1) {
            dispatch(changeCurrentSongIndexAction(songIndex))
            song = playList[songIndex]
            dispatch(changeCurrentSongAction(song))
            dispatch(getLyricAction(song.id))
        } else {
            //请求歌曲数据
            getSongDetail(id).then((res) => {
                song = res.songs && res.songs[0]
                if (!song) return;
                //将新请求的歌曲添加到播放列表中
                const newPlayList = [...playList]
                newPlayList.push(song)
                //更新redux中的值
                dispatch(changePlayListAction(newPlayList))
                dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
                dispatch(changeCurrentSongAction(song))
                //请求歌曲歌词
                dispatch(getLyricAction(song.id))
            })
        }
    }
}

export const getLyricAction = (id) => {
    return dispatch => {
        getLyric(id).then((res) => {
           const lyric = res.lrc.lyric 
               
           const lyricList = parseLyric(lyric)
           dispatch(changeLyricListAction(lyricList))
        })
    }
}

