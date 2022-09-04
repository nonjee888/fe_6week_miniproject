import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import posts from '../modules/posts';
import comments from '../modules/comments';

export default configureStore({
    reducer: { 
      posts: posts.reducer,
      comments : comments.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),

})
