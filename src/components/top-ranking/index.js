import React, { memo } from 'react'
import { TopRankingWrapper } from './style'
import {useDispatch} from 'react-redux'
import { getSizeImage } from '@/utils/format-utils.js'
import {getPlayerDetailAction} from '@/pages/player/store/actionCreators'
export default memo(function CJLTopRanking(props) {
    const { info = [], imgUrl = [] } = props
    
    // console.log(info.tracks);
    const dispatch = useDispatch()
    
    const playMusic = (item) => {
        dispatch(getPlayerDetailAction(item.id))
    }
    return (
        <TopRankingWrapper>
            <div className="header">
                <div className="image">
                    <img src={getSizeImage(imgUrl.coverImgUrl, 80)} alt="" />
                    <a href="/todo" className="image_cover"></a>
                </div>
                <div className="info">
                    <a href="/todo">{"云音乐" + imgUrl.name}</a>
                    <div>
                        <button className="btn play sprite_02"></button>
                        <button className="btn favor sprite_02"></button>
                    </div>
                </div>
            </div>
            <div className="list">
                {
                    info.length !== 0 && info.tracks.slice(0, 10).map((item, index) => {
                        return (
                            <div key={item.id} className="list-item">
                                <div className="rank">{index + 1}</div>
                                <div className="info">
                                    <span className="name text-nowrap">{item.name}</span>
                                    <div className="operate">
                                        <button className="btn sprite_02 play" onClick={e => playMusic(item)}></button>
                                        <button className="btn sprite_icon2 addto"></button>
                                        <button className="btn sprite_02 favor"></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="footer">
                <a href="/todo">查看全部&gt;</a>
            </div>
        </TopRankingWrapper>
    )
})
