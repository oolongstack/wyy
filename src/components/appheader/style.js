import styled from 'styled-components'
import hot from '@/assets/img/sprite_01.png'
export const HeaderWrapper = styled.div`
    height:75px;
    font-size:14px;
    background-color:#242424;
    .content{
        height:70px;
        display: flex;
        justify-content:space-between;
    }
    .divider{
        height: 5px;
        background-color: #C20C0C;
    }
` 

export const HeaderLeft = styled.div`
     display: flex;
    .logo{
        display:block;
        width:176px;
        height:70px;
        background-position: 0 0;
    }
    .selectList{
        display:flex;
        line-height:70px;
    }
    .selectItem{
        position: relative;
        a{
            display:block;
            padding:0 20px;
            color:#ccc
        }
        :last-of-type a {
            position: relative;
            ::after{
                position: absolute;
                content:'';
                width:28px;
                height:19px;
                background-image: url(${hot});
                background-position: -190px 0;
                top:20px;
                right:-15px;
            }
        }
        &:hover a, a.active{
            color:#fff;
            background:#000;
            text-decoration:none;
        }
        .active .icon{
            position:absolute;
            display:inline-block;
            width:12px;
            height:7px;
            bottom:-1px;
            left:50%;
            transform:translate(-50%,0);
            background-position: -226px 0;
        }
    }

`
export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    color:#ccc;
    font-size:12px;
    .search{
        width:158px;
        height:32px;
        border-radius:16px;
        input {
            &::placeholder {
                font-size:12px;
            }
        }
    }
    .center{
        width:90px;
        height:32px;
        line-height: 32px;
        text-align:center;
        border-radius:16px;
        border:1px solid #666;
        cursor:pointer;
        margin:0 16px;
        background-color:transparent;
    }
    .login{
        cursor:pointer;
    }

`