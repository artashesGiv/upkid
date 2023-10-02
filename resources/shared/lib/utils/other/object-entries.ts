/* eslint-disable */
import {Maybe} from "@/shared/types/helpers";

if (typeof Object.entries !== 'function') {
    Object.entries = function<T> (target: Maybe<{ [s: string]: T } | ArrayLike<T>>): [string, T][] {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        let newTarget: [string, T][]  = []
        for (const key in target) {
            const value = target[key]

            newTarget.push([key, value])
        }
        return newTarget;
    };
}
/* eslint-enable */
