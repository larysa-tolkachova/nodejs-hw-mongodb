function parseSortBy(value) {
  if (typeof value === 'undefined') {
    return '_id';
  }

  const keys = ['name', 'phoneNumber', 'contactType'];

  if (keys.includes(value) !== true) {
    return '_id';
  }

  return value;
}
//------------------------
function parseSortOrder(value) {
  if (typeof value === 'undefined') {
    return 'asc';
  }

  if (value !== 'asc' && value !== 'desc') {
    return 'asc';
  }

  return value;
}
//-----------------------------------
export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}

//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     phoneNumber: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//     },

//     isFavourite: {
//       type: Boolean,
//       default: false,
//     },

//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       required: true,
//       default: 'personal',
//     },
