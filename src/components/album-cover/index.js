import React, { memo } from 'react'
import {AlbumWrapper} from './style'
import {getSizeImage} from '@/utils/format-utils'

export default memo(function CJLAlbumCover(props) {
const {info,size = 130 ,width =153}=props
    return (
        <AlbumWrapper size={size} width={width} bgp= "-570px">
            <div className="album-image">
                <img src={getSizeImage(info.picUrl,size)} alt=""/>
                <a href="/todo" className="cover image_cover"></a>
            </div>
            <div className="album-info">
                <div className="name">{info.name}</div>
                <div className="artist">{info.artist.name}</div>
            </div>
        </AlbumWrapper>
    )
})
