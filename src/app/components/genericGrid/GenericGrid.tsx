import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Type for GenericGrid component props
interface GenericGridProps<T> {
  data: T[]; // Collection of objects
  enumMap?: { [key: string]: { [key: number]: string } }; // Optional map for Enums
}

const GenericGrid = <T extends object>({
  data,
  enumMap = {},
}: GenericGridProps<T>) => {
  if (data.length === 0) return <div>No data to display.</div>;

  // Extract keys dynamically to create columns
  const keys = Object.keys(data[0]) as (keyof T)[];

  // Create Material UI columns dynamically
  const columns: GridColDef[] = keys.map((key) => ({
    field: key as string,
    headerName: key.toString().toUpperCase(), // Display key as header
    flex: 1, // Flexible column width
    valueGetter: (value: any) => {
      // Resolve Enums if necessary
      if (typeof value === "number" && enumMap[key as string]) {
        return enumMap[key as string][value] || value;
      }
      return value;
    },
  }));

  // Add an `id` field for DataGrid to track rows
  const rows = data.map((item, index) => ({ id: index, ...item }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default GenericGrid;
