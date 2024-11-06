// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next';

// Define a service using a base URL and expected endpoints
let nodeId = getCookie('nodeId') || '';
nodeId = nodeId.replace(':', '-');
const token = getCookie('figmaToken') || '';
const param = getCookie('param') || '';

export const figmaApi = createApi({
    reducerPath: 'figmaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.figma.com/v1/', headers: {
            'X-Figma-Token': `${token}`,
        }
    }),
    endpoints: (builder) => ({
        getFrameDetails: builder.query({
            query: () => (`files/${param}/nodes?ids=${nodeId}`),
        }),
        getImage: builder.query({
            query: (id: string) => `images/YEkcdqmEUTP5i2qr00TZB9?ids=16-2`,
        })
    }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFrameDetailsQuery, useGetImageQuery } = figmaApi

// 2c73ef3f3a20216ec63f509ecf5646e49ec3ab02