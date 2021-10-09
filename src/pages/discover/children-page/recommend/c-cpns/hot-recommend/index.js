import React, { memo, useEffect } from 'react'

import {HotRecommendWrapper} from './style'
import {HOT_RECOMMEND_LIMIT} from '@/common/contant'

import CJLThemeHeaderRcm from '@/components/theme-header-rcm'
import CJLSongsCover from '@/components/songs-cover'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHotRecommendAction } from '../../store/actionCreators'

export default memo(function CJLHotRecommend() {
//state

//redux hooks
const {hotRecommends} = useSelector(state =>({
    hotRecommends:state.getIn(["recommend","hotRecommends"])
}),shallowEqual)
const dispatch = useDispatch()
useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
}, [dispatch])

    return (
        <HotRecommendWrapper>
            <CJLThemeHeaderRcm title="热门推荐" keyword={['华语','流行','民谣','摇滚','电子']}/>
            <div className="recommend-list">
                {
                    hotRecommends.map((item,index)=>{
                        return (
                            <CJLSongsCover key={item.id} info={item}/>
                        )
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})
