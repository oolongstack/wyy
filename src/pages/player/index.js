import React, { memo } from 'react'
import {PlayerWrapper,PlayerLeft,PlayerRight} from './style'
export default memo(function CJLPlayer() {
    return (
        <PlayerWrapper>
           <div className="content wrap-v2">
                <PlayerLeft>
                    <h2>playerInfo</h2>
                    <h2>songContent</h2>
                </PlayerLeft>
                <PlayerRight>
                    <h2>playerInfo</h2>
                    <h2>songContent</h2>
                </PlayerRight>
           </div>
        </PlayerWrapper>
    )
})
