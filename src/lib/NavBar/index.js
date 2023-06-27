import React, { useState, useEffect, Fragment } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/images/TaiFun.png';
// import logoEnImg from '@/assets/images/logo-header.release.en.svg';
import logoIcon from '@/assets/icons/logo.png';
import memberIcon from '@/assets/icons/member.svg';
import searchIcon from '@/assets/icons/search.svg';
import facebookIcon from '@/assets/icons/facebook.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import youtubeIcon from '@/assets/icons/youtube.svg';
import BrandNav from '../BrandNav';
import Channels from '../Channels';
import Menu from '../Menu';
import MenuItems from '../MenuItems';
import ButtonClose from '../ButtonClose';
// import Container from '@/components/Container';
import breakpoint from '@/lib/constant/breakpoint';

import { useTranslation } from 'next-i18next';

const StyledNavBar = styled('header')`
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.colors.grey1};
`;

const HeaderSection = styled.div`
    width: 100%;
    height: auto;
    // margin: 0 auto;
    // border: 1px solid blue;
`;

const HeaderContainer = styled.div`
    position: sticky;
    top: 0px;
    max-width: auto;
    width: 90%;
    margin: 0 auto;
    background-color: ${(props) => props.theme.colors.grey1};
    ${breakpoint.mediaMD} {
        max-width: 64rem;
        width: 100%;
    }
    ,
    ${breakpoint.mediaLG} {
        max-width: 75rem;
        width: 100%;
    }
`;

const StyledDesktopAndAbovebox = styled.div`
    padding: 1.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0px;
`;

const BrandWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonContainer = styled('div')`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    position: relative;
    opacity: ${(props) => (props.$isHeaderShow ? 0 : 1)};
    transition: opacity 200ms ease 0s;
    &:before,
    &:after {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        position: absolute;

        background-color: ${(props) => props.theme.colors.grey2};
    }
    &:before {
        top: 2px;
    }
    &:after {
        bottom: 2px;
    }
`;

const ButtonLine = styled('div')`
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.colors.grey2};
`;

const SubBrandNav = styled('div')`
    display: none;
    ${breakpoint.mediaXL} {
        display: block;
        font-weight: 400;
        font-size: ${(props) => props.theme.fontSize.xs};
        color: ${(props) => props.theme.colors.grey4};
    }
`;

const IconGroupNav = styled('div')`
    display: flex;
    align-items: center;
`;

const ButtonNavOutline = css`
    background-color: ${(props) => props.theme.colors.white};
    border: 2px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
`;

const ButtonNavFilled = css`
    background-color: ${(props) => props.theme.colors.primary};
    border: 2px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
`;

const variantMap = {
    filled: ButtonNavFilled,
    outlined: ButtonNavOutline,
};

const ButtonNav = styled('div')`
    width: 5.375rem;
    height: 2rem;
    font-size: ${(props) => props.theme.fontSize.sm};
    border-radius: 2.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    ${(props) => variantMap[props.$variant] || variantMap.filled}
    margin-right: 1rem;
    &:last-child {
        margin-right: 0px;
    }
`;

const IconContainer = styled('div')`
    display: none;
    ${breakpoint.mediaXL} {
        display: block;
        margin-left: 1.5rem;
    }
`;

const IconBox = styled(Image)`
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.theme.colors.grey2};
    margin-right: 1rem;
    &:last-child {
        margin-right: 0px;
    }
`;

const StyledDivider = styled('div')`
    border-width: 1px 0px 0px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.grey3};
    height: 0px;
    width: 100%;
    // transform: ${(props) =>
        props.$isCatgoryShow === true
            ? 'translateY(0px)'
            : 'translateY(-2.5rem)'};
    opacity: ${(props) => (props.$isCatgoryShow === true ? 1 : 0)};
    transition: opacity 300ms ease-in-out 0s;
`;

const ChannelContainer = styled('div')`
    transform: ${(props) =>
        props.$isCatgoryShow === true
            ? 'translateY(0px)'
            : 'translateY(-2.5rem)'};
    opacity: ${(props) => (props.$isCatgoryShow === true ? 1 : 0)};
    transition: transform 300ms ease-in-out 0s;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
`;

const HamburgerContainer = styled('div')`
    background-color: ${(props) => props.theme.colors.white};
    z-index: 4;
    position: fixed;
    top: 0px;
    left: 0;
    transition: transform 300ms ease-in-out 0s;
    transform: ${(props) =>
        props.$hamburgerContainerShow === true
            ? 'translateX(0)'
            : 'translateX(-100%)'};
    height: 100vh;
    width: 100%;
`;
const ButtonCloseSection = styled('div')`
    position: relative;
    padding: 1.5rem 2rem 1rem;
    display: flex;
    justify-content: end;
`;
const IconSection = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    > img {
        width: 3rem;
        height: 3rem;
    }
`;

const SocialIcons = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    > a {
        display: inline-flex;
        > img {
            margin: 0.5rem;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
`;

const HamburgerButtonNav = styled('div')`
    padding: 1.5rem 2rem;
    > div {
        width: 100%;
        margin-right: 0;
    }
    > div:first-child {
        margin-bottom: 1rem;
    }
`;

const LogoLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;
`;

const NavBar = ({ locale, children, ...props }) => {
    const { t } = useTranslation('home');

    const [hamburgerContainerShow, setHamburgerContainerShow] = useState(false);
    const [isCatgoryShow, setIsCatgoryShow] = useState(true);
    const [isHeaderShow, setIsHeaderShow] = useState(true);

    const handleHamburgerContainerShow = () => {
        setHamburgerContainerShow(!hamburgerContainerShow);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const isCatgoryShow = scrollTop < 20;

            setIsCatgoryShow(isCatgoryShow);

            if (isCatgoryShow) {
                setIsHeaderShow(true);
            } else {
                if (scrollTop > 20) {
                    setIsHeaderShow(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            // 確保滾動事件監聽器被正確移除
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <StyledNavBar>
            <HeaderSection>
                {/* <Container> */}
                <HeaderContainer>
                    <StyledDesktopAndAbovebox>
                        <BrandWrapper>
                            <ButtonContainer
                                $isHeaderShow={isHeaderShow}
                                onClick={handleHamburgerContainerShow}
                            >
                                <ButtonLine></ButtonLine>
                            </ButtonContainer>
                            <BrandNav isHeaderShow={isHeaderShow}>
                                <LogoLink href="/travel">
                                    {/* TODO:svg 切換多國語 */}
                                    <Image
                                        // width={221}
                                        height={48}
                                        src={logoIcon}
                                        alt="logo"
                                    />
                                    <Image
                                        // width={221}
                                        height={20}
                                        src={logoImg}
                                        alt="logo text"
                                    />
                                    {/* <img
                                            src={`/_next/static/media/TaiFun.ba21988b.png`}
                                            alt="Logo"
                                        /> */}
                                </LogoLink>
                                <SubBrandNav>{t('subTitle')}</SubBrandNav>
                            </BrandNav>
                        </BrandWrapper>
                        <IconGroupNav>
                            <div>
                                <ButtonNav
                                    className={ButtonNavOutline}
                                    $variant="outlined"
                                    $locale={locale}
                                >
                                    {t('navButtons.outline')}
                                </ButtonNav>
                                <ButtonNav
                                    className={ButtonNavFilled}
                                    $variant="filled"
                                    $locale={locale}
                                >
                                    {t('navButtons.filled')}
                                </ButtonNav>
                            </div>
                            <IconContainer>
                                {/* TODO:how to use svg */}
                                {/* <svg src={searchIcon} alt=""></svg> */}
                                <IconBox src={searchIcon} alt="搜尋" />
                                <IconBox src={memberIcon} alt="會員" />
                            </IconContainer>
                        </IconGroupNav>
                    </StyledDesktopAndAbovebox>
                    <StyledDivider
                        $isCatgoryShow={isCatgoryShow}
                    ></StyledDivider>
                    <ChannelContainer $isCatgoryShow={isCatgoryShow}>
                        <Channels
                            handleHamburgerContainerShow={
                                handleHamburgerContainerShow
                            }
                        ></Channels>
                    </ChannelContainer>
                    <StyledDivider
                        $isCatgoryShow={isCatgoryShow}
                    ></StyledDivider>
                </HeaderContainer>
                <HamburgerContainer
                    $hamburgerContainerShow={hamburgerContainerShow}
                >
                    <ButtonCloseSection>
                        <ButtonClose
                            onClick={handleHamburgerContainerShow}
                        ></ButtonClose>
                    </ButtonCloseSection>
                    <IconSection>
                        <Image src={logoIcon} alt="logoIcon" />
                    </IconSection>
                    <Menu>
                        <MenuItems
                            items={t('menuConfig', { returnObjects: true })}
                        ></MenuItems>
                    </Menu>
                    <SocialIcons>
                        <a href="">
                            <Image src={facebookIcon} alt="facebook" />
                        </a>
                        <a href="">
                            <Image src={instagramIcon} alt="instagram" />
                        </a>
                        <a href="">
                            <Image src={twitterIcon} alt="twitter" />
                        </a>
                        <a href="">
                            <Image src={youtubeIcon} alt="youtube" />
                        </a>
                    </SocialIcons>
                    <HamburgerButtonNav>
                        <ButtonNav
                            className={ButtonNavOutline}
                            $variant="outlined"
                            $locale={locale}
                        >
                            {t('navButtons.outline')}
                        </ButtonNav>
                        <ButtonNav
                            className={ButtonNavFilled}
                            $variant="filled"
                            $locale={locale}
                        >
                            {t('navButtons.filled')}
                        </ButtonNav>
                    </HamburgerButtonNav>
                </HamburgerContainer>
                {/* </Container> */}
            </HeaderSection>
        </StyledNavBar>
    );
};

NavBar.propTypes = {
    style: propTypes.object,
};

NavBar.defaultProps = {
    style: {},
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'about',
                'home',
            ])),
        },
    };
}

export default NavBar;