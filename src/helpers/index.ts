import { transform, isEqual, isObject } from "lodash-es";

type IObject = Record<string, unknown>;

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object: IObject, base: IObject): IObject {
  function changes(object: IObject, base: IObject) {
    return transform<IObject, IObject>(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value as IObject, base[key] as IObject)
            : value;
      }
    });
  }
  return changes(object, base) as IObject;
}
