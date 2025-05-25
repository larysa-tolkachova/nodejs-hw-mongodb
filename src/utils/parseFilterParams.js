function parseIsFavourite(favourite) {
  if (typeof favourite === 'undefined') {
    return undefined;
  }

  const value = String(favourite).toLowerCase();

  if (['true', '1', 'yes'].includes(value)) {
    return true;
  }

  if (['false', '0', 'no'].includes(value)) {
    return false;
  }

  return undefined;
}

//================================================
function parseType(type) {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
}

//==========================================================
export function parseFilterParams(query) {
  const { type, favourite } = query;

  const parsedIsFavourite = parseIsFavourite(favourite);
  const parsedType = parseType(type);

  return {
    type: parsedType,
    favourite: parsedIsFavourite,
  };
}
