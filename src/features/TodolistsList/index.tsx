import * as todoListSelectors from './selectors'
import * as todoListsAsyncActions from './todolists-actions';
import {slice} from './todolists-reducer';

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}

export {
    todoListSelectors,
    todoListsActions
}