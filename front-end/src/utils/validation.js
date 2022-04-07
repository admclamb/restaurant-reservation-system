export function validateNewTable(table) {
  const { table_name = null, capacity = null } = table;
  if (!table_name) {
    return "Table must have a name";
  }

  if (!capacity) {
    return "Capacity must have a value";
  }
  if (table_name.length < 2) {
    return "Table name must be at least 2 characters long";
  }
  if (capacity < 1) {
    return "Table capacity must be at least 1 personse";
  }
  return;
}
