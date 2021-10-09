import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Slider,message } from 'antd';
import { NavLink } from 'react-router-dom'
import { getSizeImage, formatMinuteSecond, getPlaySong } from '@/utils/format-utils'
// import {changeSequence} from "@/utils/math-utils"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { PlaybarWrapper, Control, Operator, PlayInfo } from './style'
import {
    getPlayerDetailAction,
    changeSequenceAction,
    changeQieHuanSongAction,
    changeCurrentLyricIndex
} from '../store/actionCreators'
export default memo(function CJLAppPlayerBar() {
    //音乐播放时间状态
    const [currentTime, setcurrentTime] = useState(0)
    const [isPlaying, setisPlaying] = useState(false)
    const [isBoFang, setIsBoFang] = useState(false)
    //拿到数据
    const dispatch = useDispatch()
    const { currentSong, sequence ,lyricList, currentLyricIndex} = useSelector(state => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player", "sequence"]),
        lyricList:state.getIn(["player","lyricList"]),
        currentLyricIndex:state.getIn(["player","currentLyricIndex"])
    }), shallowEqual)

    useEffect(() => {
        //1808492017
        dispatch(getPlayerDetailAction(1808492017))
    }, [dispatch])

    useEffect(() => {
        audioRef.current.src = getPlaySong(currentSong.id)
        audioRef.current.play().then(res => {
            setIsBoFang(true)
        }).catch(err =>{
            setIsBoFang(false)
        })
    }, [currentSong])

    //第一次拿不到数据
    const picUrl = (currentSong.al && currentSong.al.picUrl) || ""
    const singerName = (currentSong.ar && currentSong.ar[0].name) || ""
    //歌曲总时长
    const duration = currentSong.dt || 0
    //其他处理
    const audioRef = useRef(null)
    //播放处理
    const playMusic = useCallback(() => {
        isBoFang ? audioRef.current.pause() : audioRef.current.play()
        setIsBoFang(!isBoFang)
    }, [isBoFang])
    //进度条
    // const progress = currentTime / duration * 100
    const [progress, setprogress] = useState(0)
    //播放时间处理
    const timeUpdate = (e) => {
        const currentTime = e.target.currentTime
        if (!isPlaying) {
            setcurrentTime(currentTime * 1000)
            setprogress(currentTime * 1000 / duration * 100)
        }
        //获取当前歌词
        let i = 0
        for (;i < lyricList.length;i++){
            let lyricItem = lyricList[i]
            if(currentTime * 1000 < lyricItem.time){
                break;
            }
        }
        //提高性能
        if(currentLyricIndex !== i - 1 ){
            dispatch(changeCurrentLyricIndex(i - 1))
            const content = lyricList[i-1] && lyricList[i-1].content 
            message.open({
                key: "lyric",
                content:content,
                duration:0,
                className:"lyric"
            })
            // console.log(lyricList[i - 1]);
        }
        // dispatch(changeCurrentLyricIndex(curentLyricIndex - 1))
        
    }
    const sliderChange = useCallback((value) => {
        const currentTime = value / 100 * duration / 1000
        setcurrentTime(currentTime * 1000)
        setisPlaying(true)
        setprogress(value)
    }, [duration])
    const sliderAfterChange = useCallback((value) => {
        const currentTime = value / 100 * duration / 1000
        audioRef.current.currentTime = currentTime;
        setcurrentTime(currentTime * 1000)
        setisPlaying(false)
        if (!isBoFang) {
            playMusic()
        }
    }, [duration, isBoFang, playMusic])
    const changeSequence = () => {
        let currentSequence = sequence + 1
        if (currentSequence > 2) {
            currentSequence = 0
        }
        dispatch(changeSequenceAction(currentSequence))
    }
    const changeMusic = (tag) =>{
        dispatch(changeQieHuanSongAction(tag))
    }
    const handleMusicEnded = (e) =>{
        if ( sequence === 2){
            audioRef.current.currentTime = 0
            audioRef.current.play()
        }else{
            dispatch(changeQieHuanSongAction(1))
        }
    }
    return (
        <PlaybarWrapper className="sprite_player">
            <div className="content wrap-v2">
                <Control isBoFang={isBoFang}>
                    <button className="prev sprite_player" 
                    onClick={e => changeMusic(-1)}></button>
                    <button className="play sprite_player" 
                    onClick={e => playMusic()}></button>
                    <button className="next sprite_player" 
                    onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    <div className="image">
                        <NavLink to="/discover/player" href="/todo">
                            <img src={getSizeImage(picUrl, 35)} alt="" />
                        </NavLink>
                    </div>
                    <div className="info">
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href="#/" className="singer-name">{singerName}</a>
                        </div>
                        <div className="progress">
                            <Slider defaultValue={0}
                                value={progress}
                                onChange={sliderChange}
                                onAfterChange={sliderAfterChange} />
                            <div className="time">
                                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                                <span className="divider">/</span>
                                <span className="duration">{formatMinuteSecond(duration)}</span>
                            </div>
                        </div>
                    </div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_playyer">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop"  onClick={e => changeSequence()}></button>
                        <button className="sprite_player btn playlist"></button>
                    </div>
                </Operator>
            </div>
            <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} onEnded={e =>handleMusicEnded(e)}/>
        </PlaybarWrapper>
    )
})
