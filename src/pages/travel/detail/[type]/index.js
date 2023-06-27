import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import moment from 'moment-timezone';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import NavBar from '@/lib/NavBar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import TransportInfo from '@/features/detail/components/TransportInfo';
import breakpoint from '@/lib/constant/breakpoint';

const InfoContainer = styled('div')`
    margin-top: 3rem;
`;

const InfoTitle = styled.div`
    margin: 1.5rem 0;
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
`;

const InfoBox = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${breakpoint.mediaSM} {
        flex-direction: initial;
    }
`;

const InfoImageContainer = styled('div')`
    overflow: hidden;
    width: 100%;
    border-radius: 1rem;
    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
    ${breakpoint.mediaSM} {
        width: 50%;
    }
`;

const InfoDetailContainer = styled('div')`
    width: 100%;
    padding-left: 0rem;
    padding-top: 1.5rem;
    ${breakpoint.mediaSM} {
        width: 50%;
        padding-left: 1.5rem;
        padding-top: 0rem;
    }
`;

const InfoDetailTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin-bottom: 1.5rem;
`;

const InfoDetailItem = styled.div`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: 600;
    margin: 1rem 0;
`;

const IntroContainer = styled('div')`
    margin-bottom: 3rem;
    > .leaflet-container {
        width: 100%;
        height: 30rem;
    }
`;

const MapContainer = styled('div')``;

const Detail = ({ data }) => {
    const { locale, locales, push } = useRouter();
    const { t } = useTranslation('home');
    const {
        // QueryType,
        Address,
        // City,
        // Location,
        Description,
        // DescriptionDetail,
        OpenTime,
        // ParkingPosition,
        Phone,
        Picture,
        Position,
        // Remarks,
        SpotID,
        SpotName,
        SrcUpdateTime,
        // TicketInfo,
        // TravelInfo,
        UpdateTime,
        // ZipCode,
    } = data.detailData;
    // console.log('detailData', data.detailData);
    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar locale={locale}></NavBar>
                <Container>
                    <InfoContainer>
                        <InfoTitle>{SpotName}</InfoTitle>
                        <InfoBox>
                            <InfoImageContainer>
                                <img src={Picture.PictureUrl1} alt={SpotName} />
                            </InfoImageContainer>
                            <InfoDetailContainer>
                                <InfoDetailTitle>資訊</InfoDetailTitle>
                                <InfoDetailItem>電話：</InfoDetailItem>
                                <div>{Phone}</div>
                                <InfoDetailItem>地址：</InfoDetailItem>
                                <div>{Address}</div>
                                <InfoDetailItem>開放時間：</InfoDetailItem>
                                <div>{OpenTime}</div>
                            </InfoDetailContainer>
                        </InfoBox>
                    </InfoContainer>
                    <IntroContainer>
                        <InfoTitle>介紹</InfoTitle>
                        <div>{Description}</div>
                        <InfoTitle>地圖</InfoTitle>
                        <TransportInfo position={Position} />
                    </IntroContainer>
                    {/* <MapContainer></MapContainer> */}
                </Container>
                <Footer></Footer>
            </ThemeProvider>
        </>
    );
};

export async function getServerSideProps({ params, query, locale }) {
    // TODO:為什麼要用 params
    const { id, type } = query;
    let detailData;
    let responseData;

    switch (type) {
        // activitiy: call API 取得特定觀光活動資料
        case 'activity':
            responseData = await getActivityAPI({
                filter: `ActivityID eq '${id}'`,
            });
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                // console.log('responseData?.data', responseData?.data);
                detailData = {
                    // QueryType: type,
                    Address: responseData?.data[0]?.Address ?? null,
                    // City: responseData?.data[0]?.City ?? null,
                    // Location: responseData?.data[0]?.Location ?? null,
                    Description: responseData?.data[0]?.Description ?? null,
                    OpenTime:
                        moment(
                            responseData?.data[0]?.StartTime,
                            moment.ISO_8601
                        )
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD') +
                        ' ~ ' +
                        moment(responseData?.data[0]?.EndTime, moment.ISO_8601)
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD'),
                    Phone: responseData?.data[0]?.Phone ?? null,
                    Picture: responseData?.data[0]?.Picture ?? null,
                    Position: responseData?.data[0]?.Position ?? null,
                    SpotID: responseData?.data[0]?.ActivityID ?? null,
                    SpotName: responseData?.data[0]?.ActivityName ?? null,
                    SrcUpdateTime: responseData?.data[0]?.SrcUpdateTime ?? null,
                    UpdateTime: responseData?.data[0]?.UpdateTime ?? null,
                };
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
        // scenicSpot: call API 取得特定觀光景點資料
        case 'scenicSpot':
            responseData = await getScenicSpotAPI({
                filter: `ScenicSpotID eq '${id}'`,
            });
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                detailData = {
                    // QueryType: type,
                    Address: responseData?.data[0]?.Address ?? null,
                    // City: responseData?.data[0]?.City ?? null,
                    // Location: responseData?.data[0]?.Location ?? null,
                    Description: responseData?.data[0]?.Description ?? null,
                    OpenTime:
                        moment(
                            responseData?.data[0]?.StartTime,
                            moment.ISO_8601
                        )
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD') +
                        ' ~ ' +
                        moment(responseData?.data[0]?.EndTime, moment.ISO_8601)
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD'),
                    Phone: responseData?.data[0]?.Phone ?? null,
                    Picture: responseData?.data[0]?.Picture ?? null,
                    Position: responseData?.data[0]?.Position ?? null,
                    SpotID: responseData?.data[0]?.ActivityID ?? null,
                    SpotName: responseData?.data[0]?.ActivityName ?? null,
                    SrcUpdateTime: responseData?.data[0]?.SrcUpdateTime ?? null,
                    UpdateTime: responseData?.data[0]?.UpdateTime ?? null,
                };
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
        // restaurant: call API 取得特定觀光餐廳資料
        case 'restaurant':
            responseData = await getRestaurantAPI({
                filter: `RestaurantID eq '${id}'`,
            });
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                detailData = {
                    // QueryType: type,
                    Address: responseData?.data[0]?.Address ?? null,
                    // City: responseData?.data[0]?.City ?? null,
                    // Location: responseData?.data[0]?.Location ?? null,
                    Description: responseData?.data[0]?.Description ?? null,
                    OpenTime:
                        moment(
                            responseData?.data[0]?.StartTime,
                            moment.ISO_8601
                        )
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD') +
                        ' ~ ' +
                        moment(responseData?.data[0]?.EndTime, moment.ISO_8601)
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD'),
                    Phone: responseData?.data[0]?.Phone ?? null,
                    Picture: responseData?.data[0]?.Picture ?? null,
                    Position: responseData?.data[0]?.Position ?? null,
                    SpotID: responseData?.data[0]?.ActivityID ?? null,
                    SpotName: responseData?.data[0]?.ActivityName ?? null,
                    SrcUpdateTime: responseData?.data[0]?.SrcUpdateTime ?? null,
                    UpdateTime: responseData?.data[0]?.UpdateTime ?? null,
                };
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
    }
    const returnData = {
        props: {
            ...(await serverSideTranslations(locale, [
                'api_mapping',
                'common',
                'home',
            ])),
            data: {
                detailData,
            },
        },
    };
    return returnData;
}

export default Detail;