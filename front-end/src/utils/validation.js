export function validateNewTable({ table_name = null, capacity = null }) {
  console.log(
    "validate new Table =============>",
    "table_name: ",
    table_name,
    "capacity",
    capacity
  );
  if (!table_name) {
    console.log("table_name: ", table_name);
    return { message: "Table must have a name" };
  }

  if (!capacity) {
    return { message: "Capacity must have a value" };
  }
  if (table_name.length < 2) {
    return { message: "Table name must be at least 2 characters long" };
  }
  if (capacity < 1) {
    return { message: " Table capacity must be at least 1 personse" };
  }
  return;
}
