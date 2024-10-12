// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const figmaApi = createApi({
    reducerPath: 'figmaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.figma.com/v1/', headers: {
            'X-Figma-Token': "figd_ugXJbQs0g0eWg8IoTfILoZ_bj_27H9gpXbGrADXD",
        }
    }),
    endpoints: (builder) => ({
        getFrameDetails: builder.query({
            query: () => ("files/YEkcdqmEUTP5i2qr00TZB9/nodes?ids=16-2"),
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