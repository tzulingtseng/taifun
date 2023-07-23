import React, { Fragment, useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment-timezone';
import Link from 'next/link';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Card from '@/lib/Card';
import Meta from '@/lib/Card/Meta';
import Button from '@/lib/Button';
import Icon from '@/lib/Icon';

import { useTranslation } from 'next-i18next';
import transferTime from '@/utils/transferTime';
import convertGoogleDriveURL from '@/utils/convertGoogleDriveURL';

import NoImage from '@/components/NoImage';
import CardSkeleton from '../CardSkeleton';
import breakpoint from '@/lib/constant/breakpoint';

const CarouselContainer = styled.div`
    .swiper-button-prev,
    .swiper-button-next {
        display: none;
    }
`;

const CarouselBox = styled(Swiper)`
    padding-bottom: 3rem;
    .swiper-pagination-bullet {
        width: 1rem;
        height: 1rem;
    }
    .swiper-pagination-bullet-active {
        background-color: ${(props) => props.theme.colors.primary};
    }
`;

const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
    width: 49%;
    margin-right: 1rem;
    ${breakpoint.mediaSM} {
        width: 32%;
    }
    ${breakpoint.mediaMD} {
        width: 25%;
    }
`;

const Actions = styled.div`
    padding: 0.5rem 1rem;
    color: #888;
    i {
        cursor: pointer;
    }
    & > *:not(:first-child) {
        margin-left: 1rem;
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${(props) => props.theme.fontSize.sm};
`;

const SwiperArrowButton = styled.div`
    ${breakpoint.mediaMD} {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        font-family: swiper-icons;
        cursor: pointer;
        color: ${(props) => props.theme.colors.black};
        width: 2.5rem;
        height: 2.5rem;
        background-color: ${(props) => props.theme.colors.white};
        box-shadow: 0 4px 10px 0 rgba(60, 64, 67, 0.2);
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        z-index: 1;
        &::after {
            position: relative;
        }
        &.button-prev {
            display: ${(props) => (props.$isBeginning ? 'none' : 'flex')};
            left: -3.5rem;
            &::after {
                content: 'prev';
            }
        }
        &.button-next {
            display: ${(props) => (props.$isEnd ? 'none' : 'flex')};
            right: -3.5rem;
            &::after {
                content: 'next';
            }
        }
    }
`;

const TypeCarouselCards = ({ status, type, lists }) => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setisEnd] = useState(false);

    const swiperParams = {
        slidesPerView: 'auto', // 根據容器寬度自動調整每頁顯示的 slide 數量
        modules: [Navigation, Pagination],
        pagination: { clickable: true, dynamicBullets: true },
        // navigation: {
        //     nextEl: `#swiper_control_${type} .button-next`,
        //     preEl: `#swiper_control_${type} .button-prev`,
        // },
        navigation: true,
        observer: true,
        observeParents: true,
    };

    const { t } = useTranslation('common');

    return (
        <>
            <SwiperContainer id={`swiper_control_${type}`}>
                <CarouselContainer>
                    {/* TODO:優化寫法 */}
                    <CarouselBox
                        ref={swiperRef}
                        {...swiperParams}
                        onRealIndexChange={() => {
                            setIsBeginning(
                                swiperRef.current.swiper.isBeginning
                            );
                            setisEnd(swiperRef.current.swiper.isEnd);
                        }}
                    >
                        {(status === undefined ||
                            status === 'loading' ||
                            status === 'cancel') &&
                            Array(10)
                                .fill(0)
                                .map((item, i) => (
                                    <StyledSwiperSlide key={i}>
                                        <CardSkeleton />
                                    </StyledSwiperSlide>
                                ))}
                        {status === 'success' &&
                            lists &&
                            lists.map((item, i) => {
                                const {
                                    Picture: { PictureUrl1 },
                                    OpenTime,
                                    StartTime,
                                    EndTime,
                                    ActivityID,
                                    ScenicSpotID,
                                    RestaurantID,
                                    Address,
                                } = item;

                                let transferedTime = transferTime(
                                    OpenTime,
                                    StartTime,
                                    EndTime
                                );
                                let convertImgUrl =
                                    convertGoogleDriveURL(PictureUrl1);

                                let itemId, type, itemName;
                                if (item?.ActivityID) {
                                    itemId = item.ActivityID;
                                    itemName = item.ActivityName;
                                    type = 'activity';
                                } else if (item?.ScenicSpotID) {
                                    itemId = item.ScenicSpotID;
                                    itemName = item.ScenicSpotName;
                                    type = 'scenicSpot';
                                } else if (item?.RestaurantID) {
                                    itemId = item.RestaurantID;
                                    itemName = item.RestaurantName;
                                    type = 'restaurant';
                                }

                                return (
                                    <StyledSwiperSlide key={itemId}>
                                        <Link
                                            href={`/travel/detail/${type}?id=${itemId}`}
                                        >
                                            <Card
                                                cover={
                                                    convertImgUrl ? (
                                                        <img
                                                            src={convertImgUrl}
                                                            alt="觀光"
                                                        />
                                                    ) : (
                                                        <NoImage />
                                                    )
                                                }
                                                badgeNumber={i + 1}
                                                children={
                                                    <Meta
                                                        // avatarUrl={item.Picture.PictureUrl1}
                                                        // title={t(
                                                        //     `${itemId}.titleName`,
                                                        //     {
                                                        //         ns: `${type}Data`,
                                                        //     }
                                                        // )}
                                                        title={itemName}
                                                        description={
                                                            transferedTime ===
                                                                'allDay'
                                                                ? t(
                                                                    'carouselConfig.allDay'
                                                                )
                                                                : transferedTime ===
                                                                    'moreDetails'
                                                                    ? t(
                                                                        'carouselConfig.moreDetails'
                                                                    )
                                                                    : transferedTime
                                                        }
                                                        address={
                                                            Address
                                                                ?
                                                                // t(
                                                                //     `${itemId}.address`,
                                                                //     {
                                                                //         ns: `${type}Data`,
                                                                //     }
                                                                // )
                                                                Address
                                                                : t(
                                                                    `carouselConfig.moreDetails`
                                                                )
                                                        }
                                                        text={t(
                                                            `carouselConfig.openTime`
                                                        )}
                                                        icon="fa-solid fa-location-dot"
                                                    />
                                                }
                                                footer={
                                                    <Actions>
                                                        <StyledButton variant="outlined">
                                                            {t(
                                                                `carouselConfig.buttonText`
                                                            )}
                                                        </StyledButton>
                                                    </Actions>
                                                }
                                            ></Card>
                                        </Link>
                                    </StyledSwiperSlide>
                                );
                            })}
                    </CarouselBox>
                    {/* 下一個箭頭 */}
                    <SwiperArrowButton
                        className="button-next"
                        $isEnd={isEnd}
                        onClick={() => {
                            swiperRef.current.swiper.slideNext();
                            // swiperRef.current.swiper.update();
                            // setIsBeginning(false);
                            // setisEnd(swiperRef.current.swiper.isEnd);
                        }}
                    ></SwiperArrowButton>
                    {/* 上一個箭頭 */}
                    <SwiperArrowButton
                        className="button-prev"
                        $isBeginning={isBeginning}
                        onClick={() => {
                            swiperRef.current.swiper.slidePrev();
                            // swiperRef.current.swiper.update();
                            // setisEnd(false);
                            // setIsBeginning(
                            //     swiperRef.current.swiper.isBeginning
                            // );
                        }}
                    ></SwiperArrowButton>
                </CarouselContainer>
            </SwiperContainer>
        </>
    );
};

export default TypeCarouselCards;
