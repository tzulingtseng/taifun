import React, { useState, useEffect, useRef } from 'react';
import getActivityAPI from '@/api/getActivityAPI';

const useGetActivity = ({ top = null, filter = null }) => {
    // console.log('props', props);
    const [status, setStatus] = useState(undefined);
    const [data, setData] = useState(undefined);
    // const [pagination, setPagination] = useState(undefined);
    const [error, setError] = useState(undefined);

    const isMountedRef = useRef(true);
    const apiControllerRef = useRef();
    // console.log('apiControllerRef', apiControllerRef);

    // useEffect(() => {
    //   isMountedRef.current = true;

    //   return () => {
    //     isMountedRef.current = false;
    //     apiControllerRef.current?.abort();
    //     console.clear(); //FIXME:
    //   };
    // }, []);

    /**
     * Hook
     * 名稱: 取得所有觀光活動資料
     */
    useEffect(() => {
        const handleData = async () => {
            console.log(`~~~~取得所有觀光活動資料~~~~`); //FIXME:

            // 取消上次API請求
            // apiControllerRef.current?.abort();

            // 創建API請求
            // apiControllerRef.current = new AbortController();

            const responseData = await getActivityAPI({
                top: top,
                filter: filter,
            });

            // 確保在此頁執行
            // if (isMountedRef.current) {
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                setData(responseData?.data);
                setStatus('success');
            } else if (responseData?.status === 'error') {
                // handle error (後端錯誤)
                setStatus('error');
                setError(responseData.desc);
            } else {
                // handle cancel (取消 call api)
                setStatus('cancel');
            }
            // }
        };
        handleData();
    }, []);

    return {
        status: status,
        data: data,
        // pagination: pagination,
        error: error,
    };
};

export default useGetActivity;
