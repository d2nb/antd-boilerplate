/**
 * antd-boilerplate
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {};
export type User = {
    id?: number;
    username: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
};
export type NavItem = {
    id?: string;
    pid?: string;
    "type": "menu" | "page";
    name: string;
    path: string;
};
/**
 * 用户-登录
 */
export function postApiSignin(body?: {
    username: string;
    password: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            token: string;
        };
    }>("/api/signin", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * 用户-获取当前登录用户
 */
export function getApiUserMe(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: User;
    }>("/api/user/me", {
        ...opts
    }));
}
/**
 * 用户-导航
 */
export function getApiUserNavs(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: NavItem[];
    }>("/api/user/navs", {
        ...opts
    }));
}
