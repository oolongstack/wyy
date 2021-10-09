import React, { memo, useEffect, useRef } from 'react'

import {Carousel} from 'antd'

import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import CJLThemeHeaderRcm from '@/components/theme-header-rcm'
import CJLAlbumCover from '@/components/album-cover'
import { getNewAlbumAction } from '../../store/actionCreators'
import {AlbumWrapper} from './style'

export default memo(function CJLNewAlbum() {

const {newAlbums} = useSelector(state=>({
    newAlbums:state.getIn(["recommend","newAlbums"])
}),shallowEqual)

const dispatch = useDispatch()
useEffect(() => {
    dispatch(getNewAlbumAction(10))
}, [dispatch])

const pageRef = useRef();

    return (
        <AlbumWrapper>
            <CJLThemeHeaderRcm title="新碟上架"/>
            <div className="content">
                <button className="arrow arrow-left sprite_02" onClick={e => pageRef.current.prev()}></button>
                    <div className="album">
                        <Carousel dots={false} ref={pageRef}>
                            {
                                [0,1].map((item)=>{
                                    return (<div className="page" key={item}>
                                         {
                                             newAlbums.slice(item*5,(item+1)*5).map((iten,index)=>{
                                                return <CJLAlbumCover key={iten.id} info={iten} size={100} width={118} bgp="-570px"/>
                                             })
                                         }
                                    </div>)
                                })
                            }
                        </Carousel>
                    </div>
                <button className="arrow arrow-right sprite_02" onClick={e => pageRef.current.next()}></button>
            </div>
        </AlbumWrapper>
    )
})
