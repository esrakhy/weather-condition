import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import locationReducer from './slices/location';
// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    location: locationReducer,
});

export { rootPersistConfig, rootReducer };
