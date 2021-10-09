import React, { memo } from 'react'
import { RecommendWrapper,Content,RecommendLeft,RecommendRight } from './style'
import CJLTopBanner from './c-cpns/top-banner'
import HotRecommendWrapper from './c-cpns/hot-recommend'
import CJLNewAlbum from './c-cpns/new-album'
import CJLRcmRanking from './c-cpns/rcm-ranking'
import CJLHotAnchor from './c-cpns/hot-anchor'
import CJLUserLogin from './c-cpns/user-login'
import CJLSettleSinger from './c-cpns/settle-singer'
function CJLRecommend() {

    return (
        <div>
            <RecommendWrapper>
                <CJLTopBanner></CJLTopBanner>
                <Content className="wrap-v2">
                    <RecommendLeft>
                        <HotRecommendWrapper/>
                        <CJLNewAlbum/>
                        <CJLRcmRanking/>
                    </RecommendLeft>
                    <RecommendRight>
                        <CJLUserLogin />
                        <CJLSettleSinger/>
                        <CJLHotAnchor />
                    </RecommendRight>
                </Content>
            </RecommendWrapper>
        </div>
    )
}


export default  memo(CJLRecommend)
