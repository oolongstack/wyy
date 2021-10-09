import React, { memo, useEffect, useState } from 'react'
import CJLThemeHeaderRcm from '@/components/theme-header-rcm'
import CJLTopRanking from '@/components/top-ranking'
import {shallowEqual, useDispatch,useSelector} from 'react-redux'
import {RankingWrapper} from "./style"
import {getlistphoto} from '@/services/recommend.js'
import { getTopListAction} from '../../store/actionCreators'

//636229662 1 9876342
export default memo(function CJLRcmRanking() {
const [data, setdata] = useState([])
const {upRanking,newRanking,originRanking} = useSelector(state => ({
    upRanking:state.getIn(["recommend","upRanking"]),
    newRanking:state.getIn(["recommend","newRanking"]),
    originRanking:state.getIn(["recommend","originRanking"])
}),shallowEqual)
const dispatch = useDispatch()
useEffect(() => {
    getlistphoto().then((res) => {
        const data = res.list.slice(0,3)
        setdata(data)
    })
    dispatch(getTopListAction(5854512))
    dispatch(getTopListAction(152462525))
    dispatch(getTopListAction(474106626))
}, [dispatch])

    return (
        <RankingWrapper>
            <CJLThemeHeaderRcm title="榜单"/>
            <div className="tops">
            <CJLTopRanking imgUrl={data[0]} info={upRanking}/>
            <CJLTopRanking imgUrl={data[1]} info={newRanking}/>
            <CJLTopRanking imgUrl={data[2]} info={originRanking}/>
            </div>
        </RankingWrapper>
    )
})