/// Dummy database-like object

export type Database = {
  tables: Map<string, any[]>,
  getById: (table: string, id: number) => any[] | undefined,
  addToTable: (table: string, value: any) => number | undefined,
  removeFromTable: (table: string, id: number) => undefined,
  addTable: (table: string) => any[] | undefined,
  removeTable: (table: string) => void,
  getTable: (table: string) => any[] | undefined,
}

export function createDatabase(): Database {
  const tables = new Map()

  const getById = (table: string, id: number): any[] | undefined => {
    const dbTable = tables.get(table);

    if (!dbTable) {
      // not found table
      return undefined;
    }
    return dbTable.at(id);
  }

  const addToTable = (table: string, value: any): number | undefined => {
    const dbTable = tables.get(table);
    return dbTable?.push(value);
  }

  const removeFromTable = (table: string, id: number): undefined => {
    const dbTable = tables.get(table);
    if (!dbTable) return undefined;
    // idk if there is more performant way of doing this
    tables.set(table, dbTable.filter((_: any, index: number) => index != id));
  }

  const getTable = (table: string): any[] | undefined => {
    return tables.get(table);
  }

  // returns created table or undefined if it failed (can't really fail idk why
  // i do this)
  const addTable = (table: string): any[] | undefined => {
    tables.set(table, [] as any[]);

    return tables.get(table);
  }

  const removeTable = (table: string) => {
    tables.delete(table);
  }

  return {
    tables,
    getById,
    addToTable,
    removeFromTable,
    addTable,
    removeTable,
    getTable,
  }
}


export const db = createDatabase()
