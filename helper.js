function getOffset(CurrentPage = 1, listPerPage) {
  return (CurrentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
module.exports = {
  getOffset,
  emptyOrRows,
};
