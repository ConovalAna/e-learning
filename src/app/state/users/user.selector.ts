import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../state";
import { UserState } from "./user.model";
import { userFeature } from "./user.reducer";


const { selectLoading, selectProfile, selectUserState } = userFeature;

export const selectUserFeatures = createFeatureSelector<UserState>('user');
export const selectUserFeature = (state: AppState) => state.user;


export const selecAuthState = createSelector(
    selectUserFeature,
    (state: UserState) => state.auth
);




export const selectAuth = createSelector(
    selectUserFeatures,
    (state: UserState) => state?.auth
);

export const fromUser = {
    selectAuth,
    selectLoading,
    selectProfile,
    selectUserState
}